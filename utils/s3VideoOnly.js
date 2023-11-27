import { PrismaClient } from "@prisma/client";
import React from "react";
import uploadFileToS3 from "./uploadFileToS3";

async function S3VideoOnly(video, id) {
  const prisma = new PrismaClient();

  const talk = await prisma.talk.create({
    data: {
      video: video,
      // If your Talk model has a relation to the User model, you might need to connect them:
      owner: {
        connect: { id: id },
      },
    },
  });

  return talk;
}

export default S3VideoOnly;
