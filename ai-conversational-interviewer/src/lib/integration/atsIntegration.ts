// Phase 7: ATS Integration Framework
// Comprehensive integration with major ATS platforms

import { CandidateListItem } from '../dashboard/candidateManagement'
import { InterviewSession } from '../interview/conversationFlow'

export interface ATSIntegrationConfig {
  id: string
  name: string
  type: ATSType
  provider: ATSProvider
  configuration: ATSConfiguration
  credentials: ATSCredentials
  endpoints: ATSEndpoints
  mappings: FieldMapping[]
  syncSettings: SyncSettings
  webhookConfig: WebhookConfiguration
  rateLimits: RateLimitConfig
  status: IntegrationStatus
  metadata: IntegrationMetadata
}

export interface ATSConfiguration {
  baseUrl: string
  apiVersion: string
  environment: Environment
  region?: string
  tenant?: string
  companyId?: string
  authentication: AuthenticationConfig
  features: FeatureConfiguration
  customFields: CustomFieldConfig[]
  businessRules: BusinessRuleConfig[]
}

export interface ATSCredentials {
  type: CredentialType
  clientId?: string
  clientSecret?: string
  apiKey?: string
  accessToken?: string
  refreshToken?: string
  username?: string
  password?: string
  certificateData?: string
  expiresAt?: Date
  scopes?: string[]
  permissions?: string[]
}

export interface ATSEndpoints {
  candidates: EndpointConfig
  jobs: EndpointConfig
  applications: EndpointConfig
  interviews: EndpointConfig
  users: EndpointConfig
  departments: EndpointConfig
  customObjects?: { [key: string]: EndpointConfig }
}

export interface EndpointConfig {
  baseUrl: string
  create: string
  read: string
  update: string
  delete: string
  list: string
  search?: string
  bulk?: string
  webhook?: string
  rateLimits: EndpointRateLimit
}

export interface EndpointRateLimit {
  requests: number
  period: number
  burstLimit?: number
  concurrent?: number
}

export interface FieldMapping {
  sourceField: string
  targetField: string
  transformation?: FieldTransformation
  validation?: FieldValidation
  required: boolean
  direction: MappingDirection
  conditions?: MappingCondition[]
}

export interface FieldTransformation {
  type: TransformationType
  rules: TransformationRule[]
  defaultValue?: any
  nullHandling: NullHandling
  errorHandling: ErrorHandling
}

export interface TransformationRule {
  condition: string
  action: string
  parameters: { [key: string]: any }
  priority: number
}

export interface FieldValidation {
  type: ValidationType
  rules: ValidationRule[]
  errorMessage: string
  severity: ValidationSeverity
}

export interface ValidationRule {
  rule: string
  parameters: { [key: string]: any }
  message: string
}

export interface MappingCondition {
  field: string
  operator: ConditionalOperator
  value: any
  logicalOperator?: LogicalOperator
}

export interface SyncSettings {
  enabled: boolean
  direction: SyncDirection
  frequency: SyncFrequency
  schedule: SyncSchedule
  batchSize: number
  retryConfig: RetryConfiguration
  errorHandling: SyncErrorHandling
  dataFilters: DataFilter[]
  priorityRules: PriorityRule[]
}

export interface SyncSchedule {
  type: ScheduleType
  interval?: number
  cronExpression?: string
  timezone: string
  activeHours?: TimeRange
  excludedDates?: Date[]
}

export interface RetryConfiguration {
  maxRetries: number
  backoffStrategy: BackoffStrategy
  initialDelay: number
  maxDelay: number
  jitterEnabled: boolean
  circuitBreaker: CircuitBreakerConfig
}

export interface CircuitBreakerConfig {
  enabled: boolean
  failureThreshold: number
  recoveryTimeout: number
  halfOpenMaxCalls: number
}

export interface SyncErrorHandling {
  strategy: ErrorStrategy
  deadLetterQueue: boolean
  alerting: ErrorAlertConfig
  logging: ErrorLoggingConfig
  escalation: ErrorEscalationConfig
}

export interface ErrorAlertConfig {
  enabled: boolean
  channels: AlertChannel[]
  thresholds: AlertThreshold[]
  templates: AlertTemplate[]
}

export interface AlertThreshold {
  metric: string
  value: number
  duration: number
  severity: AlertSeverity
}

export interface AlertTemplate {
  id: string
  name: string
  subject: string
  body: string
  channels: AlertChannel[]
}

export interface DataFilter {
  field: string
  operator: FilterOperator
  value: any
  active: boolean
  description: string
}

export interface PriorityRule {
  condition: string
  priority: number
  description: string
  actions: string[]
}

export interface WebhookConfiguration {
  enabled: boolean
  endpoints: WebhookEndpoint[]
  security: WebhookSecurity
  retryPolicy: WebhookRetryPolicy
  logging: WebhookLogging
}

export interface WebhookEndpoint {
  id: string
  url: string
  events: string[]
  active: boolean
  headers: { [key: string]: string }
  authentication?: WebhookAuth
  filters?: WebhookFilter[]
}

export interface WebhookAuth {
  type: WebhookAuthType
  credentials: { [key: string]: string }
}

export interface WebhookFilter {
  field: string
  operator: string
  value: any
}

export interface WebhookSecurity {
  signatureValidation: boolean
  secretKey?: string
  ipWhitelist?: string[]
  rateLimiting: WebhookRateLimit
}

export interface WebhookRateLimit {
  enabled: boolean
  maxRequests: number
  windowMinutes: number
  blockDuration: number
}

export interface WebhookRetryPolicy {
  enabled: boolean
  maxRetries: number
  backoffMultiplier: number
  maxBackoffSeconds: number
}

export interface WebhookLogging {
  enabled: boolean
  level: LogLevel
  includePayload: boolean
  retention: number
}

