"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { GlowCard } from "@/components/motion/glow-card";
import { SplitHeading } from "@/components/motion/split-heading";
import { supplyChain } from "@/lib/site";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 4500;
const ease = [0.16, 1, 0.3, 1] as const;
const last = supplyChain.length - 1;
const pad = (i: number) => String(i + 1).padStart(2, "0");

/** Interactive walk through the seven supply-chain stages. Auto-advances until the visitor takes over. */
export function SupplyChain() {
  const ref = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const inView = useInView(ref, { amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const autoplay = inView && !touched && !reduceMotion;

  useEffect(() => {
    if (!autoplay) return;
    const id = setTimeout(() => setActive((i) => (i === last ? 0 : i + 1)), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [autoplay, active]);

  function select(i: number) {
    setTouched(true);
    setActive(Math.min(Math.max(i, 0), last));
  }

  function onTabKey(event: KeyboardEvent) {
    const next = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: last }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    const i = Math.min(Math.max(next, 0), last);
    select(i);
    tabs.current[i]?.focus();
  }

  const step = supplyChain[active];
  const progress = `${(active / last) * 100}%`;

  return (
    <section ref={ref} id="supply-chain" className="overflow-hidden bg-ink-900 py-24 text-white sm:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SplitHeading
            accent="dependable supply chain."
            accentClassName="text-brand-bright"
            className="max-w-3xl font-heading text-4xl leading-tight font-medium sm:text-5xl"
          >
            Seven linked stages, one dependable supply chain.
          </SplitHeading>
          <p className="lead-text max-w-sm text-white/55">Select a stage to see how product moves from source to customer.</p>
        </div>

        {/* Desktop: horizontal stepper with a detail panel */}
        <div className="mt-16 hidden lg:block">
          <div
            role="tablist"
            aria-label="Supply chain stages"
            onKeyDown={onTabKey}
            className="relative grid grid-cols-7 gap-4"
          >
            {/* Track from the first dot to the last; the blue part fills up to the selected stage. */}
            <span aria-hidden="true" className="absolute top-6 right-[calc((100%-6rem)/7-1.5rem)] left-6 h-px bg-white/10">
              <motion.span
                className="absolute inset-y-0 left-0 bg-brand"
                initial={false}
                animate={{ width: progress }}
                transition={{ duration: 0.7, ease }}
              />
            </span>
            {supplyChain.map((item, i) => (
              <button
                key={item.name}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`stage-tab-${i}`}
                aria-selected={i === active}
                aria-controls="stage-panel"
                tabIndex={i === active ? 0 : -1}
                onClick={() => select(i)}
                className="group relative flex flex-col items-start gap-4 text-left outline-none"
              >
                <StageDot index={i} active={active} />
                <span
                  className={cn(
                    "font-heading text-lg leading-snug font-medium transition-colors",
                    i === active ? "text-white" : "text-white/45 group-hover:text-white/80",
                  )}
                >
                  {item.name}
                </span>
              </button>
            ))}
          </div>

          <GlowCard
            role="tabpanel"
            id="stage-panel"
            aria-labelledby={`stage-tab-${active}`}
            className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-ink-950/60"
          >
            <div className="flex items-center gap-10 p-10">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease }}
                  className="flex flex-1 items-center gap-10"
                >
                  <span className="font-heading text-7xl font-medium text-brand-bright/25">{pad(active)}</span>
                  <div>
                    <h3 className="font-heading text-3xl font-medium">{step.name}</h3>
                    <p className="mt-3 max-w-2xl leading-relaxed text-white/65">{step.body}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="flex shrink-0 gap-2">
                <StepButton label="Previous stage" disabled={active === 0} onClick={() => select(active - 1)}>
                  <ChevronLeft className="size-5" />
                </StepButton>
                <StepButton label="Next stage" disabled={active === last} onClick={() => select(active + 1)}>
                  <ChevronRight className="size-5" />
                </StepButton>
              </div>
            </div>
            {autoplay && (
              <motion.span
                key={`timer-${active}`}
                aria-hidden="true"
                className="block h-0.5 origin-left bg-brand-bright/60"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
              />
            )}
          </GlowCard>
        </div>

        {/* Mobile and tablet: vertical list, the selected stage expands */}
        <ol className="relative mt-12 lg:hidden">
          {supplyChain.map((item, i) => {
            const open = i === active;
            return (
              <li key={item.name} className="relative">
                {/* Connector down to the next stage's dot, blue once that stage has been passed */}
                {i < last && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute top-9 -bottom-9 left-6 w-px transition-colors duration-500",
                      i < active ? "bg-brand" : "bg-white/10",
                    )}
                  />
                )}
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`stage-body-${i}`}
                  onClick={() => select(i)}
                  className="group flex w-full items-center gap-5 py-3 text-left outline-none"
                >
                  <StageDot index={i} active={active} />
                  <span
                    className={cn(
                      "flex-1 font-heading text-xl font-medium transition-colors",
                      open ? "text-white" : "text-white/50",
                    )}
                  >
                    {item.name}
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-5 text-white/40 transition-transform duration-300",
                      open && "rotate-180 text-white",
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`stage-body-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease }}
                      className="overflow-hidden"
                    >
                      <p className="pb-4 pl-17 leading-relaxed text-white/65">{item.body}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function StageDot({ index, active }: { index: number; active: number }) {
  const state = index === active ? "current" : index < active ? "done" : "upcoming";
  return (
    <span
      className={cn(
        "relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border font-mono text-xs transition-all duration-500",
        state === "current" &&
          "border-brand bg-brand text-white shadow-[0_0_0_6px_rgb(38_129_199/0.18),0_0_28px_rgb(74_159_219/0.45)]",
        state === "done" && "border-brand/60 bg-ink-900 text-brand-bright",
        state === "upcoming" && "border-white/20 bg-ink-900 text-white/45 group-hover:border-white/40",
        "group-focus-visible:ring-2 group-focus-visible:ring-brand-bright group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-ink-900",
      )}
    >
      {pad(index)}
    </span>
  );
}

function StepButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex size-12 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-brand hover:bg-brand disabled:pointer-events-none disabled:opacity-30"
    >
      {children}
    </button>
  );
}
