import { ExtractedEntity, SentimentAnalysis, generateAIResponse } from '../ai/openai'
import { ContextualMessage, CandidateProfile } from '../interview/conversationFlow'

export interface DynamicProfile {
  id: string
  candidateId: string
  interviewId: string
  
  // Core Profile Data
  personalInfo: PersonalInfo
  skills: SkillProfile[]
  experiences: ExperienceTimeline[]
  education: EducationRecord[]
  projects: ProjectRecord[]
  achievements: Achievement[]
  
  // Analysis Data
  communicationStyle: CommunicationAssessment
  behavioralTraits: BehavioralProfile
  technicalCompetency: TechnicalAssessment
  
  // Meta Information
  profileCompleteness: number
  confidence: number
  lastUpdated: Date
  sources: DataSource[]
  flags: ProfileFlag[]
}

export interface PersonalInfo {
  name?: string
  currentTitle?: string
  currentCompany?: string
  location?: string
  yearsExperience?: number
  expectedSalary?: number
  noticePeriod?: string
  availability?: string
  preferredWorkStyle?: 'remote' | 'hybrid' | 'onsite' | 'flexible'
}

export interface SkillProfile {
  id: string
  name: string
  category: SkillCategory
  proficiencyLevel: ProficiencyLevel
  confidence: number
  verified: boolean
  mentionCount: number
  contexts: string[]
  relatedSkills: string[]
  yearsExperience?: number
  lastUsed?: string
  certifications?: string[]
}

export interface ExperienceTimeline {
  id: string
  role: string
  company: string
  startDate?: Date
  endDate?: Date
  duration?: string
  isCurrent: boolean
  responsibilities: string[]
  achievements: string[]
  technologies: string[]
  teamSize?: number
  reportingLevel?: string
  relevanceScore: number
  confidence: number
}

export interface EducationRecord {
  id: string
  degree: string
  field: string
  institution: string
  graduationYear?: number
  gpa?: number
  honors?: string[]
  relevantCourses: string[]
  projects: string[]
  confidence: number
}

export interface ProjectRecord {
  id: string
  name: string
  description: string
  role: string
  technologies: string[]
  duration?: string
  teamSize?: number
  challenges: string[]
  outcomes: string[]
  metrics: string[]
  relevanceScore: number
  confidence: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  type: AchievementType
  date?: Date
  metrics?: string[]
  impact: string
  confidence: number
}

export interface CommunicationAssessment {
  clarity: number
  articulation: number
  structure: number
  enthusiasm: number
  professionalism: number
  storytelling: number
  technicalExplanation: number
  responseLength: 'too_short' | 'optimal' | 'too_long'
  vocabularyLevel: 'basic' | 'intermediate' | 'advanced' | 'expert'
  grammarQuality: number
  confidence: number
}

export interface BehavioralProfile {
  leadership: number
  teamwork: number
  problemSolving: number
  adaptability: number
  initiative: number
  resilience: number
  communication: number
  empathy: number
  conflictResolution: number
  timeManagement: number
  learningAgility: number
  confidence: number
}

export interface TechnicalAssessment {
  overallLevel: 'junior' | 'mid' | 'senior' | 'expert'
  primarySkills: string[]
  strengths: string[]
  growthAreas: string[]
  architecturalThinking: number
  problemSolvingApproach: number
  codeQuality: number
  systemDesign: number
  debugging: number
  testing: number
  confidence: number
}

export interface DataSource {
  type: 'interview_response' | 'resume' | 'linkedin' | 'portfolio' | 'assessment'
  messageId?: string
  timestamp: Date
  reliability: number
}

export interface ProfileFlag {
  type: 'inconsistency' | 'red_flag' | 'strength' | 'concern' | 'verification_needed'
  description: string
  severity: 'low' | 'medium' | 'high'
  source: string
  confidence: number
}

export enum SkillCategory {
  PROGRAMMING_LANGUAGE = 'programming_language',
  FRAMEWORK = 'framework',
  DATABASE = 'database',
  CLOUD = 'cloud',
  DEVOPS = 'devops',
  FRONTEND = 'frontend',
  BACKEND = 'backend',
  MOBILE = 'mobile',
  TESTING = 'testing',
  DESIGN = 'design',
  PROJECT_MANAGEMENT = 'project_management',
  SOFT_SKILL = 'soft_skill',
  DOMAIN_KNOWLEDGE = 'domain_knowledge',
  TOOL = 'tool',
  METHODOLOGY = 'methodology'
}

