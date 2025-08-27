// Phase 5: Recruiter Dashboard & Management Integration Layer
// This file provides a unified interface for all dashboard functionality

export {
  // Candidate Management
  candidateManagementService,
  CandidateListItem,
  CandidateFilter,
  CandidateSortOptions,
  CandidateListResponse,
  InterviewStatus,
  CandidatePriority,
  CandidateSource,
  ExperienceLevel,
  SortField,
  SortDirection,
  UpdateType,
  BulkActionType,
  BulkAction,
  BulkActionResult
} from './candidateManagement'

export {
  // Interview Tracking
  interviewTrackingService,
  InterviewSession,
  InterviewProgress,
  PhaseTransition,
  RealTimeMetrics,
  QualityIndicators,
  TechnicalMetrics,
  InterviewFlag,
  InterviewNote,
  InterviewArtifact,
  InterviewStatusUpdate,
  InterviewStatusSummary,
  InterviewDashboardData,
  DashboardMetrics,
  DashboardAlert,
  TrendsData,
  InterviewType,
  TransitionReason,
  TransitionQuality,
  PaceIndicator,
  FlagType,
  FlagSeverity,
  NoteType,
  ArtifactType,
  AlertType,
  AlertSeverity,
  TimeframePeriod
} from './interviewTracking'

export {
  // Score Visualization
  scoreVisualizationService,
  ScoreVisualizationData,
  CategoryScore,
  SkillBreakdown,
  ComparisonMetric,
  ProgressionPoint,
  ScoreInsight,
  ScoreRecommendation,
  ConfidenceMetric,
  BenchmarkData,
  ScoreDistributionData,
  HeatmapData,
  RadarChartData,
  ScoreCategory,
  ProficiencyLevel,
  AssessmentMethod,
  EvidenceType,
  EvidenceStrength,
  VisualizationType,
  TrendDirection,
  InsightType,
  InsightSeverity,
  RecommendationType,
  ImpactLevel,
  EffortLevel
} from './scoreVisualization'

export {
  // Transcript Viewer
  transcriptViewerService,
  TranscriptViewerData,
  PhaseTranscript,
  TranscriptMessage,
  TranscriptAnalytics,
  TranscriptAnnotation,
  TranscriptHighlight,
  MessageSpeaker,
  MessageType,
  QuestionCategory,
  ComplexityLevel,
  TopicDepth,
  AnnotationType,
  AnnotationCategory,
  HighlightCategory,
  ExportFormat,
  ViewerSettings,
  ViewerTheme,
  ViewerLayout,
  FilterType
} from './transcriptViewer'

export {
  // Candidate Comparison
  candidateComparisonService,
  CandidateComparisonData,
  ComparisonCandidate,
  ComparisonMetric,
  ScoringBreakdown,
  SkillsComparison,
  ExperienceComparison,
  CommunicationComparison,
  CulturalFitComparison,
  CandidateRanking,
  ComparisonRecommendation,
  ComparisonInsight,
  ComparisonVisualization,
  RelativeStrength,
  RiskType,
  RiskSeverity,
  MetricType,
  MetricImportance,
  StatisticalSignificance,
  GapSeverity,
  TrainingDifficulty,
  BusinessImpact
} from './candidateComparison'

export {
  // Rubric Editor
  rubricEditorService,
  InterviewRubric,
  RubricCategory,
  RubricCriterion,
  PerformanceLevel,
  QualityIndicator,
  RubricTemplate,
  RubricValidationResult,
  ValidationError,
  ValidationWarning,
  ValidationSuggestion,
  RubricAnalytics,
  RubricStatus,
  WeightingStrategy,
  CategoryScoringMethod,
  OverallScoringMethod,
  IndicatorType,
  MeasurementMethod,
  ValidationType,
  ValidationSeverity,
  TemplateCategory,
  CustomizationType
} from './rubricEditor'

// Integrated dashboard service
import { candidateManagementService, CandidateListItem, CandidateFilter, InterviewStatus } from './candidateManagement'
import { interviewTrackingService, InterviewSession, InterviewDashboardData } from './interviewTracking'
import { scoreVisualizationService, ScoreVisualizationData } from './scoreVisualization'
import { transcriptViewerService, TranscriptViewerData } from './transcriptViewer'
import { candidateComparisonService, CandidateComparisonData } from './candidateComparison'
import { rubricEditorService, InterviewRubric } from './rubricEditor'

export interface RecruiterDashboardData {
  overview: DashboardOverview
  candidateList: CandidateListItem[]
  activeInterviews: InterviewSession[]
  recentActivity: ActivityItem[]
  analytics: DashboardAnalytics
  notifications: Notification[]
  quickActions: QuickAction[]
  widgets: DashboardWidget[]
  preferences: DashboardPreferences
}

export interface DashboardOverview {
  totalCandidates: number
  activeInterviews: number
  completedToday: number
  averageScore: number
  topPerformer: TopPerformerInfo
  urgentItems: UrgentItem[]
  trendsSnapshot: TrendsSnapshot
  systemHealth: SystemHealth
}

export interface TopPerformerInfo {
  candidateId: string
  candidateName: string
  score: number
  position: string
  standoutAreas: string[]
}

export interface UrgentItem {
  id: string
  type: UrgentItemType
  title: string
  description: string
  priority: Priority
  dueDate?: Date
  actionRequired: string
  relatedId: string
}

export interface TrendsSnapshot {
  candidateVolume: TrendIndicator
  averageQuality: TrendIndicator
  completionRate: TrendIndicator
  timeToHire: TrendIndicator
}

export interface TrendIndicator {
  current: number
  previous: number
  change: number
  trend: TrendDirection
  periodLabel: string
}

