import { DynamicProfile, SkillProfile, ExperienceTimeline, CommunicationAssessment, BehavioralProfile, TechnicalAssessment, ProficiencyLevel } from './profileBuilder'
import { ExtractedSkill, SkillCategory } from './skillExtractor'

export interface ScoringResult {
  overallScore: number
  categoryScores: CategoryScores
  detailedScores: DetailedScores
  recommendations: ScoreRecommendation[]
  strengths: string[]
  weaknesses: string[]
  confidence: number
  metadata: ScoringMetadata
}

export interface CategoryScores {
  technical: number
  communication: number
  experience: number
  cultural: number
  behavioral: number
  education: number
}

export interface DetailedScores {
  skillRelevance: number
  skillProficiency: number
  experienceRelevance: number
  experienceDepth: number
  communicationClarity: number
  communicationEnthusiasm: number
  responseCompleteness: number
  consistencyScore: number
  learningAgility: number
  problemSolving: number
  leadership: number
  teamwork: number
}

export interface ScoreRecommendation {
  type: 'strength' | 'improvement' | 'concern' | 'verification'
  category: string
  description: string
  impact: 'high' | 'medium' | 'low'
  actionable: boolean
  suggestion?: string
}

export interface ScoringMetadata {
  dataCompleteness: number
  confidenceFactors: string[]
  scoringDate: Date
  version: string
  weights: ScoringWeights
}

export interface ScoringWeights {
  technical: number
  communication: number
  experience: number
  cultural: number
  behavioral: number
  education: number
}

export interface JobRequirements {
  requiredSkills: RequiredSkill[]
  experienceLevel: ProficiencyLevel
  minimumYears: number
  preferredSkills: string[]
  communicationLevel: number
  leadershipRequired: boolean
  teamworkImportance: number
  domainKnowledge?: string[]
  culturalValues: string[]
  workStyle: 'individual' | 'team' | 'mixed'
}

export interface RequiredSkill {
  name: string
  category: SkillCategory
  proficiencyLevel: ProficiencyLevel
  importance: 'critical' | 'important' | 'nice_to_have'
  weight: number
}

export class CandidateScoringEngine {
  private defaultWeights: ScoringWeights = {
    technical: 0.35,
    communication: 0.20,
    experience: 0.25,
    cultural: 0.10,
    behavioral: 0.10,
    education: 0.05
  }

  async scoreCandidate(
    profile: DynamicProfile,
    jobRequirements: JobRequirements,
    customWeights?: Partial<ScoringWeights>
  ): Promise<ScoringResult> {
    const weights = { ...this.defaultWeights, ...customWeights }
    
    // Calculate category scores
    const categoryScores = await this.calculateCategoryScores(profile, jobRequirements)
    
    // Calculate detailed scores
    const detailedScores = await this.calculateDetailedScores(profile, jobRequirements)
    
    // Calculate overall score
    const overallScore = this.calculateOverallScore(categoryScores, weights)
    
    // Generate recommendations
    const recommendations = this.generateRecommendations(profile, categoryScores, detailedScores, jobRequirements)
    
    // Identify strengths and weaknesses
    const { strengths, weaknesses } = this.identifyStrengthsAndWeaknesses(categoryScores, detailedScores)
    
    // Calculate confidence
    const confidence = this.calculateScoringConfidence(profile, jobRequirements)
    
    // Create metadata
    const metadata: ScoringMetadata = {
      dataCompleteness: profile.profileCompleteness,
      confidenceFactors: this.identifyConfidenceFactors(profile),
      scoringDate: new Date(),
      version: '1.0.0',
      weights
    }

    return {
      overallScore,
      categoryScores,
      detailedScores,
      recommendations,
      strengths,
      weaknesses,
      confidence,
      metadata
    }
  }

  private async calculateCategoryScores(profile: DynamicProfile, jobRequirements: JobRequirements): Promise<CategoryScores> {
    return {
      technical: await this.scoreTechnicalFit(profile, jobRequirements),
      communication: this.scoreCommunication(profile.communicationStyle),
      experience: this.scoreExperience(profile.experiences, jobRequirements),
      cultural: this.scoreCulturalFit(profile, jobRequirements),
      behavioral: this.scoreBehavioral(profile.behavioralTraits, jobRequirements),
      education: this.scoreEducation(profile.education, jobRequirements)
    }
  }

