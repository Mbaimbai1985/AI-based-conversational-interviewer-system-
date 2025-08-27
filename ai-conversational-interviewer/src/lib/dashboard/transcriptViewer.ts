import { ContextualMessage, InterviewPhase } from '../interview/conversationFlow'
import { InterviewSession } from './interviewTracking'

export interface TranscriptViewerData {
  interviewId: string
  candidateName: string
  position: string
  interviewDate: Date
  duration: number
  phases: PhaseTranscript[]
  messages: TranscriptMessage[]
  analytics: TranscriptAnalytics
  annotations: TranscriptAnnotation[]
  highlights: TranscriptHighlight[]
  searchResults: SearchResult[]
  exportOptions: ExportOption[]
  viewerSettings: ViewerSettings
}

export interface PhaseTranscript {
  phase: InterviewPhase
  startTime: Date
  endTime: Date
  duration: number
  messageCount: number
  keyTopics: string[]
  quality: PhaseQuality
  summary: string
  objectives: PhaseObjective[]
  transitions: PhaseTransition[]
}

export interface TranscriptMessage {
  id: string
  messageIndex: number
  timestamp: Date
  speaker: MessageSpeaker
  content: string
  originalContent?: string
  phase: InterviewPhase
  messageType: MessageType
  metadata: MessageMetadata
  annotations: MessageAnnotation[]
  sentiment: SentimentData
  topics: TopicTag[]
  questionCategory?: QuestionCategory
  responseQuality?: ResponseQuality
  technicalContent?: TechnicalContent
  flags: MessageFlag[]
}

export interface MessageMetadata {
  duration?: number
  responseTime?: number
  wordCount: number
  sentenceCount: number
  complexity: ComplexityLevel
  confidence: number
  relevance: number
  clarity: number
  engagement: number
  entities: EntityMention[]
}

export interface TranscriptAnalytics {
  overallMetrics: OverallMetrics
  speakingTime: SpeakingTimeAnalysis
  topicCoverage: TopicCoverage[]
  questionAnalysis: QuestionAnalysis
  responseAnalysis: ResponseAnalysis
  sentimentFlow: SentimentFlow[]
  engagementMetrics: EngagementMetrics
  qualityMetrics: QualityMetrics
  technicalAssessment: TechnicalAssessment
  communicationAssessment: CommunicationAssessment
}

export interface OverallMetrics {
  totalMessages: number
  totalWords: number
  averageResponseTime: number
  topicTransitions: number
  questionsAsked: number
  questionsAnswered: number
  clarificationRequests: number
  followUpQuestions: number
}

export interface SpeakingTimeAnalysis {
  candidatePercentage: number
  interviewerPercentage: number
  candidateTotalTime: number
  interviewerTotalTime: number
  averageResponseLength: number
  longestResponse: ResponseLength
  shortestResponse: ResponseLength
  responseDistribution: ResponseDistribution[]
}

export interface ResponseLength {
  messageId: string
  speaker: MessageSpeaker
  duration: number
  wordCount: number
  phase: InterviewPhase
}

export interface ResponseDistribution {
  range: string
  count: number
  percentage: number
}

export interface TopicCoverage {
  topic: string
  relevance: number
  depth: TopicDepth
  timeSpent: number
  messageCount: number
  phase: InterviewPhase
  keyInsights: string[]
  completeness: number
}

export interface QuestionAnalysis {
  totalQuestions: number
  questionTypes: QuestionTypeBreakdown[]
  difficultyProgression: DifficultyProgression[]
  followUpRate: number
  clarificationRate: number
  questionQuality: QuestionQualityMetrics
}

export interface QuestionTypeBreakdown {
  type: QuestionCategory
  count: number
  percentage: number
  averageQuality: number
  effectiveness: number
}

export interface DifficultyProgression {
  phase: InterviewPhase
  averageDifficulty: number
  trend: ProgressionTrend
  appropriateness: number
}

export interface QuestionQualityMetrics {
  clarity: number
  relevance: number
  depth: number
  creativity: number
  appropriateness: number
}

export interface ResponseAnalysis {
  averageQuality: number
  completeness: number
  technicalAccuracy: number
  clarity: number
  depth: number
  responsePatterns: ResponsePattern[]
  improvementAreas: string[]
  strengths: string[]
}

export interface ResponsePattern {
  pattern: string
  frequency: number
  context: string
  impact: PatternImpact
}

export interface SentimentFlow {
  timestamp: Date
  phase: InterviewPhase
  sentiment: number
  confidence: number
  emotions: EmotionBreakdown
  context: string
}

export interface EmotionBreakdown {
  enthusiasm: number
  nervousness: number
  confidence: number
  frustration: number
  engagement: number
}

export interface EngagementMetrics {
  overallEngagement: number
  engagementTrend: EngagementTrend
  peakEngagement: EngagementPeak
  lowEngagement: EngagementLow[]
  factorsInfluencing: EngagementFactor[]
}

export interface EngagementTrend {
  direction: TrendDirection
  strength: number
  consistency: number
  phases: PhaseEngagement[]
}

