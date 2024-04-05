import { getProviders, signIn } from "next-auth/react"
import { AUTH_OPTIONS } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Main } from "./_components/main";

export default async function Page() {
  const session = await getServerSession(AUTH_OPTIONS);
  const providers = await getProviders();
    if (session) {
    redirect('/');
  }
  return (
    <Main providers={providers} />
  )
}
