const { PrismaClient } = require("@prisma/client");
const { categories, users } = require("./data");

const prisma = new PrismaClient();

const load = async () => {
  try {
    prisma.category.createMany({
      data: categories,
    });

    console.log("Categories are created");

    // prisma.role.createMany({
    //   data: roles,
    // });

    // console.log("Roles are created");

    prisma.user.createMany({
      data: users,
    });

    console.log("Users are created");
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
};

load();