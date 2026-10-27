import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { BusinessExplorer } from "@/components/sections/business-explorer";

export function Business() {
  return (
    <section id="business" className="bg-ink-950 py-24 text-white sm:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <SplitHeading accent="end user." accentClassName="text-brand-bright" className="font-heading text-4xl leading-tight font-medium sm:text-5xl">
              Moving petroleum from supply point to end user.
            </SplitHeading>
          </div>
          <Reveal className="max-w-md text-white/60">
            Our business is organised around connected areas of activity, from bulk storage and product
            management to logistics, distribution and strategic supply.
          </Reveal>
        </div>

        <BusinessExplorer />
      </div>
    </section>
  );
}
