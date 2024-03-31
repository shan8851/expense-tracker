import { AuthButton } from '@/components/authButton';
import Hero from '@/components/hero';
import { Plans } from '@/components/plans';
import Pricing from '@/components/pricing';

export default async function Home() {
  return (
    <div className="container mx-auto flex flex-col space-y-4 max-w-6xl">
      <Hero />
      <Plans />
      <Pricing />
    </div>
  );
}
