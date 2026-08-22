import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold mb-4">AutoHar</h1>
        <p className="text-gray-400 mb-6">Roblox cookie collection platform</p>
        <div className="flex gap-3 justify-center">
          <Link href="/signup" className="bg-white text-black font-semibold rounded-lg px-6 py-3">
            Create Account
          </Link>
          <Link href="/login" className="bg-card border border-border font-semibold rounded-lg px-6 py-3">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}