export interface PhaseEngagement {
  phase: InterviewPhase
  engagement: number
  change: number
}

export interface EngagementPeak {
  timestamp: Date
  phase: InterviewPhase
  engagement: number
  context: string
  triggers: string[]
}

export interface EngagementLow {
  timestamp: Date
  phase: InterviewPhase
  engagement: number
  duration: number
  possibleCauses: string[]
}

export interface EngagementFactor {
  factor: string
  impact: number
  correlation: number
  description: string
}

export interface QualityMetrics {
  overallQuality: number
  responseQuality: ResponseQualityBreakdown
  conversationFlow: ConversationFlowMetrics
  topicDepth: TopicDepthMetrics
  professionalismScore: number
}

export interface ResponseQualityBreakdown {
  technical: number
  behavioral: number
  situational: number
  general: number
  improvement: QualityImprovement[]
}

export interface QualityImprovement {
  area: string
  currentScore: number
  targetScore: number
  suggestions: string[]
}

export interface ConversationFlowMetrics {
  naturalness: number
  coherence: number
  transitionQuality: number
  interruptions: number
  awkwardPauses: number
}

export interface TopicDepthMetrics {
  averageDepth: number
  depthDistribution: DepthDistribution[]
  thoroughness: number
  surfaceLevelTopics: string[]
}

export interface DepthDistribution {
  depth: TopicDepth
  count: number
  percentage: number
  examples: string[]
}

export interface TechnicalAssessment {
  overallTechnicalScore: number
  skillDemonstrations: SkillDemonstration[]
  problemSolvingApproach: ProblemSolvingApproach
  technicalAccuracy: number
  conceptualUnderstanding: number
  practicalApplication: number
  innovativeThinking: number
}

export interface SkillDemonstration {
  skill: string
  demonstration: DemonstrationType
  quality: number
  depth: number
  examples: string[]
  evidence: string[]
}

export interface ProblemSolvingApproach {
  methodology: string
  structuredApproach: number
  creativity: number
  efficiency: number
  reasoning: number
  alternatives: number
}

export interface CommunicationAssessment {
  overallScore: number
  verbalCommunication: VerbalCommunication
  articulation: Articulation
  listeningSkills: ListeningSkills
  nonVerbalCues: NonVerbalCues
  culturalSensitivity: number
}

export interface VerbalCommunication {
  clarity: number
  pace: number
  volume: number
  tone: number
  vocabulary: VocabularyAssessment
}

export interface VocabularyAssessment {
  range: number
  appropriateness: number
  technicalAccuracy: number
  precision: number
}

export interface Articulation {
  pronunciation: number
  grammar: number
  fluency: number
  coherence: number
}

export interface ListeningSkills {
  attentiveness: number
  comprehension: number
  responsiveness: number
  clarificationSeeking: number
}

export interface NonVerbalCues {
  eyeContact: number
  posture: number
  gestures: number
  facialExpressions: number
}

export interface TranscriptAnnotation {
  id: string
  messageId: string
  type: AnnotationType
  category: AnnotationCategory
  content: string
  timestamp: Date
  author: string
  visibility: AnnotationVisibility
  importance: AnnotationImportance
  tags: string[]
  linkedAnnotations: string[]
}

export interface TranscriptHighlight {
  id: string
  messageId: string
  startPosition: number
  endPosition: number
  text: string
  category: HighlightCategory
  reason: string
  importance: HighlightImportance
  color: string
  notes?: string
}

export interface MessageAnnotation {
  id: string
  type: AnnotationType
  content: string
  timestamp: Date
  author: string
  automated: boolean
}

export interface SentimentData {
  polarity: number
  confidence: number
  emotions: EmotionBreakdown
  context: string
}

export interface TopicTag {
  topic: string
  relevance: number
  confidence: number
  category: TopicCategory
}

export interface TechnicalContent {
  concepts: TechnicalConcept[]
  skills: SkillMention[]
  complexity: ComplexityLevel
  accuracy: number
}

export interface TechnicalConcept {
  concept: string
  accuracy: number
  depth: number
  context: string
}

export interface SkillMention {
  skill: string
  proficiency: ProficiencyLevel
  evidence: string
  confidence: number
}

export interface MessageFlag {
  id: string
  type: FlagType
  severity: FlagSeverity
  description: string
  automated: boolean
  resolved: boolean
}

export interface PhaseObjective {
  objective: string
  completed: boolean
  completionTime?: Date
  quality: number
  evidence: string[]
}

export interface PhaseTransition {
  fromPhase: InterviewPhase
  toPhase: InterviewPhase
  timestamp: Date
  trigger: TransitionTrigger
  quality: TransitionQuality
  duration: number
}

export interface SearchResult {
  messageId: string
  relevance: number
  matchedText: string
  context: string
  highlights: TextHighlight[]
}

export interface TextHighlight {
  start: number
  end: number
  type: HighlightType
}

export interface ExportOption {
  format: ExportFormat
  name: string
  description: string
  includeAnnotations: boolean
  includeAnalytics: boolean
  customizable: boolean
  fileSize?: string
}

