import NextAuth from "next-auth";
import User from "@/models/user";
import connect from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
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
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          name: token.name,
          image: token.image as string | null | undefined,
          role: token.role,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
export { handler as GET, handler as POST };
