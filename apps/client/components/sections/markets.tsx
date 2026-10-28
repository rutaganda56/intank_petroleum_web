import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { MarketsExplorer } from "@/components/sections/markets-explorer";
import { marketsContent } from "@/lib/markets";

export function Markets() {
  return (
    <section id="markets" className="bg-ink-950 py-24 text-white sm:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <SplitHeading accent="supply routes." accentClassName="text-brand-bright" className="font-heading text-4xl leading-tight font-medium sm:text-5xl">
              Rwanda at the heart of East Africa’s supply routes.
            </SplitHeading>
          </div>
          <Reveal className="lead-text max-w-md text-white/60">{marketsContent.introduction}</Reveal>
        </div>

        <MarketsExplorer />
      </div>
    </section>
  );
}
