const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const parseMonths = months.map((month) => {
    return {
      value: month,
    };
  });

  const createdMonths = await prisma.month.createMany({
    data: parseMonths,
  });

  console.log('Created Months', createdMonths);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
