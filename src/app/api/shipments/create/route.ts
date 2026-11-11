import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const shipmentCreateSchema = z.object({
  userId: z.string().min(1),
  items: z.array(z.object({
    type: z.string().min(1),
    description: z.string().optional(),
  })).min(1),
  declaredValue: z.number().positive(),
  tier: z.enum(['STANDARD', 'WHITE_GLOVE', 'VIP', 'VAULT', 'INTERNATIONAL']),
  pickupWindow: z.string().datetime(),
  kycId: z.string().min(1),
  address: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    zip: z.string().min(1),
    country: z.string().min(1),
  }),
})

export async function POST(request: NextRequest) {
  try {
    shipmentCreateSchema.parse(await request.json())

    // Do not fabricate shipment IDs, pickup tokens, fees or delivery promises.
    // A real provider, verified KYC check and persisted shipment workflow are
    // required before this endpoint can create a shipment.
    return NextResponse.json(
      {
        error: 'Shipment creation is not available yet',
        code: 'SHIPMENT_PROVIDER_NOT_CONFIGURED',
      },
      { status: 503 }
    )
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
