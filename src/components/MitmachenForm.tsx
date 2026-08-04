"use client";

import { FormEvent, useMemo, useState } from "react";

import { SocialLinks } from "@/components/SocialLinks";
import { Locale, text } from "@/lib/i18n-shared";

const interestOptionsByLocale: Record<Locale, ReadonlyArray<string>> = {
  de: [
    "Ausstellungen / Installationen",
    "Konzerte / Performances",
    "Sound / Listening-Format",
    "Workshops / Vermittlung",
    "Kollaboration / neues Format",
    "Dokumentation / Begleitprogramm",
    "Sonstiges Format",
  ],
  en: [
    "Exhibitions / installations",
    "Concerts / performances",
    "Sound / listening format",
    "Workshops / mediation",
    "Collaboration / new format",
    "Documentation / accompanying programme",
    "Other format",
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
      de: `Open Call: ${values.name || "The Base"}`,
      en: `Open call: ${values.name || "The Base"}`,
    }),
  );

  const bodyLines = [
    text(locale, {
      de: "Neuer Open Call über the.base.ev",
      en: "New open call via the.base.ev",
    }),
    "",
    `${text(locale, { de: "Name", en: "Name" })}: ${values.name}`,
    `${text(locale, { de: "E-Mail", en: "Email" })}: ${values.email}`,
    `${text(locale, { de: "Telefon", en: "Phone" })}: ${values.phone || "-"}`,
    `${text(locale, { de: "Ort", en: "City" })}: ${values.city || "-"}`,
    `${text(locale, { de: "Interessen", en: "Interests" })}: ${values.interests.length > 0 ? values.interests.join(", ") : "-"}`,
    "",
    text(locale, {
      de: "Praxis, Kontext oder Bezug zum Vorhaben:",
      en: "Practice, context, or connection to the proposal:",
    }),
    values.experience || "-",
    "",
    text(locale, {
      de: "Vorhaben / Format / Anfrage:",
      en: "Proposal / format / inquiry:",
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

    if (!values.name.trim() || !values.email.trim()) {
      setError(
        text(locale, {
          de: "Bitte fülle Name und E-Mail aus.",
          en: "Please fill in name and email.",
        }),
      );
      return;
    }

    setError("");
    window.location.href = mailtoLink;
  }

  const inputClassName = "editorial-form-input editorial-form-input-refined";

  return (
    <section className="editorial-form-section editorial-form-section-refined">
      <div className="editorial-form-aside">
        <p className="type-meta text-[var(--muted)]">{text(locale, { de: "Kontaktformular", en: "Contact form" })}</p>
        <div className="editorial-form-intro">
          <h2 className="type-display-section text-[var(--ink)]">{text(locale, { de: "Anfrage", en: "Inquiry" })}</h2>
          <p className="editorial-form-copy type-body text-[var(--muted)]">
            {text(locale, {
              de: "Schick uns deine Kontaktdaten, inhaltlichen Schwerpunkte und ein paar Hinweise zu deinem Vorhaben. Beim Absenden öffnet sich dein Mailprogramm mit einer vorausgefüllten Nachricht an unser Team.",
              en: "Send us your contact details, areas of interest, and a few notes about your proposal. On submit, your email app opens with a prefilled message to our team.",
            })}
          </p>
        </div>
        <div className="editorial-form-contact editorial-form-contact-refined">
          <div className="editorial-form-contact-block">
            <a href="mailto:info@thebase-ev.de" className="type-body text-[var(--ink)]">
              info@thebase-ev.de
            </a>
            <p className="type-body text-[var(--muted)]">BOA / Bunker of Art, Scheibenstraße 34, Aachen</p>
          </div>
          <SocialLinks locale={locale} size="sm" className="editorial-form-socials" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="editorial-form-fields editorial-form-refined layout-mitmachen-right-edge">
        <div className="editorial-form-group">
          <p className="type-meta text-[var(--muted)]">{text(locale, { de: "Kontakt", en: "Contact" })}</p>
          <div className="editorial-form-grid editorial-form-group-grid">
            <label className="editorial-form-field editorial-form-field-compact">
              <span className="type-meta text-[var(--muted)]">{text(locale, { de: "Name*", en: "Name*" })}</span>
              <input
                required
                type="text"
                value={values.name}
                onChange={(event) => updateValue("name", event.target.value)}
                className={inputClassName}
              />
            </label>

            <label className="editorial-form-field editorial-form-field-compact">
              <span className="type-meta text-[var(--muted)]">{text(locale, { de: "E-Mail*", en: "Email*" })}</span>
              <input
                required
                type="email"
                value={values.email}
                onChange={(event) => updateValue("email", event.target.value)}
                className={inputClassName}
              />
            </label>

            <label className="editorial-form-field editorial-form-field-compact">
              <span className="type-meta text-[var(--muted)]">{text(locale, { de: "Telefon", en: "Phone" })}</span>
              <input
                type="tel"
                value={values.phone}
                onChange={(event) => updateValue("phone", event.target.value)}
                className={inputClassName}
              />
            </label>

            <label className="editorial-form-field editorial-form-field-compact">
              <span className="type-meta text-[var(--muted)]">{text(locale, { de: "Ort", en: "City" })}</span>
              <input
                type="text"
                value={values.city}
                onChange={(event) => updateValue("city", event.target.value)}
                className={inputClassName}
              />
            </label>
          </div>
        </div>

        <div className="editorial-form-group">
          <p className="type-meta text-[var(--muted)]">{text(locale, { de: "Schwerpunkte", en: "Focus" })}</p>
          <fieldset className="editorial-form-fieldset">
            <legend className="type-meta text-[var(--muted)]">{text(locale, { de: "Interessen*", en: "Interests*" })}</legend>
            <div className="editorial-form-checklist">
              {interestOptions.map((interest) => (
                <label key={interest} className="editorial-form-check type-body text-[var(--ink)]">
                  <input
                    type="checkbox"
                    checked={values.interests.includes(interest)}
                    onChange={() => toggleInterest(interest)}
                  />
                  <span>{interest}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="editorial-form-group">
          <p className="type-meta text-[var(--muted)]">{text(locale, { de: "Kontext / Anfrage", en: "Context / inquiry" })}</p>
          <label className="editorial-form-field editorial-form-field-compact">
            <span className="type-meta text-[var(--muted)]">
              {text(locale, {
                de: "Praxis, Kontext oder Bezug zum Vorhaben",
                en: "Practice, context, or connection to the proposal",
              })}
            </span>
            <textarea
              value={values.experience}
              onChange={(event) => updateValue("experience", event.target.value)}
              rows={5}
              className={inputClassName}
            />
          </label>

          <label className="editorial-form-field editorial-form-field-compact">
            <span className="type-meta text-[var(--muted)]">{text(locale, { de: "Vorhaben / Format / Anfrage", en: "Proposal / format / inquiry" })}</span>
            <textarea
              value={values.idea}
              onChange={(event) => updateValue("idea", event.target.value)}
              rows={4}
              className={inputClassName}
            />
          </label>
        </div>

        {error ? <p role="alert" className="type-body text-[var(--accent)]">{error}</p> : null}

        <div className="editorial-form-actions editorial-form-actions-refined editorial-form-actions-split">
          <p className="type-body text-[var(--muted)] editorial-form-actions-note">* {text(locale, { de: "Pflichtfelder", en: "Required fields" })}</p>
          <button
            type="submit"
            className="editorial-form-submit type-meta editorial-form-actions-cta"
          >
            {text(locale, {
              de: "Per E-Mail senden",
              en: "Send by email",
            })}
          </button>
        </div>
      </form>
    </section>
  );
}
