import { CandidateListItem } from './candidateManagement'
import { ScoreVisualizationData } from './scoreVisualization'
import { TranscriptViewerData } from './transcriptViewer'

export interface CandidateComparisonData {
  comparisonId: string
  candidates: ComparisonCandidate[]
  comparisonMetrics: ComparisonMetric[]
  scoringBreakdown: ScoringBreakdown
  skillsComparison: SkillsComparison
  experienceComparison: ExperienceComparison
  communicationComparison: CommunicationComparison
  culturalFitComparison: CulturalFitComparison
  overallRanking: CandidateRanking[]
  recommendations: ComparisonRecommendation[]
  insights: ComparisonInsight[]
  visualizations: ComparisonVisualization[]
  filters: ComparisonFilter[]
  criteria: ComparisonCriteria[]
}

export interface ComparisonCandidate {
  candidateId: string
  candidateName: string
  position: string
  overallScore: number
  overallRank: number
  profileSummary: CandidateProfileComparison
  interviewPerformance: InterviewPerformanceComparison
  strengths: string[]
  weaknesses: string[]
  differentiators: string[]
  riskFactors: RiskFactor[]
  fitScore: number
  confidence: number
}

export interface CandidateProfileComparison {
  experienceLevel: string
  yearsOfExperience: number
  educationLevel: string
  keySkills: SkillComparison[]
  industryExperience: string[]
  previousRoles: string[]
  certifications: string[]
  achievements: string[]
}

export interface SkillComparison {
  skill: string
  candidateScore: number
  benchmarkScore: number
  percentileRank: number
  relativeStrength: RelativeStrength
  evidence: string[]
  confidence: number
}

export interface InterviewPerformanceComparison {
  technicalScore: number
  communicationScore: number
  behavioralScore: number
  culturalFitScore: number
  problemSolvingScore: number
  responseQuality: number
  engagement: number
  consistency: number
}

export interface RiskFactor {
  type: RiskType
  severity: RiskSeverity
  description: string
  impact: string
  mitigation: string[]
  probability: number
}

export interface ComparisonMetric {
  metricName: string
  metricType: MetricType
  values: CandidateMetricValue[]
  benchmark: number
  bestPractice: number
  visualization: VisualizationType
  importance: MetricImportance
  trend: MetricTrend
}

export interface CandidateMetricValue {
  candidateId: string
  value: number
  percentile: number
  relative: RelativePosition
  context: string
}

export interface ScoringBreakdown {
  categories: CategoryBreakdown[]
  weightings: CategoryWeighting[]
  methodology: ScoringMethodology
  normalization: NormalizationMethod
  reliability: ScoreReliability
}

export interface CategoryBreakdown {
  category: string
  weight: number
  candidateScores: CategoryScore[]
  average: number
  standardDeviation: number
  significance: StatisticalSignificance
}

export interface CategoryScore {
  candidateId: string
  score: number
  rank: number
  percentile: number
  zScore: number
  contributionToOverall: number
}

export interface CategoryWeighting {
  category: string
  weight: number
  justification: string
  impact: WeightingImpact
  adjustable: boolean
}

export interface SkillsComparison {
  skillCategories: SkillCategoryComparison[]
  skillGapAnalysis: SkillGapAnalysis
  skillSynergyAnalysis: SkillSynergyAnalysis
  developmentPotential: DevelopmentPotential[]
  marketRelevance: MarketRelevance[]
}

export interface SkillCategoryComparison {
  category: string
  candidateScores: SkillCategoryScore[]
  requiredLevel: number
  importance: number
  marketDemand: number
  futureRelevance: number
}

export interface SkillCategoryScore {
  candidateId: string
  score: number
  proficiencyLevel: string
  gap: number
  growthPotential: number
  verificationLevel: VerificationLevel
}

export interface SkillGapAnalysis {
  criticalGaps: SkillGap[]
  minorGaps: SkillGap[]
  unexpectedStrengths: SkillStrength[]
  trainingRecommendations: TrainingRecommendation[]
}

export interface SkillGap {
  skill: string
  requiredLevel: number
  candidateScores: { [candidateId: string]: number }
  gapSeverity: GapSeverity
  trainingDifficulty: TrainingDifficulty
  businessImpact: BusinessImpact
}

export interface SkillStrength {
  skill: string
  candidateId: string
  score: number
  advantage: number
  marketValue: number
  transferability: number
}

export interface SkillSynergyAnalysis {
  synergisticCombinations: SkillSynergy[]
  complementaryProfiles: ComplementaryProfile[]
  teamComposition: TeamCompositionAnalysis
}

export interface SkillSynergy {
  skills: string[]
  synergyScore: number
  candidateAlignment: { [candidateId: string]: number }
  businessValue: number
  rarity: number
}

export interface ComplementaryProfile {
  candidateIds: string[]
  complementarityScore: number
  combinedStrengths: string[]
  coverageGaps: string[]
  teamDynamics: number
}

export interface ExperienceComparison {
  experienceMetrics: ExperienceMetric[]
  careerProgression: CareerProgression[]
  industryExperience: IndustryExperience[]
  roleRelevance: RoleRelevance[]
  stabilityAnalysis: StabilityAnalysis
  growthTrajectory: GrowthTrajectory[]
}

export interface ExperienceMetric {
  metric: string
  candidateValues: { [candidateId: string]: any }
  benchmark: any
  importance: number
  trend: TrendDirection
}

export interface CareerProgression {
  candidateId: string
  progressionRate: number
  roleAdvancement: RoleAdvancement[]
  responsibilityGrowth: number
  leadershipEvolution: number
  stabilityVsGrowth: number
}

export interface CommunicationComparison {
  verbalCommunication: CommunicationMetric[]
  writtenCommunication: CommunicationMetric[]
  interpersonalSkills: InterpersonalSkillsComparison
  presentationSkills: PresentationSkillsComparison
  culturalCommunication: CulturalCommunicationComparison
}

export interface CommunicationMetric {
  aspect: string
  candidateScores: { [candidateId: string]: number }
  benchmark: number
  importance: number
  evidence: { [candidateId: string]: string[] }
}

export interface CulturalFitComparison {
  valueAlignment: ValueAlignment[]
  workStyleFit: WorkStyleFit[]
  teamCompatibility: TeamCompatibility[]
  adaptability: AdaptabilityComparison
  cultureContribution: CultureContribution[]
}

