import { CandidateListItem } from '../dashboard/candidateManagement'
import { MLPrediction } from './mlScoring'
import { BiasDetectionResult } from './biasDetection'

export interface AdvancedAnalyticsDashboard {
  id: string
  timestamp: Date
  timeRange: DateRange
  performanceMetrics: InterviewPerformanceMetrics
  candidatePoolAnalysis: CandidatePoolAnalysis
  successRateTracking: SuccessRateTracking
  roiCalculations: ROICalculations
  predictiveInsights: PredictiveInsights
  qualityAssessment: QualityAssessment
  benchmarkComparisons: BenchmarkComparisons
  trendsAnalysis: TrendsAnalysis
  recommendations: AnalyticsRecommendation[]
}

export interface InterviewPerformanceMetrics {
  overallMetrics: OverallPerformanceMetrics
  phaseAnalysis: PhasePerformanceAnalysis[]
  questionEffectiveness: QuestionEffectivenessAnalysis
  interviewerPerformance: InterviewerPerformanceMetrics
  candidateExperience: CandidateExperienceMetrics
  qualityMetrics: QualityMetrics
  efficiencyMetrics: EfficiencyMetrics
}

export interface OverallPerformanceMetrics {
  totalInterviews: number
  completionRate: number
  averageDuration: number
  averageScore: number
  successRate: number
  improvementRate: number
  consistencyScore: number
  reliabilityIndex: number
}

export interface PhasePerformanceAnalysis {
  phase: string
  averageDuration: number
  completionRate: number
  effectivenessScore: number
  candidateEngagement: number
  informationYield: number
  improvementAreas: string[]
  bestPractices: string[]
}

export interface QuestionEffectivenessAnalysis {
  totalQuestions: number
  effectiveQuestions: number
  averageEffectiveness: number
  topPerformingQuestions: QuestionMetrics[]
  underperformingQuestions: QuestionMetrics[]
  recommendedImprovements: QuestionImprovement[]
}

export interface QuestionMetrics {
  questionId: string
  category: string
  effectivenessScore: number
  discriminationPower: number
  candidateRating: number
  averageResponseTime: number
  clarificationRate: number
  usageFrequency: number
}

export interface QuestionImprovement {
  questionId: string
  currentScore: number
  recommendedChanges: string[]
  expectedImprovement: number
  implementationEffort: string
}

export interface InterviewerPerformanceMetrics {
  totalInterviewers: number
  averagePerformance: number
  consistencyScore: number
  topPerformers: InterviewerMetrics[]
  improvementNeeded: InterviewerMetrics[]
  trainingRecommendations: TrainingRecommendation[]
}

export interface InterviewerMetrics {
  interviewerId: string
  interviewsCompleted: number
  averageScore: number
  candidateRating: number
  consistencyScore: number
  specializations: string[]
  improvementAreas: string[]
}

export interface TrainingRecommendation {
  area: string
  description: string
  targetGroup: string[]
  priority: Priority
  expectedImpact: number
  timeline: string
}

export interface CandidateExperienceMetrics {
  overallSatisfaction: number
  processClarity: number
  fairnessPerception: number
  technicalQuality: number
  recommendationScore: number
  feedbackCategories: FeedbackCategory[]
}

export interface FeedbackCategory {
  category: string
  averageRating: number
  responseCount: number
  improvements: string[]
  strengths: string[]
}

export interface CandidatePoolAnalysis {
  poolSize: number
  demographics: DemographicAnalysis
  skillDistribution: SkillDistributionAnalysis
  experienceAnalysis: ExperienceAnalysis
  geographicDistribution: GeographicAnalysis
  sourceAnalysis: SourceAnalysis
  qualityMetrics: PoolQualityMetrics
  diversityMetrics: DiversityMetrics
  trendsAnalysis: PoolTrendsAnalysis
}

export interface DemographicAnalysis {
  totalCandidates: number
  genderDistribution: { [gender: string]: number }
  ageDistribution: AgeDistribution
  educationLevels: { [level: string]: number }
  experienceLevels: { [level: string]: number }
  diversityIndex: number
  representationGaps: RepresentationGap[]
}

export interface AgeDistribution {
  ranges: AgeRange[]
  averageAge: number
  medianAge: number
  distribution: number[]
}

export interface AgeRange {
  range: string
  count: number
  percentage: number
}

export interface RepresentationGap {
  group: string
  currentRepresentation: number
  targetRepresentation: number
  gap: number
  priority: Priority
}

export interface SkillDistributionAnalysis {
  totalSkills: number
  skillCategories: SkillCategoryAnalysis[]
  skillGaps: SkillGap[]
  emergingSkills: EmergingSkill[]
  skillTrends: SkillTrend[]
  marketAlignment: MarketAlignment
}

