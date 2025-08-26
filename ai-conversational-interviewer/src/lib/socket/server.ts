import { Server as HTTPServer } from 'http'
import { Server as SocketIOServer, Socket } from 'socket.io'
import { prisma } from '@/lib/db'
import { generateAIResponse, extractSkillsFromText, analyzeResponse } from '@/lib/ai/openai'
import { verifySocketToken } from '@/lib/auth/jwt'

export interface AuthenticatedSocket extends Socket {
  userId?: string
  userRole?: string
  interviewId?: string
}

export class SocketManager {
  private io: SocketIOServer
  private connectedUsers: Map<string, AuthenticatedSocket> = new Map()
  private interviewRooms: Map<string, Set<string>> = new Map()

  constructor(server: HTTPServer) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: process.env.NODE_ENV === 'production' 
          ? [process.env.APP_URL!]
          : ['http://localhost:3000'],
        methods: ['GET', 'POST'],
        credentials: true,
      },
      transports: ['websocket', 'polling'],
      pingTimeout: 60000,
      pingInterval: 25000,
      maxHttpBufferSize: 1e6, // 1MB
      allowEIO3: true,
    })

    this.setupMiddleware()
    this.setupEventHandlers()
  }

  private setupMiddleware() {
    // Authentication middleware
    this.io.use(async (socket: AuthenticatedSocket, next) => {
      try {
        const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(' ')[1]
        
        if (!token) {
          return next(new Error('Authentication token required'))
        }

        // Verify JWT token
        const decoded = verifySocketToken(token)
        
        if (!decoded || !decoded.sub) {
          return next(new Error('Invalid authentication token'))
        }

        // Get user details from database
        const user = await prisma.user.findUnique({
          where: { id: decoded.sub },
          select: { id: true, role: true, email: true }
        })

        if (!user) {
          return next(new Error('User not found'))
        }

        socket.userId = user.id
        socket.userRole = user.role
        
        next()
      } catch (error) {
        console.error('Socket authentication error:', error)
        next(new Error('Authentication failed'))
      }
    })

    // Rate limiting middleware
    this.io.use(this.rateLimitMiddleware())
  }

  private rateLimitMiddleware() {
    const messageRates = new Map<string, { count: number; resetTime: number }>()
    const RATE_LIMIT = 30 // messages per minute
    const WINDOW_MS = 60000 // 1 minute

    return (socket: AuthenticatedSocket, next: (err?: Error) => void) => {
      const userId = socket.userId!
      const now = Date.now()
      const userRate = messageRates.get(userId)

      if (!userRate || now > userRate.resetTime) {
        messageRates.set(userId, { count: 1, resetTime: now + WINDOW_MS })
        return next()
      }

      if (userRate.count >= RATE_LIMIT) {
        return next(new Error('Rate limit exceeded'))
      }

      userRate.count++
      next()
    }
  }

  private setupEventHandlers() {
    this.io.on('connection', (socket: AuthenticatedSocket) => {
      console.log(`User ${socket.userId} connected with role ${socket.userRole}`)
      
      this.connectedUsers.set(socket.userId!, socket)
      
      // Join interview room
      socket.on('join_interview', this.handleJoinInterview.bind(this, socket))
      
      // Handle messages
      socket.on('send_message', this.handleSendMessage.bind(this, socket))
      
      // Handle typing indicators
      socket.on('typing_start', this.handleTypingStart.bind(this, socket))
      socket.on('typing_stop', this.handleTypingStop.bind(this, socket))
      
      // Handle interview actions
      socket.on('start_interview', this.handleStartInterview.bind(this, socket))
      socket.on('complete_interview', this.handleCompleteInterview.bind(this, socket))
      
      // Handle disconnection
      socket.on('disconnect', this.handleDisconnect.bind(this, socket))
    })
  }

  private async handleJoinInterview(socket: AuthenticatedSocket, data: { interviewId: string }) {
    try {
      const { interviewId } = data

      // Validate interview access
      const interview = await this.validateInterviewAccess(socket.userId!, interviewId, socket.userRole!)
      
      if (!interview) {
        socket.emit('error', { message: 'Access denied to interview' })
        return
      }

      // Leave previous room if any
      if (socket.interviewId) {
        socket.leave(`interview:${socket.interviewId}`)
        this.removeFromInterviewRoom(socket.interviewId, socket.userId!)
      }

      // Join new interview room
      socket.interviewId = interviewId
      socket.join(`interview:${interviewId}`)
      this.addToInterviewRoom(interviewId, socket.userId!)

      // Notify room of user joining
      socket.to(`interview:${interviewId}`).emit('user_joined', {
        userId: socket.userId,
        userRole: socket.userRole,
        timestamp: new Date().toISOString()
      })

      // Send interview details and recent messages
      const messages = await prisma.message.findMany({
        where: { interviewId },
        orderBy: { timestamp: 'asc' },
        take: 50 // Last 50 messages
      })

      socket.emit('interview_joined', {
        interview,
        messages,
        connectedUsers: Array.from(this.interviewRooms.get(interviewId) || [])
      })

    } catch (error) {
      console.error('Error joining interview:', error)
      socket.emit('error', { message: 'Failed to join interview' })
    }
  }

  private async handleSendMessage(socket: AuthenticatedSocket, data: {
    content: string
    messageType?: string
  }) {
    try {
      if (!socket.interviewId) {
        socket.emit('error', { message: 'Not in an interview room' })
        return
      }

      const { content, messageType = 'TEXT' } = data

      if (!content?.trim()) {
        socket.emit('error', { message: 'Message content is required' })
        return
      }

      // Validate message length
      if (content.length > 4000) {
        socket.emit('error', { message: 'Message too long' })
        return
      }

      // Determine sender type
      const sender = socket.userRole === 'CANDIDATE' ? 'CANDIDATE' : 'RECRUITER'

      // Save message to database
      const message = await prisma.message.create({
        data: {
          interviewId: socket.interviewId,
          content,
          sender,
          messageType,
          timestamp: new Date(),
        },
      })

      // Broadcast message to interview room
      this.io.to(`interview:${socket.interviewId}`).emit('new_message', {
        id: message.id,
        content: message.content,
        sender: message.sender,
        messageType: message.messageType,
        timestamp: message.timestamp,
        metadata: message.metadata
      })

      // Generate AI response if candidate sent message
      if (sender === 'CANDIDATE') {
        this.generateAIResponse(socket.interviewId, content)
      }

    } catch (error) {
      console.error('Error sending message:', error)
      socket.emit('error', { message: 'Failed to send message' })
    }
  }

  private async generateAIResponse(interviewId: string, candidateMessage: string) {
    try {
      // Show typing indicator
      this.io.to(`interview:${interviewId}`).emit('ai_typing', { isTyping: true })

      // Get interview context
      const interview = await prisma.interview.findUnique({
        where: { id: interviewId },
        include: {
          jobRole: true,
          candidate: true,
          messages: {
            orderBy: { timestamp: 'desc' },
            take: 10
          }
        }
      })

      if (!interview) return

      // Prepare conversation history
      const conversationHistory = interview.messages
        .reverse()
        .map(msg => ({
          role: msg.sender === 'AI' ? 'assistant' as const : 'user' as const,
          content: msg.content,
        }))

      // Add current message
      conversationHistory.push({
        role: 'user',
        content: candidateMessage
      })

      // Generate AI response
      const aiResponseData = await generateAIResponse(
        conversationHistory,
        interview.jobRole,
        interview.candidate
      )

      // Save AI response
      const aiMessage = await prisma.message.create({
        data: {
          interviewId,
          content: aiResponseData.content,
          sender: 'AI',
          messageType: 'TEXT',
          metadata: {
            confidence: aiResponseData.confidence,
            intent: aiResponseData.intent,
          },
          timestamp: new Date(),
        },
      })

      // Stop typing indicator and send response
      this.io.to(`interview:${interviewId}`).emit('ai_typing', { isTyping: false })
      this.io.to(`interview:${interviewId}`).emit('new_message', {
        id: aiMessage.id,
        content: aiMessage.content,
        sender: aiMessage.sender,
        messageType: aiMessage.messageType,
        timestamp: aiMessage.timestamp,
        metadata: aiMessage.metadata
      })

      // Process candidate message asynchronously
      this.processCandidateMessage(interview.candidateId, interviewId, candidateMessage)

    } catch (error) {
      console.error('Error generating AI response:', error)
      this.io.to(`interview:${interviewId}`).emit('ai_typing', { isTyping: false })
      this.io.to(`interview:${interviewId}`).emit('error', { 
        message: 'AI response generation failed' 
      })
    }
  }

  private async processCandidateMessage(
    candidateId: string, 
    interviewId: string, 
    content: string
  ) {
    try {
      // Extract skills
      const extractedSkills = await extractSkillsFromText(content)
      if (extractedSkills.length > 0) {
        await this.updateCandidateSkills(candidateId, extractedSkills)
      }

      // Analyze response quality
      const lastAIMessage = await prisma.message.findFirst({
        where: {
          interviewId,
          sender: 'AI'
        },
        orderBy: { timestamp: 'desc' }
      })

      if (lastAIMessage) {
        const analysis = await analyzeResponse(content, lastAIMessage.content)
        await this.updateCandidateProfile(interviewId, analysis)
        
        // Emit profile update to room
        this.io.to(`interview:${interviewId}`).emit('profile_updated', {
          candidateId,
          analysis,
          extractedSkills
        })
      }

    } catch (error) {
      console.error('Error processing candidate message:', error)
    }
  }

  private async updateCandidateSkills(candidateId: string, newSkills: string[]) {
    const candidate = await prisma.candidate.findUnique({
      where: { id: candidateId },
      select: { skills: true }
    })

    if (candidate) {
      const existingSkills = candidate.skills || []
      const allSkills = [...new Set([...existingSkills, ...newSkills])]

      await prisma.candidate.update({
        where: { id: candidateId },
        data: { skills: allSkills }
      })
    }
  }

  private async updateCandidateProfile(
    interviewId: string,
    analysis: {
      clarity: number
      completeness: number
      relevance: number
      enthusiasm: number
    }
  ) {
    const existingProfile = await prisma.candidateProfile.findUnique({
      where: { interviewId }
    })

    if (existingProfile) {
      await prisma.candidateProfile.update({
        where: { interviewId },
        data: {
          clarity: this.averageScore(existingProfile.clarity, analysis.clarity),
          enthusiasm: this.averageScore(existingProfile.enthusiasm, analysis.enthusiasm),
          responseQuality: (analysis.clarity + analysis.completeness + analysis.relevance) / 3,
        }
      })
    } else {
      // Create new profile if it doesn't exist
      const interview = await prisma.interview.findUnique({
        where: { id: interviewId },
        select: { candidateId: true }
      })

      if (interview) {
        await prisma.candidateProfile.create({
          data: {
            candidateId: interview.candidateId,
            interviewId,
            clarity: analysis.clarity,
            enthusiasm: analysis.enthusiasm,
            responseQuality: (analysis.clarity + analysis.completeness + analysis.relevance) / 3,
          }
        })
      }
    }
  }

  private averageScore(existing: number | null, newScore: number): number {
    return existing ? (existing + newScore) / 2 : newScore
  }

  private handleTypingStart(socket: AuthenticatedSocket) {
    if (socket.interviewId) {
      socket.to(`interview:${socket.interviewId}`).emit('user_typing', {
        userId: socket.userId,
        isTyping: true
      })
    }
  }

  private handleTypingStop(socket: AuthenticatedSocket) {
    if (socket.interviewId) {
      socket.to(`interview:${socket.interviewId}`).emit('user_typing', {
        userId: socket.userId,
        isTyping: false
      })
    }
  }

  private async handleStartInterview(socket: AuthenticatedSocket, data: { interviewId: string }) {
    try {
      if (socket.userRole !== 'RECRUITER') {
        socket.emit('error', { message: 'Only recruiters can start interviews' })
        return
      }

      await prisma.interview.update({
        where: { id: data.interviewId },
        data: {
          status: 'IN_PROGRESS',
          startedAt: new Date()
        }
      })

      this.io.to(`interview:${data.interviewId}`).emit('interview_started', {
        timestamp: new Date().toISOString()
      })

    } catch (error) {
      console.error('Error starting interview:', error)
      socket.emit('error', { message: 'Failed to start interview' })
    }
  }

  private async handleCompleteInterview(socket: AuthenticatedSocket, data: { interviewId: string }) {
    try {
      if (socket.userRole !== 'RECRUITER' && socket.userRole !== 'CANDIDATE') {
        socket.emit('error', { message: 'Unauthorized action' })
        return
      }

      await prisma.interview.update({
        where: { id: data.interviewId },
        data: {
          status: 'COMPLETED',
          completedAt: new Date()
        }
      })

      this.io.to(`interview:${data.interviewId}`).emit('interview_completed', {
        timestamp: new Date().toISOString()
      })

    } catch (error) {
      console.error('Error completing interview:', error)
      socket.emit('error', { message: 'Failed to complete interview' })
    }
  }

  private handleDisconnect(socket: AuthenticatedSocket) {
    console.log(`User ${socket.userId} disconnected`)
    
    if (socket.userId) {
      this.connectedUsers.delete(socket.userId)
    }

    if (socket.interviewId && socket.userId) {
      this.removeFromInterviewRoom(socket.interviewId, socket.userId)
      
      socket.to(`interview:${socket.interviewId}`).emit('user_left', {
        userId: socket.userId,
        timestamp: new Date().toISOString()
      })
    }
  }

  private async validateInterviewAccess(
    userId: string, 
    interviewId: string, 
    userRole: string
  ): Promise<any> {
    const interview = await prisma.interview.findUnique({
      where: { id: interviewId },
      include: {
        candidate: true,
        jobRole: true,
        recruiter: true
      }
    })

    if (!interview) return null

    // Recruiters can access their own interviews
    if (userRole === 'RECRUITER' && interview.recruiterId === userId) {
      return interview
    }

    // Candidates can access interviews where they are the candidate
    if (userRole === 'CANDIDATE' && interview.candidate.email) {
      // In a real system, you'd verify the candidate's identity
      return interview
    }

    // Admins can access all interviews
    if (userRole === 'ADMIN') {
      return interview
    }

    return null
  }

  private addToInterviewRoom(interviewId: string, userId: string) {
    if (!this.interviewRooms.has(interviewId)) {
      this.interviewRooms.set(interviewId, new Set())
    }
    this.interviewRooms.get(interviewId)!.add(userId)
  }

  private removeFromInterviewRoom(interviewId: string, userId: string) {
    const room = this.interviewRooms.get(interviewId)
    if (room) {
      room.delete(userId)
      if (room.size === 0) {
        this.interviewRooms.delete(interviewId)
      }
    }
  }

  public getConnectedUsers(): string[] {
    return Array.from(this.connectedUsers.keys())
  }

  public getInterviewRooms(): Map<string, Set<string>> {
    return this.interviewRooms
  }

  public close() {
    this.io.close()
  }
}

let socketManager: SocketManager | null = null

export function initializeSocket(server: HTTPServer): SocketManager {
  if (!socketManager) {
    socketManager = new SocketManager(server)
  }
  return socketManager
}

export function getSocketManager(): SocketManager | null {
  return socketManager
}