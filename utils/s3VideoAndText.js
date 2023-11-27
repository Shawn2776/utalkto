import { PrismaClient } from "@prisma/client";

async function S3VideoAndText(text, video, id) {
  const prisma = new PrismaClient();

  const talk = await prisma.talk.create({
    data: {
      text: text,
      video: video,
      // If your Talk model has a relation to the User model, you might need to connect them:
      owner: {
        connect: { id: id },
      },
    },
  });

  return talk;
}

export default S3VideoAndText;
