"use client"

import { useEffect, useRef, useState, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'
import { useSession } from 'next-auth/react'

interface SocketState {
  connected: boolean
  connecting: boolean
  error: string | null
}

interface Message {
  id: string
  content: string
  sender: string
  messageType: string
  timestamp: Date
  metadata?: any
}

interface TypingUser {
  userId: string
  isTyping: boolean
}

interface SocketEvents {
  onMessage: (message: Message) => void
  onTyping: (typing: TypingUser) => void
  onUserJoined: (data: { userId: string; userRole: string; timestamp: string }) => void
  onUserLeft: (data: { userId: string; timestamp: string }) => void
  onInterviewStarted: (data: { timestamp: string }) => void
  onInterviewCompleted: (data: { timestamp: string }) => void
  onProfileUpdated: (data: { candidateId: string; analysis: any; extractedSkills: string[] }) => void
  onAITyping: (data: { isTyping: boolean }) => void
  onError: (error: { message: string }) => void
}

class SocketClient {
  private socket: Socket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectTimeout: NodeJS.Timeout | null = null
  private heartbeatInterval: NodeJS.Timeout | null = null

  constructor() {
    this.setupHeartbeat = this.setupHeartbeat.bind(this)
    this.cleanup = this.cleanup.bind(this)
  }

  connect(token: string): Promise<Socket> {
    return new Promise((resolve, reject) => {
      if (this.socket?.connected) {
        resolve(this.socket)
        return
      }

      this.socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || window.location.origin, {
        auth: { token },
        transports: ['websocket', 'polling'],
        timeout: 20000,
        forceNew: true,
        reconnection: true,
        reconnectionAttempts: this.maxReconnectAttempts,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        maxHttpBufferSize: 1e6,
      })

      this.socket.on('connect', () => {
        console.log('Socket connected:', this.socket?.id)
        this.reconnectAttempts = 0
        this.setupHeartbeat()
        resolve(this.socket!)
      })

      this.socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error.message)
        reject(new Error(`Connection failed: ${error.message}`))
      })

      this.socket.on('disconnect', (reason) => {
        console.log('Socket disconnected:', reason)
        this.clearHeartbeat()
        
        if (reason === 'io server disconnect') {
          // Server initiated disconnect, don't reconnect automatically
          return
        }

        // Attempt manual reconnection with exponential backoff
        this.handleReconnection()
      })

      this.socket.on('error', (error) => {
        console.error('Socket error:', error)
      })

      // Set connection timeout
      setTimeout(() => {
        if (!this.socket?.connected) {
          reject(new Error('Connection timeout'))
        }
      }, 20000)
    })
  }

  private setupHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      if (this.socket?.connected) {
        this.socket.emit('heartbeat', { timestamp: Date.now() })
      }
    }, 30000) // Send heartbeat every 30 seconds
  }

  private clearHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval)
      this.heartbeatInterval = null
    }
  }

  private handleReconnection() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached')
      return
    }

    this.reconnectAttempts++
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts - 1), 30000)

    console.log(`Attempting reconnection ${this.reconnectAttempts}/${this.maxReconnectAttempts} in ${delay}ms`)

    this.reconnectTimeout = setTimeout(() => {
      this.socket?.connect()
    }, delay)
  }

  joinInterview(interviewId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.socket?.connected) {
        reject(new Error('Socket not connected'))
        return
      }

      this.socket.emit('join_interview', { interviewId })

      this.socket.once('interview_joined', () => {
        resolve()
      })

      this.socket.once('error', (error) => {
        reject(new Error(error.message))
      })

      // Timeout after 10 seconds
      setTimeout(() => {
        reject(new Error('Join interview timeout'))
      }, 10000)
    })
  }

  sendMessage(content: string, messageType = 'TEXT'): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.socket?.connected) {
        reject(new Error('Socket not connected'))
        return
      }

      if (!content.trim()) {
        reject(new Error('Message content is required'))
        return
      }

      if (content.length > 4000) {
        reject(new Error('Message too long'))
        return
      }

      this.socket.emit('send_message', { content, messageType })

      // Consider message sent immediately for optimistic UI
      resolve()
    })
  }

  startTyping() {
    if (this.socket?.connected) {
      this.socket.emit('typing_start')
    }
  }

  stopTyping() {
    if (this.socket?.connected) {
      this.socket.emit('typing_stop')
    }
  }

  startInterview(interviewId: string) {
    if (this.socket?.connected) {
      this.socket.emit('start_interview', { interviewId })
    }
  }

  completeInterview(interviewId: string) {
    if (this.socket?.connected) {
      this.socket.emit('complete_interview', { interviewId })
    }
  }

  on<K extends keyof SocketEvents>(event: K, callback: SocketEvents[K]) {
    if (this.socket) {
      // Map custom events to socket events
      switch (event) {
        case 'onMessage':
          this.socket.on('new_message', callback as any)
          break
        case 'onTyping':
          this.socket.on('user_typing', callback as any)
          break
        case 'onUserJoined':
          this.socket.on('user_joined', callback as any)
          break
        case 'onUserLeft':
          this.socket.on('user_left', callback as any)
          break
        case 'onInterviewStarted':
          this.socket.on('interview_started', callback as any)
          break
        case 'onInterviewCompleted':
          this.socket.on('interview_completed', callback as any)
          break
        case 'onProfileUpdated':
          this.socket.on('profile_updated', callback as any)
          break
        case 'onAITyping':
          this.socket.on('ai_typing', callback as any)
          break
        case 'onError':
          this.socket.on('error', callback as any)
          break
      }
    }
  }

  off<K extends keyof SocketEvents>(event: K, callback?: SocketEvents[K]) {
    if (this.socket) {
      const socketEvent = event.replace('on', '').toLowerCase().replace(/([A-Z])/g, '_$1').toLowerCase()
      this.socket.off(socketEvent, callback as any)
    }
  }

  cleanup() {
    this.clearHeartbeat()
    
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout)
      this.reconnectTimeout = null
    }

    if (this.socket) {
      this.socket.removeAllListeners()
      this.socket.disconnect()
      this.socket = null
    }

    this.reconnectAttempts = 0
  }

  isConnected(): boolean {
    return this.socket?.connected || false
  }

  getSocket(): Socket | null {
    return this.socket
  }
}

