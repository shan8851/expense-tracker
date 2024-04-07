export function Hero() {
  return (
    <div className="bg-black">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Bring your startups to life
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-400">
          The best way to streamline the way you manage your side projects. From
          tracking expenses and logging work hours to managing income and
          collaborating with team members, we&apos;ve got everything covered.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#"
            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300"
          >
            Get Started
          </a>
          <a href="#pricing" className="text-sm font-semibold leading-6 text-white">
            view pricing <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
    </div>
  );
}