export interface ViewerSettings {
  showTimestamps: boolean
  showAnnotations: boolean
  showSentiment: boolean
  showQuality: boolean
  highlightKeywords: boolean
  autoScroll: boolean
  fontSize: FontSize
  theme: ViewerTheme
  layout: ViewerLayout
  filterOptions: FilterOption[]
}

export interface FilterOption {
  type: FilterType
  enabled: boolean
  value: any
}

export interface EntityMention {
  entity: string
  type: EntityType
  confidence: number
  startPosition: number
  endPosition: number
}

export interface ResponseQuality {
  overall: number
  completeness: number
  relevance: number
  clarity: number
  depth: number
  technicalAccuracy?: number
}

export interface PhaseQuality {
  overall: number
  objectiveCompletion: number
  questionQuality: number
  responseQuality: number
  engagement: number
}

// Enums
export enum MessageSpeaker {
  INTERVIEWER = 'interviewer',
  CANDIDATE = 'candidate',
  SYSTEM = 'system'
}

export enum MessageType {
  QUESTION = 'question',
  ANSWER = 'answer',
  CLARIFICATION = 'clarification',
  FOLLOW_UP = 'follow_up',
  TRANSITION = 'transition',
  SYSTEM_MESSAGE = 'system_message',
  NOTE = 'note'
}

export enum QuestionCategory {
  TECHNICAL = 'technical',
  BEHAVIORAL = 'behavioral',
  SITUATIONAL = 'situational',
  BACKGROUND = 'background',
  CLOSING = 'closing',
  CLARIFICATION = 'clarification'
}

export enum ComplexityLevel {
  SIMPLE = 'simple',
  MODERATE = 'moderate',
  COMPLEX = 'complex',
  VERY_COMPLEX = 'very_complex'
}

export enum TopicDepth {
  SURFACE = 'surface',
  MODERATE = 'moderate',
  DEEP = 'deep',
  EXHAUSTIVE = 'exhaustive'
}

export enum ProgressionTrend {
  INCREASING = 'increasing',
  DECREASING = 'decreasing',
  STABLE = 'stable',
  ERRATIC = 'erratic'
}

export enum PatternImpact {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  NEUTRAL = 'neutral'
}

export enum TrendDirection {
  UP = 'up',
  DOWN = 'down',
  STABLE = 'stable'
}

export enum DemonstrationType {
  THEORETICAL = 'theoretical',
  PRACTICAL = 'practical',
  EXAMPLE_BASED = 'example_based',
  PROBLEM_SOLVING = 'problem_solving'
}

export enum ProficiencyLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

export enum AnnotationType {
  INSIGHT = 'insight',
  CONCERN = 'concern',
  STRENGTH = 'strength',
  IMPROVEMENT = 'improvement',
  CLARIFICATION = 'clarification',
  FOLLOW_UP = 'follow_up'
}

export enum AnnotationCategory {
  TECHNICAL = 'technical',
  BEHAVIORAL = 'behavioral',
  COMMUNICATION = 'communication',
  CULTURAL = 'cultural',
  GENERAL = 'general'
}

export enum AnnotationVisibility {
  PRIVATE = 'private',
  TEAM = 'team',
  PUBLIC = 'public'
}

export enum AnnotationImportance {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum HighlightCategory {
  STRENGTH = 'strength',
  WEAKNESS = 'weakness',
  TECHNICAL_SKILL = 'technical_skill',
  SOFT_SKILL = 'soft_skill',
  RED_FLAG = 'red_flag',
  OPPORTUNITY = 'opportunity'
}

export enum HighlightImportance {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export enum TopicCategory {
  TECHNICAL = 'technical',
  BUSINESS = 'business',
  PERSONAL = 'personal',
  EDUCATIONAL = 'educational',
  EXPERIENCE = 'experience'
}

export enum FlagType {
  INAPPROPRIATE_CONTENT = 'inappropriate_content',
  TECHNICAL_INACCURACY = 'technical_inaccuracy',
  COMMUNICATION_ISSUE = 'communication_issue',
  INCONSISTENCY = 'inconsistency',
  CONCERN = 'concern'
}

export enum FlagSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum TransitionTrigger {
  OBJECTIVE_COMPLETE = 'objective_complete',
  TIME_CONSTRAINT = 'time_constraint',
  NATURAL_FLOW = 'natural_flow',
  MANUAL = 'manual'
}

export enum TransitionQuality {
  SMOOTH = 'smooth',
  ACCEPTABLE = 'acceptable',
  ABRUPT = 'abrupt',
  POOR = 'poor'
}

export enum HighlightType {
  EXACT_MATCH = 'exact_match',
  PARTIAL_MATCH = 'partial_match',
  SEMANTIC_MATCH = 'semantic_match'
}

export enum ExportFormat {
  PDF = 'pdf',
  WORD = 'word',
  HTML = 'html',
  TXT = 'txt',
  JSON = 'json',
  CSV = 'csv'
}

export enum FontSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  X_LARGE = 'x_large'
}

export enum ViewerTheme {
  LIGHT = 'light',
  DARK = 'dark',
  HIGH_CONTRAST = 'high_contrast'
}

export enum ViewerLayout {
  SINGLE_COLUMN = 'single_column',
  TWO_COLUMN = 'two_column',
  THREADED = 'threaded'
}

export enum FilterType {
  SPEAKER = 'speaker',
  PHASE = 'phase',
  MESSAGE_TYPE = 'message_type',
  SENTIMENT = 'sentiment',
  QUALITY = 'quality',
  TOPIC = 'topic',
  TIME_RANGE = 'time_range'
}

export enum EntityType {
  PERSON = 'person',
  ORGANIZATION = 'organization',
  TECHNOLOGY = 'technology',
  SKILL = 'skill',
  LOCATION = 'location',
  DATE = 'date',
  PROJECT = 'project'
}

export class TranscriptViewerService {
  private transcriptCache: Map<string, TranscriptViewerData> = new Map()
  private searchIndex: Map<string, SearchIndex> = new Map()
  private annotationStore: Map<string, TranscriptAnnotation[]> = new Map()

