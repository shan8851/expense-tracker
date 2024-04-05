import Hero from '@/components/shell/hero';
import { Plans } from '@/components/shell/plans';
import Pricing from '@/components/shell/pricing';

export default async function Home() {
  return (
    <div className="mx-auto flex flex-col space-y-4">
      <Hero />
      <Pricing />
      <Plans />
    </div>
  );
}
