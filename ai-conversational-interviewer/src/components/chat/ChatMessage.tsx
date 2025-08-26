"use client"

import React from 'react'
import { MessageSender, MessageType } from '@prisma/client'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/utils'
import { Bot, User } from 'lucide-react'

interface ChatMessageProps {
  id: string
  content: string
  sender: MessageSender
  messageType: MessageType
  timestamp: Date
  metadata?: any
}

export function ChatMessage({ 
  content, 
  sender, 
  messageType, 
  timestamp, 
  metadata 
}: ChatMessageProps) {
  const isAI = sender === 'AI'
  const isSystem = messageType === 'SYSTEM'

  if (isSystem) {
    return (
      <div className="flex justify-center my-4">
        <div className="bg-muted text-muted-foreground text-sm px-3 py-1 rounded-full">
          {content}
        </div>
      </div>
    )
  }

  return (
    <div className={cn(
      "flex gap-3 max-w-4xl",
      isAI ? "justify-start" : "justify-end ml-12"
    )}>
      {isAI && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <Bot className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
      
      <div className={cn(
        "rounded-lg px-4 py-3 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl",
        isAI 
          ? "bg-muted text-muted-foreground" 
          : "bg-primary text-primary-foreground"
      )}>
        <div className="text-sm">
          {content}
        </div>
        <div className={cn(
          "text-xs mt-1",
          isAI ? "text-muted-foreground/60" : "text-primary-foreground/60"
        )}>
          {formatDate(timestamp)}
        </div>
        
        {/* Show confidence score for AI messages */}
        {isAI && metadata?.confidence && (
          <div className="text-xs text-muted-foreground/40 mt-1">
            Confidence: {Math.round(metadata.confidence * 100)}%
          </div>
        )}
      </div>

      {!isAI && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
          <User className="w-4 h-4 text-secondary-foreground" />
        </div>
      )}
    </div>
  )
}