import React, { useState } from 'react'

export default function BTCConvert() {
  const [btcAmount, setBtcAmount] = useState<number | ''>('')
  const [quote, setQuote] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function requestQuote() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/btc-convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'demo-user', btcAmount: Number(btcAmount), payoutMethod: 'BANK_TRANSFER' })
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err?.message || 'Failed to fetch quote')
      }

      const data = await res.json()
      setQuote(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-charcoal-light rounded-md">
      <h3 className="text-2xl font-semibold text-gold-light mb-4">Convert Bitcoin to Cash</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-300">BTC Amount</label>
          <input
            type="number"
            step="0.0001"
            min="0"
            className="mt-1 block w-full rounded-md bg-charcoal border border-gold-dark/20 text-white p-2"
            value={btcAmount}
            onChange={(e) => setBtcAmount(e.target.value === '' ? '' : Number(e.target.value))}
          />
        </div>

        <div>
          <button
            onClick={requestQuote}
            disabled={loading || btcAmount === ''}
            className={`w-full py-2 rounded-md ${loading ? 'bg-gold-dark/50' : 'bg-gold-dark hover:bg-gold-light'}`}
          >
            {loading ? 'Getting quote...' : 'Get Quote'}
          </button>
        </div>

        {error && <div className="text-red-400">{error}</div>}

        {quote && (
          <div className="mt-4 p-4 rounded bg-gold-dark/10 border border-gold-light/20">
            <div className="flex justify-between">
              <span className="text-gray-300">Rate</span>
              <span className="text-white">${quote.btcRate.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-gray-300">Fees</span>
              <span className="text-white">${quote.feeAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mt-2 border-t border-gold-dark/20 pt-2">
              <span className="text-gray-300 font-medium">You will receive</span>
              <span className="text-gold-light font-medium">${quote.fiatAmount.toFixed(2)}</span>
            </div>
            <div className="mt-2 text-sm text-gray-400">Quote valid until: {new Date(quote.expiresAt).toLocaleString()}</div>
          </div>
        )}
      </div>
    </div>
  )
}