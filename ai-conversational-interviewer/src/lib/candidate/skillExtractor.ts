import { generateAIResponse, ExtractedEntity } from '../ai/openai'
import { SkillCategory, ProficiencyLevel, SkillProfile } from './profileBuilder'

export interface SkillExtractionResult {
  skills: ExtractedSkill[]
  confidence: number
  suggestions: SkillSuggestion[]
  missingCategories: SkillCategory[]
}

export interface ExtractedSkill {
  name: string
  category: SkillCategory
  proficiencyLevel: ProficiencyLevel
  confidence: number
  context: string
  aliases: string[]
  relatedSkills: string[]
  yearsExperience?: number
  lastUsed?: string
  certifications?: string[]
  frameworks?: string[]
  tools?: string[]
}

export interface SkillSuggestion {
  skill: string
  reason: string
  confidence: number
  category: SkillCategory
}

export interface SkillTaxonomy {
  category: SkillCategory
  skills: SkillDefinition[]
}

export interface SkillDefinition {
  name: string
  aliases: string[]
  relatedSkills: string[]
  category: SkillCategory
  subcategory?: string
  frameworks?: string[]
  tools?: string[]
  certifications?: string[]
  proficiencyIndicators: {
    beginner: string[]
    intermediate: string[]
    advanced: string[]
    expert: string[]
  }
}

export class SkillExtractionEngine {
  private skillTaxonomy: Map<string, SkillDefinition> = new Map()
  private categoryKeywords: Map<SkillCategory, string[]> = new Map()

  constructor() {
    this.initializeSkillTaxonomy()
    this.initializeCategoryKeywords()
  }

