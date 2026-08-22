'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Zap, Shield, Sparkles, Github } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#09090b] text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-xl">
              A
            </div>
            <span className="text-xl font-bold">AutoHar</span>
          </div>
          <div className="flex gap-3">
            <a 
              href="https://github.com/0xF34/autohart" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-[#27272a] hover:bg-[#18181b] transition-colors"
            >
              <Github size={20} />
            </a>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#18181b] border border-[#27272a] mb-8">
              <Sparkles size={16} className="text-yellow-400" />
              <span className="text-sm text-gray-300">Roblox Extension Platform v2.0</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Build & Deploy
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Roblox Extensions
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              The ultimate platform for creating, managing, and deploying Roblox extensions. 
              Beautiful dashboard, powerful tools, instant deployment.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                href="/create"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg shadow-white/20"
              >
                Get Started Free
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/login"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#18181b] border border-[#27272a] text-white font-semibold rounded-xl hover:bg-[#27272a] transition-all"
              >
                Sign In
              </Link>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="p-5 rounded-xl bg-[#111]/50 border border-[#27272a] backdrop-blur-sm hover:border-blue-500/50 transition-colors">
                <Zap size={24} className="text-yellow-400 mb-3 mx-auto" />
                <h3 className="font-semibold text-white mb-1">Lightning Fast</h3>
                <p className="text-sm text-gray-400">Instant deployment and real-time previews</p>
              </div>
              <div className="p-5 rounded-xl bg-[#111]/50 border border-[#27272a] backdrop-blur-sm hover:border-purple-500/50 transition-colors">
                <Shield size={24} className="text-blue-400 mb-3 mx-auto" />
                <h3 className="font-semibold text-white mb-1">Secure by Default</h3>
                <p className="text-sm text-gray-400">Token-based auth with encrypted storage</p>
              </div>
              <div className="p-5 rounded-xl bg-[#111]/50 border border-[#27272a] backdrop-blur-sm hover:border-green-500/50 transition-colors">
                <Sparkles size={24} className="text-purple-400 mb-3 mx-auto" />
                <h3 className="font-semibold text-white mb-1">Beautiful UI</h3>
                <p className="text-sm text-gray-400">Professional dark theme with animations</p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-6 text-center text-gray-500 text-sm border-t border-[#27272a]">
          <p>Built with ❤️ for Roblox developers • AutoHar © 2026</p>
        </footer>
      </div>
    </div>
  );
}