export interface SystemHealth {
  overall: HealthStatus
  components: ComponentHealth[]
  lastCheck: Date
  issues: SystemIssue[]
}

export interface ComponentHealth {
  component: string
  status: HealthStatus
  responseTime: number
  errorRate: number
  lastError?: Date
}

export interface SystemIssue {
  id: string
  severity: IssueSeverity
  component: string
  description: string
  impact: string
  estimatedResolution?: Date
}

export interface ActivityItem {
  id: string
  type: ActivityType
  timestamp: Date
  actor: string
  target: string
  description: string
  metadata: any
  importance: ActivityImportance
}

export interface DashboardAnalytics {
  performanceMetrics: PerformanceMetrics
  candidateInsights: CandidateInsights
  interviewEffectiveness: InterviewEffectiveness
  recruiterProductivity: RecruiterProductivity
  qualityTrends: QualityTrends
  benchmarkComparisons: BenchmarkComparisons
}

export interface PerformanceMetrics {
  totalInterviewsCompleted: number
  averageInterviewDuration: number
  candidateExperienceScore: number
  interviewerSatisfactionScore: number
  systemUptime: number
  errorRate: number
}

export interface CandidateInsights {
  sourceEffectiveness: SourceEffectiveness[]
  skillDistribution: SkillDistribution[]
  experienceLevelBreakdown: ExperienceLevelBreakdown[]
  geographicDistribution: GeographicDistribution[]
  diversityMetrics: DiversityMetrics
}

export interface SourceEffectiveness {
  source: string
  candidateCount: number
  averageQuality: number
  hireRate: number
  timeToHire: number
  costPerHire: number
}

export interface SkillDistribution {
  skill: string
  candidateCount: number
  averageProficiency: number
  demandVsSupply: number
  marketValue: number
}

export interface ExperienceLevelBreakdown {
  level: string
  count: number
  percentage: number
  averageScore: number
  hireRate: number
}

export interface GeographicDistribution {
  region: string
  candidateCount: number
  averageScore: number
  timeZoneConsiderations: string[]
}

export interface DiversityMetrics {
  overallDiversityIndex: number
  representationByGroup: RepresentationData[]
  inclusionScore: number
  biasIndicators: BiasIndicator[]
  improvementAreas: string[]
}

export interface RepresentationData {
  group: string
  percentage: number
  target: number
  trend: TrendDirection
}

export interface BiasIndicator {
  type: string
  severity: string
  description: string
  affectedStages: string[]
  recommendedActions: string[]
}

export interface InterviewEffectiveness {
  overallEffectiveness: number
  phaseEffectiveness: PhaseEffectiveness[]
  questionEffectiveness: QuestionEffectiveness[]
  assessmentAccuracy: number
  predictiveValidity: number
  candidateFeedback: CandidateFeedback
}

export interface PhaseEffectiveness {
  phase: string
  duration: number
  effectivenessScore: number
  candidateEngagement: number
  informationGathered: number
  improvements: string[]
}

export interface QuestionEffectiveness {
  questionId: string
  questionText: string
  category: string
  effectivenessScore: number
  discriminationIndex: number
  candidateRating: number
  timeToAnswer: number
}

export interface CandidateFeedback {
  overallSatisfaction: number
  processClarity: number
  interviewer Professionalism: number
  technicalQuality: number
  fairnessPerception: number
  recommendationScore: number
}

export interface RecruiterProductivity {
  interviewsPerDay: number
  averagePreparationTime: number
  averageReviewTime: number
  decisionSpeed: number
  qualityConsistency: number
  toolUtilization: ToolUtilization[]
}

export interface ToolUtilization {
  tool: string
  usageFrequency: number
  efficiency: number
  userSatisfaction: number
  features Used: string[]
}

export interface QualityTrends {
  overallQualityTrend: TrendData[]
  categoryTrends: CategoryTrend[]
  seasonalPatterns: SeasonalPattern[]
  anomalies: QualityAnomaly[]
}

export interface TrendData {
  period: string
  value: number
  change: number
  significance: number
}

export interface CategoryTrend {
  category: string
  trend: TrendData[]
  drivers: string[]
  predictions: TrendPrediction[]
}

export interface SeasonalPattern {
  pattern: string
  strength: number
  description: string
  impact: string
}

export interface QualityAnomaly {
  date: Date
  description: string
  impact: string
  rootCause: string
  resolution: string
}

export interface TrendPrediction {
  timeframe: string
  predictedValue: number
  confidence: number
  factors: string[]
}

export interface BenchmarkComparisons {
  industryBenchmarks: IndustryBenchmark[]
  competitorComparisons: CompetitorComparison[]
  bestPractices: BestPractice[]
  improvementOpportunities: ImprovementOpportunity[]
}

export interface IndustryBenchmark {
  metric: string
  ourValue: number
  industryAverage: number
  topQuartile: number
  position: BenchmarkPosition
  trend: TrendDirection
}

export interface CompetitorComparison {
  competitor: string
  metric: string
  ourValue: number
  theirValue: number
  advantage: number
  confidenceLevel: number
}

export interface BestPractice {
  practice: string
  description: string
  impact: string
  implementationEffort: string
  timeline: string
  roi: number
}

export interface ImprovementOpportunity {
  area: string
  description: string
  potentialImpact: string
  requiredResources: string[]
  timeline: string
  priority: Priority
}

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: Date
  priority: Priority
  read: boolean
  actionable: boolean
  actions: NotificationAction[]
  expiresAt?: Date
  metadata: any
}

export interface NotificationAction {
  id: string
  label: string
  type: ActionType
  url?: string
  payload?: any
  destructive: boolean
}

