'use client';
import { ClientSafeProvider, signIn } from 'next-auth/react';

type Props = {
  providers: Record<string, ClientSafeProvider> | null;
};
export function Main({ providers }: Props) {
  return (
    <div className="flex flex-col items-center justify-center pt-[100px] md:pt-[200px] lg:pt-[300px]">
      <div className="max-w-md w-full shadow flex flex-col gap-8 p-6 border border-black rounded-md">
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-semibold text-center ">HustleHub</p>
        <p className="text-gray-600 text-md text-center ">Sign in with your preferred provider.</p>
        </div>
        <div className="flex flex-col gap-4">
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
                key={provider.name}
                onClick={() => signIn(provider.id)}
              >
                Sign in with {provider.name}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
