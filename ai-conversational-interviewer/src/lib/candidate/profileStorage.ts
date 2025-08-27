import { DynamicProfile, SkillProfile, ExperienceTimeline, ProficiencyLevel, SkillCategory } from './profileBuilder'
import { ScoringResult, CategoryScores } from './scoringEngine'

export interface ProfileSearchQuery {
  // Basic filters
  skills?: string[]
  skillCategories?: SkillCategory[]
  experienceYears?: { min?: number; max?: number }
  proficiencyLevel?: ProficiencyLevel[]
  
  // Advanced filters
  overallScore?: { min?: number; max?: number }
  technicalScore?: { min?: number; max?: number }
  communicationScore?: { min?: number; max?: number }
  
  // Profile attributes
  currentCompany?: string[]
  location?: string[]
  education?: string[]
  
  // Meta filters
  profileCompleteness?: { min?: number; max?: number }
  interviewDate?: { from?: Date; to?: Date }
  
  // Text search
  searchText?: string
  
  // Sorting and pagination
  sortBy?: 'score' | 'date' | 'experience' | 'name'
  sortOrder?: 'asc' | 'desc'
  limit?: number
  offset?: number
}

export interface ProfileSearchResult {
  profiles: ProfileSummary[]
  total: number
  facets: SearchFacets
  suggestions: string[]
}

export interface ProfileSummary {
  id: string
  candidateId: string
  interviewId: string
  candidateName?: string
  overallScore?: number
  categoryScores?: CategoryScores
  topSkills: string[]
  experience: string
  currentRole?: string
  profileCompleteness: number
  interviewDate: Date
  flags: string[]
}

export interface SearchFacets {
  skillCategories: Array<{ category: SkillCategory; count: number }>
  experienceRanges: Array<{ range: string; count: number }>
  companies: Array<{ company: string; count: number }>
  locations: Array<{ location: string; count: number }>
  scoreRanges: Array<{ range: string; count: number }>
}

export interface ProfileComparisonResult {
  profiles: DynamicProfile[]
  comparison: ComparisonMatrix
  recommendations: ComparisonRecommendation[]
  summary: ComparisonSummary
}

export interface ComparisonMatrix {
  skills: SkillComparison[]
  experience: ExperienceComparison
  communication: CommunicationComparison
  scores: ScoreComparison
}

export interface SkillComparison {
  skill: string
  category: SkillCategory
  candidates: Array<{
    candidateId: string
    proficiency: ProficiencyLevel
    confidence: number
    yearsExperience?: number
  }>
}

export interface ExperienceComparison {
  totalYears: { [candidateId: string]: number }
  relevantYears: { [candidateId: string]: number }
  companies: { [candidateId: string]: string[] }
  roles: { [candidateId: string]: string[] }
}

export interface CommunicationComparison {
  clarity: { [candidateId: string]: number }
  structure: { [candidateId: string]: number }
  enthusiasm: { [candidateId: string]: number }
  professionalism: { [candidateId: string]: number }
}

export interface ScoreComparison {
  overall: { [candidateId: string]: number }
  technical: { [candidateId: string]: number }
  communication: { [candidateId: string]: number }
  experience: { [candidateId: string]: number }
  cultural: { [candidateId: string]: number }
}

export interface ComparisonRecommendation {
  type: 'ranking' | 'strength' | 'differentiation' | 'concern'
  description: string
  candidateIds: string[]
  confidence: number
}

export interface ComparisonSummary {
  topCandidate: string
  rankings: Array<{ candidateId: string; rank: number; score: number }>
  keyDifferentiators: string[]
  similaritiesFound: string[]
}

export interface StorageOptions {
  enableCaching?: boolean
  cacheExpiry?: number
  enableCompression?: boolean
  enableEncryption?: boolean
  indexFields?: string[]
}

export class ProfileStorageEngine {
  private profiles: Map<string, DynamicProfile> = new Map()
  private scoringResults: Map<string, ScoringResult> = new Map()
  private searchIndex: Map<string, Set<string>> = new Map()
  private cacheExpiry: number = 60 * 60 * 1000 // 1 hour
  private options: StorageOptions