export enum ProficiencyLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

export enum AchievementType {
  AWARD = 'award',
  PROMOTION = 'promotion',
  PROJECT_SUCCESS = 'project_success',
  COST_SAVING = 'cost_saving',
  PERFORMANCE_IMPROVEMENT = 'performance_improvement',
  INNOVATION = 'innovation',
  LEADERSHIP = 'leadership',
  CERTIFICATION = 'certification',
  PUBLICATION = 'publication',
  PATENT = 'patent'
}

export class CandidateProfileBuilder {
  private profile: DynamicProfile

  constructor(candidateId: string, interviewId: string) {
    this.profile = this.initializeProfile(candidateId, interviewId)
  }

  private initializeProfile(candidateId: string, interviewId: string): DynamicProfile {
    return {
      id: `profile_${candidateId}_${Date.now()}`,
      candidateId,
      interviewId,
      personalInfo: {},
      skills: [],
      experiences: [],
      education: [],
      projects: [],
      achievements: [],
      communicationStyle: this.initializeCommunicationAssessment(),
      behavioralTraits: this.initializeBehavioralProfile(),
      technicalCompetency: this.initializeTechnicalAssessment(),
      profileCompleteness: 0,
      confidence: 0,
      lastUpdated: new Date(),
      sources: [],
      flags: []
    }
  }

  private initializeCommunicationAssessment(): CommunicationAssessment {
    return {
      clarity: 0.5,
      articulation: 0.5,
      structure: 0.5,
      enthusiasm: 0.5,
      professionalism: 0.5,
      storytelling: 0.5,
      technicalExplanation: 0.5,
      responseLength: 'optimal',
      vocabularyLevel: 'intermediate',
      grammarQuality: 0.5,
      confidence: 0.5
    }
  }

  private initializeBehavioralProfile(): BehavioralProfile {
    return {
      leadership: 0.5,
      teamwork: 0.5,
      problemSolving: 0.5,
      adaptability: 0.5,
      initiative: 0.5,
      resilience: 0.5,
      communication: 0.5,
      empathy: 0.5,
      conflictResolution: 0.5,
      timeManagement: 0.5,
      learningAgility: 0.5,
      confidence: 0.5
    }
  }

  private initializeTechnicalAssessment(): TechnicalAssessment {
    return {
      overallLevel: 'mid',
      primarySkills: [],
      strengths: [],
      growthAreas: [],
      architecturalThinking: 0.5,
      problemSolvingApproach: 0.5,
      codeQuality: 0.5,
      systemDesign: 0.5,
      debugging: 0.5,
      testing: 0.5,
      confidence: 0.5
    }
  }

  // Main method to process a new interview message
  async processMessage(message: ContextualMessage): Promise<void> {
    const source: DataSource = {
      type: 'interview_response',
      messageId: message.id,
      timestamp: message.timestamp,
      reliability: message.sentiment?.confidence || 0.7
    }

    this.profile.sources.push(source)

    // Extract and update different aspects of the profile
    await this.updatePersonalInfo(message)
    await this.updateSkills(message)
    await this.updateExperiences(message)
    await this.updateEducation(message)
    await this.updateProjects(message)
    await this.updateAchievements(message)
    await this.updateCommunicationAssessment(message)
    await this.updateBehavioralTraits(message)
    await this.updateTechnicalCompetency(message)

    // Update meta information
    this.updateProfileCompleteness()
    this.updateConfidence()
    this.profile.lastUpdated = new Date()

    // Check for flags and inconsistencies
    await this.checkForFlags(message)
  }

