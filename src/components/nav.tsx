import Link from 'next/link';
import { AuthButton } from './authButton';

export function Nav() {
  return (
    <div className="bg-black flex items-center justify-between p-4">
      <Link href="/" className="font-extrabold text-3xl text-white">
        HustleHub
      </Link>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4">
          <Link href="/projects" className="text-white text-xs p-1 hover:bg-gray-600">
            Projects
          </Link>
        </div>
        <AuthButton />
      </div>
    </div>
  );
}