export interface RateLimitConfig {
  global: RateLimit
  perEndpoint: { [endpoint: string]: RateLimit }
  adaptive: boolean
  monitoring: RateLimitMonitoring
}

export interface RateLimit {
  requests: number
  period: number
  burst?: number
  concurrent?: number
}

export interface RateLimitMonitoring {
  enabled: boolean
  alertThreshold: number
  tracking: RateLimitTracking[]
}

export interface RateLimitTracking {
  endpoint: string
  current: number
  limit: number
  resetTime: Date
  violations: number
}

export interface IntegrationMetadata {
  createdAt: Date
  updatedAt: Date
  version: string
  owner: string
  tags: string[]
  description: string
  documentation: string
  support: SupportInfo
  compliance: ComplianceInfo
}

export interface SupportInfo {
  contact: string
  documentation: string
  supportLevel: SupportLevel
  responseTime: string
}

export interface ComplianceInfo {
  regulations: string[]
  certifications: string[]
  dataResidency: string
  encryption: EncryptionInfo
}

export interface EncryptionInfo {
  inTransit: boolean
  atRest: boolean
  algorithm: string
  keyManagement: string
}

// Candidate Data Models
export interface ATSCandidate {
  id: string
  externalId: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  resume?: ATSDocument
  coverLetter?: ATSDocument
  applications: ATSApplication[]
  tags: string[]
  sources: string[]
  customFields: { [key: string]: any }
  createdAt: Date
  updatedAt: Date
  status: CandidateStatus
  notes: ATSNote[]
  activities: ATSActivity[]
  documents: ATSDocument[]
  interviews: ATSInterview[]
  references: ATSReference[]
  offers: ATSOffer[]
}

export interface ATSApplication {
  id: string
  jobId: string
  jobTitle: string
  department: string
  location: string
  appliedAt: Date
  status: ApplicationStatus
  stage: ApplicationStage
  source: string
  referrer?: string
  customFields: { [key: string]: any }
  scorecards: ATSScorecard[]
  feedback: ATSFeedback[]
  rejectionReason?: string
}

export interface ATSJob {
  id: string
  title: string
  description: string
  department: string
  location: string
  employmentType: EmploymentType
  experience: ExperienceLevel
  salaryRange: SalaryRange
  requirements: string[]
  responsibilities: string[]
  benefits: string[]
  status: JobStatus
  hiringManager: string
  recruiters: string[]
  createdAt: Date
  updatedAt: Date
  customFields: { [key: string]: any }
}

export interface ATSDocument {
  id: string
  name: string
  type: DocumentType
  url: string
  content?: string
  size: number
  mimeType: string
  uploadedAt: Date
  uploadedBy: string
  tags: string[]
  parsed: boolean
  extractedData?: any
}

export interface ATSNote {
  id: string
  content: string
  type: NoteType
  visibility: NoteVisibility
  author: string
  createdAt: Date
  tags: string[]
  relatedObjects: string[]
}

export interface ATSActivity {
  id: string
  type: ActivityType
  description: string
  performer: string
  timestamp: Date
  details: { [key: string]: any }
  relatedObjects: string[]
}

export interface ATSInterview {
  id: string
  type: InterviewType
  format: InterviewFormat
  scheduledAt: Date
  duration: number
  interviewers: string[]
  location?: string
  meetingLink?: string
  status: InterviewStatus
  feedback?: ATSFeedback
  scorecard?: ATSScorecard
  recordingUrl?: string
  notes: string
}

export interface ATSScorecard {
  id: string
  interviewer: string
  submittedAt: Date
  overallRating: number
  attributes: ScorecardAttribute[]
  recommendation: HiringRecommendation
  comments: string
  customFields: { [key: string]: any }
}

export interface ScorecardAttribute {
  name: string
  rating: number
  weight: number
  comments: string
  required: boolean
}

export interface ATSFeedback {
  id: string
  author: string
  type: FeedbackType
  rating: number
  comments: string
  submittedAt: Date
  visibility: FeedbackVisibility
  tags: string[]
}

export interface ATSReference {
  id: string
  name: string
  title: string
  company: string
  email: string
  phone: string
  relationship: string
  status: ReferenceStatus
  feedback?: string
  rating?: number
  contactedAt?: Date
}

export interface ATSOffer {
  id: string
  position: string
  salary: number
  currency: string
  benefits: string[]
  startDate: Date
  status: OfferStatus
  sentAt: Date
  respondedAt?: Date
  acceptedAt?: Date
  rejectedAt?: Date
  terms: OfferTerm[]
  customFields: { [key: string]: any }
}

export interface OfferTerm {
  type: string
  description: string
  value: any
  negotiable: boolean
}

export interface SalaryRange {
  min: number
  max: number
  currency: string
  frequency: SalaryFrequency
}

// Sync Operation Models
export interface SyncOperation {
  id: string
  type: SyncOperationType
  direction: SyncDirection
  entity: string
  startedAt: Date
  completedAt?: Date
  status: SyncStatus
  progress: SyncProgress
  results: SyncResults
  errors: SyncError[]
  metadata: SyncMetadata
}

export interface SyncProgress {
  total: number
  processed: number
  succeeded: number
  failed: number
  skipped: number
  percentage: number
  estimatedCompletion?: Date
  currentBatch?: number
  totalBatches?: number
}

export interface SyncResults {
  summary: SyncSummary
  details: SyncDetail[]
  conflicts: SyncConflict[]
  warnings: SyncWarning[]
}

export interface SyncSummary {
  totalRecords: number
  created: number
  updated: number
  deleted: number
  skipped: number
  errors: number
  duration: number
  throughput: number
}

export interface SyncDetail {
  recordId: string
  operation: SyncOperationType
  status: RecordSyncStatus
  changes: FieldChange[]
  errors: string[]
  timestamps: SyncTimestamps
}

