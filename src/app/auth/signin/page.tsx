'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('The email or password was not accepted.')
        return
      }

      window.location.assign(result?.url || '/')
    } catch {
      setError('Sign-in is temporarily unavailable. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-6 py-16">
      <section className="w-full rounded-xl border border-charcoal-light bg-charcoal p-8">
        <h1 className="text-3xl font-bold text-gold-light">Sign in</h1>
        <p className="mt-2 text-sm text-gray-400">Access an existing LuxuryGold preview account.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm text-gray-300">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-md border border-charcoal-light bg-charcoal-light px-3 py-2 text-white"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block text-sm text-gray-300">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-md border border-charcoal-light bg-charcoal-light px-3 py-2 text-white"
            />
          </div>
          {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-gold-dark px-4 py-3 font-semibold text-white hover:bg-gold-light hover:text-charcoal disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
          {process.env.NEXT_PUBLIC_GOOGLE_LOGIN_ENABLED === 'true' && (
            <button
              type="button"
              onClick={() => signIn('google', { callbackUrl: '/' })}
              className="w-full rounded-md border border-charcoal-light px-4 py-3 font-semibold text-white hover:border-gold-light"
            >
              Continue with Google
            </button>
          )}
        </form>
        <p className="mt-6 text-sm text-gray-400">
          New account registration is currently paused. <Link href="/auth/signup" className="text-gold-light underline">Learn more</Link>.
        </p>
      </section>
    </main>
  )
}