export interface ValueAlignment {
  value: string
  candidateAlignment: { [candidateId: string]: number }
  importance: number
  evidence: { [candidateId: string]: string[] }
}

export interface CandidateRanking {
  candidateId: string
  overallRank: number
  categoryRanks: { [category: string]: number }
  strengthBasedRank: number
  fitBasedRank: number
  potentialBasedRank: number
  riskAdjustedRank: number
  confidence: number
  rankingFactors: RankingFactor[]
}

export interface RankingFactor {
  factor: string
  weight: number
  score: number
  impact: number
  justification: string
}

export interface ComparisonRecommendation {
  id: string
  type: RecommendationType
  targetCandidateIds: string[]
  title: string
  description: string
  rationale: string
  impact: ImpactLevel
  confidence: number
  actionItems: ActionItem[]
  timeline: string
  success_criteria: string[]
}

export interface ActionItem {
  action: string
  responsible: string
  dueDate: Date
  priority: ActionPriority
  dependencies: string[]
}

export interface ComparisonInsight {
  id: string
  type: InsightType
  category: InsightCategory
  candidates: string[]
  title: string
  description: string
  significance: InsightSignificance
  implications: string[]
  confidence: number
  supportingData: any[]
}

export interface ComparisonVisualization {
  id: string
  type: VisualizationType
  title: string
  description: string
  data: any
  configuration: VisualizationConfig
  interactive: boolean
  exportable: boolean
}

export interface VisualizationConfig {
  chartType: string
  dimensions: string[]
  metrics: string[]
  colors: string[]
  layout: LayoutOptions
  filters: FilterOptions[]
}

export interface ComparisonFilter {
  id: string
  name: string
  type: FilterType
  values: FilterValue[]
  active: boolean
  impact: FilterImpact
}

export interface FilterValue {
  value: any
  label: string
  count: number
  selected: boolean
}

export interface ComparisonCriteria {
  criterionId: string
  name: string
  weight: number
  description: string
  measurableOutcome: string
  scoringMethod: ScoringMethod
  benchmarks: CriteriaBenchmark[]
  importance: CriteriaImportance
}

export interface CriteriaBenchmark {
  level: string
  score: number
  description: string
  examples: string[]
}

// Additional supporting interfaces
export interface TeamCompositionAnalysis {
  idealComposition: SkillDistribution[]
  currentGaps: string[]
  overlapAreas: string[]
  diversityScore: number
  balanceScore: number
}

export interface SkillDistribution {
  skill: string
  requiredCount: number
  currentCount: number
  gap: number
  candidates: string[]
}

export interface DevelopmentPotential {
  candidateId: string
  skill: string
  currentLevel: number
  potentialLevel: number
  developmentPath: DevelopmentStep[]
  timeToTarget: number
  probability: number
}

export interface DevelopmentStep {
  step: string
  duration: number
  resources: string[]
  prerequisites: string[]
  success_criteria: string[]
}

export interface MarketRelevance {
  skill: string
  currentDemand: number
  futureDemand: number
  salaryImpact: number
  competitiveAdvantage: number
  obsolescenceRisk: number
}

export interface TrainingRecommendation {
  skill: string
  candidateIds: string[]
  trainingType: TrainingType
  provider: string
  duration: number
  cost: number
  expectedOutcome: string
  roi: number
}

// Enums
export enum RelativeStrength {
  MUCH_STRONGER = 'much_stronger',
  STRONGER = 'stronger',
  SIMILAR = 'similar',
  WEAKER = 'weaker',
  MUCH_WEAKER = 'much_weaker'
}

export enum RiskType {
  TECHNICAL_SKILLS = 'technical_skills',
  EXPERIENCE_LEVEL = 'experience_level',
  CULTURAL_FIT = 'cultural_fit',
  STABILITY = 'stability',
  GROWTH_POTENTIAL = 'growth_potential',
  COMMUNICATION = 'communication',
  LEADERSHIP = 'leadership'
}

export enum RiskSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum MetricType {
  SCORE = 'score',
  PERCENTAGE = 'percentage',
  RATING = 'rating',
  RANK = 'rank',
  COUNT = 'count',
  DURATION = 'duration'
}

