// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import User from "@/models/user";
import connect from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";


// Define authOptions
const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connect();
          const user = await User.findOne({ email: credentials?.email });
          if (!user) {
            throw new Error("No user found with this email");
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials?.password ?? "",
            user.password as string
          );
          if (!isPasswordCorrect) {
            throw new Error("Incorrect password");
          }

          console.log("User found: ", user);  // Debugging to see the user object
          return user;
        } catch (error) {
          throw new Error("Error while logging in user");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any)._id?.toString();
        token.email = user.email;

        if ('role' in user) {
          token.role = (user as any).role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        console.log("Session token: ", token);  // Debugging token info
        session.user = {
          email: token.email,
          name: token.name,
          image: token.image as string | null | undefined,
        };
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",  // Adjust to your login page
  },
  secret: process.env.NEXTAUTH_SECRET,  // Ensure NEXTAUTH_SECRET is defined in your .env
};

// Export authOptions directly
export { authOptions };
