import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { AUTH_OPTIONS } from '../api/auth/[...nextauth]/options';
import Image from 'next/image';
import { AuthButton } from '@/components/authButton';

export default async function DashboardPage() {
  const session = await getServerSession(AUTH_OPTIONS);
  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }
  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-5xl font-extrabold">Dashboard</h1>
      {session.user.name && (
        <div className="flex items-center space-x-2">
          {session.user.image && (
            <Image
            src={session.user.image}
            alt={session.user.name}
            className="w-10 h-10 rounded-full border border-gray-900"
            width={100}
            height={100}
          />
          )}
          <div className="flex items-center gap-2">
            <span className="font-bold underline">{session.user.name}</span>
             <p>- welcome to HustleHub - let&apos;s get building!</p>
          </div>
        </div>
      )}
    </div>
  );
}