  private async updatePersonalInfo(message: ContextualMessage): Promise<void> {
    const content = message.content.toLowerCase()
    const entities = message.entities || []

    // Extract name if not already set
    if (!this.profile.personalInfo.name) {
      const namePattern = /my name is (\w+)|i'm (\w+)|i am (\w+)/i
      const match = message.content.match(namePattern)
      if (match) {
        this.profile.personalInfo.name = match[1] || match[2] || match[3]
      }
    }

    // Extract current role and company from entities
    entities.forEach(entity => {
      if (entity.type === 'experience' && !this.profile.personalInfo.currentTitle) {
        this.profile.personalInfo.currentTitle = entity.value
      }
      if (entity.type === 'company' && !this.profile.personalInfo.currentCompany) {
        this.profile.personalInfo.currentCompany = entity.value
      }
    })

    // Extract years of experience
    const expPattern = /(\d+)\s*years?\s*(of\s*)?(experience|exp)/i
    const expMatch = content.match(expPattern)
    if (expMatch && !this.profile.personalInfo.yearsExperience) {
      this.profile.personalInfo.yearsExperience = parseInt(expMatch[1])
    }

    // Extract location
    const locationPattern = /based in|located in|from (\w+(?:\s+\w+)*)/i
    const locationMatch = content.match(locationPattern)
    if (locationMatch && !this.profile.personalInfo.location) {
      this.profile.personalInfo.location = locationMatch[1]
    }

    // Extract work preferences
    if (content.includes('remote') || content.includes('work from home')) {
      this.profile.personalInfo.preferredWorkStyle = 'remote'
    } else if (content.includes('hybrid')) {
      this.profile.personalInfo.preferredWorkStyle = 'hybrid'
    } else if (content.includes('office') || content.includes('onsite')) {
      this.profile.personalInfo.preferredWorkStyle = 'onsite'
    }
  }