  private async scoreTechnicalFit(profile: DynamicProfile, jobRequirements: JobRequirements): Promise<number> {
    const skillScore = this.scoreSkillMatch(profile.skills, jobRequirements.requiredSkills)
    const proficiencyScore = this.scoreSkillProficiency(profile.skills, jobRequirements)
    const experienceScore = this.scoreTechnicalExperience(profile.experiences, jobRequirements)
    const competencyScore = this.scoreTechnicalCompetency(profile.technicalCompetency)

    return (skillScore * 0.4) + (proficiencyScore * 0.3) + (experienceScore * 0.2) + (competencyScore * 0.1)
  }

  private scoreSkillMatch(candidateSkills: SkillProfile[], requiredSkills: RequiredSkill[]): number {
    if (requiredSkills.length === 0) return 1.0

    let totalWeight = 0
    let matchedWeight = 0

    for (const required of requiredSkills) {
      totalWeight += required.weight

      const candidateSkill = candidateSkills.find(cs => 
        cs.name.toLowerCase() === required.name.toLowerCase() ||
        cs.name.toLowerCase().includes(required.name.toLowerCase()) ||
        required.name.toLowerCase().includes(cs.name.toLowerCase())
      )

      if (candidateSkill) {
        const proficiencyMatch = this.calculateProficiencyMatch(
          candidateSkill.proficiencyLevel,
          required.proficiencyLevel
        )
        const confidenceMultiplier = candidateSkill.confidence
        matchedWeight += required.weight * proficiencyMatch * confidenceMultiplier
      } else if (required.importance === 'nice_to_have') {
        // Partial credit for missing nice-to-have skills
        matchedWeight += required.weight * 0.5
      }
    }

    return totalWeight > 0 ? Math.min(matchedWeight / totalWeight, 1.0) : 1.0
  }

  private calculateProficiencyMatch(candidateLevel: ProficiencyLevel, requiredLevel: ProficiencyLevel): number {
    const levels = [
      ProficiencyLevel.BEGINNER,
      ProficiencyLevel.INTERMEDIATE,
      ProficiencyLevel.ADVANCED,
      ProficiencyLevel.EXPERT
    ]

    const candidateIndex = levels.indexOf(candidateLevel)
    const requiredIndex = levels.indexOf(requiredLevel)

    if (candidateIndex >= requiredIndex) {
      return 1.0 // Meets or exceeds requirement
    } else {
      // Partial credit for being close
      const gap = requiredIndex - candidateIndex
      return Math.max(0, 1 - (gap * 0.25))
    }
  }

  private scoreSkillProficiency(skills: SkillProfile[], jobRequirements: JobRequirements): number {
    if (skills.length === 0) return 0

    const proficiencyScores = skills.map(skill => {
      switch (skill.proficiencyLevel) {
        case ProficiencyLevel.EXPERT: return 1.0
        case ProficiencyLevel.ADVANCED: return 0.8
        case ProficiencyLevel.INTERMEDIATE: return 0.6
        case ProficiencyLevel.BEGINNER: return 0.3
        default: return 0.5
      }
    })

    // Weight by skill confidence and relevance
    const weightedScores = proficiencyScores.map((score, index) => {
      const skill = skills[index]
      return score * skill.confidence
    })

    return weightedScores.reduce((sum, score) => sum + score, 0) / weightedScores.length
  }

  private scoreTechnicalExperience(experiences: ExperienceTimeline[], jobRequirements: JobRequirements): number {
    if (experiences.length === 0) return 0

    const relevantExperiences = experiences.filter(exp => exp.relevanceScore > 0.6)
    if (relevantExperiences.length === 0) return 0.2

    const experienceScores = relevantExperiences.map(exp => {
      const relevanceScore = exp.relevanceScore
      const confidenceScore = exp.confidence
      const technicalDepth = this.assessTechnicalDepth(exp)
      
      return (relevanceScore * 0.4) + (confidenceScore * 0.3) + (technicalDepth * 0.3)
    })

    return experienceScores.reduce((sum, score) => sum + score, 0) / experienceScores.length
  }

  private assessTechnicalDepth(experience: ExperienceTimeline): number {
    let depth = 0.5 // Base score

    // Technical complexity indicators
    if (experience.technologies.length > 3) depth += 0.2
    if (experience.achievements.some(a => a.toLowerCase().includes('architecture'))) depth += 0.2
    if (experience.achievements.some(a => a.toLowerCase().includes('performance'))) depth += 0.1
    if (experience.achievements.some(a => a.toLowerCase().includes('scale'))) depth += 0.1
    if (experience.teamSize && experience.teamSize > 5) depth += 0.1

    return Math.min(depth, 1.0)
  }