export enum MetricImportance {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum MetricTrend {
  IMPROVING = 'improving',
  STABLE = 'stable',
  DECLINING = 'declining'
}

export enum RelativePosition {
  TOP_PERFORMER = 'top_performer',
  ABOVE_AVERAGE = 'above_average',
  AVERAGE = 'average',
  BELOW_AVERAGE = 'below_average',
  BOTTOM_PERFORMER = 'bottom_performer'
}

export enum VisualizationType {
  BAR_CHART = 'bar_chart',
  RADAR_CHART = 'radar_chart',
  SCATTER_PLOT = 'scatter_plot',
  HEATMAP = 'heatmap',
  LINE_CHART = 'line_chart',
  BUBBLE_CHART = 'bubble_chart',
  TABLE = 'table'
}

export enum StatisticalSignificance {
  NOT_SIGNIFICANT = 'not_significant',
  MARGINALLY_SIGNIFICANT = 'marginally_significant',
  SIGNIFICANT = 'significant',
  HIGHLY_SIGNIFICANT = 'highly_significant'
}

export enum WeightingImpact {
  MINIMAL = 'minimal',
  MODERATE = 'moderate',
  SUBSTANTIAL = 'substantial',
  DECISIVE = 'decisive'
}

export enum VerificationLevel {
  UNVERIFIED = 'unverified',
  SELF_REPORTED = 'self_reported',
  DEMONSTRATED = 'demonstrated',
  VALIDATED = 'validated',
  CERTIFIED = 'certified'
}

export enum GapSeverity {
  MINOR = 'minor',
  MODERATE = 'moderate',
  MAJOR = 'major',
  CRITICAL = 'critical'
}

export enum TrainingDifficulty {
  EASY = 'easy',
  MODERATE = 'moderate',
  DIFFICULT = 'difficult',
  VERY_DIFFICULT = 'very_difficult'
}

export enum BusinessImpact {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum TrendDirection {
  IMPROVING = 'improving',
  STABLE = 'stable',
  DECLINING = 'declining'
}

export enum RecommendationType {
  HIRE = 'hire',
  REJECT = 'reject',
  FURTHER_INTERVIEW = 'further_interview',
  SKILLS_ASSESSMENT = 'skills_assessment',
  REFERENCE_CHECK = 'reference_check',
  ROLE_ADJUSTMENT = 'role_adjustment'
}

export enum ImpactLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum ActionPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export enum InsightType {
  STANDOUT_PERFORMER = 'standout_performer',
  CLOSE_COMPETITION = 'close_competition',
  SKILL_GAP = 'skill_gap',
  CULTURAL_MISMATCH = 'cultural_mismatch',
  HIDDEN_GEM = 'hidden_gem',
  OVERQUALIFIED = 'overqualified',
  DEVELOPMENT_OPPORTUNITY = 'development_opportunity'
}

export enum InsightCategory {
  PERFORMANCE = 'performance',
  SKILLS = 'skills',
  EXPERIENCE = 'experience',
  CULTURE = 'culture',
  POTENTIAL = 'potential',
  RISK = 'risk'
}

export enum InsightSignificance {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum FilterType {
  SCORE_RANGE = 'score_range',
  EXPERIENCE_LEVEL = 'experience_level',
  SKILLS = 'skills',
  EDUCATION = 'education',
  LOCATION = 'location',
  AVAILABILITY = 'availability'
}

export enum FilterImpact {
  NARROW = 'narrow',
  MODERATE = 'moderate',
  BROAD = 'broad'
}

export enum ScoringMethod {
  WEIGHTED_AVERAGE = 'weighted_average',
  PERCENTILE_RANKING = 'percentile_ranking',
  STANDARDIZED_SCORE = 'standardized_score',
  RUBRIC_BASED = 'rubric_based'
}

export enum CriteriaImportance {
  NICE_TO_HAVE = 'nice_to_have',
  PREFERRED = 'preferred',
  REQUIRED = 'required',
  CRITICAL = 'critical'
}

export enum TrainingType {
  ONLINE_COURSE = 'online_course',
  CERTIFICATION = 'certification',
  WORKSHOP = 'workshop',
  MENTORING = 'mentoring',
  ON_THE_JOB = 'on_the_job'
}

export enum ScoringMethodology {
  ABSOLUTE = 'absolute',
  RELATIVE = 'relative',
  HYBRID = 'hybrid'
}

export enum NormalizationMethod {
  Z_SCORE = 'z_score',
  MIN_MAX = 'min_max',
  PERCENTILE = 'percentile',
  NONE = 'none'
}

export enum ScoreReliability {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  VERY_HIGH = 'very_high'
}

export class CandidateComparisonService {
  private comparisonCache: Map<string, CandidateComparisonData> = new Map()
  private benchmarkData: Map<string, any> = new Map()

  // Main comparison method
  async compareCandidates(
    candidateIds: string[],
    criteria?: ComparisonCriteria[],
    options?: ComparisonOptions
  ): Promise<CandidateComparisonData> {
    if (candidateIds.length < 2) {
      throw new Error('At least 2 candidates required for comparison')
    }

    const comparisonId = this.generateComparisonId(candidateIds, criteria)
    
    // Check cache
    const cached = this.comparisonCache.get(comparisonId)
    if (cached && !options?.forceRefresh) {
      return cached
    }

    // Load candidate data
    const candidates = await this.loadCandidateData(candidateIds)
    
    // Process comparison data
    const comparisonData: CandidateComparisonData = {
      comparisonId,
      candidates: await this.processComparisonCandidates(candidates),
      comparisonMetrics: await this.generateComparisonMetrics(candidates),
      scoringBreakdown: await this.generateScoringBreakdown(candidates),
      skillsComparison: await this.generateSkillsComparison(candidates),
      experienceComparison: await this.generateExperienceComparison(candidates),
      communicationComparison: await this.generateCommunicationComparison(candidates),
      culturalFitComparison: await this.generateCulturalFitComparison(candidates),
      overallRanking: await this.generateOverallRanking(candidates, criteria),
      recommendations: await this.generateRecommendations(candidates),
      insights: await this.generateInsights(candidates),
      visualizations: await this.generateVisualizations(candidates),
      filters: this.generateFilters(candidates),
      criteria: criteria || this.getDefaultCriteria()
    }

    // Cache the result
    this.comparisonCache.set(comparisonId, comparisonData)

    return comparisonData
  }

  private async processComparisonCandidates(candidates: CandidateListItem[]): Promise<ComparisonCandidate[]> {
    return Promise.all(candidates.map(async (candidate, index) => {
      const profileComparison = await this.generateProfileComparison(candidate)
      const interviewPerformance = await this.generateInterviewPerformanceComparison(candidate)
      const strengths = await this.identifyStrengths(candidate)
      const weaknesses = await this.identifyWeaknesses(candidate)
      const differentiators = await this.identifyDifferentiators(candidate, candidates)
      const riskFactors = await this.identifyRiskFactors(candidate)

      return {
        candidateId: candidate.id,
        candidateName: candidate.name,
        position: candidate.position,
        overallScore: candidate.overallScore,
        overallRank: index + 1, // Will be recalculated later
        profileSummary: profileComparison,
        interviewPerformance,
        strengths,
        weaknesses,
        differentiators,
        riskFactors,
        fitScore: await this.calculateFitScore(candidate),
        confidence: 0.85
      }
    }))
  }

  private async generateProfileComparison(candidate: CandidateListItem): Promise<CandidateProfileComparison> {
    return {
      experienceLevel: candidate.profileSummary.experienceLevel,
      yearsOfExperience: this.extractYearsOfExperience(candidate),
      educationLevel: 'Bachelor\'s Degree', // Mock data
      keySkills: candidate.profileSummary.keySkills.map(skill => ({
        skill: skill.skill,
        candidateScore: skill.proficiency === 'expert' ? 90 : skill.proficiency === 'advanced' ? 80 : 70,
        benchmarkScore: 75,
        percentileRank: 75,
        relativeStrength: RelativeStrength.STRONGER,
        evidence: ['Interview demonstration', 'Project examples'],
        confidence: skill.confidence
      })),
      industryExperience: ['Technology', 'Software Development'],
      previousRoles: ['Software Engineer', 'Developer'],
      certifications: [],
      achievements: []
    }
  }