  private initializeSkillTaxonomy(): void {
    const skillDefinitions: SkillDefinition[] = [
      // Programming Languages
      {
        name: 'JavaScript',
        aliases: ['js', 'javascript', 'ecmascript', 'es6', 'es2015', 'node.js', 'nodejs'],
        relatedSkills: ['TypeScript', 'React', 'Vue', 'Angular', 'Node.js'],
        category: SkillCategory.PROGRAMMING_LANGUAGE,
        frameworks: ['React', 'Vue', 'Angular', 'Express', 'Next.js'],
        tools: ['Node.js', 'npm', 'webpack', 'babel'],
        certifications: ['JavaScript Institute Certification'],
        proficiencyIndicators: {
          beginner: ['basic syntax', 'variables', 'functions', 'loops'],
          intermediate: ['closures', 'promises', 'async/await', 'DOM manipulation'],
          advanced: ['prototypes', 'webpack', 'advanced patterns', 'performance optimization'],
          expert: ['v8 internals', 'custom frameworks', 'compiler optimization', 'architectural decisions']
        }
      },
      {
        name: 'Python',
        aliases: ['python', 'py', 'python3', 'python2'],
        relatedSkills: ['Django', 'Flask', 'FastAPI', 'NumPy', 'Pandas'],
        category: SkillCategory.PROGRAMMING_LANGUAGE,
        frameworks: ['Django', 'Flask', 'FastAPI', 'Pyramid'],
        tools: ['pip', 'conda', 'poetry', 'pytest'],
        certifications: ['Python Institute PCEP', 'Python Institute PCAP'],
        proficiencyIndicators: {
          beginner: ['basic syntax', 'variables', 'functions', 'data types'],
          intermediate: ['classes', 'modules', 'file handling', 'error handling'],
          advanced: ['decorators', 'metaclasses', 'async programming', 'performance tuning'],
          expert: ['CPython internals', 'custom C extensions', 'framework development']
        }
      },
      {
        name: 'TypeScript',
        aliases: ['typescript', 'ts'],
        relatedSkills: ['JavaScript', 'React', 'Angular', 'Node.js'],
        category: SkillCategory.PROGRAMMING_LANGUAGE,
        frameworks: ['Angular', 'React', 'Vue'],
        tools: ['tsc', 'ts-node', 'webpack'],
        proficiencyIndicators: {
          beginner: ['basic types', 'interfaces', 'type annotations'],
          intermediate: ['generics', 'utility types', 'modules'],
          advanced: ['advanced types', 'conditional types', 'template literals'],
          expert: ['compiler API', 'custom transformers', 'type system design']
        }
      },

      // Frontend Frameworks
      {
        name: 'React',
        aliases: ['react', 'reactjs', 'react.js'],
        relatedSkills: ['JavaScript', 'TypeScript', 'Redux', 'Next.js', 'JSX'],
        category: SkillCategory.FRAMEWORK,
        subcategory: 'frontend',
        frameworks: ['Next.js', 'Gatsby'],
        tools: ['Create React App', 'React DevTools', 'Storybook'],
        certifications: ['Meta React Developer'],
        proficiencyIndicators: {
          beginner: ['components', 'props', 'state', 'jsx'],
          intermediate: ['hooks', 'context', 'lifecycle', 'event handling'],
          advanced: ['performance optimization', 'custom hooks', 'patterns', 'testing'],
          expert: ['internals', 'fiber architecture', 'library development']
        }
      },
      {
        name: 'Angular',
        aliases: ['angular', 'angularjs', 'angular2+'],
        relatedSkills: ['TypeScript', 'RxJS', 'NgRx'],
        category: SkillCategory.FRAMEWORK,
        subcategory: 'frontend',
        tools: ['Angular CLI', 'Angular DevTools'],
        proficiencyIndicators: {
          beginner: ['components', 'templates', 'directives', 'services'],
          intermediate: ['routing', 'forms', 'http client', 'dependency injection'],
          advanced: ['observables', 'custom directives', 'pipes', 'guards'],
          expert: ['custom schematics', 'library development', 'performance optimization']
        }
      },
      {
        name: 'Vue',
        aliases: ['vue', 'vuejs', 'vue.js'],
        relatedSkills: ['JavaScript', 'TypeScript', 'Vuex', 'Nuxt.js'],
        category: SkillCategory.FRAMEWORK,
        subcategory: 'frontend',
        frameworks: ['Nuxt.js'],
        tools: ['Vue CLI', 'Vue DevTools'],
        proficiencyIndicators: {
          beginner: ['templates', 'data binding', 'events', 'computed properties'],
          intermediate: ['components', 'props', 'slots', 'lifecycle hooks'],
          advanced: ['composition API', 'custom directives', 'mixins', 'plugins'],
          expert: ['reactivity system', 'compiler optimization', 'framework contribution']
        }
      },

      // Backend Frameworks
      {
        name: 'Node.js',
        aliases: ['node', 'nodejs', 'node.js'],
        relatedSkills: ['JavaScript', 'Express', 'npm'],
        category: SkillCategory.FRAMEWORK,
        subcategory: 'backend',
        frameworks: ['Express', 'Koa', 'Fastify'],
        tools: ['npm', 'yarn', 'pm2'],
        proficiencyIndicators: {
          beginner: ['basic server', 'modules', 'npm packages'],
          intermediate: ['express framework', 'middleware', 'async programming'],
          advanced: ['streams', 'clusters', 'performance tuning', 'security'],
          expert: ['v8 optimization', 'native addons', 'custom runtime']
        }
      },
      {
        name: 'Django',
        aliases: ['django'],
        relatedSkills: ['Python', 'Django REST Framework', 'PostgreSQL'],
        category: SkillCategory.FRAMEWORK,
        subcategory: 'backend',
        tools: ['Django Admin', 'django-admin'],
        proficiencyIndicators: {
          beginner: ['models', 'views', 'templates', 'urls'],
          intermediate: ['forms', 'authentication', 'middleware', 'admin'],
          advanced: ['custom fields', 'signals', 'caching', 'testing'],
          expert: ['framework internals', 'custom backends', 'performance optimization']
        }
      },

      // Databases
      {
        name: 'PostgreSQL',
        aliases: ['postgres', 'postgresql', 'psql'],
        relatedSkills: ['SQL', 'database design', 'performance tuning'],
        category: SkillCategory.DATABASE,
        tools: ['pgAdmin', 'psql', 'pg_dump'],
        proficiencyIndicators: {
          beginner: ['basic queries', 'tables', 'relationships'],
          intermediate: ['indexes', 'transactions', 'stored procedures'],
          advanced: ['query optimization', 'partitioning', 'replication'],
          expert: ['internals', 'custom extensions', 'performance tuning']
        }
      },
      {
        name: 'MongoDB',
        aliases: ['mongo', 'mongodb'],
        relatedSkills: ['NoSQL', 'Mongoose', 'database design'],
        category: SkillCategory.DATABASE,
        tools: ['MongoDB Compass', 'mongosh'],
        proficiencyIndicators: {
          beginner: ['documents', 'collections', 'basic queries'],
          intermediate: ['aggregation', 'indexing', 'relationships'],
          advanced: ['sharding', 'replication', 'performance tuning'],
          expert: ['cluster management', 'custom operators', 'internals']
        }
      },

      // Cloud Platforms
      {
        name: 'AWS',
        aliases: ['amazon web services', 'aws'],
        relatedSkills: ['cloud computing', 'DevOps', 'Docker', 'Kubernetes'],
        category: SkillCategory.CLOUD,
        tools: ['AWS CLI', 'CloudFormation', 'Terraform'],
        certifications: ['AWS Solutions Architect', 'AWS Developer', 'AWS DevOps Engineer'],
        proficiencyIndicators: {
          beginner: ['EC2', 'S3', 'basic services'],
          intermediate: ['Lambda', 'RDS', 'CloudFormation', 'IAM'],
          advanced: ['VPC', 'auto scaling', 'load balancing', 'monitoring'],
          expert: ['well-architected framework', 'cost optimization', 'security best practices']
        }
      },

      // DevOps Tools
      {
        name: 'Docker',
        aliases: ['docker', 'containerization'],
        relatedSkills: ['Kubernetes', 'DevOps', 'microservices'],
        category: SkillCategory.DEVOPS,
        tools: ['Docker Compose', 'Docker Desktop'],
        proficiencyIndicators: {
          beginner: ['containers', 'images', 'dockerfile'],
          intermediate: ['docker-compose', 'networking', 'volumes'],
          advanced: ['multi-stage builds', 'optimization', 'security'],
          expert: ['internals', 'custom runtime', 'enterprise deployment']
        }
      },
      {
        name: 'Kubernetes',
        aliases: ['k8s', 'kubernetes'],
        relatedSkills: ['Docker', 'DevOps', 'microservices', 'cloud'],
        category: SkillCategory.DEVOPS,
        tools: ['kubectl', 'Helm', 'Istio'],
        certifications: ['CKA', 'CKAD', 'CKS'],
        proficiencyIndicators: {
          beginner: ['pods', 'services', 'deployments'],
          intermediate: ['configmaps', 'secrets', 'ingress', 'volumes'],
          advanced: ['operators', 'custom resources', 'networking', 'security'],
          expert: ['cluster administration', 'performance tuning', 'troubleshooting']
        }
      },

      // Soft Skills
      {
        name: 'Leadership',
        aliases: ['leadership', 'team lead', 'management', 'leading teams'],
        relatedSkills: ['Communication', 'Project Management', 'Mentoring'],
        category: SkillCategory.SOFT_SKILL,
        proficiencyIndicators: {
          beginner: ['basic delegation', 'team meetings'],
          intermediate: ['project leadership', 'conflict resolution'],
          advanced: ['strategic thinking', 'team development', 'mentoring'],
          expert: ['organizational leadership', 'culture building', 'change management']
        }
      },
      {
        name: 'Communication',
        aliases: ['communication', 'verbal communication', 'written communication'],
        relatedSkills: ['Leadership', 'Presentation', 'Documentation'],
        category: SkillCategory.SOFT_SKILL,
        proficiencyIndicators: {
          beginner: ['basic interaction', 'email communication'],
          intermediate: ['presentations', 'technical writing'],
          advanced: ['stakeholder management', 'cross-team communication'],
          expert: ['public speaking', 'thought leadership', 'influence']
        }
      }
    ]

    skillDefinitions.forEach(skill => {
      this.skillTaxonomy.set(skill.name.toLowerCase(), skill)
      skill.aliases.forEach(alias => {
        this.skillTaxonomy.set(alias.toLowerCase(), skill)
      })
    })
  }

