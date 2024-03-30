import GitHubProvider from 'next-auth/providers/github';
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { Adapter } from 'next-auth/adapters';

const prisma = new PrismaClient()

export const AUTH_OPTIONS: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    async session({ session, user }) {
      if (user?.id) {
        session.user = {
          ...session.user,
          id: user.id,
        };
      }
      return session;
    },
}
}
