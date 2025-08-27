import { ScoreResult, SkillScore, CommunicationMetric } from '../candidate/scoringEngine'
import { CandidateListItem } from './candidateManagement'

export interface ScoreVisualizationData {
  candidateId: string
  candidateName: string
  position: string
  overallScore: number
  categoryScores: CategoryScore[]
  skillBreakdown: SkillBreakdown[]
  comparisonMetrics: ComparisonMetric[]
  progressionData: ProgressionPoint[]
  insights: ScoreInsight[]
  recommendations: ScoreRecommendation[]
  confidenceMetrics: ConfidenceMetric[]
  benchmarkData: BenchmarkData
}

export interface CategoryScore {
  category: ScoreCategory
  score: number
  weight: number
  maxScore: number
  percentile: number
  trend: TrendDirection
  subCategories: SubCategoryScore[]
  description: string
  criticalAreas: string[]
  strengths: string[]
}

export interface SubCategoryScore {
  name: string
  score: number
  maxScore: number
  weight: number
  description: string
  evidence: string[]
}

export interface SkillBreakdown {
  skillName: string
  proficiencyLevel: ProficiencyLevel
  assessedScore: number
  targetScore: number
  gap: number
  assessmentMethod: AssessmentMethod
  confidence: number
  relevanceWeight: number
  industryBenchmark: number
  recommendations: string[]
  evidence: SkillEvidence[]
}

export interface SkillEvidence {
  type: EvidenceType
  description: string
  strength: EvidenceStrength
  source: string
  timestamp: Date
}

export interface ComparisonMetric {
  metricName: string
  candidateValue: number
  averageValue: number
  topPerformerValue: number
  percentileRank: number
  industryBenchmark: number
  visualizationType: VisualizationType
  context: string
}

export interface ProgressionPoint {
  timestamp: Date
  phase: string
  score: number
  category: ScoreCategory
  notes: string
  milestone?: string
  quality: ProgressionQuality
}

export interface ScoreInsight {
  id: string
  type: InsightType
  category: ScoreCategory
  title: string
  description: string
  severity: InsightSeverity
  confidence: number
  supportingData: any[]
  actionable: boolean
  priority: InsightPriority
}

export interface ScoreRecommendation {
  id: string
  type: RecommendationType
  title: string
  description: string
  impact: ImpactLevel
  effort: EffortLevel
  timeline: string
  success_criteria: string[]
  resources: string[]
  priority: RecommendationPriority
}

export interface ConfidenceMetric {
  aspect: string
  confidence: number
  dataPoints: number
  assessmentDepth: AssessmentDepth
  factors: ConfidenceFactor[]
}

export interface ConfidenceFactor {
  factor: string
  impact: number
  description: string
}

export interface BenchmarkData {
  roleBasedBenchmarks: RoleBenchmark[]
  industryBenchmarks: IndustryBenchmark[]
  experienceLevelBenchmarks: ExperienceBenchmark[]
  companyBenchmarks: CompanyBenchmark[]
  timeBasedTrends: TrendData[]
}

export interface RoleBenchmark {
  role: string
  averageScore: number
  percentileDistribution: PercentileData[]
  topSkills: TopSkill[]
  requirements: RequirementBenchmark[]
}

export interface IndustryBenchmark {
  industry: string
  averageScore: number
  trendDirection: TrendDirection
  keyMetrics: IndustryMetric[]
  marketContext: string
}

export interface ExperienceBenchmark {
  experienceLevel: string
  expectedScoreRange: ScoreRange
  typicalStrengths: string[]
  commonGaps: string[]
  progressionPath: string[]
}

export interface CompanyBenchmark {
  companySize: string
  cultureType: string
  averageScore: number
  preferredProfiles: ProfilePreference[]
  successFactors: string[]
}

export interface TrendData {
  period: string
  averageScore: number
  candidateCount: number
  trendDirection: TrendDirection
  significantChanges: string[]
}

export interface PercentileData {
  percentile: number
  scoreThreshold: number
  candidateCount: number
}

export interface TopSkill {
  skill: string
  importance: number
  averageProficiency: number
  demandTrend: TrendDirection
}

export interface RequirementBenchmark {
  requirement: string
  importance: number
  fulfillmentRate: number
  impact: number
}

export interface IndustryMetric {
  metric: string
  value: number
  trend: TrendDirection
  context: string
}

export interface ProfilePreference {
  trait: string
  weight: number
  description: string
}

export interface ScoreRange {
  min: number
  max: number
  target: number
}

export interface ScoreDistributionData {
  totalCandidates: number
  scoreRanges: ScoreRangeData[]
  percentileBreakdown: PercentileBreakdown[]
  outliers: OutlierData[]
  trends: ScoreTrend[]
}

export interface ScoreRangeData {
  range: string
  count: number
  percentage: number
  averageScore: number
  label: string
  color: string
}

export interface PercentileBreakdown {
  percentile: number
  score: number
  candidateCount: number
  characteristics: string[]
}

export interface OutlierData {
  candidateId: string
  candidateName: string
  score: number
  reason: string
  type: OutlierType
}

export interface ScoreTrend {
  period: string
  averageScore: number
  change: number
  significance: TrendSignificance
}

