// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import User from "@/models/user";
import connect from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

import { NextAuthOptions } from "next-auth";

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

          // Pastikan bahwa kita mengembalikan user dengan properti yang benar
          console.log("User found: ", user);  // Debugging untuk melihat apa yang ada di user
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
        // Pastikan kita mengambil _id jika menggunakan MongoDB (bukan id)
        token.id = (user as any)._id?.toString(); // Convert _id ke string
        token.email = user.email;

        // Hanya assign role jika ada di user
        if ('role' in user) {
          token.role = (user as any).role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // Pastikan id dan role sudah benar di token
        console.log("Session token: ", token);  // Debugging untuk melihat isi token
        session.user = {
          email: token.email,
          name: token.name,
          image: token.image as string | null | undefined,
        };
        // Assign custom properties directly to session.user
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",  // Sesuaikan dengan halaman login Anda
  },
  secret: process.env.NEXTAUTH_SECRET,  // Pastikan Anda memiliki NEXTAUTH_SECRET di .env
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
