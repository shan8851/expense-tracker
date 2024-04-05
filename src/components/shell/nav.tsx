import Link from 'next/link';
import { AuthButton } from '../auth/authButton';
import { getServerSession } from 'next-auth';
import { AUTH_OPTIONS } from '@/app/api/auth/[...nextauth]/options';

export async function Nav() {
  const session = await getServerSession(AUTH_OPTIONS);
  return (
    <div className="bg-black flex items-center justify-between p-4">
      <Link href="/" className="font-extrabold text-3xl text-white">
        HustleHub
      </Link>
      <div className="flex items-center gap-4">
        {session && session.user && (
          <div className="flex items-center gap-4">
            <Link
              href="/projects"
              className="text-white text-xs p-1 hover:bg-gray-600"
            >
              Projects
            </Link>
          </div>
        )}
        <AuthButton />
      </div>
    </div>
  );
}