export interface QuickAction {
  id: string
  title: string
  description: string
  icon: string
  category: QuickActionCategory
  url?: string
  action?: string
  parameters?: any
  permission Required: string[]
  frequency: ActionFrequency
}

export interface DashboardWidget {
  id: string
  type: WidgetType
  title: string
  description: string
  position: WidgetPosition
  size: WidgetSize
  configuration: WidgetConfiguration
  data: any
  refreshInterval: number
  lastUpdated: Date
  loading: boolean
  error?: string
}

export interface WidgetPosition {
  x: number
  y: number
  row: number
  column: number
}

export interface WidgetSize {
  width: number
  height: number
  minWidth?: number
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
}

export interface WidgetConfiguration {
  settings: { [key: string]: any }
  filters: { [key: string]: any }
  displayOptions: DisplayOptions
  refreshSettings: RefreshSettings
}

export interface DisplayOptions {
  showTitle: boolean
  showBorder: boolean
  theme: WidgetTheme
  colorScheme: string[]
  animations: boolean
}

export interface RefreshSettings {
  autoRefresh: boolean
  interval: number
  refreshOnFocus: boolean
  refreshOnDataChange: boolean
}

export interface DashboardPreferences {
  layout: LayoutPreferences
  notifications: NotificationPreferences
  appearance: AppearancePreferences
  functionality: FunctionalityPreferences
  privacy: PrivacyPreferences
}

export interface LayoutPreferences {
  defaultView: DashboardView
  widgetLayout: WidgetLayout[]
  sidebarCollapsed: boolean
  compactMode: boolean
  customSections: CustomSection[]
}

export interface WidgetLayout {
  widgetId: string
  position: WidgetPosition
  size: WidgetSize
  visible: boolean
  minimized: boolean
}

export interface CustomSection {
  id: string
  title: string
  widgets: string[]
  collapsed: boolean
  order: number
}

export interface NotificationPreferences {
  enableBrowserNotifications: boolean
  enableEmailNotifications: boolean
  enableMobileNotifications: boolean
  notificationTypes: NotificationTypeSettings[]
  quietHours: QuietHours
  digest Settings: DigestSettings
}

export interface NotificationTypeSettings {
  type: NotificationType
  enabled: boolean
  priority: Priority
  channels: NotificationChannel[]
}

export interface QuietHours {
  enabled: boolean
  startTime: string
  endTime: string
  timezone: string
  exceptions: string[]
}

export interface DigestSettings {
  enabled: boolean
  frequency: DigestFrequency
  time: string
  includeAnalytics: boolean
  includeRecommendations: boolean
}

export interface AppearancePreferences {
  theme: DashboardTheme
  colorScheme: ColorScheme
  fontSize: FontSize
  density: DisplayDensity
  language: string
  timezone: string
}

export interface FunctionalityPreferences {
  defaultFilters: { [key: string]: any }
  autoSave: boolean
  keyboardShortcuts: boolean
  advancedFeatures: boolean
  experimentalFeatures: boolean
  integrations: IntegrationSettings[]
}

export interface IntegrationSettings {
  service: string
  enabled: boolean
  configuration: { [key: string]: any }
  lastSync: Date
  syncFrequency: number
}

export interface PrivacyPreferences {
  dataRetention: DataRetentionSettings
  analyticsOptOut: boolean
  shareUsageData: boolean
  cookiePreferences: CookiePreferences
  accessControls: AccessControlSettings
}

export interface DataRetentionSettings {
  candidateData: number
  interviewData: number
  analyticsData: number
  logData: number
  automaticDeletion: boolean
}

export interface CookiePreferences {
  essential: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
}

export interface AccessControlSettings {
  twoFactorAuth: boolean
  sessionTimeout: number
  allowedIpRanges: string[]
  deviceTrust: boolean
}

// Enums
export enum UrgentItemType {
  INTERVIEW_SCHEDULED = 'interview_scheduled',
  CANDIDATE_FOLLOW_UP = 'candidate_follow_up',
  SYSTEM_ISSUE = 'system_issue',
  DEADLINE_APPROACHING = 'deadline_approaching',
  QUALITY_CONCERN = 'quality_concern',
  FEEDBACK_REQUIRED = 'feedback_required'
}

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
  CRITICAL = 'critical'
}

export enum TrendDirection {
  UP = 'up',
  DOWN = 'down',
  STABLE = 'stable',
  VOLATILE = 'volatile'
}

export enum HealthStatus {
  HEALTHY = 'healthy',
  WARNING = 'warning',
  CRITICAL = 'critical',
  DEGRADED = 'degraded',
  DOWN = 'down'
}

export enum IssueSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical'
}

export enum ActivityType {
  INTERVIEW_COMPLETED = 'interview_completed',
  CANDIDATE_UPDATED = 'candidate_updated',
  SCORE_UPDATED = 'score_updated',
  NOTE_ADDED = 'note_added',
  STATUS_CHANGED = 'status_changed',
  RUBRIC_UPDATED = 'rubric_updated',
  REPORT_GENERATED = 'report_generated'
}

