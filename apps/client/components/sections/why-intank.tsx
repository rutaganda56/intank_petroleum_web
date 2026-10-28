import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { strengths } from "@/lib/site";

export function WhyIntank() {
  return (
    <section id="why" className="bg-paper py-24 text-ink-950 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SplitHeading accent="scalable supply." className="font-heading text-4xl leading-tight font-medium sm:text-5xl">
            The foundations for dependable, scalable supply.
          </SplitHeading>
          <Reveal className="lead-text mt-6 text-ink-950/60">
            A focused physical-energy model, integrated capability across the supply chain and a network of
            strategic relationships.
          </Reveal>
        </div>

        <ol className="border-t border-ink-950/15">
          {strengths.map((item) => (
            <Reveal
              as="li"
              key={item.title}
              y={16}
              className="group border-b border-ink-950/15 py-8"
            >
              <div>
                <h3 className="font-heading text-3xl font-medium transition-colors group-hover:text-brand">{item.title}</h3>
                <p className="mt-2 max-w-lg leading-relaxed text-ink-950/60">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
