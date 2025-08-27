// Phase 4: Advanced Dialogue Management Integration Layer
// This file provides a unified interface for all dialogue management functionality

export {
  // Adaptive Questioning
  AdaptiveQuestioningEngine,
  adaptiveQuestioningEngine,
  AdaptiveQuestionRequest,
  AdaptiveQuestionResult,
  GeneratedQuestion,
  BranchingRule,
  TopicTransition,
  InterviewObjective,
  QuestionType,
  QuestionIntent,
  ResponseCondition,
  BranchingAction,
  TransitionTrigger
} from './adaptiveQuestioning'

export {
  // Conversation Flow Management
  ConversationFlowManager,
  conversationFlowManager,
  ConversationFlowState,
  PhaseProgress,
  EnhancedConversationContext,
  TopicNode,
  ConversationGoal,
  ContextualCue,
  FlowConstraint,
  FlowDecision,
  PhaseTransition,
  AdaptationRule,
  FlowMetrics,
  TopicExplorationLevel,
  GoalType,
  CueType,
  CueAction,
  DecisionType,
  AdaptationTrigger,
  AdaptationAction
} from './conversationFlowManager'

export {
  // Natural Language Generation
  NaturalLanguageGenerator,
  naturalLanguageGenerator,
  ResponseGenerationRequest,
  ResponseContext,
  ResponseStyle,
  ResponseConstraint,
  PersonalizationData,
  GeneratedResponse,
  ResponseAlternative,
  ResponseMetadata,
  ResponseIntent,
  ConversationTone,
  FormalityLevel,
  EnthusiasmLevel,
  ConversationPace,
  CulturalStyle,
  CompanySize,
  CompanyCulture,
  GenerationMethod
} from './naturalLanguageGeneration'

export {
  // Quality Control
  ConversationQualityController,
  qualityController,
  QualityControlSystem,
  ResponseValidationRequest,
  TopicRelevanceRequest,
  DurationManagementRequest,
  ValidationResult,
  RelevanceResult,
  DurationManagementResult,
  ErrorRecoveryResult,
  ValidationRule,
  QualityThreshold,
  ValidationIssue,
  ValidationSuggestion,
  QualityMetric,
  ValidationRuleType,
  ErrorType,
  ErrorSeverity,
  RecoveryType
} from './qualityControl'

// Integrated dialogue management service
import { ContextualMessage, InterviewPhase } from '../interview/conversationFlow'
import { DynamicProfile } from '../candidate/profileBuilder'
import { adaptiveQuestioningEngine, AdaptiveQuestionRequest, AdaptiveQuestionResult } from './adaptiveQuestioning'
import { conversationFlowManager, ConversationFlowState } from './conversationFlowManager'
import { naturalLanguageGenerator, ResponseGenerationRequest, GeneratedResponse, ResponseIntent, ResponseStyle } from './naturalLanguageGeneration'
import { qualityController, ResponseValidationRequest, ValidationResult } from './qualityControl'

export interface DialogueManagerConfig {
  enableAdaptiveQuestioning: boolean
  enableFlowManagement: boolean
  enableQualityControl: boolean
  responseStyle: ResponseStyle
  validationThresholds: QualityThresholds
  timeConstraints: TimeConstraints
  culturalSettings: CulturalSettings
}

export interface QualityThresholds {
  minClarity: number
  minRelevance: number
  minEngagement: number
  minAppropriateness: number
}

export interface TimeConstraints {
  totalInterviewDuration: number
  phaseTimeouts: { [phase: string]: number }
  warningThresholds: { [phase: string]: number }
}

export interface CulturalSettings {
  primaryCulture: string
  communicationStyle: string
  formalityPreference: string
  adaptationLevel: number
}

export interface DialogueRequest {
  interviewId: string
  candidateMessage: ContextualMessage
  candidateProfile: DynamicProfile
  conversationHistory: ContextualMessage[]
  currentPhase: InterviewPhase
  timeElapsed: number
  timeRemaining: number
  interviewObjectives: any[]
  companyInfo: any
  roleInfo: any
}

