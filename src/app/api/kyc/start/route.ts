import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Do not create a KYC record or claim verification has started until a
  // compliant provider, secure document upload and review process are wired.
  return NextResponse.json(
    {
      error: 'Identity verification is not available yet',
      code: 'KYC_PROVIDER_NOT_CONFIGURED',
      message: 'No identity documents were collected and no verification was started.',
    },
    { status: 503 }
  )
}
