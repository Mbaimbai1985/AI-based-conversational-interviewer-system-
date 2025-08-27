import { ContextualMessage, InterviewPhase } from '../interview/conversationFlow'
import { DynamicProfile, SkillProfile, ExperienceTimeline } from '../candidate/profileBuilder'
import { QuestionTemplate, QuestionCategory, DifficultyLevel } from '../interview/questionTemplates'
import { generateAIResponse, ExtractedEntity, SentimentAnalysis } from '../ai/openai'

export interface AdaptiveQuestionRequest {
  candidateResponse: ContextualMessage
  conversationHistory: ContextualMessage[]
  candidateProfile: DynamicProfile
  currentPhase: InterviewPhase
  timeRemaining: number
  interviewObjectives: InterviewObjective[]
}

export interface AdaptiveQuestionResult {
  primaryQuestion: GeneratedQuestion
  followUpQuestions: GeneratedQuestion[]
  branchingLogic: BranchingRule[]
  transitionSuggestions: TopicTransition[]
  confidence: number
  reasoning: string[]
}

export interface GeneratedQuestion {
  id: string
  text: string
  type: QuestionType
  category: QuestionCategory
  difficulty: DifficultyLevel
  intent: QuestionIntent
  expectedDuration: number
  scoringCriteria: ScoringCriterion[]
  triggers: QuestionTrigger[]
  adaptations: QuestionAdaptation[]
  metadata: QuestionMetadata
}

export interface BranchingRule {
  condition: ResponseCondition
  action: BranchingAction
  priority: number
  confidence: number
}

export interface TopicTransition {
  fromTopic: string
  toTopic: string
  trigger: TransitionTrigger
  transitionPhrase: string
  confidence: number
}

export interface InterviewObjective {
  id: string
  category: 'skill_assessment' | 'experience_validation' | 'cultural_fit' | 'behavioral_traits'
  description: string
  priority: 'critical' | 'important' | 'nice_to_have'
  completed: boolean
  evidence: string[]
  confidence: number
}

export interface ScoringCriterion {
  aspect: string
  weight: number
  expectedIndicators: string[]
  scoringRubric: { [level: string]: string }
}

export interface QuestionTrigger {
  type: 'response_content' | 'sentiment' | 'proficiency_gap' | 'time_constraint' | 'objective_completion'
  condition: string
  threshold?: number
  priority: number
}

export interface QuestionAdaptation {
  trigger: string
  modification: 'simplify' | 'deepen' | 'redirect' | 'skip' | 'followup'
  alternativeText?: string
  reasoning: string
}

export interface QuestionMetadata {
  generatedAt: Date
  source: 'template' | 'ai_generated' | 'adaptive'
  parentQuestionId?: string
  adaptationHistory: string[]
  usageCount: number
}

export enum QuestionType {
  OPEN_ENDED = 'open_ended',
  BEHAVIORAL = 'behavioral',
  SITUATIONAL = 'situational',
  TECHNICAL = 'technical',
  CLARIFICATION = 'clarification',
  DEEP_DIVE = 'deep_dive',
  TRANSITION = 'transition',
  CLOSING = 'closing'
}

export enum QuestionIntent {
  INFORMATION_GATHERING = 'information_gathering',
  SKILL_VALIDATION = 'skill_validation',
  EXPERIENCE_EXPLORATION = 'experience_exploration',
  PROBLEM_SOLVING = 'problem_solving',
  CULTURAL_ASSESSMENT = 'cultural_assessment',
  MOTIVATION_UNDERSTANDING = 'motivation_understanding',
  CLARIFICATION = 'clarification',
  RAPPORT_BUILDING = 'rapport_building'
}

export enum ResponseCondition {
  INCOMPLETE_ANSWER = 'incomplete_answer',
  HIGH_CONFIDENCE = 'high_confidence',
  TECHNICAL_DETAIL = 'technical_detail',
  BEHAVIORAL_INDICATOR = 'behavioral_indicator',
  CONTRADICTION = 'contradiction',
  ENTHUSIASM_HIGH = 'enthusiasm_high',
  ENTHUSIASM_LOW = 'enthusiasm_low',
  TIME_SHORT = 'time_short',
  OBJECTIVE_MET = 'objective_met'
}

