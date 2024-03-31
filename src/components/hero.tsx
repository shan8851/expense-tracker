export default function Hero() {
  return (
    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Bring your startups to life
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          The best way to streamline the way you manage your side projects. From
          tracking expenses and logging work hours to managing income and
          collaborating with team members, we&apos;ve got everything covered.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#"
            className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
          >
            Get Started
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            view pricing <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