export interface SkillCategoryAnalysis {
  category: string
  candidateCount: number
  averageProficiency: number
  demandLevel: number
  supplyLevel: number
  competitiveness: number
}

export interface SkillGap {
  skill: string
  demandLevel: number
  supplyLevel: number
  gapSeverity: number
  marketValue: number
  developmentDifficulty: number
}

export interface EmergingSkill {
  skill: string
  growthRate: number
  currentDemand: number
  projectedDemand: number
  learningTrend: number
}

export interface SkillTrend {
  skill: string
  direction: TrendDirection
  magnitude: number
  timeframe: string
  confidence: number
}

export interface MarketAlignment {
  overallAlignment: number
  alignmentByCategory: { [category: string]: number }
  misalignmentAreas: string[]
  opportunities: string[]
}

export interface ExperienceAnalysis {
  averageExperience: number
  experienceDistribution: ExperienceDistribution[]
  industryExperience: IndustryExperience[]
  roleProgression: RoleProgression[]
  stabilityMetrics: StabilityMetrics
}

export interface ExperienceDistribution {
  level: string
  count: number
  percentage: number
  averageScore: number
}

export interface IndustryExperience {
  industry: string
  candidateCount: number
  averageExperience: number
  averageScore: number
  growthTrend: TrendDirection
}

export interface RoleProgression {
  progressionPath: string
  frequency: number
  averageTimeframe: number
  successRate: number
}

export interface StabilityMetrics {
  averageTenure: number
  turnoverRate: number
  stabilityScore: number
  riskFactors: string[]
}

export interface GeographicAnalysis {
  regions: RegionAnalysis[]
  timeZones: TimeZoneAnalysis[]
  remotePreference: RemotePreference
  relocationWillingness: RelocationAnalysis
}

export interface RegionAnalysis {
  region: string
  candidateCount: number
  averageScore: number
  costOfLiving: number
  marketCompetitiveness: number
}

export interface TimeZoneAnalysis {
  timeZone: string
  candidateCount: number
  interviewAvailability: number
  scheduling Efficiency: number
}

export interface RemotePreference {
  remote: number
  hybrid: number
  onsite: number
  flexible: number
}

export interface RelocationAnalysis {
  willing: number
  unwilling: number
  conditional: number
  factors: RelocationFactor[]
}

export interface RelocationFactor {
  factor: string
  importance: number
  frequency: number
}

export interface SourceAnalysis {
  sources: SourceMetrics[]
  conversionRates: ConversionRate[]
  qualityBySource: SourceQuality[]
  costEffectiveness: CostEffectiveness[]
  recommendations: SourceRecommendation[]
}

export interface SourceMetrics {
  source: string
  candidateCount: number
  percentage: number
  averageScore: number
  conversionRate: number
  timeToHire: number
}

export interface ConversionRate {
  source: string
  applicationToInterview: number
  interviewToOffer: number
  offerToHire: number
  overallConversion: number
}

export interface SourceQuality {
  source: string
  qualityScore: number
  retentionRate: number
  performanceRating: number
  culturalFit: number
}

export interface CostEffectiveness {
  source: string
  costPerCandidate: number
  costPerHire: number
  roi: number
  efficiency: number
}

export interface SourceRecommendation {
  source: string
  recommendation: string
  rationale: string
  expectedImpact: number
  implementation: string
}

export interface SuccessRateTracking {
  overallMetrics: SuccessMetrics
  segmentedAnalysis: SegmentedSuccess[]
  timeSeriesAnalysis: TimeSeriesSuccess
  predictiveAnalysis: PredictiveSuccess
  factorAnalysis: SuccessFactorAnalysis
  benchmarkComparisons: SuccessBenchmarks
}

export interface SuccessMetrics {
  interviewSuccessRate: number
  hiringSuccessRate: number
  retentionRate: number
  performanceSuccessRate: number
  promotionRate: number
  overallSuccessIndex: number
}

export interface SegmentedSuccess {
  segment: string
  segmentType: SegmentType
  successRate: number
  sampleSize: number
  confidence: number
  factors: string[]
}

export interface TimeSeriesSuccess {
  timePoints: TimePoint[]
  trends: SuccessTrend[]
  seasonality: SeasonalPattern[]
  forecasts: SuccessForecast[]
}

export interface TimePoint {
  timestamp: Date
  successRate: number
  volume: number
  confidence: number
}

export interface SuccessTrend {
  metric: string
  direction: TrendDirection
  magnitude: number
  significance: number
  duration: string
}

export interface SeasonalPattern {
  pattern: string
  strength: number
  period: string
  peakTime: string
  impact: number
}

export interface SuccessForecast {
  timeframe: string
  predictedSuccessRate: number
  confidence: number
  factors: string[]
  assumptions: string[]
}