export interface HeatmapData {
  dimensions: HeatmapDimension[]
  dataPoints: HeatmapPoint[]
  colorScale: ColorScale
  annotations: HeatmapAnnotation[]
}

export interface HeatmapDimension {
  name: string
  values: string[]
  type: DimensionType
}

export interface HeatmapPoint {
  x: string
  y: string
  value: number
  label?: string
  metadata?: any
}

export interface ColorScale {
  min: string
  max: string
  midpoint?: string
  type: ColorScaleType
}

export interface HeatmapAnnotation {
  x: string
  y: string
  text: string
  style: AnnotationStyle
}

export interface RadarChartData {
  axes: RadarAxis[]
  datasets: RadarDataset[]
  benchmarks: RadarBenchmark[]
  configuration: RadarConfiguration
}

export interface RadarAxis {
  label: string
  min: number
  max: number
  weight: number
  description: string
}

export interface RadarDataset {
  label: string
  data: number[]
  color: string
  fillOpacity: number
  strokeWidth: number
}

export interface RadarBenchmark {
  label: string
  data: number[]
  style: BenchmarkStyle
}

export interface RadarConfiguration {
  gridLines: boolean
  angleLines: boolean
  pointStyle: string
  animations: boolean
}

// Enums
export enum ScoreCategory {
  TECHNICAL_SKILLS = 'technical_skills',
  COMMUNICATION = 'communication',
  PROBLEM_SOLVING = 'problem_solving',
  BEHAVIORAL = 'behavioral',
  CULTURAL_FIT = 'cultural_fit',
  LEADERSHIP = 'leadership',
  CREATIVITY = 'creativity',
  ADAPTABILITY = 'adaptability'
}

export enum ProficiencyLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

export enum AssessmentMethod {
  CONVERSATION = 'conversation',
  TECHNICAL_QUESTION = 'technical_question',
  BEHAVIORAL_QUESTION = 'behavioral_question',
  PROBLEM_SOLVING = 'problem_solving',
  CODE_REVIEW = 'code_review',
  SITUATIONAL = 'situational'
}

export enum EvidenceType {
  DIRECT_ANSWER = 'direct_answer',
  BEHAVIORAL_EXAMPLE = 'behavioral_example',
  TECHNICAL_DEMONSTRATION = 'technical_demonstration',
  COMMUNICATION_PATTERN = 'communication_pattern',
  PROBLEM_SOLVING_APPROACH = 'problem_solving_approach'
}

export enum EvidenceStrength {
  WEAK = 'weak',
  MODERATE = 'moderate',
  STRONG = 'strong',
  VERY_STRONG = 'very_strong'
}

export enum VisualizationType {
  BAR_CHART = 'bar_chart',
  LINE_CHART = 'line_chart',
  RADAR_CHART = 'radar_chart',
  HEATMAP = 'heatmap',
  SCATTER_PLOT = 'scatter_plot',
  GAUGE = 'gauge',
  PROGRESS_BAR = 'progress_bar'
}

export enum TrendDirection {
  INCREASING = 'increasing',
  DECREASING = 'decreasing',
  STABLE = 'stable',
  VOLATILE = 'volatile'
}

export enum ProgressionQuality {
  EXCELLENT = 'excellent',
  GOOD = 'good',
  FAIR = 'fair',
  POOR = 'poor'
}

export enum InsightType {
  STRENGTH = 'strength',
  WEAKNESS = 'weakness',
  OPPORTUNITY = 'opportunity',
  RISK = 'risk',
  ANOMALY = 'anomaly',
  PATTERN = 'pattern'
}

export enum InsightSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum InsightPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export enum RecommendationType {
  IMPROVEMENT = 'improvement',
  DEVELOPMENT = 'development',
  TRAINING = 'training',
  MENTORING = 'mentoring',
  ROLE_ADJUSTMENT = 'role_adjustment',
  FURTHER_ASSESSMENT = 'further_assessment'
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
  SIGNIFICANT = 'significant'
}

export enum RecommendationPriority {
  IMMEDIATE = 'immediate',
  SHORT_TERM = 'short_term',
  MEDIUM_TERM = 'medium_term',
  LONG_TERM = 'long_term'
}

export enum AssessmentDepth {
  SURFACE = 'surface',
  MODERATE = 'moderate',
  DEEP = 'deep',
  COMPREHENSIVE = 'comprehensive'
}

export enum OutlierType {
  HIGH_PERFORMER = 'high_performer',
  UNDERPERFORMER = 'underperformer',
  INCONSISTENT = 'inconsistent',
  SPECIALIZED = 'specialized'
}

export enum TrendSignificance {
  NOT_SIGNIFICANT = 'not_significant',
  MODERATE = 'moderate',
  SIGNIFICANT = 'significant',
  HIGHLY_SIGNIFICANT = 'highly_significant'
}

export enum DimensionType {
  CATEGORICAL = 'categorical',
  NUMERICAL = 'numerical',
  TEMPORAL = 'temporal'
}

export enum ColorScaleType {
  LINEAR = 'linear',
  LOGARITHMIC = 'logarithmic',
  CATEGORICAL = 'categorical'
}