  private initializeCategoryKeywords(): void {
    this.categoryKeywords.set(SkillCategory.PROGRAMMING_LANGUAGE, [
      'programming', 'language', 'code', 'coding', 'scripting'
    ])
    this.categoryKeywords.set(SkillCategory.FRAMEWORK, [
      'framework', 'library', 'platform', 'stack'
    ])
    this.categoryKeywords.set(SkillCategory.DATABASE, [
      'database', 'db', 'data', 'storage', 'query', 'sql', 'nosql'
    ])
    this.categoryKeywords.set(SkillCategory.CLOUD, [
      'cloud', 'aws', 'azure', 'gcp', 'serverless', 'infrastructure'
    ])
    this.categoryKeywords.set(SkillCategory.DEVOPS, [
      'devops', 'deployment', 'ci/cd', 'automation', 'container', 'orchestration'
    ])
    this.categoryKeywords.set(SkillCategory.FRONTEND, [
      'frontend', 'ui', 'ux', 'web', 'browser', 'client-side'
    ])
    this.categoryKeywords.set(SkillCategory.BACKEND, [
      'backend', 'server', 'api', 'microservices', 'server-side'
    ])
    this.categoryKeywords.set(SkillCategory.TESTING, [
      'testing', 'test', 'qa', 'quality', 'automation', 'unit test'
    ])
    this.categoryKeywords.set(SkillCategory.SOFT_SKILL, [
      'leadership', 'communication', 'teamwork', 'management', 'collaboration'
    ])
  }

