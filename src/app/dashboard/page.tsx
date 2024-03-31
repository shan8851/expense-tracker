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
      <div className="flex items-center justify-between">
        <h1 className="text-5xl font-extrabold">Dashboard</h1>
        <AuthButton />
      </div>
      {session.user.name && (
        <div className="flex items-center space-x-2">
          {session.user.image && (
            <Image
            src={session.user.image}
            alt={session.user.name}
            className="w-8 h-8 rounded-full"
            width={100}
            height={100}
          />
          )}
          <p>
            <span className="font-bold underline">{session.user.name}</span>
            let&apos;s get building!
          </p>
        </div>
      )}
    </div>
  );
}
