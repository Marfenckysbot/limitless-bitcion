import Link from 'next/link'

export default function Home() {
  const sections = [
    {
      href: '/buy',
      title: 'Explore the catalog',
      description: 'Product catalog and verified listings are being prepared.',
    },
    {
      href: '/sell',
      title: 'Sell with us',
      description: 'Seller onboarding and verification are not open yet.',
    },
    {
      href: '/convert',
      title: 'Bitcoin conversion',
      description: 'Conversion is disabled until a live provider and settlement flow are approved.',
    },
    {
      href: '/shipping',
      title: 'Shipping services',
      description: 'Carrier and insurance services are still being evaluated.',
    },
  ]

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="mx-auto max-w-6xl text-center">
        <h1 className="mb-6 text-5xl font-bold animate-fade-in">
          Premium Gold &amp; Jewelry Marketplace
        </h1>
        <p className="mb-12 text-xl animate-slide-up">
          Explore the marketplace concept for precious metals and fine jewelry.
          Buying, selling, conversion and shipping transactions are not yet enabled.
        </p>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="rounded-lg bg-gold-dark p-6 text-white transition-colors duration-300 hover:bg-gold-light hover:text-charcoal"
            >
              <h2 className="mb-2 text-xl font-semibold">{section.title}</h2>
              <p>{section.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
