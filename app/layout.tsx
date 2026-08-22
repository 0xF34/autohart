import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AutoHar - Roblox Extension Platform',
  description: 'Build, manage, and deploy Roblox extensions with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#09090b] text-white antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}
