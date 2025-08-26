import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface AIMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface AIResponse {
  content: string
  confidence: number
  intent?: string
  entities?: any[]
  nextQuestions?: string[]
}

const INTERVIEWER_SYSTEM_PROMPT = `You are an AI interviewer conducting a conversational job interview. Your role is to:

1. Be professional, friendly, and engaging
2. Ask thoughtful follow-up questions based on candidate responses
3. Evaluate candidate skills, experience, and cultural fit
4. Adapt your questions to the specific job role and candidate background
5. Keep the conversation natural and flowing
6. Extract relevant information about skills, experiences, and achievements

Guidelines:
- Ask one question at a time
- Listen carefully to responses and ask relevant follow-ups
- Be encouraging and positive
- Focus on both technical skills and soft skills
- Keep questions concise and clear
- Show genuine interest in the candidate's background

Remember: This is a conversational interview, not an interrogation. Make the candidate feel comfortable while gathering comprehensive information about their qualifications.`

export async function generateAIResponse(
  messages: AIMessage[],
  jobRole?: any,
  candidateProfile?: any
): Promise<AIResponse> {
  try {
    // Prepare context with job role and candidate info
    let systemPrompt = INTERVIEWER_SYSTEM_PROMPT

    if (jobRole) {
      systemPrompt += `\n\nJob Role Context:
- Position: ${jobRole.title}
- Department: ${jobRole.department}
- Level: ${jobRole.level}
- Requirements: ${jobRole.requirements?.join(', ') || 'Not specified'}`
    }

    if (candidateProfile) {
      systemPrompt += `\n\nCandidate Context:
- Name: ${candidateProfile.name || 'Not provided'}
- Current Role: ${candidateProfile.currentTitle || 'Not provided'}
- Experience: ${candidateProfile.yearsExperience || 'Not specified'} years
- Skills mentioned: ${candidateProfile.skills?.join(', ') || 'None yet'}`
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      max_tokens: 500,
      temperature: 0.7,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    })

    const content = completion.choices[0]?.message?.content || ''
    
    // Calculate confidence based on response length and completion reason
    const confidence = completion.choices[0]?.finish_reason === 'stop' ? 0.9 : 0.7

    // Simple intent detection based on content analysis
    const intent = detectIntent(content)

    return {
      content,
      confidence,
      intent,
      entities: [], // TODO: Implement entity extraction
      nextQuestions: [], // TODO: Implement next question suggestions
    }
  } catch (error) {
    console.error('Error generating AI response:', error)
    throw new Error('Failed to generate AI response')
  }
}

function detectIntent(content: string): string {
  const lowerContent = content.toLowerCase()
  
  if (lowerContent.includes('tell me about') || lowerContent.includes('describe')) {
    return 'information_request'
  } else if (lowerContent.includes('?')) {
    return 'question'
  } else if (lowerContent.includes('thank') || lowerContent.includes('great') || lowerContent.includes('excellent')) {
    return 'positive_feedback'
  } else if (lowerContent.includes('let\'s move on') || lowerContent.includes('next')) {
    return 'transition'
  }
  
  return 'general_response'
}

export async function extractSkillsFromText(text: string): Promise<string[]> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `Extract technical skills, programming languages, frameworks, tools, and relevant competencies from the following text. Return only a JSON array of strings, no additional text. Focus on concrete, specific skills mentioned.`
        },
        {
          role: 'user',
          content: text
        }
      ],
      max_tokens: 200,
      temperature: 0.3,
    })

    const response = completion.choices[0]?.message?.content || '[]'
    try {
      return JSON.parse(response)
    } catch {
      return []
    }
  } catch (error) {
    console.error('Error extracting skills:', error)
    return []
  }
}

export async function analyzeResponse(
  response: string,
  question: string
): Promise<{
  clarity: number
  completeness: number
  relevance: number
  enthusiasm: number
}> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `Analyze the candidate's response to an interview question and rate it on the following criteria (0-1 scale):
- Clarity: How clear and well-structured is the response?
- Completeness: How thoroughly does it answer the question?
- Relevance: How relevant is the response to the question asked?
- Enthusiasm: How engaged and enthusiastic does the candidate seem?

Return only a JSON object with these four numeric values.`
        },
        {
          role: 'user',
          content: `Question: ${question}\n\nResponse: ${response}`
        }
      ],
      max_tokens: 100,
      temperature: 0.1,
    })

    const result = completion.choices[0]?.message?.content || '{}'
    try {
      return JSON.parse(result)
    } catch {
      return { clarity: 0.5, completeness: 0.5, relevance: 0.5, enthusiasm: 0.5 }
    }
  } catch (error) {
    console.error('Error analyzing response:', error)
    return { clarity: 0.5, completeness: 0.5, relevance: 0.5, enthusiasm: 0.5 }
  }
}