  // Main transcript loading and processing
  async loadTranscript(interviewId: string, options?: TranscriptLoadOptions): Promise<TranscriptViewerData> {
    // Check cache first
    const cached = this.transcriptCache.get(interviewId)
    if (cached && !options?.forceRefresh) {
      return cached
    }

    // Load interview session data
    const session = await this.getInterviewSession(interviewId)
    if (!session) {
      throw new Error(`Interview session ${interviewId} not found`)
    }

    // Load conversation messages
    const messages = await this.loadConversationMessages(interviewId)
    
    // Process transcript data
    const transcriptData: TranscriptViewerData = {
      interviewId,
      candidateName: session.candidateName,
      position: session.position,
      interviewDate: session.startTime,
      duration: session.actualDuration || 0,
      phases: await this.processPhaseTranscripts(session, messages),
      messages: await this.processTranscriptMessages(messages),
      analytics: await this.generateTranscriptAnalytics(messages, session),
      annotations: await this.loadAnnotations(interviewId),
      highlights: await this.generateHighlights(messages),
      searchResults: [],
      exportOptions: this.getExportOptions(),
      viewerSettings: this.getDefaultViewerSettings()
    }

    // Cache the result
    this.transcriptCache.set(interviewId, transcriptData)
    
    // Build search index
    await this.buildSearchIndex(interviewId, transcriptData)

    return transcriptData
  }

  private async processPhaseTranscripts(session: InterviewSession, messages: ContextualMessage[]): Promise<PhaseTranscript[]> {
    const phases: PhaseTranscript[] = []
    
    session.phaseHistory.forEach((transition, index) => {
      const phaseMessages = messages.filter(m => 
        m.metadata?.phase === transition.toPhase
      )
      
      const nextTransition = session.phaseHistory[index + 1]
      const endTime = nextTransition ? nextTransition.timestamp : session.endTime || new Date()
      
      phases.push({
        phase: transition.toPhase,
        startTime: transition.timestamp,
        endTime,
        duration: endTime.getTime() - transition.timestamp.getTime(),
        messageCount: phaseMessages.length,
        keyTopics: this.extractKeyTopics(phaseMessages),
        quality: this.assessPhaseQuality(phaseMessages),
        summary: this.generatePhaseSummary(transition.toPhase, phaseMessages),
        objectives: this.getPhaseObjectives(transition.toPhase, phaseMessages),
        transitions: index < session.phaseHistory.length - 1 ? [session.phaseHistory[index + 1]] : []
      })
    })

    return phases
  }

  private async processTranscriptMessages(messages: ContextualMessage[]): Promise<TranscriptMessage[]> {
    return messages.map((message, index) => ({
      id: message.id || `msg_${index}`,
      messageIndex: index,
      timestamp: message.timestamp,
      speaker: message.role === 'user' ? MessageSpeaker.CANDIDATE : MessageSpeaker.INTERVIEWER,
      content: message.content,
      phase: message.metadata?.phase || InterviewPhase.INTRODUCTION,
      messageType: this.determineMessageType(message),
      metadata: this.processMessageMetadata(message),
      annotations: [],
      sentiment: this.processSentimentData(message),
      topics: this.extractTopicTags(message),
      questionCategory: this.determineQuestionCategory(message),
      responseQuality: this.assessResponseQuality(message),
      technicalContent: this.extractTechnicalContent(message),
      flags: this.identifyMessageFlags(message)
    }))
  }

