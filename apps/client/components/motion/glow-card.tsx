"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

type GlowCardProps = React.ComponentProps<"div"> & {
  /** Keep the light circling the edge on its own, for a featured card. */
  loop?: boolean;
  loopDuration?: number;
};

/** Card whose border lights up toward the pointer. See `.glow-card` in globals.css. */
export function GlowCard({ loop = false, loopDuration = 6000, className, children, ...props }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || loop) return;
    const rect = el.getBoundingClientRect();
    const dx = event.clientX - rect.left - rect.width / 2;
    const dy = event.clientY - rect.top - rect.height / 2;
    // How far the pointer is from the centre towards the nearest edge, 0 at the centre and 1 on the edge.
    const toEdgeX = dx === 0 ? Infinity : rect.width / 2 / Math.abs(dx);
    const toEdgeY = dy === 0 ? Infinity : rect.height / 2 / Math.abs(dy);
    const edge = Math.min(Math.max(1 / Math.min(toEdgeX, toEdgeY), 0), 1);
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
    el.style.setProperty("--edge", (edge * 100).toFixed(1));
    el.style.setProperty("--angle", `${(angle + 360) % 360}deg`);
  }

  useEffect(() => {
    const el = ref.current;
    if (!loop || !el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      el.style.setProperty("--angle", `${((elapsed / loopDuration) * 360) % 360}deg`);
      el.style.setProperty("--edge", `${Math.min((elapsed / 700) * 100, 100)}`);
      frame = requestAnimationFrame(tick);
    };
    // Only animate while the card is on screen.
    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      if (entry.isIntersecting) frame = requestAnimationFrame(tick);
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [loop, loopDuration]);

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      data-glow-loop={loop || undefined}
      className={cn("glow-card", className)}
      {...props}
    >
      <span aria-hidden="true" className="glow-edge" />
      {children}
    </div>
  );
}
