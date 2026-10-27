import Image from "next/image";
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
                Intank Petroleum Ltd is a physical energy and petroleum-products company focused on the
                storage, movement, distribution and supply of refined petroleum products. We connect
                international and regional sources of supply with commercial, industrial, transport and
                institutional demand.
              </p>
              <p>
                Headquartered in Kigali, our strategy is centred on security of supply, efficient product
                movement, strategic infrastructure and long-term market access, with an established base in
                Rwanda and a clear ambition to expand across East Africa.
              </p>
            </Reveal>
          </div>
          <Reveal className="relative aspect-4/3 overflow-hidden rounded-2xl lg:aspect-auto">
            <Image
              src="/images/terminal-sunset.jpg"
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
