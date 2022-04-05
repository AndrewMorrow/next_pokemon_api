import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../src/prismaConnect";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  adapter: PrismaAdapter(prisma),

  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/auth/signin",
  },
  // theme: {
  //   colorScheme: "dark",
  //   brandColor: "red",
  //   logo: "/assets/images/pokeball.png",
  // },
  callbacks: {
    async session({ session, user, token }) {
      session.role = user.role;
      return session;
    },
  },
});