export interface DialogueResponse {
  response: GeneratedResponse
  flowState: ConversationFlowState
  validationResult: ValidationResult
  adaptiveResult: AdaptiveQuestionResult
  recommendations: DialogueRecommendation[]
  metadata: DialogueMetadata
}

export interface DialogueRecommendation {
  type: 'flow' | 'quality' | 'adaptation' | 'timing'
  priority: 'low' | 'medium' | 'high' | 'critical'
  description: string
  actionRequired: boolean
  suggestedAction?: string
}

export interface DialogueMetadata {
  processingTime: number
  confidenceScore: number
  systemHealth: SystemHealth
  performanceMetrics: PerformanceMetrics
}

export interface SystemHealth {
  adaptiveQuestioningStatus: 'healthy' | 'degraded' | 'failed'
  flowManagementStatus: 'healthy' | 'degraded' | 'failed'
  nlgStatus: 'healthy' | 'degraded' | 'failed'
  qualityControlStatus: 'healthy' | 'degraded' | 'failed'
}

export interface PerformanceMetrics {
  responseGenerationTime: number
  validationTime: number
  flowAnalysisTime: number
  totalProcessingTime: number
}

export class AdvancedDialogueManager {
  private config: DialogueManagerConfig
  private interviewStates: Map<string, ConversationFlowState> = new Map()
  private performanceHistory: Map<string, PerformanceMetrics[]> = new Map()

  constructor(config: DialogueManagerConfig) {
    this.config = config
  }

  // Main dialogue processing method
  async processDialogue(request: DialogueRequest): Promise<DialogueResponse> {
    const startTime = Date.now()
    const recommendations: DialogueRecommendation[] = []
    let systemHealth: SystemHealth = {
      adaptiveQuestioningStatus: 'healthy',
      flowManagementStatus: 'healthy',
      nlgStatus: 'healthy',
      qualityControlStatus: 'healthy'
    }

    try {
      // Step 1: Initialize or update conversation flow
      const flowState = await this.updateConversationFlow(request)

      // Step 2: Generate adaptive question if enabled
      let adaptiveResult: AdaptiveQuestionResult | null = null
      if (this.config.enableAdaptiveQuestioning) {
        try {
          adaptiveResult = await this.generateAdaptiveQuestion(request, flowState)
        } catch (error) {
          systemHealth.adaptiveQuestioningStatus = 'degraded'
          recommendations.push({
            type: 'adaptation',
            priority: 'medium',
            description: 'Adaptive questioning system degraded, using fallback',
            actionRequired: false
          })
        }
      }

      // Step 3: Generate natural language response
      let response: GeneratedResponse
      try {
        response = await this.generateResponse(request, adaptiveResult, flowState)
      } catch (error) {
        systemHealth.nlgStatus = 'failed'
        response = await this.generateFallbackResponse(request)
        recommendations.push({
          type: 'quality',
          priority: 'high',
          description: 'NLG system failed, using fallback response',
          actionRequired: true,
          suggestedAction: 'Review NLG system logs'
        })
      }

      // Step 4: Validate response quality if enabled
      let validationResult: ValidationResult = {
        isValid: true,
        confidence: 0.8,
        issues: [],
        suggestions: [],
        qualityScore: 0.8,
        recommendations: []
      }

      if (this.config.enableQualityControl) {
        try {
          validationResult = await this.validateResponse(response, request)
          
          if (!validationResult.isValid) {
            recommendations.push({
              type: 'quality',
              priority: 'high',
              description: 'Response validation failed, consider regenerating',
              actionRequired: true,
              suggestedAction: 'Regenerate response with different parameters'
            })
          }
        } catch (error) {
          systemHealth.qualityControlStatus = 'degraded'
          recommendations.push({
            type: 'quality',
            priority: 'medium',
            description: 'Quality control system degraded',
            actionRequired: false
          })
        }
      }

      // Step 5: Check flow recommendations
      const flowRecommendations = await this.generateFlowRecommendations(flowState, request)
      recommendations.push(...flowRecommendations)

      // Step 6: Performance monitoring
      const performanceMetrics = this.calculatePerformanceMetrics(startTime)
      this.updatePerformanceHistory(request.interviewId, performanceMetrics)

      // Step 7: Create metadata
      const metadata: DialogueMetadata = {
        processingTime: Date.now() - startTime,
        confidenceScore: this.calculateOverallConfidence(validationResult, adaptiveResult, response),
        systemHealth,
        performanceMetrics
      }

      return {
        response,
        flowState,
        validationResult,
        adaptiveResult: adaptiveResult || this.createEmptyAdaptiveResult(),
        recommendations,
        metadata
      }

    } catch (error) {
      console.error('Dialogue processing error:', error)
      return this.createErrorResponse(request, error as Error)
    }
  }

