type CryptoQuote = {
  quoteId: string
  btcRate: number
  feePercent: number
  feeAmount: number
  fiatAmount: number
  currency: string
  expiresAt: string
  requiredConfirmations: number
}

import { envBool } from './env'

const useMock = envBool('USE_MOCK_PROVIDERS', true)

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
    quoteId: `mock_btc_${Date.now()}`,
    btcRate,
    feePercent,
    feeAmount,
    fiatAmount,
    currency: 'USD',
    expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    requiredConfirmations: 2
  }
}

async function prodGetBTCQuote(btcAmount: number, preferredProvider?: string): Promise<CryptoQuote> {
  // TODO: integrate with BitPay/Coinbase/third-party provider with fallback logic
  // For now, return mock
  return mockGetBTCQuote(btcAmount)
}