  private async updateSkills(message: ContextualMessage): Promise<void> {
    const entities = message.entities || []
    const skillEntities = entities.filter(e => e.type === 'skill' || e.type === 'technology')

    for (const entity of skillEntities) {
      const existingSkill = this.profile.skills.find(s => 
        s.name.toLowerCase() === entity.value.toLowerCase()
      )

      if (existingSkill) {
        // Update existing skill
        existingSkill.mentionCount++
        existingSkill.contexts.push(entity.context || message.content.substring(0, 100))
        existingSkill.confidence = Math.min(existingSkill.confidence + 0.1, 1.0)
      } else {
        // Add new skill
        const skillProfile: SkillProfile = {
          id: `skill_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          name: entity.value,
          category: this.categorizeSkill(entity.value),
          proficiencyLevel: this.inferProficiencyLevel(entity, message.content),
          confidence: entity.confidence,
          verified: false,
          mentionCount: 1,
          contexts: [entity.context || message.content.substring(0, 100)],
          relatedSkills: []
        }

        this.profile.skills.push(skillProfile)
      }
    }

    // Extract proficiency levels from context
    await this.updateSkillProficiency(message)
  }

  private categorizeSkill(skillName: string): SkillCategory {
    const skill = skillName.toLowerCase()

    // Programming languages
    if (['javascript', 'python', 'java', 'c++', 'c#', 'go', 'rust', 'php', 'ruby', 'typescript'].includes(skill)) {
      return SkillCategory.PROGRAMMING_LANGUAGE
    }

    // Frameworks
    if (['react', 'angular', 'vue', 'express', 'django', 'spring', 'laravel', 'rails'].includes(skill)) {
      return SkillCategory.FRAMEWORK
    }

    // Databases
    if (['mysql', 'postgresql', 'mongodb', 'redis', 'elasticsearch', 'cassandra'].includes(skill)) {
      return SkillCategory.DATABASE
    }

    // Cloud
    if (['aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform'].includes(skill)) {
      return SkillCategory.CLOUD
    }

    // DevOps
    if (['jenkins', 'gitlab', 'github actions', 'ansible', 'puppet', 'chef'].includes(skill)) {
      return SkillCategory.DEVOPS
    }

    // Soft skills
    if (['leadership', 'communication', 'teamwork', 'problem solving', 'project management'].includes(skill)) {
      return SkillCategory.SOFT_SKILL
    }

    return SkillCategory.TOOL // Default
  }

  private inferProficiencyLevel(entity: ExtractedEntity, context: string): ProficiencyLevel {
    const lowerContext = context.toLowerCase()

    if (lowerContext.includes('expert') || lowerContext.includes('master') || lowerContext.includes('architect')) {
      return ProficiencyLevel.EXPERT
    } else if (lowerContext.includes('senior') || lowerContext.includes('advanced') || lowerContext.includes('lead')) {
      return ProficiencyLevel.ADVANCED
    } else if (lowerContext.includes('intermediate') || lowerContext.includes('proficient')) {
      return ProficiencyLevel.INTERMEDIATE
    } else if (lowerContext.includes('beginner') || lowerContext.includes('learning') || lowerContext.includes('basic')) {
      return ProficiencyLevel.BEGINNER
    }

    return ProficiencyLevel.INTERMEDIATE // Default
  }

  private async updateSkillProficiency(message: ContextualMessage): Promise<void> {
    const content = message.content.toLowerCase()

    // Look for proficiency indicators
    const proficiencyPatterns = [
      { pattern: /(\w+)\s*for\s*(\d+)\s*years?/g, type: 'years' },
      { pattern: /expert\s*(?:in|with|at)\s*(\w+)/g, level: ProficiencyLevel.EXPERT },
      { pattern: /proficient\s*(?:in|with|at)\s*(\w+)/g, level: ProficiencyLevel.ADVANCED },
      { pattern: /familiar\s*(?:with|at)\s*(\w+)/g, level: ProficiencyLevel.INTERMEDIATE },
      { pattern: /learning\s*(\w+)/g, level: ProficiencyLevel.BEGINNER }
    ]

    for (const { pattern, level, type } of proficiencyPatterns) {
      let match
      while ((match = pattern.exec(content)) !== null) {
        const skillName = match[1]
        const skill = this.profile.skills.find(s => 
          s.name.toLowerCase().includes(skillName) || skillName.includes(s.name.toLowerCase())
        )

        if (skill) {
          if (type === 'years') {
            skill.yearsExperience = parseInt(match[2])
            // Infer proficiency from years
            const years = parseInt(match[2])
            if (years >= 5) skill.proficiencyLevel = ProficiencyLevel.EXPERT
            else if (years >= 3) skill.proficiencyLevel = ProficiencyLevel.ADVANCED
            else if (years >= 1) skill.proficiencyLevel = ProficiencyLevel.INTERMEDIATE
            else skill.proficiencyLevel = ProficiencyLevel.BEGINNER
          } else if (level) {
            skill.proficiencyLevel = level
          }
        }
      }
    }
  }

  private async updateExperiences(message: ContextualMessage): Promise<void> {
    const entities = message.entities || []
    const content = message.content

    // Look for job titles and companies
    const experienceEntities = entities.filter(e => e.type === 'experience')
    const companyEntities = entities.filter(e => e.type === 'company')

    if (experienceEntities.length > 0 || companyEntities.length > 0) {
      const experience: ExperienceTimeline = {
        id: `exp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        role: experienceEntities[0]?.value || 'Unknown Role',
        company: companyEntities[0]?.value || 'Unknown Company',
        isCurrent: this.isCurrentRole(content),
        responsibilities: this.extractResponsibilities(content),
        achievements: this.extractAchievements(content),
        technologies: entities.filter(e => e.type === 'technology').map(e => e.value),
        relevanceScore: 0.7, // Will be calculated later
        confidence: Math.max(
          experienceEntities[0]?.confidence || 0,
          companyEntities[0]?.confidence || 0
        )
      }

      // Try to extract dates
      const dateInfo = this.extractDates(content)
      if (dateInfo.startDate) experience.startDate = dateInfo.startDate
      if (dateInfo.endDate) experience.endDate = dateInfo.endDate
      if (dateInfo.duration) experience.duration = dateInfo.duration

      // Extract team size and reporting level
      const teamSize = this.extractTeamSize(content)
      if (teamSize) experience.teamSize = teamSize

      this.profile.experiences.push(experience)
    }
  }

  private isCurrentRole(content: string): boolean {
    const currentIndicators = ['currently', 'present', 'now', 'today', 'my current role']
    return currentIndicators.some(indicator => 
      content.toLowerCase().includes(indicator)
    )
  }

  private extractResponsibilities(content: string): string[] {
    const responsibilities: string[] = []
    
    // Look for responsibility patterns
    const patterns = [
      /responsible for (.+?)(?:\.|,|$)/gi,
      /my duties include (.+?)(?:\.|,|$)/gi,
      /i (.+?)(?:\.|,|and)/gi
    ]

    patterns.forEach(pattern => {
      let match
      while ((match = pattern.exec(content)) !== null) {
        const responsibility = match[1].trim()
        if (responsibility.length > 10 && responsibility.length < 200) {
          responsibilities.push(responsibility)
        }
      }
    })

    return responsibilities
  }

  private extractAchievements(content: string): string[] {
    const achievements: string[] = []
    
    // Look for achievement patterns
    const patterns = [
      /achieved (.+?)(?:\.|,|$)/gi,
      /improved (.+?)(?:\.|,|$)/gi,
      /increased (.+?)(?:\.|,|$)/gi,
      /reduced (.+?)(?:\.|,|$)/gi,
      /delivered (.+?)(?:\.|,|$)/gi,
      /led (.+?)(?:\.|,|$)/gi
    ]

    patterns.forEach(pattern => {
      let match
      while ((match = pattern.exec(content)) !== null) {
        const achievement = match[1].trim()
        if (achievement.length > 10 && achievement.length < 200) {
          achievements.push(achievement)
        }
      }
    })

    return achievements
  }

  private extractDates(content: string): {
    startDate?: Date
    endDate?: Date
    duration?: string
  } {
    const result: any = {}

    // Extract year ranges
    const yearRangePattern = /(\d{4})\s*-\s*(\d{4}|present|current)/i
    const yearMatch = content.match(yearRangePattern)
    if (yearMatch) {
      result.startDate = new Date(parseInt(yearMatch[1]), 0, 1)
      if (yearMatch[2] !== 'present' && yearMatch[2] !== 'current') {
        result.endDate = new Date(parseInt(yearMatch[2]), 11, 31)
      }
    }

    // Extract duration
    const durationPattern = /(\d+)\s*(year|month|yr|mo)s?/i
    const durationMatch = content.match(durationPattern)
    if (durationMatch) {
      result.duration = `${durationMatch[1]} ${durationMatch[2]}${durationMatch[1] !== '1' ? 's' : ''}`
    }

    return result
  }

  private extractTeamSize(content: string): number | undefined {
    const teamPattern = /team\s*of\s*(\d+)|(\d+)\s*people|(\d+)\s*members/i
    const match = content.match(teamPattern)
    if (match) {
      return parseInt(match[1] || match[2] || match[3])
    }
    return undefined
  }

  private async updateEducation(message: ContextualMessage): Promise<void> {
    const entities = message.entities || []
    const educationEntities = entities.filter(e => e.type === 'education')

    if (educationEntities.length > 0) {
      for (const entity of educationEntities) {
        const education: EducationRecord = {
          id: `edu_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          degree: entity.value,
          field: this.extractField(entity.context || message.content),
          institution: this.extractInstitution(message.content),
          relevantCourses: [],
          projects: [],
          confidence: entity.confidence
        }

        // Extract graduation year
        const yearPattern = /(\d{4})/
        const yearMatch = message.content.match(yearPattern)
        if (yearMatch) {
          education.graduationYear = parseInt(yearMatch[1])
        }

        this.profile.education.push(education)
      }
    }
  }

  private extractField(content: string): string {
    const fieldPatterns = [
      /in (.+?)(?:\s+from|\s+at|$)/i,
      /degree in (.+?)(?:\s+from|\s+at|$)/i,
      /studied (.+?)(?:\s+at|$)/i
    ]

    for (const pattern of fieldPatterns) {
      const match = content.match(pattern)
      if (match) {
        return match[1].trim()
      }
    }

    return 'Unknown Field'
  }

  private extractInstitution(content: string): string {
    const institutionPatterns = [
      /from (.+?)(?:\s+in|\s+where|$)/i,
      /at (.+?)(?:\s+in|\s+where|$)/i,
      /university of (.+?)(?:\s|$)/i,
      /(.+?)\s+university/i
    ]

    for (const pattern of institutionPatterns) {
      const match = content.match(pattern)
      if (match) {
        return match[1].trim()
      }
    }

    return 'Unknown Institution'
  }

  private async updateProjects(message: ContextualMessage): Promise<void> {
    const content = message.content.toLowerCase()
    const entities = message.entities || []

    if (content.includes('project') || content.includes('built') || content.includes('developed')) {
      const project: ProjectRecord = {
        id: `proj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: this.extractProjectName(message.content),
        description: this.extractProjectDescription(message.content),
        role: this.extractProjectRole(message.content),
        technologies: entities.filter(e => e.type === 'technology').map(e => e.value),
        challenges: [],
        outcomes: [],
        metrics: [],
        relevanceScore: 0.8,
        confidence: 0.7
      }

      this.profile.projects.push(project)
    }
  }

  private extractProjectName(content: string): string {
    const namePatterns = [
      /project called (.+?)(?:\s|,|\.)/i,
      /built (.+?)(?:\s+that|\s+which|,)/i,
      /developed (.+?)(?:\s+that|\s+which|,)/i
    ]

    for (const pattern of namePatterns) {
      const match = content.match(pattern)
      if (match) {
        return match[1].trim()
      }
    }

    return 'Unnamed Project'
  }

  private extractProjectDescription(content: string): string {
    // Return first sentence that seems to describe the project
    const sentences = content.split(/[.!?]+/)
    for (const sentence of sentences) {
      if (sentence.toLowerCase().includes('project') || 
          sentence.toLowerCase().includes('built') || 
          sentence.toLowerCase().includes('developed')) {
        return sentence.trim()
      }
    }
    return content.substring(0, 100) + '...'
  }

  private extractProjectRole(content: string): string {
    const rolePatterns = [
      /i was (?:the\s+)?(.+?)(?:\s+on|\s+for|\s+in)/i,
      /my role was (.+?)(?:\s|,|\.)/i,
      /as (?:a\s+|an\s+)?(.+?)(?:\s+i|\s+on|,)/i
    ]

    for (const pattern of rolePatterns) {
      const match = content.match(pattern)
      if (match) {
        return match[1].trim()
      }
    }

    return 'Developer'
  }

  private async updateAchievements(message: ContextualMessage): Promise<void> {
    const entities = message.entities || []
    const achievementEntities = entities.filter(e => e.type === 'achievement')

    for (const entity of achievementEntities) {
      const achievement: Achievement = {
        id: `ach_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: entity.value,
        description: entity.context || message.content.substring(0, 200),
        type: this.categorizeAchievement(entity.value),
        impact: this.extractImpact(message.content),
        confidence: entity.confidence
      }

      this.profile.achievements.push(achievement)
    }
  }

  private categorizeAchievement(achievementText: string): AchievementType {
    const text = achievementText.toLowerCase()

    if (text.includes('promotion') || text.includes('promoted')) {
      return AchievementType.PROMOTION
    } else if (text.includes('award') || text.includes('recognition')) {
      return AchievementType.AWARD
    } else if (text.includes('saved') || text.includes('cost')) {
      return AchievementType.COST_SAVING
    } else if (text.includes('performance') || text.includes('efficiency')) {
      return AchievementType.PERFORMANCE_IMPROVEMENT
    } else if (text.includes('led') || text.includes('managed')) {
      return AchievementType.LEADERSHIP
    } else if (text.includes('certification') || text.includes('certified')) {
      return AchievementType.CERTIFICATION
    }

    return AchievementType.PROJECT_SUCCESS
  }

  private extractImpact(content: string): string {
    const impactPatterns = [
      /resulted in (.+?)(?:\.|,|$)/i,
      /impact was (.+?)(?:\.|,|$)/i,
      /which led to (.+?)(?:\.|,|$)/i,
      /saving (.+?)(?:\.|,|$)/i,
      /improving (.+?)(?:\.|,|$)/i
    ]

    for (const pattern of impactPatterns) {
      const match = content.match(pattern)
      if (match) {
        return match[1].trim()
      }
    }

    return 'Positive impact on project/organization'
  }

  private async updateCommunicationAssessment(message: ContextualMessage): Promise<void> {
    const content = message.content
    const sentiment = message.sentiment

    // Update based on message characteristics
    const wordCount = content.split(/\s+/).length
    const sentenceCount = content.split(/[.!?]+/).filter(s => s.trim()).length
    const avgWordsPerSentence = sentenceCount > 0 ? wordCount / sentenceCount : 0

    // Clarity assessment
    if (avgWordsPerSentence > 5 && avgWordsPerSentence < 20) {
      this.profile.communicationStyle.clarity = Math.min(this.profile.communicationStyle.clarity + 0.1, 1.0)
    }

    // Structure assessment (presence of transitions, examples)
    if (content.includes('for example') || content.includes('first') || content.includes('then')) {
      this.profile.communicationStyle.structure = Math.min(this.profile.communicationStyle.structure + 0.1, 1.0)
    }

    // Enthusiasm from sentiment
    if (sentiment?.emotions.enthusiasm) {
      this.profile.communicationStyle.enthusiasm = 
        (this.profile.communicationStyle.enthusiasm + sentiment.emotions.enthusiasm) / 2
    }

    // Response length categorization
    if (wordCount < 20) {
      this.profile.communicationStyle.responseLength = 'too_short'
    } else if (wordCount > 150) {
      this.profile.communicationStyle.responseLength = 'too_long'
    } else {
      this.profile.communicationStyle.responseLength = 'optimal'
    }

    // Technical explanation ability
    const entities = message.entities || []
    const techEntities = entities.filter(e => 
      e.type === 'technology' || e.type === 'skill'
    ).length

    if (techEntities > 2) {
      this.profile.communicationStyle.technicalExplanation = 
        Math.min(this.profile.communicationStyle.technicalExplanation + 0.1, 1.0)
    }
  }

  private async updateBehavioralTraits(message: ContextualMessage): Promise<void> {
    const content = message.content.toLowerCase()

    // Leadership indicators
    if (content.includes('led') || content.includes('managed') || content.includes('guided')) {
      this.profile.behavioralTraits.leadership = 
        Math.min(this.profile.behavioralTraits.leadership + 0.15, 1.0)
    }

    // Teamwork indicators
    if (content.includes('team') || content.includes('collaborated') || content.includes('worked with')) {
      this.profile.behavioralTraits.teamwork = 
        Math.min(this.profile.behavioralTraits.teamwork + 0.1, 1.0)
    }

    // Problem solving indicators
    if (content.includes('solved') || content.includes('fixed') || content.includes('debugged')) {
      this.profile.behavioralTraits.problemSolving = 
        Math.min(this.profile.behavioralTraits.problemSolving + 0.1, 1.0)
    }

    // Adaptability indicators
    if (content.includes('learned') || content.includes('adapted') || content.includes('new technology')) {
      this.profile.behavioralTraits.adaptability = 
        Math.min(this.profile.behavioralTraits.adaptability + 0.1, 1.0)
    }

    // Initiative indicators
    if (content.includes('initiated') || content.includes('proposed') || content.includes('took responsibility')) {
      this.profile.behavioralTraits.initiative = 
        Math.min(this.profile.behavioralTraits.initiative + 0.15, 1.0)
    }
  }

  private async updateTechnicalCompetency(message: ContextualMessage): Promise<void> {
    const entities = message.entities || []
    const techEntities = entities.filter(e => 
      e.type === 'technology' || e.type === 'skill'
    )

    if (techEntities.length > 0) {
      // Update primary skills
      techEntities.forEach(entity => {
        if (!this.profile.technicalCompetency.primarySkills.includes(entity.value)) {
          this.profile.technicalCompetency.primarySkills.push(entity.value)
        }
      })

      // Assess overall level based on vocabulary and depth
      const content = message.content.toLowerCase()
      if (content.includes('architecture') || content.includes('design patterns')) {
        this.profile.technicalCompetency.architecturalThinking = 
          Math.min(this.profile.technicalCompetency.architecturalThinking + 0.2, 1.0)
      }

      if (content.includes('debug') || content.includes('troubleshoot')) {
        this.profile.technicalCompetency.debugging = 
          Math.min(this.profile.technicalCompetency.debugging + 0.15, 1.0)
      }

      if (content.includes('test') || content.includes('unit test') || content.includes('automation')) {
        this.profile.technicalCompetency.testing = 
          Math.min(this.profile.technicalCompetency.testing + 0.15, 1.0)
      }
    }
  }

  private updateProfileCompleteness(): void {
    const weights = {
      personalInfo: 0.15,
      skills: 0.25,
      experiences: 0.25,
      education: 0.10,
      projects: 0.15,
      achievements: 0.10
    }

    let completeness = 0

    // Personal info completeness
    const personalFields = Object.keys(this.profile.personalInfo).length
    completeness += Math.min(personalFields / 6, 1) * weights.personalInfo

    // Skills completeness
    completeness += Math.min(this.profile.skills.length / 5, 1) * weights.skills

    // Experience completeness
    completeness += Math.min(this.profile.experiences.length / 2, 1) * weights.experiences

    // Education completeness
    completeness += Math.min(this.profile.education.length / 1, 1) * weights.education

    // Projects completeness
    completeness += Math.min(this.profile.projects.length / 2, 1) * weights.projects

    // Achievements completeness
    completeness += Math.min(this.profile.achievements.length / 2, 1) * weights.achievements

    this.profile.profileCompleteness = completeness
  }

  private updateConfidence(): void {
    const allConfidences = [
      ...this.profile.skills.map(s => s.confidence),
      ...this.profile.experiences.map(e => e.confidence),
      ...this.profile.education.map(e => e.confidence),
      ...this.profile.projects.map(p => p.confidence),
      ...this.profile.achievements.map(a => a.confidence)
    ]

    if (allConfidences.length > 0) {
      this.profile.confidence = allConfidences.reduce((sum, conf) => sum + conf, 0) / allConfidences.length
    }
  }

  private async checkForFlags(message: ContextualMessage): Promise<void> {
    // Check for inconsistencies
    await this.checkExperienceConsistency()
    await this.checkSkillConsistency()
    
    // Check for red flags
    await this.checkRedFlags(message)
    
    // Check for strengths
    await this.checkStrengths(message)
  }

  private async checkExperienceConsistency(): Promise<void> {
    // Check if years of experience match timeline
    if (this.profile.personalInfo.yearsExperience) {
      const experienceYears = this.profile.personalInfo.yearsExperience
      const timelineYears = this.calculateTimelineYears()
      
      if (Math.abs(experienceYears - timelineYears) > 2) {
        this.profile.flags.push({
          type: 'inconsistency',
          description: `Stated experience (${experienceYears} years) doesn't match timeline (${timelineYears} years)`,
          severity: 'medium',
          source: 'experience_timeline',
          confidence: 0.8
        })
      }
    }
  }

