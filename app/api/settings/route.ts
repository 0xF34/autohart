import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { users } from '@/lib/store'

export async function PUT(req: Request) {
  const session = getSession(req)
  if (!session) return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 })

  const user = users.get(session.directory)
  if (!user) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 })

  const body = await req.json() as {
    webhookUrl?: string
    displayName?: string
  }

  if (body.webhookUrl) (user as any).webhookUrl = body.webhookUrl
  if (body.displayName) (user as any).displayName = body.displayName

  return NextResponse.json({ 
    success: true, 
    user: { 
      directory: (user as any).directory, 
      webhookUrl: (user as any).webhookUrl, 
      displayName: (user as any).displayName 
    } 
  })
}
