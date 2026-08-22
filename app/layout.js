import './globals.css'

export const metadata = {
  title: 'AutoHar - Roblox Extension Platform',
  description: 'Build, manage, and deploy Roblox extensions with ease',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#09090b] text-white antialiased">
        {children}
      </body>
    </html>
  )
}
