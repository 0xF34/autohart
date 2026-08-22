import { decrypt } from './crypto'
import { NextRequest } from 'next/server'

interface SessionData {
  directory: string
  token: string
}

export function getSession(req: NextRequest): SessionData | null {
  const cookie = req.cookies.get('rc_session')
  if (!cookie) return null
  
  const decrypted = decrypt(cookie.value)
  if (!decrypted) return null
  
  try {
    return JSON.parse(decrypted) as SessionData
  } catch {
    return null
  }
}