  private async updateConversationFlow(request: DialogueRequest): Promise<ConversationFlowState> {
    const existingState = this.interviewStates.get(request.interviewId)
    
    if (!existingState) {
      // Initialize new conversation flow
      const flowState = await conversationFlowManager.initializeConversationFlow(
        request.interviewId,
        request.candidateProfile,
        request.interviewObjectives
      )
      this.interviewStates.set(request.interviewId, flowState)
      return flowState
    } else {
      // Update existing flow with new message
      const updateResult = await conversationFlowManager.processMessage(
        request.interviewId,
        request.candidateMessage
      )
      this.interviewStates.set(request.interviewId, updateResult.flowState)
      return updateResult.flowState
    }
  }

  private async generateAdaptiveQuestion(
    request: DialogueRequest,
    flowState: ConversationFlowState
  ): Promise<AdaptiveQuestionResult> {
    const adaptiveRequest: AdaptiveQuestionRequest = {
      candidateResponse: request.candidateMessage,
      conversationHistory: request.conversationHistory,
      candidateProfile: request.candidateProfile,
      currentPhase: request.currentPhase,
      timeRemaining: request.timeRemaining,
      interviewObjectives: request.interviewObjectives
    }

    return await adaptiveQuestioningEngine.generateAdaptiveQuestion(adaptiveRequest)
  }

  private async generateResponse(
    request: DialogueRequest,
    adaptiveResult: AdaptiveQuestionResult | null,
    flowState: ConversationFlowState
  ): Promise<GeneratedResponse> {
    // Determine response intent based on adaptive result and flow state
    const intent = this.determineResponseIntent(adaptiveResult, flowState, request)
    
    // Create response generation request
    const responseRequest: ResponseGenerationRequest = {
      context: {
        conversationHistory: request.conversationHistory,
        currentPhase: request.currentPhase,
        candidateProfile: request.candidateProfile,
        lastCandidateResponse: request.candidateMessage,
        interviewObjectives: request.interviewObjectives.map(obj => obj.description || ''),
        timeRemaining: request.timeRemaining
      },
      intent,
      style: this.config.responseStyle,
      constraints: this.generateConstraints(request),
      personalization: {
        candidateName: request.candidateProfile.personalInfo.name,
        candidatePreferences: [],
        companyInfo: request.companyInfo,
        roleSpecifics: request.roleInfo,
        interviewerProfile: {
          experience: 'Senior',
          specialization: ['Technical Interviews'],
          communicationStyle: 'Professional',
          interviewingApproach: 'Adaptive'
        }
      }
    }

    return await naturalLanguageGenerator.generateResponse(responseRequest)
  }

  private determineResponseIntent(
    adaptiveResult: AdaptiveQuestionResult | null,
    flowState: ConversationFlowState,
    request: DialogueRequest
  ): ResponseIntent {
    // Check for flow decision requirements
    const recentDecisions = flowState.flowDecisions.slice(-3)
    const hasTransitionDecision = recentDecisions.some(d => d.decisionType === 'phase_transition')
    
    if (hasTransitionDecision) {
      return ResponseIntent.TRANSITION_TOPIC
    }

    // Check for validation needs
    if (request.candidateMessage.content.length < 30) {
      return ResponseIntent.CLARIFY_RESPONSE
    }

    // Check adaptive questioning result
    if (adaptiveResult?.primaryQuestion) {
      switch (adaptiveResult.primaryQuestion.type) {
        case 'clarification':
          return ResponseIntent.CLARIFY_RESPONSE
        case 'deep_dive':
        case 'technical':
        case 'behavioral':
          return ResponseIntent.ASK_QUESTION
        case 'transition':
          return ResponseIntent.TRANSITION_TOPIC
        default:
          return ResponseIntent.ASK_QUESTION
      }
    }

    // Default based on phase
    switch (request.currentPhase) {
      case InterviewPhase.INTRODUCTION:
      case InterviewPhase.BACKGROUND:
        return ResponseIntent.ASK_QUESTION
      case InterviewPhase.CONCLUSION:
        return ResponseIntent.WRAP_UP
      default:
        return ResponseIntent.ASK_QUESTION
    }
  }

