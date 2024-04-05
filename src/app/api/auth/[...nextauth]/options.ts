import GitHubProvider from 'next-auth/providers/github';
import DiscordProvider from 'next-auth/providers/discord';
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { Adapter } from 'next-auth/adapters';
import { db } from '@/lib/db';


export const AUTH_OPTIONS: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID ?? '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? ''
    }),
  ],
  secret: process.env.SECRET,
  pages: {
    signIn: '/sign-in',
  },
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
