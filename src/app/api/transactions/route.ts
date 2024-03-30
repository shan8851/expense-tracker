import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import type { NextRequest } from 'next/server';
import { AUTH_OPTIONS } from '../auth/[...nextauth]/options';

const prisma = new PrismaClient();
export async function GET(request: Request) {
      try {
      const transactions = await prisma.transaction.findMany();
      return new Response(JSON.stringify(transactions), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Error fetching transactions' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }

export async function POST(req: NextRequest) {
  // Parse the incoming request body
  const body = await req.json();
  const session = await getServerSession(AUTH_OPTIONS);
  if (!session || !session.user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const { type, amount, currency, date, description, userId } = body;

  const transaction = await prisma.transaction.create({
    data: {
      type,
      amount,
      currency,
      date: new Date(date),
      description,
      userId: session.user.id,
    },
  });

  return new Response(JSON.stringify(transaction), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  console.log(id)
  if (!id) {
    return new Response(JSON.stringify({ error: 'Transaction ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  await prisma.transaction.delete({
    where: { id: parseInt(id) },
  });

  return new Response(null, { status: 204 }); // No Content
}
