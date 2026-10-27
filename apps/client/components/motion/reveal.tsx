"use client";

import { motion, type HTMLMotionProps } from "motion/react";

type RevealProps = HTMLMotionProps<"div"> & {
  /** Render as a list item when used directly inside a <ul> or <ol>. */
  as?: "div" | "li";
  delay?: number;
  y?: number;
};

/** Fades, lifts and un-blurs its children once they scroll into view, as on eleeeh.com. */
export function Reveal({ as = "div", delay = 0, y = 32, ...props }: RevealProps) {
  const animation = {
    initial: { opacity: 0, y, filter: "blur(12px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, amount: 0.15, margin: "0px 0px -8% 0px" },
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] as const, delay },
  };
  if (as === "li") {
    return <motion.li {...animation} {...(props as unknown as HTMLMotionProps<"li">)} />;
  }
  return <motion.div {...animation} {...props} />;
}
