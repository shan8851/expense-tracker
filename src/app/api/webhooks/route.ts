import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ELITE_MONTHLY_PRICE, ELITE_YEARLY_PRICE, PRO_MONTHLY_PRICE, PRO_YEARLY_PRICE, Plan } from "@/lib/constants";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

const mapPriceIdToPlan = (priceId: string) => {
  switch (priceId) {
    case PRO_MONTHLY_PRICE:
    case PRO_YEARLY_PRICE:
      return Plan.PRO;
    case ELITE_MONTHLY_PRICE:
    case ELITE_YEARLY_PRICE:
      return Plan.ELITE;
    default:
      return Plan.FREE;
  }
};

const webhookHandler = async (req: NextRequest) => {
  try {
    const buf = await req.text();
    const sig = req.headers.get("stripe-signature")!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      // On error, log and return the error message.
      if (err! instanceof Error) console.log(err);
      console.log(`❌ Error message: ${errorMessage}`);

      return NextResponse.json(
        {
          error: {
            message: `Webhook Error: ${errorMessage}`,
          },
        },
        { status: 400 }
      );
    }
    console.log("✅ Success:", event);

    const subscription = event.data.object as Stripe.Subscription;

        // Assuming the price ID is in the first item of the subscription's items.
    const priceId = subscription.items.data[0].price.id;
    const plan = mapPriceIdToPlan(priceId);

    switch (event.type) {
      case "customer.subscription.created":
        await db.user.update({
          // Find the customer in our database with the Stripe customer ID linked to this purchase
          where: {
            stripeCustomerId: subscription.customer as string,
          },
          // Update that customer plan
          data: {
            plan
          },
        });
        break;
      case "customer.subscription.deleted":
        await db.user.update({
          // Find the customer in our database with the Stripe customer ID linked to this purchase
          where: {
            stripeCustomerId: subscription.customer as string,
          },
          // Update that customer so their status is now active
          data: {
            plan: Plan.FREE,
          },
        });
        break;
      default:
        console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
        break;
    }

    // Return a response to acknowledge receipt of the event.
    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json(
      {
        error: {
          message: `Method Not Allowed`,
        },
      },
      { status: 405 }
    ).headers.set("Allow", "POST");
  }
};

export { webhookHandler as POST };