export interface PredictiveSuccess {
  model: string
  accuracy: number
  predictions: SuccessPrediction[]
  riskFactors: RiskFactor[]
  opportunities: Opportunity[]
}

export interface SuccessPrediction {
  candidateId: string
  predictedSuccess: number
  confidence: number
  factors: PredictiveFactor[]
  recommendations: string[]
}

export interface PredictiveFactor {
  factor: string
  importance: number
  direction: string
  confidence: number
}

export interface RiskFactor {
  factor: string
  riskLevel: number
  impact: number
  mitigation: string[]
}

export interface Opportunity {
  opportunity: string
  potential: number
  effort: number
  timeline: string
}

export interface SuccessFactorAnalysis {
  criticalFactors: CriticalFactor[]
  correlationAnalysis: CorrelationAnalysis[]
  impactAnalysis: ImpactAnalysis[]
  recommendations: FactorRecommendation[]
}

export interface CriticalFactor {
  factor: string
  importance: number
  correlation: number
  controllability: number
  improvability: number
}

export interface CorrelationAnalysis {
  factor1: string
  factor2: string
  correlation: number
  significance: number
  interpretation: string
}

export interface ImpactAnalysis {
  factor: string
  impact: number
  evidence: string[]
  confidence: number
  actionability: number
}

export interface FactorRecommendation {
  factor: string
  action: string
  expectedImpact: number
  difficulty: number
  priority: Priority
}

export interface SuccessBenchmarks {
  industry: IndustryBenchmark[]
  company Size: CompanySizeBenchmark[]
  role: RoleBenchmark[]
  geography: GeographyBenchmark[]
  timeComparisons: TimeBenchmark[]
}

export interface IndustryBenchmark {
  industry: string
  successRate: number
  percentile: number
  gap: number
  opportunity: number
}

export interface CompanySizeBenchmark {
  sizeCategory: string
  successRate: number
  comparison: number
  factors: string[]
}

export interface RoleBenchmark {
  role: string
  successRate: number
  industryComparison: number
  factors: string[]
}

export interface GeographyBenchmark {
  region: string
  successRate: number
  marketFactors: string[]
  challenges: string[]
}

export interface TimeBenchmark {
  period: string
  successRate: number
  change: number
  factors: string[]
}

export interface ROICalculations {
  overview: ROIOverview
  costAnalysis: CostAnalysis
  benefitAnalysis: BenefitAnalysis
  timeToValue: TimeToValueAnalysis
  scenarioAnalysis: ScenarioAnalysis
  benchmarkROI: BenchmarkROI
  projections: ROIProjections
}

export interface ROIOverview {
  totalROI: number
  paybackPeriod: number
  netPresentValue: number
  internalRateOfReturn: number
  costBenefitRatio: number
  riskAdjustedROI: number
}

export interface CostAnalysis {
  totalCosts: number
  categorizedCosts: CostCategory[]
  fixedCosts: number
  variableCosts: number
  hiddenCosts: HiddenCost[]
  costTrends: CostTrend[]
}

export interface CostCategory {
  category: string
  amount: number
  percentage: number
  trend: TrendDirection
  optimization: OptimizationOpportunity[]
}

export interface HiddenCost {
  cost: string
  amount: number
  impact: string
  visibility: number
}

export interface CostTrend {
  category: string
  direction: TrendDirection
  rate: number
  projection: number
}

export interface OptimizationOpportunity {
  opportunity: string
  potentialSavings: number
  effort: number
  risk: number
}

export interface BenefitAnalysis {
  totalBenefits: number
  categorizedBenefits: BenefitCategory[]
  tangibleBenefits: number
  intangibleBenefits: number
  riskReduction: RiskReduction[]
  benefitTrends: BenefitTrend[]
}

export interface BenefitCategory {
  category: string
  amount: number
  confidence: number
  timeline: string
  measurement: string
}

export interface RiskReduction {
  risk: string
  reduction: number
  value: number
  confidence: number
}

export interface BenefitTrend {
  benefit: string
  direction: TrendDirection
  rate: number
  sustainability: number
}

export interface TimeToValueAnalysis {
  firstValue: number
  breakEven: number
  fullValue: number
  valueAcceleration: ValueAcceleration[]
  milestones: ValueMilestone[]
}

export interface ValueAcceleration {
  action: string
  timeReduction: number
  valueIncrease: number
  effort: number
}

export interface ValueMilestone {
  milestone: string
  timeframe: number
  value: number
  probability: number
}

export interface ScenarioAnalysis {
  baseCase: ROIScenario
  optimisticCase: ROIScenario
  pessimisticCase: ROIScenario
  sensitivityAnalysis: SensitivityAnalysis[]
  riskAnalysis: ScenarioRisk[]
}

