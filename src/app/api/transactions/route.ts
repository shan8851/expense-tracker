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

  // Find the user in the database
  const user = await prisma.user.findUnique({
    where: { email: session.user.email ?? undefined },
  });
  if (!user) {
    return new Response(JSON.stringify({ error: 'User not found' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }


  // Assuming body has { type, amount, currency, date, description }
  // and you have user session with userId available
  const { type, amount, currency, date, description, userId } = body;
  // Perform input validation (omitted for brevity)

  // Add the transaction to the database
  const transaction = await prisma.transaction.create({
    data: {
      type,
      amount,
      currency,
      date: new Date(date), // Ensure date is a valid Date object
      description,
      userId: user.id, // This should come from the session or should be validated
    },
  });

  // Respond with the created transaction data
  return new Response(JSON.stringify(transaction), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
