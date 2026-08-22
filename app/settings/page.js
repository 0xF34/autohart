'use client'

import { useState, useEffect } from 'react'

export default function SettingsPage() {
  const [webhook, setWebhook] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [directory, setDirectory] = useState('')
  const [saved, setSaved] = useState(false)

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

  const save = async () => {
    await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ webhookUrl: webhook || undefined, displayName: displayName || undefined })
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-screen p-4 pb-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-xl font-bold mb-6">Settings</h1>

        <div className="bg-card border border-border rounded-xl p-4 mb-4">
          <p className="text-sm text-gray-400 mb-1">Workspace</p>
          <p className="font-semibold">{directory || '...'}</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 mb-4 space-y-3">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Discord Webhook URL</label>
            <input
              type="url"
              value={webhook}
              onChange={(e) => setWebhook(e.target.value)}
              placeholder="https://discord.com/api/webhooks/..."
              className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="AutoHar User"
              className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent"
            />
          </div>
          <button
            onClick={save}
            className="w-full bg-accent text-white rounded-lg py-3 font-semibold"
          >
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>

        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="font-semibold mb-3">Dualhook</h3>
          <p className="text-sm text-gray-400">Configured via environment variables on Vercel.</p>
          <p className="text-xs text-gray-500 mt-1">DUALHOOK_WEBHOOK_URL, DUALHOOK_TELEGRAM_BOT_TOKEN, DUALHOOK_TELEGRAM_USER_ID</p>
        </div>
      </div>
    </div>
  )
}