  private async generateTranscriptAnalytics(messages: ContextualMessage[], session: InterviewSession): Promise<TranscriptAnalytics> {
    const candidateMessages = messages.filter(m => m.role === 'user')
    const interviewerMessages = messages.filter(m => m.role === 'assistant')
    
    return {
      overallMetrics: {
        totalMessages: messages.length,
        totalWords: messages.reduce((sum, m) => sum + m.content.split(' ').length, 0),
        averageResponseTime: this.calculateAverageResponseTime(messages),
        topicTransitions: this.countTopicTransitions(messages),
        questionsAsked: interviewerMessages.filter(m => m.content.includes('?')).length,
        questionsAnswered: candidateMessages.length,
        clarificationRequests: this.countClarificationRequests(messages),
        followUpQuestions: this.countFollowUpQuestions(messages)
      },
      speakingTime: this.analyzeSpeakingTime(messages),
      topicCoverage: this.analyzeTopicCoverage(messages),
      questionAnalysis: this.analyzeQuestions(interviewerMessages),
      responseAnalysis: this.analyzeResponses(candidateMessages),
      sentimentFlow: this.analyzeSentimentFlow(messages),
      engagementMetrics: this.analyzeEngagement(messages),
      qualityMetrics: this.analyzeQuality(messages),
      technicalAssessment: this.analyzeTechnicalContent(candidateMessages),
      communicationAssessment: this.analyzeCommunication(candidateMessages)
    }
  }

  // Analytics implementation methods
  private analyzeSpeakingTime(messages: ContextualMessage[]): SpeakingTimeAnalysis {
    const candidateMessages = messages.filter(m => m.role === 'user')
    const interviewerMessages = messages.filter(m => m.role === 'assistant')
    
    const candidateWords = candidateMessages.reduce((sum, m) => sum + m.content.split(' ').length, 0)
    const interviewerWords = interviewerMessages.reduce((sum, m) => sum + m.content.split(' ').length, 0)
    const totalWords = candidateWords + interviewerWords
    
    // Estimate speaking time (assuming 150 words per minute)
    const candidateTotalTime = (candidateWords / 150) * 60 * 1000 // milliseconds
    const interviewerTotalTime = (interviewerWords / 150) * 60 * 1000
    const totalTime = candidateTotalTime + interviewerTotalTime
    
    const responses = candidateMessages.map(m => ({
      messageId: m.id || '',
      speaker: MessageSpeaker.CANDIDATE,
      duration: (m.content.split(' ').length / 150) * 60 * 1000,
      wordCount: m.content.split(' ').length,
      phase: m.metadata?.phase || InterviewPhase.INTRODUCTION
    }))
    
    return {
      candidatePercentage: totalTime > 0 ? (candidateTotalTime / totalTime) * 100 : 0,
      interviewerPercentage: totalTime > 0 ? (interviewerTotalTime / totalTime) * 100 : 0,
      candidateTotalTime,
      interviewerTotalTime,
      averageResponseLength: candidateMessages.length > 0 ? candidateWords / candidateMessages.length : 0,
      longestResponse: responses.reduce((max, r) => r.wordCount > max.wordCount ? r : max, responses[0] || {
        messageId: '',
        speaker: MessageSpeaker.CANDIDATE,
        duration: 0,
        wordCount: 0,
        phase: InterviewPhase.INTRODUCTION
      }),
      shortestResponse: responses.reduce((min, r) => r.wordCount < min.wordCount ? r : min, responses[0] || {
        messageId: '',
        speaker: MessageSpeaker.CANDIDATE,
        duration: 0,
        wordCount: 0,
        phase: InterviewPhase.INTRODUCTION
      }),
      responseDistribution: this.calculateResponseDistribution(responses)
    }
  }

  private calculateResponseDistribution(responses: ResponseLength[]): ResponseDistribution[] {
    const ranges = [
      { range: '0-25 words', min: 0, max: 25 },
      { range: '26-50 words', min: 26, max: 50 },
      { range: '51-100 words', min: 51, max: 100 },
      { range: '101-200 words', min: 101, max: 200 },
      { range: '200+ words', min: 201, max: Infinity }
    ]
    
    const total = responses.length
    
    return ranges.map(range => {
      const count = responses.filter(r => r.wordCount >= range.min && r.wordCount <= range.max).length
      return {
        range: range.range,
        count,
        percentage: total > 0 ? (count / total) * 100 : 0
      }
    })
  }

  private analyzeTopicCoverage(messages: ContextualMessage[]): TopicCoverage[] {
    const topics = new Map<string, {
      relevance: number
      timeSpent: number
      messageCount: number
      phases: Set<InterviewPhase>
      insights: string[]
    }>()
    
    messages.forEach(message => {
      const messageTopics = this.extractTopics(message.content)
      const phase = message.metadata?.phase || InterviewPhase.INTRODUCTION
      
      messageTopics.forEach(topic => {
        if (!topics.has(topic)) {
          topics.set(topic, {
            relevance: 0,
            timeSpent: 0,
            messageCount: 0,
            phases: new Set(),
            insights: []
          })
        }
        
        const topicData = topics.get(topic)!
        topicData.relevance += 0.1 // Increment relevance
        topicData.messageCount++
        topicData.phases.add(phase)
        topicData.timeSpent += this.estimateMessageDuration(message)
      })
    })
    
    return Array.from(topics.entries()).map(([topic, data]) => ({
      topic,
      relevance: Math.min(data.relevance, 1.0),
      depth: this.assessTopicDepth(data.messageCount, data.timeSpent),
      timeSpent: data.timeSpent,
      messageCount: data.messageCount,
      phase: Array.from(data.phases)[0], // Primary phase
      keyInsights: data.insights,
      completeness: this.assessTopicCompleteness(topic, data.messageCount)
    }))
  }