export interface ROIScenario {
  scenario: string
  probability: number
  roi: number
  assumptions: string[]
  factors: ScenarioFactor[]
}

export interface ScenarioFactor {
  factor: string
  impact: number
  uncertainty: number
  controllability: number
}

export interface SensitivityAnalysis {
  variable: string
  baseValue: number
  impact: SensitivityImpact[]
  criticality: number
}

export interface SensitivityImpact {
  change: number
  roiImpact: number
  significance: number
}

export interface ScenarioRisk {
  risk: string
  probability: number
  impact: number
  mitigation: string[]
}

export interface BenchmarkROI {
  industry: number
  companySize: number
  geography: number
  technology: number
  position: BenchmarkPosition
}

export interface ROIProjections {
  shortTerm: ProjectionPeriod
  mediumTerm: ProjectionPeriod
  longTerm: ProjectionPeriod
  assumptions: ProjectionAssumption[]
  risks: ProjectionRisk[]
}

export interface ProjectionPeriod {
  period: string
  roi: number
  confidence: number
  factors: string[]
}

export interface ProjectionAssumption {
  assumption: string
  confidence: number
  impact: number
  sensitivity: number
}

export interface ProjectionRisk {
  risk: string
  probability: number
  impact: number
  timeframe: string
}

export interface PredictiveInsights {
  modelPerformance: ModelPerformanceMetrics
  predictions: PredictionAnalysis[]
  riskAssessment: RiskAssessment
  opportunityIdentification: OpportunityIdentification
  recommendationEngine: RecommendationEngine
}

export interface ModelPerformanceMetrics {
  accuracy: number
  precision: number
  recall: number
  f1Score: number
  calibration: number
  stability: number
  drift: DriftMetrics
}

export interface DriftMetrics {
  detected: boolean
  severity: string
  trend: TrendDirection
  impact: number
  mitigation: string[]
}

export interface PredictionAnalysis {
  predictionType: string
  accuracy: number
  predictions: Prediction[]
  confidence: ConfidenceAnalysis
  validation: ValidationResults
}

export interface Prediction {
  target: string
  value: number
  confidence: number
  factors: string[]
  timeline: string
}

export interface ConfidenceAnalysis {
  overall: number
  byCategory: { [category: string]: number }
  factors: ConfidenceFactor[]
  limitations: string[]
}

export interface ConfidenceFactor {
  factor: string
  impact: number
  direction: string
}

export interface ValidationResults {
  method: string
  results: ValidationResult[]
  reliability: number
  recommendations: string[]
}

export interface ValidationResult {
  metric: string
  value: number
  threshold: number
  passed: boolean
}

export interface RiskAssessment {
  overallRisk: number
  riskCategories: RiskCategory[]
  mitigationStrategies: MitigationStrategy[]
  monitoring: RiskMonitoring
}

export interface RiskCategory {
  category: string
  riskLevel: number
  probability: number
  impact: number
  trends: RiskTrend[]
}

export interface RiskTrend {
  direction: TrendDirection
  magnitude: number
  timeframe: string
}

export interface MitigationStrategy {
  risk: string
  strategy: string
  effectiveness: number
  cost: number
  timeline: string
}

export interface RiskMonitoring {
  indicators: RiskIndicator[]
  thresholds: RiskThreshold[]
  alerts: RiskAlert[]
}

export interface RiskIndicator {
  indicator: string
  current: number
  target: number
  trend: TrendDirection
}

export interface RiskThreshold {
  indicator: string
  warning: number
  critical: number
  action: string
}

export interface RiskAlert {
  risk: string
  severity: string
  message: string
  action: string[]
}

export interface OpportunityIdentification {
  opportunities: OpportunityAnalysis[]
  prioritization: OpportunityPriority[]
  implementation: ImplementationPlan[]
  tracking: OpportunityTracking
}

export interface OpportunityAnalysis {
  opportunity: string
  potential: number
  probability: number
  effort: number
  timeline: string
  dependencies: string[]
}

export interface OpportunityPriority {
  opportunity: string
  score: number
  rationale: string
  quickWins: boolean
}

export interface ImplementationPlan {
  opportunity: string
  phases: ImplementationPhase[]
  resources: ResourceRequirement[]
  milestones: Milestone[]
  risks: string[]
}

export interface ImplementationPhase {
  phase: string
  duration: string
  activities: string[]
  deliverables: string[]
  success: string[]
}

export interface ResourceRequirement {
  resource: string
  quantity: number
  availability: string
  cost: number
}

export interface Milestone {
  name: string
  date: Date
  deliverable: string
  success: string[]
}

