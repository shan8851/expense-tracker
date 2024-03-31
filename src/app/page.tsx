import { AuthButton } from '@/components/authButton';

export default async function Home() {
  return (
    <div className="container mx-auto flex flex-col space-y-4 max-w-6xl">
      <h1 className="text-5xl font-extrabold">HustleHub</h1>
      <div className="flex flex-col gap-3">
        <p className="font-bold text-lg">Bring Your Side Projects to Life</p>
        <p>
          Welcome to the ultimate tool for side project enthusiasts! Whether
          you&apos;re a creative, a developer, or an entrepreneur, our platform
          is designed to streamline the way you manage your side projects. From
          tracking expenses and logging work hours to managing income and
          collaborating with team members, we&apos;ve got everything covered.
        </p>
        <p>
          Dive into a seamless experience that not only organizes your projects
          but also provides valuable insights to ensure your passion projects
          thrive. With our intuitive interface and comprehensive features,
          you&apos;re just a few clicks away from taking your side projects from
          idea to reality. Let&apos;s embark on this journey together and make
          every project a success story!
        </p>
      </div>
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex flex-col gap-6">
          {/* <!-- Free Tier --> */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg text-center">
              <span className="underline font-extrabold">FREE:</span> Start Your Journey
            </h3>
            <p className="text-sm text-center">
              Embark on your side project adventure with our Free tier. Perfect
              for individual creators looking to manage a single project, track
              time, log expenses, and monitor progress — all at no cost. It’s
              your personal digital workshop to craft, manage, and analyze your
              passion project.
            </p>
          </div>
          {/* <!-- Pro Tier --> */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg text-center">
              <span className="underline font-extrabold">PRO:</span> Expand Your Vision
            </h3>
            <p className="text-sm text-center">
              Take your project management to the next level with the Pro tier.
              Manage up to 3 side projects simultaneously and gain access to
              advanced reporting and insights. Ideal for serial hobbyists and
              freelancers who want to keep their ventures organized and
              thriving.
            </p>
          </div>
          {/* <!-- Elite Tier --> */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg text-center">
              <span className="underline font-extrabold">ELITE:</span> Unlimited Potential
            </h3>
            <p className="text-sm text-center">
              Unlock the full power of unlimited project management with our
              Elite tier. This is for the dedicated project master who juggles
              multiple endeavours, collaborates with teams, and requires
              extensive insights and unlimited growth potential. If you’re
              scaling up, this is your tier.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
