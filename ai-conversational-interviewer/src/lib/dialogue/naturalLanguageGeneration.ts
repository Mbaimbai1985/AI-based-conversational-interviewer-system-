import { ContextualMessage, InterviewPhase } from '../interview/conversationFlow'
import { DynamicProfile } from '../candidate/profileBuilder'
import { GeneratedQuestion, QuestionType, QuestionIntent } from './adaptiveQuestioning'
import { generateAIResponse, AIMessage } from '../ai/openai'

export interface ResponseGenerationRequest {
  context: ResponseContext
  intent: ResponseIntent
  style: ResponseStyle
  constraints: ResponseConstraint[]
  personalization: PersonalizationData
}

export interface ResponseContext {
  conversationHistory: ContextualMessage[]
  currentPhase: InterviewPhase
  candidateProfile: DynamicProfile
  lastCandidateResponse: ContextualMessage
  interviewObjectives: string[]
  timeRemaining: number
}

export interface ResponseStyle {
  tone: ConversationTone
  formality: FormalityLevel
  enthusiasm: EnthusiasmLevel
  pace: ConversationPace
  culturalAdaptation: CulturalStyle
  brandVoice: BrandVoice
}

export interface ResponseConstraint {
  type: ConstraintType
  value: any
  priority: ConstraintPriority
  description: string
}

export interface PersonalizationData {
  candidateName?: string
  candidatePreferences: CandidatePreference[]
  companyInfo: CompanyInfo
  roleSpecifics: RoleSpecifics
  interviewerProfile: InterviewerProfile
}

export interface GeneratedResponse {
  id: string
  content: string
  intent: ResponseIntent
  style: ResponseStyle
  confidence: number
  alternatives: ResponseAlternative[]
  metadata: ResponseMetadata
  adaptations: ResponseAdaptation[]
  qualityMetrics: QualityMetrics
}

export interface ResponseAlternative {
  content: string
  styleVariation: ResponseStyle
  confidence: number
  useCase: string
  reasoning: string
}

export interface ResponseMetadata {
  generatedAt: Date
  generationMethod: GenerationMethod
  templateUsed?: string
  aiModel?: string
  processingTime: number
  tokens: number
  version: string
}

export interface ResponseAdaptation {
  trigger: AdaptationTrigger
  originalContent: string
  adaptedContent: string
  reasoning: string
  confidence: number
}

export interface QualityMetrics {
  clarity: number
  relevance: number
  engagement: number
  appropriateness: number
  naturalness: number
  consistency: number
}

export interface CandidatePreference {
  type: 'communication_style' | 'formality_level' | 'pace' | 'feedback_frequency'
  value: string
  confidence: number
  inferredFrom: string
}

export interface CompanyInfo {
  name: string
  industry: string
  size: CompanySize
  culture: CompanyCulture
  values: string[]
  communicationStyle: string
  brandPersonality: string[]
}

export interface RoleSpecifics {
  title: string
  level: string
  department: string
  teamSize: number
  reportingStructure: string
  keyResponsibilities: string[]
  requiredSkills: string[]
}

export interface InterviewerProfile {
  name?: string
  title?: string
  experience: string
  specialization: string[]
  communicationStyle: string
  interviewingApproach: string
}

export interface BrandVoice {
  attributes: string[]
  doList: string[]
  dontList: string[]
  examplePhrases: string[]
  toneModifiers: string[]
}

export enum ResponseIntent {
  ASK_QUESTION = 'ask_question',
  PROVIDE_FEEDBACK = 'provide_feedback',
  TRANSITION_TOPIC = 'transition_topic',
  CLARIFY_RESPONSE = 'clarify_response',
  ENCOURAGE = 'encourage',
  SUMMARIZE = 'summarize',
  WRAP_UP = 'wrap_up',
  BUILD_RAPPORT = 'build_rapport',
  VALIDATE_UNDERSTANDING = 'validate_understanding'
}

export enum ConversationTone {
  PROFESSIONAL = 'professional',
  FRIENDLY = 'friendly',
  CASUAL = 'casual',
  FORMAL = 'formal',
  ENCOURAGING = 'encouraging',
  CONVERSATIONAL = 'conversational',
  NEUTRAL = 'neutral'
}

export enum FormalityLevel {
  VERY_FORMAL = 'very_formal',
  FORMAL = 'formal',
  SEMI_FORMAL = 'semi_formal',
  CASUAL = 'casual',
  VERY_CASUAL = 'very_casual'
}

export enum EnthusiasmLevel {
  HIGH = 'high',
  MODERATE = 'moderate',
  LOW = 'low',
  NEUTRAL = 'neutral'
}

export enum ConversationPace {
  FAST = 'fast',
  MODERATE = 'moderate',
  SLOW = 'slow',
  ADAPTIVE = 'adaptive'
}

export enum CulturalStyle {
  DIRECT = 'direct',
  INDIRECT = 'indirect',
  HIGH_CONTEXT = 'high_context',
  LOW_CONTEXT = 'low_context',
  NEUTRAL = 'neutral'
}

export enum CompanySize {
  STARTUP = 'startup',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  ENTERPRISE = 'enterprise'
}

