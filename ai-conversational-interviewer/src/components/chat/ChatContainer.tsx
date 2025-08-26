"use client"

import React, { useEffect, useRef, useState } from 'react'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { MessageSender, MessageType } from '@prisma/client'

interface Message {
  id: string
  content: string
  sender: MessageSender
  messageType: MessageType
  timestamp: Date
  metadata?: any
}

interface ChatContainerProps {
  interviewId: string
  candidateName?: string
  jobTitle?: string
  onMessageSend?: (message: string) => void
  className?: string
}

export function ChatContainer({ 
  interviewId, 
  candidateName, 
  jobTitle, 
  onMessageSend,
  className 
}: ChatContainerProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Load initial messages
  useEffect(() => {
    loadMessages()
  }, [interviewId])

  const loadMessages = async () => {
    try {
      const response = await fetch(`/api/interviews/${interviewId}/messages`)
      if (response.ok) {
        const data = await response.json()
        setMessages(data.messages || [])
      }
    } catch (error) {
      console.error('Error loading messages:', error)
    }
  }

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: `temp-${Date.now()}`,
      content,
      sender: 'CANDIDATE',
      messageType: 'TEXT',
      timestamp: new Date(),
    }

    // Add user message immediately
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch(`/api/interviews/${interviewId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          sender: 'CANDIDATE',
          messageType: 'TEXT',
        }),
      })

      if (response.ok) {
        const data = await response.json()
        
        // Replace temp message with actual message from server
        setMessages(prev => 
          prev.map(msg => 
            msg.id === userMessage.id ? data.message : msg
          )
        )

        // If there's an AI response, add it
        if (data.aiResponse) {
          const aiMessage: Message = {
            id: data.aiResponse.id,
            content: data.aiResponse.content,
            sender: 'AI',
            messageType: data.aiResponse.messageType || 'TEXT',
            timestamp: new Date(data.aiResponse.timestamp),
            metadata: data.aiResponse.metadata,
          }
          setMessages(prev => [...prev, aiMessage])
        }

        // Call the callback if provided
        onMessageSend?.(content)
      } else {
        // Remove temp message on error
        setMessages(prev => prev.filter(msg => msg.id !== userMessage.id))
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      // Remove temp message on error
      setMessages(prev => prev.filter(msg => msg.id !== userMessage.id))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>
            Interview {candidateName && `with ${candidateName}`}
          </span>
          {jobTitle && (
            <span className="text-sm font-normal text-muted-foreground">
              {jobTitle}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex flex-col h-[600px]">
        {/* Messages Area */}
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-muted-foreground">
                Start the conversation by typing a message below.
              </div>
            ) : (
              messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  id={message.id}
                  content={message.content}
                  sender={message.sender}
                  messageType={message.messageType}
                  timestamp={message.timestamp}
                  metadata={message.metadata}
                />
              ))
            )}
            {isLoading && (
              <ChatMessage
                id="loading"
                content="AI is thinking..."
                sender="AI"
                messageType="SYSTEM"
                timestamp={new Date()}
              />
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="mt-4 pt-4 border-t">
          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={isLoading}
            placeholder="Type your response..."
          />
        </div>
      </CardContent>
    </Card>
  )
}