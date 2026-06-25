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
            className={`language-switcher-button type-meta min-w-[2.9rem] px-[0.82rem] py-[0.54rem] !text-[0.7rem] transition-colors md:min-w-[3.05rem] md:px-[0.94rem] md:py-[0.58rem] lg:min-w-[2.7rem] lg:px-[0.8rem] lg:py-[0.48rem] lg:!text-[0.78rem] ${
              active
                ? "bg-[var(--ink)]"
                : "bg-[var(--paper)] hover:bg-[var(--ink)]"
            } ${isPending ? "opacity-60" : ""}`}
          >
            {option.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
