// Phase 3: Candidate Profile & Scoring System Integration Layer
// This file provides a unified interface for all candidate profiling and scoring functionality

export { 
  // Profile Builder
  CandidateProfileBuilder,
  DynamicProfile,
  PersonalInfo,
  SkillProfile,
  ExperienceTimeline,
  EducationRecord,
  ProjectRecord,
  Achievement,
  CommunicationAssessment,
  BehavioralProfile,
  TechnicalAssessment,
  SkillCategory,
  ProficiencyLevel,
  AchievementType
} from './profileBuilder'

export {
  // Skill Extractor
  SkillExtractionEngine,
  skillExtractor,
  SkillExtractionResult,
  ExtractedSkill,
  SkillSuggestion,
  SkillTaxonomy,
  SkillDefinition
} from './skillExtractor'

export {
  // Scoring Engine
  CandidateScoringEngine,
  candidateScorer,
  ScoringResult,
  CategoryScores,
  DetailedScores,
  ScoreRecommendation,
  JobRequirements,
  RequiredSkill,
  ScoringWeights
} from './scoringEngine'

export {
  // Storage Engine
  ProfileStorageEngine,
  profileStorage,
  ProfileSearchQuery,
  ProfileSearchResult,
  ProfileSummary,
  SearchFacets,
  ProfileComparisonResult,
  ComparisonMatrix,
  SkillComparison,
  ExperienceComparison,
  CommunicationComparison,
  ScoreComparison
} from './profileStorage'

// Integrated service class that orchestrates all components
export class CandidateProfileService {
  private profileBuilder: CandidateProfileBuilder | null = null

  constructor(
    private candidateId: string,
    private interviewId: string
  ) {}

  // Initialize a new profile building session
  async initializeProfile(): Promise<DynamicProfile> {
    this.profileBuilder = new CandidateProfileBuilder(this.candidateId, this.interviewId)
    return this.profileBuilder.getProfile()
  }

  // Process a new interview message and update the profile
  async processInterviewMessage(message: any): Promise<{
    profile: DynamicProfile
    extractedSkills: ExtractedSkill[]
    updatedAt: Date
  }> {
    if (!this.profileBuilder) {
      throw new Error('Profile not initialized. Call initializeProfile() first.')
    }

    // Extract skills from the message
    const skillExtractionResult = await skillExtractor.extractSkills(message.content)

    // Process the message through the profile builder
    await this.profileBuilder.processMessage(message)

    const profile = this.profileBuilder.getProfile()

    return {
      profile,
      extractedSkills: skillExtractionResult.skills,
      updatedAt: new Date()
    }
  }

  // Score the candidate against job requirements
  async scoreCandidate(
    jobRequirements: JobRequirements,
    customWeights?: Partial<ScoringWeights>
  ): Promise<ScoringResult> {
    if (!this.profileBuilder) {
      throw new Error('Profile not initialized. Call initializeProfile() first.')
    }

    const profile = this.profileBuilder.getProfile()
    return await candidateScorer.scoreCandidate(profile, jobRequirements, customWeights)
  }

  // Save profile and scoring results to storage
  async saveProfile(scoringResult?: ScoringResult): Promise<void> {
    if (!this.profileBuilder) {
      throw new Error('Profile not initialized. Call initializeProfile() first.')
    }

    const profile = this.profileBuilder.getProfile()
    await profileStorage.storeProfile(profile, scoringResult)
  }

  // Get current profile
  getCurrentProfile(): DynamicProfile | null {
    return this.profileBuilder?.getProfile() || null
  }

  // Get profile summary for display
  getProfileSummary(): any {
    return this.profileBuilder?.getProfileSummary() || null
  }

  // Static methods for working with stored profiles
  static async searchProfiles(query: ProfileSearchQuery): Promise<ProfileSearchResult> {
    return await profileStorage.searchProfiles(query)
  }

  static async getStoredProfile(profileId: string): Promise<DynamicProfile | null> {
    return await profileStorage.getProfile(profileId)
  }

  static async getStoredScoringResult(profileId: string): Promise<ScoringResult | null> {
    return await profileStorage.getScoringResult(profileId)
  }

