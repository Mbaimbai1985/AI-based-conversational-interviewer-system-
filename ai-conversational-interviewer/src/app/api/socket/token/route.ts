import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { generateSocketToken } from '@/lib/auth/jwt'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id || !session.user.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const token = generateSocketToken(
      session.user.id,
      session.user.email,
      session.user.role || 'CANDIDATE'
    )

    return NextResponse.json({ token })
  } catch (error) {
    console.error('Error generating socket token:', error)
    return NextResponse.json(
      { error: 'Failed to generate token' },
      { status: 500 }
    )
  }
}