export interface OpportunityTracking {
  metrics: TrackingMetric[]
  progress: ProgressIndicator[]
  adjustments: Adjustment[]
}

export interface TrackingMetric {
  metric: string
  target: number
  current: number
  trend: TrendDirection
}

export interface ProgressIndicator {
  indicator: string
  progress: number
  onTrack: boolean
  risks: string[]
}

export interface Adjustment {
  reason: string
  change: string
  impact: number
  date: Date
}

export interface RecommendationEngine {
  recommendations: SmartRecommendation[]
  prioritization: RecommendationPriority[]
  implementation: RecommendationImplementation[]
  tracking: RecommendationTracking
}

export interface SmartRecommendation {
  id: string
  type: RecommendationType
  title: string
  description: string
  rationale: string
  impact: ImpactEstimate
  effort: EffortEstimate
  timeline: string
  dependencies: string[]
  risks: string[]
  success: string[]
}

export interface ImpactEstimate {
  category: string
  magnitude: number
  confidence: number
  timeframe: string
}

export interface EffortEstimate {
  category: string
  level: number
  resources: string[]
  timeline: string
}

export interface RecommendationPriority {
  recommendationId: string
  score: number
  factors: PriorityFactor[]
  ranking: number
}

export interface PriorityFactor {
  factor: string
  weight: number
  value: number
  rationale: string
}

export interface RecommendationImplementation {
  recommendationId: string
  plan: ImplementationStep[]
  resources: RequiredResource[]
  timeline: TimelineItem[]
  success: SuccessMetric[]
}

export interface ImplementationStep {
  step: string
  description: string
  duration: string
  dependencies: string[]
  deliverables: string[]
}

export interface RequiredResource {
  type: string
  description: string
  quantity: number
  cost: number
  availability: string
}

export interface TimelineItem {
  milestone: string
  date: Date
  deliverable: string
  responsible: string
}

export interface SuccessMetric {
  metric: string
  baseline: number
  target: number
  measurement: string
  frequency: string
}

export interface RecommendationTracking {
  status: TrackingStatus[]
  progress: ProgressTracking[]
  outcomes: OutcomeTracking[]
  learnings: LearningCapture[]
}

export interface TrackingStatus {
  recommendationId: string
  status: string
  progress: number
  issues: string[]
  nextSteps: string[]
}

export interface ProgressTracking {
  metric: string
  baseline: number
  current: number
  target: number
  trend: TrendDirection
}

export interface OutcomeTracking {
  outcome: string
  expected: number
  actual: number
  variance: number
  explanation: string
}

export interface LearningCapture {
  learning: string
  category: string
  impact: string
  application: string
}

// Additional interfaces for supporting types
export interface QualityMetrics {
  assessmentQuality: number
  dataQuality: number
  processQuality: number
  systemQuality: number
  overallQuality: number
}

export interface EfficiencyMetrics {
  timeEfficiency: number
  resourceEfficiency: number
  processEfficiency: number
  systemEfficiency: number
  overallEfficiency: number
}

export interface PoolQualityMetrics {
  averageScore: number
  scoreDistribution: ScoreDistribution
  qualityTrends: QualityTrend[]
  benchmarkComparison: number
}

export interface ScoreDistribution {
  ranges: ScoreRange[]
  percentiles: number[]
  outliers: OutlierInfo[]
}

export interface ScoreRange {
  min: number
  max: number
  count: number
  percentage: number
}

export interface OutlierInfo {
  candidateId: string
  score: number
  reason: string
  type: OutlierType
}

export interface QualityTrend {
  period: string
  quality: number
  change: number
  factors: string[]
}

export interface DiversityMetrics {
  overallDiversity: number
  intersectionalDiversity: number
  inclusionIndex: number
  representationMetrics: RepresentationMetric[]
  trends: DiversityTrend[]
}

export interface RepresentationMetric {
  group: string
  representation: number
  target: number
  gap: number
  trend: TrendDirection
}

export interface DiversityTrend {
  metric: string
  direction: TrendDirection
  rate: number
  significance: number
}

export interface PoolTrendsAnalysis {
  volumeTrends: VolumeTrend[]
  qualityTrends: QualityTrend[]
  diversityTrends: DiversityTrend[]
  skillTrends: SkillTrend[]
  predictions: TrendPrediction[]
}

export interface VolumeTrend {
  period: string
  volume: number
  change: number
  seasonality: SeasonalityInfo
}

export interface SeasonalityInfo {
  seasonal: boolean
  pattern: string
  strength: number
}

export interface TrendPrediction {
  metric: string
  prediction: number
  confidence: number
  timeframe: string
  factors: string[]
}

export interface QualityAssessment {
  dataQuality: DataQualityAssessment
  processQuality: ProcessQualityAssessment
  outcomeQuality: OutcomeQualityAssessment
  systemQuality: SystemQualityAssessment
  overallAssessment: OverallQualityAssessment
}