  private scoreTechnicalCompetency(competency: TechnicalAssessment): number {
    const scores = [
      competency.architecturalThinking,
      competency.problemSolvingApproach,
      competency.codeQuality,
      competency.systemDesign,
      competency.debugging,
      competency.testing
    ]

    const validScores = scores.filter(score => score > 0)
    if (validScores.length === 0) return 0.5

    return validScores.reduce((sum, score) => sum + score, 0) / validScores.length
  }

  private scoreCommunication(communication: CommunicationAssessment): number {
    const scores = [
      communication.clarity,
      communication.articulation,
      communication.structure,
      communication.professionalism,
      communication.technicalExplanation
    ]

    const weights = [0.25, 0.2, 0.2, 0.15, 0.2]
    
    const weightedScore = scores.reduce((sum, score, index) => {
      return sum + (score * weights[index])
    }, 0)

    // Apply modifiers
    let modifier = 1.0
    if (communication.responseLength === 'too_short') modifier *= 0.8
    if (communication.responseLength === 'too_long') modifier *= 0.9
    if (communication.grammarQuality < 0.6) modifier *= 0.85

    return Math.min(weightedScore * modifier, 1.0)
  }

  private scoreExperience(experiences: ExperienceTimeline[], jobRequirements: JobRequirements): number {
    if (experiences.length === 0) return 0

    const totalYears = this.calculateTotalExperience(experiences)
    const yearsScore = this.scoreExperienceYears(totalYears, jobRequirements.minimumYears)
    const relevanceScore = this.scoreExperienceRelevance(experiences, jobRequirements)
    const depthScore = this.scoreExperienceDepth(experiences)

    return (yearsScore * 0.4) + (relevanceScore * 0.4) + (depthScore * 0.2)
  }

  private calculateTotalExperience(experiences: ExperienceTimeline[]): number {
    return experiences.reduce((total, exp) => {
      if (exp.duration) {
        const match = exp.duration.match(/(\d+)/);
        if (match) {
          return total + parseInt(match[1])
        }
      }
      return total
    }, 0)
  }

  private scoreExperienceYears(totalYears: number, minimumYears: number): number {
    if (totalYears >= minimumYears) {
      return Math.min(1.0, totalYears / (minimumYears * 1.5))
    } else {
      return totalYears / minimumYears
    }
  }

  private scoreExperienceRelevance(experiences: ExperienceTimeline[], jobRequirements: JobRequirements): number {
    const relevanceScores = experiences.map(exp => exp.relevanceScore)
    return relevanceScores.reduce((sum, score) => sum + score, 0) / relevanceScores.length
  }

  private scoreExperienceDepth(experiences: ExperienceTimeline[]): number {
    const depthScores = experiences.map(exp => {
      let depth = 0.5

      if (exp.responsibilities.length > 3) depth += 0.1
      if (exp.achievements.length > 2) depth += 0.2
      if (exp.teamSize && exp.teamSize > 3) depth += 0.1
      if (exp.reportingLevel) depth += 0.1

      return Math.min(depth, 1.0)
    })

    return depthScores.reduce((sum, score) => sum + score, 0) / depthScores.length
  }

  private scoreCulturalFit(profile: DynamicProfile, jobRequirements: JobRequirements): number {
    let fit = 0.5 // Base cultural fit

    // Work style alignment
    const workStyleScore = this.scoreWorkStyleAlignment(profile, jobRequirements.workStyle)
    fit += workStyleScore * 0.3

    // Communication style fit
    const commFit = this.scoreCommunicationFit(profile.communicationStyle, jobRequirements)
    fit += commFit * 0.3

    // Values alignment (basic implementation)
    const valuesScore = this.scoreValuesAlignment(profile, jobRequirements.culturalValues)
    fit += valuesScore * 0.4

    return Math.min(fit, 1.0)
  }

  private scoreWorkStyleAlignment(profile: DynamicProfile, requiredWorkStyle: string): number {
    const preferredStyle = profile.personalInfo.preferredWorkStyle
    
    if (!preferredStyle) return 0.5

    if (preferredStyle === requiredWorkStyle) return 1.0
    if (preferredStyle === 'flexible' || requiredWorkStyle === 'mixed') return 0.8
    
    return 0.3
  }

