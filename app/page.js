import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/logos/uTalkTo-logos_transparent.png";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(options);

  return (
    <main className="w-full h-screen flex flex-col md:flex-row md:justify-evenly">
      {session ? (
        redirect("/members")
      ) : (
        <>
          <div className="w-full h-screen flex justify-center items-center">
            <Image
              src={logo}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
              alt="photo"
            />
          </div>
          <div className="w-full h-screen flex justify-center items-center">
            <Link className="text-6xl" href={"/api/auth/signin/google"}>
              Sign In
            </Link>
          </div>
        </>
      )}
    </main>
  );
}