export enum BranchingAction {
  ASK_FOLLOWUP = 'ask_followup',
  DEEP_DIVE = 'deep_dive',
  CHANGE_TOPIC = 'change_topic',
  SEEK_CLARIFICATION = 'seek_clarification',
  PROVIDE_ENCOURAGEMENT = 'provide_encouragement',
  WRAP_UP_TOPIC = 'wrap_up_topic',
  SKIP_SECTION = 'skip_section',
  EXTEND_TIME = 'extend_time'
}

export enum TransitionTrigger {
  OBJECTIVE_COMPLETED = 'objective_completed',
  TIME_CONSTRAINT = 'time_constraint',
  NATURAL_BREAK = 'natural_break',
  PROFICIENCY_ESTABLISHED = 'proficiency_established',
  NEGATIVE_SENTIMENT = 'negative_sentiment',
  TOPIC_EXHAUSTED = 'topic_exhausted'
}

export class AdaptiveQuestioningEngine {
  private questionHistory: Map<string, GeneratedQuestion[]> = new Map()
  private branchingHistory: Map<string, BranchingRule[]> = new Map()
  private adaptationRules: Map<string, QuestionAdaptation[]> = new Map()

  constructor() {
    this.initializeAdaptationRules()
  }

  private initializeAdaptationRules(): void {
    // Define common adaptation patterns
    const commonAdaptations: Array<[string, QuestionAdaptation[]]> = [
      ['technical_overwhelm', [{
        trigger: 'low_confidence_response',
        modification: 'simplify',
        reasoning: 'Candidate seems overwhelmed by technical complexity'
      }]],
      ['high_proficiency', [{
        trigger: 'expert_level_response',
        modification: 'deepen',
        reasoning: 'Candidate demonstrates high proficiency, can handle deeper questions'
      }]],
      ['time_pressure', [{
        trigger: 'time_remaining_low',
        modification: 'skip',
        reasoning: 'Limited time remaining, focus on critical objectives'
      }]],
      ['engagement_low', [{
        trigger: 'low_enthusiasm',
        modification: 'redirect',
        reasoning: 'Low engagement detected, try different approach'
      }]]
    ]

    commonAdaptations.forEach(([key, adaptations]) => {
      this.adaptationRules.set(key, adaptations)
    })
  }

  async generateAdaptiveQuestion(request: AdaptiveQuestionRequest): Promise<AdaptiveQuestionResult> {
    // Analyze the candidate's last response
    const responseAnalysis = await this.analyzeResponse(request.candidateResponse, request.candidateProfile)
    
    // Determine conversation context
    const conversationContext = this.analyzeConversationContext(request)
    
    // Generate primary question
    const primaryQuestion = await this.generatePrimaryQuestion(request, responseAnalysis, conversationContext)
    
    // Generate follow-up questions
    const followUpQuestions = await this.generateFollowUpQuestions(request, primaryQuestion)
    
    // Create branching logic
    const branchingLogic = this.createBranchingLogic(request, responseAnalysis)
    
    // Suggest topic transitions
    const transitionSuggestions = this.suggestTopicTransitions(request, conversationContext)
    
    // Calculate confidence and reasoning
    const { confidence, reasoning } = this.calculateConfidenceAndReasoning(
      request, responseAnalysis, primaryQuestion, conversationContext
    )

    return {
      primaryQuestion,
      followUpQuestions,
      branchingLogic,
      transitionSuggestions,
      confidence,
      reasoning
    }
  }

  private async analyzeResponse(
    response: ContextualMessage, 
    profile: DynamicProfile
  ): Promise<{
    completeness: number
    technicalDepth: number
    emotionalState: string
    keyTopics: string[]
    skillsRevealed: string[]
    gaps: string[]
    confidence: number
  }> {
    const content = response.content
    const entities = response.entities || []
    const sentiment = response.sentiment

    // Analyze completeness
    const completeness = this.assessResponseCompleteness(content)
    
    // Analyze technical depth
    const technicalDepth = this.assessTechnicalDepth(content, entities)
    
    // Determine emotional state
    const emotionalState = this.determineEmotionalState(sentiment)
    
    // Extract key topics
    const keyTopics = this.extractKeyTopics(content, entities)
    
    // Identify revealed skills
    const skillsRevealed = entities
      .filter(e => e.type === 'skill' || e.type === 'technology')
      .map(e => e.value)
    
    // Identify information gaps
    const gaps = this.identifyInformationGaps(content, profile)
    
    // Calculate analysis confidence
    const confidence = this.calculateAnalysisConfidence(response)

    return {
      completeness,
      technicalDepth,
      emotionalState,
      keyTopics,
      skillsRevealed,
      gaps,
      confidence
    }
  }

