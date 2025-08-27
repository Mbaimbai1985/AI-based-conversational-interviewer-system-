import { DynamicProfile } from '../candidate/profileBuilder'
import { ScoreResult } from '../candidate/scoringEngine'

export interface CandidateListItem {
  id: string
  name: string
  email: string
  phone?: string
  position: string
  status: InterviewStatus
  overallScore: number
  lastInteraction: Date
  scheduledDate?: Date
  completionDate?: Date
  profileSummary: CandidateProfileSummary
  tags: string[]
  priority: CandidatePriority
  source: CandidateSource
  recruiterNotes: string[]
  flagged: boolean
  flagReason?: string
}

export interface CandidateProfileSummary {
  experienceLevel: ExperienceLevel
  keySkills: SkillSummary[]
  strengths: string[]
  concerns: string[]
  culturalFit: number
  communicationScore: number
  technicalScore: number
  behavioralScore: number
}

export interface SkillSummary {
  skill: string
  proficiency: ProficiencyLevel
  verified: boolean
  confidence: number
  relevance: number
}

export interface CandidateFilter {
  status?: InterviewStatus[]
  scoreRange?: ScoreRange
  experienceLevel?: ExperienceLevel[]
  skills?: string[]
  dateRange?: DateRange
  positions?: string[]
  sources?: CandidateSource[]
  priority?: CandidatePriority[]
  flagged?: boolean
  tags?: string[]
}

export interface CandidateSortOptions {
  field: SortField
  direction: SortDirection
  secondarySort?: {
    field: SortField
    direction: SortDirection
  }
}

export interface ScoreRange {
  min: number
  max: number
}

export interface DateRange {
  start: Date
  end: Date
}

export interface CandidateListResponse {
  candidates: CandidateListItem[]
  totalCount: number
  filteredCount: number
  pagination: PaginationInfo
  aggregations: CandidateAggregations
}

export interface PaginationInfo {
  page: number
  pageSize: number
  totalPages: number
  hasNext: boolean
  hasPrevious: boolean
}

export interface CandidateAggregations {
  statusCounts: { [status: string]: number }
  averageScore: number
  scoreDistribution: ScoreDistribution
  skillFrequency: { [skill: string]: number }
  experienceLevelCounts: { [level: string]: number }
  completionRate: number
  sourceBreakdown: { [source: string]: number }
}

export interface ScoreDistribution {
  ranges: ScoreRangeCount[]
  percentiles: number[]
}

export interface ScoreRangeCount {
  min: number
  max: number
  count: number
  percentage: number
}

export interface RealTimeUpdate {
  type: UpdateType
  candidateId: string
  timestamp: Date
  data: any
  affectedFields: string[]
}

export interface BulkAction {
  type: BulkActionType
  candidateIds: string[]
  parameters?: any
  scheduledFor?: Date
}

export interface BulkActionResult {
  successful: string[]
  failed: { id: string; error: string }[]
  summary: BulkActionSummary
}

export interface BulkActionSummary {
  totalProcessed: number
  successCount: number
  failureCount: number
  warnings: string[]
}

export enum InterviewStatus {
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show',
  RESCHEDULED = 'rescheduled',
  PENDING_REVIEW = 'pending_review',
  REJECTED = 'rejected',
  SHORTLISTED = 'shortlisted',
  HIRED = 'hired'
}

export enum CandidatePriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export enum CandidateSource {
  CAREER_SITE = 'career_site',
  JOB_BOARD = 'job_board',
  REFERRAL = 'referral',
  RECRUITER = 'recruiter',
  SOCIAL_MEDIA = 'social_media',
  UNIVERSITY = 'university',
  EVENT = 'event',
  DIRECT_APPLICATION = 'direct_application'
}

export enum ExperienceLevel {
  ENTRY = 'entry',
  JUNIOR = 'junior',
  MID = 'mid',
  SENIOR = 'senior',
  LEAD = 'lead',
  PRINCIPAL = 'principal',
  EXECUTIVE = 'executive'
}

export enum ProficiencyLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

export enum SortField {
  NAME = 'name',
  SCORE = 'score',
  STATUS = 'status',
  LAST_INTERACTION = 'lastInteraction',
  SCHEDULED_DATE = 'scheduledDate',
  COMPLETION_DATE = 'completionDate',
  EXPERIENCE_LEVEL = 'experienceLevel',
  POSITION = 'position',
  PRIORITY = 'priority'
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc'
}