export interface FieldChange {
  field: string
  oldValue: any
  newValue: any
  source: string
}

export interface SyncTimestamps {
  started: Date
  completed?: Date
  lastModified: Date
}

export interface SyncConflict {
  recordId: string
  field: string
  localValue: any
  remoteValue: any
  resolution: ConflictResolution
  resolvedBy?: string
  resolvedAt?: Date
}

export interface SyncWarning {
  type: WarningType
  message: string
  recordId?: string
  field?: string
  severity: WarningSeverity
}

export interface SyncError {
  id: string
  type: ErrorType
  message: string
  details: string
  recordId?: string
  field?: string
  timestamp: Date
  retryCount: number
  resolved: boolean
  resolution?: string
}

export interface SyncMetadata {
  triggerType: TriggerType
  triggeredBy: string
  configuration: string
  dataVersion: string
  checksum: string
  tags: string[]
}

// Integration Events
export interface IntegrationEvent {
  id: string
  type: EventType
  source: string
  timestamp: Date
  data: any
  metadata: EventMetadata
  processed: boolean
  retryCount: number
  errors: string[]
}

export interface EventMetadata {
  version: string
  correlationId: string
  causationId?: string
  source: string
  traceId: string
  userId?: string
  sessionId?: string
}

// Enums
export enum ATSType {
  WORKDAY = 'workday',
  GREENHOUSE = 'greenhouse',
  BAMBOO_HR = 'bamboo_hr',
  LEVER = 'lever',
  JOBVITE = 'jobvite',
  ICIMS = 'icims',
  SMART_RECRUITERS = 'smart_recruiters',
  ORACLE_HCM = 'oracle_hcm',
  SAP_SUCCESS_FACTORS = 'sap_success_factors',
  CUSTOM = 'custom'
}

export enum ATSProvider {
  WORKDAY = 'workday',
  GREENHOUSE = 'greenhouse',
  BAMBOO_HR = 'bamboo_hr',
  THIRD_PARTY = 'third_party',
  CUSTOM = 'custom'
}

export enum Environment {
  PRODUCTION = 'production',
  STAGING = 'staging',
  SANDBOX = 'sandbox',
  DEVELOPMENT = 'development'
}

export enum CredentialType {
  API_KEY = 'api_key',
  OAUTH2 = 'oauth2',
  BASIC_AUTH = 'basic_auth',
  BEARER_TOKEN = 'bearer_token',
  CERTIFICATE = 'certificate',
  CUSTOM = 'custom'
}

export enum IntegrationStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  CONFIGURING = 'configuring',
  ERROR = 'error',
  SUSPENDED = 'suspended',
  TESTING = 'testing'
}

export enum MappingDirection {
  INBOUND = 'inbound',
  OUTBOUND = 'outbound',
  BIDIRECTIONAL = 'bidirectional'
}

export enum TransformationType {
  DIRECT = 'direct',
  FORMAT = 'format',
  LOOKUP = 'lookup',
  CALCULATION = 'calculation',
  CONCATENATION = 'concatenation',
  CONDITIONAL = 'conditional',
  CUSTOM = 'custom'
}

export enum ValidationType {
  REQUIRED = 'required',
  FORMAT = 'format',
  LENGTH = 'length',
  RANGE = 'range',
  CUSTOM = 'custom'
}

export enum ValidationSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical'
}

export enum ConditionalOperator {
  EQUALS = 'equals',
  NOT_EQUALS = 'not_equals',
  GREATER_THAN = 'greater_than',
  LESS_THAN = 'less_than',
  CONTAINS = 'contains',
  STARTS_WITH = 'starts_with',
  IN = 'in',
  NOT_IN = 'not_in',
  IS_NULL = 'is_null',
  IS_NOT_NULL = 'is_not_null'
}

export enum LogicalOperator {
  AND = 'and',
  OR = 'or',
  NOT = 'not'
}

export enum SyncDirection {
  INBOUND = 'inbound',
  OUTBOUND = 'outbound',
  BIDIRECTIONAL = 'bidirectional'
}

export enum SyncFrequency {
  REAL_TIME = 'real_time',
  HOURLY = 'hourly',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MANUAL = 'manual',
  CUSTOM = 'custom'
}

export enum ScheduleType {
  INTERVAL = 'interval',
  CRON = 'cron',
  EVENT_DRIVEN = 'event_driven'
}

export enum BackoffStrategy {
  FIXED = 'fixed',
  LINEAR = 'linear',
  EXPONENTIAL = 'exponential',
  CUSTOM = 'custom'
}

export enum ErrorStrategy {
  FAIL_FAST = 'fail_fast',
  CONTINUE = 'continue',
  RETRY = 'retry',
  SKIP = 'skip',
  MANUAL = 'manual'
}

export enum NullHandling {
  PRESERVE = 'preserve',
  IGNORE = 'ignore',
  DEFAULT = 'default',
  ERROR = 'error'
}

export enum ErrorHandling {
  STRICT = 'strict',
  LENIENT = 'lenient',
  CUSTOM = 'custom'
}

export enum FilterOperator {
  EQUALS = 'equals',
  NOT_EQUALS = 'not_equals',
  GREATER_THAN = 'greater_than',
  LESS_THAN = 'less_than',
  CONTAINS = 'contains',
  IN = 'in',
  BETWEEN = 'between'
}

export enum AlertChannel {
  EMAIL = 'email',
  SMS = 'sms',
  SLACK = 'slack',
  WEBHOOK = 'webhook',
  IN_APP = 'in_app'
}

export enum AlertSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum WebhookAuthType {
  NONE = 'none',
  BASIC = 'basic',
  BEARER = 'bearer',
  API_KEY = 'api_key',
  SIGNATURE = 'signature'
}

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
  TRACE = 'trace'
}