  private async generateInterviewPerformanceComparison(candidate: CandidateListItem): Promise<InterviewPerformanceComparison> {
    return {
      technicalScore: candidate.profileSummary.technicalScore,
      communicationScore: candidate.profileSummary.communicationScore,
      behavioralScore: candidate.profileSummary.behavioralScore,
      culturalFitScore: candidate.profileSummary.culturalFit * 100,
      problemSolvingScore: 75,
      responseQuality: 80,
      engagement: 85,
      consistency: 82
    }
  }

  private async generateComparisonMetrics(candidates: CandidateListItem[]): Promise<ComparisonMetric[]> {
    const metrics: ComparisonMetric[] = []

    // Overall score metric
    metrics.push({
      metricName: 'Overall Score',
      metricType: MetricType.SCORE,
      values: candidates.map(c => ({
        candidateId: c.id,
        value: c.overallScore,
        percentile: this.calculatePercentile(c.overallScore, candidates.map(x => x.overallScore)),
        relative: this.getRelativePosition(c.overallScore, candidates.map(x => x.overallScore)),
        context: 'Comprehensive assessment score'
      })),
      benchmark: 75,
      bestPractice: 85,
      visualization: VisualizationType.BAR_CHART,
      importance: MetricImportance.CRITICAL,
      trend: MetricTrend.STABLE
    })

    // Technical score metric
    metrics.push({
      metricName: 'Technical Skills',
      metricType: MetricType.SCORE,
      values: candidates.map(c => ({
        candidateId: c.id,
        value: c.profileSummary.technicalScore,
        percentile: this.calculatePercentile(c.profileSummary.technicalScore, 
          candidates.map(x => x.profileSummary.technicalScore)),
        relative: this.getRelativePosition(c.profileSummary.technicalScore,
          candidates.map(x => x.profileSummary.technicalScore)),
        context: 'Technical competency assessment'
      })),
      benchmark: 70,
      bestPractice: 80,
      visualization: VisualizationType.RADAR_CHART,
      importance: MetricImportance.HIGH,
      trend: MetricTrend.IMPROVING
    })

    // Communication score metric
    metrics.push({
      metricName: 'Communication',
      metricType: MetricType.SCORE,
      values: candidates.map(c => ({
        candidateId: c.id,
        value: c.profileSummary.communicationScore,
        percentile: this.calculatePercentile(c.profileSummary.communicationScore,
          candidates.map(x => x.profileSummary.communicationScore)),
        relative: this.getRelativePosition(c.profileSummary.communicationScore,
          candidates.map(x => x.profileSummary.communicationScore)),
        context: 'Communication effectiveness evaluation'
      })),
      benchmark: 75,
      bestPractice: 85,
      visualization: VisualizationType.BAR_CHART,
      importance: MetricImportance.HIGH,
      trend: MetricTrend.STABLE
    })

    return metrics
  }

  private async generateScoringBreakdown(candidates: CandidateListItem[]): Promise<ScoringBreakdown> {
    const categories = ['Technical Skills', 'Communication', 'Experience', 'Cultural Fit']
    
    const categoryBreakdowns: CategoryBreakdown[] = categories.map(category => {
      const scores = candidates.map(c => this.getCategoryScore(c, category))
      const average = scores.reduce((a, b) => a + b, 0) / scores.length
      const variance = scores.reduce((sum, score) => sum + Math.pow(score - average, 2), 0) / scores.length
      const standardDeviation = Math.sqrt(variance)

      return {
        category,
        weight: this.getCategoryWeight(category),
        candidateScores: candidates.map((candidate, index) => {
          const score = scores[index]
          const sortedScores = [...scores].sort((a, b) => b - a)
          const rank = sortedScores.indexOf(score) + 1
          
          return {
            candidateId: candidate.id,
            score,
            rank,
            percentile: this.calculatePercentile(score, scores),
            zScore: (score - average) / standardDeviation,
            contributionToOverall: score * this.getCategoryWeight(category)
          }
        }),
        average,
        standardDeviation,
        significance: standardDeviation > 10 ? StatisticalSignificance.SIGNIFICANT : StatisticalSignificance.NOT_SIGNIFICANT
      }
    })

    return {
      categories: categoryBreakdowns,
      weightings: categories.map(category => ({
        category,
        weight: this.getCategoryWeight(category),
        justification: this.getCategoryJustification(category),
        impact: WeightingImpact.SUBSTANTIAL,
        adjustable: true
      })),
      methodology: ScoringMethodology.HYBRID,
      normalization: NormalizationMethod.Z_SCORE,
      reliability: ScoreReliability.HIGH
    }
  }

  private async generateSkillsComparison(candidates: CandidateListItem[]): Promise<SkillsComparison> {
    // Extract all unique skills
    const allSkills = new Set<string>()
    candidates.forEach(candidate => {
      candidate.profileSummary.keySkills.forEach(skill => {
        allSkills.add(skill.skill)
      })
    })

    const skillCategories: SkillCategoryComparison[] = []
    const categorizedSkills = this.categorizeSkills(Array.from(allSkills))

    Object.entries(categorizedSkills).forEach(([category, skills]) => {
      const candidateScores: SkillCategoryScore[] = candidates.map(candidate => {
        const categorySkills = candidate.profileSummary.keySkills.filter(s => 
          skills.includes(s.skill)
        )
        const avgScore = categorySkills.length > 0 
          ? categorySkills.reduce((sum, s) => sum + this.mapProficiencyToScore(s.proficiency), 0) / categorySkills.length
          : 0

        return {
          candidateId: candidate.id,
          score: avgScore,
          proficiencyLevel: this.mapScoreToProficiency(avgScore),
          gap: Math.max(0, 80 - avgScore), // Assuming 80 is target
          growthPotential: this.calculateGrowthPotential(avgScore),
          verificationLevel: VerificationLevel.DEMONSTRATED
        }
      })

      skillCategories.push({
        category,
        candidateScores,
        requiredLevel: 75,
        importance: this.getSkillCategoryImportance(category),
        marketDemand: this.getMarketDemand(category),
        futureRelevance: this.getFutureRelevance(category)
      })
    })

    const skillGapAnalysis = await this.generateSkillGapAnalysis(candidates, Array.from(allSkills))
    const skillSynergyAnalysis = await this.generateSkillSynergyAnalysis(candidates)
    const developmentPotential = await this.generateDevelopmentPotential(candidates)
    const marketRelevance = await this.generateMarketRelevance(Array.from(allSkills))

    return {
      skillCategories,
      skillGapAnalysis,
      skillSynergyAnalysis,
      developmentPotential,
      marketRelevance
    }
  }

