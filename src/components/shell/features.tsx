import { BanknotesIcon, MinusCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

const features = [
  {
    name: 'Track Income.',
    description:
      'Track your income from multiple sources. Get insights and stats to help you make informed decisions.',
    icon: BanknotesIcon,
  },
  {
    name: 'Track Expenses.',
    description: 'Track your expenses, know where your money is going and understand if your project is profitable.',
    icon: MinusCircleIcon,
  },
  {
    name: 'Track Time.',
    description: 'Track time spent on your projects. Understand how much time you are spending on your projects.',
    icon: ClockIcon,
  },
]

export function Features() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-emerald-400">Qualitative data</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Understand your business</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Track income, expenses, time logs and more for your side projects. Get insights and stats to help you make
                informed decisions.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon className="absolute left-1 top-1 h-5 w-5 text-black" aria-hidden="true" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <Image
            src="/feature.png"
            alt="Product screenshot"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
  )
}