export enum SupportLevel {
  BASIC = 'basic',
  STANDARD = 'standard',
  PREMIUM = 'premium',
  ENTERPRISE = 'enterprise'
}

export enum CandidateStatus {
  NEW = 'new',
  ACTIVE = 'active',
  INTERVIEWING = 'interviewing',
  OFFER_PENDING = 'offer_pending',
  HIRED = 'hired',
  REJECTED = 'rejected',
  WITHDRAWN = 'withdrawn',
  ON_HOLD = 'on_hold'
}

export enum ApplicationStatus {
  APPLIED = 'applied',
  SCREENING = 'screening',
  INTERVIEWING = 'interviewing',
  ASSESSMENT = 'assessment',
  REFERENCE_CHECK = 'reference_check',
  OFFER = 'offer',
  HIRED = 'hired',
  REJECTED = 'rejected',
  WITHDRAWN = 'withdrawn'
}

export enum ApplicationStage {
  APPLICATION_REVIEW = 'application_review',
  PHONE_SCREEN = 'phone_screen',
  TECHNICAL_INTERVIEW = 'technical_interview',
  ON_SITE_INTERVIEW = 'on_site_interview',
  FINAL_INTERVIEW = 'final_interview',
  BACKGROUND_CHECK = 'background_check',
  OFFER_APPROVAL = 'offer_approval'
}

export enum EmploymentType {
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time',
  CONTRACT = 'contract',
  TEMPORARY = 'temporary',
  INTERNSHIP = 'internship',
  FREELANCE = 'freelance'
}

export enum ExperienceLevel {
  ENTRY_LEVEL = 'entry_level',
  MID_LEVEL = 'mid_level',
  SENIOR_LEVEL = 'senior_level',
  EXECUTIVE = 'executive',
  STUDENT = 'student'
}

export enum JobStatus {
  DRAFT = 'draft',
  OPEN = 'open',
  CLOSED = 'closed',
  ON_HOLD = 'on_hold',
  CANCELLED = 'cancelled'
}

export enum DocumentType {
  RESUME = 'resume',
  COVER_LETTER = 'cover_letter',
  PORTFOLIO = 'portfolio',
  TRANSCRIPT = 'transcript',
  CERTIFICATE = 'certificate',
  OTHER = 'other'
}

export enum NoteType {
  INTERVIEW = 'interview',
  CALL = 'call',
  EMAIL = 'email',
  MEETING = 'meeting',
  GENERAL = 'general'
}

export enum NoteVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
  TEAM = 'team',
  HIRING_MANAGER = 'hiring_manager'
}

export enum ActivityType {
  APPLICATION_SUBMITTED = 'application_submitted',
  STATUS_CHANGED = 'status_changed',
  INTERVIEW_SCHEDULED = 'interview_scheduled',
  NOTE_ADDED = 'note_added',
  EMAIL_SENT = 'email_sent',
  DOCUMENT_UPLOADED = 'document_uploaded'
}

export enum InterviewType {
  PHONE_SCREEN = 'phone_screen',
  VIDEO_INTERVIEW = 'video_interview',
  ON_SITE = 'on_site',
  TECHNICAL = 'technical',
  BEHAVIORAL = 'behavioral',
  PANEL = 'panel'
}

export enum InterviewFormat {
  IN_PERSON = 'in_person',
  VIDEO_CALL = 'video_call',
  PHONE_CALL = 'phone_call',
  AI_CONVERSATION = 'ai_conversation'
}

export enum InterviewStatus {
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show',
  RESCHEDULED = 'rescheduled'
}

export enum HiringRecommendation {
  STRONG_HIRE = 'strong_hire',
  HIRE = 'hire',
  NO_HIRE = 'no_hire',
  STRONG_NO_HIRE = 'strong_no_hire'
}

export enum FeedbackType {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  NEUTRAL = 'neutral',
  MIXED = 'mixed'
}

export enum FeedbackVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
  HIRING_TEAM = 'hiring_team'
}

export enum ReferenceStatus {
  PENDING = 'pending',
  CONTACTED = 'contacted',
  COMPLETED = 'completed',
  DECLINED = 'declined'
}

export enum OfferStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  VIEWED = 'viewed',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  EXPIRED = 'expired',
  WITHDRAWN = 'withdrawn'
}

export enum SalaryFrequency {
  HOURLY = 'hourly',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  ANNUALLY = 'annually'
}

export enum SyncOperationType {
  FULL_SYNC = 'full_sync',
  INCREMENTAL_SYNC = 'incremental_sync',
  REAL_TIME_SYNC = 'real_time_sync',
  MANUAL_SYNC = 'manual_sync'
}

export enum SyncStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  PAUSED = 'paused'
}

export enum RecordSyncStatus {
  SUCCESS = 'success',
  FAILED = 'failed',
  SKIPPED = 'skipped',
  CONFLICT = 'conflict'
}

export enum ConflictResolution {
  LOCAL_WINS = 'local_wins',
  REMOTE_WINS = 'remote_wins',
  MERGE = 'merge',
  MANUAL = 'manual',
  SKIP = 'skip'
}

export enum WarningType {
  DATA_QUALITY = 'data_quality',
  MAPPING = 'mapping',
  VALIDATION = 'validation',
  RATE_LIMIT = 'rate_limit',
  QUOTA = 'quota'
}

export enum WarningSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export enum ErrorType {
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  NETWORK = 'network',
  TIMEOUT = 'timeout',
  RATE_LIMIT = 'rate_limit',
  VALIDATION = 'validation',
  MAPPING = 'mapping',
  BUSINESS_RULE = 'business_rule',
  UNKNOWN = 'unknown'
}

export enum TriggerType {
  SCHEDULED = 'scheduled',
  MANUAL = 'manual',
  EVENT = 'event',
  WEBHOOK = 'webhook',
  API = 'api'
}

