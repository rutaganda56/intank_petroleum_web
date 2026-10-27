"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { LoadingImage } from "@/components/site/loading-image";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown } from "lucide-react";
import { GlowCard } from "@/components/motion/glow-card";
import { capabilities } from "@/lib/site";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;
const last = capabilities.length - 1;

function Points({ points }: { points: readonly string[] }) {
  return (
    <ul className="grid gap-2.5 text-sm text-white/80 sm:grid-cols-2">
      {points.map((point) => (
        <li key={point} className="flex gap-2.5">
          <Check className="mt-0.5 size-4 shrink-0 text-brand-bright" />
          {point}
        </li>
      ))}
    </ul>
  );
}

/** Business areas as a list that drives one large photo panel (desktop) or an accordion (mobile). */
export function BusinessExplorer() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const item = capabilities[active];

  function onTabKey(event: KeyboardEvent) {
    const next = { ArrowDown: active + 1, ArrowUp: active - 1, Home: 0, End: last }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    const i = Math.min(Math.max(next, 0), last);
    setActive(i);
    tabs.current[i]?.focus();
  }

  return (
    <>
      {/* Desktop */}
      <div className="mt-16 hidden gap-12 lg:grid lg:grid-cols-[1fr_1.3fr]">
        <div role="tablist" aria-orientation="vertical" aria-label="Business areas" onKeyDown={onTabKey}>
          {capabilities.map((capability, i) => {
            const selected = i === active;
            return (
              <button
                key={capability.title}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`business-tab-${i}`}
                aria-selected={selected}
                aria-controls="business-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className="group relative block w-full border-b border-white/10 py-7 pl-7 text-left outline-none first:border-t focus-visible:bg-white/5"
              >
                <span aria-hidden="true" className="absolute inset-y-0 left-0 w-0.5 bg-white/10" />
                {selected && (
                  <motion.span
                    layoutId="business-marker"
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-0.5 bg-brand-bright"
                    transition={{ duration: 0.5, ease }}
                  />
                )}
                <span
                  className={cn(
                    "font-heading text-3xl font-medium transition-colors",
                    selected ? "text-white" : "text-white/40 group-hover:text-white/70",
                  )}
                >
                  {capability.title}
                </span>
                <AnimatePresence initial={false}>
                  {selected && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease }}
                      className="overflow-hidden"
                    >
                      <span className="block max-w-md pt-3 leading-relaxed text-white/60">{capability.body}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>

        <GlowCard
          role="tabpanel"
          id="business-panel"
          aria-labelledby={`business-tab-${active}`}
          className="relative min-h-[34rem] overflow-hidden rounded-3xl border border-white/10 bg-ink-900"
        >
          {/* All photos stay mounted and cross-fade, so switching never waits on a download. */}
          {capabilities.map((capability, i) => (
            <motion.div
              key={capability.image}
              aria-hidden={i !== active}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.06 }}
              transition={{ duration: 0.8, ease }}
            >
              <LoadingImage
                src={capability.image}
                alt={capability.alt}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </motion.div>
          ))}
          <div className="absolute inset-0 bg-linear-to-t from-ink-950 via-ink-950/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease }}
              >
                <p className="font-heading text-2xl font-medium">{item.title}</p>
                <div className="mt-5">
                  <Points points={item.points} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </GlowCard>
      </div>

      {/* Mobile and tablet: accordion */}
      <div className="mt-12 border-t border-white/10 lg:hidden">
        {capabilities.map((capability, i) => {
          const open = i === active;
          return (
            <div key={capability.title} className="border-b border-white/10">
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`business-body-${i}`}
                onClick={() => setActive(i)}
                className="flex w-full items-center justify-between gap-4 py-6 text-left"
              >
                <span
                  className={cn(
                    "font-heading text-2xl font-medium transition-colors",
                    open ? "text-white" : "text-white/50",
                  )}
                >
                  {capability.title}
                </span>
                <ChevronDown
                  className={cn("size-5 shrink-0 text-white/40 transition-transform duration-300", open && "rotate-180 text-white")}
                />
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={`business-body-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8">
                      <div className="relative aspect-16/10 overflow-hidden rounded-2xl">
                        <LoadingImage src={capability.image} alt={capability.alt} fill sizes="100vw" className="object-cover" />
                      </div>
                      <p className="mt-5 leading-relaxed text-white/60">{capability.body}</p>
                      <div className="mt-5">
                        <Points points={capability.points} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </>
  );
}
