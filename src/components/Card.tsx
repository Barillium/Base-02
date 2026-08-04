import Image from "next/image";
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
  external?: boolean;
  image?: {
    src: string;
    alt: string;
  };
};

export function Card({ title, href, description, meta, locale, ctaLabel, external, image }: CardProps) {
  const label = ctaLabel ?? text(locale, { de: "Weiter", en: "More" });

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      className="group -mx-3 block px-3 py-3.5 transition-colors duration-200 hover:bg-black/[0.05] focus-visible:bg-black/[0.05] focus-visible:outline-none md:-mx-4 md:px-4 md:py-4"
    >
      <div className={image ? "grid gap-4 md:grid-cols-[minmax(9rem,11rem)_minmax(0,1fr)] md:items-start md:gap-6" : undefined}>
        {image ? (
          <div className="relative aspect-[4/5] overflow-hidden rounded-[6px] border border-[var(--line)] bg-[var(--paper)]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 767px) 100vw, 12rem"
              className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.02] group-focus-visible:scale-[1.02] md:p-2.5"
            />
          </div>
        ) : null}
        <div className="grid w-full min-w-0 gap-2.5 md:grid-cols-[minmax(0,1fr)_minmax(7.9rem,9.8rem)] md:items-end md:gap-x-7 md:gap-y-3 md:pr-3 lg:gap-x-8 lg:pr-6 xl:pr-10 2xl:pr-14">
          <div className="grid min-w-0 gap-1.5 md:gap-2">
            {meta ? <p className="type-meta text-[var(--muted)] transition-colors duration-200 group-hover:text-[var(--ink)] group-focus-visible:text-[var(--ink)]">{meta}</p> : null}
            <h4 className="type-display-card text-[var(--ink)]">{title}</h4>
            <p className="type-body line-clamp-2 max-w-[44rem] text-[var(--muted)] transition-colors duration-200 group-hover:text-[var(--ink)] group-focus-visible:text-[var(--ink)] md:line-clamp-3">{description}</p>
          </div>
          <span className="type-meta mt-0.5 ml-auto inline-flex items-center justify-self-end self-end whitespace-nowrap text-right text-[var(--ink)] transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 md:mt-0 md:justify-self-end md:pt-0.5 md:group-hover:translate-x-2 md:group-focus-visible:translate-x-2">
            {label}
            {external ? (
              <span className="sr-only">
                {text(locale, {
                  de: " öffnet in einem neuen Tab",
                  en: " opens in a new tab",
                })}
              </span>
            ) : null}
          </span>
        </div>
      </div>
    </Link>
  );
}