export enum EventType {
  CANDIDATE_CREATED = 'candidate_created',
  CANDIDATE_UPDATED = 'candidate_updated',
  APPLICATION_SUBMITTED = 'application_submitted',
  INTERVIEW_SCHEDULED = 'interview_scheduled',
  INTERVIEW_COMPLETED = 'interview_completed',
  STATUS_CHANGED = 'status_changed',
  OFFER_SENT = 'offer_sent',
  OFFER_ACCEPTED = 'offer_accepted'
}

export interface TimeRange {
  start: string
  end: string
}

export interface AuthenticationConfig {
  type: CredentialType
  settings: { [key: string]: any }
  refreshSettings?: RefreshSettings
}

export interface RefreshSettings {
  enabled: boolean
  threshold: number
  endpoint: string
  method: string
}

export interface FeatureConfiguration {
  candidateSync: boolean
  jobSync: boolean
  applicationSync: boolean
  interviewSync: boolean
  documentSync: boolean
  webhooks: boolean
  realTime: boolean
  bulkOperations: boolean
}

export interface CustomFieldConfig {
  id: string
  name: string
  type: string
  required: boolean
  defaultValue?: any
  validation?: FieldValidation
  mapping?: FieldMapping
}

export interface BusinessRuleConfig {
  id: string
  name: string
  description: string
  condition: string
  action: string
  priority: number
  active: boolean
}

export interface ErrorLoggingConfig {
  enabled: boolean
  level: LogLevel
  destination: LogDestination
  format: LogFormat
  retention: number
}

export interface ErrorEscalationConfig {
  enabled: boolean
  levels: EscalationLevel[]
  rules: EscalationRule[]
}

export interface EscalationLevel {
  level: number
  threshold: number
  contacts: string[]
  delay: number
}

export interface EscalationRule {
  condition: string
  level: number
  immediate: boolean
}

export enum LogDestination {
  FILE = 'file',
  DATABASE = 'database',
  SYSLOG = 'syslog',
  CLOUD = 'cloud'
}

export enum LogFormat {
  JSON = 'json',
  TEXT = 'text',
  STRUCTURED = 'structured'
}

export class ATSIntegrationService {
  private integrations: Map<string, ATSIntegrationConfig> = new Map()
  private syncOperations: Map<string, SyncOperation> = new Map()
  private eventQueue: IntegrationEvent[] = []

  constructor() {
    this.initializeIntegrations()
  }

  // Main integration management methods
  async createIntegration(config: ATSIntegrationConfig): Promise<string> {
    // Validate configuration
    await this.validateConfiguration(config)
    
    // Test connection
    const connectionTest = await this.testConnection(config)
    if (!connectionTest.success) {
      throw new Error(`Connection test failed: ${connectionTest.error}`)
    }

    // Store configuration
    this.integrations.set(config.id, config)
    
    // Initialize webhook endpoints if enabled
    if (config.webhookConfig.enabled) {
      await this.setupWebhooks(config)
    }

    return config.id
  }

  async updateIntegration(id: string, updates: Partial<ATSIntegrationConfig>): Promise<void> {
    const existing = this.integrations.get(id)
    if (!existing) {
      throw new Error(`Integration ${id} not found`)
    }

    const updated = { ...existing, ...updates, updatedAt: new Date() }
    await this.validateConfiguration(updated)
    this.integrations.set(id, updated)
  }

  async deleteIntegration(id: string): Promise<void> {
    const integration = this.integrations.get(id)
    if (!integration) {
      throw new Error(`Integration ${id} not found`)
    }

    // Clean up webhooks
    if (integration.webhookConfig.enabled) {
      await this.cleanupWebhooks(integration)
    }

    // Cancel any running sync operations
    await this.cancelSyncOperations(id)

    this.integrations.delete(id)
  }