export enum AnnotationStyle {
  LABEL = 'label',
  ARROW = 'arrow',
  HIGHLIGHT = 'highlight',
  CALLOUT = 'callout'
}

export enum BenchmarkStyle {
  SOLID_LINE = 'solid_line',
  DASHED_LINE = 'dashed_line',
  DOTTED_LINE = 'dotted_line',
  FILLED_AREA = 'filled_area'
}

export class ScoreVisualizationService {
  private scoreCache: Map<string, ScoreVisualizationData> = new Map()
  private benchmarkData: BenchmarkData | null = null
  private distributionCache: Map<string, ScoreDistributionData> = new Map()

  // Main visualization data generation
  async generateVisualizationData(candidateId: string, scoreResult: ScoreResult): Promise<ScoreVisualizationData> {
    // Check cache first
    const cached = this.scoreCache.get(candidateId)
    if (cached && this.isCacheValid(cached)) {
      return cached
    }

    const candidate = await this.getCandidateData(candidateId)
    if (!candidate) {
      throw new Error(`Candidate ${candidateId} not found`)
    }

    // Generate comprehensive visualization data
    const visualizationData: ScoreVisualizationData = {
      candidateId,
      candidateName: candidate.name,
      position: candidate.position,
      overallScore: scoreResult.overallScore,
      categoryScores: await this.generateCategoryScores(scoreResult),
      skillBreakdown: await this.generateSkillBreakdown(scoreResult),
      comparisonMetrics: await this.generateComparisonMetrics(scoreResult, candidate),
      progressionData: await this.generateProgressionData(candidateId),
      insights: await this.generateInsights(scoreResult, candidate),
      recommendations: await this.generateRecommendations(scoreResult, candidate),
      confidenceMetrics: await this.generateConfidenceMetrics(scoreResult),
      benchmarkData: await this.getBenchmarkData()
    }

    // Cache the result
    this.scoreCache.set(candidateId, visualizationData)

    return visualizationData
  }

  private async generateCategoryScores(scoreResult: ScoreResult): Promise<CategoryScore[]> {
    const categories: CategoryScore[] = []

    // Technical Skills Category
    if (scoreResult.categoryBreakdown.technical) {
      categories.push({
        category: ScoreCategory.TECHNICAL_SKILLS,
        score: scoreResult.categoryBreakdown.technical,
        weight: 0.4,
        maxScore: 100,
        percentile: await this.calculatePercentile(scoreResult.categoryBreakdown.technical, ScoreCategory.TECHNICAL_SKILLS),
        trend: TrendDirection.STABLE,
        subCategories: [
          {
            name: 'Programming Languages',
            score: scoreResult.skillScore * 0.9,
            maxScore: 100,
            weight: 0.5,
            description: 'Proficiency in required programming languages',
            evidence: ['Demonstrated JavaScript expertise', 'Strong TypeScript knowledge']
          },
          {
            name: 'System Design',
            score: scoreResult.skillScore * 0.8,
            maxScore: 100,
            weight: 0.3,
            description: 'Ability to design scalable systems',
            evidence: ['Described microservices architecture', 'Database design principles']
          }
        ],
        description: 'Technical competency and programming skills',
        criticalAreas: scoreResult.categoryBreakdown.technical < 60 ? ['Programming fundamentals', 'Problem-solving approach'] : [],
        strengths: scoreResult.categoryBreakdown.technical > 80 ? ['Strong technical foundation', 'Advanced concepts'] : []
      })
    }

    // Communication Category
    categories.push({
      category: ScoreCategory.COMMUNICATION,
      score: scoreResult.communicationScore,
      weight: 0.25,
      maxScore: 100,
      percentile: await this.calculatePercentile(scoreResult.communicationScore, ScoreCategory.COMMUNICATION),
      trend: TrendDirection.STABLE,
      subCategories: [
        {
          name: 'Clarity',
          score: scoreResult.communicationMetrics.clarity,
          maxScore: 100,
          weight: 0.4,
          description: 'Clear and understandable communication',
          evidence: ['Well-structured responses', 'Appropriate technical vocabulary']
        },
        {
          name: 'Engagement',
          score: scoreResult.communicationMetrics.engagement,
          maxScore: 100,
          weight: 0.3,
          description: 'Active participation and enthusiasm',
          evidence: ['Asked thoughtful questions', 'Showed genuine interest']
        }
      ],
      description: 'Communication skills and interpersonal abilities',
      criticalAreas: scoreResult.communicationScore < 60 ? ['Verbal clarity', 'Active listening'] : [],
      strengths: scoreResult.communicationScore > 80 ? ['Excellent communication', 'Strong presentation skills'] : []
    })

    // Behavioral Category
    if (scoreResult.categoryBreakdown.behavioral) {
      categories.push({
        category: ScoreCategory.BEHAVIORAL,
        score: scoreResult.categoryBreakdown.behavioral,
        weight: 0.2,
        maxScore: 100,
        percentile: await this.calculatePercentile(scoreResult.categoryBreakdown.behavioral, ScoreCategory.BEHAVIORAL),
        trend: TrendDirection.STABLE,
        subCategories: [
          {
            name: 'Problem Solving',
            score: scoreResult.categoryBreakdown.behavioral * 0.9,
            maxScore: 100,
            weight: 0.4,
            description: 'Approach to solving complex problems',
            evidence: ['Structured problem-solving approach', 'Creative solutions']
          },
          {
            name: 'Teamwork',
            score: scoreResult.categoryBreakdown.behavioral * 0.85,
            maxScore: 100,
            weight: 0.3,
            description: 'Collaboration and team interaction skills',
            evidence: ['Positive team experiences', 'Conflict resolution examples']
          }
        ],
        description: 'Behavioral traits and soft skills',
        criticalAreas: scoreResult.categoryBreakdown.behavioral < 60 ? ['Team collaboration', 'Adaptability'] : [],
        strengths: scoreResult.categoryBreakdown.behavioral > 80 ? ['Strong leadership potential', 'Excellent team player'] : []
      })
    }

    return categories
  }