export enum ActivityImportance {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export enum BenchmarkPosition {
  BOTTOM_QUARTILE = 'bottom_quartile',
  BELOW_AVERAGE = 'below_average',
  AVERAGE = 'average',
  ABOVE_AVERAGE = 'above_average',
  TOP_QUARTILE = 'top_quartile'
}

export enum NotificationType {
  INTERVIEW_REMINDER = 'interview_reminder',
  CANDIDATE_UPDATE = 'candidate_update',
  SYSTEM_ALERT = 'system_alert',
  QUALITY_ALERT = 'quality_alert',
  DEADLINE_REMINDER = 'deadline_reminder',
  PERFORMANCE_SUMMARY = 'performance_summary',
  RECOMMENDATION = 'recommendation'
}

export enum ActionType {
  NAVIGATE = 'navigate',
  API_CALL = 'api_call',
  MODAL = 'modal',
  DOWNLOAD = 'download',
  EXTERNAL_LINK = 'external_link'
}

export enum QuickActionCategory {
  INTERVIEWS = 'interviews',
  CANDIDATES = 'candidates',
  REPORTS = 'reports',
  SETTINGS = 'settings',
  ANALYTICS = 'analytics'
}

export enum ActionFrequency {
  ALWAYS_VISIBLE = 'always_visible',
  CONTEXTUAL = 'contextual',
  PROMOTED = 'promoted',
  HIDDEN = 'hidden'
}

export enum WidgetType {
  CHART = 'chart',
  TABLE = 'table',
  METRIC = 'metric',
  LIST = 'list',
  CALENDAR = 'calendar',
  MAP = 'map',
  FEED = 'feed',
  CUSTOM = 'custom'
}

export enum WidgetTheme {
  DEFAULT = 'default',
  MINIMAL = 'minimal',
  CARD = 'card',
  TRANSPARENT = 'transparent'
}

export enum DashboardView {
  OVERVIEW = 'overview',
  CANDIDATES = 'candidates',
  INTERVIEWS = 'interviews',
  ANALYTICS = 'analytics',
  REPORTS = 'reports'
}

export enum NotificationChannel {
  IN_APP = 'in_app',
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
  SLACK = 'slack'
}

export enum DigestFrequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly'
}

export enum DashboardTheme {
  LIGHT = 'light',
  DARK = 'dark',
  AUTO = 'auto',
  HIGH_CONTRAST = 'high_contrast'
}

export enum ColorScheme {
  BLUE = 'blue',
  GREEN = 'green',
  PURPLE = 'purple',
  RED = 'red',
  ORANGE = 'orange',
  CUSTOM = 'custom'
}

export enum FontSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  EXTRA_LARGE = 'extra_large'
}

export enum DisplayDensity {
  COMPACT = 'compact',
  COMFORTABLE = 'comfortable',
  SPACIOUS = 'spacious'
}

export class RecruiterDashboardService {
  private dashboardData: Map<string, RecruiterDashboardData> = new Map()
  private preferences: Map<string, DashboardPreferences> = new Map()
  private widgets: Map<string, DashboardWidget[]> = new Map()
  private notifications: Map<string, Notification[]> = new Map()

  // Main dashboard data aggregation
  async getDashboardData(recruiterId: string, filters?: any): Promise<RecruiterDashboardData> {
    // Check cache
    const cached = this.dashboardData.get(recruiterId)
    if (cached) {
      return this.refreshDashboardData(cached, filters)
    }

    // Generate fresh dashboard data
    const dashboardData = await this.generateDashboardData(recruiterId, filters)
    this.dashboardData.set(recruiterId, dashboardData)

    return dashboardData
  }

  private async generateDashboardData(recruiterId: string, filters?: any): Promise<RecruiterDashboardData> {
    // Aggregate data from all services
    const [
      candidateList,
      interviewDashboard,
      recentActivity,
      analytics,
      notifications,
      preferences
    ] = await Promise.all([
      this.getCandidateOverview(filters),
      this.getInterviewOverview(),
      this.getRecentActivity(recruiterId),
      this.generateAnalytics(recruiterId),
      this.getNotifications(recruiterId),
      this.getPreferences(recruiterId)
    ])

    const overview = await this.generateOverview(candidateList, interviewDashboard)
    const quickActions = this.generateQuickActions(recruiterId)
    const widgets = await this.getWidgets(recruiterId)

    return {
      overview,
      candidateList: candidateList.candidates,
      activeInterviews: interviewDashboard.activeSessions,
      recentActivity,
      analytics,
      notifications,
      quickActions,
      widgets,
      preferences
    }
  }

  private async getCandidateOverview(filters?: any) {
    return await candidateManagementService.getCandidateList(filters, undefined, 1, 50)
  }

  private async getInterviewOverview() {
    return await interviewTrackingService.getDashboardData()
  }

  private async generateOverview(candidateData: any, interviewData: any): Promise<DashboardOverview> {
    const topPerformer = candidateData.candidates.reduce((top: CandidateListItem, current: CandidateListItem) => 
      current.overallScore > (top?.overallScore || 0) ? current : top
    )

    return {
      totalCandidates: candidateData.totalCount,
      activeInterviews: interviewData.statusSummary.activeCount,
      completedToday: this.getCompletedToday(candidateData.candidates),
      averageScore: candidateData.aggregations.averageScore,
      topPerformer: {
        candidateId: topPerformer?.id || '',
        candidateName: topPerformer?.name || '',
        score: topPerformer?.overallScore || 0,
        position: topPerformer?.position || '',
        standoutAreas: this.identifyStandoutAreas(topPerformer)
      },
      urgentItems: await this.generateUrgentItems(),
      trendsSnapshot: await this.generateTrendsSnapshot(),
      systemHealth: await this.getSystemHealth()
    }
  }

  private getCompletedToday(candidates: CandidateListItem[]): number {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    return candidates.filter(c => 
      c.status === InterviewStatus.COMPLETED && 
      c.completionDate && 
      c.completionDate >= today
    ).length
  }

  private identifyStandoutAreas(candidate: CandidateListItem | undefined): string[] {
    if (!candidate) return []
    
    const areas: string[] = []
    
    if (candidate.profileSummary.technicalScore > 85) {
      areas.push('Technical Excellence')
    }
    if (candidate.profileSummary.communicationScore > 90) {
      areas.push('Outstanding Communication')
    }
    if (candidate.profileSummary.culturalFit > 0.85) {
      areas.push('Perfect Cultural Fit')
    }
    
    return areas
  }