  private generateConstraints(request: DialogueRequest): any[] {
    const constraints = []

    // Time constraints
    if (request.timeRemaining < 10) {
      constraints.push({
        type: 'time_limit',
        value: 60, // Max 60 characters for quick responses
        priority: 'high',
        description: 'Limited time remaining'
      })
    }

    // Length constraints
    constraints.push({
      type: 'max_length',
      value: 300,
      priority: 'medium',
      description: 'Keep responses concise'
    })

    // Appropriateness constraints
    constraints.push({
      type: 'cultural_sensitivity',
      value: this.config.culturalSettings,
      priority: 'critical',
      description: 'Maintain cultural sensitivity'
    })

    return constraints
  }

  private async validateResponse(
    response: GeneratedResponse,
    request: DialogueRequest
  ): Promise<ValidationResult> {
    const validationRequest: ResponseValidationRequest = {
      response,
      context: {
        interviewId: request.interviewId,
        currentPhase: request.currentPhase,
        messageHistory: request.conversationHistory,
        candidateProfile: request.candidateProfile
      },
      validationRules: this.generateValidationRules(),
      qualityThresholds: this.generateQualityThresholds()
    }

    return await qualityController.validateResponse(validationRequest)
  }

  private generateValidationRules(): any[] {
    return [
      {
        id: 'appropriateness',
        type: 'content_quality',
        criteria: { forbiddenWords: [], requiredTone: 'professional' },
        weight: 1.0,
        threshold: this.config.validationThresholds.minAppropriateness,
        description: 'Content appropriateness check',
        category: 'critical'
      },
      {
        id: 'clarity',
        type: 'clarity_check',
        criteria: { minClarity: this.config.validationThresholds.minClarity },
        weight: 0.8,
        threshold: this.config.validationThresholds.minClarity,
        description: 'Response clarity validation',
        category: 'important'
      }
    ]
  }

  private generateQualityThresholds(): any[] {
    return [
      {
        metric: 'clarity',
        minimumValue: this.config.validationThresholds.minClarity,
        targetValue: this.config.validationThresholds.minClarity + 0.2,
        criticalValue: this.config.validationThresholds.minClarity - 0.1,
        action: 'warn'
      },
      {
        metric: 'relevance',
        minimumValue: this.config.validationThresholds.minRelevance,
        targetValue: this.config.validationThresholds.minRelevance + 0.2,
        criticalValue: this.config.validationThresholds.minRelevance - 0.1,
        action: 'block'
      }
    ]
  }

  private async generateFlowRecommendations(
    flowState: ConversationFlowState,
    request: DialogueRequest
  ): Promise<DialogueRecommendation[]> {
    const recommendations: DialogueRecommendation[] = []

    // Time management recommendations
    if (request.timeRemaining < 10) {
      recommendations.push({
        type: 'timing',
        priority: 'high',
        description: 'Interview time running low, consider wrapping up',
        actionRequired: true,
        suggestedAction: 'Transition to closing phase'
      })
    }

    // Engagement recommendations
    if (flowState.flowMetrics.candidateEngagement < 0.5) {
      recommendations.push({
        type: 'flow',
        priority: 'medium',
        description: 'Low candidate engagement detected',
        actionRequired: false,
        suggestedAction: 'Consider changing topic or providing encouragement'
      })
    }

    // Phase completion recommendations
    if (flowState.phaseProgress.completionPercentage > 0.8) {
      recommendations.push({
        type: 'flow',
        priority: 'low',
        description: 'Current phase objectives mostly completed',
        actionRequired: false,
        suggestedAction: 'Consider transitioning to next phase'
      })
    }

    return recommendations
  }

