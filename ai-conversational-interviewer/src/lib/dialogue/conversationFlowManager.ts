import { ContextualMessage, InterviewPhase, ConversationContext } from '../interview/conversationFlow'
import { DynamicProfile } from '../candidate/profileBuilder'
import { AdaptiveQuestionResult, GeneratedQuestion, QuestionType, InterviewObjective } from './adaptiveQuestioning'

export interface ConversationFlowState {
  interviewId: string
  currentPhase: InterviewPhase
  phaseProgress: PhaseProgress
  conversationContext: EnhancedConversationContext
  flowDecisions: FlowDecision[]
  transitionHistory: PhaseTransition[]
  adaptationRules: AdaptationRule[]
  flowMetrics: FlowMetrics
}

export interface PhaseProgress {
  currentPhase: InterviewPhase
  phaseStartTime: Date
  expectedDuration: number
  actualTimeSpent: number
  completionPercentage: number
  objectivesCompleted: string[]
  objectivesRemaining: string[]
  qualityScore: number
}

export interface EnhancedConversationContext {
  messageHistory: ContextualMessage[]
  topicProgression: TopicNode[]
  candidateProfile: DynamicProfile
  interviewObjectives: InterviewObjective[]
  conversationGoals: ConversationGoal[]
  contextualCues: ContextualCue[]
  flowConstraints: FlowConstraint[]
}

export interface TopicNode {
  id: string
  topic: string
  phase: InterviewPhase
  depth: number
  explorationLevel: TopicExplorationLevel
  relatedTopics: string[]
  questions: GeneratedQuestion[]
  responses: ContextualMessage[]
  insights: TopicInsight[]
  transitionPotential: number
}

export interface ConversationGoal {
  id: string
  type: GoalType
  description: string
  priority: GoalPriority
  targetPhase: InterviewPhase
  measurableOutcome: string
  currentProgress: number
  achieved: boolean
  strategies: GoalStrategy[]
}

export interface ContextualCue {
  type: CueType
  signal: string
  confidence: number
  suggestedAction: CueAction
  priority: number
  expiryTime?: Date
}

export interface FlowConstraint {
  type: ConstraintType
  description: string
  severity: ConstraintSeverity
  activePhases: InterviewPhase[]
  impact: ConstraintImpact
  mitigation: string[]
}

export interface FlowDecision {
  id: string
  timestamp: Date
  decisionType: DecisionType
  context: any
  reasoning: string[]
  confidence: number
  alternatives: DecisionAlternative[]
  outcome?: DecisionOutcome
}

export interface PhaseTransition {
  id: string
  fromPhase: InterviewPhase
  toPhase: InterviewPhase
  trigger: TransitionTrigger
  timestamp: Date
  reason: string
  quality: TransitionQuality
  effectiveness: number
}

export interface AdaptationRule {
  id: string
  trigger: AdaptationTrigger
  condition: string
  action: AdaptationAction
  priority: number
  phaseApplicability: InterviewPhase[]
  effectiveness: number
}

export interface FlowMetrics {
  conversationQuality: number
  phaseBalance: number
  transitionSmoothness: number
  objectiveProgress: number
  candidateEngagement: number
  timeEfficiency: number
  adaptationSuccess: number
}

export interface TopicInsight {
  type: InsightType
  content: string
  confidence: number
  actionable: boolean
  impact: InsightImpact
}

export interface GoalStrategy {
  approach: string
  questions: string[]
  expectedDuration: number
  successCriteria: string[]
}

export interface DecisionAlternative {
  option: string
  pros: string[]
  cons: string[]
  confidence: number
  risk: DecisionRisk
}

export interface DecisionOutcome {
  successful: boolean
  actualResult: string
  expectedResult: string
  lessons: string[]
  adjustments: string[]
}

export enum TopicExplorationLevel {
  SURFACE = 'surface',
  MODERATE = 'moderate',
  DEEP = 'deep',
  EXHAUSTIVE = 'exhaustive'
}

export enum GoalType {
  SKILL_ASSESSMENT = 'skill_assessment',
  EXPERIENCE_VALIDATION = 'experience_validation',
  CULTURAL_FIT = 'cultural_fit',
  MOTIVATION_UNDERSTANDING = 'motivation_understanding',
  PROBLEM_SOLVING = 'problem_solving',
  COMMUNICATION_EVALUATION = 'communication_evaluation'
}

