import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { generateAIResponse, extractSkillsFromText, analyzeResponse } from '@/lib/ai/openai'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const interviewId = params.id

    // Get messages for the interview
    const messages = await prisma.message.findMany({
      where: {
        interviewId,
      },
      orderBy: {
        timestamp: 'asc',
      },
    })

    return NextResponse.json({ messages })
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    const interviewId = params.id
    const body = await request.json()

    const { content, sender, messageType = 'TEXT' } = body

    // Validate input
    if (!content || !sender) {
      return NextResponse.json(
        { error: 'Content and sender are required' },
        { status: 400 }
      )
    }

    // Get interview details for context
    const interview = await prisma.interview.findUnique({
      where: { id: interviewId },
      include: {
        jobRole: true,
        candidate: true,
        messages: {
          orderBy: { timestamp: 'desc' },
          take: 10, // Get last 10 messages for context
        },
      },
    })

    if (!interview) {
      return NextResponse.json(
        { error: 'Interview not found' },
        { status: 404 }
      )
    }

    // Save the user message
    const userMessage = await prisma.message.create({
      data: {
        interviewId,
        content,
        sender,
        messageType,
        timestamp: new Date(),
      },
    })

    let aiResponse = null

    // Generate AI response if the sender is a candidate
    if (sender === 'CANDIDATE') {
      try {
        // Prepare conversation history for AI
        const conversationHistory = interview.messages
          .reverse()
          .map(msg => ({
            role: msg.sender === 'AI' ? 'assistant' as const : 'user' as const,
            content: msg.content,
          }))

        // Add the new user message
        conversationHistory.push({
          role: 'user',
          content,
        })

        // Generate AI response
        const aiResponseData = await generateAIResponse(
          conversationHistory,
          interview.jobRole,
          interview.candidate
        )

        // Save AI response
        aiResponse = await prisma.message.create({
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

        // Extract skills from candidate response and update profile
        const extractedSkills = await extractSkillsFromText(content)
        if (extractedSkills.length > 0) {
          await updateCandidateSkills(interview.candidateId, extractedSkills)
        }

        // Analyze response quality
        const lastAIMessage = interview.messages.find(msg => msg.sender === 'AI')
        if (lastAIMessage) {
          const analysis = await analyzeResponse(content, lastAIMessage.content)
          
          // Update candidate profile with analysis
          await updateCandidateProfile(interviewId, analysis)
        }

      } catch (aiError) {
        console.error('Error generating AI response:', aiError)
        // Continue without AI response rather than failing
      }
    }

    return NextResponse.json({
      message: userMessage,
      aiResponse,
    })

  } catch (error) {
    console.error('Error saving message:', error)
    return NextResponse.json(
      { error: 'Failed to save message' },
      { status: 500 }
    )
  }
}

async function updateCandidateSkills(candidateId: string, newSkills: string[]) {
  try {
    const candidate = await prisma.candidate.findUnique({
      where: { id: candidateId },
      select: { skills: true },
    })

    if (candidate) {
      // Merge existing skills with new ones, removing duplicates
      const existingSkills = candidate.skills || []
      const allSkills = [...new Set([...existingSkills, ...newSkills])]

      await prisma.candidate.update({
        where: { id: candidateId },
        data: { skills: allSkills },
      })
    }
  } catch (error) {
    console.error('Error updating candidate skills:', error)
  }
}

async function updateCandidateProfile(
  interviewId: string, 
  analysis: {
    clarity: number
    completeness: number
    relevance: number
    enthusiasm: number
  }
) {
  try {
    const existingProfile = await prisma.candidateProfile.findUnique({
      where: { interviewId },
    })

    if (existingProfile) {
      // Average the new analysis with existing scores
      await prisma.candidateProfile.update({
        where: { interviewId },
        data: {
          clarity: (existingProfile.clarity || 0 + analysis.clarity) / 2,
          enthusiasm: (existingProfile.enthusiasm || 0 + analysis.enthusiasm) / 2,
          responseQuality: (analysis.clarity + analysis.completeness + analysis.relevance) / 3,
        },
      })
    }
  } catch (error) {
    console.error('Error updating candidate profile:', error)
  }
}