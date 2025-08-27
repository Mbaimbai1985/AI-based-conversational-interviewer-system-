import { InterviewPhase } from './conversationFlow'

export interface QuestionTemplate {
  id: string
  phase: InterviewPhase
  category: QuestionCategory
  question: string
  followUps: string[]
  expectedDuration: number // in minutes
  difficulty: DifficultyLevel
  skills: string[] // Skills this question evaluates
  tags: string[]
  variations: string[] // Alternative phrasings
  context?: string // When to use this question
  prerequisites?: string[] // Required previous questions/answers
}

export interface QuestionSet {
  roleId: string
  roleName: string
  level: ExperienceLevel
  questions: QuestionTemplate[]
  requiredQuestions: string[] // Question IDs that must be asked
  optionalQuestions: string[] // Question IDs that are nice to have
  totalEstimatedTime: number
}

export enum QuestionCategory {
  INTRODUCTION = 'introduction',
  BACKGROUND = 'background',
  TECHNICAL_SKILLS = 'technical_skills',
  PROBLEM_SOLVING = 'problem_solving',
  BEHAVIORAL = 'behavioral',
  SITUATIONAL = 'situational',
  LEADERSHIP = 'leadership',
  COMMUNICATION = 'communication',
  CULTURE_FIT = 'culture_fit',
  MOTIVATION = 'motivation',
  GOALS = 'goals',
  CHALLENGES = 'challenges',
  CLOSING = 'closing'
}

export enum DifficultyLevel {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  EXPERT = 'expert'
}

export enum ExperienceLevel {
  ENTRY = 'entry',
  MID = 'mid',
  SENIOR = 'senior',
  LEAD = 'lead',
  EXECUTIVE = 'executive'
}

export class QuestionTemplateManager {
  private templates: Map<string, QuestionTemplate> = new Map()
  private questionSets: Map<string, QuestionSet> = new Map()

  constructor() {
    this.initializeDefaultTemplates()
    this.initializeDefaultQuestionSets()
  }

