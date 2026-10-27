"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/** Google Maps embed, dark-styled, with a shimmering placeholder until it loads. */
export function MapFrame({ src, title }: { src: string; title: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && <span aria-hidden="true" className="skeleton absolute inset-0" />}
      <iframe
        title={title}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setLoaded(true)}
        className={cn(
          "absolute inset-0 size-full border-0 filter-[invert(90%)_hue-rotate(180deg)_saturate(0.6)_brightness(0.95)] transition-opacity duration-700",
          !loaded && "in-[.js]:opacity-0",
        )}
      />
    </>
  );
}
