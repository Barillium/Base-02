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
      className="group -mx-3 block px-3 py-4 transition-colors duration-300 hover:bg-black/[0.07] focus-visible:bg-black/[0.07] focus-visible:outline-none md:-mx-4 md:px-4 md:py-4"
    >
      <div className="grid max-w-[58rem] gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-x-7 md:gap-y-4 lg:max-w-[60rem]">
        <div className="min-w-0">
          {meta ? <p className="type-meta text-[var(--muted)] transition-colors duration-300 group-hover:text-[var(--ink)] group-focus-visible:text-[var(--ink)]">{meta}</p> : null}
          <h4 className="type-display-card mt-1.5 text-[var(--ink)]">{title}</h4>
          <p className="type-body mt-2 max-w-2xl text-[var(--muted)] transition-colors duration-300 group-hover:text-[var(--ink)] group-focus-visible:text-[var(--ink)]">{description}</p>
        </div>
        <span className="type-meta mt-1 inline-flex items-center justify-self-start text-[var(--ink)] transition-transform duration-300 group-hover:translate-x-3 group-focus-visible:translate-x-3 md:mt-0 md:justify-self-end md:group-hover:translate-x-5 md:group-focus-visible:translate-x-5">
          {label}
        </span>
      </div>
    </Link>
  );
}
