"use client";

import { FormEvent, useMemo, useState } from "react";

import { SocialLinks } from "@/components/SocialLinks";
import { Locale, text } from "@/lib/i18n-shared";

const interestOptionsByLocale: Record<Locale, ReadonlyArray<string>> = {
  de: [
    "Ausstellungen",
    "Events / Konzerte",
    "Workshops",
    "Label / Musik",
    "Archiv / Dokumentation",
    "Produktion / Technik",
    "Awareness / Community",
  ],
  en: [
    "Exhibitions",
    "Events / concerts",
    "Workshops",
    "Label / music",
    "Archive / documentation",
    "Production / technical",
    "Awareness / community",
  ],
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  city: string;
  interests: string[];
  experience: string;
  idea: string;
};

type MitmachenFormProps = {
  locale: Locale;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  city: "",
  interests: [],
  experience: "",
  idea: "",
};

function buildMailtoLink(values: FormState, locale: Locale) {
  const subject = encodeURIComponent(
    text(locale, {
      de: `Mitmachen-Anfrage: ${values.name || "The Base"}`,
      en: `Get involved request: ${values.name || "The Base"}`,
    }),
  );

  const bodyLines = [
    text(locale, {
      de: "Neue Mitmachen-Anfrage über the.base.ev",
      en: "New get involved request via the.base.ev",
    }),
    "",
    `${text(locale, { de: "Name", en: "Name" })}: ${values.name}`,
    `${text(locale, { de: "E-Mail", en: "Email" })}: ${values.email}`,
    `${text(locale, { de: "Telefon", en: "Phone" })}: ${values.phone || "-"}`,
    `${text(locale, { de: "Ort", en: "City" })}: ${values.city || "-"}`,
    `${text(locale, { de: "Interessen", en: "Interests" })}: ${values.interests.length > 0 ? values.interests.join(", ") : "-"}`,
    "",
    text(locale, {
      de: "Bisherige Erfahrungen im Veranstaltungsbereich:",
      en: "Previous experience in event work:",
    }),
    values.experience || "-",
    "",
    text(locale, {
      de: "Projektidee / Motivation:",
      en: "Project idea / motivation:",
    }),
    values.idea || "-",
  ];

  const body = encodeURIComponent(bodyLines.join("\n"));
  return `mailto:info@thebase-ev.de?subject=${subject}&body=${body}`;
}

