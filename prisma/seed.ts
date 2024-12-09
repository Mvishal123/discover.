import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const main = async () => {
  try {
    await prisma.discoverTypes.createMany({
      data: [
        { name: "Food & Dining" },
        { name: "Shopping" },
        { name: "Culture & History" },
        { name: "Tourist" },
        { name: "Accomodation" },
        { name: "Adventure" },
        { name: "Recreation" },
        { name: "Events & Entertainment" },
        { name: "Social" },
        { name: "Transportation" },
        { name: "Health & Wellness" },
        { name: "Religious & Spiritual" },
        { name: "Education" },
        { name: "Business & Professional" },
        { name: "Utilities" },
      ],
    });
  } catch (error) {}
};

main().finally(async () => {
  await prisma.$disconnect();
});