  private async generateSkillBreakdown(scoreResult: ScoreResult): Promise<SkillBreakdown[]> {
    const breakdown: SkillBreakdown[] = []

    // Process each skill score
    scoreResult.skillScores.forEach(skillScore => {
      const target = this.getTargetScoreForSkill(skillScore.skill)
      const gap = target - skillScore.score
      const industryBenchmark = this.getIndustryBenchmarkForSkill(skillScore.skill)

      breakdown.push({
        skillName: skillScore.skill,
        proficiencyLevel: this.mapScoreToProficiency(skillScore.score),
        assessedScore: skillScore.score,
        targetScore: target,
        gap,
        assessmentMethod: AssessmentMethod.CONVERSATION,
        confidence: skillScore.confidence,
        relevanceWeight: skillScore.relevance,
        industryBenchmark,
        recommendations: this.generateSkillRecommendations(skillScore, gap),
        evidence: [
          {
            type: EvidenceType.DIRECT_ANSWER,
            description: `Demonstrated ${skillScore.skill} knowledge through technical discussion`,
            strength: skillScore.score > 80 ? EvidenceStrength.STRONG : EvidenceStrength.MODERATE,
            source: 'Interview conversation',
            timestamp: new Date()
          }
        ]
      })
    })

    return breakdown
  }

  private async generateComparisonMetrics(scoreResult: ScoreResult, candidate: CandidateListItem): Promise<ComparisonMetric[]> {
    const metrics: ComparisonMetric[] = []

    // Overall score comparison
    metrics.push({
      metricName: 'Overall Score',
      candidateValue: scoreResult.overallScore,
      averageValue: await this.getAverageScore('overall'),
      topPerformerValue: await this.getTopPerformerScore('overall'),
      percentileRank: await this.calculatePercentile(scoreResult.overallScore, null),
      industryBenchmark: await this.getIndustryBenchmark('overall', candidate.position),
      visualizationType: VisualizationType.GAUGE,
      context: 'Compared to all candidates for similar positions'
    })

    // Technical score comparison
    if (scoreResult.skillScore) {
      metrics.push({
        metricName: 'Technical Skills',
        candidateValue: scoreResult.skillScore,
        averageValue: await this.getAverageScore('technical'),
        topPerformerValue: await this.getTopPerformerScore('technical'),
        percentileRank: await this.calculatePercentile(scoreResult.skillScore, ScoreCategory.TECHNICAL_SKILLS),
        industryBenchmark: await this.getIndustryBenchmark('technical', candidate.position),
        visualizationType: VisualizationType.BAR_CHART,
        context: 'Technical competency relative to role requirements'
      })
    }

    // Communication score comparison
    metrics.push({
      metricName: 'Communication',
      candidateValue: scoreResult.communicationScore,
      averageValue: await this.getAverageScore('communication'),
      topPerformerValue: await this.getTopPerformerScore('communication'),
      percentileRank: await this.calculatePercentile(scoreResult.communicationScore, ScoreCategory.COMMUNICATION),
      industryBenchmark: await this.getIndustryBenchmark('communication', candidate.position),
      visualizationType: VisualizationType.RADAR_CHART,
      context: 'Communication effectiveness in professional settings'
    })

    return metrics
  }

  private async generateProgressionData(candidateId: string): Promise<ProgressionPoint[]> {
    // Mock progression data - in real implementation, this would track scores over time during the interview
    const progression: ProgressionPoint[] = []
    const phases = ['Introduction', 'Background', 'Technical', 'Behavioral', 'Conclusion']
    
    phases.forEach((phase, index) => {
      const timestamp = new Date(Date.now() - (phases.length - index) * 10 * 60 * 1000) // 10 minutes apart
      const baseScore = 70 + Math.random() * 20 // Score between 70-90
      
      progression.push({
        timestamp,
        phase,
        score: Math.round(baseScore),
        category: index < 2 ? ScoreCategory.COMMUNICATION : index < 4 ? ScoreCategory.TECHNICAL_SKILLS : ScoreCategory.BEHAVIORAL,
        notes: `Completed ${phase} phase`,
        milestone: index === phases.length - 1 ? 'Interview Complete' : undefined,
        quality: baseScore > 85 ? ProgressionQuality.EXCELLENT : baseScore > 75 ? ProgressionQuality.GOOD : ProgressionQuality.FAIR
      })
    })

    return progression
  }