  private calculatePerformanceMetrics(startTime: number): PerformanceMetrics {
    const now = Date.now()
    return {
      responseGenerationTime: 0, // Would be measured during actual generation
      validationTime: 0, // Would be measured during validation
      flowAnalysisTime: 0, // Would be measured during flow analysis
      totalProcessingTime: now - startTime
    }
  }

  private updatePerformanceHistory(interviewId: string, metrics: PerformanceMetrics): void {
    if (!this.performanceHistory.has(interviewId)) {
      this.performanceHistory.set(interviewId, [])
    }
    
    const history = this.performanceHistory.get(interviewId)!
    history.push(metrics)
    
    // Keep only last 50 entries
    if (history.length > 50) {
      history.shift()
    }
  }

  private calculateOverallConfidence(
    validation: ValidationResult,
    adaptive: AdaptiveQuestionResult | null,
    response: GeneratedResponse
  ): number {
    let confidence = 0.8 // Base confidence

    // Factor in validation confidence
    confidence = (confidence + validation.confidence) / 2

    // Factor in adaptive questioning confidence
    if (adaptive) {
      confidence = (confidence + adaptive.confidence) / 2
    }

    // Factor in response confidence
    confidence = (confidence + response.confidence) / 2

    return Math.max(0.1, Math.min(confidence, 1.0))
  }

  private createEmptyAdaptiveResult(): AdaptiveQuestionResult {
    return {
      primaryQuestion: {
        id: 'fallback',
        text: 'Tell me more about that.',
        type: 'open_ended' as any,
        category: 'background' as any,
        difficulty: 'easy' as any,
        intent: 'information_gathering' as any,
        expectedDuration: 3,
        scoringCriteria: [],
        triggers: [],
        adaptations: [],
        metadata: {
          generatedAt: new Date(),
          source: 'fallback',
          adaptationHistory: [],
          usageCount: 0
        }
      },
      followUpQuestions: [],
      branchingLogic: [],
      transitionSuggestions: [],
      confidence: 0.5,
      reasoning: ['Fallback response due to adaptive questioning unavailability']
    }
  }

  private async generateFallbackResponse(request: DialogueRequest): Promise<GeneratedResponse> {
    return {
      id: `fallback_${Date.now()}`,
      content: "Could you tell me more about that?",
      intent: ResponseIntent.ASK_QUESTION,
      style: this.config.responseStyle,
      confidence: 0.6,
      alternatives: [],
      metadata: {
        generatedAt: new Date(),
        generationMethod: 'template_based' as any,
        processingTime: 0,
        tokens: 7,
        version: '1.0.0'
      },
      adaptations: [],
      qualityMetrics: {
        clarity: 0.8,
        relevance: 0.6,
        engagement: 0.7,
        appropriateness: 0.9,
        naturalness: 0.8,
        consistency: 0.7
      }
    }
  }

