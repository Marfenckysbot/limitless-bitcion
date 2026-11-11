import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getBTCQuote } from '@/lib/cryptoProvider'
import { envBool } from '@/lib/env'

const btcConvertSchema = z.object({
  userId: z.string().optional(),
  btcAmount: z.number().positive().max(100),
  payoutMethod: z.enum(['BANK_TRANSFER', 'CASH_PICKUP', 'PREPAID_CARD']),
  preferredProvider: z.enum(['COINBASE', 'BITPAY', 'DIRECT']).optional()
})

export async function POST(request: NextRequest) {
  try {
    if (!envBool('ENABLE_BTC_CONVERSION', false)) {
      return NextResponse.json(
        { error: 'Bitcoin conversion is not enabled', code: 'BTC_CONVERSION_DISABLED' },
        { status: 503 }
      )
    }

    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = btcConvertSchema.parse(await request.json())
    if (data.userId && data.userId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const quote = await getBTCQuote(data.btcAmount, data.preferredProvider)
    return NextResponse.json(quote)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid parameters', details: error.errors },
        { status: 400 }
      )
    }

    if (error instanceof Error && error.message === 'CRYPTO_PROVIDER_NOT_CONFIGURED') {
      return NextResponse.json(
        { error: 'A live conversion provider is not configured', code: 'CRYPTO_PROVIDER_NOT_CONFIGURED' },
        { status: 503 }
      )
    }

    console.error('BTC conversion quote error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
