import { PrismaClient } from "@prisma/client";

async function TextOnly(text, id) {
  const prisma = new PrismaClient();

  const createdTalk = await prisma.talk.create({
    data: {
      text: text,
      // If your Talk model has a relation to the User model, you might need to connect them:
      owner: {
        connect: { id: id },
      },
    },
  });

  return createdTalk;
}

export default TextOnly;