export enum UpdateType {
  STATUS_CHANGE = 'status_change',
  SCORE_UPDATE = 'score_update',
  PROFILE_UPDATE = 'profile_update',
  NOTE_ADDED = 'note_added',
  TAG_ADDED = 'tag_added',
  TAG_REMOVED = 'tag_removed',
  FLAG_CHANGED = 'flag_changed'
}

export enum BulkActionType {
  UPDATE_STATUS = 'update_status',
  ADD_TAGS = 'add_tags',
  REMOVE_TAGS = 'remove_tags',
  SET_PRIORITY = 'set_priority',
  SCHEDULE_INTERVIEWS = 'schedule_interviews',
  EXPORT_DATA = 'export_data',
  SEND_NOTIFICATIONS = 'send_notifications'
}

export class CandidateManagementService {
  private candidates: Map<string, CandidateListItem> = new Map()
  private realtimeSubscribers: Map<string, (update: RealTimeUpdate) => void> = new Map()
  private cacheTTL = 5 * 60 * 1000 // 5 minutes
  private cachedAggregations: { data: CandidateAggregations; timestamp: Date } | null = null

  // Real-time candidate list with live updates
  async getCandidateList(
    filter?: CandidateFilter,
    sort?: CandidateSortOptions,
    page: number = 1,
    pageSize: number = 25
  ): Promise<CandidateListResponse> {
    // Apply filters
    let filteredCandidates = Array.from(this.candidates.values())
    
    if (filter) {
      filteredCandidates = this.applyFilters(filteredCandidates, filter)
    }

    // Apply sorting
    if (sort) {
      filteredCandidates = this.applySorting(filteredCandidates, sort)
    }

    // Calculate aggregations
    const aggregations = await this.calculateAggregations(filteredCandidates)

    // Apply pagination
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedCandidates = filteredCandidates.slice(startIndex, endIndex)

    const totalCount = this.candidates.size
    const filteredCount = filteredCandidates.length
    const totalPages = Math.ceil(filteredCount / pageSize)

    return {
      candidates: paginatedCandidates,
      totalCount,
      filteredCount,
      pagination: {
        page,
        pageSize,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1
      },
      aggregations
    }
  }

  private applyFilters(candidates: CandidateListItem[], filter: CandidateFilter): CandidateListItem[] {
    return candidates.filter(candidate => {
      // Status filter
      if (filter.status && !filter.status.includes(candidate.status)) {
        return false
      }

      // Score range filter
      if (filter.scoreRange) {
        const { min, max } = filter.scoreRange
        if (candidate.overallScore < min || candidate.overallScore > max) {
          return false
        }
      }

      // Experience level filter
      if (filter.experienceLevel && !filter.experienceLevel.includes(candidate.profileSummary.experienceLevel)) {
        return false
      }

      // Skills filter
      if (filter.skills && filter.skills.length > 0) {
        const candidateSkills = candidate.profileSummary.keySkills.map(s => s.skill.toLowerCase())
        const hasRequiredSkills = filter.skills.some(skill => 
          candidateSkills.some(cs => cs.includes(skill.toLowerCase()))
        )
        if (!hasRequiredSkills) {
          return false
        }
      }

      // Date range filter
      if (filter.dateRange) {
        const candidateDate = candidate.lastInteraction
        if (candidateDate < filter.dateRange.start || candidateDate > filter.dateRange.end) {
          return false
        }
      }

      // Position filter
      if (filter.positions && !filter.positions.includes(candidate.position)) {
        return false
      }

      // Source filter
      if (filter.sources && !filter.sources.includes(candidate.source)) {
        return false
      }

      // Priority filter
      if (filter.priority && !filter.priority.includes(candidate.priority)) {
        return false
      }

      // Flagged filter
      if (filter.flagged !== undefined && candidate.flagged !== filter.flagged) {
        return false
      }

      // Tags filter
      if (filter.tags && filter.tags.length > 0) {
        const hasRequiredTags = filter.tags.some(tag => candidate.tags.includes(tag))
        if (!hasRequiredTags) {
          return false
        }
      }

      return true
    })
  }

