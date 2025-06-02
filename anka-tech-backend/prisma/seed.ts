import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.asset.createMany({
    data: [
      { name: 'Ação XYZ', value: 100.00 },
      { name: 'Fundo ABC', value: 250.00 },
      { name: 'Cript DEF', value: 180.00 },
    ],
  })
}

main()
  .then(() => {
    console.log('Seed completed.')
    return prisma.$disconnect()
  })
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
})