  static async compareProfiles(profileIds: string[]): Promise<ProfileComparisonResult> {
    return await profileStorage.compareProfiles(profileIds)
  }

  static async generateSkillGapAnalysis(
    candidateProfileId: string,
    jobRequirements: JobRequirements
  ): Promise<{
    missing: string[]
    underqualified: Array<{ skill: string; required: ProficiencyLevel; current: ProficiencyLevel }>
    overqualified: Array<{ skill: string; required: ProficiencyLevel; current: ProficiencyLevel }>
  }> {
    const profile = await profileStorage.getProfile(candidateProfileId)
    if (!profile) {
      throw new Error('Profile not found')
    }

    return skillExtractor.generateSkillGaps(
      profile.skills.map(s => ({
        name: s.name,
        category: s.category,
        proficiencyLevel: s.proficiencyLevel,
        confidence: s.confidence,
        context: s.contexts[0] || '',
        aliases: [],
        relatedSkills: s.relatedSkills
      })),
      jobRequirements.requiredSkills.map(r => r.name),
      jobRequirements.experienceLevel
    )
  }

  // Utility methods for job requirements creation
  static createJobRequirements(
    role: 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'devops' | 'data' | 'qa',
    level: 'entry' | 'mid' | 'senior' | 'lead',
    customSkills?: string[]
  ): JobRequirements {
    const skillSets = {
      frontend: ['JavaScript', 'React', 'CSS', 'HTML', 'TypeScript'],
      backend: ['Node.js', 'Python', 'PostgreSQL', 'REST API', 'Microservices'],
      fullstack: ['JavaScript', 'React', 'Node.js', 'PostgreSQL', 'REST API'],
      mobile: ['React Native', 'Swift', 'Kotlin', 'Mobile UI/UX'],
      devops: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Infrastructure'],
      data: ['Python', 'SQL', 'Machine Learning', 'Data Analysis', 'Statistics'],
      qa: ['Test Automation', 'Selenium', 'Jest', 'Quality Assurance']
    }

    const levelMappings = {
      entry: { proficiency: ProficiencyLevel.INTERMEDIATE, years: 1 },
      mid: { proficiency: ProficiencyLevel.ADVANCED, years: 3 },
      senior: { proficiency: ProficiencyLevel.ADVANCED, years: 5 },
      lead: { proficiency: ProficiencyLevel.EXPERT, years: 7 }
    }

    const skills = customSkills || skillSets[role]
    const levelInfo = levelMappings[level]

    return candidateScorer.createJobRequirements(
      skills,
      levelInfo.proficiency,
      levelInfo.years,
      {
        communicationLevel: level === 'lead' ? 0.9 : 0.7,
        leadershipRequired: level === 'lead',
        teamworkImportance: 0.8,
        culturalValues: ['collaboration', 'continuous learning', 'innovation']
      }
    )
  }

  // Analytics and reporting
  static async getProfileAnalytics(): Promise<{
    totalProfiles: number
    skillDistribution: Array<{ skill: string; count: number }>
    experienceDistribution: Array<{ range: string; count: number }>
    averageScores: CategoryScores
    topPerformers: ProfileSummary[]
  }> {
    const stats = await profileStorage.getStorageStats()
    
    // Get all profiles for analysis
    const searchResult = await profileStorage.searchProfiles({ limit: 1000 })
    
    // Calculate average scores
    const averageScores: CategoryScores = {
      technical: 0,
      communication: 0,
      experience: 0,
      cultural: 0,
      behavioral: 0,
      education: 0
    }

    let scoreCount = 0
    for (const summary of searchResult.profiles) {
      if (summary.categoryScores) {
        averageScores.technical += summary.categoryScores.technical
        averageScores.communication += summary.categoryScores.communication
        averageScores.experience += summary.categoryScores.experience
        averageScores.cultural += summary.categoryScores.cultural
        averageScores.behavioral += summary.categoryScores.behavioral
        averageScores.education += summary.categoryScores.education
        scoreCount++
      }
    }

    if (scoreCount > 0) {
      averageScores.technical /= scoreCount
      averageScores.communication /= scoreCount
      averageScores.experience /= scoreCount
      averageScores.cultural /= scoreCount
      averageScores.behavioral /= scoreCount
      averageScores.education /= scoreCount
    }

    // Get top performers
    const topPerformers = searchResult.profiles
      .filter(p => p.overallScore !== undefined)
      .sort((a, b) => (b.overallScore || 0) - (a.overallScore || 0))
      .slice(0, 10)

    return {
      totalProfiles: stats.totalProfiles,
      skillDistribution: stats.topSkills.map(skill => ({ skill, count: 1 })), // Simplified
      experienceDistribution: searchResult.facets.experienceRanges,
      averageScores,
      topPerformers
    }
  }

