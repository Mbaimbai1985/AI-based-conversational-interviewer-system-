import { ContextualMessage, InterviewPhase } from '../interview/conversationFlow'
import { DynamicProfile } from '../candidate/profileBuilder'
import { GeneratedResponse, ResponseIntent } from './naturalLanguageGeneration'
import { ConversationFlowState } from './conversationFlowManager'

export interface QualityControlSystem {
  validateResponse(request: ResponseValidationRequest): Promise<ValidationResult>
  checkTopicRelevance(request: TopicRelevanceRequest): Promise<RelevanceResult>
  manageInterviewDuration(request: DurationManagementRequest): Promise<DurationManagementResult>
  handleError(error: InterviewError, context: ErrorContext): Promise<ErrorRecoveryResult>
}

export interface ResponseValidationRequest {
  response: GeneratedResponse
  context: ConversationContext
  validationRules: ValidationRule[]
  qualityThresholds: QualityThreshold[]
}

export interface TopicRelevanceRequest {
  currentTopic: string
  candidateResponse: ContextualMessage
  interviewObjectives: InterviewObjective[]
  conversationHistory: ContextualMessage[]
  allowedDeviation: number
}

export interface DurationManagementRequest {
  interviewId: string
  currentPhase: InterviewPhase
  timeElapsed: number
  estimatedTimeRemaining: number
  completedObjectives: string[]
  remainingObjectives: InterviewObjective[]
  flowState: ConversationFlowState
}

export interface ErrorContext {
  interviewId: string
  errorType: ErrorType
  severity: ErrorSeverity
  timestamp: Date
  conversationState: ConversationFlowState
  lastSuccessfulExchange: ContextualMessage[]
}

export interface ValidationResult {
  isValid: boolean
  confidence: number
  issues: ValidationIssue[]
  suggestions: ValidationSuggestion[]
  qualityScore: number
  recommendations: ValidationRecommendation[]
}

export interface RelevanceResult {
  isRelevant: boolean
  relevanceScore: number
  topicAlignment: number
  objectiveAlignment: number
  deviationLevel: TopicDeviation
  recommendations: RelevanceRecommendation[]
}

export interface DurationManagementResult {
  recommendedAction: DurationAction
  timeAllocation: PhaseTimeAllocation[]
  priorityAdjustments: ObjectivePriority[]
  paceModifications: PaceModification[]
  riskAssessment: TimeRiskAssessment
}

export interface ErrorRecoveryResult {
  recoveryStrategy: RecoveryStrategy
  alternativeActions: RecoveryAction[]
  contextRestoration: ContextRestoration
  userCommunication: UserCommunication
  preventionMeasures: PreventionMeasure[]
}

export interface ValidationRule {
  id: string
  type: ValidationRuleType
  criteria: any
  weight: number
  threshold: number
  description: string
  category: ValidationCategory
}

export interface QualityThreshold {
  metric: QualityMetric
  minimumValue: number
  targetValue: number
  criticalValue: number
  action: QualityAction
}

export interface ValidationIssue {
  type: ValidationIssueType
  severity: IssueSeverity
  description: string
  location?: string
  suggestion?: string
  confidence: number
}

export interface ValidationSuggestion {
  type: SuggestionType
  content: string
  impact: SuggestionImpact
  effort: EffortLevel
  priority: SuggestionPriority
}

export interface ValidationRecommendation {
  action: RecommendedAction
  reasoning: string
  alternatives: string[]
  confidence: number
  urgency: ActionUrgency
}

export interface InterviewObjective {
  id: string
  description: string
  priority: ObjectivePriority
  estimatedTime: number
  completionCriteria: string[]
  phase: InterviewPhase
  status: ObjectiveStatus
}

export interface PhaseTimeAllocation {
  phase: InterviewPhase
  currentAllocation: number
  recommendedAllocation: number
  adjustmentReason: string
  flexibility: AllocationFlexibility
}

export interface PaceModification {
  type: PaceModificationType
  magnitude: number
  duration: number
  reason: string
  expectedImpact: string
}

export interface TimeRiskAssessment {
  overallRisk: RiskLevel
  risks: TimeRisk[]
  mitigationStrategies: string[]
  contingencyPlans: ContingencyPlan[]
}

export interface RecoveryStrategy {
  type: RecoveryType
  steps: RecoveryStep[]
  expectedDuration: number
  successCriteria: string[]
  fallbackOptions: string[]
}

export interface RecoveryAction {
  action: string
  description: string
  impact: ActionImpact
  difficulty: ActionDifficulty
  timeRequired: number
}

export interface ContextRestoration {
  restorationMethod: RestorationType
  contextData: any
  verificationSteps: string[]
  confidence: number
}

export interface UserCommunication {
  message: string
  tone: CommunicationTone
  explanation: string
  nextSteps: string[]
  transparency: TransparencyLevel
}

export interface PreventionMeasure {
  measure: string
  implementation: string
  monitoring: string
  effectiveness: number
}

export enum ValidationRuleType {
  CONTENT_QUALITY = 'content_quality',
  TONE_APPROPRIATENESS = 'tone_appropriateness',
  LENGTH_CONSTRAINT = 'length_constraint',
  RELEVANCE_CHECK = 'relevance_check',
  BIAS_DETECTION = 'bias_detection',
  PROFESSIONALISM = 'professionalism',
  CULTURAL_SENSITIVITY = 'cultural_sensitivity'
}

export enum ValidationCategory {
  CRITICAL = 'critical',
  IMPORTANT = 'important',
  ADVISORY = 'advisory',
  INFORMATIONAL = 'informational'
}

export enum QualityMetric {
  CLARITY = 'clarity',
  RELEVANCE = 'relevance',
  ENGAGEMENT = 'engagement',
  APPROPRIATENESS = 'appropriateness',
  NATURALNESS = 'naturalness',
  CONSISTENCY = 'consistency'
}

export enum QualityAction {
  BLOCK = 'block',
  WARN = 'warn',
  SUGGEST = 'suggest',
  LOG = 'log'
}

export enum ValidationIssueType {
  INAPPROPRIATE_CONTENT = 'inappropriate_content',
  POOR_GRAMMAR = 'poor_grammar',
  UNCLEAR_MESSAGE = 'unclear_message',
  OFF_TOPIC = 'off_topic',
  TOO_LONG = 'too_long',
  TOO_SHORT = 'too_short',
  CULTURAL_INSENSITIVITY = 'cultural_insensitivity',
  BIAS_DETECTED = 'bias_detected'
}