  async extractSkills(text: string, context?: any): Promise<SkillExtractionResult> {
    const extractedSkills: ExtractedSkill[] = []
    const suggestions: SkillSuggestion[] = []
    
    // 1. Direct skill matching from taxonomy
    const directMatches = this.findDirectMatches(text)
    extractedSkills.push(...directMatches)

    // 2. AI-powered extraction for complex skills
    const aiExtracted = await this.aiExtractSkills(text)
    extractedSkills.push(...aiExtracted)

    // 3. Context-based skill inference
    const inferredSkills = this.inferSkillsFromContext(text)
    extractedSkills.push(...inferredSkills)

    // 4. Generate skill suggestions
    const skillSuggestions = await this.generateSkillSuggestions(text, extractedSkills)
    suggestions.push(...skillSuggestions)

    // 5. Identify missing categories
    const missingCategories = this.identifyMissingCategories(extractedSkills)

    // 6. Calculate overall confidence
    const confidence = this.calculateExtractionConfidence(extractedSkills, text)

    return {
      skills: this.deduplicateSkills(extractedSkills),
      confidence,
      suggestions,
      missingCategories
    }
  }

  private findDirectMatches(text: string): ExtractedSkill[] {
    const matches: ExtractedSkill[] = []
    const lowerText = text.toLowerCase()

    for (const [skillKey, skillDef] of this.skillTaxonomy) {
      if (lowerText.includes(skillKey)) {
        const contextStart = Math.max(0, lowerText.indexOf(skillKey) - 50)
        const contextEnd = Math.min(text.length, lowerText.indexOf(skillKey) + skillKey.length + 50)
        const context = text.substring(contextStart, contextEnd)

        const proficiency = this.inferProficiencyFromContext(context, skillDef)
        const yearsExp = this.extractYearsExperience(context, skillKey)

        matches.push({
          name: skillDef.name,
          category: skillDef.category,
          proficiencyLevel: proficiency,
          confidence: this.calculateMatchConfidence(skillKey, context),
          context: context.trim(),
          aliases: skillDef.aliases,
          relatedSkills: skillDef.relatedSkills,
          yearsExperience: yearsExp,
          frameworks: skillDef.frameworks,
          tools: skillDef.tools,
          certifications: skillDef.certifications
        })
      }
    }

    return matches
  }

