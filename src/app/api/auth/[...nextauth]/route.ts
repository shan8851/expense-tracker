import NextAuth from "next-auth/next";
import { AUTH_OPTIONS } from "./options";

const handler = NextAuth(AUTH_OPTIONS);

export { handler as GET, handler as POST };