  private assessResponseCompleteness(content: string): number {
    const wordCount = content.split(/\s+/).length
    const sentenceCount = content.split(/[.!?]+/).filter(s => s.trim()).length
    const hasExamples = /for example|such as|like when|instance/.test(content.toLowerCase())
    const hasMetrics = /\d+%|\d+\s*(year|month|day|hour)|increased|decreased|improved/.test(content.toLowerCase())
    
    let score = 0.3 // Base score
    
    if (wordCount > 50) score += 0.2
    if (wordCount > 100) score += 0.2
    if (sentenceCount > 2) score += 0.1
    if (hasExamples) score += 0.1
    if (hasMetrics) score += 0.1
    
    return Math.min(score, 1.0)
  }

  private assessTechnicalDepth(content: string, entities: ExtractedEntity[]): number {
    const techEntities = entities.filter(e => 
      e.type === 'technology' || e.type === 'skill'
    ).length
    
    const technicalTerms = [
      'architecture', 'design pattern', 'algorithm', 'optimization',
      'scalability', 'performance', 'security', 'testing',
      'deployment', 'monitoring', 'debugging', 'refactoring'
    ]
    
    const technicalMentions = technicalTerms.filter(term => 
      content.toLowerCase().includes(term)
    ).length
    
    let depth = 0.2 // Base depth
    depth += Math.min(techEntities * 0.1, 0.4)
    depth += Math.min(technicalMentions * 0.05, 0.4)
    
    return Math.min(depth, 1.0)
  }

  private determineEmotionalState(sentiment?: SentimentAnalysis): string {
    if (!sentiment) return 'neutral'
    
    const { emotions } = sentiment
    
    if (emotions.enthusiasm > 0.7) return 'enthusiastic'
    if (emotions.nervousness > 0.7) return 'nervous'
    if (emotions.confidence > 0.7) return 'confident'
    if (emotions.frustration > 0.6) return 'frustrated'
    if (sentiment.polarity > 0.5) return 'positive'
    if (sentiment.polarity < -0.3) return 'negative'
    
    return 'neutral'
  }

  private extractKeyTopics(content: string, entities: ExtractedEntity[]): string[] {
    const topics: string[] = []
    
    // Extract from entities
    entities.forEach(entity => {
      if (entity.type === 'experience' || entity.type === 'skill') {
        topics.push(entity.value)
      }
    })
    
    // Extract from common topic patterns
    const topicPatterns = [
      /worked on (.+?)(?:\s|,|\.)/g,
      /experience with (.+?)(?:\s|,|\.)/g,
      /using (.+?)(?:\s|,|\.)/g,
      /project (.+?)(?:\s|,|\.)/g
    ]
    
    topicPatterns.forEach(pattern => {
      let match
      while ((match = pattern.exec(content)) !== null) {
        topics.push(match[1].trim())
      }
    })
    
    return topics.slice(0, 5) // Limit to top 5 topics
  }

  private identifyInformationGaps(content: string, profile: DynamicProfile): string[] {
    const gaps: string[] = []
    
    // Check for missing technical details
    if (content.includes('project') && !content.includes('technology')) {
      gaps.push('technical_stack_details')
    }
    
    // Check for missing metrics
    if (content.includes('improved') && !/\d+/.test(content)) {
      gaps.push('quantitative_metrics')
    }
    
    // Check for missing team context
    if (content.includes('worked') && !content.includes('team')) {
      gaps.push('team_collaboration_details')
    }
    
    // Check for missing challenges
    if (content.includes('project') && !content.includes('challenge')) {
      gaps.push('challenges_overcome')
    }
    
    return gaps
  }

  private calculateAnalysisConfidence(response: ContextualMessage): number {
    let confidence = 0.5 // Base confidence
    
    if (response.sentiment?.confidence) {
      confidence += response.sentiment.confidence * 0.3
    }
    
    if (response.entities && response.entities.length > 0) {
      const avgEntityConfidence = response.entities.reduce((sum, e) => sum + e.confidence, 0) / response.entities.length
      confidence += avgEntityConfidence * 0.2
    }
    
    return Math.min(confidence, 1.0)
  }

