import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  /** "light" is for dark backgrounds, "dark" for light ones. */
  variant?: "light" | "dark";
  /** Preload the image; set it on the header logo, which is above the fold on every page. */
  preload?: boolean;
  className?: string;
};

/** Intank Petroleum wordmark. */
export function Logo({ variant = "light", preload = false, className }: LogoProps) {
  return (
    <Image
      src={variant === "light" ? "/brand/logo-light.png" : "/brand/logo-dark.png"}
      alt="Intank Petroleum"
      width={1148}
      height={379}
      sizes="160px"
      preload={preload}
      className={cn("h-9 w-auto", className)}
    />
  );
}
