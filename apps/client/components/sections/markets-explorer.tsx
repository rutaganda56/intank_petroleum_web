"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { GlowCard } from "@/components/motion/glow-card";
import { MarketMap } from "@/components/sections/market-map";
import { marketsContent } from "@/lib/markets";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;
const views = marketsContent.views;
const last = views.length - 1;

function Points({ points }: { points: readonly string[] }) {
  return (
    <span className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/80">
      {points.map((point) => (
        <span key={point} className="flex gap-2">
          <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-bright" />
          {point}
        </span>
      ))}
    </span>
  );
}

export function MarketsExplorer() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const view = views[active];

  function onTabKey(event: KeyboardEvent) {
    const next = { ArrowDown: active + 1, ArrowUp: active - 1, Home: 0, End: last }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    const i = Math.min(Math.max(next, 0), last);
    setActive(i);
    tabs.current[i]?.focus();
  }

  return (
    <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
      <div className="grid grid-cols-2 gap-2 lg:hidden">
        {views.map((v, i) => (
          <button
            key={v.id}
            type="button"
            aria-pressed={i === active}
            aria-controls="markets-panel"
            onClick={() => setActive(i)}
            className={cn(
              "rounded-full border px-4 py-2.5 text-sm font-medium transition-colors",
              i === active
                ? "border-brand bg-brand text-white"
                : "border-white/15 text-white/70 hover:border-white/40 hover:text-white",
            )}
          >
            {v.label}
          </button>
        ))}
      </div>

      <GlowCard
        id="markets-panel"
        className="overflow-hidden rounded-3xl border border-white/10 bg-ink-900 lg:col-start-2 lg:row-start-1"
      >
        <div className="aspect-[739/791] w-full">
          <MarketMap active={view.id} />
        </div>
        <ul
          aria-label="Map legend"
          className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 px-6 py-4 text-xs text-white/55 sm:px-7"
        >
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="size-3 rounded-sm bg-brand/70" />
            Core markets
          </li>
          <li className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="size-3 rounded-sm border border-brand-bright/50 bg-[repeating-linear-gradient(45deg,rgb(74_159_219/0.6)_0_1.5px,transparent_1.5px_4px)]"
            />
            Served from Rwanda
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="w-5 border-t-2 border-brand" />
            Supply corridor
          </li>
          <li>Illustrative map. Routes are indicative.</li>
        </ul>
      </GlowCard>

      <div className="lg:hidden" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={view.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease }}
            className="border-l-2 border-brand-bright pl-5"
          >
            <h3 className="font-heading text-2xl font-medium">{view.title}</h3>
            <p className="mt-2 leading-relaxed text-white/60">{view.body}</p>
            <Points points={view.points} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-10 lg:col-start-1 lg:row-start-1">
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label="Regional hub and supply corridors"
          onKeyDown={onTabKey}
          className="hidden lg:block"
        >
          {views.map((v, i) => {
            const selected = i === active;
            return (
              <button
                key={v.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`markets-tab-${i}`}
                aria-selected={selected}
                aria-controls="markets-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className="group relative block w-full border-b border-white/10 py-7 pl-7 text-left outline-none first:border-t focus-visible:bg-white/5"
              >
                <span aria-hidden="true" className="absolute inset-y-0 left-0 w-0.5 bg-white/10" />
                {selected && (
                  <motion.span
                    layoutId="markets-marker"
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
                  {v.title}
                </span>
                <AnimatePresence initial={false}>
                  {selected && (
                    <motion.span
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease }}
                      className="block overflow-hidden"
                    >
                      <span className="block max-w-md pt-3 leading-relaxed text-white/60">{v.body}</span>
                      <Points points={v.points} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>

        <dl className="mt-auto grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-1">
          {marketsContent.summary.map((item) => (
            <div key={item.label} className="bg-ink-950 px-6 py-5">
              <dt className="label-text text-white/45">{item.label}</dt>
              <dd className="mt-1.5 font-heading text-xl text-white">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
