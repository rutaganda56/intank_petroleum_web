"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

type LoadingImageProps = ImageProps & {
  /** "light" for placeholders on light sections. */
  tone?: "dark" | "light";
};

/**
 * next/image that shows a shimmering placeholder until the photo has loaded, then fades it in.
 * The image is only hidden while JS runs (`in-[.js]`), so it still shows if scripts fail.
 * Needs a positioned parent, like any `fill` image.
 */
export function LoadingImage({ tone = "dark", className, onLoad, alt, ...props }: LoadingImageProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && (
        <span aria-hidden="true" className={cn("skeleton absolute inset-0", tone === "light" && "skeleton-light")} />
      )}
      <Image
        alt={alt}
        {...props}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
        className={cn("transition-opacity duration-700", !loaded && "in-[.js]:opacity-0", className)}
      />
    </>
  );
}
