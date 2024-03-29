import { getServerSession } from 'next-auth';
import { OPTIONS } from '../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(OPTIONS);
  return NextResponse.json({ name: session?.user?.name || 'No session' });
}
