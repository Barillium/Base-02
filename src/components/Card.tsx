import Link from "next/link";

import { text } from "@/lib/i18n-shared";
import type { Locale } from "@/lib/i18n-shared";

type CardProps = {
  title: string;
  href: string;
  description: string;
  meta?: string;
  locale: Locale;
  ctaLabel?: string;
};

export function Card({ title, href, description, meta, locale, ctaLabel }: CardProps) {
  const label = ctaLabel ?? text(locale, { de: "Weiter", en: "More" });

  return (
    <Link
      href={href}
      className="group -mx-3 block px-3 py-4 transition-colors duration-300 hover:bg-black/[0.055] focus-visible:bg-black/[0.055] focus-visible:outline-none md:-mx-4 md:px-4 md:py-4"
    >
      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-5">
        <div>
          {meta ? <p className="type-meta text-[var(--muted)] transition-colors duration-300 group-hover:text-[var(--ink)]">{meta}</p> : null}
          <h4 className="type-display-card mt-1.5 text-[var(--ink)]">{title}</h4>
          <p className="type-body mt-2 max-w-2xl text-[var(--muted)] transition-colors duration-300 group-hover:text-[var(--ink)]">{description}</p>
        </div>
        <span className="type-meta text-[var(--ink)] transition-transform duration-300 group-hover:translate-x-2 md:group-hover:translate-x-4">
          {label}
        </span>
      </div>
    </Link>
  );
}