export interface DataQualityAssessment {
  completeness: number
  accuracy: number
  consistency: number
  timeliness: number
  validity: number
  issues: DataQualityIssue[]
}

export interface DataQualityIssue {
  type: string
  severity: string
  description: string
  impact: number
  remediation: string[]
}

export interface ProcessQualityAssessment {
  efficiency: number
  effectiveness: number
  consistency: number
  scalability: number
  issues: ProcessIssue[]
  improvements: ProcessImprovement[]
}

export interface ProcessIssue {
  process: string
  issue: string
  impact: number
  frequency: number
  remediation: string[]
}

export interface ProcessImprovement {
  process: string
  improvement: string
  benefit: number
  effort: number
  priority: Priority
}

export interface OutcomeQualityAssessment {
  accuracy: number
  fairness: number
  reliability: number
  validity: number
  satisfaction: number
  improvements: OutcomeImprovement[]
}

export interface OutcomeImprovement {
  area: string
  current: number
  target: number
  actions: string[]
  timeline: string
}

export interface SystemQualityAssessment {
  performance: number
  reliability: number
  scalability: number
  security: number
  usability: number
  issues: SystemIssue[]
}

export interface SystemIssue {
  component: string
  issue: string
  severity: string
  impact: number
  remediation: string[]
}

export interface OverallQualityAssessment {
  score: number
  grade: string
  strengths: string[]
  weaknesses: string[]
  recommendations: QualityRecommendation[]
}

export interface QualityRecommendation {
  area: string
  recommendation: string
  impact: number
  effort: number
  priority: Priority
}

export interface BenchmarkComparisons {
  industryBenchmarks: BenchmarkCategory[]
  competitorBenchmarks: BenchmarkCategory[]
  internalBenchmarks: BenchmarkCategory[]
  bestPractices: BestPractice[]
  gaps: BenchmarkGap[]
}

export interface BenchmarkCategory {
  category: string
  ourValue: number
  benchmarkValue: number
  percentile: number
  gap: number
  trend: TrendDirection
}

export interface BestPractice {
  practice: string
  description: string
  benefit: string
  effort: string
  applicability: number
}

export interface BenchmarkGap {
  area: string
  gap: number
  impact: string
  closure: GapClosure
}

export interface GapClosure {
  effort: number
  timeline: string
  steps: string[]
  success: string[]
}

export interface TrendsAnalysis {
  overallTrends: OverallTrend[]
  segmentTrends: SegmentTrend[]
  predictiveTrends: PredictiveTrend[]
  anomalies: TrendAnomaly[]
  implications: TrendImplication[]
}

export interface OverallTrend {
  metric: string
  direction: TrendDirection
  magnitude: number
  duration: string
  significance: number
  stability: number
}

export interface SegmentTrend {
  segment: string
  metric: string
  trend: TrendDirection
  magnitude: number
  relative: number
}

export interface PredictiveTrend {
  metric: string
  prediction: number
  confidence: number
  timeframe: string
  factors: string[]
  scenarios: TrendScenario[]
}

export interface TrendScenario {
  scenario: string
  probability: number
  outcome: number
  conditions: string[]
}

export interface TrendAnomaly {
  metric: string
  anomaly: string
  deviation: number
  explanation: string
  impact: number
}

export interface TrendImplication {
  trend: string
  implication: string
  impact: string
  actions: string[]
  urgency: string
}

export interface AnalyticsRecommendation {
  id: string
  category: string
  title: string
  description: string
  rationale: string
  data: any[]
  confidence: number
  impact: ImpactLevel
  effort: EffortLevel
  timeline: string
  priority: Priority
  actions: ActionItem[]
  success: string[]
  risks: string[]
}

export interface ActionItem {
  action: string
  responsible: string
  deadline: Date
  dependencies: string[]
  status: ActionStatus
}

// Enums
export enum TrendDirection {
  INCREASING = 'increasing',
  DECREASING = 'decreasing',
  STABLE = 'stable',
  VOLATILE = 'volatile'
}

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
  CRITICAL = 'critical'
}

export enum SegmentType {
  DEMOGRAPHIC = 'demographic',
  SKILL = 'skill',
  EXPERIENCE = 'experience',
  GEOGRAPHIC = 'geographic',
  SOURCE = 'source',
  TIME = 'time'
}

export enum RecommendationType {
  PROCESS_IMPROVEMENT = 'process_improvement',
  RESOURCE_OPTIMIZATION = 'resource_optimization',
  QUALITY_ENHANCEMENT = 'quality_enhancement',
  EFFICIENCY_GAIN = 'efficiency_gain',
  RISK_MITIGATION = 'risk_mitigation',
  OPPORTUNITY_CAPTURE = 'opportunity_capture'
}

