const { Prisma } = require("@prisma/client");

const categories = [
  {
    name: "Technology",
  },
  {
    name: "Science",
  },
];

const users = [
  {
    email: "shawn.harrington2776@gmail.com",
    name: "Shawn Harrington2",
    emailVerified: true,
    roleId: 1,
    username: "webDev27762",
    lang: "en",
  },
  {
    email: "webdev2776@gmail.com",
    name: "Shawn Harrington",
    emailVerified: true,
    roleId: 2,
    username: "webDev2776",
    lang: "en",
  },
];

module.exports = {
  categories,
  users,
};
