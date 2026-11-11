const plannedServices = [
  {
    title: 'Standard delivery',
    description: 'A future option for ordinary parcel delivery with carrier tracking.',
  },
  {
    title: 'Insured handling',
    description: 'A future option subject to a confirmed insurer, policy terms and eligibility.',
  },
  {
    title: 'International shipping',
    description: 'A future option subject to carrier coverage, customs rules, duties and destination restrictions.',
  },
]

export default function ShippingService() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gold-light">Shipping services are not live yet</h1>
      <p className="mt-4 max-w-3xl text-gray-300">
        We are evaluating shipping and insurance providers. No shipment can currently be booked,
        insured, tracked or collected through this website. Do not enter an address or pay a
        shipping fee here.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {plannedServices.map((service) => (
          <article key={service.title} className="rounded-lg border border-charcoal-light p-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gold-light">Planned</p>
            <h2 className="text-lg font-semibold text-white">{service.title}</h2>
            <p className="mt-2 text-sm text-gray-400">{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
