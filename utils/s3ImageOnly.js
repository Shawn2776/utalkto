import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function S3ImageOnly(image, id) {
  const talk = await prisma.talk.create({
    data: {
      image: image,
      // If your Talk model has a relation to the User model, you might need to connect them:
      owner: {
        connect: { id: id },
      },
    },
  });

  return talk;
}

export default S3ImageOnly;