export enum ImpactLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  TRANSFORMATIONAL = 'transformational'
}

export enum EffortLevel {
  MINIMAL = 'minimal',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  EXTENSIVE = 'extensive'
}

export enum BenchmarkPosition {
  BOTTOM_QUARTILE = 'bottom_quartile',
  BELOW_AVERAGE = 'below_average',
  AVERAGE = 'average',
  ABOVE_AVERAGE = 'above_average',
  TOP_QUARTILE = 'top_quartile'
}

export enum OutlierType {
  HIGH_PERFORMER = 'high_performer',
  LOW_PERFORMER = 'low_performer',
  ANOMALOUS = 'anomalous'
}

export enum ActionStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  OVERDUE = 'overdue',
  CANCELLED = 'cancelled'
}

export interface DateRange {
  start: Date
  end: Date
}

export class AdvancedAnalyticsService {
  private analytics: Map<string, AdvancedAnalyticsDashboard> = new Map()
  private cache: Map<string, any> = new Map()
  private cacheExpiry: Map<string, Date> = new Map()

  async generateDashboard(
    candidates: CandidateListItem[],
    predictions: MLPrediction[],
    biasResults: BiasDetectionResult[],
    timeRange: DateRange
  ): Promise<AdvancedAnalyticsDashboard> {
    const dashboardId = `analytics_${Date.now()}`
    
    const dashboard: AdvancedAnalyticsDashboard = {
      id: dashboardId,
      timestamp: new Date(),
      timeRange,
      performanceMetrics: await this.generatePerformanceMetrics(candidates, predictions),
      candidatePoolAnalysis: await this.analyzeCandidatePool(candidates),
      successRateTracking: await this.trackSuccessRates(candidates, predictions),
      roiCalculations: await this.calculateROI(candidates, predictions),
      predictiveInsights: await this.generatePredictiveInsights(predictions),
      qualityAssessment: await this.assessQuality(candidates, predictions),
      benchmarkComparisons: await this.compareBenchmarks(candidates, predictions),
      trendsAnalysis: await this.analyzeTrends(candidates, predictions, timeRange),
      recommendations: await this.generateRecommendations(candidates, predictions, biasResults)
    }

    this.analytics.set(dashboardId, dashboard)
    return dashboard
  }

  private async generatePerformanceMetrics(
    candidates: CandidateListItem[],
    predictions: MLPrediction[]
  ): Promise<InterviewPerformanceMetrics> {
    const overallMetrics: OverallPerformanceMetrics = {
      totalInterviews: candidates.length,
      completionRate: candidates.filter(c => c.status === 'completed').length / candidates.length,
      averageDuration: 45, // Mock average duration in minutes
      averageScore: candidates.reduce((sum, c) => sum + c.overallScore, 0) / candidates.length,
      successRate: 0.72,
      improvementRate: 0.15,
      consistencyScore: 0.85,
      reliabilityIndex: 0.88
    }

    // Mock phase analysis - would analyze actual interview phases
    const phaseAnalysis: PhasePerformanceAnalysis[] = [
      {
        phase: 'Technical Assessment',
        averageDuration: 18,
        completionRate: 0.95,
        effectivenessScore: 0.82,
        candidateEngagement: 0.75,
        informationYield: 0.88,
        improvementAreas: ['Question diversity', 'Time management'],
        bestPractices: ['Structured approach', 'Real-world scenarios']
      },
      {
        phase: 'Behavioral Interview',
        averageDuration: 15,
        completionRate: 0.98,
        effectivenessScore: 0.79,
        candidateEngagement: 0.85,
        informationYield: 0.82,
        improvementAreas: ['Follow-up questions', 'Depth of exploration'],
        bestPractices: ['STAR method', 'Active listening']
      }
    ]

    return {
      overallMetrics,
      phaseAnalysis,
      questionEffectiveness: await this.analyzeQuestionEffectiveness(),
      interviewerPerformance: await this.analyzeInterviewerPerformance(),
      candidateExperience: await this.analyzeCandidateExperience(),
      qualityMetrics: await this.calculateQualityMetrics(),
      efficiencyMetrics: await this.calculateEfficiencyMetrics()
    }
  }