export enum CompanyCulture {
  INNOVATIVE = 'innovative',
  TRADITIONAL = 'traditional',
  COLLABORATIVE = 'collaborative',
  COMPETITIVE = 'competitive',
  RELAXED = 'relaxed',
  FAST_PACED = 'fast_paced',
  HIERARCHICAL = 'hierarchical',
  FLAT = 'flat'
}

export enum ConstraintType {
  MAX_LENGTH = 'max_length',
  MIN_LENGTH = 'min_length',
  FORBIDDEN_WORDS = 'forbidden_words',
  REQUIRED_PHRASES = 'required_phrases',
  TIME_LIMIT = 'time_limit',
  COMPLEXITY_LEVEL = 'complexity_level',
  CULTURAL_SENSITIVITY = 'cultural_sensitivity'
}

export enum ConstraintPriority {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

export enum GenerationMethod {
  TEMPLATE_BASED = 'template_based',
  AI_GENERATED = 'ai_generated',
  HYBRID = 'hybrid',
  RULE_BASED = 'rule_based'
}

export enum AdaptationTrigger {
  CANDIDATE_CONFUSION = 'candidate_confusion',
  ENGAGEMENT_DROP = 'engagement_drop',
  CULTURAL_MISMATCH = 'cultural_mismatch',
  COMPLEXITY_MISMATCH = 'complexity_mismatch',
  TIME_PRESSURE = 'time_pressure',
  STYLE_MISMATCH = 'style_mismatch'
}

export class NaturalLanguageGenerator {
  private responseTemplates: Map<string, ResponseTemplate> = new Map()
  private styleAdapters: Map<string, StyleAdapter> = new Map()
  private culturalAdapters: Map<string, CulturalAdapter> = new Map()
  private generationHistory: Map<string, GeneratedResponse[]> = new Map()

  constructor() {
    this.initializeResponseTemplates()
    this.initializeStyleAdapters()
    this.initializeCulturalAdapters()
  }

  private initializeResponseTemplates(): void {
    const templates: ResponseTemplate[] = [
      // Question asking templates
      {
        id: 'open_question',
        intent: ResponseIntent.ASK_QUESTION,
        pattern: '{opener} {question} {encouragement}',
        variables: {
          opener: ['', 'I\'d like to understand', 'Could you tell me', 'I\'m curious about'],
          question: ['{core_question}'],
          encouragement: ['', 'Take your time', 'Feel free to elaborate', 'I\'m interested in the details']
        },
        tone: ConversationTone.FRIENDLY,
        formality: FormalityLevel.SEMI_FORMAL
      },
      {
        id: 'clarification',
        intent: ResponseIntent.CLARIFY_RESPONSE,
        pattern: '{acknowledgment} {clarification_request} {specific_focus}',
        variables: {
          acknowledgment: ['That\'s interesting', 'I see', 'Thanks for sharing that'],
          clarification_request: ['Could you elaborate on', 'Can you tell me more about', 'I\'d like to understand better'],
          specific_focus: ['{specific_aspect}', 'that part', 'those details']
        },
        tone: ConversationTone.CONVERSATIONAL,
        formality: FormalityLevel.CASUAL
      },
      {
        id: 'feedback_positive',
        intent: ResponseIntent.PROVIDE_FEEDBACK,
        pattern: '{positive_acknowledgment} {specific_praise} {transition}',
        variables: {
          positive_acknowledgment: ['Great!', 'Excellent', 'That sounds impressive', 'I appreciate that example'],
          specific_praise: ['Your experience with {skill} is valuable', 'That shows good {trait}', 'That\'s a solid approach'],
          transition: ['Now, let\'s talk about', 'Moving on to', 'I\'d also like to explore']
        },
        tone: ConversationTone.ENCOURAGING,
        formality: FormalityLevel.FRIENDLY
      },
      {
        id: 'topic_transition',
        intent: ResponseIntent.TRANSITION_TOPIC,
        pattern: '{bridge} {new_topic_intro} {engagement}',
        variables: {
          bridge: ['Let\'s shift gears', 'Now I\'d like to explore', 'Moving to a different area'],
          new_topic_intro: ['I\'m interested in your thoughts on', 'Tell me about your experience with', 'How do you approach'],
          engagement: ['{new_topic}', 'this aspect of your background', 'this area']
        },
        tone: ConversationTone.PROFESSIONAL,
        formality: FormalityLevel.SEMI_FORMAL
      }
    ]

    templates.forEach(template => {
      this.responseTemplates.set(template.id, template)
    })
  }

