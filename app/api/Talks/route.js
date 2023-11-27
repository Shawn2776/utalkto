import { getServerSession } from "next-auth";

import { options } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import TextOnly from "@/utils/textOnly";
import S3VideoOnly from "@/utils/s3VideoOnly";
import S3ImageOnly from "@/utils/s3ImageOnly";
import S3ImageAndText from "@/utils/s3ImageAndText";
import S3VideoAndText from "@/utils/s3VideoAndText";

export async function POST(request) {
  const session = await getServerSession(options);
  const prisma = new PrismaClient();

  // Use the user's email from the session for the user ID
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  let { text, image, video } = await request.json();

  if (text == "n/a") {
    text = null;
  }
  if (image == "n/a") {
    image = null;
  }
  if (video == "n/a") {
    video = null;
  }
  let talk = "amaZing";

  if (text && !image && !video) {
    talk = await TextOnly(text, user.id);
  }

  if (text && video && !image) {
    talk = await S3VideoAndText(text, video, user.id);
  }

  if (text && image && !video) {
    talk = await S3ImageAndText(text, image, user.id);
  }

  if (!text && !image && video) {
    talk = await S3VideoOnly(video, user.id);
  }

  if (!text && !video && image) {
    talk = await S3ImageOnly(image, user.id);
  }

  if (talk) {
    return NextResponse.json({ message: "Talk Created" }, { status: 201 });
  }

  return NextResponse.json(
    { error: "Failed to create talk." },
    { status: 501 }
  );
}

export async function GET(req, res) {
  const prisma = new PrismaClient();

  try {
    // Fetch all talks from the database
    const talks = await prisma.talk.findMany({
      // You can include relations here if necessary, e.g.,
      include: {
        owner: true, // Includes the owner details
        likes: true, // Includes the likes
        dislikes: true, // Includes the dislikes
        retalkedBy: true, // Includes the retalkedBy users
        backTalks: true, // Includes the backTalks (comments)
        _count: {
          select: {
            likes: true,
            dislikes: true,
            retalkedBy: true,
            backTalks: true,
          },
        },
      },
    });

    return NextResponse.json({ talks });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error fetching talks" });
  }
}

export const dynamic = "force-dynamic";