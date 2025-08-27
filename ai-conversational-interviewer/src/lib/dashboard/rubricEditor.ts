export interface InterviewRubric {
  id: string
  name: string
  description: string
  version: string
  createdBy: string
  createdAt: Date
  lastModified: Date
  status: RubricStatus
  categories: RubricCategory[]
  overallScoring: OverallScoringMethod
  weightingStrategy: WeightingStrategy
  validationRules: ValidationRule[]
  metadata: RubricMetadata
  usage: RubricUsage
  permissions: RubricPermissions
}

export interface RubricCategory {
  id: string
  name: string
  description: string
  weight: number
  criteria: RubricCriterion[]
  scoringMethod: CategoryScoringMethod
  minimumScore?: number
  benchmarks: CategoryBenchmark[]
  examples: CategoryExample[]
  order: number
  required: boolean
}

export interface RubricCriterion {
  id: string
  name: string
  description: string
  weight: number
  scoreRange: ScoreRange
  performanceLevels: PerformanceLevel[]
  indicators: QualityIndicator[]
  evidenceTypes: EvidenceType[]
  assessmentMethods: AssessmentMethod[]
  order: number
  required: boolean
  dependencies: CriterionDependency[]
}

export interface PerformanceLevel {
  id: string
  name: string
  description: string
  scoreRange: ScoreRange
  indicators: string[]
  examples: string[]
  evidenceRequirements: EvidenceRequirement[]
  color: string
  order: number
}

export interface QualityIndicator {
  id: string
  name: string
  description: string
  type: IndicatorType
  measurementMethod: MeasurementMethod
  targetValue?: number
  thresholds: IndicatorThreshold[]
  weight: number
}

export interface IndicatorThreshold {
  level: string
  minValue: number
  maxValue: number
  description: string
  color: string
}

export interface EvidenceRequirement {
  type: EvidenceType
  description: string
  required: boolean
  minimumItems: number
  validationCriteria: string[]
}

export interface CategoryBenchmark {
  level: string
  score: number
  description: string
  industryComparison: IndustryComparison
  roleComparison: RoleComparison
}

export interface CategoryExample {
  level: string
  scenario: string
  expectedResponse: string
  scoringNotes: string[]
  commonMistakes: string[]
}

export interface ValidationRule {
  id: string
  type: ValidationType
  description: string
  condition: string
  errorMessage: string
  severity: ValidationSeverity
  autoFix?: boolean
}

export interface RubricMetadata {
  tags: string[]
  industry: string[]
  roles: string[]
  experienceLevels: ExperienceLevel[]
  interviewTypes: InterviewType[]
  language: string
  region: string
  compliance: ComplianceInfo[]
}

export interface RubricUsage {
  timesUsed: number
  averageScore: number
  effectiveness: number
  userFeedback: UserFeedback[]
  successRate: number
  lastUsed: Date
  trendsData: UsageTrend[]
}

export interface RubricPermissions {
  owner: string
  editors: string[]
  viewers: string[]
  organizationAccess: OrganizationAccess
  publicAccess: PublicAccess
  shareSettings: ShareSettings
}

export interface RubricTemplate {
  id: string
  name: string
  description: string
  category: TemplateCategory
  baseRubric: Partial<InterviewRubric>
  customizationPoints: CustomizationPoint[]
  popularity: number
  tags: string[]
  createdBy: string
  verified: boolean
}

export interface CustomizationPoint {
  id: string
  name: string
  description: string
  type: CustomizationType
  options: CustomizationOption[]
  required: boolean
  defaultValue: any
}

export interface CustomizationOption {
  value: any
  label: string
  description: string
  impact: CustomizationImpact
}

export interface RubricValidationResult {
  isValid: boolean
  errors: ValidationError[]
  warnings: ValidationWarning[]
  suggestions: ValidationSuggestion[]
  completeness: number
  consistency: number
  recommendations: ValidationRecommendation[]
}

export interface ValidationError {
  id: string
  type: ErrorType
  field: string
  message: string
  severity: ErrorSeverity
  fixSuggestion?: string
  autoFixable: boolean
}

export interface ValidationWarning {
  id: string
  type: WarningType
  field: string
  message: string
  impact: WarningImpact
  recommendation: string
}

export interface ValidationSuggestion {
  id: string
  type: SuggestionType
  field: string
  message: string
  benefit: string
  effort: EffortLevel
  priority: SuggestionPriority
}

export interface ValidationRecommendation {
  id: string
  category: string
  title: string
  description: string
  actions: RecommendationAction[]
  impact: RecommendationImpact
  confidence: number
}

export interface RecommendationAction {
  action: string
  description: string
  automated: boolean
  effort: EffortLevel
}

export interface RubricAnalytics {
  overallMetrics: RubricMetrics
  categoryAnalysis: CategoryAnalysis[]
  criterionAnalysis: CriterionAnalysis[]
  usagePatterns: UsagePattern[]
  effectivenessMetrics: EffectivenessMetrics
  benchmarkComparison: BenchmarkComparison
  improvementSuggestions: ImprovementSuggestion[]
}

export interface RubricMetrics {
  totalAssessments: number
  averageScore: number
  scoreDistribution: ScoreDistribution[]
  reliability: number
  validity: number
  interRaterReliability: number
  completionRate: number
}

export interface CategoryAnalysis {
  categoryId: string
  averageScore: number
  scoreVariability: number
  discrimination: number
  predictivePower: number
  correlations: CategoryCorrelation[]
  trends: CategoryTrend[]
}

export interface CriterionAnalysis {
  criterionId: string
  averageScore: number
  difficulty: number
  reliability: number
  effectiveness: number
  commonIssues: string[]
  improvementSuggestions: string[]
}

export interface UsagePattern {
  pattern: string
  frequency: number
  context: string[]
  outcomes: PatternOutcome[]
  recommendations: string[]
}