  private applySorting(candidates: CandidateListItem[], sort: CandidateSortOptions): CandidateListItem[] {
    return candidates.sort((a, b) => {
      const primaryResult = this.compareByField(a, b, sort.field, sort.direction)
      
      if (primaryResult !== 0) {
        return primaryResult
      }

      // Apply secondary sort if primary values are equal
      if (sort.secondarySort) {
        return this.compareByField(a, b, sort.secondarySort.field, sort.secondarySort.direction)
      }

      return 0
    })
  }

  private compareByField(a: CandidateListItem, b: CandidateListItem, field: SortField, direction: SortDirection): number {
    let aValue: any
    let bValue: any

    switch (field) {
      case SortField.NAME:
        aValue = a.name.toLowerCase()
        bValue = b.name.toLowerCase()
        break
      case SortField.SCORE:
        aValue = a.overallScore
        bValue = b.overallScore
        break
      case SortField.STATUS:
        aValue = a.status
        bValue = b.status
        break
      case SortField.LAST_INTERACTION:
        aValue = a.lastInteraction.getTime()
        bValue = b.lastInteraction.getTime()
        break
      case SortField.SCHEDULED_DATE:
        aValue = a.scheduledDate?.getTime() || 0
        bValue = b.scheduledDate?.getTime() || 0
        break
      case SortField.COMPLETION_DATE:
        aValue = a.completionDate?.getTime() || 0
        bValue = b.completionDate?.getTime() || 0
        break
      case SortField.EXPERIENCE_LEVEL:
        aValue = this.getExperienceLevelOrder(a.profileSummary.experienceLevel)
        bValue = this.getExperienceLevelOrder(b.profileSummary.experienceLevel)
        break
      case SortField.POSITION:
        aValue = a.position.toLowerCase()
        bValue = b.position.toLowerCase()
        break
      case SortField.PRIORITY:
        aValue = this.getPriorityOrder(a.priority)
        bValue = this.getPriorityOrder(b.priority)
        break
      default:
        return 0
    }

    let result = 0
    if (aValue < bValue) result = -1
    else if (aValue > bValue) result = 1

    return direction === SortDirection.DESC ? -result : result
  }

  private getExperienceLevelOrder(level: ExperienceLevel): number {
    const order = {
      [ExperienceLevel.ENTRY]: 1,
      [ExperienceLevel.JUNIOR]: 2,
      [ExperienceLevel.MID]: 3,
      [ExperienceLevel.SENIOR]: 4,
      [ExperienceLevel.LEAD]: 5,
      [ExperienceLevel.PRINCIPAL]: 6,
      [ExperienceLevel.EXECUTIVE]: 7
    }
    return order[level] || 0
  }

  private getPriorityOrder(priority: CandidatePriority): number {
    const order = {
      [CandidatePriority.LOW]: 1,
      [CandidatePriority.MEDIUM]: 2,
      [CandidatePriority.HIGH]: 3,
      [CandidatePriority.URGENT]: 4
    }
    return order[priority] || 0
  }

  private async calculateAggregations(candidates: CandidateListItem[]): Promise<CandidateAggregations> {
    // Check cache first
    if (this.cachedAggregations && 
        new Date().getTime() - this.cachedAggregations.timestamp.getTime() < this.cacheTTL) {
      return this.cachedAggregations.data
    }

    const statusCounts: { [status: string]: number } = {}
    const skillFrequency: { [skill: string]: number } = {}
    const experienceLevelCounts: { [level: string]: number } = {}
    const sourceBreakdown: { [source: string]: number } = {}
    const scores: number[] = []

    candidates.forEach(candidate => {
      // Status counts
      statusCounts[candidate.status] = (statusCounts[candidate.status] || 0) + 1

      // Skill frequency
      candidate.profileSummary.keySkills.forEach(skill => {
        skillFrequency[skill.skill] = (skillFrequency[skill.skill] || 0) + 1
      })

      // Experience level counts
      experienceLevelCounts[candidate.profileSummary.experienceLevel] = 
        (experienceLevelCounts[candidate.profileSummary.experienceLevel] || 0) + 1

      // Source breakdown
      sourceBreakdown[candidate.source] = (sourceBreakdown[candidate.source] || 0) + 1

      // Collect scores
      scores.push(candidate.overallScore)
    })

    const averageScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0
    const scoreDistribution = this.calculateScoreDistribution(scores)
    
    // Calculate completion rate
    const completedCount = statusCounts[InterviewStatus.COMPLETED] || 0
    const totalScheduled = candidates.filter(c => 
      c.status !== InterviewStatus.SCHEDULED && c.status !== InterviewStatus.CANCELLED
    ).length
    const completionRate = totalScheduled > 0 ? completedCount / totalScheduled : 0

    const aggregations: CandidateAggregations = {
      statusCounts,
      averageScore,
      scoreDistribution,
      skillFrequency,
      experienceLevelCounts,
      completionRate,
      sourceBreakdown
    }

    // Cache the results
    this.cachedAggregations = {
      data: aggregations,
      timestamp: new Date()
    }

    return aggregations
  }