// Singleton instance
let socketClient: SocketClient | null = null

export function getSocketClient(): SocketClient {
  if (!socketClient) {
    socketClient = new SocketClient()
  }
  return socketClient
}

// React hook for socket management
export function useSocket() {
  const { data: session } = useSession()
  const [socketState, setSocketState] = useState<SocketState>({
    connected: false,
    connecting: false,
    error: null,
  })
  
  const socketRef = useRef<SocketClient | null>(null)
  const connectionAttemptRef = useRef<Promise<Socket> | null>(null)

  const connect = useCallback(async () => {
    if (!session?.user) {
      setSocketState(prev => ({ ...prev, error: 'No session available' }))
      return null
    }

    if (socketRef.current?.isConnected()) {
      return socketRef.current
    }

    if (connectionAttemptRef.current) {
      try {
        await connectionAttemptRef.current
        return socketRef.current
      } catch (error) {
        // Connection attempt failed, try again
      }
    }

    setSocketState({
      connected: false,
      connecting: true,
      error: null,
    })

    try {
      socketRef.current = getSocketClient()
      
      // Get JWT token from API
      const tokenResponse = await fetch('/api/socket/token', {
        method: 'GET',
        credentials: 'include',
      })

      if (!tokenResponse.ok) {
        throw new Error('Failed to get authentication token')
      }

      const { token } = await tokenResponse.json()
      
      connectionAttemptRef.current = socketRef.current.connect(token)
      await connectionAttemptRef.current

      setSocketState({
        connected: true,
        connecting: false,
        error: null,
      })

      return socketRef.current
    } catch (error) {
      setSocketState({
        connected: false,
        connecting: false,
        error: error instanceof Error ? error.message : 'Connection failed',
      })
      
      connectionAttemptRef.current = null
      return null
    }
  }, [session])

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.cleanup()
      socketRef.current = null
    }
    
    connectionAttemptRef.current = null
    
    setSocketState({
      connected: false,
      connecting: false,
      error: null,
    })
  }, [])

  useEffect(() => {
    return () => {
      disconnect()
    }
  }, [disconnect])

  return {
    socket: socketRef.current,
    connect,
    disconnect,
    ...socketState,
  }
}

