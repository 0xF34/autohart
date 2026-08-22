'use client'

import { useState } from 'react'

export default function CustomPagesPage() {
  const [theme, setTheme] = useState('default')
  const [feature, setFeature] = useState('Default')
  const [background, setBackground] = useState('none')
  const [saved, setSaved] = useState(false)

  const save = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-screen p-4 pb-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-xl font-bold mb-6">Custom Pages</h1>

        <div className="bg-card border border-border rounded-xl p-4 space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Theme</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent"
            >
              <option value="default">Default</option>
              <option value="midnight">Midnight</option>
              <option value="cyberpunk">Cyberpunk</option>
              <option value="ocean">Ocean</option>
              <option value="forest">Forest</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Feature</label>
            <select
              value={feature}
              onChange={(e) => setFeature(e.target.value)}
              className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent"
            >
              <option>Default</option>
              <option>Clothes Copier</option>
              <option>Copy Games</option>
              <option>Followbot</option>
              <option>Join Anyone</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Background</label>
            <select
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent"
            >
              <option value="none">None</option>
              <option value="orbs">Orbs</option>
              <option value="grid">Grid</option>
              <option value="particles">Particles</option>
              <option value="aurora">Aurora</option>
            </select>
          </div>

          <button
            onClick={save}
            className="w-full bg-accent text-white rounded-lg py-3 font-semibold"
          >
            {saved ? 'Saved!' : 'Save Theme'}
          </button>
        </div>
      </div>
    </div>
  )
}