export interface EffectivenessMetrics {
  predictiveAccuracy: number
  candidateExperience: number
  interviewerSatisfaction: number
  timeEfficiency: number
  costEffectiveness: number
  fairness: FairnessMetrics
}

export interface FairnessMetrics {
  overallFairness: number
  biasIndicators: BiasIndicator[]
  diversityImpact: DiversityImpact
  accessibility: AccessibilityMetrics
  compliance: ComplianceMetrics
}

export interface BiasIndicator {
  type: BiasType
  severity: BiasSeverity
  description: string
  affectedGroups: string[]
  mitigation: string[]
  confidence: number
}

export interface ExportOptions {
  format: ExportFormat
  includeAnalytics: boolean
  includeExamples: boolean
  includeMetadata: boolean
  customizations: ExportCustomization[]
}

export interface ImportOptions {
  source: ImportSource
  validationLevel: ValidationLevel
  conflictResolution: ConflictResolution
  preserveIds: boolean
  mergeStrategy: MergeStrategy
}

// Enums
export enum RubricStatus {
  DRAFT = 'draft',
  REVIEW = 'review',
  ACTIVE = 'active',
  ARCHIVED = 'archived',
  DEPRECATED = 'deprecated'
}

export enum WeightingStrategy {
  EQUAL = 'equal',
  CUSTOM = 'custom',
  PRIORITY_BASED = 'priority_based',
  ROLE_SPECIFIC = 'role_specific'
}

export enum CategoryScoringMethod {
  WEIGHTED_AVERAGE = 'weighted_average',
  HIGHEST_SCORE = 'highest_score',
  LOWEST_SCORE = 'lowest_score',
  MEDIAN = 'median',
  CUSTOM_FORMULA = 'custom_formula'
}

export enum OverallScoringMethod {
  WEIGHTED_CATEGORIES = 'weighted_categories',
  HOLISTIC = 'holistic',
  PASS_FAIL = 'pass_fail',
  COMPETENCY_BASED = 'competency_based'
}

export enum IndicatorType {
  QUANTITATIVE = 'quantitative',
  QUALITATIVE = 'qualitative',
  BINARY = 'binary',
  SCALE = 'scale',
  COMPOSITE = 'composite'
}

export enum MeasurementMethod {
  OBSERVATION = 'observation',
  STRUCTURED_QUESTION = 'structured_question',
  BEHAVIORAL_EXAMPLE = 'behavioral_example',
  SIMULATION = 'simulation',
  PORTFOLIO_REVIEW = 'portfolio_review'
}

export enum EvidenceType {
  VERBAL_RESPONSE = 'verbal_response',
  BEHAVIORAL_EXAMPLE = 'behavioral_example',
  TECHNICAL_DEMONSTRATION = 'technical_demonstration',
  PORTFOLIO_ITEM = 'portfolio_item',
  REFERENCE_CHECK = 'reference_check',
  ASSESSMENT_RESULT = 'assessment_result'
}

export enum AssessmentMethod {
  INTERVIEW_QUESTION = 'interview_question',
  CASE_STUDY = 'case_study',
  ROLE_PLAY = 'role_play',
  TECHNICAL_TEST = 'technical_test',
  PRESENTATION = 'presentation',
  GROUP_EXERCISE = 'group_exercise'
}

export enum ValidationType {
  REQUIRED_FIELD = 'required_field',
  RANGE_CHECK = 'range_check',
  CONSISTENCY_CHECK = 'consistency_check',
  COMPLETENESS_CHECK = 'completeness_check',
  LOGIC_CHECK = 'logic_check'
}

export enum ValidationSeverity {
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info'
}

export enum ExperienceLevel {
  ENTRY = 'entry',
  JUNIOR = 'junior',
  MID = 'mid',
  SENIOR = 'senior',
  LEAD = 'lead',
  EXECUTIVE = 'executive'
}

export enum InterviewType {
  PHONE_SCREENING = 'phone_screening',
  VIDEO_INTERVIEW = 'video_interview',
  TECHNICAL_ASSESSMENT = 'technical_assessment',
  BEHAVIORAL_INTERVIEW = 'behavioral_interview',
  PANEL_INTERVIEW = 'panel_interview',
  FINAL_INTERVIEW = 'final_interview'
}

export enum OrganizationAccess {
  PRIVATE = 'private',
  TEAM = 'team',
  DEPARTMENT = 'department',
  ORGANIZATION = 'organization'
}

export enum PublicAccess {
  NONE = 'none',
  VIEW_ONLY = 'view_only',
  COPY_ALLOWED = 'copy_allowed',
  FULLY_PUBLIC = 'fully_public'
}

export enum TemplateCategory {
  TECHNICAL = 'technical',
  BEHAVIORAL = 'behavioral',
  LEADERSHIP = 'leadership',
  SALES = 'sales',
  CUSTOMER_SERVICE = 'customer_service',
  GENERAL = 'general'
}

export enum CustomizationType {
  TEXT_INPUT = 'text_input',
  NUMBER_INPUT = 'number_input',
  DROPDOWN = 'dropdown',
  CHECKBOX = 'checkbox',
  WEIGHT_SLIDER = 'weight_slider',
  CATEGORY_SELECTOR = 'category_selector'
}