// Hook for interview-specific socket functionality
export function useInterviewSocket(interviewId: string) {
  const { socket, connect, ...socketState } = useSocket()
  const [messages, setMessages] = useState<Message[]>([])
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set())
  const [aiTyping, setAITyping] = useState(false)
  const [connectedUsers, setConnectedUsers] = useState<string[]>([])

  const joinInterview = useCallback(async () => {
    const socketClient = await connect()
    if (socketClient && interviewId) {
      try {
        await socketClient.joinInterview(interviewId)
      } catch (error) {
        console.error('Failed to join interview:', error)
      }
    }
  }, [connect, interviewId])

  const sendMessage = useCallback(async (content: string) => {
    if (socket && content.trim()) {
      try {
        await socket.sendMessage(content)
      } catch (error) {
        console.error('Failed to send message:', error)
        throw error
      }
    }
  }, [socket])

  const startTyping = useCallback(() => {
    socket?.startTyping()
  }, [socket])

  const stopTyping = useCallback(() => {
    socket?.stopTyping()
  }, [socket])

  useEffect(() => {
    if (socket?.isConnected() && interviewId) {
      joinInterview()
    }
  }, [socket, interviewId, joinInterview])

  useEffect(() => {
    if (!socket) return

    const handleNewMessage = (message: Message) => {
      setMessages(prev => [...prev, message])
    }

    const handleTyping = (data: TypingUser) => {
      setTypingUsers(prev => {
        const newSet = new Set(prev)
        if (data.isTyping) {
          newSet.add(data.userId)
        } else {
          newSet.delete(data.userId)
        }
        return newSet
      })
    }

    const handleAITyping = (data: { isTyping: boolean }) => {
      setAITyping(data.isTyping)
    }

    const handleUserJoined = (data: { userId: string }) => {
      setConnectedUsers(prev => [...prev.filter(id => id !== data.userId), data.userId])
    }

    const handleUserLeft = (data: { userId: string }) => {
      setConnectedUsers(prev => prev.filter(id => id !== data.userId))
    }

    const handleError = (error: { message: string }) => {
      console.error('Socket error:', error.message)
    }

    const handleInterviewJoined = (data: { messages: Message[]; connectedUsers: string[] }) => {
      setMessages(data.messages || [])
      setConnectedUsers(data.connectedUsers || [])
    }

    socket.on('onMessage', handleNewMessage)
    socket.on('onTyping', handleTyping)
    socket.on('onAITyping', handleAITyping)
    socket.on('onUserJoined', handleUserJoined)
    socket.on('onUserLeft', handleUserLeft)
    socket.on('onError', handleError)
    socket.getSocket()?.on('interview_joined', handleInterviewJoined)

    return () => {
      socket.off('onMessage', handleNewMessage)
      socket.off('onTyping', handleTyping)
      socket.off('onAITyping', handleAITyping)
      socket.off('onUserJoined', handleUserJoined)
      socket.off('onUserLeft', handleUserLeft)
      socket.off('onError', handleError)
      socket.getSocket()?.off('interview_joined', handleInterviewJoined)
    }
  }, [socket])

  return {
    ...socketState,
    messages,
    typingUsers: Array.from(typingUsers),
    aiTyping,
    connectedUsers,
    sendMessage,
    startTyping,
    stopTyping,
    joinInterview,
  }
}