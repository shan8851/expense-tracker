import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { AUTH_OPTIONS } from '../api/auth/[...nextauth]/options';

export default async function ProtectedRoute() {
  const session = await getServerSession(AUTH_OPTIONS);
  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }
  return (
    <div>
      <h1>Protected Route</h1>
      <br />
      <p>You will only see this if you are authenticated</p>
    </div>
  );
}