  private async aiExtractSkills(text: string): Promise<ExtractedSkill[]> {
    try {
      const prompt = `Extract technical skills, programming languages, frameworks, tools, and technologies mentioned in this text. 
      For each skill, provide:
      - name: exact skill name
      - category: programming_language, framework, database, cloud, devops, frontend, backend, testing, soft_skill, or tool
      - proficiency: beginner, intermediate, advanced, or expert (based on context)
      - confidence: 0.0-1.0
      - context: relevant surrounding text

      Return JSON array only:
      ${text}`

      // This would call OpenAI API - simplified for now
      const aiSkills: ExtractedSkill[] = []
      
      // Parse AI response and convert to ExtractedSkill format
      // Implementation would depend on actual AI response format
      
      return aiSkills
    } catch (error) {
      console.error('AI skill extraction failed:', error)
      return []
    }
  }

  private inferSkillsFromContext(text: string): ExtractedSkill[] {
    const inferred: ExtractedSkill[] = []
    const lowerText = text.toLowerCase()

    // Infer skills from job titles
    if (lowerText.includes('full stack') || lowerText.includes('fullstack')) {
      inferred.push(this.createInferredSkill('Full Stack Development', SkillCategory.FRAMEWORK, text))
    }

    if (lowerText.includes('frontend') || lowerText.includes('front-end')) {
      inferred.push(this.createInferredSkill('Frontend Development', SkillCategory.FRONTEND, text))
    }

    if (lowerText.includes('backend') || lowerText.includes('back-end')) {
      inferred.push(this.createInferredSkill('Backend Development', SkillCategory.BACKEND, text))
    }

    // Infer from technology combinations
    if (lowerText.includes('mern') || (lowerText.includes('mongo') && lowerText.includes('react'))) {
      inferred.push(this.createInferredSkill('MERN Stack', SkillCategory.FRAMEWORK, text))
    }

    if (lowerText.includes('mean') || (lowerText.includes('mongo') && lowerText.includes('angular'))) {
      inferred.push(this.createInferredSkill('MEAN Stack', SkillCategory.FRAMEWORK, text))
    }

    // Infer from responsibilities
    if (lowerText.includes('api') && lowerText.includes('develop')) {
      inferred.push(this.createInferredSkill('API Development', SkillCategory.BACKEND, text))
    }

    if (lowerText.includes('database') && lowerText.includes('design')) {
      inferred.push(this.createInferredSkill('Database Design', SkillCategory.DATABASE, text))
    }

    return inferred
  }

  private createInferredSkill(name: string, category: SkillCategory, context: string): ExtractedSkill {
    return {
      name,
      category,
      proficiencyLevel: ProficiencyLevel.INTERMEDIATE,
      confidence: 0.6,
      context: context.substring(0, 100),
      aliases: [],
      relatedSkills: []
    }
  }

  private inferProficiencyFromContext(context: string, skillDef: SkillDefinition): ProficiencyLevel {
    const lowerContext = context.toLowerCase()

    // Check for explicit proficiency indicators
    for (const [level, indicators] of Object.entries(skillDef.proficiencyIndicators)) {
      for (const indicator of indicators) {
        if (lowerContext.includes(indicator.toLowerCase())) {
          return level as ProficiencyLevel
        }
      }
    }

    // Check for general proficiency words
    if (lowerContext.includes('expert') || lowerContext.includes('master') || lowerContext.includes('architect')) {
      return ProficiencyLevel.EXPERT
    } else if (lowerContext.includes('senior') || lowerContext.includes('advanced') || lowerContext.includes('lead')) {
      return ProficiencyLevel.ADVANCED
    } else if (lowerContext.includes('proficient') || lowerContext.includes('experienced')) {
      return ProficiencyLevel.ADVANCED
    } else if (lowerContext.includes('basic') || lowerContext.includes('beginner') || lowerContext.includes('learning')) {
      return ProficiencyLevel.BEGINNER
    }

    return ProficiencyLevel.INTERMEDIATE
  }

