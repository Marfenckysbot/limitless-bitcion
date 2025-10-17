import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getBTCQuote } from '@/lib/cryptoProvider'

const btcConvertSchema = z.object({
  userId: z.string().optional(),
  btcAmount: z.number().positive(),
  payoutMethod: z.enum(['BANK_TRANSFER', 'CASH_PICKUP', 'PREPAID_CARD']),
  preferredProvider: z.enum(['COINBASE', 'BITPAY', 'DIRECT']).optional()
})

export async function POST(request: NextRequest) {
  try {
  // Allow mock/demo flow when USE_MOCK_PROVIDERS=true
  const { envBool } = await import('@/lib/env')
  const allowUnauthenticated = envBool('USE_MOCK_PROVIDERS', true)
    const session = await getServerSession(authOptions)
    if (!session && !allowUnauthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const data = btcConvertSchema.parse(body)

    const quote = await getBTCQuote(data.btcAmount, data.preferredProvider)

    return NextResponse.json(quote)
  } catch (err) {
    const error = err as any
    if (error && error.errors) {
      return NextResponse.json(
        { error: 'Invalid parameters', details: error.errors },
        { status: 400 }
      )
    }

    console.error('BTC conversion error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}