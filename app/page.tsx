'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Zap, Shield, Sparkles, Github, Rocket } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px]" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow">
              A
            </div>
            <span className="text-xl font-bold tracking-tight">AutoHar</span>
          </Link>
          
          <div className="flex items-center gap-3">
            <a 
              href="https://github.com/0xF34/autohart" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-[#27272a] hover:bg-[#18181b] hover:border-[#3f3f46] transition-all hover:scale-105"
            >
              <Github size={20} />
            </a>
            <Link 
              href="/login"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#18181b] border border-[#27272a] rounded-xl text-sm font-medium hover:bg-[#27272a] transition-all"
            >
              Sign In
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#18181b]/80 border border-[#27272a] backdrop-blur-sm mb-8">
              <Sparkles size={16} className="text-yellow-400" />
              <span className="text-sm text-gray-300 font-medium">Roblox Extension Platform v2.0</span>
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Build & Deploy
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Roblox Extensions
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              The ultimate platform for creating, managing, and deploying Roblox extensions. 
              Beautiful dashboard, powerful tools, instant deployment.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link 
                href="/create"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-2xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl shadow-white/20 hover:shadow-white/30"
              >
                <Rocket size={20} />
                Get Started Free
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/login"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#18181b] border border-[#27272a] text-white font-semibold rounded-2xl hover:bg-[#27272a] hover:border-[#3f3f46] transition-all"
              >
                Sign In to Dashboard
              </Link>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
              <div className="group p-6 rounded-2xl bg-[#111]/60 border border-[#27272a] backdrop-blur-sm hover:border-blue-500/50 hover:bg-[#111]/80 transition-all">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform mx-auto">
                  <Zap size={24} className="text-yellow-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Lightning Fast</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Instant deployment with real-time previews and zero latency</p>
              </div>
              
              <div className="group p-6 rounded-2xl bg-[#111]/60 border border-[#27272a] backdrop-blur-sm hover:border-purple-500/50 hover:bg-[#111]/80 transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform mx-auto">
                  <Shield size={24} className="text-blue-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Secure by Default</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Token-based auth with enterprise-grade encryption</p>
              </div>
              
              <div className="group p-6 rounded-2xl bg-[#111]/60 border border-[#27272a] backdrop-blur-sm hover:border-green-500/50 hover:bg-[#111]/80 transition-all">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform mx-auto">
                  <Sparkles size={24} className="text-purple-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Beautiful UI</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Professional dark theme with smooth animations</p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-6 text-center">
          <p className="text-gray-600 text-sm">
            Built with ❤️ for Roblox developers • AutoHar © 2026
          </p>
        </footer>
      </div>
    </div>
  )
}