export enum GoalPriority {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

export enum CueType {
  ENGAGEMENT_DROP = 'engagement_drop',
  CONFUSION = 'confusion',
  EXPERTISE_SIGNAL = 'expertise_signal',
  TOPIC_SATURATION = 'topic_saturation',
  TIME_PRESSURE = 'time_pressure',
  TRANSITION_OPPORTUNITY = 'transition_opportunity',
  CLARIFICATION_NEEDED = 'clarification_needed'
}

export enum CueAction {
  CLARIFY = 'clarify',
  SIMPLIFY = 'simplify',
  DEEPEN = 'deepen',
  TRANSITION = 'transition',
  ENCOURAGE = 'encourage',
  REDIRECT = 'redirect',
  SUMMARIZE = 'summarize'
}

export enum ConstraintType {
  TIME_LIMIT = 'time_limit',
  TOPIC_REQUIREMENT = 'topic_requirement',
  SKILL_COVERAGE = 'skill_coverage',
  PHASE_MINIMUM = 'phase_minimum',
  CANDIDATE_COMFORT = 'candidate_comfort',
  INTERVIEW_STYLE = 'interview_style'
}

export enum ConstraintSeverity {
  HARD = 'hard',
  SOFT = 'soft',
  ADVISORY = 'advisory'
}

export enum ConstraintImpact {
  BLOCKING = 'blocking',
  LIMITING = 'limiting',
  GUIDING = 'guiding'
}

export enum DecisionType {
  PHASE_TRANSITION = 'phase_transition',
  QUESTION_SELECTION = 'question_selection',
  TOPIC_DEEP_DIVE = 'topic_deep_dive',
  TIME_ALLOCATION = 'time_allocation',
  ADAPTATION_TRIGGER = 'adaptation_trigger',
  FLOW_CORRECTION = 'flow_correction'
}

export enum TransitionTrigger {
  OBJECTIVE_COMPLETED = 'objective_completed',
  TIME_CONSTRAINT = 'time_constraint',
  NATURAL_BREAK = 'natural_break',
  CANDIDATE_SIGNAL = 'candidate_signal',
  QUALITY_THRESHOLD = 'quality_threshold',
  MANUAL_OVERRIDE = 'manual_override'
}

export enum TransitionQuality {
  SMOOTH = 'smooth',
  ACCEPTABLE = 'acceptable',
  ABRUPT = 'abrupt',
  POOR = 'poor'
}

export enum AdaptationTrigger {
  ENGAGEMENT_LOW = 'engagement_low',
  CONFUSION_DETECTED = 'confusion_detected',
  EXPERTISE_HIGH = 'expertise_high',
  TIME_CRITICAL = 'time_critical',
  OBJECTIVE_STALLED = 'objective_stalled',
  FLOW_DISRUPTED = 'flow_disrupted'
}

export enum AdaptationAction {
  SIMPLIFY_QUESTIONS = 'simplify_questions',
  INCREASE_DIFFICULTY = 'increase_difficulty',
  CHANGE_TOPIC = 'change_topic',
  PROVIDE_ENCOURAGEMENT = 'provide_encouragement',
  SEEK_CLARIFICATION = 'seek_clarification',
  ACCELERATE_PACE = 'accelerate_pace',
  DECELERATE_PACE = 'decelerate_pace'
}

export enum InsightType {
  SKILL_GAP = 'skill_gap',
  STRENGTH_IDENTIFIED = 'strength_identified',
  BEHAVIORAL_PATTERN = 'behavioral_pattern',
  COMMUNICATION_STYLE = 'communication_style',
  MOTIVATION_INDICATOR = 'motivation_indicator',
  CULTURAL_ALIGNMENT = 'cultural_alignment'
}

export enum InsightImpact {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

export enum DecisionRisk {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export class ConversationFlowManager {
  private flowStates: Map<string, ConversationFlowState> = new Map()
  private phaseTemplates: Map<InterviewPhase, PhaseTemplate> = new Map()
  private adaptationHistory: Map<string, AdaptationRule[]> = new Map()

  constructor() {
    this.initializePhaseTemplates()
    this.initializeDefaultAdaptationRules()
  }

  private initializePhaseTemplates(): void {
    // Introduction Phase
    this.phaseTemplates.set(InterviewPhase.INTRODUCTION, {
      name: 'Introduction',
      objectives: ['establish_rapport', 'gather_basic_info', 'set_expectations'],
      expectedDuration: 5,
      minDuration: 3,
      maxDuration: 8,
      keyTopics: ['background', 'motivation', 'expectations'],
      transitionCriteria: ['basic_info_gathered', 'rapport_established'],
      qualityIndicators: ['candidate_comfort', 'information_completeness']
    })

    // Background Phase
    this.phaseTemplates.set(InterviewPhase.BACKGROUND, {
      name: 'Background Exploration',
      objectives: ['understand_experience', 'identify_skills', 'assess_growth'],
      expectedDuration: 10,
      minDuration: 7,
      maxDuration: 15,
      keyTopics: ['work_history', 'education', 'key_projects'],
      transitionCriteria: ['experience_understood', 'skills_identified'],
      qualityIndicators: ['detail_level', 'relevance', 'coherence']
    })

    // Technical Phase
    this.phaseTemplates.set(InterviewPhase.TECHNICAL, {
      name: 'Technical Assessment',
      objectives: ['validate_skills', 'assess_depth', 'evaluate_problem_solving'],
      expectedDuration: 15,
      minDuration: 10,
      maxDuration: 20,
      keyTopics: ['technical_skills', 'problem_solving', 'best_practices'],
      transitionCriteria: ['skills_validated', 'depth_assessed'],
      qualityIndicators: ['technical_accuracy', 'depth_of_knowledge', 'practical_experience']
    })

    // Behavioral Phase
    this.phaseTemplates.set(InterviewPhase.BEHAVIORAL, {
      name: 'Behavioral Assessment',
      objectives: ['assess_soft_skills', 'understand_work_style', 'evaluate_cultural_fit'],
      expectedDuration: 12,
      minDuration: 8,
      maxDuration: 18,
      keyTopics: ['teamwork', 'leadership', 'conflict_resolution', 'communication'],
      transitionCriteria: ['behavioral_patterns_identified', 'cultural_fit_assessed'],
      qualityIndicators: ['example_quality', 'self_awareness', 'behavioral_consistency']
    })
  }

