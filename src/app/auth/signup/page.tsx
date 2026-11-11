import Link from 'next/link'

export default function SignUpPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl items-center px-6 py-16">
      <section className="w-full rounded-xl border border-charcoal-light bg-charcoal p-8">
        <h1 className="text-3xl font-bold text-gold-light">Registration is not open yet</h1>
        <p className="mt-4 text-gray-300">
          New account creation is paused while email verification, abuse prevention and account
          recovery are completed. No registration details are collected on this page.
        </p>
        <Link href="/auth/signin" className="mt-8 inline-block rounded-md bg-gold-dark px-5 py-3 font-semibold text-white hover:bg-gold-light hover:text-charcoal">
          Back to sign in
        </Link>
      </section>
    </main>
  )
}