  private calculateScoreDistribution(scores: number[]): ScoreDistribution {
    if (scores.length === 0) {
      return { ranges: [], percentiles: [] }
    }

    const sortedScores = [...scores].sort((a, b) => a - b)
    
    // Calculate score ranges
    const ranges: ScoreRangeCount[] = [
      { min: 0, max: 20, count: 0, percentage: 0 },
      { min: 20, max: 40, count: 0, percentage: 0 },
      { min: 40, max: 60, count: 0, percentage: 0 },
      { min: 60, max: 80, count: 0, percentage: 0 },
      { min: 80, max: 100, count: 0, percentage: 0 }
    ]

    scores.forEach(score => {
      const rangeIndex = Math.min(Math.floor(score / 20), 4)
      ranges[rangeIndex].count++
    })

    ranges.forEach(range => {
      range.percentage = (range.count / scores.length) * 100
    })

    // Calculate percentiles
    const percentiles = [10, 25, 50, 75, 90].map(p => {
      const index = Math.ceil((p / 100) * sortedScores.length) - 1
      return sortedScores[Math.max(0, index)]
    })

    return { ranges, percentiles }
  }

  // Real-time updates
  subscribeToUpdates(subscriberId: string, callback: (update: RealTimeUpdate) => void): void {
    this.realtimeSubscribers.set(subscriberId, callback)
  }

  unsubscribeFromUpdates(subscriberId: string): void {
    this.realtimeSubscribers.delete(subscriberId)
  }

  private notifySubscribers(update: RealTimeUpdate): void {
    this.realtimeSubscribers.forEach(callback => {
      try {
        callback(update)
      } catch (error) {
        console.error('Error notifying subscriber:', error)
      }
    })
  }

  // Candidate management methods
  async updateCandidateStatus(candidateId: string, status: InterviewStatus, reason?: string): Promise<void> {
    const candidate = this.candidates.get(candidateId)
    if (!candidate) {
      throw new Error(`Candidate ${candidateId} not found`)
    }

    const oldStatus = candidate.status
    candidate.status = status
    candidate.lastInteraction = new Date()

    // Add completion date if completed
    if (status === InterviewStatus.COMPLETED && !candidate.completionDate) {
      candidate.completionDate = new Date()
    }

    // Add recruiter note if reason provided
    if (reason) {
      candidate.recruiterNotes.push(`Status changed from ${oldStatus} to ${status}: ${reason}`)
    }

    // Invalidate cache
    this.cachedAggregations = null

    // Notify subscribers
    this.notifySubscribers({
      type: UpdateType.STATUS_CHANGE,
      candidateId,
      timestamp: new Date(),
      data: { oldStatus, newStatus: status, reason },
      affectedFields: ['status', 'lastInteraction', 'completionDate', 'recruiterNotes']
    })
  }

  async updateCandidateScore(candidateId: string, scoreResult: ScoreResult): Promise<void> {
    const candidate = this.candidates.get(candidateId)
    if (!candidate) {
      throw new Error(`Candidate ${candidateId} not found`)
    }

    candidate.overallScore = scoreResult.overallScore
    candidate.profileSummary.technicalScore = scoreResult.skillScore
    candidate.profileSummary.communicationScore = scoreResult.communicationScore
    candidate.lastInteraction = new Date()

    // Invalidate cache
    this.cachedAggregations = null

    // Notify subscribers
    this.notifySubscribers({
      type: UpdateType.SCORE_UPDATE,
      candidateId,
      timestamp: new Date(),
      data: { scoreResult },
      affectedFields: ['overallScore', 'profileSummary', 'lastInteraction']
    })
  }

