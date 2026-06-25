"use client";

import { FormEvent, useMemo, useState } from "react";

import { SocialLinks } from "@/components/SocialLinks";
import { Locale, text } from "@/lib/i18n-shared";

type FormState = {
  contactName: string;
  organisation: string;
  email: string;
  phone: string;
  plannedProduction: string;
  preferredPeriod: string;
  partners: string;
  funding: string;
  technicalRequirements: string;
  context: string;
};

type MediaBookingFormProps = {
  locale: Locale;
};

const initialState: FormState = {
  contactName: "",
  organisation: "",
  email: "",
  phone: "",
  plannedProduction: "",
  preferredPeriod: "",
  partners: "",
  funding: "",
  technicalRequirements: "",
  context: "",
};

function buildMailtoLink(values: FormState, locale: Locale) {
  const subject = encodeURIComponent(
    text(locale, {
      de: `Produktionsanfrage: ${values.plannedProduction || values.contactName || "The Base"}`,
      en: `Production inquiry: ${values.plannedProduction || values.contactName || "The Base"}`,
    }),
  );

  const bodyLines = [
    text(locale, {
      de: "Neue Produktionsanfrage über the.base.ev",
      en: "New production inquiry via the.base.ev",
    }),
    "",
    `${text(locale, { de: "Ansprechperson", en: "Contact person" })}: ${values.contactName}`,
    `${text(locale, { de: "Organisation / Kollektiv", en: "Organisation / collective" })}: ${values.organisation || "-"}`,
    `${text(locale, { de: "E-Mail", en: "Email" })}: ${values.email}`,
    `${text(locale, { de: "Telefon", en: "Phone" })}: ${values.phone || "-"}`,
    "",
    `${text(locale, { de: "Geplante Produktion", en: "Planned production" })}: ${values.plannedProduction}`,
    `${text(locale, { de: "Gewünschter Zeitraum", en: "Preferred period" })}: ${values.preferredPeriod || "-"}`,
    "",
    `${text(locale, { de: "Partner", en: "Partners" })}: ${values.partners || "-"}`,
    `${text(locale, { de: "Förderungen / Finanzierung", en: "Funding / financing" })}: ${values.funding || "-"}`,
    "",
    text(locale, {
      de: "Technische Anforderungen:",
      en: "Technical requirements:",
    }),
    values.technicalRequirements || "-",
    "",
    text(locale, {
      de: "Kontext / Vorhaben:",
      en: "Context / proposal:",
    }),
    values.context || "-",
  ];

  return `mailto:info@thebase-ev.de?subject=${subject}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
}

export function MediaBookingForm({ locale }: MediaBookingFormProps) {
  const [values, setValues] = useState<FormState>(initialState);
  const [error, setError] = useState("");

  const mailtoLink = useMemo(() => buildMailtoLink(values, locale), [values, locale]);

  function updateValue<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !values.contactName.trim() ||
      !values.organisation.trim() ||
      !values.email.trim() ||
      !values.phone.trim() ||
      !values.plannedProduction.trim() ||
      !values.preferredPeriod.trim() ||
      !values.partners.trim() ||
      !values.funding.trim() ||
      !values.technicalRequirements.trim() ||
      !values.context.trim()
    ) {
      setError(
        text(locale, {
          de: "Bitte fülle alle Pflichtfelder aus.",
          en: "Please fill in all required fields.",
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
          <h2 className="type-display-section text-[var(--ink)]">{text(locale, { de: "Produktionsanfrage", en: "Production inquiry" })}</h2>
          <p className="editorial-form-copy type-body text-[var(--muted)]">
            {text(locale, {
              de: "Trag hier die geplante Produktion, Eckdaten, beteiligte Partner, Förderungen und technische Anforderungen ein. Beim Absenden öffnet sich dein Mailprogramm mit einer vorausgefüllten Anfrage an unser Team.",
              en: "Enter the planned production, key details, involved partners, funding, and technical requirements. On submit, your email app opens with a prefilled inquiry to our team.",
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

      <form onSubmit={handleSubmit} className="editorial-form-fields editorial-form-refined">
        <div className="editorial-form-group">
          <p className="type-meta text-[var(--muted)]">{text(locale, { de: "Kontakt", en: "Contact" })}</p>
          <div className="editorial-form-grid editorial-form-group-grid">
            <label className="editorial-form-field editorial-form-field-compact">
              <span className="type-meta text-[var(--muted)]">{text(locale, { de: "Ansprechperson*", en: "Contact person*" })}</span>
              <input
                required
                type="text"
                value={values.contactName}
                onChange={(event) => updateValue("contactName", event.target.value)}
                className={inputClassName}
              />
            </label>

            <label className="editorial-form-field editorial-form-field-compact">
              <span className="type-meta text-[var(--muted)]">{text(locale, { de: "Organisation / Kollektiv", en: "Organisation / collective" })}</span>
              <input
                required
                type="text"
                value={values.organisation}
                onChange={(event) => updateValue("organisation", event.target.value)}
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
                required
                type="tel"
                value={values.phone}
                onChange={(event) => updateValue("phone", event.target.value)}
                className={inputClassName}
              />
            </label>
          </div>
        </div>

        <div className="editorial-form-group">
          <p className="type-meta text-[var(--muted)]">{text(locale, { de: "Produktion", en: "Production" })}</p>
          <div className="editorial-form-grid editorial-form-group-grid">
            <label className="editorial-form-field editorial-form-field-compact">
              <span className="type-meta text-[var(--muted)]">{text(locale, { de: "Geplante Produktion*", en: "Planned production*" })}</span>
              <input
                required
                type="text"
                value={values.plannedProduction}
                onChange={(event) => updateValue("plannedProduction", event.target.value)}
                className={inputClassName}
              />
            </label>

            <label className="editorial-form-field editorial-form-field-compact">
              <span className="type-meta text-[var(--muted)]">{text(locale, { de: "Gewünschter Zeitraum", en: "Preferred period" })}</span>
              <input
                required
                type="text"
                value={values.preferredPeriod}
                onChange={(event) => updateValue("preferredPeriod", event.target.value)}
                className={inputClassName}
              />
            </label>
          </div>
        </div>

        <div className="editorial-form-group">
          <p className="type-meta text-[var(--muted)]">{text(locale, { de: "Rahmen", en: "Parameters" })}</p>
          <label className="editorial-form-field editorial-form-field-compact">
            <span className="type-meta text-[var(--muted)]">{text(locale, { de: "Partner", en: "Partners" })}</span>
            <textarea
              required
              value={values.partners}
              onChange={(event) => updateValue("partners", event.target.value)}
              rows={3}
              className={inputClassName}
            />
          </label>

          <label className="editorial-form-field editorial-form-field-compact">
            <span className="type-meta text-[var(--muted)]">{text(locale, { de: "Förderungen / Finanzierung", en: "Funding / financing" })}</span>
            <textarea
              required
              value={values.funding}
              onChange={(event) => updateValue("funding", event.target.value)}
              rows={3}
              className={inputClassName}
            />
          </label>
        </div>

        <div className="editorial-form-group">
          <p className="type-meta text-[var(--muted)]">{text(locale, { de: "Anforderungen / Hinweise", en: "Requirements / notes" })}</p>
          <label className="editorial-form-field editorial-form-field-compact">
            <span className="type-meta text-[var(--muted)]">{text(locale, { de: "Technische Anforderungen", en: "Technical requirements" })}</span>
            <textarea
              required
              value={values.technicalRequirements}
              onChange={(event) => updateValue("technicalRequirements", event.target.value)}
              rows={4}
              className={inputClassName}
            />
          </label>

          <label className="editorial-form-field editorial-form-field-compact">
            <span className="type-meta text-[var(--muted)]">{text(locale, { de: "Kontext / Vorhaben", en: "Context / proposal" })}</span>
            <textarea
              required
              value={values.context}
              onChange={(event) => updateValue("context", event.target.value)}
              rows={5}
              className={inputClassName}
            />
          </label>
        </div>

        {error ? <p role="alert" className="type-body text-[var(--accent)]">{error}</p> : null}

        <div className="editorial-form-actions editorial-form-actions-refined media-booking-actions-split">
          <p className="type-body text-[var(--muted)] media-booking-actions-note">
            {text(locale, { de: "Alle Felder sind Pflichtfelder.", en: "All fields are required." })}
          </p>
          <button
            type="submit"
            className="editorial-form-submit type-meta media-booking-actions-cta"
          >
            {text(locale, {
              de: "Produktionsanfrage per E-Mail senden",
              en: "Send production inquiry by email",
            })}
          </button>
        </div>
      </form>
    </section>
  );
}
