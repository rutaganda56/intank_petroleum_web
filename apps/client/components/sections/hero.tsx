import { ArrowRight } from "lucide-react";
import { BackgroundVideo } from "@/components/site/background-video";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { company } from "@/lib/site";

export function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-svh flex-col overflow-hidden bg-ink-950 text-white">
      <BackgroundVideo
        src="/videos/terminal-gate.mp4"
        poster="/videos/terminal-gate-poster.jpg"
        // 6.4s–8.5s is a rear close-up where the AI-generated tanker lettering is garbled.
        skip={[[6.35, 8.5]]}
        className="absolute inset-0 -z-20 size-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-ink-950/80 via-ink-950/35 to-ink-950" />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-ink-950/85 via-ink-950/45 to-transparent" />

      <div className="container-x flex flex-1 flex-col justify-end pt-32 pb-16 sm:pb-24 lg:justify-center lg:pb-16">
        <SplitHeading
          as="h1"
          play="load"
          accent="A Stronger Tomorrow."
          accentClassName="block text-brand-bright"
          delay={0.2}
          className="max-w-4xl font-heading text-[2.75rem] leading-[1.05] font-semibold sm:text-6xl lg:text-7xl"
        >
          {company.tagline}
        </SplitHeading>

        <Reveal delay={0.9}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Reliable petroleum supply, strategic infrastructure and long-term market access across East Africa.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#business"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-brand/85"
            >
              Explore our business
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:border-white/60"
            >
              Talk to our team
            </a>
          </div>
        </Reveal>
      </div>

      <a
        href="#about"
        aria-label="Scroll to the next section"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 p-3 lg:block"
      >
        <span className="scroll-cue relative block h-12 w-px overflow-hidden bg-white/20" />
      </a>
    </section>
  );
}
