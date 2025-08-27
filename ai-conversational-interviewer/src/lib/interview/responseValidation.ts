import { AIMessage, SentimentAnalysis } from '../ai/openai'

export interface ValidationResult {
  isValid: boolean
  confidence: number
  issues: ValidationIssue[]
  suggestions: string[]
  severity: 'low' | 'medium' | 'high'
}

export interface ValidationIssue {
  type: ValidationIssueType
  message: string
  severity: 'low' | 'medium' | 'high'
  suggestion?: string
}

export enum ValidationIssueType {
  TOO_SHORT = 'too_short',
  TOO_LONG = 'too_long',
  OFF_TOPIC = 'off_topic',
  INAPPROPRIATE = 'inappropriate',
  UNCLEAR = 'unclear',
  INCONSISTENT = 'inconsistent',
  MISSING_DETAILS = 'missing_details',
  TECHNICAL_INACCURACY = 'technical_inaccuracy',
  POOR_GRAMMAR = 'poor_grammar',
  NEGATIVE_SENTIMENT = 'negative_sentiment'
}

export class ResponseValidator {
  private static readonly MIN_RESPONSE_LENGTH = 10
  private static readonly MAX_RESPONSE_LENGTH = 2000
  private static readonly IDEAL_MIN_LENGTH = 50
  private static readonly IDEAL_MAX_LENGTH = 500

  // Validate a candidate's response
  static async validateResponse(
    response: string,
    question: string,
    context: AIMessage[],
    sentiment?: SentimentAnalysis
  ): Promise<ValidationResult> {
    const issues: ValidationIssue[] = []
    let confidence = 1.0

    // Basic length validation
    const lengthIssues = this.validateLength(response)
    issues.push(...lengthIssues)

    // Content quality validation
    const contentIssues = await this.validateContent(response, question)
    issues.push(...contentIssues)

    // Context relevance validation
    const relevanceIssues = await this.validateRelevance(response, question, context)
    issues.push(...relevanceIssues)

    // Sentiment validation
    if (sentiment) {
      const sentimentIssues = this.validateSentiment(sentiment)
      issues.push(...sentimentIssues)
    }

    // Grammar and clarity validation
    const clarityIssues = await this.validateClarity(response)
    issues.push(...clarityIssues)

    // Consistency validation with previous responses
    const consistencyIssues = this.validateConsistency(response, context)
    issues.push(...consistencyIssues)

    // Calculate overall confidence and severity
    const severity = this.calculateSeverity(issues)
    confidence = Math.max(0, 1 - (issues.length * 0.1) - (issues.filter(i => i.severity === 'high').length * 0.2))

    // Generate suggestions
    const suggestions = this.generateSuggestions(issues, response, question)

    return {
      isValid: issues.filter(i => i.severity === 'high').length === 0,
      confidence,
      issues,
      suggestions,
      severity
    }
  }

  private static validateLength(response: string): ValidationIssue[] {
    const issues: ValidationIssue[] = []
    const length = response.trim().length

    if (length < this.MIN_RESPONSE_LENGTH) {
      issues.push({
        type: ValidationIssueType.TOO_SHORT,
        message: 'Response is too short to provide meaningful information',
        severity: 'high',
        suggestion: 'Please provide more details to help us understand your experience better.'
      })
    } else if (length < this.IDEAL_MIN_LENGTH) {
      issues.push({
        type: ValidationIssueType.TOO_SHORT,
        message: 'Response could benefit from more detail',
        severity: 'medium',
        suggestion: 'Could you elaborate with some specific examples?'
      })
    }

    if (length > this.MAX_RESPONSE_LENGTH) {
      issues.push({
        type: ValidationIssueType.TOO_LONG,
        message: 'Response is too long and may lose focus',
        severity: 'medium',
        suggestion: 'Try to be more concise while keeping the key points.'
      })
    }

    return issues
  }