  constructor(options: StorageOptions = {}) {
    this.options = {
      enableCaching: true,
      cacheExpiry: 60 * 60 * 1000,
      enableCompression: false,
      enableEncryption: false,
      indexFields: ['skills', 'experience', 'education', 'companies'],
      ...options
    }
    
    this.initializeIndexes()
  }

  private initializeIndexes(): void {
    // Initialize search indexes for fast querying
    this.searchIndex.set('skills', new Set())
    this.searchIndex.set('companies', new Set())
    this.searchIndex.set('locations', new Set())
    this.searchIndex.set('education', new Set())
    this.searchIndex.set('technologies', new Set())
  }

  // Storage operations
  async storeProfile(profile: DynamicProfile, scoringResult?: ScoringResult): Promise<void> {
    try {
      // Store the profile
      this.profiles.set(profile.id, this.deepClone(profile))
      
      // Store scoring result if provided
      if (scoringResult) {
        this.scoringResults.set(profile.id, this.deepClone(scoringResult))
      }

      // Update search indexes
      await this.updateSearchIndexes(profile)

      console.log(`Profile ${profile.id} stored successfully`)
    } catch (error) {
      console.error(`Failed to store profile ${profile.id}:`, error)
      throw new Error(`Storage failed: ${error}`)
    }
  }

  async getProfile(profileId: string): Promise<DynamicProfile | null> {
    const profile = this.profiles.get(profileId)
    return profile ? this.deepClone(profile) : null
  }

  async getScoringResult(profileId: string): Promise<ScoringResult | null> {
    const result = this.scoringResults.get(profileId)
    return result ? this.deepClone(result) : null
  }

  async updateProfile(profileId: string, updates: Partial<DynamicProfile>): Promise<void> {
    const existingProfile = this.profiles.get(profileId)
    if (!existingProfile) {
      throw new Error(`Profile ${profileId} not found`)
    }

    const updatedProfile = { ...existingProfile, ...updates, lastUpdated: new Date() }
    this.profiles.set(profileId, updatedProfile)
    
    // Update search indexes
    await this.updateSearchIndexes(updatedProfile)
  }

  async deleteProfile(profileId: string): Promise<void> {
    const deleted = this.profiles.delete(profileId)
    this.scoringResults.delete(profileId)
    
    if (!deleted) {
      throw new Error(`Profile ${profileId} not found`)
    }

    // Remove from search indexes
    await this.removeFromSearchIndexes(profileId)
  }

  // Search and filtering
  async searchProfiles(query: ProfileSearchQuery): Promise<ProfileSearchResult> {
    let candidateProfiles = Array.from(this.profiles.values())

    // Apply filters
    candidateProfiles = this.applyFilters(candidateProfiles, query)

    // Apply text search
    if (query.searchText) {
      candidateProfiles = this.applyTextSearch(candidateProfiles, query.searchText)
    }

    // Sort results
    candidateProfiles = this.sortProfiles(candidateProfiles, query.sortBy, query.sortOrder)

    // Calculate total before pagination
    const total = candidateProfiles.length

    // Apply pagination
    const offset = query.offset || 0
    const limit = query.limit || 50
    candidateProfiles = candidateProfiles.slice(offset, offset + limit)

    // Convert to summaries
    const profiles = await Promise.all(
      candidateProfiles.map(profile => this.createProfileSummary(profile))
    )

    // Generate facets
    const facets = this.generateSearchFacets(Array.from(this.profiles.values()))

    // Generate suggestions
    const suggestions = this.generateSearchSuggestions(query)

    return {
      profiles,
      total,
      facets,
      suggestions
    }
  }

