import { ArrowUpRight, Compass, Globe2, Route } from "lucide-react";
import { MarketMap } from "@/components/sections/market-map";
import { marketsContent } from "@/lib/markets";

function MarketList({
  title,
  icon: Icon,
  items,
}: {
  title: string;
  icon: typeof Globe2;
  items: readonly { name: string; description: string }[];
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7" aria-label={title}>
      <h3 className="flex items-center gap-3 font-heading text-xl font-medium text-white">
        <Icon aria-hidden="true" className="size-5 text-brand-bright" />
        {title}
      </h3>
      <ul className="mt-5 divide-y divide-white/10">
        {items.map((item) => (
          <li key={item.name} className="py-4 first:pt-0 last:pb-0">
            <p className="font-medium text-white/90">{item.name}</p>
            <p className="mt-1 text-sm leading-relaxed text-white/55">{item.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Markets() {
  return (
    <section id="markets" aria-labelledby="markets-heading" className="bg-ink-950 py-24 text-white sm:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <p className="label-text text-brand-bright">Our regional footprint</p>
          <h2
            id="markets-heading"
            className="mt-4 font-heading text-4xl leading-tight font-medium sm:text-5xl"
          >
            Our Markets
          </h2>
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-white/60">{marketsContent.introduction}</p>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:gap-16">
          <MarketMap />
          <aside className="rounded-3xl border border-brand/25 bg-brand/8 p-7 sm:p-9">
            <Compass aria-hidden="true" className="size-7 text-brand-bright" />
            <h3 className="mt-5 font-heading text-2xl font-medium sm:text-3xl">
              Rwanda: a strategic regional hub
            </h3>
            <p className="mt-4 leading-relaxed text-white/65">
              Kigali places Intank at the heart of a connected regional market. From Rwanda, our platform is
              positioned to serve neighbouring landlocked markets while connecting them to coastal supply
              gateways.
            </p>
            <p className="mt-4 leading-relaxed text-white/65">
              The map shows indicative links through Mombasa, Dar es Salaam and Mozambique. It illustrates
              regional reach; it does not represent surveyed routes or guarantee current service coverage.
            </p>
            <p className="mt-6 flex items-start gap-3 border-t border-white/10 pt-5 text-sm leading-relaxed text-white/55">
              <ArrowUpRight aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-bright" />
              Route lines are indicative. The Mozambique corridor is shown generally and does not identify a
              specific port.
            </p>
          </aside>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-3">
          <MarketList title="Core markets" icon={Globe2} items={marketsContent.coreMarkets} />
          <MarketList title="Hub-served markets" icon={Compass} items={marketsContent.hubMarkets} />
          <MarketList title="Principal supply corridors" icon={Route} items={marketsContent.corridors} />
        </div>
      </div>
    </section>
  );
}
