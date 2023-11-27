const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Seed the `Role` table with multiple roles
  const roles = ["admin", "editor", "moderator", "user", "other", "reserved"];
  for (const roleName of roles) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: { name: roleName },
    });
  }

  // Seed the `Role` table
  const defaultRole = await prisma.role.upsert({
    where: { name: "user" },
    update: {},
    create: { name: "user" },
  });

  //   // Update existing `User` records with the default role
  //   const updateUserRoles = await prisma.user.updateMany({
  //     where: { roleId: null }, // or any condition that identifies users without roles
  //     data: { roleId: defaultRole.id },
  //   });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