  private applyFilters(profiles: DynamicProfile[], query: ProfileSearchQuery): DynamicProfile[] {
    return profiles.filter(profile => {
      // Skills filter
      if (query.skills && query.skills.length > 0) {
        const profileSkills = profile.skills.map(s => s.name.toLowerCase())
        if (!query.skills.some(skill => profileSkills.includes(skill.toLowerCase()))) {
          return false
        }
      }

      // Skill categories filter
      if (query.skillCategories && query.skillCategories.length > 0) {
        const profileCategories = profile.skills.map(s => s.category)
        if (!query.skillCategories.some(cat => profileCategories.includes(cat))) {
          return false
        }
      }

      // Experience years filter
      if (query.experienceYears) {
        const years = profile.personalInfo.yearsExperience || 0
        if (query.experienceYears.min && years < query.experienceYears.min) return false
        if (query.experienceYears.max && years > query.experienceYears.max) return false
      }

      // Proficiency level filter
      if (query.proficiencyLevel && query.proficiencyLevel.length > 0) {
        const profileLevels = profile.skills.map(s => s.proficiencyLevel)
        if (!query.proficiencyLevel.some(level => profileLevels.includes(level))) {
          return false
        }
      }

      // Score filters
      const scoringResult = this.scoringResults.get(profile.id)
      if (scoringResult) {
        if (query.overallScore) {
          const score = scoringResult.overallScore
          if (query.overallScore.min && score < query.overallScore.min) return false
          if (query.overallScore.max && score > query.overallScore.max) return false
        }

        if (query.technicalScore) {
          const score = scoringResult.categoryScores.technical
          if (query.technicalScore.min && score < query.technicalScore.min) return false
          if (query.technicalScore.max && score > query.technicalScore.max) return false
        }

        if (query.communicationScore) {
          const score = scoringResult.categoryScores.communication
          if (query.communicationScore.min && score < query.communicationScore.min) return false
          if (query.communicationScore.max && score > query.communicationScore.max) return false
        }
      }

      // Current company filter
      if (query.currentCompany && query.currentCompany.length > 0) {
        const company = profile.personalInfo.currentCompany
        if (!company || !query.currentCompany.includes(company)) return false
      }

      // Location filter
      if (query.location && query.location.length > 0) {
        const location = profile.personalInfo.location
        if (!location || !query.location.some(loc => location.includes(loc))) return false
      }

      // Profile completeness filter
      if (query.profileCompleteness) {
        const completeness = profile.profileCompleteness
        if (query.profileCompleteness.min && completeness < query.profileCompleteness.min) return false
        if (query.profileCompleteness.max && completeness > query.profileCompleteness.max) return false
      }

      // Interview date filter
      if (query.interviewDate) {
        const date = profile.lastUpdated
        if (query.interviewDate.from && date < query.interviewDate.from) return false
        if (query.interviewDate.to && date > query.interviewDate.to) return false
      }

      return true
    })
  }

  private applyTextSearch(profiles: DynamicProfile[], searchText: string): DynamicProfile[] {
    const searchTerms = searchText.toLowerCase().split(/\s+/)
    
    return profiles.filter(profile => {
      const searchableText = this.createSearchableText(profile).toLowerCase()
      
      return searchTerms.every(term => searchableText.includes(term))
    })
  }

  private createSearchableText(profile: DynamicProfile): string {
    const parts = [
      profile.personalInfo.name || '',
      profile.personalInfo.currentTitle || '',
      profile.personalInfo.currentCompany || '',
      profile.personalInfo.location || '',
      ...profile.skills.map(s => s.name),
      ...profile.experiences.map(e => `${e.role} ${e.company} ${e.responsibilities.join(' ')}`),
      ...profile.education.map(e => `${e.degree} ${e.institution} ${e.field}`),
      ...profile.projects.map(p => `${p.name} ${p.description}`),
      ...profile.achievements.map(a => `${a.title} ${a.description}`)
    ]

    return parts.join(' ')
  }

  private sortProfiles(
    profiles: DynamicProfile[], 
    sortBy?: string, 
    sortOrder?: string
  ): DynamicProfile[] {
    const order = sortOrder === 'desc' ? -1 : 1

    return profiles.sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case 'score':
          const scoreA = this.scoringResults.get(a.id)?.overallScore || 0
          const scoreB = this.scoringResults.get(b.id)?.overallScore || 0
          comparison = scoreA - scoreB
          break
        
        case 'experience':
          const expA = a.personalInfo.yearsExperience || 0
          const expB = b.personalInfo.yearsExperience || 0
          comparison = expA - expB
          break
        
        case 'name':
          const nameA = a.personalInfo.name || ''
          const nameB = b.personalInfo.name || ''
          comparison = nameA.localeCompare(nameB)
          break
        
        case 'date':
        default:
          comparison = a.lastUpdated.getTime() - b.lastUpdated.getTime()
          break
      }