  private scoreCommunicationFit(communication: CommunicationAssessment, jobRequirements: JobRequirements): number {
    const requiredLevel = jobRequirements.communicationLevel
    const candidateLevel = (communication.clarity + communication.articulation + communication.professionalism) / 3
    
    return Math.min(candidateLevel / requiredLevel, 1.0)
  }

  private scoreValuesAlignment(profile: DynamicProfile, culturalValues: string[]): number {
    // Simplified values alignment - could be enhanced with more sophisticated matching
    let alignment = 0.5

    for (const value of culturalValues) {
      const lowerValue = value.toLowerCase()
      
      if (lowerValue.includes('teamwork') && profile.behavioralTraits.teamwork > 0.7) {
        alignment += 0.1
      }
      if (lowerValue.includes('leadership') && profile.behavioralTraits.leadership > 0.7) {
        alignment += 0.1
      }
      if (lowerValue.includes('innovation') && profile.behavioralTraits.initiative > 0.7) {
        alignment += 0.1
      }
      if (lowerValue.includes('learning') && profile.behavioralTraits.learningAgility > 0.7) {
        alignment += 0.1
      }
    }

    return Math.min(alignment, 1.0)
  }

  private scoreBehavioral(behavioral: BehavioralProfile, jobRequirements: JobRequirements): number {
    const scores = []

    // Weight behavioral traits based on job requirements
    if (jobRequirements.leadershipRequired) {
      scores.push(behavioral.leadership * 0.3)
    }

    scores.push(behavioral.teamwork * jobRequirements.teamworkImportance)
    scores.push(behavioral.problemSolving * 0.2)
    scores.push(behavioral.communication * 0.15)
    scores.push(behavioral.adaptability * 0.15)
    scores.push(behavioral.initiative * 0.1)

    return scores.reduce((sum, score) => sum + score, 0) / scores.length
  }

  private scoreEducation(education: any[], jobRequirements: JobRequirements): number {
    if (education.length === 0) return 0.5 // Neutral for missing education

    // Simple education scoring - can be enhanced
    let score = 0.5

    for (const edu of education) {
      if (edu.relevant) score += 0.2
      if (edu.degree && edu.degree.toLowerCase().includes('computer')) score += 0.2
      if (edu.honors && edu.honors.length > 0) score += 0.1
    }

    return Math.min(score, 1.0)
  }

  private async calculateDetailedScores(profile: DynamicProfile, jobRequirements: JobRequirements): Promise<DetailedScores> {
    return {
      skillRelevance: this.scoreSkillMatch(profile.skills, jobRequirements.requiredSkills),
      skillProficiency: this.scoreSkillProficiency(profile.skills, jobRequirements),
      experienceRelevance: this.scoreExperienceRelevance(profile.experiences, jobRequirements),
      experienceDepth: this.scoreExperienceDepth(profile.experiences),
      communicationClarity: profile.communicationStyle.clarity,
      communicationEnthusiasm: profile.communicationStyle.enthusiasm,
      responseCompleteness: this.scoreResponseCompleteness(profile),
      consistencyScore: this.scoreConsistency(profile),
      learningAgility: profile.behavioralTraits.learningAgility,
      problemSolving: profile.behavioralTraits.problemSolving,
      leadership: profile.behavioralTraits.leadership,
      teamwork: profile.behavioralTraits.teamwork
    }
  }

  private scoreResponseCompleteness(profile: DynamicProfile): number {
    // Score based on profile completeness and depth of responses
    const baseCompleteness = profile.profileCompleteness
    
    // Adjust based on depth indicators
    let depthMultiplier = 1.0
    
    const avgSkillMentions = profile.skills.length > 0 
      ? profile.skills.reduce((sum, s) => sum + s.mentionCount, 0) / profile.skills.length 
      : 0
    
    if (avgSkillMentions > 2) depthMultiplier += 0.1
    if (profile.achievements.length > 2) depthMultiplier += 0.1
    if (profile.projects.length > 1) depthMultiplier += 0.1

    return Math.min(baseCompleteness * depthMultiplier, 1.0)
  }