  async addCandidateTags(candidateId: string, tags: string[]): Promise<void> {
    const candidate = this.candidates.get(candidateId)
    if (!candidate) {
      throw new Error(`Candidate ${candidateId} not found`)
    }

    const newTags = tags.filter(tag => !candidate.tags.includes(tag))
    candidate.tags.push(...newTags)
    candidate.lastInteraction = new Date()

    // Notify subscribers for each new tag
    newTags.forEach(tag => {
      this.notifySubscribers({
        type: UpdateType.TAG_ADDED,
        candidateId,
        timestamp: new Date(),
        data: { tag },
        affectedFields: ['tags', 'lastInteraction']
      })
    })
  }

  async removeCandidateTags(candidateId: string, tags: string[]): Promise<void> {
    const candidate = this.candidates.get(candidateId)
    if (!candidate) {
      throw new Error(`Candidate ${candidateId} not found`)
    }

    tags.forEach(tag => {
      const index = candidate.tags.indexOf(tag)
      if (index > -1) {
        candidate.tags.splice(index, 1)
        
        this.notifySubscribers({
          type: UpdateType.TAG_REMOVED,
          candidateId,
          timestamp: new Date(),
          data: { tag },
          affectedFields: ['tags', 'lastInteraction']
        })
      }
    })

    candidate.lastInteraction = new Date()
  }

  async flagCandidate(candidateId: string, flagged: boolean, reason?: string): Promise<void> {
    const candidate = this.candidates.get(candidateId)
    if (!candidate) {
      throw new Error(`Candidate ${candidateId} not found`)
    }

    const wasFlagged = candidate.flagged
    candidate.flagged = flagged
    candidate.flagReason = reason
    candidate.lastInteraction = new Date()

    if (flagged && reason) {
      candidate.recruiterNotes.push(`Flagged: ${reason}`)
    } else if (!flagged) {
      candidate.recruiterNotes.push('Flag removed')
    }

    this.notifySubscribers({
      type: UpdateType.FLAG_CHANGED,
      candidateId,
      timestamp: new Date(),
      data: { wasFlagged, isFlagged: flagged, reason },
      affectedFields: ['flagged', 'flagReason', 'recruiterNotes', 'lastInteraction']
    })
  }

  async addRecruiterNote(candidateId: string, note: string): Promise<void> {
    const candidate = this.candidates.get(candidateId)
    if (!candidate) {
      throw new Error(`Candidate ${candidateId} not found`)
    }

    const timestampedNote = `${new Date().toISOString()}: ${note}`
    candidate.recruiterNotes.push(timestampedNote)
    candidate.lastInteraction = new Date()

    this.notifySubscribers({
      type: UpdateType.NOTE_ADDED,
      candidateId,
      timestamp: new Date(),
      data: { note: timestampedNote },
      affectedFields: ['recruiterNotes', 'lastInteraction']
    })
  }