  private initializeStyleAdapters(): void {
    const adapters: StyleAdapter[] = [
      {
        id: 'formal_adapter',
        targetStyle: { tone: ConversationTone.FORMAL, formality: FormalityLevel.FORMAL },
        adaptations: {
          'Can you': 'Could you please',
          'Tell me': 'Would you be able to share',
          'That\'s great': 'That is excellent',
          'Let\'s': 'Shall we',
          'I want to': 'I would like to'
        },
        rules: [
          'Use complete sentences',
          'Avoid contractions',
          'Use formal vocabulary',
          'Include please and thank you'
        ]
      },
      {
        id: 'casual_adapter',
        targetStyle: { tone: ConversationTone.CASUAL, formality: FormalityLevel.CASUAL },
        adaptations: {
          'Could you please': 'Can you',
          'Would you be able to': 'Tell me',
          'That is excellent': 'That\'s awesome',
          'Shall we': 'Let\'s',
          'I would like to': 'I want to'
        },
        rules: [
          'Use contractions naturally',
          'Keep sentences concise',
          'Use everyday vocabulary',
          'Be conversational'
        ]
      },
      {
        id: 'encouraging_adapter',
        targetStyle: { tone: ConversationTone.ENCOURAGING, enthusiasm: EnthusiasmLevel.HIGH },
        adaptations: {
          'Good': 'Great!',
          'Interesting': 'That\'s really interesting!',
          'I see': 'I love hearing about that',
          'Tell me more': 'I\'d love to hear more about this'
        },
        rules: [
          'Add positive reinforcement',
          'Use enthusiastic language',
          'Include appreciation phrases',
          'Encourage elaboration'
        ]
      }
    ]

    adapters.forEach(adapter => {
      this.styleAdapters.set(adapter.id, adapter)
    })
  }

  private initializeCulturalAdapters(): void {
    const adapters: CulturalAdapter[] = [
      {
        id: 'direct_communication',
        culturalStyle: CulturalStyle.DIRECT,
        adaptations: {
          questionStyle: 'direct_and_specific',
          feedbackStyle: 'immediate_and_clear',
          transitionStyle: 'explicit'
        },
        modifications: [
          'Ask direct, specific questions',
          'Provide clear, immediate feedback',
          'Use explicit transitions',
          'Be straightforward about expectations'
        ],
        avoidances: [
          'Overly indirect language',
          'Excessive politeness markers',
          'Ambiguous statements'
        ]
      },
      {
        id: 'high_context',
        culturalStyle: CulturalStyle.HIGH_CONTEXT,
        adaptations: {
          questionStyle: 'contextual_and_nuanced',
          feedbackStyle: 'subtle_and_layered',
          transitionStyle: 'gradual'
        },
        modifications: [
          'Provide more context in questions',
          'Use subtle feedback mechanisms',
          'Allow for gradual topic transitions',
          'Include relationship-building elements'
        ],
        avoidances: [
          'Overly direct criticism',
          'Abrupt topic changes',
          'Minimal context'
        ]
      }
    ]

    adapters.forEach(adapter => {
      this.culturalAdapters.set(adapter.id, adapter)
    })
  }

