'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [token, setToken] = useState('')
  const [showToken, setShowToken] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      })

      const data = await res.json()

      if (data.success) {
        router.push('/dashboard')
      } else {
        setError(data.message)
      }
    } catch {
      setError('Network error')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-center mb-1">Welcome back</h1>
        <p className="text-gray-400 text-center text-sm mb-6">Enter your token to sign in</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label className="block text-sm text-gray-300 mb-2">Token</label>
            <input
              type={showToken ? 'text' : 'password'}
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Paste your token"
              className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowToken(!showToken)}
              className="absolute right-3 top-9 text-gray-400"
            >
              {showToken ? 'Hide' : 'Show'}
            </button>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-semibold rounded-lg py-3 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center my-4 text-gray-500 text-sm">— OR —</div>

        <p className="text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link href="/signup" className="text-accent">Create one</Link>
        </p>
      </div>
    </div>
  )
}
