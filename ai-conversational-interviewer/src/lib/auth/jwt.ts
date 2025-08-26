import jwt from 'jsonwebtoken'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export interface JWTPayload {
  sub: string // user ID
  email: string
  role: string
  iat: number
  exp: number
}

export function generateSocketToken(userId: string, email: string, role: string): string {
  const payload: Omit<JWTPayload, 'iat' | 'exp'> = {
    sub: userId,
    email,
    role,
  }

  return jwt.sign(payload, process.env.NEXTAUTH_SECRET!, {
    expiresIn: '24h',
    issuer: 'acs-interviewer',
    audience: 'socket-client',
  })
}

export function verifySocketToken(token: string): JWTPayload {
  try {
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!, {
      issuer: 'acs-interviewer',
      audience: 'socket-client',
    }) as JWTPayload

    return decoded
  } catch (error) {
    throw new Error('Invalid token')
  }
}

export async function getSocketTokenFromSession(): Promise<string | null> {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id || !session.user.email) {
      return null
    }

    return generateSocketToken(
      session.user.id,
      session.user.email,
      session.user.role || 'CANDIDATE'
    )
  } catch (error) {
    console.error('Error generating socket token:', error)
    return null
  }
}