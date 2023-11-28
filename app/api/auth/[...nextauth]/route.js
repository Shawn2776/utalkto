import NextAuth from "next-auth";
import { options } from "./options";

import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

const handler = NextAuth(options);

export { handler as GET, handler as POST };