  private initializeDefaultTemplates(): void {
    const defaultTemplates: QuestionTemplate[] = [
      // Introduction Questions
      {
        id: 'intro_001',
        phase: InterviewPhase.INTRODUCTION,
        category: QuestionCategory.INTRODUCTION,
        question: "Tell me about yourself and your background.",
        followUps: [
          "What initially drew you to this field?",
          "What aspects of your background are you most proud of?"
        ],
        expectedDuration: 3,
        difficulty: DifficultyLevel.EASY,
        skills: ['communication', 'self-awareness'],
        tags: ['opener', 'general'],
        variations: [
          "Can you walk me through your professional journey?",
          "Give me an overview of your career path so far."
        ],
        context: "Opening question to break the ice and get basic background"
      },

      {
        id: 'intro_002',
        phase: InterviewPhase.INTRODUCTION,
        category: QuestionCategory.MOTIVATION,
        question: "What interests you about this role and our company?",
        followUps: [
          "What specific aspects of the role excite you most?",
          "How does this position align with your career goals?"
        ],
        expectedDuration: 2,
        difficulty: DifficultyLevel.EASY,
        skills: ['research', 'motivation', 'communication'],
        tags: ['motivation', 'company-specific'],
        variations: [
          "Why are you interested in joining our team?",
          "What attracted you to apply for this position?"
        ]
      },

      // Background Questions
      {
        id: 'bg_001',
        phase: InterviewPhase.BACKGROUND,
        category: QuestionCategory.BACKGROUND,
        question: "Describe your current role and main responsibilities.",
        followUps: [
          "What do you enjoy most about your current position?",
          "What challenges do you face in your current role?",
          "How has your role evolved since you started?"
        ],
        expectedDuration: 4,
        difficulty: DifficultyLevel.EASY,
        skills: ['experience', 'communication', 'self-reflection'],
        tags: ['current-role', 'responsibilities'],
        variations: [
          "Walk me through a typical day in your current job.",
          "What are your key responsibilities in your current position?"
        ]
      },

      {
        id: 'bg_002',
        phase: InterviewPhase.BACKGROUND,
        category: QuestionCategory.TECHNICAL_SKILLS,
        question: "What technologies and tools do you work with regularly?",
        followUps: [
          "Which technology are you most proficient in?",
          "What new technologies are you currently learning?",
          "How do you stay updated with technological changes?"
        ],
        expectedDuration: 3,
        difficulty: DifficultyLevel.EASY,
        skills: ['technical-knowledge', 'continuous-learning'],
        tags: ['technology', 'skills'],
        variations: [
          "Tell me about your technical stack.",
          "What programming languages and frameworks do you use?"
        ]
      },

      // Technical Questions
      {
        id: 'tech_001',
        phase: InterviewPhase.TECHNICAL,
        category: QuestionCategory.PROBLEM_SOLVING,
        question: "Describe a challenging technical problem you solved recently.",
        followUps: [
          "What made this problem particularly challenging?",
          "What was your thought process for solving it?",
          "What would you do differently if you faced a similar problem again?"
        ],
        expectedDuration: 5,
        difficulty: DifficultyLevel.MEDIUM,
        skills: ['problem-solving', 'analytical-thinking', 'technical-skills'],
        tags: ['problem-solving', 'technical'],
        variations: [
          "Tell me about a complex technical issue you've had to debug.",
          "Describe a time when you had to solve a difficult technical challenge."
        ]
      },

      {
        id: 'tech_002',
        phase: InterviewPhase.TECHNICAL,
        category: QuestionCategory.TECHNICAL_SKILLS,
        question: "How do you approach learning a new technology or framework?",
        followUps: [
          "Can you give me an example of when you had to quickly learn something new?",
          "What resources do you typically use for learning?",
          "How do you determine if a new technology is worth investing time in?"
        ],
        expectedDuration: 3,
        difficulty: DifficultyLevel.MEDIUM,
        skills: ['learning-agility', 'adaptation', 'self-direction'],
        tags: ['learning', 'adaptation'],
        variations: [
          "Describe your process for getting up to speed with new tools.",
          "How do you stay current with emerging technologies?"
        ]
      },

      // Behavioral Questions
      {
        id: 'beh_001',
        phase: InterviewPhase.BEHAVIORAL,
        category: QuestionCategory.BEHAVIORAL,
        question: "Tell me about a time you had to work with a difficult team member.",
        followUps: [
          "What made this person difficult to work with?",
          "How did you handle the situation?",
          "What was the outcome?",
          "What did you learn from this experience?"
        ],
        expectedDuration: 4,
        difficulty: DifficultyLevel.MEDIUM,
        skills: ['teamwork', 'conflict-resolution', 'communication'],
        tags: ['teamwork', 'conflict', 'STAR'],
        variations: [
          "Describe a challenging interpersonal situation you've navigated at work.",
          "Tell me about a time you disagreed with a colleague."
        ]
      },

      {
        id: 'beh_002',
        phase: InterviewPhase.BEHAVIORAL,
        category: QuestionCategory.LEADERSHIP,
        question: "Describe a time when you had to lead a project or initiative.",
        followUps: [
          "What was your approach to leading the team?",
          "What challenges did you face as a leader?",
          "How did you measure success?",
          "What would you do differently?"
        ],
        expectedDuration: 5,
        difficulty: DifficultyLevel.MEDIUM,
        skills: ['leadership', 'project-management', 'decision-making'],
        tags: ['leadership', 'project-management', 'STAR'],
        variations: [
          "Tell me about a time you took initiative on a project.",
          "Describe your experience leading a team through a challenging situation."
        ]
      },

      // Situational Questions
      {
        id: 'sit_001',
        phase: InterviewPhase.SITUATIONAL,
        category: QuestionCategory.SITUATIONAL,
        question: "How would you handle a situation where you're given a task with an unrealistic deadline?",
        followUps: [
          "What factors would you consider in this situation?",
          "How would you communicate with stakeholders?",
          "What if your manager insisted the deadline was non-negotiable?"
        ],
        expectedDuration: 3,
        difficulty: DifficultyLevel.MEDIUM,
        skills: ['time-management', 'communication', 'prioritization'],
        tags: ['pressure', 'communication', 'prioritization'],
        variations: [
          "What would you do if you realized you couldn't meet a committed deadline?",
          "How do you handle competing priorities with tight deadlines?"
        ]
      },

      {
        id: 'sit_002',
        phase: InterviewPhase.SITUATIONAL,
        category: QuestionCategory.PROBLEM_SOLVING,
        question: "If you discovered a significant security vulnerability in our system, what would be your approach?",
        followUps: [
          "Who would you notify first?",
          "How would you assess the severity?",
          "What steps would you take to mitigate the risk?"
        ],
        expectedDuration: 4,
        difficulty: DifficultyLevel.HARD,
        skills: ['security-awareness', 'decision-making', 'communication'],
        tags: ['security', 'critical-thinking', 'escalation'],
        variations: [
          "How would you handle discovering a critical bug in production?",
          "What's your approach to handling emergency technical issues?"
        ]
      },

      // Culture Fit Questions
      {
        id: 'cul_001',
        phase: InterviewPhase.COMPANY_FIT,
        category: QuestionCategory.CULTURE_FIT,
        question: "What type of work environment brings out your best performance?",
        followUps: [
          "How do you prefer to receive feedback?",
          "What role does collaboration play in your ideal workplace?",
          "How do you handle ambiguity in your work?"
        ],
        expectedDuration: 3,
        difficulty: DifficultyLevel.EASY,
        skills: ['self-awareness', 'cultural-fit', 'communication'],
        tags: ['culture', 'work-style', 'preferences'],
        variations: [
          "Describe your ideal work environment.",
          "What kind of team dynamic do you thrive in?"
        ]
      },

      // Closing Questions
      {
        id: 'close_001',
        phase: InterviewPhase.QUESTIONS,
        category: QuestionCategory.CLOSING,
        question: "Do you have any questions about the role, team, or company?",
        followUps: [
          "Is there anything specific about our culture you'd like to know?",
          "What concerns, if any, do you have about this position?"
        ],
        expectedDuration: 5,
        difficulty: DifficultyLevel.EASY,
        skills: ['curiosity', 'preparation', 'communication'],
        tags: ['questions', 'engagement', 'closing'],
        variations: [
          "What questions do you have for me?",
          "Is there anything else you'd like to know about working here?"
        ]
      }
    ]

    defaultTemplates.forEach(template => {
      this.templates.set(template.id, template)
    })
  }

