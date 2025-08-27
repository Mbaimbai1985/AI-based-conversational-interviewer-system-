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
  entities?: ExtractedEntity[]
  nextQuestions?: string[]
  sentiment?: SentimentAnalysis
}

export interface ExtractedEntity {
  type: 'skill' | 'experience' | 'education' | 'company' | 'technology' | 'certification' | 'achievement'
  value: string
  confidence: number
  context?: string
}

export interface SentimentAnalysis {
  polarity: number // -1 to 1 (negative to positive)
  confidence: number // 0 to 1
  emotions: {
    enthusiasm: number
    nervousness: number
    confidence: number
    frustration: number
  }
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

    // Enhanced intent detection and entity extraction
    const intent = await detectIntentAdvanced(content, messages)
    const entities = await extractEntities(content)
    const sentiment = await analyzeSentiment(content)
    const nextQuestions = await generateNextQuestions(content, messages, jobRole)

    return {
      content,
      confidence,
      intent,
      entities,
      nextQuestions,
      sentiment,
    }
  } catch (error) {
    console.error('Error generating AI response:', error)
    throw new Error('Failed to generate AI response')
  }
}

// Enhanced intent detection using AI
async function detectIntentAdvanced(content: string, messages: AIMessage[]): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `Analyze the interview message and classify its intent. Consider the conversation context. 
          
          Return one of these intents:
          - question_behavioral: Asking about past experiences, situations, behavior
          - question_technical: Technical skill assessment or problem-solving
          - question_background: About education, experience, career history
          - question_situational: Hypothetical scenarios or future situations
          - follow_up: Following up on previous answers for clarification
          - transition: Moving to a new topic or interview section
          - positive_feedback: Encouraging or praising responses
          - assessment: Evaluating or scoring responses
          - closing: Ending statements or interview conclusion
          - general_response: Other conversational responses
          
          Return only the intent name, no additional text.`
        },
        {
          role: 'user',
          content: `Message: "${content}"\n\nContext: Last few messages in conversation:\n${messages.slice(-3).map(m => `${m.role}: ${m.content}`).join('\n')}`
        }
      ],
      max_tokens: 50,
      temperature: 0.1,
    })

    return completion.choices[0]?.message?.content?.trim() || 'general_response'
  } catch (error) {
    console.error('Error detecting intent:', error)
    return detectIntentFallback(content)
  }
}

// Fallback intent detection
function detectIntentFallback(content: string): string {
  const lowerContent = content.toLowerCase()
  
  if (lowerContent.includes('tell me about') || lowerContent.includes('describe') || lowerContent.includes('walk me through')) {
    return 'question_background'
  } else if (lowerContent.includes('how would you') || lowerContent.includes('what would you do')) {
    return 'question_situational'
  } else if (lowerContent.includes('?')) {
    return 'question_behavioral'
  } else if (lowerContent.includes('thank') || lowerContent.includes('great') || lowerContent.includes('excellent')) {
    return 'positive_feedback'
  } else if (lowerContent.includes('let\'s move on') || lowerContent.includes('next')) {
    return 'transition'
  }
  
  return 'general_response'
}

// Enhanced entity extraction
async function extractEntities(text: string): Promise<ExtractedEntity[]> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `Extract structured entities from interview text. Focus on career-relevant information.
          
          Return a JSON array of entities with this structure:
          {
            "type": "skill|experience|education|company|technology|certification|achievement",
            "value": "extracted text",
            "confidence": 0.0-1.0,
            "context": "surrounding context"
          }
          
          Entity types:
          - skill: Technical/soft skills (e.g., "JavaScript", "leadership", "problem-solving")
          - experience: Job roles/positions (e.g., "Senior Developer", "Team Lead")
          - education: Degrees, courses, schools (e.g., "Computer Science degree", "Stanford")
          - company: Company names (e.g., "Google", "Microsoft")
          - technology: Tools, frameworks, languages (e.g., "React", "AWS", "Python")
          - certification: Professional certifications (e.g., "AWS Certified", "Scrum Master")
          - achievement: Notable accomplishments (e.g., "increased performance by 50%")
          
          Return only valid JSON array, no additional text.`
        },
        {
          role: 'user',
          content: text
        }
      ],
      max_tokens: 400,
      temperature: 0.2,
    })

    const response = completion.choices[0]?.message?.content || '[]'
    try {
      const entities = JSON.parse(response)
      return Array.isArray(entities) ? entities : []
    } catch {
      return []
    }
  } catch (error) {
    console.error('Error extracting entities:', error)
    return []
  }
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

// Sentiment analysis for interview responses
async function analyzeSentiment(text: string): Promise<SentimentAnalysis> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `Analyze the sentiment and emotions in this interview response. Return a JSON object with:
          {
            "polarity": -1 to 1 (negative to positive sentiment),
            "confidence": 0 to 1 (confidence in analysis),
            "emotions": {
              "enthusiasm": 0 to 1 (how enthusiastic/excited),
              "nervousness": 0 to 1 (how nervous/anxious),
              "confidence": 0 to 1 (how confident/self-assured),
              "frustration": 0 to 1 (how frustrated/annoyed)
            }
          }
          
          Focus on professional interview context. Return only valid JSON.`
        },
        {
          role: 'user',
          content: text
        }
      ],
      max_tokens: 150,
      temperature: 0.1,
    })

    const response = completion.choices[0]?.message?.content || '{}'
    try {
      return JSON.parse(response)
    } catch {
      return {
        polarity: 0,
        confidence: 0.5,
        emotions: { enthusiasm: 0.5, nervousness: 0.5, confidence: 0.5, frustration: 0.5 }
      }
    }
  } catch (error) {
    console.error('Error analyzing sentiment:', error)
    return {
      polarity: 0,
      confidence: 0.5,
      emotions: { enthusiasm: 0.5, nervousness: 0.5, confidence: 0.5, frustration: 0.5 }
    }
  }
}

// Generate contextual next questions
async function generateNextQuestions(
  currentResponse: string, 
  messageHistory: AIMessage[], 
  jobRole?: any
): Promise<string[]> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `Based on the candidate's response and interview context, suggest 2-3 relevant follow-up questions. 
          
          Focus on:
          - Deep diving into mentioned experiences
          - Clarifying technical details
          - Understanding problem-solving approaches
          - Exploring examples and specific situations
          - Assessing cultural fit and soft skills
          
          Return a JSON array of question strings. Questions should be natural, engaging, and build on the current response.`
        },
        {
          role: 'user',
          content: `Current response: "${currentResponse}"
          
          Job role: ${jobRole?.title || 'General position'}
          Recent conversation context: ${messageHistory.slice(-4).map(m => `${m.role}: ${m.content}`).join('\n')}`
        }
      ],
      max_tokens: 200,
      temperature: 0.6,
    })

    const response = completion.choices[0]?.message?.content || '[]'
    try {
      const questions = JSON.parse(response)
      return Array.isArray(questions) ? questions.slice(0, 3) : []
    } catch {
      return []
    }
  } catch (error) {
    console.error('Error generating next questions:', error)
    return []
  }
}