import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { users } from '../create/route'

export async function PUT(req) {
  const session = getSession(req)
  if (!session) return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 })

  const user = users.get(session.directory)
  if (!user) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 })

  const body = await req.json()

  if (body.webhookUrl) user.webhookUrl = body.webhookUrl
  if (body.displayName) user.displayName = body.displayName

  return NextResponse.json({ success: true, user: { directory: user.directory, webhookUrl: user.webhookUrl, displayName: user.displayName } })
}
