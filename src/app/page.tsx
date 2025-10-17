import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 animate-fade-in">
          Premium Gold & Jewelry Marketplace
        </h1>
        <p className="text-xl mb-12 animate-slide-up">
          Buy & sell precious metals with confidence. Secure shipping and Bitcoin conversion available.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <Link href="/buy" className="bg-gold-dark hover:bg-gold-light text-white hover:text-charcoal p-6 rounded-lg transition-colors duration-300">
            <h2 className="text-xl font-semibold mb-2">Buy Gold & Jewelry</h2>
            <p>Browse our curated collection</p>
          </Link>
          
          <Link href="/sell" className="bg-gold-dark hover:bg-gold-light text-white hover:text-charcoal p-6 rounded-lg transition-colors duration-300">
            <h2 className="text-xl font-semibold mb-2">Sell Your Gold</h2>
            <p>Get instant quotes and quick payouts</p>
          </Link>
          
          <Link href="/convert" className="bg-gold-dark hover:bg-gold-light text-white hover:text-charcoal p-6 rounded-lg transition-colors duration-300">
            <h2 className="text-xl font-semibold mb-2">Convert BTC</h2>
            <p>Fast & secure crypto conversion</p>
          </Link>
          
          <Link href="/shipping" className="bg-gold-dark hover:bg-gold-light text-white hover:text-charcoal p-6 rounded-lg transition-colors duration-300">
            <h2 className="text-xl font-semibold mb-2">Secure Shipping</h2>
            <p>Premium insured delivery service</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