  private analyzeConversationContext(request: AdaptiveQuestionRequest): {
    topicsDiscussed: string[]
    objectivesProgress: { [key: string]: number }
    conversationFlow: string
    timeUtilization: number
    engagementLevel: number
  } {
    const { conversationHistory, interviewObjectives, timeRemaining } = request
    
    // Extract topics discussed
    const topicsDiscussed = this.extractDiscussedTopics(conversationHistory)
    
    // Calculate objectives progress
    const objectivesProgress = this.calculateObjectivesProgress(interviewObjectives)
    
    // Analyze conversation flow
    const conversationFlow = this.analyzeConversationFlow(conversationHistory)
    
    // Calculate time utilization
    const timeUtilization = this.calculateTimeUtilization(request)
    
    // Assess engagement level
    const engagementLevel = this.assessEngagementLevel(conversationHistory)
    
    return {
      topicsDiscussed,
      objectivesProgress,
      conversationFlow,
      timeUtilization,
      engagementLevel
    }
  }

  private extractDiscussedTopics(history: ContextualMessage[]): string[] {
    const topics = new Set<string>()
    
    history.forEach(message => {
      if (message.metadata?.questionType) {
        topics.add(message.metadata.questionType)
      }
      
      // Extract from message content
      const content = message.content.toLowerCase()
      if (content.includes('experience')) topics.add('experience')
      if (content.includes('project')) topics.add('projects')
      if (content.includes('technical') || content.includes('technology')) topics.add('technical')
      if (content.includes('team')) topics.add('teamwork')
      if (content.includes('challenge')) topics.add('challenges')
    })
    
    return Array.from(topics)
  }

  private calculateObjectivesProgress(objectives: InterviewObjective[]): { [key: string]: number } {
    const progress: { [key: string]: number } = {}
    
    objectives.forEach(objective => {
      progress[objective.id] = objective.completed ? 1.0 : objective.confidence
    })
    
    return progress
  }

  private analyzeConversationFlow(history: ContextualMessage[]): string {
    if (history.length < 4) return 'opening'
    
    const recentMessages = history.slice(-4)
    const aiMessages = recentMessages.filter(m => m.role === 'assistant')
    
    if (aiMessages.some(m => m.content.includes('tell me about yourself'))) {
      return 'introduction'
    } else if (aiMessages.some(m => m.content.includes('experience'))) {
      return 'experience_exploration'
    } else if (aiMessages.some(m => m.content.includes('technical'))) {
      return 'technical_assessment'
    } else if (aiMessages.some(m => m.content.includes('team'))) {
      return 'behavioral_assessment'
    }
    
    return 'middle_conversation'
  }

  private calculateTimeUtilization(request: AdaptiveQuestionRequest): number {
    const totalTime = 60 // Assume 60 minutes total
    const usedTime = totalTime - request.timeRemaining
    return usedTime / totalTime
  }

  private assessEngagementLevel(history: ContextualMessage[]): number {
    if (history.length === 0) return 0.5
    
    const candidateMessages = history.filter(m => m.role === 'user')
    if (candidateMessages.length === 0) return 0.5
    
    let totalEngagement = 0
    let messageCount = 0
    
    candidateMessages.forEach(message => {
      if (message.sentiment) {
        const engagement = (message.sentiment.emotions.enthusiasm + message.sentiment.emotions.confidence) / 2
        totalEngagement += engagement
        messageCount++
      }
    })
    
    return messageCount > 0 ? totalEngagement / messageCount : 0.5
  }