  private static async validateContent(response: string, question: string): Promise<ValidationIssue[]> {
    const issues: ValidationIssue[] = []
    
    // Check for inappropriate content
    if (this.containsInappropriateContent(response)) {
      issues.push({
        type: ValidationIssueType.INAPPROPRIATE,
        message: 'Response contains inappropriate content',
        severity: 'high',
        suggestion: 'Please keep your response professional and appropriate for an interview setting.'
      })
    }

    // Check for missing key details based on question type
    const missingDetails = await this.checkMissingDetails(response, question)
    if (missingDetails) {
      issues.push({
        type: ValidationIssueType.MISSING_DETAILS,
        message: missingDetails,
        severity: 'medium',
        suggestion: 'Consider adding specific examples, metrics, or outcomes to strengthen your response.'
      })
    }

    return issues
  }

  private static containsInappropriateContent(response: string): boolean {
    const inappropriatePatterns = [
      /\b(hate|discrimination|racist|sexist)\b/i,
      /\b(damn|hell|shit|fuck)\b/i,
      /\b(confidential|proprietary|nda)\b/i
    ]

    return inappropriatePatterns.some(pattern => pattern.test(response))
  }

  private static async checkMissingDetails(response: string, question: string): Promise<string | null> {
    const lowerResponse = response.toLowerCase()
    const lowerQuestion = question.toLowerCase()

    // Check for experience questions without specific details
    if (lowerQuestion.includes('experience') || lowerQuestion.includes('project')) {
      if (!lowerResponse.includes('year') && !lowerResponse.includes('month') && 
          !this.containsTimeReferences(response)) {
        return 'Experience response lacks timeline information'
      }
      if (!this.containsSpecificExamples(response)) {
        return 'Response would benefit from specific examples or achievements'
      }
    }

    // Check for technical questions without technical details
    if (lowerQuestion.includes('technical') || lowerQuestion.includes('code') || 
        lowerQuestion.includes('algorithm')) {
      if (!this.containsTechnicalTerms(response)) {
        return 'Technical response lacks specific technical details'
      }
    }

    return null
  }

  private static containsTimeReferences(response: string): boolean {
    const timePatterns = [
      /\d+\s*(year|month|week|day)s?/i,
      /\b(recently|currently|previously|before|after|during)\b/i,
      /\b(20\d{2})\b/,
      /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i
    ]
    return timePatterns.some(pattern => pattern.test(response))
  }

  private static containsSpecificExamples(response: string): boolean {
    const examplePatterns = [
      /\b(for example|such as|specifically|in particular)\b/i,
      /\b(increased|decreased|improved|reduced|achieved)\s+\d+/i,
      /\b\d+%\b/,
      /\$\d+/
    ]
    return examplePatterns.some(pattern => pattern.test(response))
  }

  private static containsTechnicalTerms(response: string): boolean {
    // This could be enhanced with a more comprehensive technical terms database
    const technicalPatterns = [
      /\b(javascript|python|java|react|angular|vue|node|sql|api|database)\b/i,
      /\b(algorithm|data\s+structure|complexity|optimization)\b/i,
      /\b(git|docker|kubernetes|aws|azure|gcp)\b/i
    ]
    return technicalPatterns.some(pattern => pattern.test(response))
  }

  private static async validateRelevance(
    response: string, 
    question: string, 
    context: AIMessage[]
  ): Promise<ValidationIssue[]> {
    const issues: ValidationIssue[] = []
    
    // Simple relevance check - could be enhanced with AI
    const relevanceScore = this.calculateRelevanceScore(response, question)
    
    if (relevanceScore < 0.3) {
      issues.push({
        type: ValidationIssueType.OFF_TOPIC,
        message: 'Response does not directly address the question',
        severity: 'high',
        suggestion: 'Please focus your answer on the specific question asked.'
      })
    } else if (relevanceScore < 0.6) {
      issues.push({
        type: ValidationIssueType.OFF_TOPIC,
        message: 'Response partially addresses the question but could be more focused',
        severity: 'medium',
        suggestion: 'Try to address the core of the question more directly.'
      })
    }

    return issues
  }

