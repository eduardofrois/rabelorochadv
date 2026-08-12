import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.category.upsert({
    where: { slug: "institucional" },
    update: {},
    create: {
      name: "Institucional",
      slug: "institucional",
      description: "Conteudos institucionais da Rabelo & Rocha Advogados.",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