  private async generateInsights(scoreResult: ScoreResult, candidate: CandidateListItem): Promise<ScoreInsight[]> {
    const insights: ScoreInsight[] = []

    // Overall performance insight
    if (scoreResult.overallScore > 85) {
      insights.push({
        id: 'high_performer',
        type: InsightType.STRENGTH,
        category: ScoreCategory.TECHNICAL_SKILLS,
        title: 'Exceptional Overall Performance',
        description: 'Candidate demonstrates above-average performance across all assessment areas',
        severity: InsightSeverity.LOW,
        confidence: 0.9,
        supportingData: [scoreResult.overallScore, 'Top 15% of candidates'],
        actionable: false,
        priority: InsightPriority.HIGH
      })
    }

    // Technical skills insight
    const technicalGaps = scoreResult.skillScores.filter(s => s.score < 60)
    if (technicalGaps.length > 0) {
      insights.push({
        id: 'technical_gaps',
        type: InsightType.WEAKNESS,
        category: ScoreCategory.TECHNICAL_SKILLS,
        title: 'Technical Skill Gaps Identified',
        description: `Candidate shows lower proficiency in ${technicalGaps.map(g => g.skill).join(', ')}`,
        severity: InsightSeverity.MEDIUM,
        confidence: 0.8,
        supportingData: technicalGaps,
        actionable: true,
        priority: InsightPriority.HIGH
      })
    }

    // Communication insight
    if (scoreResult.communicationScore > 90) {
      insights.push({
        id: 'excellent_communication',
        type: InsightType.STRENGTH,
        category: ScoreCategory.COMMUNICATION,
        title: 'Outstanding Communication Skills',
        description: 'Candidate demonstrates exceptional clarity and engagement in communication',
        severity: InsightSeverity.LOW,
        confidence: 0.95,
        supportingData: [scoreResult.communicationMetrics],
        actionable: false,
        priority: InsightPriority.MEDIUM
      })
    }

    // Growth potential insight
    const skillVariance = this.calculateSkillVariance(scoreResult.skillScores)
    if (skillVariance > 20) {
      insights.push({
        id: 'uneven_skills',
        type: InsightType.PATTERN,
        category: ScoreCategory.TECHNICAL_SKILLS,
        title: 'Uneven Skill Distribution',
        description: 'Candidate shows significant variation in skill proficiency levels',
        severity: InsightSeverity.MEDIUM,
        confidence: 0.7,
        supportingData: [skillVariance, scoreResult.skillScores],
        actionable: true,
        priority: InsightPriority.MEDIUM
      })
    }

    return insights
  }

  private async generateRecommendations(scoreResult: ScoreResult, candidate: CandidateListItem): Promise<ScoreRecommendation[]> {
    const recommendations: ScoreRecommendation[] = []

    // High performer recommendation
    if (scoreResult.overallScore > 85) {
      recommendations.push({
        id: 'fast_track',
        type: RecommendationType.ROLE_ADJUSTMENT,
        title: 'Consider Fast-Track Hiring Process',
        description: 'Candidate shows exceptional performance and should be prioritized',
        impact: ImpactLevel.HIGH,
        effort: EffortLevel.LOW,
        timeline: 'Immediate',
        success_criteria: ['Expedited interview process', 'Senior role consideration'],
        resources: ['Hiring manager approval', 'Background check acceleration'],
        priority: RecommendationPriority.IMMEDIATE
      })
    }

    // Technical improvement recommendation
    const lowSkills = scoreResult.skillScores.filter(s => s.score < 70)
    if (lowSkills.length > 0) {
      recommendations.push({
        id: 'technical_development',
        type: RecommendationType.TRAINING,
        title: 'Technical Skills Development Plan',
        description: `Provide targeted training in ${lowSkills.map(s => s.skill).join(', ')}`,
        impact: ImpactLevel.MEDIUM,
        effort: EffortLevel.MEDIUM,
        timeline: '3-6 months',
        success_criteria: ['Skill assessment improvement', 'Project application'],
        resources: ['Training budget', 'Mentorship program', 'Online courses'],
        priority: RecommendationPriority.SHORT_TERM
      })
    }

    // Further assessment recommendation
    if (scoreResult.confidence < 0.7) {
      recommendations.push({
        id: 'additional_assessment',
        type: RecommendationType.FURTHER_ASSESSMENT,
        title: 'Additional Technical Assessment',
        description: 'Conduct hands-on technical assessment to validate skills',
        impact: ImpactLevel.MEDIUM,
        effort: EffortLevel.MEDIUM,
        timeline: '1-2 weeks',
        success_criteria: ['Practical skill demonstration', 'Code quality evaluation'],
        resources: ['Technical interviewer', 'Assessment platform'],
        priority: RecommendationPriority.SHORT_TERM
      })
    }

    return recommendations
  }