  private async generateExperienceComparison(candidates: CandidateListItem[]): Promise<ExperienceComparison> {
    const experienceMetrics: ExperienceMetric[] = [
      {
        metric: 'Years of Experience',
        candidateValues: candidates.reduce((acc, c) => {
          acc[c.id] = this.extractYearsOfExperience(c)
          return acc
        }, {} as { [key: string]: any }),
        benchmark: 5,
        importance: 0.8,
        trend: TrendDirection.STABLE
      },
      {
        metric: 'Number of Companies',
        candidateValues: candidates.reduce((acc, c) => {
          acc[c.id] = 3 // Mock data
          return acc
        }, {} as { [key: string]: any }),
        benchmark: 2.5,
        importance: 0.6,
        trend: TrendDirection.IMPROVING
      }
    ]

    const careerProgression: CareerProgression[] = candidates.map(candidate => ({
      candidateId: candidate.id,
      progressionRate: 0.8,
      roleAdvancement: [
        { role: 'Junior Developer', duration: 2, level: 1 },
        { role: 'Senior Developer', duration: 3, level: 2 }
      ],
      responsibilityGrowth: 0.75,
      leadershipEvolution: 0.6,
      stabilityVsGrowth: 0.7
    }))

    return {
      experienceMetrics,
      careerProgression,
      industryExperience: [], // Would be populated with real data
      roleRelevance: [], // Would be populated with real data
      stabilityAnalysis: {
        averageTenure: 2.5,
        turnoverRisk: 0.3,
        stabilityScore: 0.7,
        factors: ['career_growth', 'compensation', 'work_life_balance']
      },
      growthTrajectory: [] // Would be populated with real data
    }
  }

  private async generateCommunicationComparison(candidates: CandidateListItem[]): Promise<CommunicationComparison> {
    const verbalCommunication: CommunicationMetric[] = [
      {
        aspect: 'Clarity',
        candidateScores: candidates.reduce((acc, c) => {
          acc[c.id] = c.profileSummary.communicationScore * 0.9
          return acc
        }, {} as { [key: string]: number }),
        benchmark: 75,
        importance: 0.9,
        evidence: candidates.reduce((acc, c) => {
          acc[c.id] = ['Clear responses during interview', 'Well-structured explanations']
          return acc
        }, {} as { [key: string]: string[] })
      },
      {
        aspect: 'Engagement',
        candidateScores: candidates.reduce((acc, c) => {
          acc[c.id] = c.profileSummary.communicationScore * 0.95
          return acc
        }, {} as { [key: string]: number }),
        benchmark: 70,
        importance: 0.8,
        evidence: candidates.reduce((acc, c) => {
          acc[c.id] = ['Active participation', 'Asked thoughtful questions']
          return acc
        }, {} as { [key: string]: string[] })
      }
    ]

    return {
      verbalCommunication,
      writtenCommunication: [], // Would be populated if available
      interpersonalSkills: {
        empathy: candidates.reduce((acc, c) => { acc[c.id] = 75; return acc }, {}),
        activeListening: candidates.reduce((acc, c) => { acc[c.id] = 80; return acc }, {}),
        conflictResolution: candidates.reduce((acc, c) => { acc[c.id] = 70; return acc }, {}),
        teamCollaboration: candidates.reduce((acc, c) => { acc[c.id] = 85; return acc }, {})
      },
      presentationSkills: {
        confidence: candidates.reduce((acc, c) => { acc[c.id] = 78; return acc }, {}),
        organization: candidates.reduce((acc, c) => { acc[c.id] = 82; return acc }, {}),
        delivery: candidates.reduce((acc, c) => { acc[c.id] = 76; return acc }, {}),
        audienceEngagement: candidates.reduce((acc, c) => { acc[c.id] = 74; return acc }, {})
      },
      culturalCommunication: {
        culturalAwareness: candidates.reduce((acc, c) => { acc[c.id] = 80; return acc }, {}),
        adaptability: candidates.reduce((acc, c) => { acc[c.id] = 85; return acc }, {}),
        inclusivity: candidates.reduce((acc, c) => { acc[c.id] = 88; return acc }, {}),
        globalMindset: candidates.reduce((acc, c) => { acc[c.id] = 75; return acc }, {})
      }
    }
  }

  private async generateCulturalFitComparison(candidates: CandidateListItem[]): Promise<CulturalFitComparison> {
    const valueAlignment: ValueAlignment[] = [
      {
        value: 'Innovation',
        candidateAlignment: candidates.reduce((acc, c) => {
          acc[c.id] = c.profileSummary.culturalFit * 100
          return acc
        }, {} as { [key: string]: number }),
        importance: 0.9,
        evidence: candidates.reduce((acc, c) => {
          acc[c.id] = ['Demonstrated creative problem-solving', 'Open to new technologies']
          return acc
        }, {} as { [key: string]: string[] })
      },
      {
        value: 'Collaboration',
        candidateAlignment: candidates.reduce((acc, c) => {
          acc[c.id] = c.profileSummary.culturalFit * 95
          return acc
        }, {} as { [key: string]: number }),
        importance: 0.8,
        evidence: candidates.reduce((acc, c) => {
          acc[c.id] = ['Strong teamwork examples', 'Effective communication']
          return acc
        }, {} as { [key: string]: string[] })
      }
    ]

    return {
      valueAlignment,
      workStyleFit: [], // Would be populated with work style analysis
      teamCompatibility: [], // Would be populated with team analysis
      adaptability: {
        changeManagement: candidates.reduce((acc, c) => { acc[c.id] = 80; return acc }, {}),
        learningAgility: candidates.reduce((acc, c) => { acc[c.id] = 85; return acc }, {}),
        resilience: candidates.reduce((acc, c) => { acc[c.id] = 78; return acc }, {}),
        flexibility: candidates.reduce((acc, c) => { acc[c.id] = 82; return acc }, {})
      },
      cultureContribution: [] // Would be populated with culture contribution analysis
    }
  }

