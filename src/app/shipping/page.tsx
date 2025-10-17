import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import ShippingService from '@/components/ShippingService'

export default async function ShippingPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin?callbackUrl=/shipping')
  }

  return (
    <div className="min-h-screen bg-charcoal">
      <ShippingService />
    </div>
  )
}