  private async generatePrimaryQuestion(
    request: AdaptiveQuestionRequest,
    responseAnalysis: any,
    conversationContext: any
  ): Promise<GeneratedQuestion> {
    // Determine question type based on context
    const questionType = this.determineQuestionType(request, responseAnalysis, conversationContext)
    
    // Generate question content
    const questionContent = await this.generateQuestionContent(request, questionType, responseAnalysis)
    
    // Create question metadata
    const metadata: QuestionMetadata = {
      generatedAt: new Date(),
      source: 'adaptive',
      adaptationHistory: [],
      usageCount: 0
    }
    
    // Define scoring criteria
    const scoringCriteria = this.defineScoringCriteria(questionType, request)
    
    // Create triggers
    const triggers = this.createQuestionTriggers(questionType, responseAnalysis)
    
    // Generate adaptations
    const adaptations = this.generateQuestionAdaptations(questionType, request)
    
    return {
      id: `adaptive_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      text: questionContent,
      type: questionType,
      category: this.mapTypeToCategory(questionType),
      difficulty: this.determineDifficulty(request, responseAnalysis),
      intent: this.determineQuestionIntent(questionType, request),
      expectedDuration: this.estimateQuestionDuration(questionType),
      scoringCriteria,
      triggers,
      adaptations,
      metadata
    }
  }

  private determineQuestionType(
    request: AdaptiveQuestionRequest,
    responseAnalysis: any,
    conversationContext: any
  ): QuestionType {
    // If response was incomplete, ask for clarification
    if (responseAnalysis.completeness < 0.5) {
      return QuestionType.CLARIFICATION
    }
    
    // If technical depth is high, dive deeper
    if (responseAnalysis.technicalDepth > 0.7) {
      return QuestionType.DEEP_DIVE
    }
    
    // If behavioral indicators are present, explore behavior
    if (responseAnalysis.keyTopics.some((topic: string) => 
      ['team', 'leadership', 'conflict', 'challenge'].includes(topic.toLowerCase())
    )) {
      return QuestionType.BEHAVIORAL
    }
    
    // If technical skills mentioned, validate them
    if (responseAnalysis.skillsRevealed.length > 0) {
      return QuestionType.TECHNICAL
    }
    
    // Based on current phase
    switch (request.currentPhase) {
      case InterviewPhase.TECHNICAL:
        return QuestionType.TECHNICAL
      case InterviewPhase.BEHAVIORAL:
        return QuestionType.BEHAVIORAL
      case InterviewPhase.SITUATIONAL:
        return QuestionType.SITUATIONAL
      default:
        return QuestionType.OPEN_ENDED
    }
  }

  private async generateQuestionContent(
    request: AdaptiveQuestionRequest,
    questionType: QuestionType,
    responseAnalysis: any
  ): Promise<string> {
    const context = {
      candidateResponse: request.candidateResponse.content,
      skillsRevealed: responseAnalysis.skillsRevealed,
      gaps: responseAnalysis.gaps,
      phase: request.currentPhase,
      timeRemaining: request.timeRemaining
    }
    
    switch (questionType) {
      case QuestionType.CLARIFICATION:
        return this.generateClarificationQuestion(context)
      case QuestionType.DEEP_DIVE:
        return this.generateDeepDiveQuestion(context)
      case QuestionType.TECHNICAL:
        return this.generateTechnicalQuestion(context)
      case QuestionType.BEHAVIORAL:
        return this.generateBehavioralQuestion(context)
      default:
        return this.generateOpenEndedQuestion(context)
    }
  }

  private generateClarificationQuestion(context: any): string {
    const clarificationTypes = [
      `Could you elaborate more on ${this.extractKeyPhrase(context.candidateResponse)}?`,
      `That's interesting. Can you give me a specific example of ${this.extractKeyPhrase(context.candidateResponse)}?`,
      `I'd like to understand better - what specific role did you play in ${this.extractKeyPhrase(context.candidateResponse)}?`,
      `Can you walk me through the details of how you ${this.extractActionPhrase(context.candidateResponse)}?`
    ]
    
    return clarificationTypes[Math.floor(Math.random() * clarificationTypes.length)]
  }

  private generateDeepDiveQuestion(context: any): string {
    if (context.skillsRevealed.length > 0) {
      const skill = context.skillsRevealed[0]
      return `You mentioned ${skill}. Can you describe a challenging situation where you had to use your ${skill} skills to solve a complex problem?`
    }
    
    return `That sounds like a complex project. What was the most technically challenging aspect, and how did you approach solving it?`
  }

  private generateTechnicalQuestion(context: any): string {
    if (context.skillsRevealed.length > 0) {
      const skill = context.skillsRevealed[0]
      return `How do you stay current with ${skill} best practices, and can you share a recent improvement or optimization you've made?`
    }
    
    return `What technical decisions have you made recently that you're particularly proud of, and what was your reasoning behind them?`
  }

  private generateBehavioralQuestion(context: any): string {
    const behavioralQuestions = [
      "Tell me about a time when you had to work with a difficult team member. How did you handle the situation?",
      "Describe a situation where you had to learn something new quickly. What was your approach?",
      "Can you share an example of when you had to make a decision with incomplete information?",
      "Tell me about a time when you disagreed with your manager's decision. How did you handle it?"
    ]
    
    return behavioralQuestions[Math.floor(Math.random() * behavioralQuestions.length)]
  }