  private extractYearsExperience(context: string, skill: string): number | undefined {
    const patterns = [
      new RegExp(`(\\d+)\\s*years?\\s*(?:of\\s*)?(?:experience\\s*)?(?:with\\s*)?${skill}`, 'i'),
      new RegExp(`${skill}\\s*for\\s*(\\d+)\\s*years?`, 'i'),
      new RegExp(`(\\d+)\\s*years?\\s*${skill}`, 'i')
    ]

    for (const pattern of patterns) {
      const match = context.match(pattern)
      if (match) {
        return parseInt(match[1])
      }
    }

    return undefined
  }

  private calculateMatchConfidence(skillKey: string, context: string): number {
    let confidence = 0.8 // Base confidence for direct match

    // Increase confidence if surrounded by relevant context
    const contextWords = context.toLowerCase().split(/\s+/)
    const relevantWords = ['experience', 'skilled', 'proficient', 'expert', 'years', 'worked', 'used']
    
    const relevantMatches = contextWords.filter(word => 
      relevantWords.some(relevant => word.includes(relevant))
    ).length

    confidence += Math.min(relevantMatches * 0.05, 0.2)

    // Decrease confidence if skill appears in a negative context
    if (context.toLowerCase().includes('not') || context.toLowerCase().includes('never')) {
      confidence *= 0.3
    }

    return Math.min(confidence, 1.0)
  }

  private async generateSkillSuggestions(text: string, extractedSkills: ExtractedSkill[]): Promise<SkillSuggestion[]> {
    const suggestions: SkillSuggestion[] = []
    const extractedSkillNames = extractedSkills.map(s => s.name.toLowerCase())

    // Suggest related skills
    for (const skill of extractedSkills) {
      const skillDef = this.skillTaxonomy.get(skill.name.toLowerCase())
      if (skillDef) {
        for (const relatedSkill of skillDef.relatedSkills) {
          if (!extractedSkillNames.includes(relatedSkill.toLowerCase())) {
            suggestions.push({
              skill: relatedSkill,
              reason: `Often used with ${skill.name}`,
              confidence: 0.6,
              category: this.inferCategoryFromSkillName(relatedSkill)
            })
          }
        }
      }
    }

    // Suggest skills based on job titles or responsibilities
    const lowerText = text.toLowerCase()
    
    if (lowerText.includes('react') && !extractedSkillNames.includes('redux')) {
      suggestions.push({
        skill: 'Redux',
        reason: 'Commonly used with React for state management',
        confidence: 0.7,
        category: SkillCategory.FRAMEWORK
      })
    }

    if (lowerText.includes('node.js') && !extractedSkillNames.includes('express')) {
      suggestions.push({
        skill: 'Express',
        reason: 'Popular Node.js framework',
        confidence: 0.8,
        category: SkillCategory.FRAMEWORK
      })
    }

    return suggestions.slice(0, 5) // Limit to top 5 suggestions
  }

  private inferCategoryFromSkillName(skillName: string): SkillCategory {
    const skillDef = this.skillTaxonomy.get(skillName.toLowerCase())
    if (skillDef) {
      return skillDef.category
    }

    // Fallback categorization
    const lowerSkill = skillName.toLowerCase()
    if (['javascript', 'python', 'java', 'c++', 'go'].includes(lowerSkill)) {
      return SkillCategory.PROGRAMMING_LANGUAGE
    } else if (['react', 'angular', 'vue', 'express', 'django'].includes(lowerSkill)) {
      return SkillCategory.FRAMEWORK
    } else if (['mysql', 'postgresql', 'mongodb'].includes(lowerSkill)) {
      return SkillCategory.DATABASE
    }

    return SkillCategory.TOOL
  }

  private identifyMissingCategories(extractedSkills: ExtractedSkill[]): SkillCategory[] {
    const presentCategories = new Set(extractedSkills.map(s => s.category))
    const allCategories = Object.values(SkillCategory)
    
    return allCategories.filter(category => !presentCategories.has(category))
  }

