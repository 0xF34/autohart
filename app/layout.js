import './globals.css'

export const metadata = {
  title: 'AutoHar',
  description: 'Roblox tools'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="min-h-screen">
      <body className="bg-bg text-white min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}
