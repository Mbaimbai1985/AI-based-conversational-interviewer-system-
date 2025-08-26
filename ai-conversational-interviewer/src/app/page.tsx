import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Bot, Users, BarChart3, Zap } from 'lucide-react'
import Link from 'next/link'

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bot className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">ACS Interviewer</span>
          </div>
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <Button variant="outline" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/api/auth/signout">Sign Out</Link>
                </Button>
              </>
            ) : (
              <Button asChild>
                <Link href="/api/auth/signin">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            AI-Powered Conversational
            <span className="text-primary block">Interviewer</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Transform your hiring process with intelligent AI interviews that assess candidates 
            naturally through conversation, extracting skills and building comprehensive profiles automatically.
          </p>
          
          {session ? (
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/dashboard/interviews/new">Start New Interview</Link>
              </Button>
            </div>
          ) : (
            <Button size="lg" asChild>
              <Link href="/api/auth/signin">Get Started</Link>
            </Button>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose ACS Interviewer?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Bot className="h-12 w-12 text-primary mb-4" />
                <CardTitle>AI-Powered Conversations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Natural language processing creates engaging, context-aware conversations 
                  that feel human while gathering comprehensive candidate data.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Automated Profiling</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Automatically extract skills, experience, and qualifications from 
                  conversations to build detailed candidate profiles.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Smart Scoring</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Advanced algorithms evaluate communication skills, technical knowledge, 
                  and cultural fit to provide comprehensive candidate scoring.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Real-time Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get instant feedback and insights during interviews with live 
                  scoring and candidate profile updates.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Set Up Interview</h3>
              <p className="text-muted-foreground">
                Create a new interview session with job requirements and candidate details. 
                The AI adapts questions based on the role.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Conversation</h3>
              <p className="text-muted-foreground">
                Candidates engage in natural conversation with our AI interviewer, 
                which asks relevant follow-up questions and builds rapport.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Results</h3>
              <p className="text-muted-foreground">
                Review comprehensive candidate profiles, scores, and insights 
                to make informed hiring decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4 text-center text-muted-foreground">
        <div className="container mx-auto">
          <p>&copy; 2024 ACS Interviewer. Built with Next.js and AI.</p>
        </div>
      </footer>
    </div>
  )
}
