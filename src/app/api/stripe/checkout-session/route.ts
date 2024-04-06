import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import Stripe from 'stripe';
import { AUTH_OPTIONS } from '../../auth/[...nextauth]/options';

export async function POST(req: NextRequest) {
  const { productId } = await req.json();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
  });

  const session = await getServerSession(AUTH_OPTIONS);

  if (!session?.user) {
    return NextResponse.json(
      {
        error: {
          code: 'no-access',
          message: 'You are not signed in.',
        },
      },
      { status: 401 }
    );
  }
  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: session.user.stripeCustomerId,
      line_items: [
        {
          price: productId,
          quantity: 1,
        },
      ],
      success_url: process.env.NEXT_PUBLIC_WEBSITE_URL + `/success`,
      cancel_url: process.env.NEXT_PUBLIC_WEBSITE_URL + `/error`,
      subscription_data: {
        metadata: {
          payingUserId: session.user.id,
        },
      },
    });
    return NextResponse.json({ session: checkoutSession }, { status: 200 });
  } catch (error) {
    console.error('Failed to create checkout session:', error);
    return NextResponse.json(
      {
        error: {
          code: 'stripe-error',
          message: 'Could not create checkout session',
        },
      },
      { status: 500 }
    );
  }
}