  private async generateUrgentItems(): Promise<UrgentItem[]> {
    const urgentItems: UrgentItem[] = []
    
    // Mock urgent items - in practice, these would be generated from various data sources
    urgentItems.push({
      id: 'urgent_1',
      type: UrgentItemType.INTERVIEW_SCHEDULED,
      title: 'Interview Starting Soon',
      description: 'Interview with John Doe starts in 30 minutes',
      priority: Priority.HIGH,
      dueDate: new Date(Date.now() + 30 * 60 * 1000),
      actionRequired: 'Join interview room',
      relatedId: 'interview_123'
    })

    return urgentItems
  }

  private async generateTrendsSnapshot(): Promise<TrendsSnapshot> {
    return {
      candidateVolume: {
        current: 45,
        previous: 38,
        change: 18.4,
        trend: TrendDirection.UP,
        periodLabel: 'vs last week'
      },
      averageQuality: {
        current: 78.5,
        previous: 76.2,
        change: 3.0,
        trend: TrendDirection.UP,
        periodLabel: 'vs last month'
      },
      completionRate: {
        current: 94.2,
        previous: 91.8,
        change: 2.6,
        trend: TrendDirection.UP,
        periodLabel: 'vs last month'
      },
      timeToHire: {
        current: 12.5,
        previous: 14.2,
        change: -12.0,
        trend: TrendDirection.DOWN,
        periodLabel: 'days vs last quarter'
      }
    }
  }

  private async getSystemHealth(): Promise<SystemHealth> {
    return {
      overall: HealthStatus.HEALTHY,
      components: [
        {
          component: 'Interview Service',
          status: HealthStatus.HEALTHY,
          responseTime: 145,
          errorRate: 0.02,
        },
        {
          component: 'Candidate Management',
          status: HealthStatus.HEALTHY,
          responseTime: 89,
          errorRate: 0.01,
        },
        {
          component: 'Analytics Engine',
          status: HealthStatus.WARNING,
          responseTime: 267,
          errorRate: 0.05,
          lastError: new Date(Date.now() - 2 * 60 * 60 * 1000)
        }
      ],
      lastCheck: new Date(),
      issues: []
    }
  }

  private async getRecentActivity(recruiterId: string): Promise<ActivityItem[]> {
    // Mock recent activity - in practice, this would aggregate from activity logs
    return [
      {
        id: 'activity_1',
        type: ActivityType.INTERVIEW_COMPLETED,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        actor: 'AI Interviewer',
        target: 'Alice Johnson',
        description: 'Completed technical interview with score of 87',
        metadata: { candidateId: '1', score: 87 },
        importance: ActivityImportance.HIGH
      },
      {
        id: 'activity_2',
        type: ActivityType.CANDIDATE_UPDATED,
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        actor: recruiterId,
        target: 'Bob Smith',
        description: 'Updated candidate status to "Under Review"',
        metadata: { candidateId: '2', newStatus: 'under_review' },
        importance: ActivityImportance.MEDIUM
      }
    ]
  }