  private initializeDefaultAdaptationRules(): void {
    const defaultRules: AdaptationRule[] = [
      {
        id: 'engagement_low_simplify',
        trigger: AdaptationTrigger.ENGAGEMENT_LOW,
        condition: 'engagement_score < 0.4',
        action: AdaptationAction.SIMPLIFY_QUESTIONS,
        priority: 1,
        phaseApplicability: [InterviewPhase.TECHNICAL, InterviewPhase.BEHAVIORAL],
        effectiveness: 0.7
      },
      {
        id: 'expertise_high_increase',
        trigger: AdaptationTrigger.EXPERTISE_HIGH,
        condition: 'technical_depth > 0.8',
        action: AdaptationAction.INCREASE_DIFFICULTY,
        priority: 2,
        phaseApplicability: [InterviewPhase.TECHNICAL],
        effectiveness: 0.8
      },
      {
        id: 'time_critical_accelerate',
        trigger: AdaptationTrigger.TIME_CRITICAL,
        condition: 'time_remaining < 10',
        action: AdaptationAction.ACCELERATE_PACE,
        priority: 1,
        phaseApplicability: Object.values(InterviewPhase),
        effectiveness: 0.6
      }
    ]

    defaultRules.forEach(rule => {
      const interviewId = 'default'
      if (!this.adaptationHistory.has(interviewId)) {
        this.adaptationHistory.set(interviewId, [])
      }
      this.adaptationHistory.get(interviewId)!.push(rule)
    })
  }

  // Main flow management methods
  async initializeConversationFlow(
    interviewId: string,
    candidateProfile: DynamicProfile,
    interviewObjectives: InterviewObjective[]
  ): Promise<ConversationFlowState> {
    const flowState: ConversationFlowState = {
      interviewId,
      currentPhase: InterviewPhase.INTRODUCTION,
      phaseProgress: this.initializePhaseProgress(InterviewPhase.INTRODUCTION),
      conversationContext: {
        messageHistory: [],
        topicProgression: [],
        candidateProfile,
        interviewObjectives,
        conversationGoals: this.generateConversationGoals(interviewObjectives),
        contextualCues: [],
        flowConstraints: this.generateFlowConstraints()
      },
      flowDecisions: [],
      transitionHistory: [],
      adaptationRules: this.adaptationHistory.get('default') || [],
      flowMetrics: this.initializeFlowMetrics()
    }

    this.flowStates.set(interviewId, flowState)
    return flowState
  }

  private initializePhaseProgress(phase: InterviewPhase): PhaseProgress {
    const template = this.phaseTemplates.get(phase)
    
    return {
      currentPhase: phase,
      phaseStartTime: new Date(),
      expectedDuration: template?.expectedDuration || 10,
      actualTimeSpent: 0,
      completionPercentage: 0,
      objectivesCompleted: [],
      objectivesRemaining: template?.objectives || [],
      qualityScore: 0.5
    }
  }

  private generateConversationGoals(objectives: InterviewObjective[]): ConversationGoal[] {
    return objectives.map(objective => ({
      id: `goal_${objective.id}`,
      type: this.mapObjectiveToGoalType(objective.category),
      description: objective.description,
      priority: this.mapPriorityToGoalPriority(objective.priority),
      targetPhase: this.mapCategoryToPhase(objective.category),
      measurableOutcome: `Successfully assess ${objective.description}`,
      currentProgress: 0,
      achieved: false,
      strategies: this.generateGoalStrategies(objective)
    }))
  }

  private generateFlowConstraints(): FlowConstraint[] {
    return [
      {
        type: ConstraintType.TIME_LIMIT,
        description: 'Interview must complete within allocated time',
        severity: ConstraintSeverity.HARD,
        activePhases: Object.values(InterviewPhase),
        impact: ConstraintImpact.BLOCKING,
        mitigation: ['time_tracking', 'phase_adjustment', 'priority_focusing']
      },
      {
        type: ConstraintType.TOPIC_REQUIREMENT,
        description: 'Key topics must be covered for complete assessment',
        severity: ConstraintSeverity.SOFT,
        activePhases: [InterviewPhase.TECHNICAL, InterviewPhase.BEHAVIORAL],
        impact: ConstraintImpact.GUIDING,
        mitigation: ['topic_prioritization', 'efficient_questioning']
      }
    ]
  }

