import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { AUTH_OPTIONS } from '../api/auth/[...nextauth]/options';
import { db } from '@/lib/db';
import Image from 'next/image';
import { Plan } from '@/lib/constants';
import Link from 'next/link';
import Stripe from 'stripe';

async function generateCustomerPortalLink(customerId: string | null) {
  try {
    if (!customerId) {
      return undefined;
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2023-10-16',
    });
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: process.env.NEXTAUTH_URL + '/settings',
    });
    return portalSession.url;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function getUser(userId?: string) {
  if (!userId) {
    return null;
  }
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
}

export default async function SettingsPage() {
  const session = await getServerSession(AUTH_OPTIONS);
  const user = await getUser(session?.user?.id);
  if (!session || !session.user || !user) {
    redirect('/sign-in');
  }
  const portalLink = await generateCustomerPortalLink(user.stripeCustomerId);
  const upgradeDescription =
    user.plan === Plan.FREE
      ? 'Upgrade to a paid plan to unlock more features.'
      : 'Upgrade to ELITE for the best experience.';

  const badeClass =
    user.plan === Plan.FREE
      ? 'inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10'
      : user.plan === Plan.PRO
      ? 'inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-600 ring-1 ring-inset ring-yellow-500/10'
      : 'inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-500/10';

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="px-4 sm:px-0">
        <h3 className="text-2xl font-semibold leading-7 text-gray-900">
          Settings
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          View your personal details, upgrade & delete account.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {user.image && user.name && (
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 flex items-center gap-2">
                <Image
                  src={user.image}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                {user.name}
              </dd>
            </div>
          )}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Email
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user.email}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Plan
            </dt>
            <dd className="mt-1 sm:col-span-2 sm:mt-0">
              <span className={badeClass}>{user.plan}</span>
            </dd>
          </div>
          {user.plan !== Plan.FREE && typeof portalLink === 'string' && (
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Manage Subscription
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex flex-col gap-4">
                <p>
                  Visit your Stripe customer portal to manage your subscription.
                  You can update your payment method, view invoices, and cancel
                  your subscription.
                </p>
                <form className="flex items-start md:col-span-2">
                  <Link
                    href={portalLink}
                    target="_blank"
                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700"
                  >
                    Manage your subscription
                  </Link>
                </form>
              </dd>
            </div>
          )}
          {user.plan !== Plan.ELITE && (
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Upgrade Account
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex flex-col gap-4 items-start">
                <p>{upgradeDescription}</p>
                <Link
                  className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500"
                  href="/"
                >
                  Upgrade your plan
                </Link>
              </dd>
            </div>
          )}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Delete Account
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex flex-col gap-4">
              <p>
                No longer want to use our service? You can delete your account
                here. This action is not reversible. All information related to
                this account will be deleted permanently.
              </p>
              <form className="flex items-start md:col-span-2">
                <button
                  type="submit"
                  className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
                >
                  Yes, delete my account
                </button>
              </form>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
