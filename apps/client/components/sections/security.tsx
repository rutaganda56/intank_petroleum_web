import { ShieldCheck } from "lucide-react";
import { BackgroundVideo } from "@/components/site/background-video";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { securityOfSupply } from "@/lib/site";

export function Security() {
  return (
    <section id="security" className="bg-ink-950 py-24 text-white sm:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SplitHeading accent="every link in the chain." accentClassName="text-brand-bright" className="font-heading text-4xl leading-tight font-medium sm:text-5xl">
            Reducing uncertainty at every link in the chain.
          </SplitHeading>
          <Reveal className="mt-6 leading-relaxed text-white/60">
            Security of supply is central to our business model. We combine reliable sourcing, appropriate
            storage, coordinated logistics and strong relationships across the physical petroleum market.
          </Reveal>
          <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {securityOfSupply.map((item, i) => (
              <Reveal
                as="li"
                key={item}
                delay={i * 0.05}
                y={12}
                className="flex items-center gap-4 py-4 text-white/80"
              >
                <ShieldCheck className="size-5 shrink-0 text-brand" strokeWidth={1.5} />
                {item}
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal className="relative aspect-4/5 overflow-hidden rounded-3xl border border-white/10 sm:aspect-4/3 lg:aspect-4/5">
          <BackgroundVideo
            src="/videos/control-room.mp4"
            poster="/videos/control-room-poster.jpg"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink-950/90 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-7">
            <p className="font-heading text-2xl font-medium">Infrastructure built for continuity of supply.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
