import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { AUTH_OPTIONS } from '../auth/[...nextauth]/options';

export async function GET() {
  const session = await getServerSession(AUTH_OPTIONS);
  return NextResponse.json({ name: session?.user?.name || 'No session' });
}