  // Main generation method
  async generateResponse(request: ResponseGenerationRequest): Promise<GeneratedResponse> {
    const startTime = Date.now()
    
    // Analyze context and determine generation strategy
    const strategy = this.determineGenerationStrategy(request)
    
    // Generate base content
    const baseContent = await this.generateBaseContent(request, strategy)
    
    // Apply style adaptations
    const styledContent = await this.applyStyleAdaptations(baseContent, request.style)
    
    // Apply personalization
    const personalizedContent = this.applyPersonalization(styledContent, request.personalization)
    
    // Apply constraints
    const finalContent = this.applyConstraints(personalizedContent, request.constraints)
    
    // Generate alternatives
    const alternatives = await this.generateAlternatives(request, finalContent)
    
    // Calculate quality metrics
    const qualityMetrics = this.calculateQualityMetrics(finalContent, request)
    
    // Create metadata
    const metadata: ResponseMetadata = {
      generatedAt: new Date(),
      generationMethod: strategy.method,
      templateUsed: strategy.templateId,
      processingTime: Date.now() - startTime,
      tokens: finalContent.split(' ').length,
      version: '1.0.0'
    }

    const response: GeneratedResponse = {
      id: `response_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      content: finalContent,
      intent: request.intent,
      style: request.style,
      confidence: strategy.confidence,
      alternatives,
      metadata,
      adaptations: [],
      qualityMetrics
    }

    // Store in history
    const interviewId = this.extractInterviewId(request.context)
    if (interviewId) {
      if (!this.generationHistory.has(interviewId)) {
        this.generationHistory.set(interviewId, [])
      }
      this.generationHistory.get(interviewId)!.push(response)
    }

    return response
  }

  private determineGenerationStrategy(request: ResponseGenerationRequest): {
    method: GenerationMethod
    templateId?: string
    confidence: number
    reasoning: string[]
  } {
    const reasoning: string[] = []
    let method = GenerationMethod.TEMPLATE_BASED
    let templateId: string | undefined
    let confidence = 0.8

    // Check if we have a suitable template
    const suitableTemplate = this.findSuitableTemplate(request.intent, request.style)
    
    if (suitableTemplate) {
      method = GenerationMethod.TEMPLATE_BASED
      templateId = suitableTemplate.id
      reasoning.push('Suitable template found for intent and style')
    } else {
      method = GenerationMethod.AI_GENERATED
      confidence = 0.7
      reasoning.push('No suitable template, using AI generation')
    }

    // Complex contexts might benefit from AI generation
    if (request.context.conversationHistory.length > 10 || 
        request.personalization.candidatePreferences.length > 3) {
      method = GenerationMethod.HYBRID
      confidence = 0.9
      reasoning.push('Complex context detected, using hybrid approach')
    }

    return { method, templateId, confidence, reasoning }
  }

  private findSuitableTemplate(intent: ResponseIntent, style: ResponseStyle): ResponseTemplate | null {
    for (const template of this.responseTemplates.values()) {
      if (template.intent === intent) {
        // Check style compatibility
        const toneMatch = this.isStyleCompatible(template.tone, style.tone)
        const formalityMatch = this.isFormalityCompatible(template.formality, style.formality)
        
        if (toneMatch && formalityMatch) {
          return template
        }
      }
    }
    return null
  }

  private isStyleCompatible(templateTone: ConversationTone, requestedTone: ConversationTone): boolean {
    const compatibility = {
      [ConversationTone.PROFESSIONAL]: [ConversationTone.PROFESSIONAL, ConversationTone.FORMAL, ConversationTone.NEUTRAL],
      [ConversationTone.FRIENDLY]: [ConversationTone.FRIENDLY, ConversationTone.CONVERSATIONAL, ConversationTone.ENCOURAGING],
      [ConversationTone.CASUAL]: [ConversationTone.CASUAL, ConversationTone.FRIENDLY, ConversationTone.CONVERSATIONAL],
      [ConversationTone.FORMAL]: [ConversationTone.FORMAL, ConversationTone.PROFESSIONAL],
      [ConversationTone.ENCOURAGING]: [ConversationTone.ENCOURAGING, ConversationTone.FRIENDLY],
      [ConversationTone.CONVERSATIONAL]: [ConversationTone.CONVERSATIONAL, ConversationTone.FRIENDLY, ConversationTone.CASUAL],
      [ConversationTone.NEUTRAL]: [ConversationTone.NEUTRAL, ConversationTone.PROFESSIONAL]
    }

    return compatibility[templateTone]?.includes(requestedTone) || false
  }

  private isFormalityCompatible(templateFormality: FormalityLevel, requestedFormality: FormalityLevel): boolean {
    const formalityOrder = [
      FormalityLevel.VERY_CASUAL,
      FormalityLevel.CASUAL,
      FormalityLevel.SEMI_FORMAL,
      FormalityLevel.FORMAL,
      FormalityLevel.VERY_FORMAL
    ]

    const templateIndex = formalityOrder.indexOf(templateFormality)
    const requestedIndex = formalityOrder.indexOf(requestedFormality)
    
    // Allow one level difference
    return Math.abs(templateIndex - requestedIndex) <= 1
  }

  private async generateBaseContent(
    request: ResponseGenerationRequest, 
    strategy: any
  ): Promise<string> {
    switch (strategy.method) {
      case GenerationMethod.TEMPLATE_BASED:
        return this.generateFromTemplate(request, strategy.templateId!)
      case GenerationMethod.AI_GENERATED:
        return this.generateWithAI(request)
      case GenerationMethod.HYBRID:
        return this.generateHybrid(request, strategy.templateId)
      default:
        return this.generateFromTemplate(request, 'open_question')
    }
  }

  private generateFromTemplate(request: ResponseGenerationRequest, templateId: string): string {
    const template = this.responseTemplates.get(templateId)
    if (!template) {
      return "I'd like to hear more about your experience."
    }

    let content = template.pattern

    // Replace variables in the pattern
    Object.entries(template.variables).forEach(([variable, options]) => {
      const placeholder = `{${variable}}`
      if (content.includes(placeholder)) {
        const replacement = this.selectVariableOption(options, request)
        content = content.replace(new RegExp(`\\{${variable}\\}`, 'g'), replacement)
      }
    })

    // Handle special placeholders
    content = this.replaceSpecialPlaceholders(content, request)

    return content.trim()
  }

  private selectVariableOption(options: string[], request: ResponseGenerationRequest): string {
    // Simple selection - could be enhanced with more sophisticated logic
    const validOptions = options.filter(option => option !== '')
    
    if (validOptions.length === 0) return ''
    
    // Select based on context or randomly
    if (request.style.enthusiasm === EnthusiasmLevel.HIGH) {
      // Prefer more enthusiastic options
      const enthusiasticOptions = validOptions.filter(option => 
        option.includes('!') || option.includes('great') || option.includes('excellent')
      )
      if (enthusiasticOptions.length > 0) {
        return enthusiasticOptions[Math.floor(Math.random() * enthusiasticOptions.length)]
      }
    }

    return validOptions[Math.floor(Math.random() * validOptions.length)]
  }

  private replaceSpecialPlaceholders(content: string, request: ResponseGenerationRequest): string {
    const context = request.context
    const personalization = request.personalization

    // Replace {core_question} with context-appropriate question
    if (content.includes('{core_question}')) {
      const coreQuestion = this.generateCoreQuestion(request)
      content = content.replace('{core_question}', coreQuestion)
    }

    // Replace {specific_aspect} with relevant detail
    if (content.includes('{specific_aspect}')) {
      const aspect = this.extractSpecificAspect(context.lastCandidateResponse)
      content = content.replace('{specific_aspect}', aspect)
    }

    // Replace {skill} with mentioned skill
    if (content.includes('{skill}')) {
      const skill = this.extractMentionedSkill(context.lastCandidateResponse)
      content = content.replace('{skill}', skill)
    }

    // Replace {trait} with inferred trait
    if (content.includes('{trait}')) {
      const trait = this.inferTrait(context.lastCandidateResponse)
      content = content.replace('{trait}', trait)
    }

    // Replace {new_topic} with next topic
    if (content.includes('{new_topic}')) {
      const newTopic = this.determineNewTopic(context)
      content = content.replace('{new_topic}', newTopic)
    }

    return content
  }

  private generateCoreQuestion(request: ResponseGenerationRequest): string {
    const intent = request.intent
    const phase = request.context.currentPhase
    const lastResponse = request.context.lastCandidateResponse

    switch (intent) {
      case ResponseIntent.ASK_QUESTION:
        return this.generatePhaseAppropriateQuestion(phase, lastResponse)
      case ResponseIntent.CLARIFY_RESPONSE:
        return this.generateClarificationQuestion(lastResponse)
      case ResponseIntent.TRANSITION_TOPIC:
        return this.generateTransitionQuestion(phase)
      default:
        return "your experience with this"
    }
  }

  private generatePhaseAppropriateQuestion(phase: InterviewPhase, lastResponse: ContextualMessage): string {
    const questionBank = {
      [InterviewPhase.INTRODUCTION]: [
        "your background and what brought you to this field",
        "what interests you about this role",
        "your current position and responsibilities"
      ],
      [InterviewPhase.BACKGROUND]: [
        "your experience with the technologies we use",
        "a project you're particularly proud of",
        "how you've grown in your current role"
      ],
      [InterviewPhase.TECHNICAL]: [
        "your approach to solving complex technical problems",
        "how you stay current with technology trends",
        "a challenging technical decision you've made"
      ],
      [InterviewPhase.BEHAVIORAL]: [
        "a time when you had to work with a difficult team member",
        "how you handle competing priorities",
        "your approach to giving and receiving feedback"
      ]
    }

    const questions = questionBank[phase] || questionBank[InterviewPhase.BACKGROUND]
    return questions[Math.floor(Math.random() * questions.length)]
  }

  private generateClarificationQuestion(lastResponse: ContextualMessage): string {
    const content = lastResponse.content.toLowerCase()
    
    if (content.includes('project')) {
      return "the specific technologies and challenges in that project"
    } else if (content.includes('team')) {
      return "the team dynamics and your role"
    } else if (content.includes('problem')) {
      return "your specific approach to solving that problem"
    } else {
      return "those specific details"
    }
  }

  private generateTransitionQuestion(phase: InterviewPhase): string {
    const transitions = {
      [InterviewPhase.INTRODUCTION]: "your technical background",
      [InterviewPhase.BACKGROUND]: "your problem-solving approach",
      [InterviewPhase.TECHNICAL]: "how you work with others",
      [InterviewPhase.BEHAVIORAL]: "how you handle different scenarios"
    }

    return transitions[phase] || "the next aspect of your background"
  }

  private extractSpecificAspect(response: ContextualMessage): string {
    const entities = response.entities || []
    const skillEntities = entities.filter(e => e.type === 'skill' || e.type === 'technology')
    
    if (skillEntities.length > 0) {
      return `your experience with ${skillEntities[0].value}`
    }

    const content = response.content.toLowerCase()
    if (content.includes('project')) {
      return "that project"
    } else if (content.includes('team')) {
      return "the team situation"
    } else if (content.includes('challenge')) {
      return "that challenge"
    }

    return "that aspect"
  }

  private extractMentionedSkill(response: ContextualMessage): string {
    const entities = response.entities || []
    const skillEntities = entities.filter(e => e.type === 'skill' || e.type === 'technology')
    
    return skillEntities.length > 0 ? skillEntities[0].value : "that skill"
  }

  private inferTrait(response: ContextualMessage): string {
    const content = response.content.toLowerCase()
    
    if (content.includes('lead') || content.includes('manage')) {
      return "leadership"
    } else if (content.includes('team') || content.includes('collaborate')) {
      return "teamwork"
    } else if (content.includes('solve') || content.includes('fix')) {
      return "problem-solving"
    } else if (content.includes('learn') || content.includes('adapt')) {
      return "adaptability"
    }

    return "initiative"
  }

  private determineNewTopic(context: ResponseContext): string {
    const phase = context.currentPhase
    const nextTopics = {
      [InterviewPhase.INTRODUCTION]: "your technical experience",
      [InterviewPhase.BACKGROUND]: "specific technical challenges",
      [InterviewPhase.TECHNICAL]: "your work style and collaboration",
      [InterviewPhase.BEHAVIORAL]: "hypothetical scenarios"
    }

    return nextTopics[phase] || "another aspect of your background"
  }

  private async generateWithAI(request: ResponseGenerationRequest): Promise<string> {
    const context = request.context
    const style = request.style
    
    const prompt = this.constructAIPrompt(request)
    
    try {
      const messages: AIMessage[] = [
        {
          role: 'system',
          content: prompt
        },
        {
          role: 'user',
          content: `Generate an interview response based on the candidate's last message: "${context.lastCandidateResponse.content}"`
        }
      ]

