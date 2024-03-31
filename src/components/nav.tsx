'use client';
import Link from 'next/link';
import { AuthButton } from './authButton';
import { useSession } from 'next-auth/react';

export function Nav() {
  const { data: session } = useSession();
  return (
    <div className="bg-gray-900 flex items-center justify-between p-4 mb-8">
      <Link href="/" className="font-extrabold text-3xl text-white">
        HustleHub
      </Link>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-white text-xs p-1 hover:bg-gray-600">
            Dashboard
          </Link>
        </div>
        <AuthButton />
      </div>
    </div>
  );
}
