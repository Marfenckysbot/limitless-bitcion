import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { envBool } from '@/lib/env'

const spotPriceSchema = z.object({
  asset: z.enum(['gold', 'btc']),
})

export async function GET(request: NextRequest) {
  try {
    const parsed = spotPriceSchema.parse({
      asset: request.nextUrl.searchParams.get('asset'),
    })

    if (!envBool('USE_MOCK_PROVIDERS', false)) {
      return NextResponse.json(
        { error: 'Live market data provider is not configured', code: 'MARKET_DATA_NOT_CONFIGURED' },
        { status: 503 }
      )
    }

    // Development-only sample values. Never represent these as live market data.
    const demoPrices = { gold: 1950.25, btc: 46850.12 }

    return NextResponse.json({
      asset: parsed.asset,
      price: demoPrices[parsed.asset],
      currency: 'USD',
      timestamp: Date.now(),
      mode: 'DEMO',
      disclaimer: 'Sample development value only; not a live market quote.'
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid parameters', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
