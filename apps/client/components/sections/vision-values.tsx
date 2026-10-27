import { GlowCard } from "@/components/motion/glow-card";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { mission, values, vision } from "@/lib/site";

export function VisionValues() {
  return (
    <section id="values" className="bg-ink-900 py-24 text-white sm:py-32">
      <div className="container-x">
        <SplitHeading accent="long term." accentClassName="text-brand-bright" className="max-w-3xl font-heading text-4xl leading-tight font-medium sm:text-5xl">
          Built for the long term.
        </SplitHeading>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <GlowCard loop className="h-full rounded-3xl border border-white/10 bg-ink-950 p-8 sm:p-10">
              <p className="label-text text-brand">Vision</p>
              <p className="mt-6 font-heading text-2xl leading-snug font-normal sm:text-3xl">{vision}</p>
            </GlowCard>
          </Reveal>
          <Reveal delay={0.12} className="h-full rounded-3xl bg-brand p-8 sm:p-10">
            <p className="label-text text-white/75">Mission</p>
            <p className="mt-6 font-heading text-2xl leading-snug font-normal sm:text-3xl">{mission}</p>
          </Reveal>
        </div>

        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, i) => (
            <Reveal as="li" key={value.name} delay={(i % 3) * 0.12}>
              <GlowCard className="h-full rounded-2xl border border-white/10 bg-ink-950/60 p-7">
                <h3 className="flex items-center gap-3 font-heading text-2xl font-medium">
                  <span className="size-2 rounded-full bg-brand" />
                  {value.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{value.body}</p>
              </GlowCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
