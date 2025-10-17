import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const shipmentCreateSchema = z.object({
  userId: z.string(),
  items: z.array(z.object({
    type: z.string(),
    description: z.string().optional(),
  })),
  declaredValue: z.number().positive(),
  tier: z.enum(['STANDARD', 'WHITE_GLOVE', 'VIP', 'VAULT', 'INTERNATIONAL']),
  pickupWindow: z.string().datetime(),
  kycId: z.string(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.string(),
    country: z.string(),
  }),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = shipmentCreateSchema.parse(body)

    const baseFee = Math.max(25, data.declaredValue * 0.01)
    const surcharge = data.tier === 'VIP' ? baseFee * 0.5 : 0

    // TODO: Implement real shipment creation with Prisma
    return NextResponse.json({
      shipmentId: `ship_${Date.now()}`,
      quote: {
        baseFee,
        percentFee: 0.01,
        percentFeeAmount: data.declaredValue * 0.01,
        sameDaySurcharge: surcharge,
        insuranceDeductible: 500.00,
        total: baseFee + surcharge,
        currency: 'USD'
      },
      pickupToken: `ptok_${Date.now()}`,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString() // 15 minutes
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