  private async generateOverallRanking(candidates: CandidateListItem[], criteria?: ComparisonCriteria[]): Promise<CandidateRanking[]> {
    const rankings: CandidateRanking[] = candidates.map((candidate, index) => {
      const categoryRanks = {
        'technical': this.calculateCategoryRank(candidate, candidates, 'technical'),
        'communication': this.calculateCategoryRank(candidate, candidates, 'communication'),
        'experience': this.calculateCategoryRank(candidate, candidates, 'experience'),
        'cultural_fit': this.calculateCategoryRank(candidate, candidates, 'cultural_fit')
      }

      const rankingFactors: RankingFactor[] = [
        {
          factor: 'Overall Score',
          weight: 0.4,
          score: candidate.overallScore,
          impact: candidate.overallScore * 0.4,
          justification: 'Primary assessment metric'
        },
        {
          factor: 'Technical Skills',
          weight: 0.3,
          score: candidate.profileSummary.technicalScore,
          impact: candidate.profileSummary.technicalScore * 0.3,
          justification: 'Critical for role success'
        },
        {
          factor: 'Cultural Fit',
          weight: 0.2,
          score: candidate.profileSummary.culturalFit * 100,
          impact: candidate.profileSummary.culturalFit * 100 * 0.2,
          justification: 'Important for team integration'
        },
        {
          factor: 'Communication',
          weight: 0.1,
          score: candidate.profileSummary.communicationScore,
          impact: candidate.profileSummary.communicationScore * 0.1,
          justification: 'Essential for collaboration'
        }
      ]

      const weightedScore = rankingFactors.reduce((sum, factor) => sum + factor.impact, 0)

      return {
        candidateId: candidate.id,
        overallRank: index + 1, // Will be sorted later
        categoryRanks,
        strengthBasedRank: this.calculateStrengthBasedRank(candidate, candidates),
        fitBasedRank: this.calculateFitBasedRank(candidate, candidates),
        potentialBasedRank: this.calculatePotentialBasedRank(candidate, candidates),
        riskAdjustedRank: this.calculateRiskAdjustedRank(candidate, candidates),
        confidence: 0.85,
        rankingFactors
      }
    })

    // Sort by weighted score and update ranks
    rankings.sort((a, b) => {
      const aScore = a.rankingFactors.reduce((sum, factor) => sum + factor.impact, 0)
      const bScore = b.rankingFactors.reduce((sum, factor) => sum + factor.impact, 0)
      return bScore - aScore
    })

    rankings.forEach((ranking, index) => {
      ranking.overallRank = index + 1
    })

    return rankings
  }

  private async generateRecommendations(candidates: CandidateListItem[]): Promise<ComparisonRecommendation[]> {
    const recommendations: ComparisonRecommendation[] = []

    // Top performer recommendation
    const topCandidate = candidates.reduce((top, current) => 
      current.overallScore > top.overallScore ? current : top
    )

    recommendations.push({
      id: 'top_performer',
      type: RecommendationType.HIRE,
      targetCandidateIds: [topCandidate.id],
      title: 'Recommend for Hire',
      description: `${topCandidate.name} demonstrates exceptional performance across all assessment areas`,
      rationale: 'Highest overall score, strong technical skills, excellent cultural fit',
      impact: ImpactLevel.HIGH,
      confidence: 0.9,
      actionItems: [
        {
          action: 'Prepare job offer',
          responsible: 'Hiring Manager',
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
          priority: ActionPriority.HIGH,
          dependencies: ['Reference check completion']
        },
        {
          action: 'Conduct reference check',
          responsible: 'HR Team',
          dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
          priority: ActionPriority.URGENT,
          dependencies: []
        }
      ],
      timeline: '1 week',
      success_criteria: ['Successful hire', 'Onboarding completion', '90-day performance review']
    })

    // Skills development recommendation
    const candidatesWithGaps = candidates.filter(c => 
      c.profileSummary.keySkills.some(skill => 
        this.mapProficiencyToScore(skill.proficiency) < 70
      )
    )

    if (candidatesWithGaps.length > 0) {
      recommendations.push({
        id: 'skills_development',
        type: RecommendationType.SKILLS_ASSESSMENT,
        targetCandidateIds: candidatesWithGaps.map(c => c.id),
        title: 'Additional Skills Assessment',
        description: 'Candidates show potential but require validation of specific technical skills',
        rationale: 'Technical skill gaps identified that could be addressed with targeted assessment',
        impact: ImpactLevel.MEDIUM,
        confidence: 0.75,
        actionItems: [
          {
            action: 'Design technical assessment',
            responsible: 'Technical Lead',
            dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
            priority: ActionPriority.MEDIUM,
            dependencies: []
          }
        ],
        timeline: '2 weeks',
        success_criteria: ['Assessment completion', 'Skill validation', 'Updated candidate profiles']
      })
    }

    return recommendations
  }

  private async generateInsights(candidates: CandidateListItem[]): Promise<ComparisonInsight[]> {
    const insights: ComparisonInsight[] = []

    // Close competition insight
    const sortedCandidates = [...candidates].sort((a, b) => b.overallScore - a.overallScore)
    if (sortedCandidates.length >= 2 && 
        sortedCandidates[0].overallScore - sortedCandidates[1].overallScore < 5) {
      insights.push({
        id: 'close_competition',
        type: InsightType.CLOSE_COMPETITION,
        category: InsightCategory.PERFORMANCE,
        candidates: [sortedCandidates[0].id, sortedCandidates[1].id],
        title: 'Close Competition Between Top Candidates',
        description: `${sortedCandidates[0].name} and ${sortedCandidates[1].name} have very similar overall scores`,
        significance: InsightSignificance.HIGH,
        implications: [
          'Decision may require additional evaluation criteria',
          'Consider secondary factors like team fit and growth potential',
          'Both candidates are strong hires'
        ],
        confidence: 0.9,
        supportingData: [
          { candidate: sortedCandidates[0].name, score: sortedCandidates[0].overallScore },
          { candidate: sortedCandidates[1].name, score: sortedCandidates[1].overallScore }
        ]
      })
    }

    // Skill gap insight
    const commonSkillGaps = this.identifyCommonSkillGaps(candidates)
    if (commonSkillGaps.length > 0) {
      insights.push({
        id: 'common_skill_gaps',
        type: InsightType.SKILL_GAP,
        category: InsightCategory.SKILLS,
        candidates: candidates.map(c => c.id),
        title: 'Common Skill Gaps Identified',
        description: `Multiple candidates show gaps in: ${commonSkillGaps.join(', ')}`,
        significance: InsightSignificance.MEDIUM,
        implications: [
          'May indicate unrealistic job requirements',
          'Consider training programs for selected candidate',
          'Review market availability for these skills'
        ],
        confidence: 0.8,
        supportingData: commonSkillGaps
      })
    }

    // Hidden gem insight
    const potentialHiddenGem = candidates.find(c => 
      c.overallScore > 75 && c.overallScore < sortedCandidates[0].overallScore - 10
    )
    if (potentialHiddenGem) {
      insights.push({
        id: 'hidden_gem',
        type: InsightType.HIDDEN_GEM,
        category: InsightCategory.POTENTIAL,
        candidates: [potentialHiddenGem.id],
        title: 'Potential Hidden Gem Identified',
        description: `${potentialHiddenGem.name} shows strong fundamentals with high growth potential`,
        significance: InsightSignificance.MEDIUM,
        implications: [
          'May offer better long-term value',
          'Consider for junior or development role',
          'Lower salary expectations possible'
        ],
        confidence: 0.7,
        supportingData: [potentialHiddenGem]
      })
    }

    return insights
  }

