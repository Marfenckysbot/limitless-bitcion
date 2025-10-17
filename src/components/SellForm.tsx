import React, { useState } from 'react'

export default function SellForm() {
  const [type, setType] = useState('JEWELRY')
  const [weight, setWeight] = useState<number | ''>('')
  const [karat, setKarat] = useState<number | ''>('')
  const [photos, setPhotos] = useState<File[] | null>(null)
  const [notes, setNotes] = useState('')
  const [quote, setQuote] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      // For now, send to /api/quote/sell (not implemented fully yet)
      const res = await fetch('/api/quote/sell', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'demo-user', items: [{ type, weight, karat, notes }], currency: 'USD' })
      })
      const data = await res.json()
      setQuote(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-charcoal-light rounded-md">
      <h3 className="text-2xl font-semibold text-gold-light mb-4">Sell Your Item</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-300">Item Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className="mt-1 block w-full rounded-md bg-charcoal border border-gold-dark/20 text-white p-2">
            <option value="JEWELRY">Jewelry</option>
            <option value="GOLD_BAR">Gold Bar</option>
            <option value="GOLD_COIN">Gold Coin</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-300">Weight (grams)</label>
          <input type="number" step="0.001" className="mt-1 block w-full rounded-md bg-charcoal border border-gold-dark/20 text-white p-2" value={weight} onChange={(e) => setWeight(e.target.value === '' ? '' : Number(e.target.value))} />
        </div>

        <div>
          <label className="block text-sm text-gray-300">Karat</label>
          <input type="number" className="mt-1 block w-full rounded-md bg-charcoal border border-gold-dark/20 text-white p-2" value={karat} onChange={(e) => setKarat(e.target.value === '' ? '' : Number(e.target.value))} />
        </div>

        <div>
          <label className="block text-sm text-gray-300">Photos</label>
          <input type="file" accept="image/*" multiple className="mt-1 block w-full" onChange={(e) => setPhotos(e.target.files ? Array.from(e.target.files) : null)} />
        </div>

        <div>
          <label className="block text-sm text-gray-300">Notes</label>
          <textarea className="mt-1 block w-full rounded-md bg-charcoal border border-gold-dark/20 text-white p-2" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>

        <div>
          <button type="submit" disabled={loading} className={`w-full py-2 rounded-md ${loading ? 'bg-gold-dark/50' : 'bg-gold-dark hover:bg-gold-light'}`}>
            {loading ? 'Getting Quote...' : 'Get Instant Quote'}
          </button>
        </div>

        {quote && (
          <div className="mt-4 p-4 rounded bg-gold-dark/10 border border-gold-light/20">
            <div className="flex justify-between">
              <span className="text-gray-300">Estimated Offer</span>
              <span className="text-gold-light font-medium">${quote.netAmount?.toFixed(2) ?? '0.00'}</span>
            </div>
            <div className="mt-2 text-sm text-gray-400">Offer valid until: {new Date(quote.expiresAt).toLocaleString()}</div>
          </div>
        )}
      </div>
    </form>
  )
}