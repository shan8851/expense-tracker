'use client';
import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { classNames } from '@/utils/utils';
import { useSession } from 'next-auth/react';
import {
  ELITE_MONTHLY_PRICE,
  ELITE_YEARLY_PRICE,
  PRO_MONTHLY_PRICE,
  PRO_YEARLY_PRICE,
  Plan,
} from '@/lib/constants';
import getStripe from '@/utils/getStripe';

type Frequency = { value: string; label: string; priceSuffix: string };
type Tier = {
  name: string;
  id: string;
  price: Record<string, string>;
  description: string;
  features: string[];
  mostPopular: boolean;
};

const frequencies: Frequency[] = [
  { value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
  { value: 'yearly', label: 'Annually', priceSuffix: '/year' },
];
const tiers: Tier[] = [
  {
    name: 'FREE',
    id: 'FREE',
    price: { monthly: '$0', annually: '$0' },
    description: 'Get started with HustleHub!',
    features: [
      '1 Project',
      'Track Time',
      'Track Expenses',
      'Track Income',
      'Collaborate with Team Members',
    ],
    mostPopular: false,
  },
  {
    name: 'PRO',
    id: 'PRO',
    price: { monthly: '$5', annually: '$50' },
    description: 'For the serious builder.',
    features: [
      '3 Projects',
      'Track Time',
      'Track Expenses',
      'Track Income',
      'Collaborate with Team Members',
    ],
    mostPopular: true,
  },
  {
    name: 'ELITE',
    id: 'ELITE',
    price: { monthly: '$20', annually: '$200' },
    description: 'Perfect for small teams.',
    features: [
      'Unlimited Projects',
      'Track Time',
      'Track Expenses',
      'Track Income',
      'Collaborate with Team Members',
    ],
    mostPopular: false,
  },
];

const getPriceId = (planId: string, frequencyValue: string) => {
  if (planId === Plan.PRO) {
    return frequencyValue === 'yearly' ? PRO_YEARLY_PRICE : PRO_MONTHLY_PRICE;
  } else if (planId === Plan.ELITE) {
    return frequencyValue === 'yearly'
      ? ELITE_YEARLY_PRICE
      : ELITE_MONTHLY_PRICE;
  }
  // Handle 'FREE'
};

export default function Pricing() {
  const [frequency, setFrequency] = useState(frequencies[0]);
  const session = useSession();

  const handleCreateCheckoutSession = async (plan: Tier) => {
  // Assuming `getPriceId` correctly returns the Stripe price ID based on the plan and frequency
  const productId = getPriceId(plan.id, frequency.value);
  console.debug('productId:', productId, 'plan:', plan.id, 'frequency:', frequency.value);
  // Wrap `productId` in an object with a `productId` property
  const res = await fetch(`/api/stripe/checkout-session`, {
    method: 'POST',
    body: JSON.stringify({ productId }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Check if the request was successful
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json(); // Parse the JSON response
  const checkoutSession = data.session; // Access the session object

  // Ensure the session object and its ID are present
  if (!checkoutSession || !checkoutSession.id) {
    throw new Error('Invalid session data');
  }

  // Redirect to Stripe Checkout using the session ID
  const stripe = await getStripe();
  const { error } = await stripe!.redirectToCheckout({
    sessionId: checkoutSession.id,
  });

  // Handle any errors that occur during the redirect
  if (error) {
    console.warn(error.message);
  }
};


  const isSignedIn = !!session.data?.user;
  //const userPlan = session.data?.user?.plan;

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Pricing for everyone
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Choose the plan that best suits you.
        </p>
        <div className="mt-16 flex justify-center">
          <RadioGroup
            value={frequency}
            onChange={setFrequency}
            className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
          >
            <RadioGroup.Label className="sr-only">
              Payment frequency
            </RadioGroup.Label>
            {frequencies.map((option) => (
              <RadioGroup.Option
                key={option.value}
                value={option}
                className={({ checked }) =>
                  classNames(
                    checked ? 'bg-black text-white' : 'text-gray-500',
                    'cursor-pointer rounded-full px-2.5 py-1'
                  )
                }
              >
                <span>{option.label}</span>
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </div>
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular ? 'ring-2 ring-black' : 'ring-1 ring-gray-200',
                'rounded-3xl p-8 xl:p-10'
              )}
            >
              <div className="flex items-center justify-between gap-x-4">
                <h3
                  id={tier.id}
                  className={classNames(
                    tier.mostPopular ? 'text-black' : 'text-gray-900',
                    'text-lg font-semibold leading-8'
                  )}
                >
                  {tier.name}
                </h3>
                {tier.mostPopular ? (
                  <p className="rounded-full bg-black/10 px-2.5 py-1 text-xs font-semibold leading-5 text-black">
                    Most popular
                  </p>
                ) : null}
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-600">
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">
                  {tier.price[frequency.value]}
                </span>
                <span className="text-sm font-semibold leading-6 text-gray-600">
                  {frequency.priceSuffix}
                </span>
              </p>
              <button
                className={classNames(
                  tier.mostPopular
                    ? 'bg-black text-white shadow-sm hover:bg-black'
                    : 'text-black ring-1 ring-inset ring-black hover:ring-black',
                  'mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
                )}
                onClick={() => handleCreateCheckoutSession(tier)}
              >
                Buy plan
              </button>
              <ul
                role="list"
                className="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10"
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      className="h-6 w-5 flex-none text-black"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