  private initializeDefaultQuestionSets(): void {
    // Software Engineer Question Sets
    const softwareEngineerEntry: QuestionSet = {
      roleId: 'swe_entry',
      roleName: 'Software Engineer (Entry Level)',
      level: ExperienceLevel.ENTRY,
      questions: this.getQuestionsByIds([
        'intro_001', 'intro_002', 'bg_001', 'bg_002', 'tech_002', 'beh_001', 'sit_001', 'cul_001', 'close_001'
      ]),
      requiredQuestions: ['intro_001', 'bg_002', 'tech_002', 'close_001'],
      optionalQuestions: ['beh_001', 'sit_001', 'cul_001'],
      totalEstimatedTime: 30
    }

    const softwareEngineerMid: QuestionSet = {
      roleId: 'swe_mid',
      roleName: 'Software Engineer (Mid Level)',
      level: ExperienceLevel.MID,
      questions: this.getQuestionsByIds([
        'intro_001', 'intro_002', 'bg_001', 'bg_002', 'tech_001', 'tech_002', 'beh_001', 'beh_002', 'sit_001', 'sit_002', 'cul_001', 'close_001'
      ]),
      requiredQuestions: ['intro_001', 'bg_001', 'tech_001', 'beh_001', 'close_001'],
      optionalQuestions: ['beh_002', 'sit_002', 'cul_001'],
      totalEstimatedTime: 45
    }

    const softwareEngineerSenior: QuestionSet = {
      roleId: 'swe_senior',
      roleName: 'Software Engineer (Senior)',
      level: ExperienceLevel.SENIOR,
      questions: this.getQuestionsByIds([
        'intro_001', 'intro_002', 'bg_001', 'bg_002', 'tech_001', 'tech_002', 'beh_001', 'beh_002', 'sit_001', 'sit_002', 'cul_001', 'close_001'
      ]),
      requiredQuestions: ['intro_001', 'bg_001', 'tech_001', 'beh_002', 'sit_002', 'close_001'],
      optionalQuestions: ['tech_002', 'beh_001', 'cul_001'],
      totalEstimatedTime: 60
    }

    this.questionSets.set('swe_entry', softwareEngineerEntry)
    this.questionSets.set('swe_mid', softwareEngineerMid)
    this.questionSets.set('swe_senior', softwareEngineerSenior)
  }

  private getQuestionsByIds(ids: string[]): QuestionTemplate[] {
    return ids.map(id => this.templates.get(id)).filter(q => q !== undefined) as QuestionTemplate[]
  }

  // Public methods
  getTemplate(id: string): QuestionTemplate | undefined {
    return this.templates.get(id)
  }

  getTemplatesByPhase(phase: InterviewPhase): QuestionTemplate[] {
    return Array.from(this.templates.values()).filter(t => t.phase === phase)
  }

  getTemplatesByCategory(category: QuestionCategory): QuestionTemplate[] {
    return Array.from(this.templates.values()).filter(t => t.category === category)
  }

  getTemplatesByDifficulty(difficulty: DifficultyLevel): QuestionTemplate[] {
    return Array.from(this.templates.values()).filter(t => t.difficulty === difficulty)
  }

  getTemplatesBySkill(skill: string): QuestionTemplate[] {
    return Array.from(this.templates.values()).filter(t => t.skills.includes(skill))
  }

  getQuestionSet(roleId: string): QuestionSet | undefined {
    return this.questionSets.get(roleId)
  }

  getAllQuestionSets(): QuestionSet[] {
    return Array.from(this.questionSets.values())
  }

