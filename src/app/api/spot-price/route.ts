import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const spotPriceSchema = z.object({
  asset: z.enum(['gold', 'btc']),
})

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const parsed = spotPriceSchema.parse({
      asset: searchParams.get('asset'),
    })

    // TODO: Implement real price fetching from CoinGecko
    const mockPrices = {
      gold: 1950.25,
      btc: 46850.12,
    }

    return NextResponse.json({
      asset: parsed.asset,
      price: mockPrices[parsed.asset],
      currency: 'USD',
      timestamp: Date.now(),
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid parameters', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
