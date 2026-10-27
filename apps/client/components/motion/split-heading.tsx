"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

type SplitHeadingProps = {
  as?: "h1" | "h2" | "h3";
  children: string;
  className?: string;
  /**
   * "load" plays immediately: words rise out of a line mask (hero).
   * "scroll" plays when the heading enters the viewport: letters fade up one by one, as on eleeeh.com.
   */
  play?: "load" | "scroll";
  delay?: number;
  /** Trailing phrase of the heading to highlight in brand blue, e.g. "end user." */
  accent?: string;
  /** Use "text-brand-bright" on dark backgrounds, where the deeper brand blue loses contrast. */
  accentClassName?: string;
};

/** Heading animated with GSAP SplitText. */
export function SplitHeading({
  as: Tag = "h2",
  children,
  className,
  play = "scroll",
  delay = 0,
  accent,
  accentClassName = "text-brand",
}: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split =
          play === "load"
            ? SplitText.create(el, {
                type: "lines,words",
                mask: "lines",
                autoSplit: true,
                onSplit(self) {
                  el.setAttribute("data-split-ready", "");
                  return gsap.from(self.words, { yPercent: 110, duration: 1.2, ease: "expo.out", stagger: 0.07, delay });
                },
              })
            : SplitText.create(el, {
                // Words keep letters together so lines only break between words.
                type: "words,chars",
                autoSplit: true,
                onSplit(self) {
                  el.setAttribute("data-split-ready", "");
                  return gsap.from(self.chars, {
                    opacity: 0,
                    y: 28,
                    duration: 0.8,
                    ease: "power3.out",
                    // 55ms per letter like eleeeh, capped so long headings finish within about a second.
                    stagger: Math.min(0.055, 1 / self.chars.length),
                    delay,
                    scrollTrigger: { trigger: el, start: "top 85%", once: true },
                  });
                },
              });
        return () => split.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        el.setAttribute("data-split-ready", "");
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} data-split="" className={className}>
      {accent && children.endsWith(accent) ? (
        <>
          {children.slice(0, -accent.length)}
          <span className={accentClassName}>{accent}</span>
        </>
      ) : (
        children
      )}
    </Tag>
  );
}