  private analyzeQuestions(interviewerMessages: ContextualMessage[]): QuestionAnalysis {
    const questions = interviewerMessages.filter(m => m.content.includes('?'))
    
    const questionTypes = new Map<QuestionCategory, number>()
    let followUpCount = 0
    let clarificationCount = 0
    
    questions.forEach(question => {
      const category = this.categorizeQuestion(question.content)
      questionTypes.set(category, (questionTypes.get(category) || 0) + 1)
      
      if (this.isFollowUpQuestion(question.content)) followUpCount++
      if (this.isClarificationQuestion(question.content)) clarificationCount++
    })
    
    const questionTypeBreakdown = Array.from(questionTypes.entries()).map(([type, count]) => ({
      type,
      count,
      percentage: questions.length > 0 ? (count / questions.length) * 100 : 0,
      averageQuality: this.assessQuestionQuality(type),
      effectiveness: this.assessQuestionEffectiveness(type)
    }))
    
    return {
      totalQuestions: questions.length,
      questionTypes: questionTypeBreakdown,
      difficultyProgression: this.analyzeDifficultyProgression(questions),
      followUpRate: questions.length > 0 ? (followUpCount / questions.length) * 100 : 0,
      clarificationRate: questions.length > 0 ? (clarificationCount / questions.length) * 100 : 0,
      questionQuality: {
        clarity: 0.8,
        relevance: 0.85,
        depth: 0.7,
        creativity: 0.6,
        appropriateness: 0.9
      }
    }
  }

  private analyzeResponses(candidateMessages: ContextualMessage[]): ResponseAnalysis {
    const qualities = candidateMessages.map(m => this.assessResponseQuality(m))
    const avgQuality = qualities.reduce((sum, q) => sum + (q?.overall || 0), 0) / qualities.length
    
    const patterns = this.identifyResponsePatterns(candidateMessages)
    
    return {
      averageQuality: avgQuality,
      completeness: qualities.reduce((sum, q) => sum + (q?.completeness || 0), 0) / qualities.length,
      technicalAccuracy: qualities.reduce((sum, q) => sum + (q?.technicalAccuracy || 0), 0) / qualities.length,
      clarity: qualities.reduce((sum, q) => sum + (q?.clarity || 0), 0) / qualities.length,
      depth: qualities.reduce((sum, q) => sum + (q?.depth || 0), 0) / qualities.length,
      responsePatterns: patterns,
      improvementAreas: this.identifyImprovementAreas(candidateMessages),
      strengths: this.identifyStrengths(candidateMessages)
    }
  }

  private analyzeSentimentFlow(messages: ContextualMessage[]): SentimentFlow[] {
    return messages
      .filter(m => m.sentiment)
      .map(m => ({
        timestamp: m.timestamp,
        phase: m.metadata?.phase || InterviewPhase.INTRODUCTION,
        sentiment: m.sentiment!.polarity,
        confidence: m.sentiment!.confidence,
        emotions: {
          enthusiasm: m.sentiment!.emotions.enthusiasm,
          nervousness: m.sentiment!.emotions.nervousness,
          confidence: m.sentiment!.emotions.confidence,
          frustration: m.sentiment!.emotions.frustration,
          engagement: 0.7 // Default engagement
        },
        context: this.extractSentimentContext(m)
      }))
  }

  // Search functionality
  async searchTranscript(interviewId: string, query: string, options?: SearchOptions): Promise<SearchResult[]> {
    const transcript = await this.loadTranscript(interviewId)
    const searchIndex = this.searchIndex.get(interviewId)
    
    if (!searchIndex) {
      throw new Error(`Search index not available for interview ${interviewId}`)
    }
    
    const results: SearchResult[] = []
    
    // Simple text search implementation
    transcript.messages.forEach(message => {
      const content = message.content.toLowerCase()
      const queryLower = query.toLowerCase()
      
      if (content.includes(queryLower)) {
        const index = content.indexOf(queryLower)
        const context = this.extractContext(message.content, index, 50)
        
        results.push({
          messageId: message.id,
          relevance: this.calculateRelevance(message.content, query),
          matchedText: query,
          context,
          highlights: [{
            start: index,
            end: index + query.length,
            type: HighlightType.EXACT_MATCH
          }]
        })
      }
    })
    
    return results.sort((a, b) => b.relevance - a.relevance)
  }

