import { AIMessage, AIResponse, ExtractedEntity, SentimentAnalysis } from '../ai/openai'

export interface ConversationContext {
  interviewId: string
  candidateId: string
  jobRoleId: string
  currentPhase: InterviewPhase
  extractedProfile: CandidateProfile
  messageHistory: ContextualMessage[]
  questionFlow: QuestionFlow
  metrics: ConversationMetrics
}

export interface ContextualMessage extends AIMessage {
  id: string
  timestamp: Date
  intent?: string
  entities?: ExtractedEntity[]
  sentiment?: SentimentAnalysis
  metadata?: {
    questionType?: string
    responseQuality?: number
    followUpRequired?: boolean
  }
}

export interface CandidateProfile {
  skills: Array<{ skill: string; proficiency: string; verified: boolean }>
  experiences: Array<{ 
    role: string
    company: string
    duration: string
    responsibilities: string[]
    achievements: string[]
  }>
  education: Array<{
    degree: string
    institution: string
    year: string
    relevant: boolean
  }>
  projects: Array<{
    name: string
    description: string
    technologies: string[]
    impact: string
  }>
  softSkills: Array<{ skill: string; evidence: string[] }>
  redFlags: string[]
  strengths: string[]
}

export interface QuestionFlow {
  completedTopics: string[]
  currentTopic: string
  pendingTopics: string[]
  followUpQuestions: string[]
  customQuestions: string[]
  timeSpent: { [topic: string]: number }
}

export interface ConversationMetrics {
  totalMessages: number
  averageResponseTime: number
  sentimentTrend: number[]
  engagementLevel: number
  profileCompleteness: number
  questionCoverage: { [category: string]: number }
}

export enum InterviewPhase {
  INTRODUCTION = 'introduction',
  BACKGROUND = 'background',
  TECHNICAL = 'technical',
  BEHAVIORAL = 'behavioral',
  SITUATIONAL = 'situational',
  COMPANY_FIT = 'company_fit',
  QUESTIONS = 'questions',
  CONCLUSION = 'conclusion'
}

export class ConversationFlowManager {
  private context: ConversationContext

  constructor(interviewId: string, candidateId: string, jobRoleId: string) {
    this.context = {
      interviewId,
      candidateId,
      jobRoleId,
      currentPhase: InterviewPhase.INTRODUCTION,
      extractedProfile: this.initializeProfile(),
      messageHistory: [],
      questionFlow: this.initializeQuestionFlow(),
      metrics: this.initializeMetrics()
    }
  }

  private initializeProfile(): CandidateProfile {
    return {
      skills: [],
      experiences: [],
      education: [],
      projects: [],
      softSkills: [],
      redFlags: [],
      strengths: []
    }
  }

  private initializeQuestionFlow(): QuestionFlow {
    return {
      completedTopics: [],
      currentTopic: 'introduction',
      pendingTopics: ['background', 'technical', 'behavioral', 'company_fit'],
      followUpQuestions: [],
      customQuestions: [],
      timeSpent: {}
    }
  }

  private initializeMetrics(): ConversationMetrics {
    return {
      totalMessages: 0,
      averageResponseTime: 0,
      sentimentTrend: [],
      engagementLevel: 0.5,
      profileCompleteness: 0,
      questionCoverage: {}
    }
  }

  // Add a new message to the conversation
  async addMessage(message: AIMessage, aiResponse?: AIResponse): Promise<void> {
    const contextualMessage: ContextualMessage = {
      ...message,
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      intent: aiResponse?.intent,
      entities: aiResponse?.entities,
      sentiment: aiResponse?.sentiment,
      metadata: {
        questionType: this.determineQuestionType(message.content),
        responseQuality: this.calculateResponseQuality(message, aiResponse),
        followUpRequired: this.needsFollowUp(message, aiResponse)
      }
    }

    this.context.messageHistory.push(contextualMessage)
    this.updateMetrics(contextualMessage)
    
    if (message.role === 'user') {
      await this.updateCandidateProfile(contextualMessage)
    }

    // Update conversation flow
    await this.updateConversationFlow(contextualMessage)
  }

  private determineQuestionType(content: string): string {
    const lowerContent = content.toLowerCase()
    
    if (lowerContent.includes('tell me about yourself') || lowerContent.includes('introduce')) {
      return 'introduction'
    } else if (lowerContent.includes('experience') || lowerContent.includes('worked')) {
      return 'experience'
    } else if (lowerContent.includes('technical') || lowerContent.includes('code') || lowerContent.includes('algorithm')) {
      return 'technical'
    } else if (lowerContent.includes('team') || lowerContent.includes('conflict') || lowerContent.includes('leadership')) {
      return 'behavioral'
    } else if (lowerContent.includes('would you') || lowerContent.includes('how would')) {
      return 'situational'
    }
    
    return 'general'
  }

