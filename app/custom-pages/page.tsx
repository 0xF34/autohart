'use client'

import { useState } from 'react'
import { Palette, Save, CheckCircle, Sparkles, Wand2, Layers } from 'lucide-react'

export default function CustomPagesPage() {
  const [theme, setTheme] = useState<string>('default')
  const [feature, setFeature] = useState<string>('Default')
  const [background, setBackground] = useState<string>('none')
  const [saved, setSaved] = useState<boolean>(false)

  const handleSave = (): void => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const themes = [
    { value: 'default', label: 'Default', color: '#3b82f6' },
    { value: 'midnight', label: 'Midnight', color: '#6366f1' },
    { value: 'cyberpunk', label: 'Cyberpunk', color: '#ec4899' },
    { value: 'ocean', label: 'Ocean', color: '#06b6d4' },
    { value: 'forest', label: 'Forest', color: '#22c55e' }
  ]

  const features = [
    'Default',
    'Clothes Copier',
    'Copy Games',
    'Followbot',
    'Join Anyone'
  ]

  const backgrounds = [
    { value: 'none', label: 'None', icon: '✖️' },
    { value: 'orbs', label: 'Orbs', icon: '🔮' },
    { value: 'grid', label: 'Grid', icon: '▦' },
    { value: 'particles', label: 'Particles', icon: '✨' },
    { value: 'aurora', label: 'Aurora', icon: '🌌' }
  ]

  return (
    <div className="min-h-screen bg-[#09090b] p-4 pb-24">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
            <Palette size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Custom Pages</h1>
            <p className="text-xs text-gray-500">Personalize your tool pages</p>
          </div>
        </div>

        {/* Customization Card */}
        <div className="bg-[#111] border border-[#27272a] rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 text-sm text-gray-400 bg-[#09090b] rounded-xl p-3">
            <Wand2 size={16} className="text-purple-400" />
            Customize how your tool pages appear to users
          </div>

          {/* Theme Selector */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
              <Layers size={16} className="text-blue-400" />
              Theme Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {themes.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTheme(t.value)}
                  className={`p-4 rounded-xl border transition-all ${
                    theme === t.value 
                      ? 'border-blue-500 bg-blue-500/10' 
                      : 'border-[#27272a] bg-[#09090b] hover:border-[#3f3f46]'
                  }`}
                >
                  <div 
                    className="w-8 h-8 rounded-full mx-auto mb-2"
                    style={{ backgroundColor: t.color }}
                  />
                  <p className="text-sm font-medium">{t.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Feature Selector */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">
              Default Feature
            </label>
            <select
              value={feature}
              onChange={(e) => setFeature(e.target.value)}
              className="w-full bg-[#09090b] border border-[#27272a] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer"
            >
              {features.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          {/* Background Selector */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">
              Background Effect
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {backgrounds.map((b) => (
                <button
                  key={b.value}
                  onClick={() => setBackground(b.value)}
                  className={`p-3 rounded-xl border transition-all ${
                    background === b.value 
                      ? 'border-purple-500 bg-purple-500/10' 
                      : 'border-[#27272a] bg-[#09090b] hover:border-[#3f3f46]'
                  }`}
                >
                  <span className="text-2xl block mb-1">{b.icon}</span>
                  <p className="text-xs font-medium">{b.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold py-4 rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25"
          >
            {saved ? (
              <>
                <CheckCircle size={20} />
                Theme Saved!
              </>
            ) : (
              <>
                <Save size={20} />
                Save Theme
              </>
            )}
          </button>
        </div>

        {/* Preview Notice */}
        <div className="mt-6 bg-[#111] border border-[#27272a] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles size={20} className="text-yellow-400" />
            <h3 className="font-semibold">Preview</h3>
          </div>
          <p className="text-sm text-gray-400">
            Changes will be reflected on your tool pages immediately after saving. 
            Users visiting your links will see the customized version.
          </p>
        </div>
      </div>
    </div>
  )
}
