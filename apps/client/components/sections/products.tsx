import { Check, Cog, Cylinder, Factory, Flame, Fuel, Plane, Truck, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { products } from "@/lib/site";
import { cn } from "@/lib/utils";

const icons: Record<(typeof products)[number]["name"], LucideIcon> = {
  Diesel: Truck,
  Gasoline: Fuel,
  "Jet A-1": Plane,
  "Fuel Oil": Factory,
  LPG: Flame,
  Lubricants: Cog,
  NGL: Cylinder,
};

export function Products() {
  return (
    <section id="products" className="bg-white py-24 text-ink-950 sm:py-32">
      <div className="container-x">
        <div className="max-w-2xl">
          <SplitHeading accent="keep the region moving." className="font-heading text-4xl leading-tight font-medium sm:text-5xl">
            Refined products for the markets that keep the region moving.
          </SplitHeading>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {products.map((product, i) => {
            const Icon = icons[product.name];
            const featured = "detail" in product;
            return (
              <Reveal
                as="li"
                key={product.name}
                delay={(i % 3) * 0.08}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-ink-950/10 bg-paper p-5 transition-colors sm:p-7 duration-500 hover:border-brand",
                  featured && "col-span-2 lg:col-span-3 lg:grid lg:grid-cols-[1fr_1.2fr] lg:items-end lg:gap-12",
                )}
              >
                <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-500 ease-out-expo group-hover:scale-x-100" />
                <div>
                  <Icon className="size-7 text-brand" strokeWidth={1.5} />
                  <h3 className="mt-6 font-heading text-xl font-medium min-[375px]:text-2xl sm:mt-8 sm:text-3xl">{product.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-950/60">{product.use}</p>
                </div>
                {featured && (
                  <div className="mt-6 lg:mt-0">
                    <p className="leading-relaxed text-ink-950/70">{product.detail}</p>
                    <ul className="mt-5 grid grid-cols-2 gap-2.5 text-sm text-ink-950/80 sm:grid-cols-4">
                      {product.points.map((point) => (
                        <li key={point} className="flex gap-2">
                          <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
