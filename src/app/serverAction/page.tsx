import { getServerSession } from 'next-auth';
import Button from './button';

export default async function ServerActionPage() {
  const whoAmI = async () => {
    'use server';
    const session = await getServerSession();
    return session?.user?.name || 'No session';
  };
  return (
    <div>
      <Button action={whoAmI} />
    </div>
  );
}
