import { useState } from 'react'
import { z } from 'zod'

const shippingFormSchema = z.object({
  tier: z.enum(['STANDARD', 'WHITE_GLOVE', 'VIP', 'VAULT', 'INTERNATIONAL']),
  declaredValue: z.number().positive(),
  pickupWindow: z.string(),
  address: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    zip: z.string().min(1),
    country: z.string().min(1),
  }),
})

type ShippingFormData = z.infer<typeof shippingFormSchema>

export default function ShippingService() {
  const [formData, setFormData] = useState<Partial<ShippingFormData>>({})
  const [loading, setLoading] = useState(false)
  const [quote, setQuote] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const tiers = [
    {
      id: 'STANDARD',
      name: 'Standard Insured Mail',
      description: 'Secure packaging with tracking and insurance',
      features: ['Tamper-evident packaging', 'Insurance up to declared value', 'Tracking updates'],
    },
    {
      id: 'WHITE_GLOVE',
      name: 'White Glove Pickup',
      description: 'Premium service with bonded courier',
      features: ['Professional courier pickup', 'Identity verification', 'Real-time tracking'],
    },
    {
      id: 'VIP',
      name: 'VIP On-Site Collection',
      description: 'Ultimate security with armored transport',
      features: ['Armored vehicle', 'Two-person team', 'Live video handoff'],
    },
    {
      id: 'VAULT',
      name: 'Vault Transfer',
      description: 'Secure storage solution',
      features: ['Climate-controlled vault', 'Regular audits', '24/7 monitoring'],
    },
    {
      id: 'INTERNATIONAL',
      name: 'International & Duty',
      description: 'Cross-border shipping with customs handling',
      features: ['Customs clearance', 'Duty calculation', 'International insurance'],
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/shipments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to get shipping quote')
      }

      const data = await response.json()
      setQuote(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-gold-light mb-8">Secure Shipping Service</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Select Shipping Tier</h3>
          <div className="space-y-4">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  formData.tier === tier.id
                    ? 'border-gold-light bg-gold-dark/10'
                    : 'border-charcoal-light hover:border-gold-light/50'
                }`}
                onClick={() => setFormData({ ...formData, tier: tier.id as ShippingFormData['tier'] })}
              >
                <h4 className="text-lg font-medium text-gold-light">{tier.name}</h4>
                <p className="text-sm text-gray-300 mt-1">{tier.description}</p>
                <ul className="mt-2 space-y-1">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-400">
                      • {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Shipping Details</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Declared Value (USD)
              </label>
              <input
                type="number"
                required
                min="1"
                step="0.01"
                className="mt-1 block w-full rounded-md bg-charcoal-light border-gold-dark/30 text-white"
                value={formData.declaredValue || ''}
                onChange={(e) => setFormData({ ...formData, declaredValue: parseFloat(e.target.value) })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Preferred Pickup Window
              </label>
              <input
                type="datetime-local"
                required
                className="mt-1 block w-full rounded-md bg-charcoal-light border-gold-dark/30 text-white"
                value={formData.pickupWindow || ''}
                onChange={(e) => setFormData({ ...formData, pickupWindow: e.target.value })}
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-300">
                Pickup Address
              </label>
              <input
                type="text"
                placeholder="Street Address"
                required
                className="block w-full rounded-md bg-charcoal-light border-gold-dark/30 text-white"
                value={formData.address?.street || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: { ...formData.address, street: e.target.value },
                  })
                }
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="City"
                  required
                  className="block w-full rounded-md bg-charcoal-light border-gold-dark/30 text-white"
                  value={formData.address?.city || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, city: e.target.value },
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="State"
                  required
                  className="block w-full rounded-md bg-charcoal-light border-gold-dark/30 text-white"
                  value={formData.address?.state || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, state: e.target.value },
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="ZIP Code"
                  required
                  className="block w-full rounded-md bg-charcoal-light border-gold-dark/30 text-white"
                  value={formData.address?.zip || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, zip: e.target.value },
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Country"
                  required
                  className="block w-full rounded-md bg-charcoal-light border-gold-dark/30 text-white"
                  value={formData.address?.country || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, country: e.target.value },
                    })
                  }
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-md text-white font-medium ${
                loading
                  ? 'bg-gold-dark/50 cursor-not-allowed'
                  : 'bg-gold-dark hover:bg-gold-light hover:text-charcoal'
              }`}
            >
              {loading ? 'Getting Quote...' : 'Get Shipping Quote'}
            </button>
          </form>

          {quote && (
            <div className="mt-6 p-4 rounded-lg bg-gold-dark/10 border border-gold-light/30">
              <h4 className="text-lg font-medium text-gold-light mb-2">Shipping Quote</h4>
              <dl className="space-y-1">
                <div className="flex justify-between">
                  <dt className="text-gray-400">Base Fee:</dt>
                  <dd className="text-white">${quote.quote.baseFee.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Insurance:</dt>
                  <dd className="text-white">${quote.quote.percentFeeAmount.toFixed(2)}</dd>
                </div>
                {quote.quote.sameDaySurcharge > 0 && (
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Same-Day Surcharge:</dt>
                    <dd className="text-white">${quote.quote.sameDaySurcharge.toFixed(2)}</dd>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-gold-dark/30">
                  <dt className="text-gray-300 font-medium">Total:</dt>
                  <dd className="text-gold-light font-medium">
                    ${quote.quote.total.toFixed(2)}
                  </dd>
                </div>
              </dl>
              <div className="mt-4 text-sm text-gray-400">
                Quote valid until: {new Date(quote.expiresAt).toLocaleString()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}