import { TrophyIcon, UserIcon, UserPlusIcon } from '@heroicons/react/20/solid';

const plans = [
  {
    name: 'FREE - Start your journey',
    description:
      'Embark on your side project adventure with our Free tier. Perfect for individual creators looking to manage a single project, track time, log expenses, and monitor progress — all at no cost. It’s your personal digital workshop to craft, manage, and analyze your passion project.',
    href: '#',
    icon: UserIcon,
  },
  {
    name: 'PRO - Expand your vision',
    description:
      'Take your project management to the next level with the Pro tier. Manage up to 3 side projects simultaneously and gain access to advanced reporting and insights. Ideal for serial hobbyists and freelancers who want to keep their ventures organized and thriving..',
    href: '#',
    icon: UserPlusIcon,
  },
  {
    name: 'ELITE - Unlimited potential',
    description:
      'Unlock the full power of unlimited project management with our Elite tier. This is for the dedicated project master who juggles multiple endeavours, collaborates with teams, and requires extensive insights and unlimited growth potential. If you’re scaling up, this is your tier',
    href: '#',
    icon: TrophyIcon,
  },
];

export function Plans() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Plans for everyone.
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            From solo founders to small teams, we got you covered.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {plans.map((plan) => (
              <div key={plan.name} className="flex flex-col">
                <dt className="text-base font-semibold leading-7">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg border border-black">
                    <plan.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  {plan.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{plan.description}</p>
                  <p className="mt-6">
                    <a
                      href={plan.href}
                      className="text-sm font-semibold leading-6 text-white bg-black p-1 rounded"
                    >
                      Buy {plan.name.split(' ')[0]} <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