  // Add custom templates
  addTemplate(template: QuestionTemplate): void {
    this.templates.set(template.id, template)
  }

  addQuestionSet(questionSet: QuestionSet): void {
    this.questionSets.set(questionSet.roleId, questionSet)
  }

  // Search and filter methods
  searchTemplates(query: string): QuestionTemplate[] {
    const lowerQuery = query.toLowerCase()
    return Array.from(this.templates.values()).filter(template =>
      template.question.toLowerCase().includes(lowerQuery) ||
      template.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      template.skills.some(skill => skill.toLowerCase().includes(lowerQuery))
    )
  }

  getFilteredTemplates(filters: {
    phase?: InterviewPhase
    category?: QuestionCategory
    difficulty?: DifficultyLevel
    skills?: string[]
    tags?: string[]
  }): QuestionTemplate[] {
    return Array.from(this.templates.values()).filter(template => {
      if (filters.phase && template.phase !== filters.phase) return false
      if (filters.category && template.category !== filters.category) return false
      if (filters.difficulty && template.difficulty !== filters.difficulty) return false
      if (filters.skills && !filters.skills.some(skill => template.skills.includes(skill))) return false
      if (filters.tags && !filters.tags.some(tag => template.tags.includes(tag))) return false
      return true
    })
  }

  // Question variation and personalization
  getQuestionVariation(templateId: string, variationIndex?: number): string {
    const template = this.templates.get(templateId)
    if (!template) return ''

    if (variationIndex !== undefined && template.variations[variationIndex]) {
      return template.variations[variationIndex]
    }

    // Return random variation or original question
    if (template.variations.length > 0) {
      const randomIndex = Math.floor(Math.random() * (template.variations.length + 1))
      return randomIndex === template.variations.length ? template.question : template.variations[randomIndex]
    }

    return template.question
  }

  getPersonalizedQuestion(templateId: string, context: {
    candidateName?: string
    companyName?: string
    roleName?: string
    previousAnswers?: { [questionId: string]: string }
  }): string {
    const template = this.templates.get(templateId)
    if (!template) return ''

    let question = this.getQuestionVariation(templateId)

    // Simple personalization - could be enhanced with more sophisticated templating
    if (context.candidateName) {
      question = question.replace(/\byou\b/g, context.candidateName)
    }
    if (context.companyName) {
      question = question.replace(/our company/g, context.companyName)
    }
    if (context.roleName) {
      question = question.replace(/this role/g, `the ${context.roleName} role`)
    }

    return question
  }

  // Adaptive questioning based on previous answers
  getAdaptiveFollowUp(templateId: string, candidateResponse: string): string[] {
    const template = this.templates.get(templateId)
    if (!template) return []

    let followUps = [...template.followUps]

    // Add adaptive follow-ups based on response content
    const lowerResponse = candidateResponse.toLowerCase()

    if (template.category === QuestionCategory.TECHNICAL_SKILLS) {
      if (lowerResponse.includes('javascript') || lowerResponse.includes('react')) {
        followUps.push("What's your experience with modern JavaScript frameworks?")
      }
      if (lowerResponse.includes('python') || lowerResponse.includes('django')) {
        followUps.push("How do you handle Python application deployment?")
      }
    }

    if (template.category === QuestionCategory.BEHAVIORAL) {
      if (lowerResponse.includes('conflict') || lowerResponse.includes('disagree')) {
        followUps.push("How do you typically approach resolving conflicts?")
      }
      if (lowerResponse.includes('success') || lowerResponse.includes('achieved')) {
        followUps.push("What metrics did you use to measure that success?")
      }
    }

    return followUps.slice(0, 3) // Limit to 3 follow-ups
  }

  // Question timing and flow management
  estimateInterviewDuration(questionSet: QuestionSet): number {
    return questionSet.questions.reduce((total, q) => total + q.expectedDuration, 0)
  }

  getQuestionsByTimeAllocation(
    questionSet: QuestionSet, 
    targetDuration: number
  ): QuestionTemplate[] {
    // Prioritize required questions first
    const required = questionSet.questions.filter(q => 
      questionSet.requiredQuestions.includes(q.id)
    )
    
    let totalTime = required.reduce((sum, q) => sum + q.expectedDuration, 0)
    const selected = [...required]

    // Add optional questions if time permits
    const optional = questionSet.questions.filter(q => 
      questionSet.optionalQuestions.includes(q.id)
    ).sort((a, b) => a.expectedDuration - b.expectedDuration) // Start with shorter questions

    for (const question of optional) {
      if (totalTime + question.expectedDuration <= targetDuration) {
        selected.push(question)
        totalTime += question.expectedDuration
      }
    }

    return selected
  }
}

// Singleton instance
export const questionTemplateManager = new QuestionTemplateManager()