  private initializeFlowMetrics(): FlowMetrics {
    return {
      conversationQuality: 0.5,
      phaseBalance: 0.5,
      transitionSmoothness: 0.5,
      objectiveProgress: 0,
      candidateEngagement: 0.5,
      timeEfficiency: 0.5,
      adaptationSuccess: 0.5
    }
  }

  // Context-aware flow management
  async processMessage(
    interviewId: string,
    message: ContextualMessage,
    adaptiveResult?: AdaptiveQuestionResult
  ): Promise<{
    flowState: ConversationFlowState
    contextualCues: ContextualCue[]
    flowDecisions: FlowDecision[]
    recommendations: FlowRecommendation[]
  }> {
    const flowState = this.flowStates.get(interviewId)
    if (!flowState) {
      throw new Error(`Flow state not found for interview ${interviewId}`)
    }

    // Update message history
    flowState.conversationContext.messageHistory.push(message)

    // Analyze contextual cues
    const contextualCues = await this.analyzeContextualCues(message, flowState)
    flowState.conversationContext.contextualCues.push(...contextualCues)

    // Update topic progression
    await this.updateTopicProgression(message, flowState, adaptiveResult)

    // Make flow decisions
    const flowDecisions = await this.makeFlowDecisions(flowState, contextualCues)
    flowState.flowDecisions.push(...flowDecisions)

    // Update phase progress
    this.updatePhaseProgress(flowState, message)

    // Update flow metrics
    this.updateFlowMetrics(flowState)

    // Generate recommendations
    const recommendations = this.generateFlowRecommendations(flowState)

    return {
      flowState,
      contextualCues,
      flowDecisions,
      recommendations
    }
  }

  private async analyzeContextualCues(
    message: ContextualMessage,
    flowState: ConversationFlowState
  ): Promise<ContextualCue[]> {
    const cues: ContextualCue[] = []

    // Analyze engagement drop
    if (message.sentiment?.emotions.enthusiasm < 0.3) {
      cues.push({
        type: CueType.ENGAGEMENT_DROP,
        signal: 'Low enthusiasm detected in response',
        confidence: message.sentiment.confidence,
        suggestedAction: CueAction.ENCOURAGE,
        priority: 1
      })
    }

    // Analyze confusion
    if (message.content.length < 30 && message.sentiment?.emotions.confidence < 0.4) {
      cues.push({
        type: CueType.CONFUSION,
        signal: 'Short response with low confidence',
        confidence: 0.7,
        suggestedAction: CueAction.CLARIFY,
        priority: 1
      })
    }

    // Analyze expertise signals
    const technicalEntities = message.entities?.filter(e => 
      e.type === 'technology' || e.type === 'skill'
    ) || []
    
    if (technicalEntities.length > 3 && technicalEntities.every(e => e.confidence > 0.8)) {
      cues.push({
        type: CueType.EXPERTISE_SIGNAL,
        signal: 'High technical proficiency demonstrated',
        confidence: 0.8,
        suggestedAction: CueAction.DEEPEN,
        priority: 2
      })
    }

    // Analyze topic saturation
    const currentTopic = this.getCurrentTopic(flowState)
    if (currentTopic && this.isTopicSaturated(currentTopic, flowState)) {
      cues.push({
        type: CueType.TOPIC_SATURATION,
        signal: `Topic ${currentTopic.topic} appears exhausted`,
        confidence: 0.6,
        suggestedAction: CueAction.TRANSITION,
        priority: 2
      })
    }

    return cues
  }

  private async updateTopicProgression(
    message: ContextualMessage,
    flowState: ConversationFlowState,
    adaptiveResult?: AdaptiveQuestionResult
  ): Promise<void> {
    const currentTopic = this.getCurrentTopic(flowState)
    
    if (currentTopic) {
      // Add response to current topic
      currentTopic.responses.push(message)
      
      // Update exploration level
      this.updateTopicExplorationLevel(currentTopic, message)
      
      // Generate insights
      const insights = await this.generateTopicInsights(currentTopic, message)
      currentTopic.insights.push(...insights)
      
      // Update transition potential
      currentTopic.transitionPotential = this.calculateTransitionPotential(currentTopic)
    }

    // Create new topic if adaptive result suggests it
    if (adaptiveResult?.transitionSuggestions.length > 0) {
      const transition = adaptiveResult.transitionSuggestions[0]
      await this.createNewTopicNode(transition.toTopic, flowState)
    }
  }