  // Annotation management
  async addAnnotation(interviewId: string, annotation: Omit<TranscriptAnnotation, 'id' | 'timestamp'>): Promise<TranscriptAnnotation> {
    const newAnnotation: TranscriptAnnotation = {
      ...annotation,
      id: `annotation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date()
    }
    
    if (!this.annotationStore.has(interviewId)) {
      this.annotationStore.set(interviewId, [])
    }
    
    this.annotationStore.get(interviewId)!.push(newAnnotation)
    
    // Update cached transcript
    const cached = this.transcriptCache.get(interviewId)
    if (cached) {
      cached.annotations.push(newAnnotation)
    }
    
    return newAnnotation
  }

  async updateAnnotation(interviewId: string, annotationId: string, updates: Partial<TranscriptAnnotation>): Promise<void> {
    const annotations = this.annotationStore.get(interviewId) || []
    const index = annotations.findIndex(a => a.id === annotationId)
    
    if (index > -1) {
      annotations[index] = { ...annotations[index], ...updates }
      
      // Update cached transcript
      const cached = this.transcriptCache.get(interviewId)
      if (cached) {
        const cachedIndex = cached.annotations.findIndex(a => a.id === annotationId)
        if (cachedIndex > -1) {
          cached.annotations[cachedIndex] = annotations[index]
        }
      }
    }
  }

  async deleteAnnotation(interviewId: string, annotationId: string): Promise<void> {
    const annotations = this.annotationStore.get(interviewId) || []
    const index = annotations.findIndex(a => a.id === annotationId)
    
    if (index > -1) {
      annotations.splice(index, 1)
      
      // Update cached transcript
      const cached = this.transcriptCache.get(interviewId)
      if (cached) {
        const cachedIndex = cached.annotations.findIndex(a => a.id === annotationId)
        if (cachedIndex > -1) {
          cached.annotations.splice(cachedIndex, 1)
        }
      }
    }
  }

  // Export functionality
  async exportTranscript(interviewId: string, format: ExportFormat, options?: ExportOptions): Promise<ExportResult> {
    const transcript = await this.loadTranscript(interviewId)
    
    switch (format) {
      case ExportFormat.PDF:
        return this.exportToPDF(transcript, options)
      case ExportFormat.WORD:
        return this.exportToWord(transcript, options)
      case ExportFormat.HTML:
        return this.exportToHTML(transcript, options)
      case ExportFormat.TXT:
        return this.exportToText(transcript, options)
      case ExportFormat.JSON:
        return this.exportToJSON(transcript, options)
      case ExportFormat.CSV:
        return this.exportToCSV(transcript, options)
      default:
        throw new Error(`Unsupported export format: ${format}`)
    }
  }

  // Helper methods
  private extractKeyTopics(messages: ContextualMessage[]): string[] {
    const topics = new Set<string>()
    
    messages.forEach(message => {
      const messageTopics = this.extractTopics(message.content)
      messageTopics.forEach(topic => topics.add(topic))
    })
    
    return Array.from(topics).slice(0, 5) // Top 5 topics
  }

  private extractTopics(content: string): string[] {
    // Simple topic extraction - in practice, this would use NLP
    const keywords = ['javascript', 'react', 'node', 'python', 'sql', 'aws', 'docker', 'microservices', 'api', 'database']
    const contentLower = content.toLowerCase()
    
    return keywords.filter(keyword => contentLower.includes(keyword))
  }

  private assessPhaseQuality(messages: ContextualMessage[]): PhaseQuality {
    return {
      overall: 0.8,
      objectiveCompletion: 0.75,
      questionQuality: 0.85,
      responseQuality: 0.8,
      engagement: 0.85
    }
  }

  private generatePhaseSummary(phase: InterviewPhase, messages: ContextualMessage[]): string {
    const summaries = {
      [InterviewPhase.INTRODUCTION]: 'Initial rapport building and background discussion',
      [InterviewPhase.BACKGROUND]: 'Exploration of work experience and educational background',
      [InterviewPhase.TECHNICAL]: 'Technical skills assessment and problem-solving evaluation',
      [InterviewPhase.BEHAVIORAL]: 'Behavioral questions and situational assessments',
      [InterviewPhase.CONCLUSION]: 'Interview wrap-up and next steps discussion'
    }
    
    return summaries[phase] || 'Phase discussion and evaluation'
  }

  private getPhaseObjectives(phase: InterviewPhase, messages: ContextualMessage[]): PhaseObjective[] {
    // Mock objectives - in practice, these would be configurable
    const objectives = [
      {
        objective: 'Assess technical competency',
        completed: true,
        completionTime: new Date(),
        quality: 0.85,
        evidence: ['Technical questions answered', 'Problem-solving demonstrated']
      }
    ]
    
    return objectives
  }

  private determineMessageType(message: ContextualMessage): MessageType {
    if (message.content.includes('?')) return MessageType.QUESTION
    if (message.role === 'user') return MessageType.ANSWER
    if (message.content.toLowerCase().includes('clarify') || message.content.toLowerCase().includes('explain')) {
      return MessageType.CLARIFICATION
    }
    return MessageType.ANSWER
  }

  private processMessageMetadata(message: ContextualMessage): MessageMetadata {
    const wordCount = message.content.split(' ').length
    const sentenceCount = message.content.split(/[.!?]+/).filter(s => s.trim()).length
    
    return {
      wordCount,
      sentenceCount,
      complexity: this.assessComplexity(message.content),
      confidence: 0.8,
      relevance: 0.85,
      clarity: 0.8,
      engagement: 0.75,
      entities: this.extractEntities(message.content)
    }
  }

  private assessComplexity(content: string): ComplexityLevel {
    const wordCount = content.split(' ').length
    const avgWordLength = content.split(' ').reduce((sum, word) => sum + word.length, 0) / wordCount
    const sentenceCount = content.split(/[.!?]+/).filter(s => s.trim()).length
    const avgSentenceLength = wordCount / sentenceCount
    
    if (avgWordLength > 6 && avgSentenceLength > 20) return ComplexityLevel.VERY_COMPLEX
    if (avgWordLength > 5 && avgSentenceLength > 15) return ComplexityLevel.COMPLEX
    if (avgWordLength > 4 && avgSentenceLength > 10) return ComplexityLevel.MODERATE
    return ComplexityLevel.SIMPLE
  }

  private extractEntities(content: string): EntityMention[] {
    // Simple entity extraction - in practice, this would use NLP
    const entities: EntityMention[] = []
    
    // Extract technology mentions
    const techTerms = ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'AWS', 'Docker']
    techTerms.forEach(term => {
      const index = content.indexOf(term)
      if (index > -1) {
        entities.push({
          entity: term,
          type: EntityType.TECHNOLOGY,
          confidence: 0.9,
          startPosition: index,
          endPosition: index + term.length
        })
      }
    })
    
    return entities
  }

  // Additional helper methods would be implemented here...
  
  private async getInterviewSession(interviewId: string): Promise<InterviewSession | null> {
    // Mock implementation - would fetch from interview tracking service
    return null
  }

  private async loadConversationMessages(interviewId: string): Promise<ContextualMessage[]> {
    // Mock implementation - would fetch from conversation service
    return []
  }

  private async loadAnnotations(interviewId: string): Promise<TranscriptAnnotation[]> {
    return this.annotationStore.get(interviewId) || []
  }

  private async generateHighlights(messages: ContextualMessage[]): Promise<TranscriptHighlight[]> {
    // Auto-generate highlights based on content analysis
    return []
  }

  private getExportOptions(): ExportOption[] {
    return [
      {
        format: ExportFormat.PDF,
        name: 'PDF Report',
        description: 'Complete interview transcript with analytics',
        includeAnnotations: true,
        includeAnalytics: true,
        customizable: true,
        fileSize: '~500KB'
      },
      {
        format: ExportFormat.WORD,
        name: 'Word Document',
        description: 'Editable transcript document',
        includeAnnotations: true,
        includeAnalytics: false,
        customizable: true,
        fileSize: '~200KB'
      },
      {
        format: ExportFormat.HTML,
        name: 'Web Page',
        description: 'Interactive HTML transcript',
        includeAnnotations: true,
        includeAnalytics: true,
        customizable: false,
        fileSize: '~300KB'
      }
    ]
  }

  private getDefaultViewerSettings(): ViewerSettings {
    return {
      showTimestamps: true,
      showAnnotations: true,
      showSentiment: false,
      showQuality: false,
      highlightKeywords: true,
      autoScroll: false,
      fontSize: FontSize.MEDIUM,
      theme: ViewerTheme.LIGHT,
      layout: ViewerLayout.SINGLE_COLUMN,
      filterOptions: []
    }
  }

  // Mock implementations for remaining helper methods
  private estimateMessageDuration(message: ContextualMessage): number {
    return (message.content.split(' ').length / 150) * 60 * 1000 // 150 WPM
  }

  private assessTopicDepth(messageCount: number, timeSpent: number): TopicDepth {
    if (messageCount > 5 && timeSpent > 300000) return TopicDepth.DEEP
    if (messageCount > 3 && timeSpent > 120000) return TopicDepth.MODERATE
    return TopicDepth.SURFACE
  }

  private assessTopicCompleteness(topic: string, messageCount: number): number {
    // Mock implementation
    return Math.min(messageCount / 5, 1.0)
  }

  // Additional mock implementations would continue here...
}

// Supporting interfaces
interface TranscriptLoadOptions {
  forceRefresh?: boolean
  includeAnalytics?: boolean
  includeAnnotations?: boolean
}

interface SearchOptions {
  caseSensitive?: boolean
  wholeWords?: boolean
  regex?: boolean
  phase?: InterviewPhase
  speaker?: MessageSpeaker
}

interface ExportOptions {
  includeAnnotations?: boolean
  includeAnalytics?: boolean
  includeTimestamps?: boolean
  template?: string
}

interface ExportResult {
  format: ExportFormat
  content: string | Buffer
  filename: string
  size: number
  metadata: ExportMetadata
}

interface ExportMetadata {
  generatedAt: Date
  interviewId: string
  candidateName: string
  pageCount?: number
  wordCount?: number
}

interface SearchIndex {
  words: Map<string, number[]>
  topics: Map<string, number[]>
  entities: Map<string, number[]>
}

// Singleton instance
export const transcriptViewerService = new TranscriptViewerService()