  private async generateAnalytics(recruiterId: string): Promise<DashboardAnalytics> {
    return {
      performanceMetrics: {
        totalInterviewsCompleted: 156,
        averageInterviewDuration: 42.5,
        candidateExperienceScore: 4.3,
        interviewerSatisfactionScore: 4.1,
        systemUptime: 99.8,
        errorRate: 0.02
      },
      candidateInsights: {
        sourceEffectiveness: [
          {
            source: 'LinkedIn',
            candidateCount: 45,
            averageQuality: 78.2,
            hireRate: 0.23,
            timeToHire: 12.5,
            costPerHire: 2500
          },
          {
            source: 'Job Boards',
            candidateCount: 67,
            averageQuality: 72.1,
            hireRate: 0.18,
            timeToHire: 15.2,
            costPerHire: 1800
          }
        ],
        skillDistribution: [
          {
            skill: 'JavaScript',
            candidateCount: 89,
            averageProficiency: 75.5,
            demandVsSupply: 1.4,
            marketValue: 8.2
          },
          {
            skill: 'React',
            candidateCount: 72,
            averageProficiency: 73.8,
            demandVsSupply: 1.6,
            marketValue: 7.9
          }
        ],
        experienceLevelBreakdown: [
          {
            level: 'Senior',
            count: 45,
            percentage: 35.4,
            averageScore: 82.1,
            hireRate: 0.28
          },
          {
            level: 'Mid-level',
            count: 58,
            percentage: 45.7,
            averageScore: 75.3,
            hireRate: 0.22
          }
        ],
        geographicDistribution: [
          {
            region: 'North America',
            candidateCount: 89,
            averageScore: 77.8,
            timeZoneConsiderations: ['EST', 'PST', 'CST']
          }
        ],
        diversityMetrics: {
          overallDiversityIndex: 0.72,
          representationByGroup: [
            {
              group: 'Gender',
              percentage: 45.2,
              target: 50,
              trend: TrendDirection.UP
            }
          ],
          inclusionScore: 0.78,
          biasIndicators: [],
          improvementAreas: ['Geographic diversity', 'Experience level balance']
        }
      },
      interviewEffectiveness: {
        overallEffectiveness: 0.82,
        phaseEffectiveness: [
          {
            phase: 'Technical',
            duration: 18.5,
            effectivenessScore: 0.87,
            candidateEngagement: 0.79,
            informationGathered: 0.85,
            improvements: ['Reduce repetitive questions', 'Add more practical exercises']
          }
        ],
        questionEffectiveness: [
          {
            questionId: 'tech_1',
            questionText: 'Explain the difference between let and var in JavaScript',
            category: 'Technical',
            effectivenessScore: 0.92,
            discriminationIndex: 0.68,
            candidateRating: 4.2,
            timeToAnswer: 125.5
          }
        ],
        assessmentAccuracy: 0.84,
        predictiveValidity: 0.76,
        candidateFeedback: {
          overallSatisfaction: 4.1,
          processClarity: 4.3,
          interviewerProfessionalism: 4.5,
          technicalQuality: 4.0,
          fairnessPerception: 4.2,
          recommendationScore: 8.1
        }
      },
      recruiterProductivity: {
        interviewsPerDay: 3.2,
        averagePreparationTime: 15.5,
        averageReviewTime: 22.3,
        decisionSpeed: 0.85,
        qualityConsistency: 0.78,
        toolUtilization: [
          {
            tool: 'Candidate Management',
            usageFrequency: 0.95,
            efficiency: 0.87,
            userSatisfaction: 4.2,
            featuresUsed: ['Search', 'Filtering', 'Notes', 'Scoring']
          }
        ]
      },
      qualityTrends: {
        overallQualityTrend: [
          {
            period: '2024-01',
            value: 75.2,
            change: 2.3,
            significance: 0.8
          },
          {
            period: '2024-02',
            value: 77.5,
            change: 3.1,
            significance: 0.9
          }
        ],
        categoryTrends: [
          {
            category: 'Technical Skills',
            trend: [
              {
                period: '2024-01',
                value: 76.8,
                change: 1.8,
                significance: 0.7
              }
            ],
            drivers: ['Improved question quality', 'Better candidate pool'],
            predictions: [
              {
                timeframe: 'Next Quarter',
                predictedValue: 79.2,
                confidence: 0.75,
                factors: ['Continued improvements', 'Market conditions']
              }
            ]
          }
        ],
        seasonalPatterns: [
          {
            pattern: 'Q1 High Performance',
            strength: 0.7,
            description: 'First quarter typically shows highest candidate quality',
            impact: 'Plan major hiring initiatives for Q1'
          }
        ],
        anomalies: []
      },
      benchmarkComparisons: {
        industryBenchmarks: [
          {
            metric: 'Time to Hire',
            ourValue: 12.5,
            industryAverage: 18.3,
            topQuartile: 10.2,
            position: BenchmarkPosition.ABOVE_AVERAGE,
            trend: TrendDirection.DOWN
          }
        ],
        competitorComparisons: [
          {
            competitor: 'TechCorp',
            metric: 'Candidate Experience',
            ourValue: 4.3,
            theirValue: 3.9,
            advantage: 0.4,
            confidenceLevel: 0.82
          }
        ],
        bestPractices: [
          {
            practice: 'AI-Powered Screening',
            description: 'Use AI to pre-screen candidates for better quality',
            impact: 'Improved candidate quality by 15%',
            implementationEffort: 'Medium',
            timeline: '2-3 months',
            roi: 2.4
          }
        ],
        improvementOpportunities: [
          {
            area: 'Interview Consistency',
            description: 'Standardize interview processes across all roles',
            potentialImpact: '12% improvement in hiring quality',
            requiredResources: ['Training', 'Process documentation'],
            timeline: '6 weeks',
            priority: Priority.HIGH
          }
        ]
      }
    }
  }

  private async getNotifications(recruiterId: string): Promise<Notification[]> {
    const existing = this.notifications.get(recruiterId) || []
    
    // Add any new notifications
    const newNotifications = this.generateNewNotifications(recruiterId)
    const allNotifications = [...existing, ...newNotifications]
    
    // Sort by timestamp and limit
    const sortedNotifications = allNotifications
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 50)
    
