import { NextResponse } from 'next/server'
import { encrypt } from '@/lib/crypto'
import { users } from '../create/route'

export async function POST(req) {
  const { token } = await req.json()

  if (!token) {
    return NextResponse.json({ success: false, message: 'Token required' }, { status: 400 })
  }

  let found = null
  for (const [dir, user] of users) {
    if (user.token === token) {
      found = user
      break
    }
  }

  if (!found) {
    return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 })
  }

  const session = encrypt(JSON.stringify({ directory: found.directory, token }))
  const res = NextResponse.json({
    success: true,
    user: {
      directory: found.directory,
      displayName: found.displayName,
      hits: found.hits,
      rap: found.rap
    }
  })
  res.cookies.set('rc_session', session, { httpOnly: true, maxAge: 60 * 60 * 24 * 30, path: '/' })
  return res
}