  // Bulk actions
  async executeBulkAction(action: BulkAction): Promise<BulkActionResult> {
    const results: BulkActionResult = {
      successful: [],
      failed: [],
      summary: {
        totalProcessed: action.candidateIds.length,
        successCount: 0,
        failureCount: 0,
        warnings: []
      }
    }

    for (const candidateId of action.candidateIds) {
      try {
        await this.executeSingleBulkAction(candidateId, action)
        results.successful.push(candidateId)
        results.summary.successCount++
      } catch (error) {
        results.failed.push({
          id: candidateId,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
        results.summary.failureCount++
      }
    }

    return results
  }

  private async executeSingleBulkAction(candidateId: string, action: BulkAction): Promise<void> {
    switch (action.type) {
      case BulkActionType.UPDATE_STATUS:
        await this.updateCandidateStatus(candidateId, action.parameters.status, action.parameters.reason)
        break
      
      case BulkActionType.ADD_TAGS:
        await this.addCandidateTags(candidateId, action.parameters.tags)
        break
      
      case BulkActionType.REMOVE_TAGS:
        await this.removeCandidateTags(candidateId, action.parameters.tags)
        break
      
      case BulkActionType.SET_PRIORITY:
        const candidate = this.candidates.get(candidateId)
        if (candidate) {
          candidate.priority = action.parameters.priority
          candidate.lastInteraction = new Date()
        }
        break
      
      default:
        throw new Error(`Unsupported bulk action type: ${action.type}`)
    }
  }

  // Utility methods
  async getCandidateById(candidateId: string): Promise<CandidateListItem | null> {
    return this.candidates.get(candidateId) || null
  }

  async searchCandidates(query: string): Promise<CandidateListItem[]> {
    const searchLower = query.toLowerCase()
    
    return Array.from(this.candidates.values()).filter(candidate => {
      return (
        candidate.name.toLowerCase().includes(searchLower) ||
        candidate.email.toLowerCase().includes(searchLower) ||
        candidate.position.toLowerCase().includes(searchLower) ||
        candidate.profileSummary.keySkills.some(skill => 
          skill.skill.toLowerCase().includes(searchLower)
        ) ||
        candidate.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    })
  }

  async getQuickStats(): Promise<{
    totalCandidates: number
    activeInterviews: number
    averageScore: number
    completionRate: number
    urgentCandidates: number
  }> {
    const candidates = Array.from(this.candidates.values())
    const activeStatuses = [InterviewStatus.SCHEDULED, InterviewStatus.IN_PROGRESS]
    
    return {
      totalCandidates: candidates.length,
      activeInterviews: candidates.filter(c => activeStatuses.includes(c.status)).length,
      averageScore: candidates.length > 0 
        ? candidates.reduce((sum, c) => sum + c.overallScore, 0) / candidates.length 
        : 0,
      completionRate: this.calculateCompletionRate(candidates),
      urgentCandidates: candidates.filter(c => c.priority === CandidatePriority.URGENT).length
    }
  }

  private calculateCompletionRate(candidates: CandidateListItem[]): number {
    const completed = candidates.filter(c => c.status === InterviewStatus.COMPLETED).length
    const scheduled = candidates.filter(c => 
      c.status === InterviewStatus.SCHEDULED || 
      c.status === InterviewStatus.IN_PROGRESS ||
      c.status === InterviewStatus.COMPLETED
    ).length
    
    return scheduled > 0 ? completed / scheduled : 0
  }

  // Mock data initialization for demo
  initializeMockData(): void {
    const mockCandidates: CandidateListItem[] = [
      {
        id: '1',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        position: 'Senior Frontend Developer',
        status: InterviewStatus.COMPLETED,
        overallScore: 87,
        lastInteraction: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        completionDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        profileSummary: {
          experienceLevel: ExperienceLevel.SENIOR,
          keySkills: [
            { skill: 'React', proficiency: ProficiencyLevel.EXPERT, verified: true, confidence: 0.95, relevance: 0.9 },
            { skill: 'TypeScript', proficiency: ProficiencyLevel.ADVANCED, verified: true, confidence: 0.88, relevance: 0.85 }
          ],
          strengths: ['Strong technical skills', 'Good communication', 'Leadership potential'],
          concerns: ['Limited backend experience'],
          culturalFit: 0.85,
          communicationScore: 82,
          technicalScore: 90,
          behavioralScore: 85
        },
        tags: ['javascript', 'react', 'senior'],
        priority: CandidatePriority.HIGH,
        source: CandidateSource.REFERRAL,
        recruiterNotes: ['Excellent technical interview', 'Strong cultural fit'],
        flagged: false
      },
      {
        id: '2',
        name: 'Bob Smith',
        email: 'bob@example.com',
        position: 'Backend Developer',
        status: InterviewStatus.IN_PROGRESS,
        overallScore: 75,
        lastInteraction: new Date(),
        scheduledDate: new Date(),
        profileSummary: {
          experienceLevel: ExperienceLevel.MID,
          keySkills: [
            { skill: 'Node.js', proficiency: ProficiencyLevel.ADVANCED, verified: false, confidence: 0.8, relevance: 0.9 },
            { skill: 'MongoDB', proficiency: ProficiencyLevel.INTERMEDIATE, verified: false, confidence: 0.7, relevance: 0.8 }
          ],
          strengths: ['Problem solving', 'Database design'],
          concerns: ['Communication could be clearer'],
          culturalFit: 0.7,
          communicationScore: 68,
          technicalScore: 80,
          behavioralScore: 72
        },
        tags: ['nodejs', 'backend', 'mid-level'],
        priority: CandidatePriority.MEDIUM,
        source: CandidateSource.JOB_BOARD,
        recruiterNotes: ['Good technical skills, interview in progress'],
        flagged: false
      }
    ]

    mockCandidates.forEach(candidate => {
      this.candidates.set(candidate.id, candidate)
    })
  }
}

// Singleton instance
export const candidateManagementService = new CandidateManagementService()