import { getServerSession } from "next-auth";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
import Link from "next/link";

async function Navbar() {
  const session = getServerSession(options);

  return (
    <header className="text-gray-100 bg-gray-600">
      <nav className="flex items-center justify-between w-full px-10 py-4">
        <div>
          {session ? (
            <Link href="/">Home</Link>
          ) : (
            <Link href="/members">Home</Link>
          )}
        </div>
        <div className="flex gap-10">
          {session ? (
            <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
          ) : (
            <Link href="/api/auth/signin">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

export const dynamic = "force-dynamic";