export enum CustomizationImpact {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum ErrorType {
  VALIDATION = 'validation',
  CONSISTENCY = 'consistency',
  COMPLETENESS = 'completeness',
  LOGIC = 'logic',
  FORMAT = 'format'
}

export enum ErrorSeverity {
  BLOCKING = 'blocking',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

export enum WarningType {
  BEST_PRACTICE = 'best_practice',
  USABILITY = 'usability',
  PERFORMANCE = 'performance',
  ACCESSIBILITY = 'accessibility'
}

export enum WarningImpact {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

export enum SuggestionType {
  IMPROVEMENT = 'improvement',
  OPTIMIZATION = 'optimization',
  FEATURE = 'feature',
  TEMPLATE = 'template'
}

export enum SuggestionPriority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

export enum EffortLevel {
  MINIMAL = 'minimal',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  EXTENSIVE = 'extensive'
}

export enum RecommendationImpact {
  TRANSFORMATIONAL = 'transformational',
  SIGNIFICANT = 'significant',
  MODERATE = 'moderate',
  MINOR = 'minor'
}

export enum BiasType {
  GENDER = 'gender',
  RACIAL = 'racial',
  AGE = 'age',
  EDUCATIONAL = 'educational',
  CULTURAL = 'cultural',
  SOCIOECONOMIC = 'socioeconomic'
}

export enum BiasSeverity {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

export enum ExportFormat {
  JSON = 'json',
  PDF = 'pdf',
  EXCEL = 'excel',
  CSV = 'csv',
  WORD = 'word'
}

export enum ImportSource {
  FILE = 'file',
  URL = 'url',
  TEMPLATE = 'template',
  COPY = 'copy'
}

export enum ValidationLevel {
  STRICT = 'strict',
  MODERATE = 'moderate',
  LENIENT = 'lenient'
}

export enum ConflictResolution {
  OVERWRITE = 'overwrite',
  MERGE = 'merge',
  SKIP = 'skip',
  PROMPT = 'prompt'
}

export enum MergeStrategy {
  REPLACE = 'replace',
  APPEND = 'append',
  SMART_MERGE = 'smart_merge'
}

export class RubricEditorService {
  private rubrics: Map<string, InterviewRubric> = new Map()
  private templates: Map<string, RubricTemplate> = new Map()
  private validationRules: Map<string, ValidationRule[]> = new Map()
  private analytics: Map<string, RubricAnalytics> = new Map()

  constructor() {
    this.initializeDefaultTemplates()
    this.initializeValidationRules()
  }

  private initializeDefaultTemplates(): void {
    const technicalTemplate: RubricTemplate = {
      id: 'technical_default',
      name: 'Technical Interview Rubric',
      description: 'Comprehensive technical assessment rubric for software engineers',
      category: TemplateCategory.TECHNICAL,
      baseRubric: {
        name: 'Technical Interview Assessment',
        description: 'Evaluates technical competency, problem-solving, and coding skills',
        categories: [
          {
            id: 'technical_skills',
            name: 'Technical Skills',
            description: 'Programming and technical competency',
            weight: 0.4,
            criteria: [
              {
                id: 'coding_ability',
                name: 'Coding Ability',
                description: 'Proficiency in writing clean, efficient code',
                weight: 0.5,
                scoreRange: { min: 0, max: 100 },
                performanceLevels: [
                  {
                    id: 'expert',
                    name: 'Expert',
                    description: 'Writes highly efficient, clean, and maintainable code',
                    scoreRange: { min: 85, max: 100 },
                    indicators: ['Optimal algorithms', 'Clean code structure', 'Best practices'],
                    examples: ['Implements complex algorithms efficiently', 'Demonstrates design patterns'],
                    evidenceRequirements: [
                      {
                        type: EvidenceType.TECHNICAL_DEMONSTRATION,
                        description: 'Live coding demonstration',
                        required: true,
                        minimumItems: 1,
                        validationCriteria: ['Working solution', 'Efficient approach', 'Clean code']
                      }
                    ],
                    color: '#4CAF50',
                    order: 1
                  },
                  {
                    id: 'proficient',
                    name: 'Proficient',
                    description: 'Writes functional code with good practices',
                    scoreRange: { min: 70, max: 84 },
                    indicators: ['Working solutions', 'Good structure', 'Some optimization'],
                    examples: ['Solves problems correctly', 'Shows understanding of concepts'],
                    evidenceRequirements: [
                      {
                        type: EvidenceType.TECHNICAL_DEMONSTRATION,
                        description: 'Coding exercise completion',
                        required: true,
                        minimumItems: 1,
                        validationCriteria: ['Working solution', 'Reasonable approach']
                      }
                    ],
                    color: '#FFC107',
                    order: 2
                  }
                ],
                indicators: [
                  {
                    id: 'code_quality',
                    name: 'Code Quality',
                    description: 'Overall quality of written code',
                    type: IndicatorType.QUALITATIVE,
                    measurementMethod: MeasurementMethod.OBSERVATION,
                    thresholds: [
                      { level: 'High', minValue: 80, maxValue: 100, description: 'Excellent code quality', color: '#4CAF50' },
                      { level: 'Medium', minValue: 60, maxValue: 79, description: 'Good code quality', color: '#FFC107' },
                      { level: 'Low', minValue: 0, maxValue: 59, description: 'Needs improvement', color: '#F44336' }
                    ],
                    weight: 0.6
                  }
                ],
                evidenceTypes: [EvidenceType.TECHNICAL_DEMONSTRATION, EvidenceType.PORTFOLIO_ITEM],
                assessmentMethods: [AssessmentMethod.TECHNICAL_TEST, AssessmentMethod.INTERVIEW_QUESTION],
                order: 1,
                required: true,
                dependencies: []
              }
            ],
            scoringMethod: CategoryScoringMethod.WEIGHTED_AVERAGE,
            benchmarks: [
              {
                level: 'Expert',
                score: 90,
                description: 'Top 10% of candidates',
                industryComparison: { percentile: 90, benchmark: 85 },
                roleComparison: { expectedLevel: 'Senior+', averageScore: 88 }
              }
            ],
            examples: [
              {
                level: 'Expert',
                scenario: 'Design a scalable system for handling millions of requests',
                expectedResponse: 'Comprehensive architecture with load balancing, caching, and monitoring',
                scoringNotes: ['System design knowledge', 'Scalability considerations', 'Real-world constraints'],
                commonMistakes: ['Ignoring scalability', 'Over-engineering', 'Missing monitoring']
              }
            ],
            order: 1,
            required: true
          }
        ],
        overallScoring: OverallScoringMethod.WEIGHTED_CATEGORIES,
        weightingStrategy: WeightingStrategy.CUSTOM
      },
      customizationPoints: [
        {
          id: 'role_level',
          name: 'Role Level',
          description: 'Adjust difficulty based on role seniority',
          type: CustomizationType.DROPDOWN,
          options: [
            { value: 'junior', label: 'Junior', description: 'Entry to mid-level positions', impact: CustomizationImpact.HIGH },
            { value: 'senior', label: 'Senior', description: 'Senior positions', impact: CustomizationImpact.HIGH },
            { value: 'lead', label: 'Lead', description: 'Technical lead positions', impact: CustomizationImpact.CRITICAL }
          ],
          required: true,
          defaultValue: 'senior'
        }
      ],
      popularity: 95,
      tags: ['technical', 'software', 'engineering'],
      createdBy: 'system',
      verified: true
    }

    this.templates.set(technicalTemplate.id, technicalTemplate)
  }

