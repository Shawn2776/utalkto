import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const options = {
  providers: [
    GoogleProvider({
      profile(profile) {
        let userRole;
        if (profile.email === "shawn.harrington2776@gmail.com") {
          userRole = "admin";
        } else {
          userRole = "user";
        }
        return {
          ...profile,
          id: profile.sub, // google doesn't provide id
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      const adminEmail = "shawn.harrington2776@gmail.com";

      let role = user.email === adminEmail ? "admin" : "user";

      // Generate a base username using the part of the email before the @ symbol
      let usernameBase = user.email.split("@")[0];
      let uniqueUsername = usernameBase;

      // Keep trying to append random numbers to the username until it's unique
      let userExists = true;
      while (userExists) {
        const randomNumbers = Math.floor(Math.random() * 10000); // Random 4 digit number
        uniqueUsername = `${usernameBase}${randomNumbers}`;

        // Check if the username already exists in the database
        userExists = await prisma.user.findUnique({
          where: { username: uniqueUsername },
        });

        // If not, break out of the loop
        if (!userExists) {
          break;
        }
      }

      const email = user.email;
      const profilePic = profile.picture
        ? profile.picture
        : "https://utalkto.s3.us-west-2.amazonaws.com/defaultProfilePic.png";
      const emailVerified = profile.email_verified;

      // Check if user exists in your database
      let userInDb = await prisma.user.findUnique({
        where: { email },
      });

      // If user doesn't exist, create a new user record
      if (!userInDb) {
        const username = uniqueUsername;
        userInDb = await prisma.user.create({
          data: {
            name: user.name,
            email,
            profilePic,
            role: {
              connect: {
                id: 1, // Assuming 'name' is the unique field in your `Role` model
              },
            },
            emailVerified,
            username,
            // Add other fields as necessary
          },
          select: { id: true, role: true },
        });
      } else {
        // Optionally, you can update the user's role if it's different
        // and you want to ensure the admin always has the admin role.
        if (userInDb.role !== role) {
          userInDb = prisma.user.update({
            where: { email: "shawn.harrington2776@gmail.com" },
            data: {
              role: {
                connect: { name: "admin" },
              },
            },
          });
        }
      }

      // Attach user ID to the user object for session callback
      if (userInDb) {
        user.id = userInDb.id; // This assumes your User model's ID field is named 'id'
        user.role = userInDb.role;
      }

      // Return true to allow the sign in to proceed
      return true;
    },
    // ensures user role is added to use in program
    // server side
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    // client side
    async session({ session, token }) {
      if (session.user) session.user.role = token.role;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
