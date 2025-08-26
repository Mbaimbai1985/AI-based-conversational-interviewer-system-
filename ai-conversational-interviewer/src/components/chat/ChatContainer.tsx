"use client"

import React, { useEffect, useRef } from 'react'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { useInterviewSocket } from '@/lib/socket/client'
import { Badge } from '@/components/ui/badge'
import { Users, Wifi, WifiOff } from 'lucide-react'

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
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const {
    connected,
    connecting,
    error,
    messages,
    typingUsers,
    aiTyping,
    connectedUsers,
    sendMessage,
    startTyping,
    stopTyping,
  } = useInterviewSocket(interviewId)

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    try {
      await sendMessage(content)
      onMessageSend?.(content)
    } catch (error) {
      console.error('Error sending message:', error)
      // Handle error - could show a toast notification
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>
            Interview {candidateName && `with ${candidateName}`}
          </span>
          <div className="flex items-center gap-2">
            {jobTitle && (
              <span className="text-sm font-normal text-muted-foreground">
                {jobTitle}
              </span>
            )}
            
            {/* Connection Status */}
            <div className="flex items-center gap-2">
              {connected ? (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <Wifi className="w-3 h-3 mr-1" />
                  Connected
                </Badge>
              ) : connecting ? (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  Connecting...
                </Badge>
              ) : (
                <Badge variant="destructive">
                  <WifiOff className="w-3 h-3 mr-1" />
                  Disconnected
                </Badge>
              )}
              
              {/* Connected Users Count */}
              {connectedUsers.length > 0 && (
                <Badge variant="outline" className="text-xs">
                  <Users className="w-3 h-3 mr-1" />
                  {connectedUsers.length}
                </Badge>
              )}
            </div>
          </div>
        </CardTitle>
        
        {/* Error Display */}
        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
            Connection Error: {error}
          </div>
        )}
      </CardHeader>
      
      <CardContent className="flex flex-col h-[600px]">
        {/* Messages Area */}
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-muted-foreground">
                {connecting ? (
                  "Connecting to interview..."
                ) : connected ? (
                  "Start the conversation by typing a message below."
                ) : (
                  "Please wait while we establish connection..."
                )}
              </div>
            ) : (
              messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  id={message.id}
                  content={message.content}
                  sender={message.sender as any}
                  messageType={message.messageType as any}
                  timestamp={new Date(message.timestamp)}
                  metadata={message.metadata}
                />
              ))
            )}
            
            {/* Typing Indicators */}
            {aiTyping && (
              <ChatMessage
                id="ai-typing"
                content="AI is thinking..."
                sender="AI"
                messageType="SYSTEM"
                timestamp={new Date()}
              />
            )}
            
            {typingUsers.length > 0 && (
              <div className="text-sm text-muted-foreground italic">
                {typingUsers.length === 1 ? 'Someone is' : `${typingUsers.length} people are`} typing...
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="mt-4 pt-4 border-t">
          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={!connected || connecting}
            placeholder={
              connected 
                ? "Type your response..." 
                : connecting 
                ? "Connecting..." 
                : "Disconnected - check your connection"
            }
            onTypingStart={startTyping}
            onTypingStop={stopTyping}
          />
        </div>
      </CardContent>
    </Card>
  )
}