  private async generateVisualizations(candidates: CandidateListItem[]): Promise<ComparisonVisualization[]> {
    const visualizations: ComparisonVisualization[] = []

    // Radar chart for multi-dimensional comparison
    visualizations.push({
      id: 'skills_radar',
      type: VisualizationType.RADAR_CHART,
      title: 'Skills Comparison Radar',
      description: 'Multi-dimensional view of candidate capabilities',
      data: {
        candidates: candidates.map(c => ({
          name: c.name,
          technical: c.profileSummary.technicalScore,
          communication: c.profileSummary.communicationScore,
          behavioral: c.profileSummary.behavioralScore,
          cultural_fit: c.profileSummary.culturalFit * 100
        }))
      },
      configuration: {
        chartType: 'radar',
        dimensions: ['technical', 'communication', 'behavioral', 'cultural_fit'],
        metrics: ['score'],
        colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        layout: { responsive: true, maintainAspectRatio: false },
        filters: []
      },
      interactive: true,
      exportable: true
    })

    // Bar chart for overall scores
    visualizations.push({
      id: 'overall_scores',
      type: VisualizationType.BAR_CHART,
      title: 'Overall Score Comparison',
      description: 'Side-by-side comparison of overall assessment scores',
      data: {
        candidates: candidates.map(c => ({
          name: c.name,
          score: c.overallScore
        }))
      },
      configuration: {
        chartType: 'bar',
        dimensions: ['name'],
        metrics: ['score'],
        colors: ['#36A2EB'],
        layout: { responsive: true },
        filters: []
      },
      interactive: false,
      exportable: true
    })

    return visualizations
  }

  // Helper methods
  private generateComparisonId(candidateIds: string[], criteria?: ComparisonCriteria[]): string {
    const sortedIds = [...candidateIds].sort()
    const criteriaHash = criteria ? JSON.stringify(criteria) : 'default'
    return `comparison_${sortedIds.join('_')}_${criteriaHash.slice(0, 8)}`
  }

  private async loadCandidateData(candidateIds: string[]): Promise<CandidateListItem[]> {
    // Mock implementation - would fetch from candidate management service
    return candidateIds.map(id => ({
      id,
      name: `Candidate ${id}`,
      email: `candidate${id}@example.com`,
      position: 'Software Engineer',
      status: 'completed' as any,
      overallScore: Math.floor(Math.random() * 30) + 70, // 70-100
      lastInteraction: new Date(),
      profileSummary: {
        experienceLevel: 'senior' as any,
        keySkills: [
          { skill: 'JavaScript', proficiency: 'expert' as any, verified: true, confidence: 0.9, relevance: 0.9 },
          { skill: 'React', proficiency: 'advanced' as any, verified: true, confidence: 0.8, relevance: 0.8 }
        ],
        strengths: ['Strong technical skills', 'Good communication'],
        concerns: [],
        culturalFit: 0.8,
        communicationScore: Math.floor(Math.random() * 20) + 70,
        technicalScore: Math.floor(Math.random() * 20) + 75,
        behavioralScore: Math.floor(Math.random() * 20) + 70
      },
      tags: [],
      priority: 'medium' as any,
      source: 'job_board' as any,
      recruiterNotes: [],
      flagged: false
    }))
  }

  private extractYearsOfExperience(candidate: CandidateListItem): number {
    // Mock implementation - would extract from profile data
    const experienceLevels = {
      'entry': 1,
      'junior': 2,
      'mid': 4,
      'senior': 7,
      'lead': 10,
      'principal': 12,
      'executive': 15
    }
    return experienceLevels[candidate.profileSummary.experienceLevel as keyof typeof experienceLevels] || 5
  }

  private async identifyStrengths(candidate: CandidateListItem): Promise<string[]> {
    const strengths: string[] = []
    
    if (candidate.profileSummary.technicalScore > 80) {
      strengths.push('Exceptional technical skills')
    }
    if (candidate.profileSummary.communicationScore > 85) {
      strengths.push('Outstanding communication abilities')
    }
    if (candidate.profileSummary.culturalFit > 0.8) {
      strengths.push('Strong cultural alignment')
    }
    
    return strengths.length > 0 ? strengths : ['Solid all-around performance']
  }

  private async identifyWeaknesses(candidate: CandidateListItem): Promise<string[]> {
    const weaknesses: string[] = []
    
    if (candidate.profileSummary.technicalScore < 70) {
      weaknesses.push('Technical skills need development')
    }
    if (candidate.profileSummary.communicationScore < 65) {
      weaknesses.push('Communication could be improved')
    }
    if (candidate.profileSummary.culturalFit < 0.6) {
      weaknesses.push('Cultural fit concerns')
    }
    
    return weaknesses
  }

