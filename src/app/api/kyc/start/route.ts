import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user already has KYC record
    const existingKYC = await prisma.kYCRecord.findUnique({
      where: { userId: session.user.id }
    })

    if (existingKYC && existingKYC.status === 'VERIFIED') {
      return NextResponse.json(
        { error: 'KYC already completed' },
        { status: 409 }
      )
    }

    // Create or update KYC record
    const kyc = await prisma.kYCRecord.upsert({
      where: { userId: session.user.id },
      update: {
        status: 'PENDING',
        level: 'BASIC',
        documents: {}
      },
      create: {
        userId: session.user.id,
        status: 'PENDING',
        level: 'BASIC',
        documents: {}
      }
    })

    return NextResponse.json({
      kycSessionId: kyc.id,
      requiredDocs: [
        'id_front',
        'id_back',
        'selfie'
      ]
    })
  } catch (error) {
    console.error('KYC start error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}