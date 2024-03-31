import { AuthButton } from '@/components/authButton';

export default async function Home() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-5xl font-extrabold">Budgeting App</h1>
        <AuthButton />
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-bold text-lg">Bring Your Side Projects to Life</p>
        <p>
          Welcome to the ultimate tool for side project enthusiasts! Whether
          you&apos;re a creative, a developer, or an entrepreneur, our platform
          is designed to streamline the way you manage your side projects. From
          tracking expenses and logging work hours to managing income and
          collaborating with team members, we&apos;ve got everything covered.
          Dive into a seamless experience that not only organizes your projects
          but also provides valuable insights to ensure your passion projects
          thrive. With our intuitive interface and comprehensive features,
          you&apos;re just a few clicks away from taking your side projects from
          idea to reality. Let&apos;s embark on this journey together and make
          every project a success story!
        </p>
      </div>
    </div>
  );
}
