import Link from 'next/link'

export default function AuthErrorPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl items-center px-6 py-16">
      <section className="w-full rounded-xl border border-charcoal-light bg-charcoal p-8">
        <h1 className="text-3xl font-bold text-gold-light">Sign-in could not be completed</h1>
        <p className="mt-4 text-gray-300">
          Please return to the sign-in page and try again. If the problem continues, account
          access may not yet be configured for this preview.
        </p>
        <Link href="/auth/signin" className="mt-8 inline-block rounded-md bg-gold-dark px-5 py-3 font-semibold text-white hover:bg-gold-light hover:text-charcoal">
          Return to sign in
        </Link>
      </section>
    </main>
  )
}