  private initializeValidationRules(): void {
    const defaultRules: ValidationRule[] = [
      {
        id: 'required_categories',
        type: ValidationType.REQUIRED_FIELD,
        description: 'Rubric must have at least one category',
        condition: 'categories.length > 0',
        errorMessage: 'At least one category is required',
        severity: ValidationSeverity.ERROR,
        autoFix: false
      },
      {
        id: 'weight_sum',
        type: ValidationType.CONSISTENCY_CHECK,
        description: 'Category weights should sum to 1.0',
        condition: 'Math.abs(categories.reduce((sum, c) => sum + c.weight, 0) - 1.0) < 0.01',
        errorMessage: 'Category weights must sum to 1.0',
        severity: ValidationSeverity.WARNING,
        autoFix: true
      },
      {
        id: 'performance_levels',
        type: ValidationType.COMPLETENESS_CHECK,
        description: 'Each criterion should have performance levels',
        condition: 'criteria.every(c => c.performanceLevels.length >= 2)',
        errorMessage: 'Each criterion should have at least 2 performance levels',
        severity: ValidationSeverity.WARNING,
        autoFix: false
      }
    ]

    this.validationRules.set('default', defaultRules)
  }

  // Main CRUD operations
  async createRubric(rubricData: Partial<InterviewRubric>): Promise<InterviewRubric> {
    const rubric: InterviewRubric = {
      id: this.generateRubricId(),
      name: rubricData.name || 'New Rubric',
      description: rubricData.description || '',
      version: '1.0.0',
      createdBy: rubricData.createdBy || 'current_user',
      createdAt: new Date(),
      lastModified: new Date(),
      status: RubricStatus.DRAFT,
      categories: rubricData.categories || [],
      overallScoring: rubricData.overallScoring || OverallScoringMethod.WEIGHTED_CATEGORIES,
      weightingStrategy: rubricData.weightingStrategy || WeightingStrategy.CUSTOM,
      validationRules: rubricData.validationRules || this.validationRules.get('default') || [],
      metadata: rubricData.metadata || {
        tags: [],
        industry: [],
        roles: [],
        experienceLevels: [],
        interviewTypes: [],
        language: 'en',
        region: 'global',
        compliance: []
      },
      usage: {
        timesUsed: 0,
        averageScore: 0,
        effectiveness: 0,
        userFeedback: [],
        successRate: 0,
        lastUsed: new Date(),
        trendsData: []
      },
      permissions: rubricData.permissions || {
        owner: rubricData.createdBy || 'current_user',
        editors: [],
        viewers: [],
        organizationAccess: OrganizationAccess.PRIVATE,
        publicAccess: PublicAccess.NONE,
        shareSettings: { allowCopy: false, allowEdit: false, expirationDate: undefined }
      }
    }

    // Validate the new rubric
    const validationResult = await this.validateRubric(rubric)
    if (!validationResult.isValid && validationResult.errors.some(e => e.severity === ErrorSeverity.BLOCKING)) {
      throw new Error(`Rubric validation failed: ${validationResult.errors[0].message}`)
    }

    this.rubrics.set(rubric.id, rubric)
    return rubric
  }

  async updateRubric(rubricId: string, updates: Partial<InterviewRubric>): Promise<InterviewRubric> {
    const existingRubric = this.rubrics.get(rubricId)
    if (!existingRubric) {
      throw new Error(`Rubric ${rubricId} not found`)
    }

    const updatedRubric: InterviewRubric = {
      ...existingRubric,
      ...updates,
      lastModified: new Date(),
      version: this.incrementVersion(existingRubric.version)
    }

    // Validate the updated rubric
    const validationResult = await this.validateRubric(updatedRubric)
    if (!validationResult.isValid && validationResult.errors.some(e => e.severity === ErrorSeverity.BLOCKING)) {
      throw new Error(`Rubric validation failed: ${validationResult.errors[0].message}`)
    }

    this.rubrics.set(rubricId, updatedRubric)
    return updatedRubric
  }

  async getRubric(rubricId: string): Promise<InterviewRubric | null> {
    return this.rubrics.get(rubricId) || null
  }

  async deleteRubric(rubricId: string): Promise<boolean> {
    return this.rubrics.delete(rubricId)
  }

  async listRubrics(filters?: RubricFilters): Promise<InterviewRubric[]> {
    let rubrics = Array.from(this.rubrics.values())

    if (filters) {
      rubrics = this.applyFilters(rubrics, filters)
    }

    return rubrics.sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime())
  }

  // Template operations
  async createFromTemplate(templateId: string, customizations?: { [key: string]: any }): Promise<InterviewRubric> {
    const template = this.templates.get(templateId)
    if (!template) {
      throw new Error(`Template ${templateId} not found`)
    }

    let rubricData = { ...template.baseRubric }

    // Apply customizations
    if (customizations) {
      rubricData = this.applyCustomizations(rubricData, template.customizationPoints, customizations)
    }

    return this.createRubric(rubricData)
  }