  private calculateResponseQuality(message: AIMessage, aiResponse?: AIResponse): number {
    if (message.role !== 'user' || !aiResponse?.sentiment) return 0

    const { sentiment } = aiResponse
    const length = message.content.length
    
    // Base score from sentiment
    let score = (sentiment.polarity + 1) / 2 // Convert -1,1 to 0,1
    
    // Adjust for confidence and enthusiasm
    score = score * sentiment.confidence * sentiment.emotions.confidence
    
    // Adjust for response length (optimal range: 100-500 characters)
    if (length < 50) score *= 0.7 // Too short
    else if (length > 1000) score *= 0.8 // Too long
    else if (length >= 100 && length <= 500) score *= 1.2 // Optimal
    
    return Math.min(score, 1.0)
  }

  private needsFollowUp(message: AIMessage, aiResponse?: AIResponse): boolean {
    if (message.role !== 'user') return false
    
    const responseQuality = this.calculateResponseQuality(message, aiResponse)
    const entities = aiResponse?.entities || []
    
    // Need follow-up if response quality is low or entities suggest interesting details
    return responseQuality < 0.6 || entities.some(e => e.type === 'achievement' || e.type === 'experience')
  }

  private updateMetrics(message: ContextualMessage): void {
    this.context.metrics.totalMessages++
    
    if (message.sentiment) {
      this.context.metrics.sentimentTrend.push(message.sentiment.polarity)
      
      // Keep only last 10 sentiment scores
      if (this.context.metrics.sentimentTrend.length > 10) {
        this.context.metrics.sentimentTrend.shift()
      }
      
      // Update engagement level based on recent sentiment and enthusiasm
      const recentSentiment = this.context.metrics.sentimentTrend.slice(-5)
      const avgSentiment = recentSentiment.reduce((a, b) => a + b, 0) / recentSentiment.length
      const enthusiasm = message.sentiment.emotions.enthusiasm
      
      this.context.metrics.engagementLevel = (avgSentiment + 1) / 2 * 0.7 + enthusiasm * 0.3
    }
  }

  private async updateCandidateProfile(message: ContextualMessage): Promise<void> {
    const entities = message.entities || []
    
    for (const entity of entities) {
      switch (entity.type) {
        case 'skill':
        case 'technology':
          this.addSkillToProfile(entity.value, entity.confidence)
          break
        case 'experience':
          this.addExperienceToProfile(entity, message.content)
          break
        case 'education':
          this.addEducationToProfile(entity, message.content)
          break
        case 'achievement':
          this.addAchievementToProfile(entity.value)
          break
        case 'company':
          this.updateCompanyInfo(entity.value)
          break
      }
    }
    
    // Update profile completeness
    this.calculateProfileCompleteness()
  }

  private addSkillToProfile(skill: string, confidence: number): void {
    const existingSkill = this.context.extractedProfile.skills.find(s => 
      s.skill.toLowerCase() === skill.toLowerCase()
    )
    
    if (existingSkill) {
      existingSkill.verified = true
    } else {
      this.context.extractedProfile.skills.push({
        skill,
        proficiency: confidence > 0.8 ? 'Advanced' : confidence > 0.6 ? 'Intermediate' : 'Beginner',
        verified: false
      })
    }
  }

  private addExperienceToProfile(entity: ExtractedEntity, context: string): void {
    // Simple experience extraction - could be enhanced with more sophisticated parsing
    this.context.extractedProfile.experiences.push({
      role: entity.value,
      company: 'Unknown', // Would be extracted from context
      duration: 'Unknown',
      responsibilities: [],
      achievements: []
    })
  }

  private addEducationToProfile(entity: ExtractedEntity, context: string): void {
    this.context.extractedProfile.education.push({
      degree: entity.value,
      institution: 'Unknown',
      year: 'Unknown',
      relevant: true
    })
  }

  private addAchievementToProfile(achievement: string): void {
    if (!this.context.extractedProfile.strengths.includes(achievement)) {
      this.context.extractedProfile.strengths.push(achievement)
    }
  }

  private updateCompanyInfo(company: string): void {
    // Update the most recent experience with company info
    const lastExperience = this.context.extractedProfile.experiences[
      this.context.extractedProfile.experiences.length - 1
    ]
    if (lastExperience && lastExperience.company === 'Unknown') {
      lastExperience.company = company
    }
  }

  private calculateProfileCompleteness(): void {
    const weights = {
      skills: 0.3,
      experiences: 0.25,
      education: 0.15,
      projects: 0.15,
      softSkills: 0.15
    }
    
    let completeness = 0
    completeness += Math.min(this.context.extractedProfile.skills.length / 5, 1) * weights.skills
    completeness += Math.min(this.context.extractedProfile.experiences.length / 3, 1) * weights.experiences
    completeness += Math.min(this.context.extractedProfile.education.length / 1, 1) * weights.education
    completeness += Math.min(this.context.extractedProfile.projects.length / 2, 1) * weights.projects
    completeness += Math.min(this.context.extractedProfile.softSkills.length / 3, 1) * weights.softSkills
    
    this.context.metrics.profileCompleteness = completeness
  }

