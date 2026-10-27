"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { company, nav } from "@/lib/site";
import { cn } from "@/lib/utils";

const desktopNav = nav.slice(0, -1);


function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}
const getScrolled = () => window.scrollY > 24;
const getServerScrolled = () => false;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const scrolled = useSyncExternalStore(subscribeToScroll, getScrolled, getServerScrolled);

  const navRef = useRef<HTMLElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const sections = desktopNav
      .map((item) => document.getElementById(item.href.replace("#", "")))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);


  useEffect(() => {
    const line = underlineRef.current;
    if (!active || !line) return;

    const link = navRef.current?.querySelector<HTMLAnchorElement>(`a[href="${active}"]`);
    if (!link) return;

    const position = () => {
      line.style.transform = `translateX(${link.offsetLeft}px)`;
      line.style.width = `${link.offsetWidth}px`;
    };

    position();


    const frame = requestAnimationFrame(() => {
      line.dataset.ready = "true";
    });

    window.addEventListener("resize", position);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", position);
    };
  }, [active]);


  const showUnderline = active !== null && scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color] duration-500",
        scrolled ? "border-white/10 bg-ink-950/75 backdrop-blur-xl" : "border-transparent",
      )}
    >
      <div className="container-x flex h-18 items-center justify-between gap-6">
        <a href="#top" aria-label={`${company.name} home`} className="-my-2 shrink-0 py-2">
          <Logo preload className="h-8 sm:h-9" />
        </a>

        <nav
          ref={navRef}
          aria-label="Main"
          className="relative hidden items-center gap-8 lg:flex"
        >
          {desktopNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setActive(item.href)}
              aria-current={active === item.href ? "true" : undefined}
              className={cn(
                "py-3 text-sm transition-colors hover:text-white",
                active === item.href ? "text-white" : "text-white/70",
              )}
            >
              {item.label}
            </a>
          ))}


          <span
            ref={underlineRef}
            aria-hidden
            className={cn(
              "pointer-events-none absolute bottom-1 left-0 h-0.5 rounded-full bg-brand will-change-transform",
              "data-[ready=true]:transition-[transform,width,opacity] data-[ready=true]:duration-500 data-[ready=true]:ease-out-expo",
              "motion-reduce:transition-none",
              showUnderline ? "opacity-100" : "opacity-0",
            )}
          />
        </nav>

        <a
          href="#contact"
          className="hidden items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm text-white transition-colors hover:border-brand hover:bg-brand lg:inline-flex"
        >
          Get in touch <ArrowUpRight className="size-4" />
        </a>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="-mr-2.5 rounded-full p-2.5 text-white lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-6" />
        </button>
      </div>

      <Dialog open={open} onClose={setOpen} className="relative z-50 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition duration-300 data-closed:opacity-0"
        />
        <DialogPanel
          transition
          className="fixed inset-y-0 right-0 flex w-full max-w-sm flex-col bg-ink-950 px-6 py-5 text-white transition duration-500 ease-out-expo data-closed:translate-x-full"
        >
          <div className="flex items-center justify-between">
            <Logo className="h-8" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="-mr-2 rounded-full p-2"
              aria-label="Close menu"
            >
              <X className="size-6" />
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-12 flex flex-col">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-4 font-heading text-3xl font-light"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto space-y-1 text-sm text-white/60">
            <a href={company.phoneHref} className="block hover:text-white">
              {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="block hover:text-white">
              {company.email}
            </a>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}