  // Candidate synchronization methods
  async syncCandidates(integrationId: string, options?: SyncOptions): Promise<SyncOperation> {
    const integration = this.integrations.get(integrationId)
    if (!integration) {
      throw new Error(`Integration ${integrationId} not found`)
    }

    const operation: SyncOperation = {
      id: `sync_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: options?.type || SyncOperationType.INCREMENTAL_SYNC,
      direction: options?.direction || SyncDirection.INBOUND,
      entity: 'candidates',
      startedAt: new Date(),
      status: SyncStatus.PENDING,
      progress: {
        total: 0,
        processed: 0,
        succeeded: 0,
        failed: 0,
        skipped: 0,
        percentage: 0
      },
      results: {
        summary: {
          totalRecords: 0,
          created: 0,
          updated: 0,
          deleted: 0,
          skipped: 0,
          errors: 0,
          duration: 0,
          throughput: 0
        },
        details: [],
        conflicts: [],
        warnings: []
      },
      errors: [],
      metadata: {
        triggerType: options?.trigger || TriggerType.MANUAL,
        triggeredBy: options?.userId || 'system',
        configuration: integrationId,
        dataVersion: '1.0',
        checksum: '',
        tags: options?.tags || []
      }
    }

    this.syncOperations.set(operation.id, operation)

    // Start sync operation asynchronously
    this.executeCandidateSync(integration, operation, options)
      .catch(error => {
        operation.status = SyncStatus.FAILED
        operation.errors.push({
          id: `error_${Date.now()}`,
          type: ErrorType.UNKNOWN,
          message: error.message,
          details: error.stack || '',
          timestamp: new Date(),
          retryCount: 0,
          resolved: false
        })
      })

    return operation
  }

  private async executeCandidateSync(
    integration: ATSIntegrationConfig,
    operation: SyncOperation,
    options?: SyncOptions
  ): Promise<void> {
    operation.status = SyncStatus.RUNNING

    try {
      // Get candidates from ATS
      const atsCandidates = await this.fetchCandidatesFromATS(integration, options)
      operation.progress.total = atsCandidates.length

      // Process candidates in batches
      const batchSize = integration.syncSettings.batchSize || 100
      const batches = this.createBatches(atsCandidates, batchSize)
      operation.progress.totalBatches = batches.length

      for (let i = 0; i < batches.length; i++) {
        operation.progress.currentBatch = i + 1
        const batch = batches[i]

        for (const atsCandidate of batch) {
          try {
            const result = await this.processCandidateSync(integration, atsCandidate, operation)
            operation.results.details.push(result)
            
            if (result.status === RecordSyncStatus.SUCCESS) {
              operation.progress.succeeded++
              if (result.operation === SyncOperationType.FULL_SYNC) {
                operation.results.summary.created++
              } else {
                operation.results.summary.updated++
              }
            } else if (result.status === RecordSyncStatus.FAILED) {
              operation.progress.failed++
              operation.results.summary.errors++
            } else if (result.status === RecordSyncStatus.SKIPPED) {
              operation.progress.skipped++
              operation.results.summary.skipped++
            }

            operation.progress.processed++
            operation.progress.percentage = (operation.progress.processed / operation.progress.total) * 100

          } catch (error) {
            operation.progress.failed++
            operation.results.summary.errors++
            operation.errors.push({
              id: `error_${Date.now()}`,
              type: ErrorType.UNKNOWN,
              message: error.message,
              details: error.stack || '',
              recordId: atsCandidate.id,
              timestamp: new Date(),
              retryCount: 0,
              resolved: false
            })
          }
        }

        // Rate limiting
        if (i < batches.length - 1) {
          await this.waitForRateLimit(integration)
        }
      }

      operation.status = SyncStatus.COMPLETED
      operation.completedAt = new Date()
      operation.results.summary.duration = operation.completedAt.getTime() - operation.startedAt.getTime()
      operation.results.summary.throughput = operation.progress.total / (operation.results.summary.duration / 1000)

    } catch (error) {
      operation.status = SyncStatus.FAILED
      operation.errors.push({
        id: `error_${Date.now()}`,
        type: ErrorType.UNKNOWN,
        message: error.message,
        details: error.stack || '',
        timestamp: new Date(),
        retryCount: 0,
        resolved: false
      })
    }
  }

  private async processCandidateSync(
    integration: ATSIntegrationConfig,
    atsCandidate: ATSCandidate,
    operation: SyncOperation
  ): Promise<SyncDetail> {
    const detail: SyncDetail = {
      recordId: atsCandidate.id,
      operation: operation.type,
      status: RecordSyncStatus.SUCCESS,
      changes: [],
      errors: [],
      timestamps: {
        started: new Date(),
        lastModified: atsCandidate.updatedAt
      }
    }

    try {
      // Transform ATS candidate to internal format
      const internalCandidate = await this.transformATSCandidate(integration, atsCandidate)
      
      // Check if candidate exists
      const existingCandidate = await this.findExistingCandidate(atsCandidate.externalId)
      
      if (existingCandidate) {
        // Update existing candidate
        const changes = await this.detectCandidateChanges(existingCandidate, internalCandidate)
        if (changes.length > 0) {
          await this.updateCandidate(existingCandidate.id, internalCandidate)
          detail.changes = changes
          detail.operation = SyncOperationType.INCREMENTAL_SYNC
        } else {
          detail.status = RecordSyncStatus.SKIPPED
        }
      } else {
        // Create new candidate
        await this.createCandidate(internalCandidate)
        detail.operation = SyncOperationType.FULL_SYNC
      }

      detail.timestamps.completed = new Date()

    } catch (error) {
      detail.status = RecordSyncStatus.FAILED
      detail.errors.push(error.message)
    }

    return detail
  }

  // ATS-specific implementations
  private async fetchCandidatesFromATS(
    integration: ATSIntegrationConfig,
    options?: SyncOptions
  ): Promise<ATSCandidate[]> {
    switch (integration.type) {
      case ATSType.WORKDAY:
        return this.fetchWorkdayCandidates(integration, options)
      case ATSType.GREENHOUSE:
        return this.fetchGreenhouseCandidates(integration, options)
      case ATSType.BAMBOO_HR:
        return this.fetchBambooHRCandidates(integration, options)
      default:
        throw new Error(`Unsupported ATS type: ${integration.type}`)
    }
  }

  private async fetchWorkdayCandidates(
    integration: ATSIntegrationConfig,
    options?: SyncOptions
  ): Promise<ATSCandidate[]> {
    // Workday REST API implementation
    const baseUrl = integration.configuration.baseUrl
    const endpoint = `${baseUrl}/ccx/service/tenant/workers`
    
    const headers = {
      'Authorization': `Bearer ${integration.credentials.accessToken}`,
      'Content-Type': 'application/json'
    }

    const params = {
      limit: options?.batchSize || 100,
      offset: options?.offset || 0
    }

    if (options?.lastModified) {
      params['lastModified'] = options.lastModified.toISOString()
    }

    const response = await fetch(`${endpoint}?${new URLSearchParams(params)}`, {
      method: 'GET',
      headers
    })

    if (!response.ok) {
      throw new Error(`Workday API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return this.transformWorkdayResponse(data)
  }

  private async fetchGreenhouseCandidates(
    integration: ATSIntegrationConfig,
    options?: SyncOptions
  ): Promise<ATSCandidate[]> {
    // Greenhouse API implementation
    const baseUrl = integration.configuration.baseUrl || 'https://harvest.greenhouse.io/v1'
    const endpoint = `${baseUrl}/candidates`
    
    const headers = {
      'Authorization': `Basic ${Buffer.from(integration.credentials.apiKey + ':').toString('base64')}`,
      'Content-Type': 'application/json'
    }

    const params = {
      per_page: options?.batchSize || 100,
      page: options?.page || 1
    }

    if (options?.lastModified) {
      params['updated_after'] = options.lastModified.toISOString()
    }

    const response = await fetch(`${endpoint}?${new URLSearchParams(params)}`, {
      method: 'GET',
      headers
    })

    if (!response.ok) {
      throw new Error(`Greenhouse API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return this.transformGreenhouseResponse(data)
  }

  private async fetchBambooHRCandidates(
    integration: ATSIntegrationConfig,
    options?: SyncOptions
  ): Promise<ATSCandidate[]> {
    // BambooHR API implementation
    const baseUrl = integration.configuration.baseUrl
    const companyDomain = integration.configuration.companyId
    const endpoint = `${baseUrl}/${companyDomain}/v1/applicants`
    
    const headers = {
      'Authorization': `Basic ${Buffer.from(integration.credentials.apiKey + ':x').toString('base64')}`,
      'Accept': 'application/json'
    }

    const response = await fetch(endpoint, {
      method: 'GET',
      headers
    })

    if (!response.ok) {
      throw new Error(`BambooHR API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return this.transformBambooHRResponse(data)
  }

  // Data transformation methods
  private transformWorkdayResponse(data: any): ATSCandidate[] {
    // Transform Workday worker data to standard format
    return data.Report_Entry?.map((entry: any) => ({
      id: entry.Worker_ID,
      externalId: entry.Worker_ID,
      firstName: entry.Legal_Name_First_Name,
      lastName: entry.Legal_Name_Last_Name,
      email: entry.Primary_Work_Email,
      phone: entry.Primary_Work_Phone,
      applications: [],
      tags: [],
      sources: ['workday'],
      customFields: {},
      createdAt: new Date(entry.Hire_Date),
      updatedAt: new Date(),
      status: this.mapWorkdayStatus(entry.Worker_Status),
      notes: [],
      activities: [],
      documents: [],
      interviews: [],
      references: [],
      offers: []
    })) || []
  }

  private transformGreenhouseResponse(data: any): ATSCandidate[] {
    // Transform Greenhouse candidate data to standard format
    return data.map((candidate: any) => ({
      id: candidate.id.toString(),
      externalId: candidate.id.toString(),
      firstName: candidate.first_name,
      lastName: candidate.last_name,
      email: candidate.email_addresses?.[0]?.value,
      phone: candidate.phone_numbers?.[0]?.value,
      applications: candidate.applications?.map((app: any) => ({
        id: app.id.toString(),
        jobId: app.job?.id.toString(),
        jobTitle: app.job?.name,
        department: app.job?.departments?.[0]?.name,
        location: app.job?.offices?.[0]?.name,
        appliedAt: new Date(app.applied_at),
        status: this.mapGreenhouseStatus(app.status),
        stage: this.mapGreenhouseStage(app.current_stage?.name),
        source: app.source?.public_name || 'unknown',
        customFields: {},
        scorecards: [],
        feedback: [],
        rejectionReason: app.rejection_reason?.name
      })) || [],
      tags: candidate.tags?.map((tag: any) => tag.name) || [],
      sources: [candidate.last_activity?.source?.public_name || 'greenhouse'],
      customFields: this.extractGreenhouseCustomFields(candidate.custom_fields),
      createdAt: new Date(candidate.created_at),
      updatedAt: new Date(candidate.updated_at),
      status: CandidateStatus.ACTIVE,
      notes: [],
      activities: [],
      documents: candidate.attachments?.map((att: any) => ({
        id: att.id.toString(),
        name: att.filename,
        type: this.mapDocumentType(att.type),
        url: att.url,
        size: att.file_size || 0,
        mimeType: att.content_type || 'application/octet-stream',
        uploadedAt: new Date(att.created_at),
        uploadedBy: 'candidate',
        tags: [],
        parsed: false
      })) || [],
      interviews: [],
      references: [],
      offers: []
    }))
  }

  private transformBambooHRResponse(data: any): ATSCandidate[] {
    // Transform BambooHR applicant data to standard format
    return data.applicants?.map((applicant: any) => ({
      id: applicant.id.toString(),
      externalId: applicant.id.toString(),
      firstName: applicant.firstName,
      lastName: applicant.lastName,
      email: applicant.email,
      phone: applicant.phoneNumber,
      applications: [{
        id: applicant.id.toString(),
        jobId: applicant.jobId?.toString() || '',
        jobTitle: applicant.jobTitle || '',
        department: '',
        location: '',
        appliedAt: new Date(applicant.dateApplied),
        status: this.mapBambooHRStatus(applicant.status),
        stage: ApplicationStage.APPLICATION_REVIEW,
        source: applicant.source || 'bamboohr',
        customFields: {},
        scorecards: [],
        feedback: [],
        rejectionReason: applicant.rejectionReason
      }],
      tags: [],
      sources: ['bamboohr'],
      customFields: {},
      createdAt: new Date(applicant.dateApplied),
      updatedAt: new Date(),
      status: CandidateStatus.ACTIVE,
      notes: [],
      activities: [],
      documents: [],
      interviews: [],
      references: [],
      offers: []
    })) || []
  }

  // Utility methods
  private async validateConfiguration(config: ATSIntegrationConfig): Promise<void> {
    // Validate required fields
    if (!config.id || !config.name || !config.type) {
      throw new Error('Missing required configuration fields')
    }

    // Validate credentials
    if (!config.credentials || !this.validateCredentials(config.credentials)) {
      throw new Error('Invalid credentials configuration')
    }

    // Validate endpoints
    if (!config.endpoints || !this.validateEndpoints(config.endpoints)) {
      throw new Error('Invalid endpoints configuration')
    }
  }

  private validateCredentials(credentials: ATSCredentials): boolean {
    switch (credentials.type) {
      case CredentialType.API_KEY:
        return !!credentials.apiKey
      case CredentialType.OAUTH2:
        return !!(credentials.clientId && credentials.clientSecret)
      case CredentialType.BASIC_AUTH:
        return !!(credentials.username && credentials.password)
      case CredentialType.BEARER_TOKEN:
        return !!credentials.accessToken
      default:
        return false
    }
  }

  private validateEndpoints(endpoints: ATSEndpoints): boolean {
    return !!(endpoints.candidates && endpoints.jobs && endpoints.applications)
  }

  private async testConnection(config: ATSIntegrationConfig): Promise<{ success: boolean; error?: string }> {
    try {
      // Implement connection test based on ATS type
      switch (config.type) {
        case ATSType.WORKDAY:
          return await this.testWorkdayConnection(config)
        case ATSType.GREENHOUSE:
          return await this.testGreenhouseConnection(config)
        case ATSType.BAMBOO_HR:
          return await this.testBambooHRConnection(config)
        default:
          return { success: false, error: 'Unsupported ATS type' }
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  private async testWorkdayConnection(config: ATSIntegrationConfig): Promise<{ success: boolean; error?: string }> {
    // Test Workday connection
    try {
      const response = await fetch(`${config.configuration.baseUrl}/ccx/service/tenant/workers?limit=1`, {
        headers: {
          'Authorization': `Bearer ${config.credentials.accessToken}`,
          'Content-Type': 'application/json'
        }
      })
      return { success: response.ok }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  private async testGreenhouseConnection(config: ATSIntegrationConfig): Promise<{ success: boolean; error?: string }> {
    // Test Greenhouse connection
    try {
      const baseUrl = config.configuration.baseUrl || 'https://harvest.greenhouse.io/v1'
      const response = await fetch(`${baseUrl}/candidates?per_page=1`, {
        headers: {
          'Authorization': `Basic ${Buffer.from(config.credentials.apiKey + ':').toString('base64')}`,
          'Content-Type': 'application/json'
        }
      })
      return { success: response.ok }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  private async testBambooHRConnection(config: ATSIntegrationConfig): Promise<{ success: boolean; error?: string }> {
    // Test BambooHR connection
    try {
      const companyDomain = config.configuration.companyId
      const response = await fetch(`${config.configuration.baseUrl}/${companyDomain}/v1/meta/users`, {
        headers: {
          'Authorization': `Basic ${Buffer.from(config.credentials.apiKey + ':x').toString('base64')}`,
          'Accept': 'application/json'
        }
      })
      return { success: response.ok }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Status mapping methods
  private mapWorkdayStatus(status: string): CandidateStatus {
    const statusMap = {
      'Active': CandidateStatus.ACTIVE,
      'Terminated': CandidateStatus.REJECTED,
      'Leave': CandidateStatus.ON_HOLD
    }
    return statusMap[status] || CandidateStatus.ACTIVE
  }

  private mapGreenhouseStatus(status: string): ApplicationStatus {
    const statusMap = {
      'active': ApplicationStatus.SCREENING,
      'rejected': ApplicationStatus.REJECTED,
      'hired': ApplicationStatus.HIRED
    }
    return statusMap[status] || ApplicationStatus.APPLIED
  }

  private mapGreenhouseStage(stage: string): ApplicationStage {
    const stageMap = {
      'Application Review': ApplicationStage.APPLICATION_REVIEW,
      'Phone Screen': ApplicationStage.PHONE_SCREEN,
      'Technical Interview': ApplicationStage.TECHNICAL_INTERVIEW,
      'On-Site Interview': ApplicationStage.ON_SITE_INTERVIEW,
      'Final Interview': ApplicationStage.FINAL_INTERVIEW
    }
    return stageMap[stage] || ApplicationStage.APPLICATION_REVIEW
  }

  private mapBambooHRStatus(status: string): ApplicationStatus {
    const statusMap = {
      'New': ApplicationStatus.APPLIED,
      'In Progress': ApplicationStatus.SCREENING,
      'Hired': ApplicationStatus.HIRED,
      'Declined': ApplicationStatus.REJECTED
    }
    return statusMap[status] || ApplicationStatus.APPLIED
  }

  private mapDocumentType(type: string): DocumentType {
    const typeMap = {
      'resume': DocumentType.RESUME,
      'cover_letter': DocumentType.COVER_LETTER,
      'portfolio': DocumentType.PORTFOLIO,
      'transcript': DocumentType.TRANSCRIPT
    }
    return typeMap[type] || DocumentType.OTHER
  }

  // Additional utility methods would continue here...

  private initializeIntegrations(): void {
    // Initialize default integration configurations
    // This would typically load from database
  }

  // Public API methods
  async getIntegration(id: string): Promise<ATSIntegrationConfig | null> {
    return this.integrations.get(id) || null
  }

  async listIntegrations(): Promise<ATSIntegrationConfig[]> {
    return Array.from(this.integrations.values())
  }

  async getSyncOperation(id: string): Promise<SyncOperation | null> {
    return this.syncOperations.get(id) || null
  }

  async listSyncOperations(integrationId?: string): Promise<SyncOperation[]> {
    const operations = Array.from(this.syncOperations.values())
    if (integrationId) {
      return operations.filter(op => op.metadata.configuration === integrationId)
    }
    return operations
  }

  async cancelSyncOperation(operationId: string): Promise<boolean> {
    const operation = this.syncOperations.get(operationId)
    if (operation && operation.status === SyncStatus.RUNNING) {
      operation.status = SyncStatus.CANCELLED
      return true
    }
    return false
  }
}

export interface SyncOptions {
  type?: SyncOperationType
  direction?: SyncDirection
  batchSize?: number
  offset?: number
  page?: number
  lastModified?: Date
  trigger?: TriggerType
  userId?: string
  tags?: string[]
}

// Singleton instance
export const atsIntegrationService = new ATSIntegrationService()