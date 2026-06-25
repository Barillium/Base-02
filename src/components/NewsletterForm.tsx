"use client";

import { FormEvent, useId, useState } from "react";

import { Locale, text } from "@/lib/i18n-shared";

type NewsletterFormProps = {
  locale: Locale;
};

const newsletterAddress = "info@thebase-ev.de";

export function NewsletterForm({ locale }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const emailFieldId = useId();
  const emailHintId = useId();

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
      className="newsletter-form grid gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,0.95fr)] xl:items-end"
    >
      <label htmlFor={emailFieldId} className="grid gap-2">
        <span className="type-meta text-[var(--muted)]">
          {text(locale, { de: "Newsletter", en: "Newsletter" })}
        </span>
        <span id={emailHintId} className="type-body text-[var(--ink)]">
          {text(locale, {
            de: "Updates zu Ausstellungen, Konzerten und Workshops.",
            en: "Updates on exhibitions, concerts, and workshops.",
          })}
        </span>
      </label>
      <div className="grid min-w-0 gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
        <input
          id={emailFieldId}
          type="email"
          name="email"
          required
          autoComplete="email"
          aria-describedby={emailHintId}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={text(locale, { de: "E-Mail-Adresse", en: "Email address" })}
          className="newsletter-form-input h-11 w-full min-w-0 px-0 text-[0.9rem] text-[var(--ink)] outline-none placeholder:text-[var(--muted)]"
        />
        <button
          type="submit"
          className="newsletter-submit type-meta flex h-11 items-center justify-center px-0 sm:min-w-[8.25rem]"
        >
          {text(locale, { de: "Anmelden", en: "Sign up" })}
        </button>
      </div>
    </form>
  );
}