  private static calculateRelevanceScore(response: string, question: string): number {
    const responseWords = response.toLowerCase().split(/\s+/)
    const questionWords = question.toLowerCase().split(/\s+/)
    
    // Remove common words
    const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'])
    const filteredQuestionWords = questionWords.filter(word => !commonWords.has(word) && word.length > 2)
    
    let matches = 0
    for (const word of filteredQuestionWords) {
      if (responseWords.some(rWord => rWord.includes(word) || word.includes(rWord))) {
        matches++
      }
    }
    
    return filteredQuestionWords.length > 0 ? matches / filteredQuestionWords.length : 0
  }

  private static validateSentiment(sentiment: SentimentAnalysis): ValidationIssue[] {
    const issues: ValidationIssue[] = []
    
    if (sentiment.polarity < -0.5 && sentiment.confidence > 0.7) {
      issues.push({
        type: ValidationIssueType.NEGATIVE_SENTIMENT,
        message: 'Response indicates significant negative sentiment',
        severity: 'medium',
        suggestion: 'Consider framing your experiences in a more positive or constructive way.'
      })
    }

    if (sentiment.emotions.frustration > 0.8) {
      issues.push({
        type: ValidationIssueType.NEGATIVE_SENTIMENT,
        message: 'Response indicates frustration',
        severity: 'medium',
        suggestion: 'Try to maintain a professional tone even when discussing challenges.'
      })
    }

    return issues
  }

  private static async validateClarity(response: string): Promise<ValidationIssue[] {
    const issues: ValidationIssue[] = []
    
    // Check for common clarity issues
    const sentences = response.split(/[.!?]+/).filter(s => s.trim().length > 0)
    
    // Check for overly long sentences
    const longSentences = sentences.filter(s => s.split(/\s+/).length > 25)
    if (longSentences.length > sentences.length * 0.3) {
      issues.push({
        type: ValidationIssueType.UNCLEAR,
        message: 'Response contains overly complex sentences',
        severity: 'low',
        suggestion: 'Try breaking down complex ideas into shorter, clearer sentences.'
      })
    }

    // Check for repetitive words
    const words = response.toLowerCase().split(/\s+/)
    const wordCounts = new Map<string, number>()
    words.forEach(word => {
      if (word.length > 3) {
        wordCounts.set(word, (wordCounts.get(word) || 0) + 1)
      }
    })
    
    const repetitiveWords = Array.from(wordCounts.entries())
      .filter(([word, count]) => count > 3 && !['that', 'this', 'have', 'been', 'were', 'they'].includes(word))
    
    if (repetitiveWords.length > 0) {
      issues.push({
        type: ValidationIssueType.UNCLEAR,
        message: 'Response contains repetitive language',
        severity: 'low',
        suggestion: 'Try varying your vocabulary to make your response more engaging.'
      })
    }

    return issues
  }

  private static validateConsistency(response: string, context: AIMessage[]): ValidationIssue[] {
    const issues: ValidationIssue[] = []
    
    // Check for contradictions with previous responses
    const previousResponses = context
      .filter(msg => msg.role === 'user')
      .map(msg => msg.content)
    
    // Simple contradiction detection - could be enhanced with AI
    if (this.detectPotentialContradictions(response, previousResponses)) {
      issues.push({
        type: ValidationIssueType.INCONSISTENT,
        message: 'Response may contradict previous statements',
        severity: 'medium',
        suggestion: 'Please ensure your response is consistent with information you\'ve shared earlier.'
      })
    }

    return issues
  }