  private generateOpenEndedQuestion(context: any): string {
    const openEndedQuestions = [
      "What aspects of this role are you most excited about?",
      "How do you approach learning new technologies or skills?",
      "What's been your most rewarding project experience so far?",
      "How do you typically handle competing priorities in your work?"
    ]
    
    return openEndedQuestions[Math.floor(Math.random() * openEndedQuestions.length)]
  }

  private extractKeyPhrase(response: string): string {
    // Simple extraction - in practice, this would be more sophisticated
    const sentences = response.split(/[.!?]+/)
    const firstSentence = sentences[0] || response
    const words = firstSentence.split(/\s+/)
    
    // Look for key nouns or phrases
    const keyWords = words.filter(word => 
      word.length > 4 && !/^(the|and|but|for|are|was|were|been|have|has|had|will|would|could|should)$/i.test(word)
    )
    
    return keyWords.slice(0, 2).join(' ') || 'that'
  }

  private extractActionPhrase(response: string): string {
    const actionPatterns = [
      /\b(built|created|developed|implemented|designed|managed|led|solved|optimized)\s+([^.!?]+)/i,
      /\b(worked on|contributed to|was responsible for)\s+([^.!?]+)/i
    ]
    
    for (const pattern of actionPatterns) {
      const match = response.match(pattern)
      if (match) {
        return match[0]
      }
    }
    
    return 'approach that'
  }

  private async generateFollowUpQuestions(
    request: AdaptiveQuestionRequest,
    primaryQuestion: GeneratedQuestion
  ): Promise<GeneratedQuestion[]> {
    const followUps: GeneratedQuestion[] = []
    
    // Generate 2-3 potential follow-up questions
    for (let i = 0; i < 3; i++) {
      const followUp = await this.generateSingleFollowUp(request, primaryQuestion, i)
      if (followUp) {
        followUps.push(followUp)
      }
    }
    
    return followUps
  }

  private async generateSingleFollowUp(
    request: AdaptiveQuestionRequest,
    primaryQuestion: GeneratedQuestion,
    index: number
  ): Promise<GeneratedQuestion | null> {
    const followUpTypes = [
      'quantitative_details',
      'challenges_faced',
      'lessons_learned',
      'team_dynamics',
      'technical_decisions'
    ]
    
    const followUpType = followUpTypes[index % followUpTypes.length]
    const content = this.generateFollowUpContent(followUpType, primaryQuestion)
    
    if (!content) return null
    
    return {
      id: `followup_${Date.now()}_${index}`,
      text: content,
      type: QuestionType.CLARIFICATION,
      category: primaryQuestion.category,
      difficulty: primaryQuestion.difficulty,
      intent: QuestionIntent.CLARIFICATION,
      expectedDuration: 2,
      scoringCriteria: [],
      triggers: [],
      adaptations: [],
      metadata: {
        generatedAt: new Date(),
        source: 'adaptive',
        parentQuestionId: primaryQuestion.id,
        adaptationHistory: [],
        usageCount: 0
      }
    }
  }

  private generateFollowUpContent(type: string, primaryQuestion: GeneratedQuestion): string {
    switch (type) {
      case 'quantitative_details':
        return "Can you quantify the impact? What specific metrics or results did you achieve?"
      case 'challenges_faced':
        return "What was the biggest challenge you faced, and how did you overcome it?"
      case 'lessons_learned':
        return "Looking back, what would you do differently or what did you learn from this experience?"
      case 'team_dynamics':
        return "How did you collaborate with others on this? What was the team dynamic like?"
      case 'technical_decisions':
        return "What key technical decisions did you make, and what was your reasoning?"
      default:
        return "That's interesting. Can you tell me more about that?"
    }
  }

  private createBranchingLogic(
    request: AdaptiveQuestionRequest,
    responseAnalysis: any
  ): BranchingRule[] {
    const rules: BranchingRule[] = []
    
    // Rule for incomplete responses
    rules.push({
      condition: ResponseCondition.INCOMPLETE_ANSWER,
      action: BranchingAction.SEEK_CLARIFICATION,
      priority: 1,
      confidence: 0.8
    })
    
    // Rule for high technical confidence
    rules.push({
      condition: ResponseCondition.TECHNICAL_DETAIL,
      action: BranchingAction.DEEP_DIVE,
      priority: 2,
      confidence: 0.7
    })
    
    // Rule for low enthusiasm
    rules.push({
      condition: ResponseCondition.ENTHUSIASM_LOW,
      action: BranchingAction.PROVIDE_ENCOURAGEMENT,
      priority: 1,
      confidence: 0.6
    })
    
    // Rule for time constraints
    if (request.timeRemaining < 10) {
      rules.push({
        condition: ResponseCondition.TIME_SHORT,
        action: BranchingAction.WRAP_UP_TOPIC,
        priority: 1,
        confidence: 0.9
      })
    }
    
    return rules.sort((a, b) => b.priority - a.priority)
  }