export function MitmachenForm({ locale }: MitmachenFormProps) {
  const [values, setValues] = useState<FormState>(initialState);
  const [error, setError] = useState("");

  const interestOptions = interestOptionsByLocale[locale];
  const mailtoLink = useMemo(() => buildMailtoLink(values, locale), [values, locale]);

  function updateValue<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function toggleInterest(interest: string) {
    setValues((current) => {
      const exists = current.interests.includes(interest);
      return {
        ...current,
        interests: exists
          ? current.interests.filter((entry) => entry !== interest)
          : [...current.interests, interest],
      };
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (values.interests.length === 0) {
      setError(
        text(locale, {
          de: "Bitte wähle mindestens ein Interessensfeld aus.",
          en: "Please select at least one field of interest.",
        }),
      );
      return;
    }

    if (!values.name.trim() || !values.email.trim() || !values.experience.trim()) {
      setError(
        text(locale, {
          de: "Bitte fülle Name, E-Mail und Erfahrung aus.",
          en: "Please fill in name, email, and experience.",
        }),
      );
      return;
    }

    setError("");
    window.location.href = mailtoLink;
  }

  return (
    <section className="grid gap-8 pt-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.55fr)]">
      <div className="space-y-5">
        <p className="type-meta text-[var(--muted)]">{text(locale, { de: "Kontaktformular", en: "Contact form" })}</p>
        <h2 className="type-display-section text-[var(--ink)]">{text(locale, { de: "Zum Mitmachen", en: "Get involved" })}</h2>
        <p className="type-body max-w-md text-[var(--muted)]">
          {text(locale, {
            de: "Schick uns deine Kontaktdaten, Interessen und bisherige Erfahrungen. Beim Absenden öffnet sich dein Mailprogramm mit einer vorausgefüllten Nachricht an unser Team.",
            en: "Send us your contact details, interests, and previous experience. On submit, your email app opens with a prefilled message to our team.",
          })}
        </p>
        <div className="space-y-2 pt-4">
          <p className="type-body text-[var(--ink)]">info@thebase-ev.de</p>
          <p className="type-body text-[var(--muted)]">BOA / Bunker of Art, Scheibenstraße 34, Aachen</p>
          <SocialLinks />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="type-meta text-[var(--muted)]">{text(locale, { de: "Name*", en: "Name*" })}</span>
            <input
              required
              type="text"
              value={values.name}
              onChange={(event) => updateValue("name", event.target.value)}
              className="w-full border border-[var(--line)] bg-[var(--paper)] px-3 py-3 text-[0.98rem] leading-[1.5] text-[var(--ink)] outline-none transition-colors focus:border-[var(--ink)]"
            />
          </label>

          <label className="space-y-2">
            <span className="type-meta text-[var(--muted)]">{text(locale, { de: "E-Mail*", en: "Email*" })}</span>
            <input
              required
              type="email"
              value={values.email}
              onChange={(event) => updateValue("email", event.target.value)}
              className="w-full border border-[var(--line)] bg-[var(--paper)] px-3 py-3 text-[0.98rem] leading-[1.5] text-[var(--ink)] outline-none transition-colors focus:border-[var(--ink)]"
            />
          </label>

          <label className="space-y-2">
            <span className="type-meta text-[var(--muted)]">{text(locale, { de: "Telefon", en: "Phone" })}</span>
            <input
              type="tel"
              value={values.phone}
              onChange={(event) => updateValue("phone", event.target.value)}
              className="w-full border border-[var(--line)] bg-[var(--paper)] px-3 py-3 text-[0.98rem] leading-[1.5] text-[var(--ink)] outline-none transition-colors focus:border-[var(--ink)]"
            />
          </label>

          <label className="space-y-2">
            <span className="type-meta text-[var(--muted)]">{text(locale, { de: "Ort", en: "City" })}</span>
            <input
              type="text"
              value={values.city}
              onChange={(event) => updateValue("city", event.target.value)}
              className="w-full border border-[var(--line)] bg-[var(--paper)] px-3 py-3 text-[0.98rem] leading-[1.5] text-[var(--ink)] outline-none transition-colors focus:border-[var(--ink)]"
            />
          </label>
        </div>

        <fieldset className="space-y-3 border border-[var(--line)] p-4">
          <legend className="type-meta px-1 text-[var(--muted)]">{text(locale, { de: "Interessen*", en: "Interests*" })}</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {interestOptions.map((interest) => (
              <label key={interest} className="type-body flex items-center gap-2 text-[var(--ink)]">
                <input
                  type="checkbox"
                  checked={values.interests.includes(interest)}
                  onChange={() => toggleInterest(interest)}
                  className="h-4 w-4 border-[var(--line)] accent-[var(--ink)]"
                />
                <span>{interest}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="block space-y-2">
          <span className="type-meta text-[var(--muted)]">
            {text(locale, {
              de: "Bisherige Erfahrungen im Veranstaltungsbereich*",
              en: "Previous experience in event work*",
            })}
          </span>
          <textarea
            required
            value={values.experience}
            onChange={(event) => updateValue("experience", event.target.value)}
            rows={5}
            className="w-full resize-y border border-[var(--line)] bg-[var(--paper)] px-3 py-3 text-[0.98rem] leading-[1.5] text-[var(--ink)] outline-none transition-colors focus:border-[var(--ink)]"
          />
        </label>

        <label className="block space-y-2">
          <span className="type-meta text-[var(--muted)]">{text(locale, { de: "Projektidee / Motivation", en: "Project idea / motivation" })}</span>
          <textarea
            value={values.idea}
            onChange={(event) => updateValue("idea", event.target.value)}
            rows={4}
            className="w-full resize-y border border-[var(--line)] bg-[var(--paper)] px-3 py-3 text-[0.98rem] leading-[1.5] text-[var(--ink)] outline-none transition-colors focus:border-[var(--ink)]"
          />
        </label>

        {error ? <p className="type-body text-[var(--accent)]">{error}</p> : null}

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            className="type-meta border border-[var(--ink)] bg-[var(--ink)] px-5 py-3 text-[var(--paper)] transition-opacity hover:opacity-80"
          >
            {text(locale, {
              de: "Anfrage per E-Mail senden",
              en: "Send request by email",
            })}
          </button>
          <p className="type-body text-[var(--muted)]">* {text(locale, { de: "Pflichtfelder", en: "Required fields" })}</p>
        </div>
      </form>
    </section>
  );
}
