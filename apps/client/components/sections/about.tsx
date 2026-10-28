import { LoadingImage } from "@/components/site/loading-image";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";

export function About() {
  return (
    <section id="about" className="bg-paper py-24 text-ink-950 sm:py-32">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SplitHeading accent="Intank Group." className="font-heading text-4xl leading-tight font-medium sm:text-5xl">
              The midstream and downstream platform of Intank Group.
            </SplitHeading>
            <Reveal className="mt-8 space-y-5 leading-relaxed text-ink-950/70">
              <p>
                Intank Petroleum Ltd is a physical energy trading and petroleum-products 
                company focused on the trading, storage, logistics, distribution and supply
                of refined petroleum products. We connect international and regional supply 
                markets with commercial, industrial, transport and institutional demand through
                integrated trading, supply and logistics solutions.
              </p>
              <p>
                Headquartered in Kigali, our strategy is centred on commodity trading, security of
                supply, efficient product movement, strategic infrastructure and long-term market
                access. With an established base in Rwanda, we aim to build a strong regional trading
                and supply platform, supporting energy markets across East Africa, including Kenya and
                Tanzania.
              </p>
            </Reveal>
          </div>
          <Reveal className="relative aspect-4/3 overflow-hidden rounded-2xl bg-ink-950/5 lg:aspect-auto">
            <LoadingImage
              tone="light"
              src="/images/intank-convoy.png"
              alt="Intank Petroleum terminal at dusk"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