  private async identifyDifferentiators(candidate: CandidateListItem, allCandidates: CandidateListItem[]): Promise<string[]> {
    const differentiators: string[] = []
    
    // Find areas where this candidate significantly outperforms others
    const avgTechnical = allCandidates.reduce((sum, c) => sum + c.profileSummary.technicalScore, 0) / allCandidates.length
    const avgCommunication = allCandidates.reduce((sum, c) => sum + c.profileSummary.communicationScore, 0) / allCandidates.length
    
    if (candidate.profileSummary.technicalScore > avgTechnical + 10) {
      differentiators.push('Significantly stronger technical skills than peers')
    }
    if (candidate.profileSummary.communicationScore > avgCommunication + 10) {
      differentiators.push('Superior communication abilities')
    }
    
    return differentiators
  }

  private async identifyRiskFactors(candidate: CandidateListItem): Promise<RiskFactor[]> {
    const riskFactors: RiskFactor[] = []
    
    if (candidate.profileSummary.technicalScore < 65) {
      riskFactors.push({
        type: RiskType.TECHNICAL_SKILLS,
        severity: RiskSeverity.MEDIUM,
        description: 'Technical skills below role requirements',
        impact: 'May struggle with complex technical tasks',
        mitigation: ['Additional technical training', 'Mentorship program', 'Gradual responsibility increase'],
        probability: 0.6
      })
    }
    
    if (candidate.profileSummary.culturalFit < 0.6) {
      riskFactors.push({
        type: RiskType.CULTURAL_FIT,
        severity: RiskSeverity.HIGH,
        description: 'Cultural alignment concerns identified',
        impact: 'Potential team integration challenges',
        mitigation: ['Cultural onboarding program', 'Team integration activities', 'Regular check-ins'],
        probability: 0.7
      })
    }
    
    return riskFactors
  }

  private async calculateFitScore(candidate: CandidateListItem): Promise<number> {
    // Calculate weighted fit score based on multiple factors
    const weights = {
      technical: 0.4,
      communication: 0.2,
      cultural: 0.25,
      experience: 0.15
    }
    
    const scores = {
      technical: candidate.profileSummary.technicalScore / 100,
      communication: candidate.profileSummary.communicationScore / 100,
      cultural: candidate.profileSummary.culturalFit,
      experience: Math.min(this.extractYearsOfExperience(candidate) / 10, 1) // Normalize to 0-1
    }
    
    return Object.entries(weights).reduce((sum, [key, weight]) => {
      return sum + (scores[key as keyof typeof scores] * weight)
    }, 0) * 100
  }

  // Additional helper methods would continue here...
  
  private getDefaultCriteria(): ComparisonCriteria[] {
    return [
      {
        criterionId: 'technical_skills',
        name: 'Technical Skills',
        weight: 0.4,
        description: 'Programming and technical competency',
        measurableOutcome: 'Ability to perform technical tasks effectively',
        scoringMethod: ScoringMethod.WEIGHTED_AVERAGE,
        benchmarks: [
          { level: 'Expert', score: 90, description: 'Advanced technical proficiency', examples: ['Complex problem solving', 'Architecture design'] },
          { level: 'Proficient', score: 75, description: 'Good technical skills', examples: ['Independent development', 'Code reviews'] },
          { level: 'Developing', score: 60, description: 'Basic technical competency', examples: ['Guided development', 'Learning mindset'] }
        ],
        importance: CriteriaImportance.CRITICAL
      },
      {
        criterionId: 'communication',
        name: 'Communication Skills',
        weight: 0.25,
        description: 'Verbal and written communication effectiveness',
        measurableOutcome: 'Clear and effective communication with team and stakeholders',
        scoringMethod: ScoringMethod.RUBRIC_BASED,
        benchmarks: [
          { level: 'Excellent', score: 90, description: 'Outstanding communication', examples: ['Clear presentations', 'Effective collaboration'] },
          { level: 'Good', score: 75, description: 'Solid communication skills', examples: ['Clear explanations', 'Active listening'] },
          { level: 'Adequate', score: 60, description: 'Basic communication ability', examples: ['Understandable responses', 'Willingness to engage'] }
        ],
        importance: CriteriaImportance.REQUIRED
      }
    ]
  }

  // More helper method implementations would continue...
}

// Supporting interfaces for helper methods
interface ComparisonOptions {
  forceRefresh?: boolean
  includeAnalytics?: boolean
  weightingStrategy?: WeightingStrategy
}

enum WeightingStrategy {
  EQUAL = 'equal',
  ROLE_BASED = 'role_based',
  CUSTOM = 'custom'
}

interface RoleAdvancement {
  role: string
  duration: number
  level: number
}

interface StabilityAnalysis {
  averageTenure: number
  turnoverRisk: number
  stabilityScore: number
  factors: string[]
}

interface GrowthTrajectory {
  candidateId: string
  projectedGrowth: number
  timeToPromotion: number
  growthFactors: string[]
  limitations: string[]
}

interface InterpersonalSkillsComparison {
  empathy: { [candidateId: string]: number }
  activeListening: { [candidateId: string]: number }
  conflictResolution: { [candidateId: string]: number }
  teamCollaboration: { [candidateId: string]: number }
}

interface PresentationSkillsComparison {
  confidence: { [candidateId: string]: number }
  organization: { [candidateId: string]: number }
  delivery: { [candidateId: string]: number }
  audienceEngagement: { [candidateId: string]: number }
}

interface CulturalCommunicationComparison {
  culturalAwareness: { [candidateId: string]: number }
  adaptability: { [candidateId: string]: number }
  inclusivity: { [candidateId: string]: number }
  globalMindset: { [candidateId: string]: number }
}

interface WorkStyleFit {
  workStyle: string
  candidateFit: { [candidateId: string]: number }
  importance: number
  description: string
}

interface TeamCompatibility {
  teamRole: string
  candidateFit: { [candidateId: string]: number }
  synergy: number
  evidence: { [candidateId: string]: string[] }
}

interface AdaptabilityComparison {
  changeManagement: { [candidateId: string]: number }
  learningAgility: { [candidateId: string]: number }
  resilience: { [candidateId: string]: number }
  flexibility: { [candidateId: string]: number }
}

interface CultureContribution {
  contributionType: string
  candidatePotential: { [candidateId: string]: number }
  impact: number
  evidence: { [candidateId: string]: string[] }
}

interface LayoutOptions {
  responsive: boolean
  maintainAspectRatio?: boolean
}

interface FilterOptions {
  field: string
  options: string[]
  multiSelect: boolean
}

// Singleton instance
export const candidateComparisonService = new CandidateComparisonService()