  private calculateExtractionConfidence(skills: ExtractedSkill[], text: string): number {
    if (skills.length === 0) return 0

    const avgSkillConfidence = skills.reduce((sum, skill) => sum + skill.confidence, 0) / skills.length
    const textQuality = Math.min(text.length / 100, 1) // Longer text generally more reliable
    const skillDiversity = Math.min(new Set(skills.map(s => s.category)).size / 5, 1)

    return (avgSkillConfidence * 0.6) + (textQuality * 0.2) + (skillDiversity * 0.2)
  }

  private deduplicateSkills(skills: ExtractedSkill[]): ExtractedSkill[] {
    const skillMap = new Map<string, ExtractedSkill>()

    for (const skill of skills) {
      const key = skill.name.toLowerCase()
      const existing = skillMap.get(key)

      if (!existing || skill.confidence > existing.confidence) {
        skillMap.set(key, {
          ...skill,
          contexts: existing ? [...(existing.contexts || []), skill.context] : [skill.context]
        })
      }
    }

    return Array.from(skillMap.values())
  }

  // Skill categorization and organization methods
  categorizeSkills(skills: ExtractedSkill[]): Map<SkillCategory, ExtractedSkill[]> {
    const categorized = new Map<SkillCategory, ExtractedSkill[]>()

    for (const skill of skills) {
      if (!categorized.has(skill.category)) {
        categorized.set(skill.category, [])
      }
      categorized.get(skill.category)!.push(skill)
    }

    return categorized
  }

  getSkillsByProficiency(skills: ExtractedSkill[], level: ProficiencyLevel): ExtractedSkill[] {
    return skills.filter(skill => skill.proficiencyLevel === level)
  }

  getTopSkillsByCategory(skills: ExtractedSkill[], category: SkillCategory, limit: number = 5): ExtractedSkill[] {
    return skills
      .filter(skill => skill.category === category)
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, limit)
  }

  generateSkillGaps(
    candidateSkills: ExtractedSkill[], 
    requiredSkills: string[], 
    jobLevel: ProficiencyLevel
  ): {
    missing: string[]
    underqualified: Array<{ skill: string, required: ProficiencyLevel, current: ProficiencyLevel }>
    overqualified: Array<{ skill: string, required: ProficiencyLevel, current: ProficiencyLevel }>
  } {
    const candidateSkillMap = new Map(
      candidateSkills.map(s => [s.name.toLowerCase(), s])
    )

    const missing: string[] = []
    const underqualified: any[] = []
    const overqualified: any[] = []

    for (const requiredSkill of requiredSkills) {
      const candidateSkill = candidateSkillMap.get(requiredSkill.toLowerCase())
      
      if (!candidateSkill) {
        missing.push(requiredSkill)
      } else {
        const proficiencyOrder = [
          ProficiencyLevel.BEGINNER,
          ProficiencyLevel.INTERMEDIATE,
          ProficiencyLevel.ADVANCED,
          ProficiencyLevel.EXPERT
        ]

        const requiredIndex = proficiencyOrder.indexOf(jobLevel)
        const currentIndex = proficiencyOrder.indexOf(candidateSkill.proficiencyLevel)

        if (currentIndex < requiredIndex) {
          underqualified.push({
            skill: requiredSkill,
            required: jobLevel,
            current: candidateSkill.proficiencyLevel
          })
        } else if (currentIndex > requiredIndex + 1) { // Allow one level above
          overqualified.push({
            skill: requiredSkill,
            required: jobLevel,
            current: candidateSkill.proficiencyLevel
          })
        }
      }
    }

    return { missing, underqualified, overqualified }
  }

  // Export and utility methods
  exportSkillsToJSON(skills: ExtractedSkill[]): string {
    return JSON.stringify(skills, null, 2)
  }

  getSkillDefinition(skillName: string): SkillDefinition | undefined {
    return this.skillTaxonomy.get(skillName.toLowerCase())
  }

  getAllSkillDefinitions(): SkillDefinition[] {
    const unique = new Map<string, SkillDefinition>()
    for (const [_, skillDef] of this.skillTaxonomy) {
      unique.set(skillDef.name, skillDef)
    }
    return Array.from(unique.values())
  }
}

// Singleton instance
export const skillExtractor = new SkillExtractionEngine()