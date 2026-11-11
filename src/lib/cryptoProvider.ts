export type CryptoQuote = {
  quoteId: string
  btcRate: number
  feePercent: number
  feeAmount: number
  fiatAmount: number
  currency: string
  expiresAt: string
  requiredConfirmations: number
  mode: 'DEMO'
}

import { envBool } from './env'

// Live conversion is disabled by default. Mock quotes must be explicitly
// enabled and are labelled DEMO so they cannot be mistaken for market prices.
const useMock = envBool('USE_MOCK_PROVIDERS', false)

export async function getBTCQuote(btcAmount: number, preferredProvider?: string): Promise<CryptoQuote> {
  if (useMock) return mockGetBTCQuote(btcAmount)
  return prodGetBTCQuote(btcAmount, preferredProvider)
}

function mockGetBTCQuote(btcAmount: number): CryptoQuote {
  const btcRate = 46850.12
  const feePercent = 0.0075
  const feeAmount = btcAmount * btcRate * feePercent
  const fiatAmount = (btcAmount * btcRate) - feeAmount
  return {
    quoteId: `demo_btc_${Date.now()}`,
    btcRate,
    feePercent,
    feeAmount,
    fiatAmount,
    currency: 'USD',
    expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    requiredConfirmations: 2,
    mode: 'DEMO'
  }
}

async function prodGetBTCQuote(_btcAmount: number, _preferredProvider?: string): Promise<CryptoQuote> {
  // A production provider and settlement flow have not been integrated.
  throw new Error('CRYPTO_PROVIDER_NOT_CONFIGURED')
}