  private async updateConversationFlow(message: ContextualMessage): Promise<void> {
    // Update time spent on current topic
    const currentTime = Date.now()
    const currentTopic = this.context.questionFlow.currentTopic
    
    if (!this.context.questionFlow.timeSpent[currentTopic]) {
      this.context.questionFlow.timeSpent[currentTopic] = 0
    }
    
    // Check if we should transition to next phase
    if (this.shouldTransitionPhase()) {
      await this.transitionToNextPhase()
    }
  }

  private shouldTransitionPhase(): boolean {
    const currentTopic = this.context.questionFlow.currentTopic
    const timeSpent = this.context.questionFlow.timeSpent[currentTopic] || 0
    const messageCount = this.context.messageHistory.filter(m => 
      m.metadata?.questionType === currentTopic
    ).length
    
    // Transition criteria
    const maxTimePerTopic = 10 * 60 * 1000 // 10 minutes
    const minMessagesPerTopic = 3
    const maxMessagesPerTopic = 15
    
    return timeSpent > maxTimePerTopic || 
           messageCount > maxMessagesPerTopic ||
           (messageCount >= minMessagesPerTopic && this.context.metrics.profileCompleteness > 0.7)
  }

  private async transitionToNextPhase(): Promise<void> {
    const currentTopic = this.context.questionFlow.currentTopic
    
    // Mark current topic as completed
    if (!this.context.questionFlow.completedTopics.includes(currentTopic)) {
      this.context.questionFlow.completedTopics.push(currentTopic)
    }
    
    // Move to next topic
    if (this.context.questionFlow.pendingTopics.length > 0) {
      this.context.questionFlow.currentTopic = this.context.questionFlow.pendingTopics.shift()!
      
      // Update interview phase
      this.updateInterviewPhase()
    }
  }

  private updateInterviewPhase(): void {
    const topic = this.context.questionFlow.currentTopic
    
    switch (topic) {
      case 'introduction':
        this.context.currentPhase = InterviewPhase.INTRODUCTION
        break
      case 'background':
      case 'experience':
        this.context.currentPhase = InterviewPhase.BACKGROUND
        break
      case 'technical':
        this.context.currentPhase = InterviewPhase.TECHNICAL
        break
      case 'behavioral':
        this.context.currentPhase = InterviewPhase.BEHAVIORAL
        break
      case 'situational':
        this.context.currentPhase = InterviewPhase.SITUATIONAL
        break
      case 'company_fit':
        this.context.currentPhase = InterviewPhase.COMPANY_FIT
        break
      default:
        this.context.currentPhase = InterviewPhase.CONCLUSION
    }
  }

  // Public methods for accessing context
  getContext(): ConversationContext {
    return { ...this.context }
  }

  getCandidateProfile(): CandidateProfile {
    return { ...this.context.extractedProfile }
  }

  getMetrics(): ConversationMetrics {
    return { ...this.context.metrics }
  }

  getCurrentPhase(): InterviewPhase {
    return this.context.currentPhase
  }

  getMessageHistory(): ContextualMessage[] {
    return [...this.context.messageHistory]
  }

  // Check if interview should continue
  shouldContinueInterview(): boolean {
    const maxMessages = 50
    const minProfileCompleteness = 0.6
    const maxDuration = 60 * 60 * 1000 // 1 hour
    
    const totalTime = Object.values(this.context.questionFlow.timeSpent)
      .reduce((sum, time) => sum + time, 0)
    
    return this.context.metrics.totalMessages < maxMessages &&
           this.context.metrics.profileCompleteness < 1.0 &&
           totalTime < maxDuration &&
           this.context.currentPhase !== InterviewPhase.CONCLUSION
  }

  // Generate context-aware next question suggestions
  getNextQuestionSuggestions(): string[] {
    const phase = this.context.currentPhase
    const profile = this.context.extractedProfile
    const questionFlow = this.context.questionFlow
    
    // Return questions based on current phase and what's missing from profile
    const suggestions: string[] = []
    
    switch (phase) {
      case InterviewPhase.INTRODUCTION:
        if (profile.experiences.length === 0) {
          suggestions.push("Tell me about your current role and responsibilities.")
        }
        break
      case InterviewPhase.BACKGROUND:
        if (profile.skills.length < 3) {
          suggestions.push("What technologies and tools are you most proficient with?")
        }
        if (profile.education.length === 0) {
          suggestions.push("Can you walk me through your educational background?")
        }
        break
      case InterviewPhase.TECHNICAL:
        suggestions.push("Describe a challenging technical problem you solved recently.")
        suggestions.push("How do you approach debugging complex issues?")
        break
      case InterviewPhase.BEHAVIORAL:
        suggestions.push("Tell me about a time you had to work with a difficult team member.")
        suggestions.push("Describe a situation where you had to meet a tight deadline.")
        break
    }
    
    return suggestions.slice(0, 3)
  }
}