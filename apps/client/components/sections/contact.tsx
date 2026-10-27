import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { GlowCard } from "@/components/motion/glow-card";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { ContactForm } from "@/components/sections/contact-form";
import { MapFrame } from "@/components/sections/map-frame";
import { company } from "@/lib/site";

export function Contact() {
  const query = encodeURIComponent(company.address.mapQuery);
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${query}`;

  const actions = [
    { icon: Phone, label: "Call us", href: company.phoneHref },
    { icon: MessageCircle, label: "WhatsApp", href: company.whatsappHref, external: true },
    { icon: Mail, label: "Email", href: `mailto:${company.email}` },
  ];

  const details = [
    { icon: MapPin, label: "Head office", lines: company.address.lines },
    { icon: Phone, label: "Phone", lines: [company.phone], href: company.phoneHref },
    { icon: Mail, label: "Email", lines: [company.email], href: `mailto:${company.email}` },
  ];

  return (
    <section id="contact" className="relative isolate overflow-hidden bg-ink-950 py-24 text-white sm:py-32">
      <Image src="/images/terminal-sunset.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover opacity-25" />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-ink-950 via-ink-950/80 to-ink-950" />

      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div className="flex flex-col">
            <SplitHeading
              accent="together."
              accentClassName="text-brand-bright"
              className="font-heading text-4xl leading-[1.05] font-medium sm:text-5xl"
            >
              Fueling progress, together.
            </SplitHeading>
            <Reveal className="mt-6 max-w-md leading-relaxed text-white/65">
              Whether you are a commercial fuel customer, supplier, financier or public-sector partner, our team
              would like to hear from you.
            </Reveal>

            <Reveal delay={0.12} className="mt-8 flex flex-wrap gap-3">
              {actions.map(({ icon: Icon, label, href, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/4 px-5 py-3 text-sm font-medium backdrop-blur transition-colors hover:border-brand hover:bg-brand"
                >
                  <Icon className="size-4" />
                  {label}
                </a>
              ))}
            </Reveal>

            <dl className="mt-12 divide-y divide-white/10 border-y border-white/10">
              {details.map(({ icon: Icon, label, lines, href }, i) => (
                <Reveal key={label} delay={i * 0.12} y={16} className="flex gap-4 py-5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand-bright">
                    <Icon className="size-[1.1rem]" />
                  </span>
                  <div>
                    <dt className="label-text text-white/45">{label}</dt>
                    <dd className="mt-1 leading-relaxed text-white/90">
                      {href ? (
                        <a href={href} className="-my-2 inline-block py-2 transition-colors hover:text-brand-bright">
                          {lines[0]}
                        </a>
                      ) : (
                        lines.map((line) => <p key={line}>{line}</p>)
                      )}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>

          <Reveal delay={0.1}>
            <GlowCard className="rounded-3xl border border-white/10 bg-ink-900/80 backdrop-blur-xl">
              <ContactForm />
            </GlowCard>
          </Reveal>
        </div>

        <Reveal className="relative mt-16 h-80 overflow-hidden rounded-3xl border border-white/10 sm:h-96">
          <MapFrame
            title={`Map showing the ${company.name} head office`}
            src={`https://maps.google.com/maps?q=${query}&z=16&output=embed`}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-ink-950/90 to-transparent p-5 pt-16 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-heading text-xl font-medium">{company.name}</p>
                <p className="mt-1 text-sm text-white/65">{company.address.lines.join(", ")}</p>
              </div>
              <a
                href={directionsHref}
                target="_blank"
                rel="noreferrer"
                className="pointer-events-auto inline-flex w-fit items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-medium transition-colors hover:bg-brand/85"
              >
                <Navigation className="size-4" />
                Get directions
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
