const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding demo data...')

  // Create a demo user if not exists
  let user = await prisma.user.findUnique({ where: { email: 'seller@example.com' } })
  if (!user) {
    user = await prisma.user.create({
      data: {
        name: 'Demo Seller',
        email: 'seller@example.com',
        role: 'USER'
      }
    })
    console.log('Created demo user:', user.email)
  } else {
    console.log('Demo user already exists')
  }

  // Create a sample shipment
  const existing = await prisma.shipment.findUnique({ where: { id: 'ship_01GxR1AbcD2Ef3' } })
  if (!existing) {
    await prisma.shipment.create({
      data: {
        id: 'ship_01GxR1AbcD2Ef3',
        userId: user.id,
        declaredValue: 10000.00,
        tier: 'WHITE_GLOVE',
        status: 'PENDING',
        pickupToken: 'ptok_demo',
        quote: {
          baseFee: 25,
          percentFee: 0.01
        }
      }
    })
    console.log('Created sample shipment')
  } else {
    console.log('Sample shipment already exists')
  }

  console.log('Seeding finished')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
