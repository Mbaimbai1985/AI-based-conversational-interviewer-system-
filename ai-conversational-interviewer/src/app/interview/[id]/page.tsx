import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { ChatContainer } from '@/components/chat/ChatContainer'

interface InterviewPageProps {
  params: {
    id: string
  }
}

export default async function InterviewPage({ params }: InterviewPageProps) {
  const interviewId = params.id

  // Get interview details
  const interview = await prisma.interview.findUnique({
    where: { id: interviewId },
    include: {
      candidate: true,
      jobRole: true,
      recruiter: true,
    },
  })

  if (!interview) {
    redirect('/404')
  }

  // If interview is completed, show completion message
  if (interview.status === 'COMPLETED') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-6">
          <h1 className="text-2xl font-bold mb-4">Interview Completed</h1>
          <p className="text-muted-foreground">
            Thank you for completing the interview for {interview.jobRole.title}. 
            Our team will review your responses and get back to you soon.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Interview Session</h1>
          <p className="text-muted-foreground">
            Position: {interview.jobRole.title} • Department: {interview.jobRole.department}
          </p>
        </div>

        {/* Welcome Message */}
        {interview.messages?.length === 0 && (
          <div className="mb-6 p-6 bg-muted rounded-lg">
            <h2 className="text-xl font-semibold mb-2">
              Welcome, {interview.candidate.name || 'Candidate'}!
            </h2>
            <p className="text-muted-foreground">
              Thank you for your interest in the {interview.jobRole.title} position. 
              This is a conversational interview where our AI interviewer will ask you 
              questions about your background, experience, and skills. Please answer 
              naturally and feel free to provide detailed responses.
            </p>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>Tips for a great interview:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Be specific about your experiences and achievements</li>
                <li>Provide examples when discussing your skills</li>
                <li>Ask questions if you need clarification</li>
                <li>Take your time to think before responding</li>
              </ul>
            </div>
          </div>
        )}

        {/* Chat Interface */}
        <ChatContainer
          interviewId={interviewId}
          candidateName={interview.candidate.name}
          jobTitle={interview.jobRole.title}
          className="max-w-4xl mx-auto"
        />

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            Interview ID: {interviewId} • 
            This conversation is being recorded for evaluation purposes
          </p>
        </div>
      </div>
    </div>
  )
}