import './globals.css'

export const metadata = {
  title: 'AutoHar',
  description: 'Roblox tools'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-bg text-white min-h-screen">{children}</body>
    </html>
  )
}
