'use client';
import { signIn, signOut, useSession } from 'next-auth/react';

export function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <button
        onClick={() => signOut()}
        type="button"
        className="rounded bg-gray-50 px-2 py-1 text-xs font-semibold text-black shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300"
      >
        Sign Out
      </button>
    );
  }
  return (
    <button
      onClick={() => signIn()}
      type="button"
      className="rounded bg-gray-50 px-2 py-1 text-xs font-semibold text-black shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300"
    >
      Sign In
    </button>
  );
}
