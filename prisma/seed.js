import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminPasswordHash = await bcrypt.hash("admin12345", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@cyberguard.local" },
    update: {},
    create: {
      email: "admin@cyberguard.local",
      username: "admin",
      passwordHash: adminPasswordHash,
      role: "ADMIN",
    },
  });

  await prisma.channel.upsert({
    where: { slug: "general" },
    update: {},
    create: {
      slug: "general",
      name: "General",
      description: "General cybersecurity discussion",
    },
  });

  console.log("Seed complete:", { adminId: admin.id });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