  private async generateConfidenceMetrics(scoreResult: ScoreResult): Promise<ConfidenceMetric[]> {
    const metrics: ConfidenceMetric[] = []

    // Overall assessment confidence
    metrics.push({
      aspect: 'Overall Assessment',
      confidence: scoreResult.confidence,
      dataPoints: scoreResult.skillScores.length + 3, // Skills + communication + behavioral
      assessmentDepth: scoreResult.skillScores.length > 5 ? AssessmentDepth.COMPREHENSIVE : AssessmentDepth.MODERATE,
      factors: [
        {
          factor: 'Response Quality',
          impact: 0.3,
          description: 'Quality and depth of candidate responses'
        },
        {
          factor: 'Assessment Coverage',
          impact: 0.25,
          description: 'Breadth of skills and areas assessed'
        },
        {
          factor: 'Consistency',
          impact: 0.2,
          description: 'Consistency across different assessment areas'
        },
        {
          factor: 'Time Depth',
          impact: 0.25,
          description: 'Duration and depth of evaluation'
        }
      ]
    })

    // Technical skills confidence
    const avgTechnicalConfidence = scoreResult.skillScores.reduce((sum, s) => sum + s.confidence, 0) / scoreResult.skillScores.length
    metrics.push({
      aspect: 'Technical Skills',
      confidence: avgTechnicalConfidence,
      dataPoints: scoreResult.skillScores.length,
      assessmentDepth: AssessmentDepth.DEEP,
      factors: [
        {
          factor: 'Direct Demonstration',
          impact: 0.4,
          description: 'Practical skill demonstration'
        },
        {
          factor: 'Knowledge Depth',
          impact: 0.35,
          description: 'Understanding of advanced concepts'
        },
        {
          factor: 'Problem Solving',
          impact: 0.25,
          description: 'Approach to technical challenges'
        }
      ]
    })

    return metrics
  }

  // Score distribution and analytics
  async generateScoreDistribution(filters?: any): Promise<ScoreDistributionData> {
    const cacheKey = JSON.stringify(filters || {})
    const cached = this.distributionCache.get(cacheKey)
    if (cached) return cached

    // Mock distribution data - in real implementation, this would query actual candidate data
    const totalCandidates = 250
    const scoreRanges: ScoreRangeData[] = [
      { range: '0-20', count: 5, percentage: 2, averageScore: 15, label: 'Poor', color: '#ff4444' },
      { range: '21-40', count: 15, percentage: 6, averageScore: 32, label: 'Below Average', color: '#ff8844' },
      { range: '41-60', count: 45, percentage: 18, averageScore: 52, label: 'Average', color: '#ffcc44' },
      { range: '61-80', count: 120, percentage: 48, averageScore: 71, label: 'Good', color: '#88cc44' },
      { range: '81-100', count: 65, percentage: 26, averageScore: 87, label: 'Excellent', color: '#44cc44' }
    ]

    const percentileBreakdown: PercentileBreakdown[] = [
      { percentile: 90, score: 85, candidateCount: 25, characteristics: ['Exceptional skills', 'Strong communication'] },
      { percentile: 75, score: 78, candidateCount: 63, characteristics: ['Good technical skills', 'Above average communication'] },
      { percentile: 50, score: 68, candidateCount: 125, characteristics: ['Adequate skills', 'Average performance'] },
      { percentile: 25, score: 55, candidateCount: 188, characteristics: ['Basic skills', 'Needs development'] }
    ]

    const outliers: OutlierData[] = [
      { candidateId: '1', candidateName: 'Alice Johnson', score: 95, reason: 'Exceptional across all areas', type: OutlierType.HIGH_PERFORMER },
      { candidateId: '15', candidateName: 'Bob Wilson', score: 25, reason: 'Significantly below expectations', type: OutlierType.UNDERPERFORMER }
    ]

    const trends: ScoreTrend[] = [
      { period: 'Last Month', averageScore: 72, change: 2.5, significance: TrendSignificance.MODERATE },
      { period: 'Last Quarter', averageScore: 69.5, change: -1.2, significance: TrendSignificance.NOT_SIGNIFICANT },
      { period: 'Last Year', averageScore: 68, change: 4, significance: TrendSignificance.SIGNIFICANT }
    ]

    const distribution: ScoreDistributionData = {
      totalCandidates,
      scoreRanges,
      percentileBreakdown,
      outliers,
      trends
    }

    this.distributionCache.set(cacheKey, distribution)
    return distribution
  }

  // Heatmap generation for skill correlation analysis
  async generateSkillCorrelationHeatmap(candidateIds: string[]): Promise<HeatmapData> {
    const skills = ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'SQL', 'AWS', 'Docker']
    
    const dimensions: HeatmapDimension[] = [
      { name: 'Skill 1', values: skills, type: DimensionType.CATEGORICAL },
      { name: 'Skill 2', values: skills, type: DimensionType.CATEGORICAL }
    ]

    const dataPoints: HeatmapPoint[] = []
    
    // Generate correlation data
    skills.forEach(skill1 => {
      skills.forEach(skill2 => {
        const correlation = skill1 === skill2 ? 1.0 : Math.random() * 0.8 + 0.1 // Random correlation between 0.1-0.9
        dataPoints.push({
          x: skill1,
          y: skill2,
          value: correlation,
          label: `${(correlation * 100).toFixed(0)}%`,
          metadata: { skill1, skill2, candidateCount: candidateIds.length }
        })
      })
    })