  // Import/Export functionality
  static async exportProfileData(
    profileIds?: string[],
    format: 'json' | 'csv' = 'json'
  ): Promise<string> {
    if (profileIds) {
      const profiles = await Promise.all(
        profileIds.map(id => profileStorage.getProfile(id))
      )
      const validProfiles = profiles.filter(p => p !== null)
      
      if (format === 'json') {
        return JSON.stringify(validProfiles, null, 2)
      } else {
        // CSV format - simplified
        const headers = ['id', 'candidateId', 'name', 'overallScore', 'topSkills']
        const rows = validProfiles.map(p => [
          p!.id,
          p!.candidateId,
          p!.personalInfo.name || '',
          0, // Would get from scoring results
          p!.skills.slice(0, 3).map(s => s.name).join(';')
        ])
        
        return [headers.join(','), ...rows.map(row => row.join(','))].join('\n')
      }
    } else {
      return await profileStorage.exportProfiles(format)
    }
  }

  // Recommendation engine for similar candidates
  static async findSimilarCandidates(
    profileId: string,
    limit: number = 5
  ): Promise<ProfileSummary[]> {
    const targetProfile = await profileStorage.getProfile(profileId)
    if (!targetProfile) {
      throw new Error('Target profile not found')
    }

    // Build a search query based on the target profile's characteristics
    const searchQuery: ProfileSearchQuery = {
      skills: targetProfile.skills.slice(0, 5).map(s => s.name),
      experienceYears: {
        min: Math.max(0, (targetProfile.personalInfo.yearsExperience || 0) - 2),
        max: (targetProfile.personalInfo.yearsExperience || 0) + 2
      },
      sortBy: 'score',
      sortOrder: 'desc',
      limit
    }

    const result = await profileStorage.searchProfiles(searchQuery)
    
    // Filter out the target profile itself
    return result.profiles.filter(p => p.id !== profileId)
  }

  // Skills recommendation for role matching
  static async recommendSkillsForRole(
    candidateProfileId: string,
    targetRole: string
  ): Promise<{
    recommendedSkills: string[]
    skillGaps: string[]
    strengthAreas: string[]
  }> {
    const profile = await profileStorage.getProfile(candidateProfileId)
    if (!profile) {
      throw new Error('Profile not found')
    }

    // This is a simplified implementation - in practice, you'd have a more sophisticated
    // role-to-skills mapping system
    const roleSkillMappings: { [key: string]: string[] } = {
      'senior_frontend_developer': ['React', 'TypeScript', 'CSS', 'Webpack', 'Testing'],
      'backend_engineer': ['Node.js', 'PostgreSQL', 'Docker', 'Microservices', 'AWS'],
      'fullstack_developer': ['React', 'Node.js', 'PostgreSQL', 'REST API', 'Git'],
      'devops_engineer': ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform'],
      'data_scientist': ['Python', 'Machine Learning', 'SQL', 'Statistics', 'TensorFlow']
    }

    const requiredSkills = roleSkillMappings[targetRole] || []
    const candidateSkills = profile.skills.map(s => s.name)

    const skillGaps = requiredSkills.filter(skill => 
      !candidateSkills.some(cs => cs.toLowerCase().includes(skill.toLowerCase()))
    )

    const strengthAreas = candidateSkills.filter(skill =>
      requiredSkills.some(rs => skill.toLowerCase().includes(rs.toLowerCase()))
    )

    const recommendedSkills = skillGaps.slice(0, 5)

    return {
      recommendedSkills,
      skillGaps,
      strengthAreas
    }
  }
}

// Export the main service class as default
export default CandidateProfileService