  private updateTopicExplorationLevel(topic: TopicNode, message: ContextualMessage): void {
    const responseCount = topic.responses.length
    const avgResponseLength = topic.responses.reduce((sum, r) => sum + r.content.length, 0) / responseCount
    const technicalDepth = topic.responses.filter(r => 
      r.entities?.some(e => e.type === 'technology' || e.type === 'skill')
    ).length / responseCount

    if (responseCount > 4 && avgResponseLength > 200 && technicalDepth > 0.5) {
      topic.explorationLevel = TopicExplorationLevel.DEEP
    } else if (responseCount > 2 && avgResponseLength > 100) {
      topic.explorationLevel = TopicExplorationLevel.MODERATE
    } else {
      topic.explorationLevel = TopicExplorationLevel.SURFACE
    }
  }

  private async generateTopicInsights(topic: TopicNode, message: ContextualMessage): Promise<TopicInsight[]> {
    const insights: TopicInsight[] = []

    // Skill gap insight
    const mentionedSkills = message.entities?.filter(e => e.type === 'skill').map(e => e.value) || []
    if (mentionedSkills.length === 0 && topic.topic.includes('technical')) {
      insights.push({
        type: InsightType.SKILL_GAP,
        content: 'Limited technical skills mentioned in technical discussion',
        confidence: 0.6,
        actionable: true,
        impact: InsightImpact.MEDIUM
      })
    }

    // Strength identification
    if (message.sentiment?.emotions.confidence > 0.8 && mentionedSkills.length > 2) {
      insights.push({
        type: InsightType.STRENGTH_IDENTIFIED,
        content: `Strong confidence in ${mentionedSkills.join(', ')}`,
        confidence: message.sentiment.confidence,
        actionable: true,
        impact: InsightImpact.HIGH
      })
    }

    return insights
  }

  private calculateTransitionPotential(topic: TopicNode): number {
    let potential = 0.5 // Base potential

    // Higher potential if topic is well explored
    if (topic.explorationLevel === TopicExplorationLevel.DEEP) {
      potential += 0.3
    } else if (topic.explorationLevel === TopicExplorationLevel.MODERATE) {
      potential += 0.1
    }

    // Higher potential if many insights generated
    if (topic.insights.length > 2) {
      potential += 0.2
    }

    // Lower potential if recent responses are still informative
    const recentResponses = topic.responses.slice(-2)
    const avgRecentLength = recentResponses.reduce((sum, r) => sum + r.content.length, 0) / recentResponses.length
    if (avgRecentLength > 150) {
      potential -= 0.2
    }

    return Math.max(0, Math.min(potential, 1.0))
  }