  private suggestTopicTransitions(
    request: AdaptiveQuestionRequest,
    conversationContext: any
  ): TopicTransition[] {
    const transitions: TopicTransition[] = []
    
    // Check if current topic is exhausted
    if (conversationContext.engagementLevel < 0.4) {
      transitions.push({
        fromTopic: request.currentPhase,
        toTopic: this.getNextLogicalTopic(request.currentPhase),
        trigger: TransitionTrigger.TOPIC_EXHAUSTED,
        transitionPhrase: "Let's shift gears and talk about something different.",
        confidence: 0.7
      })
    }
    
    // Check for natural transition opportunities
    if (request.timeRemaining < 15 && request.currentPhase !== InterviewPhase.CONCLUSION) {
      transitions.push({
        fromTopic: request.currentPhase,
        toTopic: InterviewPhase.CONCLUSION,
        trigger: TransitionTrigger.TIME_CONSTRAINT,
        transitionPhrase: "As we're getting close to the end of our time, let me ask you a few final questions.",
        confidence: 0.9
      })
    }
    
    return transitions
  }

  private getNextLogicalTopic(currentPhase: InterviewPhase): string {
    const phaseProgression = {
      [InterviewPhase.INTRODUCTION]: InterviewPhase.BACKGROUND,
      [InterviewPhase.BACKGROUND]: InterviewPhase.TECHNICAL,
      [InterviewPhase.TECHNICAL]: InterviewPhase.BEHAVIORAL,
      [InterviewPhase.BEHAVIORAL]: InterviewPhase.SITUATIONAL,
      [InterviewPhase.SITUATIONAL]: InterviewPhase.COMPANY_FIT,
      [InterviewPhase.COMPANY_FIT]: InterviewPhase.QUESTIONS
    }
    
    return phaseProgression[currentPhase] || InterviewPhase.CONCLUSION
  }

  // Helper methods for question generation
  private mapTypeToCategory(type: QuestionType): QuestionCategory {
    const mapping = {
      [QuestionType.TECHNICAL]: QuestionCategory.TECHNICAL_SKILLS,
      [QuestionType.BEHAVIORAL]: QuestionCategory.BEHAVIORAL,
      [QuestionType.SITUATIONAL]: QuestionCategory.SITUATIONAL,
      [QuestionType.OPEN_ENDED]: QuestionCategory.BACKGROUND,
      [QuestionType.CLARIFICATION]: QuestionCategory.BACKGROUND,
      [QuestionType.DEEP_DIVE]: QuestionCategory.TECHNICAL_SKILLS,
      [QuestionType.TRANSITION]: QuestionCategory.BACKGROUND,
      [QuestionType.CLOSING]: QuestionCategory.CLOSING
    }
    
    return mapping[type] || QuestionCategory.BACKGROUND
  }

  private determineDifficulty(request: AdaptiveQuestionRequest, responseAnalysis: any): DifficultyLevel {
    if (responseAnalysis.technicalDepth > 0.8) {
      return DifficultyLevel.HARD
    } else if (responseAnalysis.technicalDepth > 0.5) {
      return DifficultyLevel.MEDIUM
    } else {
      return DifficultyLevel.EASY
    }
  }

  private determineQuestionIntent(type: QuestionType, request: AdaptiveQuestionRequest): QuestionIntent {
    const mapping = {
      [QuestionType.TECHNICAL]: QuestionIntent.SKILL_VALIDATION,
      [QuestionType.BEHAVIORAL]: QuestionIntent.CULTURAL_ASSESSMENT,
      [QuestionType.SITUATIONAL]: QuestionIntent.PROBLEM_SOLVING,
      [QuestionType.CLARIFICATION]: QuestionIntent.CLARIFICATION,
      [QuestionType.OPEN_ENDED]: QuestionIntent.INFORMATION_GATHERING
    }
    
    return mapping[type] || QuestionIntent.INFORMATION_GATHERING
  }

