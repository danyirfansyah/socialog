// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import User from "@/models/user";
import connect from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

// authOptions is the NextAuth configuration object
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
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Define the handler for NextAuth API routes
const handler = NextAuth(authOptions);

// Export GET and POST handlers for the API route
export { handler as GET, handler as POST };