  private calculateTimelineYears(): number {
    // Simple calculation - could be enhanced
    return this.profile.experiences.reduce((total, exp) => {
      if (exp.duration) {
        const years = parseInt(exp.duration.match(/(\d+)/)?.[1] || '0')
        return total + years
      }
      return total
    }, 0)
  }

  private async checkSkillConsistency(): Promise<void> {
    // Check for skill level consistency
    this.profile.skills.forEach(skill => {
      if (skill.proficiencyLevel === ProficiencyLevel.EXPERT && skill.mentionCount === 1) {
        this.profile.flags.push({
          type: 'verification_needed',
          description: `Claims expert level in ${skill.name} but only mentioned once`,
          severity: 'low',
          source: 'skill_assessment',
          confidence: 0.6
        })
      }
    })
  }

  private async checkRedFlags(message: ContextualMessage): Promise<void> {
    const content = message.content.toLowerCase()
    
    // Negative attitude indicators
    if (content.includes('hate') || content.includes('terrible') || content.includes('awful')) {
      this.profile.flags.push({
        type: 'red_flag',
        description: 'Negative language detected',
        severity: 'medium',
        source: message.id,
        confidence: 0.7
      })
    }

    // Blame shifting
    if (content.includes("wasn't my fault") || content.includes('blame')) {
      this.profile.flags.push({
        type: 'concern',
        description: 'Potential responsibility avoidance',
        severity: 'low',
        source: message.id,
        confidence: 0.6
      })
    }
  }

