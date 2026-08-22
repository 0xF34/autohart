'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Sparkles, Globe, UserPlus, ArrowRight, CheckCircle } from 'lucide-react'

interface FormData {
  directory: string
  webhook: string
}

export default function SignupPage() {
  const [formData, setFormData] = useState<FormData>({
    directory: '',
    webhook: ''
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          directory: formData.directory, 
          webhookUrl: formData.webhook 
        })
      })

      const data = await res.json()

      if (data.success) {
        setSuccess(true)
        setTimeout(() => router.push('/dashboard'), 2000)
      } else {
        setError(data.message || 'Failed to create workspace')
      }
    } catch {
      setError('Network error - please try again')
    }

    setLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/10" />
        
        <div className="relative z-10 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/25 animate-bounce">
            <CheckCircle size={48} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Workspace Created!</h1>
          <p className="text-gray-400">Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10" />
      <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px]" />

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 rounded-2xl flex items-center justify-center font-bold text-3xl mx-auto mb-5 shadow-2xl shadow-blue-500/25">
            <UserPlus size={36} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Create Workspace</h1>
          <p className="text-gray-400 flex items-center justify-center gap-2">
            <Sparkles size={16} className="text-yellow-400" />
            Set up your AutoHar environment
          </p>
        </div>

        {/* Signup Card */}
        <div className="bg-[#111]/80 border border-[#27272a] rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Directory Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Workspace Name
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  <Globe size={18} />
                </div>
                <input
                  type="text"
                  value={formData.directory}
                  onChange={(e) => setFormData({...formData, directory: e.target.value})}
                  placeholder="Choose a unique name..."
                  className="w-full bg-[#09090b] border border-[#27272a] rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  required
                />
              </div>
              <p className="text-xs text-gray-500">This will be your unique workspace identifier</p>
            </div>

            {/* Webhook URL */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Discord Webhook URL
              </label>
              <input
                type="url"
                value={formData.webhook}
                onChange={(e) => setFormData({...formData, webhook: e.target.value})}
                placeholder="https://discord.com/api/webhooks/..."
                className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-mono text-sm"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3.5 rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create Workspace
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[#27272a]" />
            <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Or</span>
            <div className="flex-1 h-px bg-[#27272a]" />
          </div>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-400">
            Already have a workspace?{' '}
            <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors inline-flex items-center gap-1">
              Sign in →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
