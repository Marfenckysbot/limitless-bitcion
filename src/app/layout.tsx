import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LuxuryGold - Premium Jewelry Marketplace',
  description: 'Buy & sell gold and fine jewelry with secure shipping and Bitcoin conversion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-gradient-to-b from-charcoal to-charcoal-light text-white">
          {children}
        </main>
      </body>
    </html>
  )
}