      const aiResponse = await generateAIResponse(messages)
      return aiResponse.content
    } catch (error) {
      console.error('AI generation failed:', error)
      return this.getFallbackResponse(request)
    }
  }

  private constructAIPrompt(request: ResponseGenerationRequest): string {
    const { context, intent, style, personalization } = request
    
    return `You are an AI interviewer conducting a ${context.currentPhase} phase interview. 

    Your response should:
    - Have a ${style.tone} tone with ${style.formality} formality level
    - Be ${style.enthusiasm} in enthusiasm
    - ${intent === ResponseIntent.ASK_QUESTION ? 'Ask a thoughtful follow-up question' : ''}
    - ${intent === ResponseIntent.PROVIDE_FEEDBACK ? 'Provide constructive feedback' : ''}
    - ${intent === ResponseIntent.CLARIFY_RESPONSE ? 'Seek clarification on specific points' : ''}
    
    Company context: ${personalization.companyInfo.name} (${personalization.companyInfo.industry})
    Role: ${personalization.roleSpecifics.title}
    
    Keep your response conversational, professional, and engaging. Aim for 1-2 sentences.`
  }

  private async generateHybrid(request: ResponseGenerationRequest, templateId?: string): Promise<string> {
    // Start with template if available
    let baseContent = templateId ? 
      this.generateFromTemplate(request, templateId) : 
      "I'd like to understand more about your experience."

    // Enhance with AI if the template result is too generic
    if (baseContent.length < 50 || baseContent.includes('your experience')) {
      const aiEnhanced = await this.generateWithAI(request)
      
      // Blend template structure with AI content
      const templateStructure = this.extractTemplateStructure(baseContent)
      baseContent = this.blendContentWithStructure(aiEnhanced, templateStructure)
    }

    return baseContent
  }

  private extractTemplateStructure(content: string): string {
    // Extract the general structure of the template
    const sentences = content.split('.')
    return sentences.map(s => s.trim()).filter(s => s.length > 0).join('. ') + '.'
  }

  private blendContentWithStructure(aiContent: string, templateStructure: string): string {
    // Simple blending - in practice, this would be more sophisticated
    if (aiContent.length > templateStructure.length) {
      return aiContent
    } else {
      return templateStructure
    }
  }

  private getFallbackResponse(request: ResponseGenerationRequest): string {
    const fallbacks = {
      [ResponseIntent.ASK_QUESTION]: "Can you tell me more about that?",
      [ResponseIntent.PROVIDE_FEEDBACK]: "That's a great example.",
      [ResponseIntent.CLARIFY_RESPONSE]: "Could you elaborate on that point?",
      [ResponseIntent.TRANSITION_TOPIC]: "Let's talk about something different.",
      [ResponseIntent.ENCOURAGE]: "You're doing great so far."
    }

    return fallbacks[request.intent] || "I'd like to hear more about your experience."
  }

  private async applyStyleAdaptations(content: string, style: ResponseStyle): Promise<string> {
    let adaptedContent = content

    // Apply tone adaptations
    const toneAdapter = this.findToneAdapter(style.tone, style.formality)
    if (toneAdapter) {
      adaptedContent = this.applyStyleAdapter(adaptedContent, toneAdapter)
    }

    // Apply cultural adaptations
    if (style.culturalAdaptation !== CulturalStyle.NEUTRAL) {
      const culturalAdapter = this.findCulturalAdapter(style.culturalAdaptation)
      if (culturalAdapter) {
        adaptedContent = this.applyCulturalAdapter(adaptedContent, culturalAdapter)
      }
    }

    // Apply brand voice
    if (style.brandVoice) {
      adaptedContent = this.applyBrandVoice(adaptedContent, style.brandVoice)
    }

    return adaptedContent
  }

  private findToneAdapter(tone: ConversationTone, formality: FormalityLevel): StyleAdapter | null {
    for (const adapter of this.styleAdapters.values()) {
      if (adapter.targetStyle.tone === tone && adapter.targetStyle.formality === formality) {
        return adapter
      }
    }
    return null
  }

  private findCulturalAdapter(culturalStyle: CulturalStyle): CulturalAdapter | null {
    for (const adapter of this.culturalAdapters.values()) {
      if (adapter.culturalStyle === culturalStyle) {
        return adapter
      }
    }
    return null
  }

  private applyStyleAdapter(content: string, adapter: StyleAdapter): string {
    let adaptedContent = content

    // Apply word/phrase substitutions
    Object.entries(adapter.adaptations).forEach(([from, to]) => {
      const regex = new RegExp(`\\b${from}\\b`, 'gi')
      adaptedContent = adaptedContent.replace(regex, to)
    })

    return adaptedContent
  }

  private applyCulturalAdapter(content: string, adapter: CulturalAdapter): string {
    // Apply cultural modifications based on the adapter rules
    let adaptedContent = content

    // This is a simplified implementation - in practice, you'd have more sophisticated
    // cultural adaptation logic based on the adapter's modifications and avoidances
    
    if (adapter.culturalStyle === CulturalStyle.DIRECT) {
      // Make content more direct
      adaptedContent = adaptedContent.replace(/might be able to/g, 'can')
      adaptedContent = adaptedContent.replace(/perhaps/g, '')
      adaptedContent = adaptedContent.replace(/I was wondering if/g, 'Can')
    } else if (adapter.culturalStyle === CulturalStyle.HIGH_CONTEXT) {
      // Add more context and soften language
      adaptedContent = adaptedContent.replace(/^Can you/g, 'I was wondering if you might be able to')
      adaptedContent = adaptedContent.replace(/Tell me/g, 'I\'d be interested to hear')
    }

    return adaptedContent
  }

  private applyBrandVoice(content: string, brandVoice: BrandVoice): string {
    let adaptedContent = content

    // Apply brand voice attributes
    brandVoice.toneModifiers.forEach(modifier => {
      if (modifier === 'warm') {
        adaptedContent = adaptedContent.replace(/I want to/g, 'I\'d love to')
      } else if (modifier === 'professional') {
        adaptedContent = adaptedContent.replace(/awesome/g, 'excellent')
      }
    })

    // Ensure compliance with do/don't lists
    brandVoice.dontList.forEach(forbiddenPhrase => {
      const regex = new RegExp(forbiddenPhrase, 'gi')
      if (regex.test(adaptedContent)) {
        // Replace with alternative from doList if available
        const alternative = brandVoice.doList[0] || 'appropriate alternative'
        adaptedContent = adaptedContent.replace(regex, alternative)
      }
    })

    return adaptedContent
  }

  private applyPersonalization(content: string, personalization: PersonalizationData): string {
    let personalizedContent = content

    // Add candidate name if appropriate and available
    if (personalization.candidateName && content.includes('you')) {
      // Occasionally use name for more personal touch
      if (Math.random() < 0.3) {
        personalizedContent = personalizedContent.replace(/\byou\b/, personalization.candidateName)
      }
    }

    // Adapt based on candidate preferences
    personalization.candidatePreferences.forEach(preference => {
      if (preference.type === 'formality_level' && preference.confidence > 0.7) {
        // Adjust formality based on detected preference
        if (preference.value === 'casual') {
          personalizedContent = personalizedContent.replace(/Could you please/g, 'Can you')
          personalizedContent = personalizedContent.replace(/I would like to/g, 'I\'d like to')
        }
      }
    })

    // Add role-specific context
    if (personalizedContent.includes('this role') && personalization.roleSpecifics.title) {
      personalizedContent = personalizedContent.replace(
        'this role', 
        `the ${personalization.roleSpecifics.title} position`
      )
    }

    return personalizedContent
  }

  private applyConstraints(content: string, constraints: ResponseConstraint[]): string {
    let constrainedContent = content

    constraints.forEach(constraint => {
      switch (constraint.type) {
        case ConstraintType.MAX_LENGTH:
          if (constrainedContent.length > constraint.value) {
            constrainedContent = this.truncateContent(constrainedContent, constraint.value)
          }
          break
        
        case ConstraintType.MIN_LENGTH:
          if (constrainedContent.length < constraint.value) {
            constrainedContent = this.expandContent(constrainedContent, constraint.value)
          }
          break
        
        case ConstraintType.FORBIDDEN_WORDS:
          constraint.value.forEach((word: string) => {
            const regex = new RegExp(`\\b${word}\\b`, 'gi')
            constrainedContent = constrainedContent.replace(regex, '[redacted]')
          })
          break
        
        case ConstraintType.REQUIRED_PHRASES:
          constraint.value.forEach((phrase: string) => {
            if (!constrainedContent.includes(phrase)) {
              constrainedContent += ` ${phrase}`
            }
          })
          break
      }
    })

    return constrainedContent
  }

  private truncateContent(content: string, maxLength: number): string {
    if (content.length <= maxLength) return content
    
    const truncated = content.substring(0, maxLength - 3)
    const lastSpace = truncated.lastIndexOf(' ')
    
    return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...'
  }

  private expandContent(content: string, minLength: number): string {
    if (content.length >= minLength) return content
    
    const expansions = [
      'I\'d love to hear more details about this.',
      'Feel free to elaborate as much as you\'d like.',
      'Take your time with your response.',
      'Any additional context would be helpful.'
    ]
    
    while (content.length < minLength && expansions.length > 0) {
      const expansion = expansions.shift()!
      content += ` ${expansion}`
    }
    
    return content
  }

  private async generateAlternatives(
    request: ResponseGenerationRequest, 
    primaryContent: string
  ): Promise<ResponseAlternative[]> {
    const alternatives: ResponseAlternative[] = []

    // Generate style variations
    const styleVariations = [
      { ...request.style, tone: ConversationTone.FORMAL },
      { ...request.style, tone: ConversationTone.CASUAL },
      { ...request.style, enthusiasm: EnthusiasmLevel.HIGH }
    ]

    for (const styleVariation of styleVariations) {
      const variantRequest = { ...request, style: styleVariation }
      try {
        const variantContent = await this.generateBaseContent(variantRequest, {
          method: GenerationMethod.TEMPLATE_BASED,
          confidence: 0.7
        })
        
        if (variantContent !== primaryContent) {
          alternatives.push({
            content: variantContent,
            styleVariation,
            confidence: 0.7,
            useCase: `${styleVariation.tone} tone variant`,
            reasoning: `Alternative with ${styleVariation.tone} tone for different contexts`
          })
        }
      } catch (error) {
        console.error('Error generating alternative:', error)
      }
    }

    return alternatives.slice(0, 3) // Limit to 3 alternatives
  }

  private calculateQualityMetrics(content: string, request: ResponseGenerationRequest): QualityMetrics {
    return {
      clarity: this.assessClarity(content),
      relevance: this.assessRelevance(content, request),
      engagement: this.assessEngagement(content, request.style),
      appropriateness: this.assessAppropriateness(content, request),
      naturalness: this.assessNaturalness(content),
      consistency: this.assessConsistency(content, request)
    }
  }

  private assessClarity(content: string): number {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0)
    const avgSentenceLength = content.split(' ').length / sentences.length
    
    let clarity = 0.8 // Base clarity
    
    // Adjust based on sentence length
    if (avgSentenceLength > 20) clarity -= 0.2 // Too long sentences reduce clarity
    if (avgSentenceLength < 5) clarity -= 0.1  // Too short might be unclear
    
    // Check for complex vocabulary
    const complexWords = content.split(' ').filter(word => word.length > 8).length
    const complexityRatio = complexWords / content.split(' ').length
    if (complexityRatio > 0.2) clarity -= 0.1
    
    return Math.max(0, Math.min(clarity, 1.0))
  }

  private assessRelevance(content: string, request: ResponseGenerationRequest): number {
    const intent = request.intent
    let relevance = 0.8 // Base relevance
    
    // Check if content matches intent
    switch (intent) {
      case ResponseIntent.ASK_QUESTION:
        if (!content.includes('?')) relevance -= 0.3
        break
      case ResponseIntent.PROVIDE_FEEDBACK:
        if (!content.includes('great') && !content.includes('good') && !content.includes('excellent')) {
          relevance -= 0.2
        }
        break
      case ResponseIntent.CLARIFY_RESPONSE:
        if (!content.includes('more') && !content.includes('elaborate') && !content.includes('clarify')) {
          relevance -= 0.2
        }
        break
    }
    
    return Math.max(0, Math.min(relevance, 1.0))
  }

  private assessEngagement(content: string, style: ResponseStyle): number {
    let engagement = 0.7 // Base engagement
    
    // Check for engaging elements
    if (content.includes('!')) engagement += 0.1
    if (content.includes('interesting') || content.includes('great')) engagement += 0.1
    if (content.includes('love') || content.includes('excited')) engagement += 0.1
    
    // Adjust based on intended enthusiasm
    if (style.enthusiasm === EnthusiasmLevel.HIGH && !content.includes('!')) {
      engagement -= 0.2
    }
    
    return Math.max(0, Math.min(engagement, 1.0))
  }

  private assessAppropriateness(content: string, request: ResponseGenerationRequest): number {
    let appropriateness = 0.9 // Base appropriateness
    
    // Check for inappropriate content
    const inappropriateWords = ['awesome', 'cool', 'dude', 'guy']
    if (request.style.formality === FormalityLevel.FORMAL) {
      inappropriateWords.forEach(word => {
        if (content.toLowerCase().includes(word)) {
          appropriateness -= 0.2
        }
      })
    }
    
    return Math.max(0, Math.min(appropriateness, 1.0))
  }

  private assessNaturalness(content: string): number {
    let naturalness = 0.8 // Base naturalness
    
    // Check for awkward constructions
    if (content.includes('that that') || content.includes('the the')) {
      naturalness -= 0.2
    }
    
    // Check for conversational flow
    if (content.includes('uh') || content.includes('um')) {
      naturalness -= 0.1 // Too casual for written interview
    }
    
    return Math.max(0, Math.min(naturalness, 1.0))
  }

  private assessConsistency(content: string, request: ResponseGenerationRequest): number {
    // This would check consistency with previous messages in a real implementation
    return 0.8 // Simplified implementation
  }

  private extractInterviewId(context: ResponseContext): string | null {
    // Extract interview ID from context - implementation depends on context structure
    return 'interview_' + Date.now() // Simplified
  }

  // Public utility methods
  getGenerationHistory(interviewId: string): GeneratedResponse[] {
    return this.generationHistory.get(interviewId) || []
  }

  updateStylePreferences(candidateId: string, preferences: CandidatePreference[]): void {
    // Update candidate style preferences for future generations
    console.log(`Updated style preferences for candidate ${candidateId}:`, preferences)
  }

  getResponseQuality(responseId: string): QualityMetrics | null {
    // Find response and return quality metrics
    for (const responses of this.generationHistory.values()) {
      const response = responses.find(r => r.id === responseId)
      if (response) return response.qualityMetrics
    }
    return null
  }
}

// Supporting interfaces
interface ResponseTemplate {
  id: string
  intent: ResponseIntent
  pattern: string
  variables: { [key: string]: string[] }
  tone: ConversationTone
  formality: FormalityLevel
}

interface StyleAdapter {
  id: string
  targetStyle: Partial<ResponseStyle>
  adaptations: { [from: string]: string }
  rules: string[]
}

interface CulturalAdapter {
  id: string
  culturalStyle: CulturalStyle
  adaptations: { [key: string]: string }
  modifications: string[]
  avoidances: string[]
}

// Singleton instance
export const naturalLanguageGenerator = new NaturalLanguageGenerator()