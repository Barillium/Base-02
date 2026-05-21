"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { Locale, text } from "@/lib/i18n-shared";

type LanguageSwitcherProps = {
  locale: Locale;
  className?: string;
};

const options: ReadonlyArray<Locale> = ["de", "en"];

export function LanguageSwitcher({ locale, className }: LanguageSwitcherProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function switchLocale(nextLocale: Locale) {
    if (nextLocale === locale) {
      return;
    }

    startTransition(() => {
      void (async () => {
        await fetch("/api/locale", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ locale: nextLocale }),
        });

        router.refresh();
      })();
    });
  }

  return (
    <div
      role="group"
      aria-label={text(locale, {
        de: "Sprache umstellen",
        en: "Change language",
      })}
      className={`inline-flex overflow-hidden border border-[var(--line)] ${className ?? ""}`}
    >
      {options.map((option) => {
        const active = locale === option;

        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => switchLocale(option)}
            disabled={isPending}
            className={`type-meta min-w-[2.75rem] px-[0.78rem] py-[0.52rem] !text-[0.66rem] transition-colors md:min-w-[3rem] md:px-[0.9rem] md:py-[0.56rem] ${
              active
                ? "bg-[var(--ink)] text-[var(--paper)]"
                : "bg-[var(--paper)] text-[var(--muted)] hover:bg-[var(--ink)] hover:text-[var(--paper)]"
            } ${isPending ? "opacity-60" : ""}`}
          >
            {option.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