  private scoreConsistency(profile: DynamicProfile): number {
    let consistencyScore = 1.0

    // Check for flags that indicate inconsistencies
    const inconsistencyFlags = profile.flags.filter(f => f.type === 'inconsistency')
    
    for (const flag of inconsistencyFlags) {
      switch (flag.severity) {
        case 'high':
          consistencyScore -= 0.3
          break
        case 'medium':
          consistencyScore -= 0.2
          break
        case 'low':
          consistencyScore -= 0.1
          break
      }
    }

    return Math.max(consistencyScore, 0)
  }

  private calculateOverallScore(categoryScores: CategoryScores, weights: ScoringWeights): number {
    return (
      categoryScores.technical * weights.technical +
      categoryScores.communication * weights.communication +
      categoryScores.experience * weights.experience +
      categoryScores.cultural * weights.cultural +
      categoryScores.behavioral * weights.behavioral +
      categoryScores.education * weights.education
    )
  }

  private generateRecommendations(
    profile: DynamicProfile,
    categoryScores: CategoryScores,
    detailedScores: DetailedScores,
    jobRequirements: JobRequirements
  ): ScoreRecommendation[] {
    const recommendations: ScoreRecommendation[] = []

    // Technical recommendations
    if (categoryScores.technical < 0.7) {
      recommendations.push({
        type: 'improvement',
        category: 'Technical',
        description: 'Technical skills alignment could be stronger',
        impact: 'high',
        actionable: true,
        suggestion: 'Focus on specific technical skills matching job requirements'
      })
    }

    // Communication recommendations
    if (categoryScores.communication < 0.6) {
      recommendations.push({
        type: 'concern',
        category: 'Communication',
        description: 'Communication skills need improvement',
        impact: 'medium',
        actionable: true,
        suggestion: 'Provide more structured and detailed responses'
      })
    }

    // Experience recommendations
    if (categoryScores.experience < 0.5) {
      recommendations.push({
        type: 'concern',
        category: 'Experience',
        description: 'Experience level may not meet requirements',
        impact: 'high',
        actionable: false,
        suggestion: 'Consider for junior positions or with additional training'
      })
    }

    // Strengths
    if (categoryScores.technical > 0.8) {
      recommendations.push({
        type: 'strength',
        category: 'Technical',
        description: 'Strong technical skills alignment',
        impact: 'high',
        actionable: false
      })
    }

    if (detailedScores.leadership > 0.8) {
      recommendations.push({
        type: 'strength',
        category: 'Leadership',
        description: 'Demonstrates strong leadership potential',
        impact: 'medium',
        actionable: false
      })
    }

    // Verification needs
    const expertSkills = profile.skills.filter(s => s.proficiencyLevel === ProficiencyLevel.EXPERT)
    if (expertSkills.length > 0 && profile.confidence < 0.8) {
      recommendations.push({
        type: 'verification',
        category: 'Technical',
        description: 'Expert-level skills need technical verification',
        impact: 'medium',
        actionable: true,
        suggestion: 'Conduct technical assessment or coding interview'
      })
    }

    return recommendations.slice(0, 8) // Limit recommendations
  }

  private identifyStrengthsAndWeaknesses(
    categoryScores: CategoryScores,
    detailedScores: DetailedScores
  ): { strengths: string[]; weaknesses: string[] } {
    const strengths: string[] = []
    const weaknesses: string[] = []

    // Category-based analysis
    Object.entries(categoryScores).forEach(([category, score]) => {
      if (score > 0.8) {
        strengths.push(`Excellent ${category} capabilities`)
      } else if (score < 0.5) {
        weaknesses.push(`Needs improvement in ${category}`)
      }
    })

    // Detailed analysis
    if (detailedScores.skillRelevance > 0.8) {
      strengths.push('Skills highly relevant to role')
    }
    if (detailedScores.communicationClarity > 0.8) {
      strengths.push('Clear and articulate communication')
    }
    if (detailedScores.problemSolving > 0.8) {
      strengths.push('Strong problem-solving abilities')
    }

    if (detailedScores.responseCompleteness < 0.6) {
      weaknesses.push('Responses could be more comprehensive')
    }
    if (detailedScores.consistencyScore < 0.7) {
      weaknesses.push('Some inconsistencies in responses')
    }

    return {
      strengths: strengths.slice(0, 5),
      weaknesses: weaknesses.slice(0, 5)
    }
  }