  async getTemplates(category?: TemplateCategory): Promise<RubricTemplate[]> {
    let templates = Array.from(this.templates.values())

    if (category) {
      templates = templates.filter(t => t.category === category)
    }

    return templates.sort((a, b) => b.popularity - a.popularity)
  }

  // Validation
  async validateRubric(rubric: InterviewRubric): Promise<RubricValidationResult> {
    const errors: ValidationError[] = []
    const warnings: ValidationWarning[] = []
    const suggestions: ValidationSuggestion[] = []

    // Apply validation rules
    const rules = rubric.validationRules || this.validationRules.get('default') || []
    
    for (const rule of rules) {
      const ruleResult = this.applyValidationRule(rubric, rule)
      if (!ruleResult.passed) {
        if (rule.severity === ValidationSeverity.ERROR) {
          errors.push({
            id: rule.id,
            type: ErrorType.VALIDATION,
            field: ruleResult.field || 'general',
            message: rule.errorMessage,
            severity: ErrorSeverity.HIGH,
            fixSuggestion: ruleResult.fixSuggestion,
            autoFixable: rule.autoFix || false
          })
        } else if (rule.severity === ValidationSeverity.WARNING) {
          warnings.push({
            id: rule.id,
            type: WarningType.BEST_PRACTICE,
            field: ruleResult.field || 'general',
            message: rule.errorMessage,
            impact: WarningImpact.MEDIUM,
            recommendation: ruleResult.fixSuggestion || 'Review and correct manually'
          })
        }
      }
    }

    // Additional validation checks
    this.validateCategoryStructure(rubric, errors, warnings)
    this.validateCriteriaDefinitions(rubric, errors, warnings)
    this.validatePerformanceLevels(rubric, errors, warnings)

    // Generate suggestions
    this.generateImprovementSuggestions(rubric, suggestions)

    const completeness = this.calculateCompleteness(rubric)
    const consistency = this.calculateConsistency(rubric)

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      suggestions,
      completeness,
      consistency,
      recommendations: this.generateValidationRecommendations(rubric, errors, warnings)
    }
  }

  // Category management
  async addCategory(rubricId: string, category: Omit<RubricCategory, 'id'>): Promise<RubricCategory> {
    const rubric = this.rubrics.get(rubricId)
    if (!rubric) {
      throw new Error(`Rubric ${rubricId} not found`)
    }

    const newCategory: RubricCategory = {
      ...category,
      id: this.generateCategoryId()
    }

    rubric.categories.push(newCategory)
    rubric.lastModified = new Date()

    // Rebalance weights if necessary
    await this.rebalanceWeights(rubric)

    return newCategory
  }

  async updateCategory(rubricId: string, categoryId: string, updates: Partial<RubricCategory>): Promise<RubricCategory> {
    const rubric = this.rubrics.get(rubricId)
    if (!rubric) {
      throw new Error(`Rubric ${rubricId} not found`)
    }

    const categoryIndex = rubric.categories.findIndex(c => c.id === categoryId)
    if (categoryIndex === -1) {
      throw new Error(`Category ${categoryId} not found`)
    }

    rubric.categories[categoryIndex] = { ...rubric.categories[categoryIndex], ...updates }
    rubric.lastModified = new Date()

    return rubric.categories[categoryIndex]
  }

  async deleteCategory(rubricId: string, categoryId: string): Promise<boolean> {
    const rubric = this.rubrics.get(rubricId)
    if (!rubric) {
      throw new Error(`Rubric ${rubricId} not found`)
    }

    const categoryIndex = rubric.categories.findIndex(c => c.id === categoryId)
    if (categoryIndex === -1) {
      return false
    }

    rubric.categories.splice(categoryIndex, 1)
    rubric.lastModified = new Date()

    // Rebalance weights
    await this.rebalanceWeights(rubric)

    return true
  }

  // Criterion management
  async addCriterion(rubricId: string, categoryId: string, criterion: Omit<RubricCriterion, 'id'>): Promise<RubricCriterion> {
    const rubric = this.rubrics.get(rubricId)
    if (!rubric) {
      throw new Error(`Rubric ${rubricId} not found`)
    }

    const category = rubric.categories.find(c => c.id === categoryId)
    if (!category) {
      throw new Error(`Category ${categoryId} not found`)
    }

    const newCriterion: RubricCriterion = {
      ...criterion,
      id: this.generateCriterionId()
    }

    category.criteria.push(newCriterion)
    rubric.lastModified = new Date()

    return newCriterion
  }

  // Analytics and insights
  async getRubricAnalytics(rubricId: string): Promise<RubricAnalytics> {
    const cached = this.analytics.get(rubricId)
    if (cached) {
      return cached
    }

    const rubric = this.rubrics.get(rubricId)
    if (!rubric) {
      throw new Error(`Rubric ${rubricId} not found`)
    }

    const analytics = await this.calculateRubricAnalytics(rubric)
    this.analytics.set(rubricId, analytics)

    return analytics
  }

  // Import/Export
  async exportRubric(rubricId: string, options: ExportOptions): Promise<ExportResult> {
    const rubric = this.rubrics.get(rubricId)
    if (!rubric) {
      throw new Error(`Rubric ${rubricId} not found`)
    }

    switch (options.format) {
      case ExportFormat.JSON:
        return this.exportToJSON(rubric, options)
      case ExportFormat.PDF:
        return this.exportToPDF(rubric, options)
      case ExportFormat.EXCEL:
        return this.exportToExcel(rubric, options)
      default:
        throw new Error(`Unsupported export format: ${options.format}`)
    }
  }

  async importRubric(data: any, options: ImportOptions): Promise<InterviewRubric> {
    // Validate import data
    const validationResult = await this.validateImportData(data, options)
    if (!validationResult.isValid) {
      throw new Error(`Import validation failed: ${validationResult.errors[0]?.message}`)
    }

    // Convert and create rubric
    const rubricData = this.convertImportData(data, options)
    return this.createRubric(rubricData)
  }

