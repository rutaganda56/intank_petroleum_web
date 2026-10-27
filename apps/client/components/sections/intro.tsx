import { Reveal } from "@/components/motion/reveal";
import { ScrollRevealText } from "@/components/motion/scroll-reveal-text";
import { highlights } from "@/lib/site";

export function Intro() {
  return (
    <section className="bg-ink-950 py-24 text-white sm:py-36">
      <div className="container-x">
        <ScrollRevealText className="max-w-5xl font-heading text-3xl leading-tight font-normal sm:text-4xl lg:text-5xl">
          Petroleum products, available where they are needed, when they are needed, through a supply chain
          that is physically reliable and commercially sustainable.
        </ScrollRevealText>

        <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4">
          {highlights.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08} className="bg-ink-950 p-6 sm:p-8">
              <dt className="label-text text-white/45">{item.label}</dt>
              <dd className="mt-3 font-heading text-2xl text-white sm:text-3xl">{item.value}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