  private async analyzeCandidatePool(candidates: CandidateListItem[]): Promise<CandidatePoolAnalysis> {
    // Demographic analysis
    const demographics: DemographicAnalysis = {
      totalCandidates: candidates.length,
      genderDistribution: { 'Male': 120, 'Female': 80, 'Other': 5 }, // Mock data
      ageDistribution: {
        ranges: [
          { range: '22-27', count: 45, percentage: 22 },
          { range: '28-35', count: 95, percentage: 46 },
          { range: '36-45', count: 55, percentage: 27 },
          { range: '46+', count: 10, percentage: 5 }
        ],
        averageAge: 32,
        medianAge: 31,
        distribution: [45, 95, 55, 10]
      },
      educationLevels: {
        'Bachelor': 120,
        'Master': 70,
        'PhD': 15
      },
      experienceLevels: this.calculateExperienceLevels(candidates),
      diversityIndex: 0.72,
      representationGaps: [
        {
          group: 'Senior Female Engineers',
          currentRepresentation: 0.15,
          targetRepresentation: 0.30,
          gap: -0.15,
          priority: Priority.HIGH
        }
      ]
    }

    return {
      poolSize: candidates.length,
      demographics,
      skillDistribution: await this.analyzeSkillDistribution(candidates),
      experienceAnalysis: await this.analyzeExperience(candidates),
      geographicDistribution: await this.analyzeGeography(candidates),
      sourceAnalysis: await this.analyzeSourceEffectiveness(candidates),
      qualityMetrics: await this.calculatePoolQuality(candidates),
      diversityMetrics: await this.calculateDiversityMetrics(candidates),
      trendsAnalysis: await this.analyzePoolTrends(candidates)
    }
  }

  private async trackSuccessRates(
    candidates: CandidateListItem[],
    predictions: MLPrediction[]
  ): Promise<SuccessRateTracking> {
    const completedCandidates = candidates.filter(c => c.status === 'completed')
    const successfulCandidates = completedCandidates.filter(c => c.overallScore >= 75)

    const overallMetrics: SuccessMetrics = {
      interviewSuccessRate: successfulCandidates.length / completedCandidates.length,
      hiringSuccessRate: 0.68, // Mock hiring rate
      retentionRate: 0.85, // Mock retention rate
      performanceSuccessRate: 0.78, // Mock performance success
      promotionRate: 0.23, // Mock promotion rate
      overallSuccessIndex: 0.73
    }

    return {
      overallMetrics,
      segmentedAnalysis: await this.analyzeSegmentedSuccess(candidates),
      timeSeriesAnalysis: await this.analyzeTimeSeriesSuccess(candidates),
      predictiveAnalysis: await this.analyzePredictiveSuccess(predictions),
      factorAnalysis: await this.analyzeSuccessFactors(candidates, predictions),
      benchmarkComparisons: await this.compareSuccessBenchmarks()
    }
  }

  private async calculateROI(
    candidates: CandidateListItem[],
    predictions: MLPrediction[]
  ): Promise<ROICalculations> {
    // Mock ROI calculations - in practice would use actual cost and benefit data
    const totalCosts = 150000 // Mock annual cost
    const totalBenefits = 380000 // Mock annual benefits
    const roi = (totalBenefits - totalCosts) / totalCosts

    const overview: ROIOverview = {
      totalROI: roi,
      paybackPeriod: 4.5, // months
      netPresentValue: 850000,
      internalRateOfReturn: 0.45,
      costBenefitRatio: 2.53,
      riskAdjustedROI: roi * 0.85
    }

    return {
      overview,
      costAnalysis: await this.analyzeCosts(),
      benefitAnalysis: await this.analyzeBenefits(),
      timeToValue: await this.analyzeTimeToValue(),
      scenarioAnalysis: await this.analyzeROIScenarios(),
      benchmarkROI: await this.benchmarkROI(),
      projections: await this.projectROI()
    }
  }

  // Additional helper methods would be implemented here...
  // For brevity, showing simplified implementations

  private calculateExperienceLevels(candidates: CandidateListItem[]): { [level: string]: number } {
    const levels: { [level: string]: number } = {}
    candidates.forEach(candidate => {
      const level = candidate.profileSummary.experienceLevel
      levels[level] = (levels[level] || 0) + 1
    })
    return levels
  }

  // More implementation methods would continue...
  // The service would include all the detailed analysis methods

  // Public API methods
  async getLatestDashboard(): Promise<AdvancedAnalyticsDashboard | null> {
    const dashboards = Array.from(this.analytics.values())
    return dashboards.length > 0 ? dashboards[dashboards.length - 1] : null
  }

  async getDashboardById(id: string): Promise<AdvancedAnalyticsDashboard | null> {
    return this.analytics.get(id) || null
  }

  async exportDashboard(id: string, format: string): Promise<any> {
    const dashboard = this.analytics.get(id)
    if (!dashboard) return null

    // Implementation would depend on format (PDF, Excel, etc.)
    return {
      format,
      data: dashboard,
      timestamp: new Date()
    }
  }
}

// Singleton instance
export const advancedAnalyticsService = new AdvancedAnalyticsService()