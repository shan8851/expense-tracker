'use client';
import { signIn, signOut, useSession } from 'next-auth/react';

export function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-2">
        {session?.user?.name} <br />
        <button
          onClick={() => signOut()}
          type="button"
          className="rounded bg-black px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
        >
          Sign Out
        </button>
      </div>
    );
  }
  return (
    <button
          onClick={() => signIn()}
          type="button"
          className="rounded bg-black px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
        >
          Sign In
        </button>
  );
}
