import { Logo } from "@/components/site/logo";
import { company, nav } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink-950 text-white">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo className="h-10" />
          <p className="mt-6 max-w-xs font-heading text-2xl font-light text-white/80">{company.tagline}</p>
        </div>
        <div>
          <p className="label-text text-brand">Explore</p>
          <ul className="mt-3 text-sm text-white/60">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="inline-block py-2.5 transition-colors hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label-text text-brand">Head office</p>
          <address className="mt-5 space-y-1 text-sm not-italic text-white/60">
            {company.address.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <a href={company.phoneHref} className="mt-2 block py-2.5 hover:text-white">
              {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="block py-2.5 hover:text-white">
              {company.email}
            </a>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs tracking-wide text-white/40 sm:flex-row sm:justify-between">
          <p>&copy; {company.legalName}. All rights reserved.</p>
          <p>A member of {company.group}</p>
        </div>
      </div>
    </footer>
  );
}
