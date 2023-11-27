import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/logos/uTalkTo-logos_transparent.png";

export default async function Home() {
  const session = await getServerSession(options);

  return (
    <main className="flex flex-col w-full h-screen md:flex-row md:justify-evenly">
      <div className="flex items-center justify-center w-full h-screen">
        <Image
          src={logo}
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
          alt="photo"
        />
      </div>
      <div className="flex items-center justify-center w-full h-screen">
        <Link
          className="text-6xl"
          href={"/api/auth/signin/google?callbackUrl=/members"}
        >
          Dashboard
        </Link>
      </div>
    </main>
  );
}

