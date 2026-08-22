import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { users } from '@/lib/store'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const action = url.searchParams.get('action')

  if (action === 'leaderboard') {
    const all = Array.from(users.values())
    const sorted = all.sort((a: any, b: any) => b.hits - a.hits || b.rap - a.rap)
    const leaderboard = sorted.map((u: any, i: number) => ({
      directory: u.directory,
      displayName: u.displayName,
      hits: u.hits,
      rap: u.rap,
      rank: i + 1,
      level: getLevel(u.hits)
    }))
    return NextResponse.json({
      success: true,
      leaderboard,
      stats: {
        totalUsers: all.length,
        totalHits: all.reduce((s: number, u: any) => s + u.hits, 0),
        totalRap: all.reduce((s: number, u: any) => s + u.rap, 0)
      }
    })
  }

  const session = getSession(req)
  if (!session) return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 })

  const user = users.get(session.directory)
  if (!user) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 })

  return NextResponse.json({
    success: true,
    stats: {
      hits: (user as any).hits,
      rap: (user as any).rap,
      cookies: (user as any).cookies.length
    }
  })
}

function getLevel(hits: number): string {
  if (hits >= 1000) return 'Legend'
  if (hits >= 500) return 'Diamond'
  if (hits >= 100) return 'Platinum'
  if (hits >= 50) return 'Gold'
  if (hits >= 25) return 'Silver'
  if (hits >= 10) return 'Bronze'
  return 'Rookie'
}
