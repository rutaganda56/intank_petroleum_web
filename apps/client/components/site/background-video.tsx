"use client";

import { useEffect, useRef } from "react";

type BackgroundVideoProps = {
  src: string;
  poster: string;
  className?: string;
  /** Time ranges in seconds, [from, to), that playback jumps over. */
  skip?: readonly (readonly [number, number])[];
};

/** Muted looping video that stays on its poster frame when the viewer prefers reduced motion. */
export function BackgroundVideo({ src, poster, className, skip }: BackgroundVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

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
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
}
