import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function Navbar(): React.ReactElement {
  const { data: session } = useSession()

  return (
    <nav className="bg-charcoal border-b border-gold-dark/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-gold-light text-xl font-bold">LuxuryGold</span>
            </Link>

            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/buy" className="text-white hover:text-gold-light px-3 py-2 rounded-md text-sm font-medium">
                Buy
              </Link>
              <Link href="/sell" className="text-white hover:text-gold-light px-3 py-2 rounded-md text-sm font-medium">
                Sell
              </Link>
              <Link href="/convert" className="text-white hover:text-gold-light px-3 py-2 rounded-md text-sm font-medium">
                Convert BTC
              </Link>
              <Link href="/shipping" className="text-white hover:text-gold-light px-3 py-2 rounded-md text-sm font-medium">
                Shipping
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            {session ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="text-white hover:text-gold-light px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-white hover:text-gold-light px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link href="/auth/signin" className="text-white hover:text-gold-light px-3 py-2 rounded-md text-sm font-medium">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}