  private calculateScoringConfidence(profile: DynamicProfile, jobRequirements: JobRequirements): number {
    let confidence = profile.confidence

    // Adjust based on data completeness
    confidence *= profile.profileCompleteness

    // Adjust based on response quality
    const avgCommunicationScore = (
      profile.communicationStyle.clarity +
      profile.communicationStyle.articulation +
      profile.communicationStyle.structure
    ) / 3
    confidence *= (0.5 + avgCommunicationScore * 0.5)

    // Penalize for flags
    const seriousFlags = profile.flags.filter(f => 
      f.type === 'red_flag' || (f.type === 'inconsistency' && f.severity === 'high')
    )
    confidence *= Math.max(0.3, 1 - (seriousFlags.length * 0.2))

    return Math.min(confidence, 1.0)
  }

  private identifyConfidenceFactors(profile: DynamicProfile): string[] {
    const factors: string[] = []

    if (profile.profileCompleteness > 0.8) {
      factors.push('Comprehensive profile data')
    } else {
      factors.push('Limited profile information')
    }

    if (profile.skills.length > 5) {
      factors.push('Diverse skill set mentioned')
    } else {
      factors.push('Limited skill information')
    }

    if (profile.experiences.length > 2) {
      factors.push('Multiple work experiences')
    } else {
      factors.push('Limited work history')
    }

    const highConfidenceItems = [
      ...profile.skills.filter(s => s.confidence > 0.8),
      ...profile.experiences.filter(e => e.confidence > 0.8)
    ]

    if (highConfidenceItems.length > 3) {
      factors.push('High confidence in extracted data')
    } else {
      factors.push('Some uncertainty in data extraction')
    }

    return factors
  }

  // Utility methods for scoring configuration
  createJobRequirements(
    skills: string[],
    level: ProficiencyLevel,
    years: number,
    options: Partial<JobRequirements> = {}
  ): JobRequirements {
    const requiredSkills: RequiredSkill[] = skills.map(skill => ({
      name: skill,
      category: SkillCategory.PROGRAMMING_LANGUAGE, // Default - should be inferred
      proficiencyLevel: level,
      importance: 'important',
      weight: 1.0
    }))

    return {
      requiredSkills,
      experienceLevel: level,
      minimumYears: years,
      preferredSkills: [],
      communicationLevel: 0.7,
      leadershipRequired: false,
      teamworkImportance: 0.7,
      culturalValues: ['teamwork', 'innovation'],
      workStyle: 'mixed',
      ...options
    }
  }

  adjustWeightsForRole(roleType: 'technical' | 'leadership' | 'communication' | 'balanced'): ScoringWeights {
    switch (roleType) {
      case 'technical':
        return {
          technical: 0.50,
          communication: 0.15,
          experience: 0.20,
          cultural: 0.05,
          behavioral: 0.05,
          education: 0.05
        }
      case 'leadership':
        return {
          technical: 0.25,
          communication: 0.25,
          experience: 0.25,
          cultural: 0.10,
          behavioral: 0.15,
          education: 0.00
        }
      case 'communication':
        return {
          technical: 0.20,
          communication: 0.40,
          experience: 0.15,
          cultural: 0.15,
          behavioral: 0.10,
          education: 0.00
        }
      default:
        return this.defaultWeights
    }
  }

  generateScoreReport(result: ScoringResult): string {
    const report = `
CANDIDATE SCORING REPORT
========================

Overall Score: ${(result.overallScore * 100).toFixed(1)}%
Confidence: ${(result.confidence * 100).toFixed(1)}%

CATEGORY BREAKDOWN:
- Technical: ${(result.categoryScores.technical * 100).toFixed(1)}%
- Communication: ${(result.categoryScores.communication * 100).toFixed(1)}%
- Experience: ${(result.categoryScores.experience * 100).toFixed(1)}%
- Cultural Fit: ${(result.categoryScores.cultural * 100).toFixed(1)}%
- Behavioral: ${(result.categoryScores.behavioral * 100).toFixed(1)}%
- Education: ${(result.categoryScores.education * 100).toFixed(1)}%

STRENGTHS:
${result.strengths.map(s => `- ${s}`).join('\n')}

AREAS FOR IMPROVEMENT:
${result.weaknesses.map(w => `- ${w}`).join('\n')}

RECOMMENDATIONS:
${result.recommendations.map(r => `- ${r.description}`).join('\n')}

CONFIDENCE FACTORS:
${result.metadata.confidenceFactors.map(f => `- ${f}`).join('\n')}
    `

    return report
  }
}

// Singleton instance
export const candidateScorer = new CandidateScoringEngine()