  private createErrorResponse(request: DialogueRequest, error: Error): DialogueResponse {
    const fallbackResponse = {
      id: `error_${Date.now()}`,
      content: "I apologize, but I encountered an issue. Could we continue with your response?",
      intent: ResponseIntent.ASK_QUESTION,
      style: this.config.responseStyle,
      confidence: 0.3,
      alternatives: [],
      metadata: {
        generatedAt: new Date(),
        generationMethod: 'fallback' as any,
        processingTime: 0,
        tokens: 15,
        version: '1.0.0'
      },
      adaptations: [],
      qualityMetrics: {
        clarity: 0.7,
        relevance: 0.5,
        engagement: 0.5,
        appropriateness: 0.9,
        naturalness: 0.7,
        consistency: 0.6
      }
    }

    return {
      response: fallbackResponse,
      flowState: this.interviewStates.get(request.interviewId) || {} as ConversationFlowState,
      validationResult: {
        isValid: false,
        confidence: 0.3,
        issues: [{ 
          type: 'system_error' as any, 
          severity: 'critical' as any, 
          description: error.message, 
          confidence: 0.9 
        }],
        suggestions: [],
        qualityScore: 0.3,
        recommendations: []
      },
      adaptiveResult: this.createEmptyAdaptiveResult(),
      recommendations: [{
        type: 'quality',
        priority: 'critical',
        description: 'System error occurred during dialogue processing',
        actionRequired: true,
        suggestedAction: 'Review system logs and restart if necessary'
      }],
      metadata: {
        processingTime: 0,
        confidenceScore: 0.3,
        systemHealth: {
          adaptiveQuestioningStatus: 'failed',
          flowManagementStatus: 'failed',
          nlgStatus: 'failed',
          qualityControlStatus: 'failed'
        },
        performanceMetrics: {
          responseGenerationTime: 0,
          validationTime: 0,
          flowAnalysisTime: 0,
          totalProcessingTime: 0
        }
      }
    }
  }

  // Utility methods
  async getFlowState(interviewId: string): Promise<ConversationFlowState | null> {
    return this.interviewStates.get(interviewId) || null
  }

  async getPerformanceHistory(interviewId: string): Promise<PerformanceMetrics[]> {
    return this.performanceHistory.get(interviewId) || []
  }

  async updateConfig(newConfig: Partial<DialogueManagerConfig>): Promise<void> {
    this.config = { ...this.config, ...newConfig }
  }

  async getSystemHealth(): Promise<SystemHealth> {
    // This would check the health of all subsystems
    return {
      adaptiveQuestioningStatus: 'healthy',
      flowManagementStatus: 'healthy',
      nlgStatus: 'healthy',
      qualityControlStatus: 'healthy'
    }
  }

  // Cleanup methods
  async cleanupInterview(interviewId: string): Promise<void> {
    this.interviewStates.delete(interviewId)
    this.performanceHistory.delete(interviewId)
  }

  async cleanupOldData(olderThanHours: number = 24): Promise<number> {
    const cutoffTime = Date.now() - (olderThanHours * 60 * 60 * 1000)
    let cleaned = 0

    // Clean up based on last activity - this is simplified
    // In practice, you'd track last activity timestamps
    
    return cleaned
  }
}

// Factory function for creating dialogue manager with default config
export function createDialogueManager(overrides: Partial<DialogueManagerConfig> = {}): AdvancedDialogueManager {
  const defaultConfig: DialogueManagerConfig = {
    enableAdaptiveQuestioning: true,
    enableFlowManagement: true,
    enableQualityControl: true,
    responseStyle: {
      tone: 'professional' as any,
      formality: 'semi_formal' as any,
      enthusiasm: 'moderate' as any,
      pace: 'moderate' as any,
      culturalAdaptation: 'neutral' as any,
      brandVoice: {
        attributes: ['professional', 'friendly', 'helpful'],
        doList: ['be encouraging', 'ask follow-up questions', 'show interest'],
        dontList: ['be too casual', 'rush the conversation', 'make assumptions'],
        examplePhrases: ['That\'s interesting', 'Tell me more about', 'I\'d like to understand'],
        toneModifiers: ['warm', 'professional']
      }
    },
    validationThresholds: {
      minClarity: 0.7,
      minRelevance: 0.8,
      minEngagement: 0.6,
      minAppropriateness: 0.9
    },
    timeConstraints: {
      totalInterviewDuration: 60,
      phaseTimeouts: {
        introduction: 5,
        background: 10,
        technical: 15,
        behavioral: 12,
        conclusion: 8
      },
      warningThresholds: {
        introduction: 4,
        background: 8,
        technical: 12,
        behavioral: 10,
        conclusion: 6
      }
    },
    culturalSettings: {
      primaryCulture: 'neutral',
      communicationStyle: 'direct',
      formalityPreference: 'semi_formal',
      adaptationLevel: 0.7
    }
  }

  const config = { ...defaultConfig, ...overrides }
  return new AdvancedDialogueManager(config)
}

// Export the main dialogue manager class as default
export default AdvancedDialogueManager