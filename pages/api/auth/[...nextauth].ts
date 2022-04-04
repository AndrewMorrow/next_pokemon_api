import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../src/prismaConnect";

export default NextAuth({
  adapter: PrismaAdapter(prisma),

  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
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
