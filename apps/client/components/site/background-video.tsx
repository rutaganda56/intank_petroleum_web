"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type BackgroundVideoProps = {
  src: string;
  poster: string;
  className?: string;
  /** Time ranges in seconds, [from, to), that playback jumps over. */
  skip?: readonly (readonly [number, number])[];
  /** Show a shimmering placeholder until the first frame is ready. Needs a positioned parent. */
  skeleton?: boolean;
};

/** Muted looping video that stays on its poster frame when the viewer prefers reduced motion. */
export function BackgroundVideo({ src, poster, className, skip, skeleton = false }: BackgroundVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // The first frame may already be decoded before React hydrates.
    if ((ref.current?.readyState ?? 0) >= 2) setLoaded(true);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => (reduce.matches ? video.pause() : void video.play().catch(() => {}));
    sync();
    reduce.addEventListener("change", sync);
    return () => reduce.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || !skip?.length) return;

    const jump = () => {
      const range = skip.find(([from, to]) => video.currentTime >= from && video.currentTime < to);
      if (range) video.currentTime = range[1];
    };
    // Check every rendered frame where supported so a skipped shot never flashes on screen.
    if ("requestVideoFrameCallback" in video) {
      let handle = 0;
      const onFrame = () => {
        jump();
        handle = video.requestVideoFrameCallback(onFrame);
      };
      handle = video.requestVideoFrameCallback(onFrame);
      return () => video.cancelVideoFrameCallback(handle);
    }
    const v = video as HTMLVideoElement;
    v.addEventListener("timeupdate", jump);
    return () => v.removeEventListener("timeupdate", jump);
  }, [skip]);

  return (
    <>
      {skeleton && !loaded && <span aria-hidden="true" className="skeleton absolute inset-0" />}
      <video
        ref={ref}
        className={cn(skeleton && "transition-opacity duration-700", skeleton && !loaded && "in-[.js]:opacity-0", className)}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        onLoadedData={() => setLoaded(true)}
      />
    </>
  );
}