  // Helper methods
  private generateRubricId(): string {
    return `rubric_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private generateCategoryId(): string {
    return `category_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private generateCriterionId(): string {
    return `criterion_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private incrementVersion(version: string): string {
    const parts = version.split('.')
    const patch = parseInt(parts[2] || '0') + 1
    return `${parts[0]}.${parts[1]}.${patch}`
  }

  private applyFilters(rubrics: InterviewRubric[], filters: RubricFilters): InterviewRubric[] {
    return rubrics.filter(rubric => {
      if (filters.status && !filters.status.includes(rubric.status)) return false
      if (filters.tags && !filters.tags.some(tag => rubric.metadata.tags.includes(tag))) return false
      if (filters.createdBy && rubric.createdBy !== filters.createdBy) return false
      if (filters.industry && !filters.industry.some(ind => rubric.metadata.industry.includes(ind))) return false
      return true
    })
  }

  private applyCustomizations(
    rubricData: Partial<InterviewRubric>,
    customizationPoints: CustomizationPoint[],
    customizations: { [key: string]: any }
  ): Partial<InterviewRubric> {
    let result = { ...rubricData }

    customizationPoints.forEach(point => {
      const value = customizations[point.id]
      if (value !== undefined) {
        result = this.applyCustomization(result, point, value)
      }
    })

    return result
  }

  private applyCustomization(
    rubricData: Partial<InterviewRubric>,
    point: CustomizationPoint,
    value: any
  ): Partial<InterviewRubric> {
    // Implementation would depend on the customization type and target
    // This is a simplified example
    switch (point.id) {
      case 'role_level':
        return this.adjustForRoleLevel(rubricData, value)
      default:
        return rubricData
    }
  }

  private adjustForRoleLevel(rubricData: Partial<InterviewRubric>, level: string): Partial<InterviewRubric> {
    // Adjust difficulty and expectations based on role level
    const result = { ...rubricData }
    
    if (result.categories) {
      result.categories = result.categories.map(category => ({
        ...category,
        criteria: category.criteria?.map(criterion => ({
          ...criterion,
          performanceLevels: this.adjustPerformanceLevels(criterion.performanceLevels || [], level)
        })) || []
      }))
    }

    return result
  }

  private adjustPerformanceLevels(levels: PerformanceLevel[], roleLevel: string): PerformanceLevel[] {
    // Adjust score ranges and expectations based on role level
    const adjustmentFactor = roleLevel === 'junior' ? 0.8 : roleLevel === 'lead' ? 1.2 : 1.0
    
    return levels.map(level => ({
      ...level,
      scoreRange: {
        min: Math.max(0, level.scoreRange.min * adjustmentFactor),
        max: Math.min(100, level.scoreRange.max * adjustmentFactor)
      }
    }))
  }

  // Validation helper methods
  private applyValidationRule(rubric: InterviewRubric, rule: ValidationRule): {
    passed: boolean
    field?: string
    fixSuggestion?: string
  } {
    try {
      // This is a simplified validation - in practice, you'd use a proper expression evaluator
      switch (rule.id) {
        case 'required_categories':
          return {
            passed: rubric.categories.length > 0,
            field: 'categories',
            fixSuggestion: 'Add at least one category to the rubric'
          }
        
        case 'weight_sum':
          const weightSum = rubric.categories.reduce((sum, c) => sum + c.weight, 0)
          const passed = Math.abs(weightSum - 1.0) < 0.01
          return {
            passed,
            field: 'categories',
            fixSuggestion: passed ? undefined : 'Adjust category weights to sum to 1.0'
          }
        
        default:
          return { passed: true }
      }
    } catch (error) {
      return { 
        passed: false, 
        field: 'general', 
        fixSuggestion: 'Rule evaluation failed' 
      }
    }
  }

  private validateCategoryStructure(rubric: InterviewRubric, errors: ValidationError[], warnings: ValidationWarning[]): void {
    rubric.categories.forEach((category, index) => {
      if (!category.name || category.name.trim().length === 0) {
        errors.push({
          id: `category_name_${index}`,
          type: ErrorType.VALIDATION,
          field: `categories[${index}].name`,
          message: 'Category name is required',
          severity: ErrorSeverity.HIGH,
          autoFixable: false
        })
      }

      if (category.criteria.length === 0) {
        warnings.push({
          id: `category_criteria_${index}`,
          type: WarningType.COMPLETENESS,
          field: `categories[${index}].criteria`,
          message: 'Category should have at least one criterion',
          impact: WarningImpact.MEDIUM,
          recommendation: 'Add criteria to make the category meaningful'
        })
      }
    })
  }

  private validateCriteriaDefinitions(rubric: InterviewRubric, errors: ValidationError[], warnings: ValidationWarning[]): void {
    rubric.categories.forEach((category, catIndex) => {
      category.criteria.forEach((criterion, critIndex) => {
        if (!criterion.name || criterion.name.trim().length === 0) {
          errors.push({
            id: `criterion_name_${catIndex}_${critIndex}`,
            type: ErrorType.VALIDATION,
            field: `categories[${catIndex}].criteria[${critIndex}].name`,
            message: 'Criterion name is required',
            severity: ErrorSeverity.HIGH,
            autoFixable: false
          })
        }

        if (criterion.performanceLevels.length < 2) {
          warnings.push({
            id: `criterion_levels_${catIndex}_${critIndex}`,
            type: WarningType.USABILITY,
            field: `categories[${catIndex}].criteria[${critIndex}].performanceLevels`,
            message: 'Criterion should have at least 2 performance levels',
            impact: WarningImpact.HIGH,
            recommendation: 'Add more performance levels for better differentiation'
          })
        }
      })
    })
  }

  private validatePerformanceLevels(rubric: InterviewRubric, errors: ValidationError[], warnings: ValidationWarning[]): void {
    rubric.categories.forEach((category, catIndex) => {
      category.criteria.forEach((criterion, critIndex) => {
        criterion.performanceLevels.forEach((level, levelIndex) => {
          if (level.scoreRange.min >= level.scoreRange.max) {
            errors.push({
              id: `level_range_${catIndex}_${critIndex}_${levelIndex}`,
              type: ErrorType.LOGIC,
              field: `categories[${catIndex}].criteria[${critIndex}].performanceLevels[${levelIndex}].scoreRange`,
              message: 'Score range minimum must be less than maximum',
              severity: ErrorSeverity.HIGH,
              autoFixable: true
            })
          }
        })
      })
    })
  }

  private generateImprovementSuggestions(rubric: InterviewRubric, suggestions: ValidationSuggestion[]): void {
    // Suggest adding examples if missing
    if (rubric.categories.some(c => c.examples.length === 0)) {
      suggestions.push({
        id: 'add_examples',
        type: SuggestionType.IMPROVEMENT,
        field: 'categories.examples',
        message: 'Consider adding examples to categories for clearer guidance',
        benefit: 'Improves consistency and reduces subjectivity in scoring',
        effort: EffortLevel.LOW,
        priority: SuggestionPriority.MEDIUM
      })
    }

    // Suggest adding evidence requirements
    const criteriaWithoutEvidence = rubric.categories.flatMap(c => c.criteria)
      .filter(cr => cr.evidenceTypes.length === 0)
    
    if (criteriaWithoutEvidence.length > 0) {
      suggestions.push({
        id: 'add_evidence_types',
        type: SuggestionType.IMPROVEMENT,
        field: 'criteria.evidenceTypes',
        message: 'Consider specifying evidence types for criteria',
        benefit: 'Provides clearer guidance on what constitutes valid evidence',
        effort: EffortLevel.MEDIUM,
        priority: SuggestionPriority.HIGH
      })
    }
  }

  private generateValidationRecommendations(
    rubric: InterviewRubric,
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ): ValidationRecommendation[] {
    const recommendations: ValidationRecommendation[] = []

    if (errors.length > 0) {
      recommendations.push({
        id: 'fix_errors',
        category: 'Critical Issues',
        title: 'Fix Validation Errors',
        description: 'Address critical validation errors before using the rubric',
        actions: errors.map(error => ({
          action: error.fixSuggestion || 'Manual fix required',
          description: error.message,
          automated: error.autoFixable,
          effort: error.autoFixable ? EffortLevel.MINIMAL : EffortLevel.MEDIUM
        })),
        impact: RecommendationImpact.SIGNIFICANT,
        confidence: 0.95
      })
    }

    if (warnings.length > 0) {
      recommendations.push({
        id: 'address_warnings',
        category: 'Improvements',
        title: 'Address Warnings',
        description: 'Consider addressing warnings to improve rubric quality',
        actions: warnings.map(warning => ({
          action: warning.recommendation,
          description: warning.message,
          automated: false,
          effort: EffortLevel.LOW
        })),
        impact: RecommendationImpact.MODERATE,
        confidence: 0.8
      })
    }

    return recommendations
  }

  private calculateCompleteness(rubric: InterviewRubric): number {
    let totalElements = 0
    let completedElements = 0

    // Check basic rubric information
    totalElements += 4
    if (rubric.name) completedElements++
    if (rubric.description) completedElements++
    if (rubric.categories.length > 0) completedElements++
    if (rubric.metadata.tags.length > 0) completedElements++

    // Check categories
    rubric.categories.forEach(category => {
      totalElements += 5
      if (category.name) completedElements++
      if (category.description) completedElements++
      if (category.criteria.length > 0) completedElements++
      if (category.examples.length > 0) completedElements++
      if (category.benchmarks.length > 0) completedElements++

      // Check criteria
      category.criteria.forEach(criterion => {
        totalElements += 4
        if (criterion.name) completedElements++
        if (criterion.description) completedElements++
        if (criterion.performanceLevels.length >= 2) completedElements++
        if (criterion.evidenceTypes.length > 0) completedElements++
      })
    })

    return totalElements > 0 ? completedElements / totalElements : 0
  }

  private calculateConsistency(rubric: InterviewRubric): number {
    let consistencyScore = 1.0

    // Check weight consistency
    const totalWeight = rubric.categories.reduce((sum, c) => sum + c.weight, 0)
    if (Math.abs(totalWeight - 1.0) > 0.01) {
      consistencyScore -= 0.2
    }

    // Check performance level consistency
    rubric.categories.forEach(category => {
      category.criteria.forEach(criterion => {
        const levels = criterion.performanceLevels
        for (let i = 1; i < levels.length; i++) {
          if (levels[i].scoreRange.min <= levels[i-1].scoreRange.max) {
            consistencyScore -= 0.1
          }
        }
      })
    })

    return Math.max(0, consistencyScore)
  }

  private async rebalanceWeights(rubric: InterviewRubric): Promise<void> {
    if (rubric.weightingStrategy === WeightingStrategy.EQUAL) {
      const equalWeight = 1.0 / rubric.categories.length
      rubric.categories.forEach(category => {
        category.weight = equalWeight
      })
    }
  }

  private async calculateRubricAnalytics(rubric: InterviewRubric): Promise<RubricAnalytics> {
    // Mock analytics calculation - in practice, this would analyze usage data
    return {
      overallMetrics: {
        totalAssessments: rubric.usage.timesUsed,
        averageScore: rubric.usage.averageScore,
        scoreDistribution: [
          { range: '90-100', count: 5, percentage: 10 },
          { range: '80-89', count: 15, percentage: 30 },
          { range: '70-79', count: 20, percentage: 40 },
          { range: '60-69', count: 8, percentage: 16 },
          { range: '0-59', count: 2, percentage: 4 }
        ],
        reliability: 0.85,
        validity: 0.80,
        interRaterReliability: 0.78,
        completionRate: 0.95
      },
      categoryAnalysis: rubric.categories.map(category => ({
        categoryId: category.id,
        averageScore: 75,
        scoreVariability: 12,
        discrimination: 0.6,
        predictivePower: 0.7,
        correlations: [],
        trends: []
      })),
      criterionAnalysis: rubric.categories.flatMap(c => c.criteria).map(criterion => ({
        criterionId: criterion.id,
        averageScore: 72,
        difficulty: 0.5,
        reliability: 0.8,
        effectiveness: 0.75,
        commonIssues: ['Subjective interpretation', 'Inconsistent evidence'],
        improvementSuggestions: ['Add more specific examples', 'Clarify scoring criteria']
      })),
      usagePatterns: [],
      effectivenessMetrics: {
        predictiveAccuracy: 0.72,
        candidateExperience: 0.8,
        interviewerSatisfaction: 0.85,
        timeEfficiency: 0.9,
        costEffectiveness: 0.88,
        fairness: {
          overallFairness: 0.82,
          biasIndicators: [],
          diversityImpact: { positiveImpact: 0.7, concerns: [] },
          accessibility: { score: 0.85, areas: [] },
          compliance: { overallCompliance: 0.9, violations: [] }
        }
      },
      benchmarkComparison: {
        industryAverage: 78,
        topPerformers: 88,
        positionVsIndustry: 'above_average',
        improvementOpportunities: ['Increase reliability', 'Reduce bias']
      },
      improvementSuggestions: [
        {
          category: 'Reliability',
          suggestion: 'Increase inter-rater reliability through training',
          impact: 'high',
          effort: 'medium'
        }
      ]
    }
  }

  // Export implementations
  private async exportToJSON(rubric: InterviewRubric, options: ExportOptions): Promise<ExportResult> {
    const exportData = {
      rubric,
      analytics: options.includeAnalytics ? await this.getRubricAnalytics(rubric.id) : undefined,
      examples: options.includeExamples ? this.extractExamples(rubric) : undefined,
      metadata: options.includeMetadata ? rubric.metadata : undefined
    }

    return {
      format: ExportFormat.JSON,
      content: JSON.stringify(exportData, null, 2),
      filename: `${rubric.name.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.json`,
      size: JSON.stringify(exportData).length,
      metadata: {
        exportedAt: new Date(),
        rubricId: rubric.id,
        rubricName: rubric.name,
        includesAnalytics: options.includeAnalytics,
        includesExamples: options.includeExamples
      }
    }
  }

  private extractExamples(rubric: InterviewRubric): any {
    return rubric.categories.map(category => ({
      categoryId: category.id,
      categoryName: category.name,
      examples: category.examples
    }))
  }

  // Import implementations
  private async validateImportData(data: any, options: ImportOptions): Promise<{ isValid: boolean; errors: string[] }> {
    const errors: string[] = []

    if (!data) {
      errors.push('No data provided')
      return { isValid: false, errors }
    }

    if (options.source === ImportSource.TEMPLATE) {
      if (!data.baseRubric) {
        errors.push('Template data must include baseRubric')
      }
    } else {
      if (!data.rubric && !data.name) {
        errors.push('Import data must include rubric information')
      }
    }

    return { isValid: errors.length === 0, errors }
  }

  private convertImportData(data: any, options: ImportOptions): Partial<InterviewRubric> {
    if (options.source === ImportSource.TEMPLATE) {
      return data.baseRubric
    }

    return data.rubric || data
  }
}

// Supporting interfaces
interface RubricFilters {
  status?: RubricStatus[]
  tags?: string[]
  createdBy?: string
  industry?: string[]
  roles?: string[]
}

interface ScoreRange {
  min: number
  max: number
}

interface CriterionDependency {
  criterionId: string
  type: DependencyType
  condition: string
}

enum DependencyType {
  REQUIRES = 'requires',
  EXCLUDES = 'excludes',
  ENHANCES = 'enhances'
}

interface IndustryComparison {
  percentile: number
  benchmark: number
}

interface RoleComparison {
  expectedLevel: string
  averageScore: number
}

interface ComplianceInfo {
  standard: string
  requirement: string
  status: ComplianceStatus
}

enum ComplianceStatus {
  COMPLIANT = 'compliant',
  PARTIAL = 'partial',
  NON_COMPLIANT = 'non_compliant'
}

interface UserFeedback {
  userId: string
  rating: number
  comment: string
  timestamp: Date
  category: FeedbackCategory
}

enum FeedbackCategory {
  USABILITY = 'usability',
  ACCURACY = 'accuracy',
  COMPLETENESS = 'completeness',
  FAIRNESS = 'fairness'
}

interface UsageTrend {
  period: string
  usageCount: number
  averageScore: number
  trend: TrendDirection
}

enum TrendDirection {
  UP = 'up',
  DOWN = 'down',
  STABLE = 'stable'
}

interface ShareSettings {
  allowCopy: boolean
  allowEdit: boolean
  expirationDate?: Date
}

interface CategoryCorrelation {
  categoryId: string
  correlation: number
  significance: number
}

interface CategoryTrend {
  period: string
  averageScore: number
  change: number
}

interface PatternOutcome {
  outcome: string
  frequency: number
  impact: string
}

interface DiversityImpact {
  positiveImpact: number
  concerns: string[]
}

interface AccessibilityMetrics {
  score: number
  areas: string[]
}

interface ComplianceMetrics {
  overallCompliance: number
  violations: string[]
}

interface BenchmarkComparison {
  industryAverage: number
  topPerformers: number
  positionVsIndustry: string
  improvementOpportunities: string[]
}

interface ImprovementSuggestion {
  category: string
  suggestion: string
  impact: string
  effort: string
}

interface ExportResult {
  format: ExportFormat
  content: string | Buffer
  filename: string
  size: number
  metadata: ExportMetadata
}

interface ExportMetadata {
  exportedAt: Date
  rubricId: string
  rubricName: string
  includesAnalytics: boolean
  includesExamples: boolean
}

interface ExportCustomization {
  field: string
  include: boolean
  format?: string
}

// Singleton instance
export const rubricEditorService = new RubricEditorService()