  private async createNewTopicNode(topicName: string, flowState: ConversationFlowState): Promise<TopicNode> {
    const topicNode: TopicNode = {
      id: `topic_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      topic: topicName,
      phase: flowState.currentPhase,
      depth: 0,
      explorationLevel: TopicExplorationLevel.SURFACE,
      relatedTopics: [],
      questions: [],
      responses: [],
      insights: [],
      transitionPotential: 0.1
    }

    flowState.conversationContext.topicProgression.push(topicNode)
    return topicNode
  }

  private async makeFlowDecisions(
    flowState: ConversationFlowState,
    contextualCues: ContextualCue[]
  ): Promise<FlowDecision[]> {
    const decisions: FlowDecision[] = []

    // Decision: Should we transition phases?
    const phaseTransitionDecision = await this.evaluatePhaseTransition(flowState, contextualCues)
    if (phaseTransitionDecision) {
      decisions.push(phaseTransitionDecision)
    }

    // Decision: Should we adapt the conversation style?
    const adaptationDecision = await this.evaluateAdaptation(flowState, contextualCues)
    if (adaptationDecision) {
      decisions.push(adaptationDecision)
    }

    // Decision: Time allocation adjustment
    const timeDecision = await this.evaluateTimeAllocation(flowState)
    if (timeDecision) {
      decisions.push(timeDecision)
    }

    return decisions
  }

  private async evaluatePhaseTransition(
    flowState: ConversationFlowState,
    contextualCues: ContextualCue[]
  ): Promise<FlowDecision | null> {
    const currentPhase = flowState.currentPhase
    const phaseProgress = flowState.phaseProgress
    const template = this.phaseTemplates.get(currentPhase)

    if (!template) return null

    // Check if minimum objectives are met
    const objectivesMet = phaseProgress.objectivesCompleted.length >= template.objectives.length * 0.7
    
    // Check if time constraints suggest transition
    const timeConstraint = contextualCues.some(cue => cue.type === CueType.TIME_PRESSURE)
    
    // Check if current topic is saturated
    const topicSaturated = contextualCues.some(cue => cue.type === CueType.TOPIC_SATURATION)

    if (objectivesMet || timeConstraint || topicSaturated) {
      const nextPhase = this.getNextPhase(currentPhase)
      
      return {
        id: `decision_${Date.now()}`,
        timestamp: new Date(),
        decisionType: DecisionType.PHASE_TRANSITION,
        context: { currentPhase, nextPhase, objectivesMet, timeConstraint, topicSaturated },
        reasoning: [
          objectivesMet ? 'Phase objectives largely completed' : '',
          timeConstraint ? 'Time pressure detected' : '',
          topicSaturated ? 'Current topic appears exhausted' : ''
        ].filter(r => r),
        confidence: 0.8,
        alternatives: [
          {
            option: 'Continue current phase',
            pros: ['More thorough exploration', 'Complete all objectives'],
            cons: ['Time pressure', 'Potential redundancy'],
            confidence: 0.6,
            risk: DecisionRisk.MEDIUM
          },
          {
            option: `Transition to ${nextPhase}`,
            pros: ['Better time management', 'Fresh engagement'],
            cons: ['Potentially incomplete assessment'],
            confidence: 0.8,
            risk: DecisionRisk.LOW
          }
        ]
      }
    }

    return null
  }

  private async evaluateAdaptation(
    flowState: ConversationFlowState,
    contextualCues: ContextualCue[]
  ): Promise<FlowDecision | null> {
    // Check for adaptation triggers
    const engagementDrop = contextualCues.find(cue => cue.type === CueType.ENGAGEMENT_DROP)
    const confusion = contextualCues.find(cue => cue.type === CueType.CONFUSION)
    const expertise = contextualCues.find(cue => cue.type === CueType.EXPERTISE_SIGNAL)

    let adaptationNeeded = false
    let suggestedAction = ''
    let reasoning: string[] = []

    if (engagementDrop) {
      adaptationNeeded = true
      suggestedAction = 'Provide encouragement and simplify approach'
      reasoning.push('Low engagement detected')
    }

    if (confusion) {
      adaptationNeeded = true
      suggestedAction = 'Clarify and simplify questions'
      reasoning.push('Confusion signals detected')
    }

    if (expertise) {
      adaptationNeeded = true
      suggestedAction = 'Increase question complexity'
      reasoning.push('High expertise demonstrated')
    }

    if (adaptationNeeded) {
      return {
        id: `adaptation_${Date.now()}`,
        timestamp: new Date(),
        decisionType: DecisionType.ADAPTATION_TRIGGER,
        context: { cues: contextualCues, suggestedAction },
        reasoning,
        confidence: 0.7,
        alternatives: []
      }
    }

    return null
  }

  private async evaluateTimeAllocation(flowState: ConversationFlowState): Promise<FlowDecision | null> {
    const timeSpent = this.calculateTotalTimeSpent(flowState)
    const remainingPhases = this.getRemainingPhases(flowState.currentPhase)
    const avgTimePerPhase = timeSpent / (Object.values(InterviewPhase).length - remainingPhases.length)

    // If we're spending too much time per phase
    if (avgTimePerPhase > 12 && remainingPhases.length > 2) {
      return {
        id: `time_allocation_${Date.now()}`,
        timestamp: new Date(),
        decisionType: DecisionType.TIME_ALLOCATION,
        context: { timeSpent, avgTimePerPhase, remainingPhases },
        reasoning: ['Time per phase exceeding optimal allocation'],
        confidence: 0.8,
        alternatives: [
          {
            option: 'Accelerate current phase',
            pros: ['Better time management', 'Cover more ground'],
            cons: ['Less thorough assessment'],
            confidence: 0.7,
            risk: DecisionRisk.MEDIUM
          }
        ]
      }
    }

    return null
  }

  private updatePhaseProgress(flowState: ConversationFlowState, message: ContextualMessage): void {
    const progress = flowState.phaseProgress
    const template = this.phaseTemplates.get(flowState.currentPhase)

    if (!template) return

    // Update time spent
    const now = new Date()
    progress.actualTimeSpent = (now.getTime() - progress.phaseStartTime.getTime()) / (1000 * 60) // minutes

    // Update completion percentage based on objectives and time
    const objectiveCompletion = progress.objectivesCompleted.length / template.objectives.length
    const timeCompletion = Math.min(progress.actualTimeSpent / progress.expectedDuration, 1.0)
    progress.completionPercentage = (objectiveCompletion * 0.7) + (timeCompletion * 0.3)

    // Update quality score based on message analysis
    if (message.sentiment) {
      const messageQuality = (message.sentiment.emotions.clarity + message.sentiment.emotions.confidence) / 2
      progress.qualityScore = (progress.qualityScore * 0.8) + (messageQuality * 0.2)
    }
  }

  private updateFlowMetrics(flowState: ConversationFlowState): void {
    const metrics = flowState.flowMetrics
    const context = flowState.conversationContext

    // Update conversation quality
    const recentMessages = context.messageHistory.slice(-5)
    const avgQuality = recentMessages
      .filter(m => m.sentiment)
      .reduce((sum, m) => sum + ((m.sentiment!.emotions.clarity + m.sentiment!.emotions.confidence) / 2), 0) / recentMessages.length || 0.5
    metrics.conversationQuality = avgQuality

    // Update candidate engagement
    const avgEngagement = recentMessages
      .filter(m => m.sentiment)
      .reduce((sum, m) => sum + m.sentiment!.emotions.enthusiasm, 0) / recentMessages.length || 0.5
    metrics.candidateEngagement = avgEngagement

    // Update objective progress
    const totalObjectives = context.interviewObjectives.length
    const completedObjectives = context.interviewObjectives.filter(obj => obj.completed).length
    metrics.objectiveProgress = totalObjectives > 0 ? completedObjectives / totalObjectives : 0

    // Update time efficiency
    const expectedTime = this.calculateExpectedTotalTime()
    const actualTime = this.calculateTotalTimeSpent(flowState)
    metrics.timeEfficiency = expectedTime > 0 ? Math.min(expectedTime / actualTime, 1.0) : 0.5
  }

  private generateFlowRecommendations(flowState: ConversationFlowState): FlowRecommendation[] {
    const recommendations: FlowRecommendation[] = []
    const metrics = flowState.flowMetrics

    // Quality recommendations
    if (metrics.conversationQuality < 0.6) {
      recommendations.push({
        type: 'quality_improvement',
        priority: 'high',
        description: 'Consider asking more open-ended questions to improve response quality',
        action: 'Adjust questioning strategy',
        expectedImpact: 'Higher quality responses and better insights'
      })
    }

    // Engagement recommendations
    if (metrics.candidateEngagement < 0.5) {
      recommendations.push({
        type: 'engagement_boost',
        priority: 'high',
        description: 'Candidate engagement is low. Consider changing topics or providing encouragement',
        action: 'Implement engagement strategies',
        expectedImpact: 'Improved candidate participation and response quality'
      })
    }

    // Time management recommendations
    if (metrics.timeEfficiency < 0.7) {
      recommendations.push({
        type: 'time_management',
        priority: 'medium',
        description: 'Interview pacing could be improved for better time utilization',
        action: 'Adjust time allocation per phase',
        expectedImpact: 'Better coverage of all interview objectives'
      })
    }

    return recommendations
  }

  // Phase transition methods
  async transitionToPhase(interviewId: string, newPhase: InterviewPhase, trigger: TransitionTrigger): Promise<void> {
    const flowState = this.flowStates.get(interviewId)
    if (!flowState) return

    const oldPhase = flowState.currentPhase
    
    // Record transition
    const transition: PhaseTransition = {
      id: `transition_${Date.now()}`,
      fromPhase: oldPhase,
      toPhase: newPhase,
      trigger,
      timestamp: new Date(),
      reason: this.getTransitionReason(trigger),
      quality: this.assessTransitionQuality(flowState, newPhase),
      effectiveness: 0.5 // To be updated based on outcomes
    }

    flowState.transitionHistory.push(transition)

    // Update current phase
    flowState.currentPhase = newPhase
    flowState.phaseProgress = this.initializePhaseProgress(newPhase)

    // Log the transition
    console.log(`Transitioned from ${oldPhase} to ${newPhase} due to ${trigger}`)
  }

  private getTransitionReason(trigger: TransitionTrigger): string {
    const reasons = {
      [TransitionTrigger.OBJECTIVE_COMPLETED]: 'Phase objectives successfully completed',
      [TransitionTrigger.TIME_CONSTRAINT]: 'Time constraints require phase progression',
      [TransitionTrigger.NATURAL_BREAK]: 'Natural conversation break identified',
      [TransitionTrigger.CANDIDATE_SIGNAL]: 'Candidate indicated readiness for transition',
      [TransitionTrigger.QUALITY_THRESHOLD]: 'Quality threshold met for current phase',
      [TransitionTrigger.MANUAL_OVERRIDE]: 'Manual intervention requested transition'
    }
    
    return reasons[trigger] || 'Transition triggered'
  }

  private assessTransitionQuality(flowState: ConversationFlowState, newPhase: InterviewPhase): TransitionQuality {
    const currentProgress = flowState.phaseProgress.completionPercentage
    const conversationQuality = flowState.flowMetrics.conversationQuality

    if (currentProgress > 0.8 && conversationQuality > 0.7) {
      return TransitionQuality.SMOOTH
    } else if (currentProgress > 0.6 && conversationQuality > 0.5) {
      return TransitionQuality.ACCEPTABLE
    } else if (currentProgress > 0.4) {
      return TransitionQuality.ABRUPT
    } else {
      return TransitionQuality.POOR
    }
  }

  // Utility methods
  private getCurrentTopic(flowState: ConversationFlowState): TopicNode | null {
    const topics = flowState.conversationContext.topicProgression
    return topics.length > 0 ? topics[topics.length - 1] : null
  }

  private isTopicSaturated(topic: TopicNode, flowState: ConversationFlowState): boolean {
    return topic.explorationLevel === TopicExplorationLevel.EXHAUSTIVE ||
           (topic.responses.length > 5 && topic.transitionPotential > 0.7)
  }

  private getNextPhase(currentPhase: InterviewPhase): InterviewPhase {
    const phaseOrder = [
      InterviewPhase.INTRODUCTION,
      InterviewPhase.BACKGROUND,
      InterviewPhase.TECHNICAL,
      InterviewPhase.BEHAVIORAL,
      InterviewPhase.SITUATIONAL,
      InterviewPhase.COMPANY_FIT,
      InterviewPhase.QUESTIONS,
      InterviewPhase.CONCLUSION
    ]

    const currentIndex = phaseOrder.indexOf(currentPhase)
    return currentIndex < phaseOrder.length - 1 ? phaseOrder[currentIndex + 1] : InterviewPhase.CONCLUSION
  }

  private getRemainingPhases(currentPhase: InterviewPhase): InterviewPhase[] {
    const phaseOrder = [
      InterviewPhase.INTRODUCTION,
      InterviewPhase.BACKGROUND,
      InterviewPhase.TECHNICAL,
      InterviewPhase.BEHAVIORAL,
      InterviewPhase.SITUATIONAL,
      InterviewPhase.COMPANY_FIT,
      InterviewPhase.QUESTIONS,
      InterviewPhase.CONCLUSION
    ]

    const currentIndex = phaseOrder.indexOf(currentPhase)
    return phaseOrder.slice(currentIndex + 1)
  }

  private calculateTotalTimeSpent(flowState: ConversationFlowState): number {
    return flowState.transitionHistory.reduce((total, transition) => {
      const duration = transition.timestamp.getTime() - (flowState.phaseProgress.phaseStartTime?.getTime() || 0)
      return total + (duration / (1000 * 60)) // Convert to minutes
    }, flowState.phaseProgress.actualTimeSpent)
  }

  private calculateExpectedTotalTime(): number {
    let total = 0
    for (const template of this.phaseTemplates.values()) {
      total += template.expectedDuration
    }
    return total
  }

  // Helper methods for initialization
  private mapObjectiveToGoalType(category: string): GoalType {
    const mapping: { [key: string]: GoalType } = {
      'skill_assessment': GoalType.SKILL_ASSESSMENT,
      'experience_validation': GoalType.EXPERIENCE_VALIDATION,
      'cultural_fit': GoalType.CULTURAL_FIT,
      'behavioral_traits': GoalType.COMMUNICATION_EVALUATION
    }
    
    return mapping[category] || GoalType.SKILL_ASSESSMENT
  }

  private mapPriorityToGoalPriority(priority: string): GoalPriority {
    const mapping: { [key: string]: GoalPriority } = {
      'critical': GoalPriority.CRITICAL,
      'important': GoalPriority.HIGH,
      'nice_to_have': GoalPriority.LOW
    }
    
    return mapping[priority] || GoalPriority.MEDIUM
  }

  private mapCategoryToPhase(category: string): InterviewPhase {
    const mapping: { [key: string]: InterviewPhase } = {
      'skill_assessment': InterviewPhase.TECHNICAL,
      'experience_validation': InterviewPhase.BACKGROUND,
      'cultural_fit': InterviewPhase.COMPANY_FIT,
      'behavioral_traits': InterviewPhase.BEHAVIORAL
    }
    
    return mapping[category] || InterviewPhase.BACKGROUND
  }

  private generateGoalStrategies(objective: InterviewObjective): GoalStrategy[] {
    return [
      {
        approach: 'Direct questioning',
        questions: [`Tell me about your experience with ${objective.description}`],
        expectedDuration: 5,
        successCriteria: ['Specific examples provided', 'Depth of knowledge demonstrated']
      }
    ]
  }

  // Public interface methods
  getFlowState(interviewId: string): ConversationFlowState | null {
    return this.flowStates.get(interviewId) || null
  }

  async getFlowRecommendations(interviewId: string): Promise<FlowRecommendation[]> {
    const flowState = this.flowStates.get(interviewId)
    return flowState ? this.generateFlowRecommendations(flowState) : []
  }

  async getFlowMetrics(interviewId: string): Promise<FlowMetrics | null> {
    const flowState = this.flowStates.get(interviewId)
    return flowState ? flowState.flowMetrics : null
  }
}

// Supporting interfaces
interface PhaseTemplate {
  name: string
  objectives: string[]
  expectedDuration: number
  minDuration: number
  maxDuration: number
  keyTopics: string[]
  transitionCriteria: string[]
  qualityIndicators: string[]
}

interface FlowRecommendation {
  type: string
  priority: 'high' | 'medium' | 'low'
  description: string
  action: string
  expectedImpact: string
}

// Singleton instance
export const conversationFlowManager = new ConversationFlowManager()