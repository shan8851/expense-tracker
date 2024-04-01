import { AuthButton } from '@/components/authButton';
import Hero from '@/components/hero';
import { Plans } from '@/components/plans';
import Pricing from '@/components/pricing';

export default async function Home() {
  return (
    <div className="mx-auto flex flex-col space-y-4">
      <Hero />
      <Pricing />
      <Plans />
    </div>
  );
}