    this.notifications.set(recruiterId, sortedNotifications)
    return sortedNotifications
  }

  private generateNewNotifications(recruiterId: string): Notification[] {
    const notifications: Notification[] = []
    
    // Generate system notifications based on current state
    notifications.push({
      id: `notification_${Date.now()}`,
      type: NotificationType.PERFORMANCE_SUMMARY,
      title: 'Weekly Performance Summary',
      message: 'Your interview performance this week: 156 completed, 78.5 avg score',
      timestamp: new Date(),
      priority: Priority.MEDIUM,
      read: false,
      actionable: true,
      actions: [
        {
          id: 'view_report',
          label: 'View Full Report',
          type: ActionType.NAVIGATE,
          url: '/reports/weekly',
          destructive: false
        }
      ],
      metadata: { type: 'weekly_summary' }
    })

    return notifications
  }

  private generateQuickActions(recruiterId: string): QuickAction[] {
    return [
      {
        id: 'start_interview',
        title: 'Start New Interview',
        description: 'Begin a new candidate interview session',
        icon: 'play-circle',
        category: QuickActionCategory.INTERVIEWS,
        url: '/interviews/new',
        permissionRequired: ['interview:create'],
        frequency: ActionFrequency.ALWAYS_VISIBLE
      },
      {
        id: 'view_candidates',
        title: 'View All Candidates',
        description: 'Browse and manage candidate list',
        icon: 'users',
        category: QuickActionCategory.CANDIDATES,
        url: '/candidates',
        permissionRequired: ['candidates:read'],
        frequency: ActionFrequency.ALWAYS_VISIBLE
      },
      {
        id: 'generate_report',
        title: 'Generate Report',
        description: 'Create interview and hiring reports',
        icon: 'file-text',
        category: QuickActionCategory.REPORTS,
        action: 'generate_report',
        permissionRequired: ['reports:create'],
        frequency: ActionFrequency.CONTEXTUAL
      },
      {
        id: 'compare_candidates',
        title: 'Compare Candidates',
        description: 'Side-by-side candidate comparison',
        icon: 'git-compare',
        category: QuickActionCategory.CANDIDATES,
        url: '/candidates/compare',
        permissionRequired: ['candidates:compare'],
        frequency: ActionFrequency.PROMOTED
      }
    ]
  }

  private async getWidgets(recruiterId: string): Promise<DashboardWidget[]> {
    return this.widgets.get(recruiterId) || this.getDefaultWidgets()
  }

  private getDefaultWidgets(): DashboardWidget[] {
    return [
      {
        id: 'candidate_overview',
        type: WidgetType.METRIC,
        title: 'Candidate Overview',
        description: 'Key candidate metrics and statistics',
        position: { x: 0, y: 0, row: 1, column: 1 },
        size: { width: 4, height: 2 },
        configuration: {
          settings: { showTrends: true, period: '30d' },
          filters: {},
          displayOptions: {
            showTitle: true,
            showBorder: true,
            theme: WidgetTheme.CARD,
            colorScheme: ['#3B82F6', '#10B981', '#F59E0B'],
            animations: true
          },
          refreshSettings: {
            autoRefresh: true,
            interval: 300000, // 5 minutes
            refreshOnFocus: true,
            refreshOnDataChange: true
          }
        },
        data: null,
        refreshInterval: 300000,
        lastUpdated: new Date(),
        loading: false
      },
      {
        id: 'interview_queue',
        type: WidgetType.LIST,
        title: 'Interview Queue',
        description: 'Upcoming and ongoing interviews',
        position: { x: 4, y: 0, row: 1, column: 2 },
        size: { width: 4, height: 3 },
        configuration: {
          settings: { maxItems: 10, showStatus: true },
          filters: { status: ['scheduled', 'in_progress'] },
          displayOptions: {
            showTitle: true,
            showBorder: true,
            theme: WidgetTheme.DEFAULT,
            colorScheme: ['#EF4444', '#F59E0B', '#10B981'],
            animations: false
          },
          refreshSettings: {
            autoRefresh: true,
            interval: 60000, // 1 minute
            refreshOnFocus: true,
            refreshOnDataChange: true
          }
        },
        data: null,
        refreshInterval: 60000,
        lastUpdated: new Date(),
        loading: false
      },
      {
        id: 'performance_chart',
        type: WidgetType.CHART,
        title: 'Interview Performance',
        description: 'Performance trends over time',
        position: { x: 0, y: 2, row: 2, column: 1 },
        size: { width: 6, height: 3 },
        configuration: {
          settings: { chartType: 'line', timeframe: '7d' },
          filters: {},
          displayOptions: {
            showTitle: true,
            showBorder: true,
            theme: WidgetTheme.MINIMAL,
            colorScheme: ['#8B5CF6', '#06B6D4'],
            animations: true
          },
          refreshSettings: {
            autoRefresh: true,
            interval: 600000, // 10 minutes
            refreshOnFocus: false,
            refreshOnDataChange: true
          }
        },
        data: null,
        refreshInterval: 600000,
        lastUpdated: new Date(),
        loading: false
      }
    ]
  }

  private async getPreferences(recruiterId: string): Promise<DashboardPreferences> {
    return this.preferences.get(recruiterId) || this.getDefaultPreferences()
  }

  private getDefaultPreferences(): DashboardPreferences {
    return {
      layout: {
        defaultView: DashboardView.OVERVIEW,
        widgetLayout: [],
        sidebarCollapsed: false,
        compactMode: false,
        customSections: []
      },
      notifications: {
        enableBrowserNotifications: true,
        enableEmailNotifications: true,
        enableMobileNotifications: false,
        notificationTypes: [
          {
            type: NotificationType.INTERVIEW_REMINDER,
            enabled: true,
            priority: Priority.HIGH,
            channels: [NotificationChannel.IN_APP, NotificationChannel.EMAIL]
          }
        ],
        quietHours: {
          enabled: false,
          startTime: '18:00',
          endTime: '08:00',
          timezone: 'UTC',
          exceptions: []
        },
        digestSettings: {
          enabled: true,
          frequency: DigestFrequency.DAILY,
          time: '09:00',
          includeAnalytics: true,
          includeRecommendations: true
        }
      },
      appearance: {
        theme: DashboardTheme.LIGHT,
        colorScheme: ColorScheme.BLUE,
        fontSize: FontSize.MEDIUM,
        density: DisplayDensity.COMFORTABLE,
        language: 'en',
        timezone: 'UTC'
      },
      functionality: {
        defaultFilters: {},
        autoSave: true,
        keyboardShortcuts: true,
        advancedFeatures: false,
        experimentalFeatures: false,
        integrations: []
      },
      privacy: {
        dataRetention: {
          candidateData: 365,
          interviewData: 730,
          analyticsData: 1095,
          logData: 90,
          automaticDeletion: true
        },
        analyticsOptOut: false,
        shareUsageData: true,
        cookiePreferences: {
          essential: true,
          analytics: true,
          marketing: false,
          functional: true
        },
        accessControls: {
          twoFactorAuth: false,
          sessionTimeout: 480, // 8 hours
          allowedIpRanges: [],
          deviceTrust: false
        }
      }
    }
  }

  private async refreshDashboardData(cached: RecruiterDashboardData, filters?: any): Promise<RecruiterDashboardData> {
    // Refresh specific components based on age and importance
    const now = new Date()
    const refreshThreshold = 5 * 60 * 1000 // 5 minutes
    
    // Always refresh real-time data
    cached.activeInterviews = (await this.getInterviewOverview()).activeSessions
    
    // Conditionally refresh other data based on cache age
    // This is a simplified implementation - in practice, you'd track last update times
    
    return cached
  }

  // Notification management
  async markNotificationRead(recruiterId: string, notificationId: string): Promise<boolean> {
    const notifications = this.notifications.get(recruiterId) || []
    const notification = notifications.find(n => n.id === notificationId)
    
    if (notification) {
      notification.read = true
      return true
    }
    
    return false
  }

  async dismissNotification(recruiterId: string, notificationId: string): Promise<boolean> {
    const notifications = this.notifications.get(recruiterId) || []
    const index = notifications.findIndex(n => n.id === notificationId)
    
    if (index > -1) {
      notifications.splice(index, 1)
      this.notifications.set(recruiterId, notifications)
      return true
    }
    
    return false
  }

  // Widget management
  async updateWidgetConfiguration(recruiterId: string, widgetId: string, configuration: Partial<WidgetConfiguration>): Promise<boolean> {
    const widgets = this.widgets.get(recruiterId) || []
    const widget = widgets.find(w => w.id === widgetId)
    
    if (widget) {
      widget.configuration = { ...widget.configuration, ...configuration }
      widget.lastUpdated = new Date()
      return true
    }
    
    return false
  }

  async updateWidgetPosition(recruiterId: string, widgetId: string, position: WidgetPosition, size: WidgetSize): Promise<boolean> {
    const widgets = this.widgets.get(recruiterId) || []
    const widget = widgets.find(w => w.id === widgetId)
    
    if (widget) {
      widget.position = position
      widget.size = size
      widget.lastUpdated = new Date()
      return true
    }
    
    return false
  }

  // Preferences management
  async updatePreferences(recruiterId: string, preferences: Partial<DashboardPreferences>): Promise<DashboardPreferences> {
    const existing = this.preferences.get(recruiterId) || this.getDefaultPreferences()
    const updated = { ...existing, ...preferences }
    
    this.preferences.set(recruiterId, updated)
    return updated
  }

  // Search and filtering
  async searchDashboard(recruiterId: string, query: string): Promise<SearchResult[]> {
    const results: SearchResult[] = []
    
    // Search candidates
    const candidateResults = await candidateManagementService.searchCandidates(query)
    candidateResults.forEach(candidate => {
      results.push({
        type: 'candidate',
        id: candidate.id,
        title: candidate.name,
        description: `${candidate.position} - Score: ${candidate.overallScore}`,
        url: `/candidates/${candidate.id}`,
        relevance: 0.9
      })
    })
    
    // Search interviews
    // Implementation would search interview data
    
    return results.sort((a, b) => b.relevance - a.relevance)
  }

  // Export functionality
  async exportDashboardData(recruiterId: string, format: ExportFormat, options?: ExportOptions): Promise<ExportResult> {
    const dashboardData = await this.getDashboardData(recruiterId)
    
    switch (format) {
      case ExportFormat.PDF:
        return this.exportToPDF(dashboardData, options)
      case ExportFormat.EXCEL:
        return this.exportToExcel(dashboardData, options)
      case ExportFormat.CSV:
        return this.exportToCSV(dashboardData, options)
      default:
        throw new Error(`Unsupported export format: ${format}`)
    }
  }

  // Mock export implementations
  private async exportToPDF(data: RecruiterDashboardData, options?: ExportOptions): Promise<ExportResult> {
    return {
      format: ExportFormat.PDF,
      content: Buffer.from('PDF content'),
      filename: `dashboard_${new Date().toISOString().split('T')[0]}.pdf`,
      size: 1024000,
      metadata: {
        generatedAt: new Date(),
        dataPoints: data.candidateList.length,
        includesAnalytics: true
      }
    }
  }

  private async exportToExcel(data: RecruiterDashboardData, options?: ExportOptions): Promise<ExportResult> {
    return {
      format: ExportFormat.EXCEL,
      content: Buffer.from('Excel content'),
      filename: `dashboard_${new Date().toISOString().split('T')[0]}.xlsx`,
      size: 2048000,
      metadata: {
        generatedAt: new Date(),
        dataPoints: data.candidateList.length,
        includesAnalytics: true
      }
    }
  }

  private async exportToCSV(data: RecruiterDashboardData, options?: ExportOptions): Promise<ExportResult> {
    const csvContent = this.convertToCSV(data.candidateList)
    
    return {
      format: ExportFormat.CSV,
      content: csvContent,
      filename: `candidates_${new Date().toISOString().split('T')[0]}.csv`,
      size: csvContent.length,
      metadata: {
        generatedAt: new Date(),
        dataPoints: data.candidateList.length,
        includesAnalytics: false
      }
    }
  }

  private convertToCSV(candidates: CandidateListItem[]): string {
    const headers = ['Name', 'Position', 'Status', 'Score', 'Last Interaction']
    const rows = candidates.map(c => [
      c.name,
      c.position,
      c.status,
      c.overallScore.toString(),
      c.lastInteraction.toISOString()
    ])
    
    return [headers, ...rows].map(row => row.join(',')).join('\n')
  }
}

// Supporting interfaces
interface SearchResult {
  type: string
  id: string
  title: string
  description: string
  url: string
  relevance: number
}

interface ExportOptions {
  includeAnalytics?: boolean
  includePersonalData?: boolean
  dateRange?: { start: Date; end: Date }
  customFields?: string[]
}

interface ExportResult {
  format: ExportFormat
  content: string | Buffer
  filename: string
  size: number
  metadata: {
    generatedAt: Date
    dataPoints: number
    includesAnalytics: boolean
  }
}

// Singleton instance
export const recruiterDashboardService = new RecruiterDashboardService()

// Export the main dashboard service as default
export default RecruiterDashboardService