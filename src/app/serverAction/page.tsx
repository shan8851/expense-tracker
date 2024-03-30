import { getServerSession } from 'next-auth';
import Button from './button';
import { AUTH_OPTIONS } from '../api/auth/[...nextauth]/options';

export default async function ServerActionPage() {
  const whoAmI = async () => {
    'use server';
    const session = await getServerSession(AUTH_OPTIONS);
    return session?.user?.name || 'No session';
  };
  return (
    <div>
      <Button action={whoAmI} />
    </div>
  );
}
