import {Hero} from '@/components/shell/hero';
import { Features } from '@/components/shell/features';
import {Pricing} from '@/components/shell/pricing';

export default async function Home() {
  return (
    <div className="mx-auto flex flex-col space-y-4">
      <Hero />
      <Features />
      <Pricing />
    </div>
  );
}
