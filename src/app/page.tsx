import { getServerSession } from 'next-auth';
import Image from 'next/image';

export default async function Home() {
  const session = await getServerSession();
  return (
    <div>
      <h1>Home</h1>
      {session?.user?.name ? (
        <div>
          {session?.user?.image && (
            <Image
              src={session.user.image}
              alt={session.user.name}
              width={100}
              height={100}
              className="h-8 w-8 rounded-full"
            />
          )}
          <p>{session.user.name}</p>
        </div>
      ) : (
        <div>No session</div>
      )}
    </div>
  );
}