    const colorScale: ColorScale = {
      min: '#ffffff',
      max: '#4CAF50',
      midpoint: '#FFC107',
      type: ColorScaleType.LINEAR
    }

    const annotations: HeatmapAnnotation[] = [
      {
        x: 'JavaScript',
        y: 'TypeScript',
        text: 'High Correlation',
        style: AnnotationStyle.CALLOUT
      }
    ]

    return {
      dimensions,
      dataPoints,
      colorScale,
      annotations
    }
  }

  // Radar chart data for multi-dimensional skill comparison
  async generateSkillRadarChart(candidateIds: string[]): Promise<RadarChartData> {
    const axes: RadarAxis[] = [
      { label: 'Technical Skills', min: 0, max: 100, weight: 0.3, description: 'Programming and technical competency' },
      { label: 'Communication', min: 0, max: 100, weight: 0.2, description: 'Verbal and written communication' },
      { label: 'Problem Solving', min: 0, max: 100, weight: 0.25, description: 'Analytical and creative thinking' },
      { label: 'Leadership', min: 0, max: 100, weight: 0.15, description: 'Team leadership and influence' },
      { label: 'Adaptability', min: 0, max: 100, weight: 0.1, description: 'Flexibility and learning agility' }
    ]

    const datasets: RadarDataset[] = candidateIds.slice(0, 3).map((candidateId, index) => {
      const colors = ['#FF6384', '#36A2EB', '#FFCE56']
      return {
        label: `Candidate ${index + 1}`,
        data: axes.map(() => Math.floor(Math.random() * 40) + 60), // Random scores 60-100
        color: colors[index],
        fillOpacity: 0.2,
        strokeWidth: 2
      }
    })

    const benchmarks: RadarBenchmark[] = [
      {
        label: 'Industry Average',
        data: [75, 70, 72, 65, 68],
        style: BenchmarkStyle.DASHED_LINE
      },
      {
        label: 'Role Requirement',
        data: [85, 75, 80, 70, 75],
        style: BenchmarkStyle.DOTTED_LINE
      }
    ]

    const configuration: RadarConfiguration = {
      gridLines: true,
      angleLines: true,
      pointStyle: 'circle',
      animations: true
    }

    return {
      axes,
      datasets,
      benchmarks,
      configuration
    }
  }

  // Utility methods
  private async getCandidateData(candidateId: string): Promise<CandidateListItem | null> {
    // This would typically fetch from the candidate management service
    return {
      id: candidateId,
      name: 'John Doe',
      email: 'john@example.com',
      position: 'Software Engineer',
      status: 'completed' as any,
      overallScore: 0,
      lastInteraction: new Date(),
      profileSummary: {} as any,
      tags: [],
      priority: 'medium' as any,
      source: 'job_board' as any,
      recruiterNotes: [],
      flagged: false
    }
  }

  private async calculatePercentile(score: number, category: ScoreCategory | null): Promise<number> {
    // Mock percentile calculation
    if (score >= 90) return 95
    if (score >= 80) return 85
    if (score >= 70) return 70
    if (score >= 60) return 50
    if (score >= 50) return 30
    return 15
  }

  private async getAverageScore(category: string): Promise<number> {
    const averages = {
      overall: 72,
      technical: 68,
      communication: 75,
      behavioral: 70
    }
    return averages[category as keyof typeof averages] || 70
  }

  private async getTopPerformerScore(category: string): Promise<number> {
    const topScores = {
      overall: 92,
      technical: 88,
      communication: 95,
      behavioral: 90
    }
    return topScores[category as keyof typeof topScores] || 90
  }

  private async getIndustryBenchmark(category: string, position: string): Promise<number> {
    // Mock industry benchmark data
    const benchmarks = {
      overall: 75,
      technical: 72,
      communication: 78,
      behavioral: 73
    }
    return benchmarks[category as keyof typeof benchmarks] || 75
  }

  private getTargetScoreForSkill(skill: string): number {
    // Mock target scores based on skill importance
    const targets = {
      'JavaScript': 85,
      'TypeScript': 80,
      'React': 85,
      'Node.js': 75,
      'Python': 70,
      'SQL': 70,
      'AWS': 65,
      'Docker': 60
    }
    return targets[skill as keyof typeof targets] || 70
  }

  private getIndustryBenchmarkForSkill(skill: string): number {
    // Mock industry benchmark scores
    const benchmarks = {
      'JavaScript': 75,
      'TypeScript': 70,
      'React': 78,
      'Node.js': 72,
      'Python': 68,
      'SQL': 65,
      'AWS': 60,
      'Docker': 55
    }
    return benchmarks[skill as keyof typeof benchmarks] || 65
  }

  private mapScoreToProficiency(score: number): ProficiencyLevel {
    if (score >= 85) return ProficiencyLevel.EXPERT
    if (score >= 70) return ProficiencyLevel.ADVANCED
    if (score >= 50) return ProficiencyLevel.INTERMEDIATE
    return ProficiencyLevel.BEGINNER
  }

  private generateSkillRecommendations(skillScore: SkillScore, gap: number): string[] {
    const recommendations: string[] = []
    
    if (gap > 20) {
      recommendations.push(`Significant improvement needed in ${skillScore.skill}`)
      recommendations.push(`Consider structured training program`)
      recommendations.push(`Pair with experienced developer`)
    } else if (gap > 10) {
      recommendations.push(`Some improvement recommended in ${skillScore.skill}`)
      recommendations.push(`Focus on practical application`)
    } else if (gap > 0) {
      recommendations.push(`Minor refinement in ${skillScore.skill}`)
      recommendations.push(`Consider advanced topics`)
    } else {
      recommendations.push(`Excellent ${skillScore.skill} skills`)
      recommendations.push(`Consider mentoring others`)
    }

    return recommendations
  }

  private calculateSkillVariance(skillScores: SkillScore[]): number {
    if (skillScores.length === 0) return 0
    
    const scores = skillScores.map(s => s.score)
    const mean = scores.reduce((a, b) => a + b, 0) / scores.length
    const variance = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scores.length
    
    return Math.sqrt(variance)
  }

  private async getBenchmarkData(): Promise<BenchmarkData> {
    if (this.benchmarkData) return this.benchmarkData

    // Mock benchmark data
    this.benchmarkData = {
      roleBasedBenchmarks: [
        {
          role: 'Software Engineer',
          averageScore: 72,
          percentileDistribution: [
            { percentile: 90, scoreThreshold: 85, candidateCount: 25 },
            { percentile: 50, scoreThreshold: 70, candidateCount: 125 }
          ],
          topSkills: [
            { skill: 'JavaScript', importance: 0.9, averageProficiency: 75, demandTrend: TrendDirection.INCREASING },
            { skill: 'React', importance: 0.8, averageProficiency: 70, demandTrend: TrendDirection.STABLE }
          ],
          requirements: [
            { requirement: 'Programming Skills', importance: 0.4, fulfillmentRate: 0.8, impact: 0.9 },
            { requirement: 'Problem Solving', importance: 0.3, fulfillmentRate: 0.75, impact: 0.85 }
          ]
        }
      ],
      industryBenchmarks: [
        {
          industry: 'Technology',
          averageScore: 74,
          trendDirection: TrendDirection.INCREASING,
          keyMetrics: [
            { metric: 'Technical Proficiency', value: 76, trend: TrendDirection.INCREASING, context: 'Rising standards' }
          ],
          marketContext: 'Competitive talent market with high demand for skilled developers'
        }
      ],
      experienceLevelBenchmarks: [
        {
          experienceLevel: 'Senior',
          expectedScoreRange: { min: 75, max: 95, target: 85 },
          typicalStrengths: ['Advanced technical skills', 'Leadership capabilities'],
          commonGaps: ['Latest framework knowledge', 'Cloud architecture'],
          progressionPath: ['Tech Lead', 'Principal Engineer', 'Engineering Manager']
        }
      ],
      companyBenchmarks: [
        {
          companySize: 'Large',
          cultureType: 'Innovation-focused',
          averageScore: 78,
          preferredProfiles: [
            { trait: 'Technical Excellence', weight: 0.4, description: 'Strong technical foundation' },
            { trait: 'Collaboration', weight: 0.3, description: 'Team-oriented approach' }
          ],
          successFactors: ['Continuous learning', 'Innovation mindset', 'Quality focus']
        }
      ],
      timeBasedTrends: [
        {
          period: '2024 Q1',
          averageScore: 73,
          candidateCount: 150,
          trendDirection: TrendDirection.INCREASING,
          significantChanges: ['Increased AI/ML skill requirements', 'Greater emphasis on system design']
        }
      ]
    }

    return this.benchmarkData
  }

  private isCacheValid(data: ScoreVisualizationData): boolean {
    // Cache is valid for 1 hour
    const cacheValidityMs = 60 * 60 * 1000
    // In real implementation, you'd track when the data was cached
    return true // Simplified for demo
  }

  // Public utility methods
  async clearCache(): Promise<void> {
    this.scoreCache.clear()
    this.distributionCache.clear()
    this.benchmarkData = null
  }

  async refreshBenchmarkData(): Promise<BenchmarkData> {
    this.benchmarkData = null
    return await this.getBenchmarkData()
  }

  async getVisualizationSummary(candidateIds: string[]): Promise<{
    averageScore: number
    scoreDistribution: { [range: string]: number }
    topPerformers: string[]
    improvementAreas: string[]
  }> {
    // Aggregate visualization data for multiple candidates
    const scores = candidateIds.map(() => Math.floor(Math.random() * 40) + 60) // Mock scores
    const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length

    const scoreDistribution = {
      'excellent': scores.filter(s => s >= 85).length,
      'good': scores.filter(s => s >= 70 && s < 85).length,
      'average': scores.filter(s => s >= 50 && s < 70).length,
      'poor': scores.filter(s => s < 50).length
    }

    return {
      averageScore,
      scoreDistribution,
      topPerformers: candidateIds.slice(0, 3), // Top 3 for demo
      improvementAreas: ['Technical depth', 'Communication clarity', 'Problem-solving approach']
    }
  }
}

// Singleton instance
export const scoreVisualizationService = new ScoreVisualizationService()