  private static detectPotentialContradictions(response: string, previousResponses: string[]): boolean {
    // Simple heuristic - check for contradictory statements about experience
    const currentYears = this.extractYearsOfExperience(response)
    const previousYears = previousResponses.flatMap(r => this.extractYearsOfExperience(r))
    
    if (currentYears.length > 0 && previousYears.length > 0) {
      const maxDifference = Math.max(...currentYears) - Math.min(...previousYears)
      return Math.abs(maxDifference) > 2 // Flag if difference > 2 years
    }
    
    return false
  }

  private static extractYearsOfExperience(text: string): number[] {
    const patterns = [
      /(\d+)\s*years?\s*of\s*experience/gi,
      /(\d+)\s*years?\s*experience/gi,
      /experience\s*of\s*(\d+)\s*years?/gi
    ]
    
    const years: number[] = []
    patterns.forEach(pattern => {
      const matches = text.matchAll(pattern)
      for (const match of matches) {
        const year = parseInt(match[1])
        if (year > 0 && year < 50) { // Reasonable bounds
          years.push(year)
        }
      }
    })
    
    return years
  }

  private static calculateSeverity(issues: ValidationIssue[]): 'low' | 'medium' | 'high' {
    const highSeverityCount = issues.filter(i => i.severity === 'high').length
    const mediumSeverityCount = issues.filter(i => i.severity === 'medium').length
    
    if (highSeverityCount > 0) return 'high'
    if (mediumSeverityCount > 2) return 'high'
    if (mediumSeverityCount > 0) return 'medium'
    return 'low'
  }

  private static generateSuggestions(
    issues: ValidationIssue[], 
    response: string, 
    question: string
  ): string[] {
    const suggestions: string[] = []
    
    // Add specific suggestions from issues
    issues.forEach(issue => {
      if (issue.suggestion) {
        suggestions.push(issue.suggestion)
      }
    })
    
    // Add general suggestions based on response characteristics
    if (response.length < this.IDEAL_MIN_LENGTH) {
      suggestions.push("Consider providing specific examples to illustrate your points.")
    }
    
    if (!this.containsSpecificExamples(response) && question.toLowerCase().includes('experience')) {
      suggestions.push("Include specific achievements or metrics to demonstrate your impact.")
    }
    
    return [...new Set(suggestions)].slice(0, 3) // Remove duplicates and limit to 3
  }
}

// Error handling for interview system
export class InterviewErrorHandler {
  static handleValidationError(error: Error, context: string): string {
    console.error(`Validation error in ${context}:`, error)
    
    if (error.message.includes('API')) {
      return "I'm experiencing some technical difficulties. Could you please repeat your response?"
    }
    
    if (error.message.includes('timeout')) {
      return "The response took longer than expected to process. Please try again."
    }
    
    return "I encountered an issue processing your response. Could you please rephrase it?"
  }

  static handleAIError(error: Error, fallbackResponse?: string): string {
    console.error('AI processing error:', error)
    
    if (error.message.includes('rate limit')) {
      return "I'm currently experiencing high demand. Please wait a moment before continuing."
    }
    
    if (error.message.includes('content filter')) {
      return "I couldn't process that response due to content guidelines. Could you rephrase it?"
    }
    
    return fallbackResponse || "I'm having trouble processing that. Could you try rephrasing your response?"
  }

  static handleContextError(error: Error): string {
    console.error('Context management error:', error)
    return "I may have lost some context. Could you briefly summarize what we were discussing?"
  }

  static isRecoverableError(error: Error): boolean {
    const recoverablePatterns = [
      'timeout',
      'rate limit',
      'network',
      'temporary'
    ]
    
    return recoverablePatterns.some(pattern => 
      error.message.toLowerCase().includes(pattern)
    )
  }

  static getRetryDelay(error: Error): number {
    if (error.message.includes('rate limit')) {
      return 60000 // 1 minute for rate limits
    }
    
    if (error.message.includes('timeout')) {
      return 5000 // 5 seconds for timeouts
    }
    
    return 2000 // 2 seconds default
  }
}