      return comparison * order
    })
  }

  private async createProfileSummary(profile: DynamicProfile): Promise<ProfileSummary> {
    const scoringResult = this.scoringResults.get(profile.id)
    
    return {
      id: profile.id,
      candidateId: profile.candidateId,
      interviewId: profile.interviewId,
      candidateName: profile.personalInfo.name,
      overallScore: scoringResult?.overallScore,
      categoryScores: scoringResult?.categoryScores,
      topSkills: profile.skills
        .sort((a, b) => b.confidence - a.confidence)
        .slice(0, 5)
        .map(s => s.name),
      experience: `${profile.personalInfo.yearsExperience || 0} years`,
      currentRole: profile.personalInfo.currentTitle,
      profileCompleteness: profile.profileCompleteness,
      interviewDate: profile.lastUpdated,
      flags: profile.flags
        .filter(f => f.type === 'red_flag' || f.type === 'concern')
        .map(f => f.description)
    }
  }

  private generateSearchFacets(profiles: DynamicProfile[]): SearchFacets {
    const skillCategoryCounts = new Map<SkillCategory, number>()
    const experienceRangeCounts = new Map<string, number>()
    const companyCounts = new Map<string, number>()
    const locationCounts = new Map<string, number>()
    const scoreRangeCounts = new Map<string, number>()

    for (const profile of profiles) {
      // Skill categories
      profile.skills.forEach(skill => {
        skillCategoryCounts.set(skill.category, (skillCategoryCounts.get(skill.category) || 0) + 1)
      })

      // Experience ranges
      const years = profile.personalInfo.yearsExperience || 0
      const range = this.getExperienceRange(years)
      experienceRangeCounts.set(range, (experienceRangeCounts.get(range) || 0) + 1)

      // Companies
      if (profile.personalInfo.currentCompany) {
        const company = profile.personalInfo.currentCompany
        companyCounts.set(company, (companyCounts.get(company) || 0) + 1)
      }

      // Locations
      if (profile.personalInfo.location) {
        const location = profile.personalInfo.location
        locationCounts.set(location, (locationCounts.get(location) || 0) + 1)
      }

      // Score ranges
      const scoringResult = this.scoringResults.get(profile.id)
      if (scoringResult) {
        const range = this.getScoreRange(scoringResult.overallScore)
        scoreRangeCounts.set(range, (scoreRangeCounts.get(range) || 0) + 1)
      }
    }

    return {
      skillCategories: Array.from(skillCategoryCounts.entries())
        .map(([category, count]) => ({ category, count }))
        .sort((a, b) => b.count - a.count),
      
      experienceRanges: Array.from(experienceRangeCounts.entries())
        .map(([range, count]) => ({ range, count }))
        .sort((a, b) => b.count - a.count),
      
      companies: Array.from(companyCounts.entries())
        .map(([company, count]) => ({ company, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10),
      
      locations: Array.from(locationCounts.entries())
        .map(([location, count]) => ({ location, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10),
      
      scoreRanges: Array.from(scoreRangeCounts.entries())
        .map(([range, count]) => ({ range, count }))
        .sort((a, b) => b.count - a.count)
    }
  }

  private getExperienceRange(years: number): string {
    if (years < 1) return '0-1 years'
    if (years < 3) return '1-3 years'
    if (years < 5) return '3-5 years'
    if (years < 10) return '5-10 years'
    return '10+ years'
  }

  private getScoreRange(score: number): string {
    if (score >= 0.9) return '90-100%'
    if (score >= 0.8) return '80-89%'
    if (score >= 0.7) return '70-79%'
    if (score >= 0.6) return '60-69%'
    if (score >= 0.5) return '50-59%'
    return 'Below 50%'
  }

  private generateSearchSuggestions(query: ProfileSearchQuery): string[] {
    const suggestions: string[] = []

    // Suggest popular skills
    const popularSkills = Array.from(this.searchIndex.get('skills') || []).slice(0, 5)
    suggestions.push(...popularSkills.map(skill => `skill:${skill}`))

    // Suggest popular companies
    const popularCompanies = Array.from(this.searchIndex.get('companies') || []).slice(0, 3)
    suggestions.push(...popularCompanies.map(company => `company:${company}`))

    return suggestions.slice(0, 8)
  }

  // Profile comparison
  async compareProfiles(profileIds: string[]): Promise<ProfileComparisonResult> {
    const profiles = profileIds
      .map(id => this.profiles.get(id))
      .filter(profile => profile !== undefined) as DynamicProfile[]

    if (profiles.length < 2) {
      throw new Error('At least 2 profiles required for comparison')
    }

    const comparison = this.generateComparisonMatrix(profiles)
    const recommendations = this.generateComparisonRecommendations(profiles, comparison)
    const summary = this.generateComparisonSummary(profiles, comparison)

    return {
      profiles,
      comparison,
      recommendations,
      summary
    }
  }

  private generateComparisonMatrix(profiles: DynamicProfile[]): ComparisonMatrix {
    // Skills comparison
    const allSkills = new Map<string, SkillComparison>()
    
    profiles.forEach(profile => {
      profile.skills.forEach(skill => {
        if (!allSkills.has(skill.name)) {
          allSkills.set(skill.name, {
            skill: skill.name,
            category: skill.category,
            candidates: []
          })
        }
        
        const skillComp = allSkills.get(skill.name)!
        skillComp.candidates.push({
          candidateId: profile.candidateId,
          proficiency: skill.proficiencyLevel,
          confidence: skill.confidence,
          yearsExperience: skill.yearsExperience
        })
      })
    })

    // Experience comparison
    const experienceComparison: ExperienceComparison = {
      totalYears: {},
      relevantYears: {},
      companies: {},
      roles: {}
    }

    profiles.forEach(profile => {
      experienceComparison.totalYears[profile.candidateId] = profile.personalInfo.yearsExperience || 0
      experienceComparison.relevantYears[profile.candidateId] = this.calculateRelevantYears(profile)
      experienceComparison.companies[profile.candidateId] = profile.experiences.map(e => e.company)
      experienceComparison.roles[profile.candidateId] = profile.experiences.map(e => e.role)
    })

    // Communication comparison
    const communicationComparison: CommunicationComparison = {
      clarity: {},
      structure: {},
      enthusiasm: {},
      professionalism: {}
    }

    profiles.forEach(profile => {
      const comm = profile.communicationStyle
      communicationComparison.clarity[profile.candidateId] = comm.clarity
      communicationComparison.structure[profile.candidateId] = comm.structure
      communicationComparison.enthusiasm[profile.candidateId] = comm.enthusiasm
      communicationComparison.professionalism[profile.candidateId] = comm.professionalism
    })

    // Score comparison
    const scoreComparison: ScoreComparison = {
      overall: {},
      technical: {},
      communication: {},
      experience: {},
      cultural: {}
    }

    profiles.forEach(profile => {
      const scoring = this.scoringResults.get(profile.id)
      if (scoring) {
        scoreComparison.overall[profile.candidateId] = scoring.overallScore
        scoreComparison.technical[profile.candidateId] = scoring.categoryScores.technical
        scoreComparison.communication[profile.candidateId] = scoring.categoryScores.communication
        scoreComparison.experience[profile.candidateId] = scoring.categoryScores.experience
        scoreComparison.cultural[profile.candidateId] = scoring.categoryScores.cultural
      }
    })

    return {
      skills: Array.from(allSkills.values()),
      experience: experienceComparison,
      communication: communicationComparison,
      scores: scoreComparison
    }
  }

  private calculateRelevantYears(profile: DynamicProfile): number {
    return profile.experiences
      .filter(exp => exp.relevanceScore > 0.7)
      .reduce((total, exp) => {
        const match = exp.duration?.match(/(\d+)/)
        return total + (match ? parseInt(match[1]) : 0)
      }, 0)
  }

  private generateComparisonRecommendations(
    profiles: DynamicProfile[], 
    comparison: ComparisonMatrix
  ): ComparisonRecommendation[] {
    const recommendations: ComparisonRecommendation[] = []

    // Ranking recommendation
    const rankings = this.calculateRankings(profiles, comparison)
    recommendations.push({
      type: 'ranking',
      description: `Based on overall assessment, recommended ranking: ${rankings.map((r, i) => `${i + 1}. Candidate ${r.candidateId}`).join(', ')}`,
      candidateIds: rankings.map(r => r.candidateId),
      confidence: 0.8
    })

    // Identify standout candidates
    const topScores = Object.entries(comparison.scores.overall)
      .sort(([, a], [, b]) => b - a)
    
    if (topScores.length > 1 && topScores[0][1] - topScores[1][1] > 0.15) {
      recommendations.push({
        type: 'strength',
        description: `Candidate ${topScores[0][0]} significantly outperforms others with ${(topScores[0][1] * 100).toFixed(1)}% overall score`,
        candidateIds: [topScores[0][0]],
        confidence: 0.9
      })
    }

    // Technical differentiators
    const techScores = Object.entries(comparison.scores.technical)
      .sort(([, a], [, b]) => b - a)
    
    if (techScores[0][1] > 0.8) {
      recommendations.push({
        type: 'strength',
        description: `Candidate ${techScores[0][0]} shows exceptional technical competency`,
        candidateIds: [techScores[0][0]],
        confidence: 0.85
      })
    }

    return recommendations
  }

  private calculateRankings(profiles: DynamicProfile[], comparison: ComparisonMatrix): Array<{ candidateId: string; rank: number; score: number }> {
    const scores = Object.entries(comparison.scores.overall)
      .map(([candidateId, score]) => ({ candidateId, score }))
      .sort((a, b) => b.score - a.score)

    return scores.map((item, index) => ({
      candidateId: item.candidateId,
      rank: index + 1,
      score: item.score
    }))
  }

  private generateComparisonSummary(profiles: DynamicProfile[], comparison: ComparisonMatrix): ComparisonSummary {
    const rankings = this.calculateRankings(profiles, comparison)
    
    // Find key differentiators
    const keyDifferentiators: string[] = []
    
    // Check for significant skill gaps
    comparison.skills.forEach(skillComp => {
      const proficiencies = skillComp.candidates.map(c => c.proficiency)
      const hasVariation = new Set(proficiencies).size > 1
      if (hasVariation) {
        keyDifferentiators.push(`${skillComp.skill} proficiency levels vary significantly`)
      }
    })

    // Check experience differences
    const experienceValues = Object.values(comparison.experience.totalYears)
    const maxExp = Math.max(...experienceValues)
    const minExp = Math.min(...experienceValues)
    if (maxExp - minExp > 3) {
      keyDifferentiators.push(`Experience ranges from ${minExp} to ${maxExp} years`)
    }

    // Find similarities
    const similaritiesFound: string[] = []
    
    // Similar companies
    const allCompanies = Object.values(comparison.experience.companies).flat()
    const commonCompanies = this.findCommonElements(Object.values(comparison.experience.companies))
    if (commonCompanies.length > 0) {
      similaritiesFound.push(`Shared experience at: ${commonCompanies.join(', ')}`)
    }

    return {
      topCandidate: rankings[0].candidateId,
      rankings,
      keyDifferentiators: keyDifferentiators.slice(0, 5),
      similaritiesFound: similaritiesFound.slice(0, 3)
    }
  }

  private findCommonElements(arrays: string[][]): string[] {
    if (arrays.length === 0) return []
    
    return arrays.reduce((common, current) => 
      common.filter(item => current.includes(item))
    )
  }

  // Index management
  private async updateSearchIndexes(profile: DynamicProfile): Promise<void> {
    // Update skills index
    const skillsIndex = this.searchIndex.get('skills')!
    profile.skills.forEach(skill => skillsIndex.add(skill.name.toLowerCase()))

    // Update companies index
    const companiesIndex = this.searchIndex.get('companies')!
    if (profile.personalInfo.currentCompany) {
      companiesIndex.add(profile.personalInfo.currentCompany.toLowerCase())
    }
    profile.experiences.forEach(exp => companiesIndex.add(exp.company.toLowerCase()))

    // Update locations index
    const locationsIndex = this.searchIndex.get('locations')!
    if (profile.personalInfo.location) {
      locationsIndex.add(profile.personalInfo.location.toLowerCase())
    }

    // Update education index
    const educationIndex = this.searchIndex.get('education')!
    profile.education.forEach(edu => {
      educationIndex.add(edu.institution.toLowerCase())
      educationIndex.add(edu.degree.toLowerCase())
    })

    // Update technologies index
    const technologiesIndex = this.searchIndex.get('technologies')!
    profile.experiences.forEach(exp => {
      exp.technologies.forEach(tech => technologiesIndex.add(tech.toLowerCase()))
    })
    profile.projects.forEach(proj => {
      proj.technologies.forEach(tech => technologiesIndex.add(tech.toLowerCase()))
    })
  }

  private async removeFromSearchIndexes(profileId: string): Promise<void> {
    // Note: In a real implementation, you'd need to track which terms belong to which profile
    // This is a simplified version
    console.log(`Removing profile ${profileId} from search indexes`)
  }

  // Utility methods
  private deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj))
  }

  // Analytics and reporting
  async getStorageStats(): Promise<{
    totalProfiles: number
    totalScores: number
    averageCompleteness: number
    topSkills: string[]
    topCompanies: string[]
  }> {
    const profiles = Array.from(this.profiles.values())
    
    const averageCompleteness = profiles.length > 0
      ? profiles.reduce((sum, p) => sum + p.profileCompleteness, 0) / profiles.length
      : 0

    const skillCounts = new Map<string, number>()
    const companyCounts = new Map<string, number>()

    profiles.forEach(profile => {
      profile.skills.forEach(skill => {
        skillCounts.set(skill.name, (skillCounts.get(skill.name) || 0) + 1)
      })
      
      if (profile.personalInfo.currentCompany) {
        const company = profile.personalInfo.currentCompany
        companyCounts.set(company, (companyCounts.get(company) || 0) + 1)
      }
    })

    const topSkills = Array.from(skillCounts.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([skill]) => skill)

    const topCompanies = Array.from(companyCounts.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([company]) => company)

    return {
      totalProfiles: this.profiles.size,
      totalScores: this.scoringResults.size,
      averageCompleteness,
      topSkills,
      topCompanies
    }
  }

  async exportProfiles(format: 'json' | 'csv' = 'json'): Promise<string> {
    const profiles = Array.from(this.profiles.values())
    
    if (format === 'json') {
      return JSON.stringify(profiles, null, 2)
    } else {
      // CSV export - simplified
      const headers = ['id', 'candidateId', 'name', 'currentTitle', 'yearsExperience', 'profileCompleteness']
      const rows = profiles.map(p => [
        p.id,
        p.candidateId,
        p.personalInfo.name || '',
        p.personalInfo.currentTitle || '',
        p.personalInfo.yearsExperience || 0,
        p.profileCompleteness
      ])
      
      return [headers.join(','), ...rows.map(row => row.join(','))].join('\n')
    }
  }

  // Cleanup and maintenance
  async cleanup(olderThan?: Date): Promise<number> {
    if (!olderThan) {
      olderThan = new Date(Date.now() - (30 * 24 * 60 * 60 * 1000)) // 30 days ago
    }

    let cleaned = 0
    for (const [id, profile] of this.profiles) {
      if (profile.lastUpdated < olderThan) {
        await this.deleteProfile(id)
        cleaned++
      }
    }

    return cleaned
  }
}

// Singleton instance
export const profileStorage = new ProfileStorageEngine()