  private async checkStrengths(message: ContextualMessage): Promise<void> {
    const content = message.content.toLowerCase()
    
    // Leadership indicators
    if (content.includes('mentored') || content.includes('guided team')) {
      this.profile.flags.push({
        type: 'strength',
        description: 'Demonstrates mentoring and leadership abilities',
        severity: 'low',
        source: message.id,
        confidence: 0.8
      })
    }

    // Learning agility
    if (content.includes('quickly learned') || content.includes('self-taught')) {
      this.profile.flags.push({
        type: 'strength',
        description: 'Shows strong learning agility',
        severity: 'low',
        source: message.id,
        confidence: 0.7
      })
    }
  }

  // Public methods
  getProfile(): DynamicProfile {
    return { ...this.profile }
  }

  getProfileSummary(): {
    completeness: number
    confidence: number
    primarySkills: string[]
    experience: string
    strengths: string[]
    concerns: string[]
  } {
    return {
      completeness: this.profile.profileCompleteness,
      confidence: this.profile.confidence,
      primarySkills: this.profile.skills
        .sort((a, b) => b.confidence - a.confidence)
        .slice(0, 5)
        .map(s => s.name),
      experience: `${this.profile.personalInfo.yearsExperience || 'Unknown'} years`,
      strengths: this.profile.flags
        .filter(f => f.type === 'strength')
        .map(f => f.description),
      concerns: this.profile.flags
        .filter(f => f.type === 'red_flag' || f.type === 'concern')
        .map(f => f.description)
    }
  }

  exportProfile(): string {
    return JSON.stringify(this.profile, null, 2)
  }
}