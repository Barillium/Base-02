"use client";

import { FormEvent, useState } from "react";

import { Locale, text } from "@/lib/i18n-shared";

type NewsletterFormProps = {
  locale: Locale;
};

const newsletterAddress = "info@thebase-ev.de";

export function NewsletterForm({ locale }: NewsletterFormProps) {
  const [email, setEmail] = useState("");

  function submitNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const subject = text(locale, {
      de: "Newsletter Anmeldung",
      en: "Newsletter signup",
    });
    const body = text(locale, {
      de: `Bitte diese E-Mail-Adresse zum Newsletter hinzufügen:\n\n${email}`,
      en: `Please add this email address to the newsletter:\n\n${email}`,
    });

    window.location.href = `mailto:${newsletterAddress}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form
      onSubmit={submitNewsletter}
      className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(340px,0.95fr)] md:items-end"
    >
      <label className="grid gap-2">
        <span className="type-meta text-[var(--muted)]">
          {text(locale, { de: "Newsletter", en: "Newsletter" })}
        </span>
        <span className="type-body text-[var(--ink)]">
          {text(locale, {
            de: "Updates zu Ausstellungen, Konzerten und Workshops.",
            en: "Updates on exhibitions, concerts, and workshops.",
          })}
        </span>
      </label>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={text(locale, { de: "E-Mail-Adresse", en: "Email address" })}
          className="h-11 w-full border border-[var(--line)] bg-[var(--paper)] px-3 text-[0.9rem] text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--ink)]"
        />
        <button
          type="submit"
          className="type-meta flex h-11 items-center justify-center border border-[var(--ink)] bg-[var(--ink)] px-4 text-[var(--paper)] transition-opacity hover:opacity-80"
        >
          {text(locale, { de: "Anmelden", en: "Sign up" })}
        </button>
      </div>
    </form>
  );
}
