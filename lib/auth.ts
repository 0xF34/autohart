import { decrypt } from './crypto'

interface SessionData {
  directory: string
  token: string
}

export function getSession(req: Request): SessionData | null {
  const cookieHeader = req.headers.get('cookie') || ''
  const sessionMatch = cookieHeader.match(/rc_session=([^;]+)/)
  if (!sessionMatch) return null
  
  const cookie = decodeURIComponent(sessionMatch[1])
  if (!cookie) return null
  
  const decrypted = decrypt(cookie)
  if (!decrypted) return null
  
  try {
    return JSON.parse(decrypted) as SessionData
  } catch {
    return null
  }
}