export enum IssueSeverity {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

export enum SuggestionType {
  CONTENT_IMPROVEMENT = 'content_improvement',
  STYLE_ADJUSTMENT = 'style_adjustment',
  STRUCTURE_ENHANCEMENT = 'structure_enhancement',
  TONE_MODIFICATION = 'tone_modification'
}

export enum SuggestionImpact {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

export enum EffortLevel {
  MINIMAL = 'minimal',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export enum SuggestionPriority {
  URGENT = 'urgent',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

export enum RecommendedAction {
  APPROVE = 'approve',
  REVISE = 'revise',
  REJECT = 'reject',
  FLAG_FOR_REVIEW = 'flag_for_review'
}

export enum ActionUrgency {
  IMMEDIATE = 'immediate',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

export enum TopicDeviation {
  NONE = 'none',
  MINOR = 'minor',
  MODERATE = 'moderate',
  MAJOR = 'major',
  COMPLETE = 'complete'
}

export enum ObjectivePriority {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

export enum ObjectiveStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  SKIPPED = 'skipped'
}

export enum DurationAction {
  CONTINUE_NORMAL = 'continue_normal',
  ACCELERATE_PACE = 'accelerate_pace',
  EXTEND_TIME = 'extend_time',
  PRIORITIZE_OBJECTIVES = 'prioritize_objectives',
  WRAP_UP_EARLY = 'wrap_up_early'
}

export enum AllocationFlexibility {
  RIGID = 'rigid',
  MODERATE = 'moderate',
  FLEXIBLE = 'flexible',
  HIGHLY_FLEXIBLE = 'highly_flexible'
}

export enum PaceModificationType {
  INCREASE_SPEED = 'increase_speed',
  DECREASE_SPEED = 'decrease_speed',
  VARY_PACE = 'vary_pace',
  MAINTAIN_CURRENT = 'maintain_current'
}

export enum RiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum ErrorType {
  TECHNICAL_FAILURE = 'technical_failure',
  CONVERSATION_BREAKDOWN = 'conversation_breakdown',
  INAPPROPRIATE_RESPONSE = 'inappropriate_response',
  SYSTEM_OVERLOAD = 'system_overload',
  DATA_CORRUPTION = 'data_corruption',
  NETWORK_ISSUE = 'network_issue'
}

export enum ErrorSeverity {
  MINOR = 'minor',
  MODERATE = 'moderate',
  MAJOR = 'major',
  CRITICAL = 'critical'
}

export enum RecoveryType {
  AUTOMATIC = 'automatic',
  GUIDED = 'guided',
  MANUAL = 'manual',
  HYBRID = 'hybrid'
}

export enum ActionImpact {
  MINIMAL = 'minimal',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export enum ActionDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  EXPERT = 'expert'
}

export enum RestorationType {
  FULL_RESTORE = 'full_restore',
  PARTIAL_RESTORE = 'partial_restore',
  CONTEXT_REBUILD = 'context_rebuild',
  FRESH_START = 'fresh_start'
}

export enum CommunicationTone {
  APOLOGETIC = 'apologetic',
  PROFESSIONAL = 'professional',
  REASSURING = 'reassuring',
  TRANSPARENT = 'transparent'
}

export enum TransparencyLevel {
  FULL = 'full',
  PARTIAL = 'partial',
  MINIMAL = 'minimal',
  NONE = 'none'
}

export class ConversationQualityController implements QualityControlSystem {
  private validationRules: Map<string, ValidationRule> = new Map()
  private qualityThresholds: Map<QualityMetric, QualityThreshold> = new Map()
  private errorRecoveryStrategies: Map<ErrorType, RecoveryStrategy[]> = new Map()
  private durationTemplates: Map<InterviewPhase, PhaseTimeAllocation> = new Map()

  constructor() {
    this.initializeValidationRules()
    this.initializeQualityThresholds()
    this.initializeErrorRecoveryStrategies()
    this.initializeDurationTemplates()
  }

  private initializeValidationRules(): void {
    const rules: ValidationRule[] = [
      {
        id: 'content_appropriateness',
        type: ValidationRuleType.CONTENT_QUALITY,
        criteria: { 
          forbiddenWords: ['inappropriate', 'offensive'],
          requiredTone: 'professional'
        },
        weight: 1.0,
        threshold: 0.8,
        description: 'Ensures content is appropriate for professional interview setting',
        category: ValidationCategory.CRITICAL
      },
      {
        id: 'response_length',
        type: ValidationRuleType.LENGTH_CONSTRAINT,
        criteria: {
          minLength: 10,
          maxLength: 500,
          optimalRange: [50, 200]
        },
        weight: 0.7,
        threshold: 0.6,
        description: 'Validates response length for optimal communication',
        category: ValidationCategory.IMPORTANT
      },
      {
        id: 'topic_relevance',
        type: ValidationRuleType.RELEVANCE_CHECK,
        criteria: {
          relevanceThreshold: 0.7,
          allowedDeviation: 0.3
        },
        weight: 0.9,
        threshold: 0.7,
        description: 'Ensures responses stay on topic and relevant to interview',
        category: ValidationCategory.CRITICAL
      },
      {
        id: 'cultural_sensitivity',
        type: ValidationRuleType.CULTURAL_SENSITIVITY,
        criteria: {
          culturalMarkers: ['inclusive', 'respectful'],
          avoidances: ['assumptions', 'stereotypes']
        },
        weight: 0.8,
        threshold: 0.8,
        description: 'Validates cultural sensitivity and inclusiveness',
        category: ValidationCategory.CRITICAL
      }
    ]

    rules.forEach(rule => {
      this.validationRules.set(rule.id, rule)
    })
  }

  private initializeQualityThresholds(): void {
    const thresholds: Array<[QualityMetric, QualityThreshold]> = [
      [QualityMetric.CLARITY, {
        metric: QualityMetric.CLARITY,
        minimumValue: 0.6,
        targetValue: 0.8,
        criticalValue: 0.4,
        action: QualityAction.WARN
      }],
      [QualityMetric.RELEVANCE, {
        metric: QualityMetric.RELEVANCE,
        minimumValue: 0.7,
        targetValue: 0.9,
        criticalValue: 0.5,
        action: QualityAction.BLOCK
      }],
      [QualityMetric.ENGAGEMENT, {
        metric: QualityMetric.ENGAGEMENT,
        minimumValue: 0.5,
        targetValue: 0.8,
        criticalValue: 0.3,
        action: QualityAction.SUGGEST
      }],
      [QualityMetric.APPROPRIATENESS, {
        metric: QualityMetric.APPROPRIATENESS,
        minimumValue: 0.8,
        targetValue: 0.95,
        criticalValue: 0.6,
        action: QualityAction.BLOCK
      }]
    ]

    thresholds.forEach(([metric, threshold]) => {
      this.qualityThresholds.set(metric, threshold)
    })
  }

  private initializeErrorRecoveryStrategies(): void {
    const strategies: Array<[ErrorType, RecoveryStrategy[]]> = [
      [ErrorType.TECHNICAL_FAILURE, [{
        type: RecoveryType.AUTOMATIC,
        steps: [
          { action: 'retry_operation', timeout: 5000 },
          { action: 'fallback_to_template', timeout: 1000 },
          { action: 'notify_user', timeout: 0 }
        ],
        expectedDuration: 10,
        successCriteria: ['system_responsive', 'conversation_resumed'],
        fallbackOptions: ['manual_intervention', 'interview_rescheduling']
      }]],
      [ErrorType.CONVERSATION_BREAKDOWN, [{
        type: RecoveryType.GUIDED,
        steps: [
          { action: 'assess_breakdown_cause', timeout: 2000 },
          { action: 'provide_clarification', timeout: 3000 },
          { action: 'restart_topic', timeout: 1000 }
        ],
        expectedDuration: 15,
        successCriteria: ['candidate_understanding', 'flow_restored'],
        fallbackOptions: ['human_intervention', 'topic_skip']
      }]],
      [ErrorType.INAPPROPRIATE_RESPONSE, [{
        type: RecoveryType.MANUAL,
        steps: [
          { action: 'flag_response', timeout: 0 },
          { action: 'generate_alternative', timeout: 5000 },
          { action: 'review_and_approve', timeout: 30000 }
        ],
        expectedDuration: 60,
        successCriteria: ['appropriate_response_generated', 'stakeholder_approval'],
        fallbackOptions: ['end_interview', 'escalate_to_supervisor']
      }]]
    ]

    strategies.forEach(([errorType, strategyList]) => {
      this.errorRecoveryStrategies.set(errorType, strategyList)
    })
  }

  private initializeDurationTemplates(): void {
    const templates: Array<[InterviewPhase, PhaseTimeAllocation]> = [
      [InterviewPhase.INTRODUCTION, {
        phase: InterviewPhase.INTRODUCTION,
        currentAllocation: 5,
        recommendedAllocation: 5,
        adjustmentReason: 'Standard introduction duration',
        flexibility: AllocationFlexibility.MODERATE
      }],
      [InterviewPhase.BACKGROUND, {
        phase: InterviewPhase.BACKGROUND,
        currentAllocation: 10,
        recommendedAllocation: 10,
        adjustmentReason: 'Adequate time for background exploration',
        flexibility: AllocationFlexibility.FLEXIBLE
      }],
      [InterviewPhase.TECHNICAL, {
        phase: InterviewPhase.TECHNICAL,
        currentAllocation: 15,
        recommendedAllocation: 15,
        adjustmentReason: 'Sufficient time for technical assessment',
        flexibility: AllocationFlexibility.MODERATE
      }],
      [InterviewPhase.BEHAVIORAL, {
        phase: InterviewPhase.BEHAVIORAL,
        currentAllocation: 12,
        recommendedAllocation: 12,
        adjustmentReason: 'Behavioral questions require detailed responses',
        flexibility: AllocationFlexibility.FLEXIBLE
      }]
    ]

    templates.forEach(([phase, allocation]) => {
      this.durationTemplates.set(phase, allocation)
    })
  }

  // Main validation method
  async validateResponse(request: ResponseValidationRequest): Promise<ValidationResult> {
    const issues: ValidationIssue[] = []
    const suggestions: ValidationSuggestion[] = []
    const recommendations: ValidationRecommendation[] = []
    let qualityScore = 0

    // Apply validation rules
    for (const rule of request.validationRules) {
      const ruleResult = await this.applyValidationRule(rule, request.response)
      
      if (!ruleResult.passed) {
        issues.push(...ruleResult.issues)
      }
      
      qualityScore += ruleResult.score * rule.weight
    }

    // Check quality thresholds
    const thresholdResults = this.checkQualityThresholds(request.response.qualityMetrics)
    thresholdResults.forEach(result => {
      if (result.action === QualityAction.BLOCK) {
        issues.push({
          type: ValidationIssueType.POOR_GRAMMAR,
          severity: IssueSeverity.CRITICAL,
          description: `Quality metric ${result.metric} below critical threshold`,
          confidence: 0.9
        })
      } else if (result.action === QualityAction.WARN) {
        suggestions.push({
          type: SuggestionType.CONTENT_IMPROVEMENT,
          content: `Consider improving ${result.metric}`,
          impact: SuggestionImpact.MEDIUM,
          effort: EffortLevel.LOW,
          priority: SuggestionPriority.MEDIUM
        })
      }
    })

    // Generate recommendations
    const isValid = issues.filter(i => i.severity === IssueSeverity.CRITICAL).length === 0
    const confidence = this.calculateValidationConfidence(issues, qualityScore)

    if (!isValid) {
      recommendations.push({
        action: RecommendedAction.REVISE,
        reasoning: 'Critical issues found that must be addressed',
        alternatives: ['regenerate_response', 'manual_review'],
        confidence: 0.9,
        urgency: ActionUrgency.HIGH
      })
    } else if (qualityScore < 0.7) {
      recommendations.push({
        action: RecommendedAction.FLAG_FOR_REVIEW,
        reasoning: 'Quality score below target threshold',
        alternatives: ['improve_and_retry', 'accept_with_monitoring'],
        confidence: 0.7,
        urgency: ActionUrgency.MEDIUM
      })
    } else {
      recommendations.push({
        action: RecommendedAction.APPROVE,
        reasoning: 'Response meets quality standards',
        alternatives: [],
        confidence: 0.8,
        urgency: ActionUrgency.LOW
      })
    }

    return {
      isValid,
      confidence,
      issues,
      suggestions,
      qualityScore: Math.max(0, Math.min(qualityScore, 1.0)),
      recommendations
    }
  }

  private async applyValidationRule(rule: ValidationRule, response: GeneratedResponse): Promise<{
    passed: boolean
    score: number
    issues: ValidationIssue[]
  }> {
    const issues: ValidationIssue[] = []
    let score = 1.0
    let passed = true

    switch (rule.type) {
      case ValidationRuleType.CONTENT_QUALITY:
        const contentResult = this.validateContentQuality(response.content, rule.criteria)
        score = contentResult.score
        passed = contentResult.score >= rule.threshold
        if (!passed) {
          issues.push({
            type: ValidationIssueType.INAPPROPRIATE_CONTENT,
            severity: IssueSeverity.HIGH,
            description: 'Content quality below threshold',
            confidence: 0.8
          })
        }
        break

      case ValidationRuleType.LENGTH_CONSTRAINT:
        const lengthResult = this.validateLength(response.content, rule.criteria)
        score = lengthResult.score
        passed = lengthResult.score >= rule.threshold
        if (!passed) {
          issues.push({
            type: lengthResult.tooLong ? ValidationIssueType.TOO_LONG : ValidationIssueType.TOO_SHORT,
            severity: IssueSeverity.MEDIUM,
            description: `Response length ${lengthResult.tooLong ? 'exceeds' : 'below'} optimal range`,
            suggestion: lengthResult.tooLong ? 'Consider making response more concise' : 'Consider adding more detail',
            confidence: 0.9
          })
        }
        break

      case ValidationRuleType.CULTURAL_SENSITIVITY:
        const culturalResult = this.validateCulturalSensitivity(response.content, rule.criteria)
        score = culturalResult.score
        passed = culturalResult.score >= rule.threshold
        if (!passed) {
          issues.push({
            type: ValidationIssueType.CULTURAL_INSENSITIVITY,
            severity: IssueSeverity.HIGH,
            description: 'Potential cultural sensitivity issues detected',
            confidence: culturalResult.confidence
          })
        }
        break

      default:
        score = 0.8 // Default score for unimplemented rules
    }

    return { passed, score, issues }
  }

  private validateContentQuality(content: string, criteria: any): { score: number } {
    let score = 0.8 // Base score

    // Check for forbidden words
    if (criteria.forbiddenWords) {
      const forbiddenFound = criteria.forbiddenWords.some((word: string) => 
        content.toLowerCase().includes(word.toLowerCase())
      )
      if (forbiddenFound) score -= 0.3
    }

    // Check for professional tone
    if (criteria.requiredTone === 'professional') {
      const unprofessionalWords = ['awesome', 'cool', 'whatever', 'stuff']
      const unprofessionalFound = unprofessionalWords.some(word => 
        content.toLowerCase().includes(word)
      )
      if (unprofessionalFound) score -= 0.2
    }

    return { score: Math.max(0, score) }
  }

  private validateLength(content: string, criteria: any): { 
    score: number
    tooLong: boolean
    tooShort: boolean
  } {
    const length = content.length
    let score = 1.0
    let tooLong = false
    let tooShort = false

    if (criteria.minLength && length < criteria.minLength) {
      score -= 0.4
      tooShort = true
    }

    if (criteria.maxLength && length > criteria.maxLength) {
      score -= 0.3
      tooLong = true
    }

    // Bonus for optimal range
    if (criteria.optimalRange) {
      const [optimalMin, optimalMax] = criteria.optimalRange
      if (length >= optimalMin && length <= optimalMax) {
        score += 0.1
      }
    }

    return { 
      score: Math.max(0, Math.min(score, 1.0)),
      tooLong,
      tooShort
    }
  }

  private validateCulturalSensitivity(content: string, criteria: any): { 
    score: number
    confidence: number
  } {
    let score = 0.9 // Start with high score
    let confidence = 0.7

    // Check for inclusive language
    if (criteria.culturalMarkers) {
      const inclusiveWords = ['everyone', 'all backgrounds', 'diverse', 'inclusive']
      const hasInclusive = inclusiveWords.some(word => 
        content.toLowerCase().includes(word)
      )
      if (hasInclusive) score += 0.1
    }

    // Check for problematic assumptions
    if (criteria.avoidances) {
      const problematicPatterns = [
        /you guys/gi,
        /obviously/gi,
        /everyone knows/gi,
        /normal people/gi
      ]
      
      const hasProblematic = problematicPatterns.some(pattern => 
        pattern.test(content)
      )
      if (hasProblematic) {
        score -= 0.3
        confidence = 0.9
      }
    }

    return { 
      score: Math.max(0, Math.min(score, 1.0)),
      confidence
    }
  }

  private checkQualityThresholds(qualityMetrics: any): Array<{
    metric: QualityMetric
    action: QualityAction
    currentValue: number
    threshold: number
  }> {
    const results: Array<{
      metric: QualityMetric
      action: QualityAction
      currentValue: number
      threshold: number
    }> = []

    for (const [metric, threshold] of this.qualityThresholds) {
      const currentValue = qualityMetrics[metric.toLowerCase()] || 0

      let action = QualityAction.LOG
      let thresholdValue = threshold.minimumValue

      if (currentValue < threshold.criticalValue) {
        action = threshold.action
        thresholdValue = threshold.criticalValue
      } else if (currentValue < threshold.minimumValue) {
        action = QualityAction.WARN
        thresholdValue = threshold.minimumValue
      } else if (currentValue < threshold.targetValue) {
        action = QualityAction.SUGGEST
        thresholdValue = threshold.targetValue
      }

      if (action !== QualityAction.LOG) {
        results.push({
          metric,
          action,
          currentValue,
          threshold: thresholdValue
        })
      }
    }

    return results
  }

  private calculateValidationConfidence(issues: ValidationIssue[], qualityScore: number): number {
    let confidence = 0.8 // Base confidence

    // Reduce confidence based on critical issues
    const criticalIssues = issues.filter(i => i.severity === IssueSeverity.CRITICAL).length
    confidence -= criticalIssues * 0.2

    // Adjust based on quality score
    confidence = (confidence + qualityScore) / 2

    // Factor in issue confidence
    if (issues.length > 0) {
      const avgIssueConfidence = issues.reduce((sum, issue) => sum + issue.confidence, 0) / issues.length
      confidence = (confidence + avgIssueConfidence) / 2
    }

    return Math.max(0, Math.min(confidence, 1.0))
  }

  // Topic relevance checking
  async checkTopicRelevance(request: TopicRelevanceRequest): Promise<RelevanceResult> {
    const topicAlignment = await this.calculateTopicAlignment(
      request.currentTopic, 
      request.candidateResponse
    )

    const objectiveAlignment = this.calculateObjectiveAlignment(
      request.candidateResponse,
      request.interviewObjectives
    )

    const relevanceScore = (topicAlignment * 0.6) + (objectiveAlignment * 0.4)
    const isRelevant = relevanceScore >= (1 - request.allowedDeviation)
    
    const deviationLevel = this.assessDeviationLevel(relevanceScore, request.allowedDeviation)
    const recommendations = this.generateRelevanceRecommendations(
      relevanceScore, 
      deviationLevel, 
      request
    )

    return {
      isRelevant,
      relevanceScore,
      topicAlignment,
      objectiveAlignment,
      deviationLevel,
      recommendations
    }
  }

  private async calculateTopicAlignment(currentTopic: string, response: ContextualMessage): Promise<number> {
    const topicKeywords = this.extractTopicKeywords(currentTopic)
    const responseWords = response.content.toLowerCase().split(/\s+/)
    
    let matches = 0
    topicKeywords.forEach(keyword => {
      if (responseWords.some(word => word.includes(keyword.toLowerCase()))) {
        matches++
      }
    })

    const baseAlignment = topicKeywords.length > 0 ? matches / topicKeywords.length : 0.5

    // Enhance with entity analysis
    const relevantEntities = response.entities?.filter(entity => 
      this.isEntityRelevantToTopic(entity, currentTopic)
    ) || []

    const entityBonus = Math.min(relevantEntities.length * 0.1, 0.3)
    
    return Math.min(baseAlignment + entityBonus, 1.0)
  }

  private extractTopicKeywords(topic: string): string[] {
    const topicKeywords: { [key: string]: string[] } = {
      'technical': ['technology', 'code', 'programming', 'development', 'software', 'system'],
      'experience': ['work', 'job', 'role', 'position', 'company', 'project'],
      'education': ['school', 'university', 'degree', 'course', 'study', 'learning'],
      'teamwork': ['team', 'collaboration', 'group', 'together', 'colleagues', 'peers'],
      'leadership': ['lead', 'manage', 'direct', 'supervise', 'guide', 'mentor'],
      'challenges': ['problem', 'issue', 'difficulty', 'obstacle', 'challenge', 'conflict']
    }

    // Find the best matching category
    for (const [category, keywords] of Object.entries(topicKeywords)) {
      if (topic.toLowerCase().includes(category)) {
        return keywords
      }
    }

    // Return generic keywords if no specific match
    return ['experience', 'work', 'skill']
  }

  private isEntityRelevantToTopic(entity: any, topic: string): boolean {
    const topicLower = topic.toLowerCase()
    
    if (topicLower.includes('technical') && 
        (entity.type === 'technology' || entity.type === 'skill')) {
      return true
    }
    
    if (topicLower.includes('experience') && 
        (entity.type === 'experience' || entity.type === 'company')) {
      return true
    }
    
    if (topicLower.includes('education') && entity.type === 'education') {
      return true
    }

    return false
  }

  private calculateObjectiveAlignment(response: ContextualMessage, objectives: InterviewObjective[]): number {
    if (objectives.length === 0) return 0.8 // Default if no objectives

    let totalAlignment = 0
    let alignmentCount = 0

    objectives.forEach(objective => {
      const alignment = this.calculateSingleObjectiveAlignment(response, objective)
      if (alignment > 0) {
        totalAlignment += alignment
        alignmentCount++
      }
    })

    return alignmentCount > 0 ? totalAlignment / alignmentCount : 0.5
  }

  private calculateSingleObjectiveAlignment(response: ContextualMessage, objective: InterviewObjective): number {
    const objectiveWords = objective.description.toLowerCase().split(/\s+/)
    const responseWords = response.content.toLowerCase().split(/\s+/)
    
    let matches = 0
    objectiveWords.forEach(objWord => {
      if (objWord.length > 3 && responseWords.includes(objWord)) {
        matches++
      }
    })

    return objectiveWords.length > 0 ? matches / objectiveWords.length : 0
  }

  private assessDeviationLevel(relevanceScore: number, allowedDeviation: number): TopicDeviation {
    const actualDeviation = 1 - relevanceScore
    
    if (actualDeviation <= allowedDeviation * 0.5) {
      return TopicDeviation.NONE
    } else if (actualDeviation <= allowedDeviation) {
      return TopicDeviation.MINOR
    } else if (actualDeviation <= allowedDeviation * 1.5) {
      return TopicDeviation.MODERATE
    } else if (actualDeviation <= allowedDeviation * 2) {
      return TopicDeviation.MAJOR
    } else {
      return TopicDeviation.COMPLETE
    }
  }

  private generateRelevanceRecommendations(
    relevanceScore: number,
    deviationLevel: TopicDeviation,
    request: TopicRelevanceRequest
  ): RelevanceRecommendation[] {
    const recommendations: RelevanceRecommendation[] = []

    switch (deviationLevel) {
      case TopicDeviation.NONE:
      case TopicDeviation.MINOR:
        recommendations.push({
          action: 'continue_current_topic',
          description: 'Response is well-aligned with current topic',
          confidence: 0.9
        })
        break

      case TopicDeviation.MODERATE:
        recommendations.push({
          action: 'gentle_redirect',
          description: 'Gently guide conversation back to main topic',
          confidence: 0.8
        })
        break

      case TopicDeviation.MAJOR:
        recommendations.push({
          action: 'explicit_redirect',
          description: 'Explicitly redirect conversation to intended topic',
          confidence: 0.9
        })
        break

      case TopicDeviation.COMPLETE:
        recommendations.push({
          action: 'topic_reset',
          description: 'Reset topic and provide clear guidance',
          confidence: 0.95
        })
        break
    }

    return recommendations
  }

  // Duration management
  async manageInterviewDuration(request: DurationManagementRequest): Promise<DurationManagementResult> {
    const timeAnalysis = this.analyzeTimeUsage(request)
    const riskAssessment = this.assessTimeRisks(request, timeAnalysis)
    const recommendedAction = this.determineTimeAction(timeAnalysis, riskAssessment)
    
    const timeAllocation = this.calculateTimeAllocation(request, timeAnalysis)
    const priorityAdjustments = this.adjustObjectivePriorities(request, timeAnalysis)
    const paceModifications = this.determinePaceModifications(request, timeAnalysis)

    return {
      recommendedAction,
      timeAllocation,
      priorityAdjustments,
      paceModifications,
      riskAssessment
    }
  }

  private analyzeTimeUsage(request: DurationManagementRequest): TimeAnalysis {
    const totalExpectedTime = this.calculateExpectedTotalTime()
    const timeUtilizationRate = request.timeElapsed / totalExpectedTime
    const phaseEfficiency = this.calculatePhaseEfficiency(request)
    const objectiveCompletionRate = request.completedObjectives.length / 
      (request.completedObjectives.length + request.remainingObjectives.length)

    return {
      totalExpectedTime,
      timeUtilizationRate,
      phaseEfficiency,
      objectiveCompletionRate,
      projectedOverrun: this.calculateProjectedOverrun(request)
    }
  }

  private calculateExpectedTotalTime(): number {
    let total = 0
    for (const allocation of this.durationTemplates.values()) {
      total += allocation.recommendedAllocation
    }
    return total
  }

  private calculatePhaseEfficiency(request: DurationManagementRequest): number {
    const template = this.durationTemplates.get(request.currentPhase)
    if (!template) return 0.8

    const actualTimeForPhase = this.getActualTimeForPhase(request)
    const expectedTime = template.recommendedAllocation
    
    return expectedTime > 0 ? Math.min(expectedTime / actualTimeForPhase, 2.0) : 1.0
  }

  private getActualTimeForPhase(request: DurationManagementRequest): number {
    // This would calculate actual time spent in current phase
    // Simplified implementation
    return request.timeElapsed * 0.3 // Assume 30% of total time in current phase
  }

  private calculateProjectedOverrun(request: DurationManagementRequest): number {
    const remainingTime = request.estimatedTimeRemaining
    const remainingObjectives = request.remainingObjectives.length
    const avgTimePerObjective = remainingObjectives > 0 ? 
      request.timeElapsed / request.completedObjectives.length : 5

    const projectedTimeNeeded = remainingObjectives * avgTimePerObjective
    return Math.max(0, projectedTimeNeeded - remainingTime)
  }

  private assessTimeRisks(request: DurationManagementRequest, analysis: TimeAnalysis): TimeRiskAssessment {
    const risks: TimeRisk[] = []
    let overallRisk = RiskLevel.LOW

    // High time utilization risk
    if (analysis.timeUtilizationRate > 0.8) {
      risks.push({
        type: 'high_time_utilization',
        probability: 0.8,
        impact: 'May not complete all objectives',
        severity: RiskLevel.HIGH
      })
      overallRisk = RiskLevel.HIGH
    }

    // Low efficiency risk
    if (analysis.phaseEfficiency < 0.6) {
      risks.push({
        type: 'low_efficiency',
        probability: 0.7,
        impact: 'Interview phases taking longer than expected',
        severity: RiskLevel.MEDIUM
      })
      if (overallRisk === RiskLevel.LOW) overallRisk = RiskLevel.MEDIUM
    }

    // Projected overrun risk
    if (analysis.projectedOverrun > 5) {
      risks.push({
        type: 'projected_overrun',
        probability: 0.9,
        impact: `Estimated ${analysis.projectedOverrun} minutes overtime`,
        severity: RiskLevel.HIGH
      })
      overallRisk = RiskLevel.HIGH
    }

    const mitigationStrategies = this.generateMitigationStrategies(risks)
    const contingencyPlans = this.generateContingencyPlans(risks)

    return {
      overallRisk,
      risks,
      mitigationStrategies,
      contingencyPlans
    }
  }

  private generateMitigationStrategies(risks: TimeRisk[]): string[] {
    const strategies: string[] = []

    risks.forEach(risk => {
      switch (risk.type) {
        case 'high_time_utilization':
          strategies.push('Prioritize critical objectives only')
          strategies.push('Accelerate conversation pace')
          break
        case 'low_efficiency':
          strategies.push('Focus on structured questioning')
          strategies.push('Limit follow-up questions')
          break
        case 'projected_overrun':
          strategies.push('Request time extension if possible')
          strategies.push('Skip non-essential objectives')
          break
      }
    })

    return [...new Set(strategies)] // Remove duplicates
  }

  private generateContingencyPlans(risks: TimeRisk[]): ContingencyPlan[] {
    return [
      {
        scenario: 'Severe time pressure',
        actions: ['Skip to closing phase', 'Summarize key findings', 'Schedule follow-up if needed'],
        triggerCondition: 'Less than 5 minutes remaining with multiple objectives',
        probability: 0.3
      },
      {
        scenario: 'Interview overrun',
        actions: ['Request candidate availability for extension', 'Prioritize remaining critical objectives', 'Document incomplete areas'],
        triggerCondition: 'Projected to exceed allocated time by >10 minutes',
        probability: 0.2
      }
    ]
  }

  private determineTimeAction(analysis: TimeAnalysis, riskAssessment: TimeRiskAssessment): DurationAction {
    if (riskAssessment.overallRisk === RiskLevel.HIGH) {
      if (analysis.projectedOverrun > 10) {
        return DurationAction.WRAP_UP_EARLY
      } else {
        return DurationAction.PRIORITIZE_OBJECTIVES
      }
    } else if (riskAssessment.overallRisk === RiskLevel.MEDIUM) {
      return DurationAction.ACCELERATE_PACE
    } else if (analysis.timeUtilizationRate < 0.5) {
      return DurationAction.EXTEND_TIME
    } else {
      return DurationAction.CONTINUE_NORMAL
    }
  }

  private calculateTimeAllocation(request: DurationManagementRequest, analysis: TimeAnalysis): PhaseTimeAllocation[] {
    const allocations: PhaseTimeAllocation[] = []
    const remainingTime = request.estimatedTimeRemaining
    const remainingPhases = this.getRemainingPhases(request.currentPhase)

    remainingPhases.forEach(phase => {
      const template = this.durationTemplates.get(phase)
      if (template) {
        const adjustedAllocation = this.calculateAdjustedAllocation(
          template.recommendedAllocation,
          remainingTime,
          remainingPhases.length,
          analysis
        )

        allocations.push({
          phase,
          currentAllocation: template.currentAllocation,
          recommendedAllocation: adjustedAllocation,
          adjustmentReason: this.getAdjustmentReason(adjustedAllocation, template.recommendedAllocation),
          flexibility: template.flexibility
        })
      }
    })

    return allocations
  }

  private getRemainingPhases(currentPhase: InterviewPhase): InterviewPhase[] {
    const allPhases = [
      InterviewPhase.INTRODUCTION,
      InterviewPhase.BACKGROUND,
      InterviewPhase.TECHNICAL,
      InterviewPhase.BEHAVIORAL,
      InterviewPhase.SITUATIONAL,
      InterviewPhase.COMPANY_FIT,
      InterviewPhase.QUESTIONS,
      InterviewPhase.CONCLUSION
    ]

    const currentIndex = allPhases.indexOf(currentPhase)
    return allPhases.slice(currentIndex + 1)
  }

  private calculateAdjustedAllocation(
    recommendedTime: number,
    remainingTime: number,
    remainingPhases: number,
    analysis: TimeAnalysis
  ): number {
    const evenDistribution = remainingTime / remainingPhases
    const adjustmentFactor = analysis.phaseEfficiency

    return Math.max(
      recommendedTime * 0.5, // Minimum allocation
      Math.min(
        recommendedTime * 1.5, // Maximum allocation
        evenDistribution * adjustmentFactor
      )
    )
  }

  private getAdjustmentReason(adjusted: number, recommended: number): string {
    const difference = adjusted - recommended
    
    if (Math.abs(difference) < 1) {
      return 'No significant adjustment needed'
    } else if (difference > 0) {
      return 'Extended due to available time'
    } else {
      return 'Reduced due to time constraints'
    }
  }

  private adjustObjectivePriorities(request: DurationManagementRequest, analysis: TimeAnalysis): ObjectivePriority[] {
    return request.remainingObjectives.map(objective => ({
      objectiveId: objective.id,
      currentPriority: objective.priority,
      adjustedPriority: this.calculateAdjustedPriority(objective, analysis),
      reason: this.getPriorityAdjustmentReason(objective, analysis)
    }))
  }

  private calculateAdjustedPriority(objective: InterviewObjective, analysis: TimeAnalysis): ObjectivePriority {
    // If time is running short, elevate critical objectives and lower nice-to-have ones
    if (analysis.projectedOverrun > 5) {
      if (objective.priority === ObjectivePriority.CRITICAL) {
        return ObjectivePriority.CRITICAL // Keep critical
      } else if (objective.priority === ObjectivePriority.HIGH) {
        return ObjectivePriority.MEDIUM // Demote high to medium
      } else {
        return ObjectivePriority.LOW // Demote others to low
      }
    }

    return objective.priority // No change if time is adequate
  }

  private getPriorityAdjustmentReason(objective: InterviewObjective, analysis: TimeAnalysis): string {
    if (analysis.projectedOverrun > 5) {
      return 'Adjusted due to time constraints'
    }
    return 'No adjustment needed'
  }

  private determinePaceModifications(request: DurationManagementRequest, analysis: TimeAnalysis): PaceModification[] {
    const modifications: PaceModification[] = []

    if (analysis.projectedOverrun > 5) {
      modifications.push({
        type: PaceModificationType.INCREASE_SPEED,
        magnitude: 0.3,
        duration: request.estimatedTimeRemaining,
        reason: 'Time constraints require faster pace',
        expectedImpact: 'Shorter responses and quicker transitions'
      })
    } else if (analysis.timeUtilizationRate < 0.5) {
      modifications.push({
        type: PaceModificationType.DECREASE_SPEED,
        magnitude: 0.2,
        duration: 10,
        reason: 'Ample time available for deeper exploration',
        expectedImpact: 'More detailed responses and follow-ups'
      })
    }

    return modifications
  }

  // Error handling
  async handleError(error: InterviewError, context: ErrorContext): Promise<ErrorRecoveryResult> {
    const strategies = this.errorRecoveryStrategies.get(error.type) || []
    const selectedStrategy = this.selectRecoveryStrategy(strategies, context)
    
    const alternativeActions = this.generateAlternativeActions(error, context)
    const contextRestoration = this.planContextRestoration(context)
    const userCommunication = this.craftUserCommunication(error, selectedStrategy)
    const preventionMeasures = this.identifyPreventionMeasures(error)

    return {
      recoveryStrategy: selectedStrategy,
      alternativeActions,
      contextRestoration,
      userCommunication,
      preventionMeasures
    }
  }

  private selectRecoveryStrategy(strategies: RecoveryStrategy[], context: ErrorContext): RecoveryStrategy {
    if (strategies.length === 0) {
      return this.getDefaultRecoveryStrategy(context.errorType)
    }

    // Select strategy based on context severity and capabilities
    if (context.severity === ErrorSeverity.CRITICAL) {
      return strategies.find(s => s.type === RecoveryType.MANUAL) || strategies[0]
    } else {
      return strategies.find(s => s.type === RecoveryType.AUTOMATIC) || strategies[0]
    }
  }

  private getDefaultRecoveryStrategy(errorType: ErrorType): RecoveryStrategy {
    return {
      type: RecoveryType.GUIDED,
      steps: [
        { action: 'acknowledge_error', timeout: 1000 },
        { action: 'attempt_recovery', timeout: 5000 },
        { action: 'notify_user', timeout: 2000 }
      ],
      expectedDuration: 15,
      successCriteria: ['system_responsive', 'user_informed'],
      fallbackOptions: ['manual_intervention']
    }
  }

  private generateAlternativeActions(error: InterviewError, context: ErrorContext): RecoveryAction[] {
    const actions: RecoveryAction[] = [
      {
        action: 'retry_last_operation',
        description: 'Attempt to retry the failed operation',
        impact: ActionImpact.LOW,
        difficulty: ActionDifficulty.EASY,
        timeRequired: 5
      },
      {
        action: 'skip_to_next_section',
        description: 'Skip current section and continue with next part',
        impact: ActionImpact.MEDIUM,
        difficulty: ActionDifficulty.MEDIUM,
        timeRequired: 2
      },
      {
        action: 'escalate_to_human',
        description: 'Transfer control to human interviewer',
        impact: ActionImpact.HIGH,
        difficulty: ActionDifficulty.HARD,
        timeRequired: 60
      }
    ]

    return actions
  }

  private planContextRestoration(context: ErrorContext): ContextRestoration {
    const restorationMethod = this.determineRestorationType(context)
    
    return {
      restorationMethod,
      contextData: {
        conversationState: context.conversationState,
        lastExchange: context.lastSuccessfulExchange,
        timestamp: context.timestamp
      },
      verificationSteps: [
        'Verify conversation history integrity',
        'Confirm candidate context',
        'Validate interview state'
      ],
      confidence: this.calculateRestorationConfidence(context)
    }
  }

  private determineRestorationType(context: ErrorContext): RestorationType {
    switch (context.severity) {
      case ErrorSeverity.MINOR:
        return RestorationType.FULL_RESTORE
      case ErrorSeverity.MODERATE:
        return RestorationType.PARTIAL_RESTORE
      case ErrorSeverity.MAJOR:
        return RestorationType.CONTEXT_REBUILD
      case ErrorSeverity.CRITICAL:
        return RestorationType.FRESH_START
      default:
        return RestorationType.PARTIAL_RESTORE
    }
  }

  private calculateRestorationConfidence(context: ErrorContext): number {
    let confidence = 0.8

    // Reduce confidence based on severity
    switch (context.severity) {
      case ErrorSeverity.CRITICAL:
        confidence = 0.3
        break
      case ErrorSeverity.MAJOR:
        confidence = 0.5
        break
      case ErrorSeverity.MODERATE:
        confidence = 0.7
        break
    }

    // Increase confidence if we have recent successful exchanges
    if (context.lastSuccessfulExchange.length > 0) {
      confidence += 0.1
    }

    return Math.max(0.1, Math.min(confidence, 0.9))
  }

  private craftUserCommunication(error: InterviewError, strategy: RecoveryStrategy): UserCommunication {
    const tone = this.determineErrorCommunicationTone(error.severity)
    const transparency = this.determineTransparencyLevel(error.type)
    
    let message = ''
    let explanation = ''
    const nextSteps: string[] = []

    switch (error.type) {
      case ErrorType.TECHNICAL_FAILURE:
        message = 'I experienced a technical issue, but I\'m working to resolve it.'
        explanation = 'There was a temporary system issue that has been addressed.'
        nextSteps.push('Continue with the interview')
        break
      
      case ErrorType.CONVERSATION_BREAKDOWN:
        message = 'Let me clarify that last point to make sure we\'re on the same page.'
        explanation = 'There may have been some confusion in our conversation.'
        nextSteps.push('Provide clarification', 'Resume conversation')
        break
      
      default:
        message = 'I encountered an issue, but we can continue.'
        explanation = 'A minor issue occurred that has been resolved.'
        nextSteps.push('Continue as normal')
    }

    return {
      message,
      tone,
      explanation,
      nextSteps,
      transparency
    }
  }

  private determineErrorCommunicationTone(severity: ErrorSeverity): CommunicationTone {
    switch (severity) {
      case ErrorSeverity.CRITICAL:
        return CommunicationTone.APOLOGETIC
      case ErrorSeverity.MAJOR:
        return CommunicationTone.TRANSPARENT
      case ErrorSeverity.MODERATE:
        return CommunicationTone.PROFESSIONAL
      default:
        return CommunicationTone.REASSURING
    }
  }

  private determineTransparencyLevel(errorType: ErrorType): TransparencyLevel {
    switch (errorType) {
      case ErrorType.TECHNICAL_FAILURE:
        return TransparencyLevel.MINIMAL
      case ErrorType.CONVERSATION_BREAKDOWN:
        return TransparencyLevel.PARTIAL
      case ErrorType.INAPPROPRIATE_RESPONSE:
        return TransparencyLevel.FULL
      default:
        return TransparencyLevel.PARTIAL
    }
  }

  private identifyPreventionMeasures(error: InterviewError): PreventionMeasure[] {
    const measures: PreventionMeasure[] = []

    switch (error.type) {
      case ErrorType.TECHNICAL_FAILURE:
        measures.push({
          measure: 'Implement redundant systems',
          implementation: 'Set up backup response generation',
          monitoring: 'Monitor system health continuously',
          effectiveness: 0.8
        })
        break
      
      case ErrorType.CONVERSATION_BREAKDOWN:
        measures.push({
          measure: 'Enhanced context tracking',
          implementation: 'Improve conversation state management',
          monitoring: 'Track conversation coherence metrics',
          effectiveness: 0.7
        })
        break
    }

    return measures
  }
}

// Supporting interfaces and types
interface ConversationContext {
  interviewId: string
  currentPhase: InterviewPhase
  messageHistory: ContextualMessage[]
  candidateProfile: DynamicProfile
}

interface InterviewError {
  type: ErrorType
  message: string
  timestamp: Date
  severity: ErrorSeverity
  context: any
}

interface TimeAnalysis {
  totalExpectedTime: number
  timeUtilizationRate: number
  phaseEfficiency: number
  objectiveCompletionRate: number
  projectedOverrun: number
}

interface TimeRisk {
  type: string
  probability: number
  impact: string
  severity: RiskLevel
}

interface ContingencyPlan {
  scenario: string
  actions: string[]
  triggerCondition: string
  probability: number
}

interface RecoveryStep {
  action: string
  timeout: number
}

interface RelevanceRecommendation {
  action: string
  description: string
  confidence: number
}

interface ObjectivePriority {
  objectiveId: string
  currentPriority: ObjectivePriority
  adjustedPriority: ObjectivePriority
  reason: string
}

// Singleton instance
export const qualityController = new ConversationQualityController()