  private estimateQuestionDuration(type: QuestionType): number {
    const durations = {
      [QuestionType.CLARIFICATION]: 2,
      [QuestionType.OPEN_ENDED]: 3,
      [QuestionType.TECHNICAL]: 4,
      [QuestionType.BEHAVIORAL]: 5,
      [QuestionType.SITUATIONAL]: 4,
      [QuestionType.DEEP_DIVE]: 6
    }
    
    return durations[type] || 3
  }

  private defineScoringCriteria(type: QuestionType, request: AdaptiveQuestionRequest): ScoringCriterion[] {
    const criteria: ScoringCriterion[] = []
    
    switch (type) {
      case QuestionType.TECHNICAL:
        criteria.push({
          aspect: 'technical_accuracy',
          weight: 0.4,
          expectedIndicators: ['correct terminology', 'understanding of concepts', 'practical experience'],
          scoringRubric: {
            'excellent': 'Demonstrates deep understanding with accurate terminology',
            'good': 'Shows solid understanding with minor gaps',
            'fair': 'Basic understanding with some inaccuracies',
            'poor': 'Limited understanding or significant inaccuracies'
          }
        })
        break
      
      case QuestionType.BEHAVIORAL:
        criteria.push({
          aspect: 'behavioral_example',
          weight: 0.5,
          expectedIndicators: ['specific situation', 'actions taken', 'results achieved'],
          scoringRubric: {
            'excellent': 'Clear STAR format with specific, relevant example',
            'good': 'Good example with most STAR elements',
            'fair': 'Relevant example but missing some details',
            'poor': 'Vague or irrelevant example'
          }
        })
        break
    }
    
    return criteria
  }

  private createQuestionTriggers(type: QuestionType, responseAnalysis: any): QuestionTrigger[] {
    const triggers: QuestionTrigger[] = []
    
    if (responseAnalysis.completeness < 0.5) {
      triggers.push({
        type: 'response_content',
        condition: 'incomplete_response',
        priority: 1
      })
    }
    
    if (responseAnalysis.technicalDepth > 0.7) {
      triggers.push({
        type: 'response_content',
        condition: 'high_technical_depth',
        priority: 2
      })
    }
    
    return triggers
  }

  private generateQuestionAdaptations(type: QuestionType, request: AdaptiveQuestionRequest): QuestionAdaptation[] {
    const adaptations: QuestionAdaptation[] = []
    
    // Add common adaptations
    adaptations.push({
      trigger: 'confusion_detected',
      modification: 'simplify',
      reasoning: 'Candidate seems confused, simplify the question'
    })
    
    adaptations.push({
      trigger: 'expert_response',
      modification: 'deepen',
      reasoning: 'Candidate shows expertise, ask more challenging follow-up'
    })
    
    return adaptations
  }

  private calculateConfidenceAndReasoning(
    request: AdaptiveQuestionRequest,
    responseAnalysis: any,
    primaryQuestion: GeneratedQuestion,
    conversationContext: any
  ): { confidence: number; reasoning: string[] } {
    let confidence = 0.7 // Base confidence
    const reasoning: string[] = []
    
    // Adjust based on response analysis quality
    if (responseAnalysis.confidence > 0.8) {
      confidence += 0.1
      reasoning.push('High confidence in response analysis')
    }
    
    // Adjust based on conversation context
    if (conversationContext.engagementLevel > 0.7) {
      confidence += 0.1
      reasoning.push('High candidate engagement detected')
    }
    
    // Adjust based on question type appropriateness
    if (primaryQuestion.type === QuestionType.CLARIFICATION && responseAnalysis.completeness < 0.5) {
      confidence += 0.1
      reasoning.push('Clarification question appropriate for incomplete response')
    }
    
    return {
      confidence: Math.min(confidence, 1.0),
      reasoning
    }
  }

  // Public utility methods
  async getQuestionHistory(interviewId: string): Promise<GeneratedQuestion[]> {
    return this.questionHistory.get(interviewId) || []
  }

  async getBranchingHistory(interviewId: string): Promise<BranchingRule[]> {
    return this.branchingHistory.get(interviewId) || []
  }

  recordQuestionUsage(questionId: string, effectiveness: number): void {
    // Record question effectiveness for future improvements
    console.log(`Question ${questionId} effectiveness: ${effectiveness}`)
  }
}

// Singleton instance
export const adaptiveQuestioningEngine = new AdaptiveQuestioningEngine()