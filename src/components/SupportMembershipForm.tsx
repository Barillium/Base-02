"use client";

import { FormEvent, useMemo, useState } from "react";

import { SocialLinks } from "@/components/SocialLinks";
import { Locale, text } from "@/lib/i18n-shared";

type FormState = {
  name: string;
  email: string;
  phone: string;
  city: string;
  memberType: string;
  contributionCycle: string;
  motivation: string;
  note: string;
  confirmsApplication: boolean;
  confirmsStatutes: boolean;
  confirmsContribution: boolean;
};

type SupportMembershipFormProps = {
  locale: Locale;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  city: "",
  memberType: "",
  contributionCycle: "",
  motivation: "",
  note: "",
  confirmsApplication: false,
  confirmsStatutes: false,
  confirmsContribution: false,
};

function buildMailtoLink(values: FormState, locale: Locale) {
  const subject = encodeURIComponent(
    text(locale, {
      de: `Antrag Fördermitgliedschaft: ${values.name || "The Base e.V."}`,
      en: `Support membership request: ${values.name || "The Base e.V."}`,
    }),
  );

  const bodyLines = [
    text(locale, {
      de: "Neue Anfrage zur Fördermitgliedschaft über thebase-ev.de",
      en: "New support membership request via thebase-ev.de",
    }),
    "",
    `${text(locale, { de: "Name / Organisation", en: "Name / organisation" })}: ${values.name}`,
    `${text(locale, { de: "E-Mail", en: "Email" })}: ${values.email}`,
    `${text(locale, { de: "Telefon", en: "Phone" })}: ${values.phone || "-"}`,
    `${text(locale, { de: "Ort", en: "City" })}: ${values.city || "-"}`,
    `${text(locale, { de: "Antrag als", en: "Applying as" })}: ${values.memberType || "-"}`,
    `${text(locale, { de: "Beitragsrhythmus", en: "Contribution cycle" })}: ${values.contributionCycle || "-"}`,
    "",
    text(locale, {
      de: "Motivation / Bezug:",
      en: "Motivation / context:",
    }),
    values.motivation || "-",
    "",
    text(locale, {
      de: "Nachricht / Rückfragen:",
      en: "Message / questions:",
    }),
    values.note || "-",
    "",
    text(locale, {
      de: "Bestätigungen:",
      en: "Confirmations:",
    }),
    `${text(locale, { de: "Antrag auf Fördermitgliedschaft", en: "Support membership request" })}: ${
      values.confirmsApplication ? text(locale, { de: "Ja", en: "Yes" }) : text(locale, { de: "Nein", en: "No" })
    }`,
    `${text(locale, { de: "Anerkennung von Satzung und Ordnungen", en: "Acceptance of statutes and regulations" })}: ${
      values.confirmsStatutes ? text(locale, { de: "Ja", en: "Yes" }) : text(locale, { de: "Nein", en: "No" })
    }`,
    `${text(locale, { de: "Kenntnis über regelmäßigen Beitrag", en: "Acknowledgement of recurring contribution" })}: ${
      values.confirmsContribution ? text(locale, { de: "Ja", en: "Yes" }) : text(locale, { de: "Nein", en: "No" })
    }`,
  ];

  const body = encodeURIComponent(bodyLines.join("\n"));
  return `mailto:info@thebase-ev.de?subject=${subject}&body=${body}`;
}

export function SupportMembershipForm({ locale }: SupportMembershipFormProps) {
  const [values, setValues] = useState<FormState>(initialState);
  const [error, setError] = useState("");
  const mailtoLink = useMemo(() => buildMailtoLink(values, locale), [values, locale]);

  function updateValue<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!values.name.trim() || !values.email.trim()) {
      setError(
        text(locale, {
          de: "Bitte fülle Name beziehungsweise Organisation und E-Mail aus.",
          en: "Please fill in name or organisation and email.",
        }),
      );
      return;
    }

    if (!values.memberType || !values.contributionCycle) {
      setError(
        text(locale, {
          de: "Bitte wähle Antragsform und Beitragsrhythmus aus.",
          en: "Please choose applicant type and contribution cycle.",
        }),
      );
      return;
    }

    if (!values.confirmsApplication || !values.confirmsStatutes || !values.confirmsContribution) {
      setError(
        text(locale, {
          de: "Bitte bestätige die Hinweise zur Fördermitgliedschaft.",
          en: "Please confirm the support membership notes.",
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
        <p className="type-meta text-[var(--muted)]">{text(locale, { de: "Antrag", en: "Application" })}</p>
        <div className="editorial-form-intro">
          <h2 className="type-display-section text-[var(--ink)]">
            {text(locale, { de: "Fördermitgliedschaft", en: "Support membership" })}
          </h2>
          <p className="editorial-form-copy type-body text-[var(--muted)]">
            {text(locale, {
              de: "Schick uns deine Angaben über das Formular. Wir melden uns anschließend mit den nächsten Schritten zur Aufnahme, zu den Beiträgen und zu den Unterlagen.",
              en: "Send us your details via the form. We will follow up with the next steps regarding admission, contributions, and documents.",
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
              <span className="type-meta text-[var(--muted)]">
                {text(locale, { de: "Name / Organisation*", en: "Name / organisation*" })}
              </span>
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
          <p className="type-meta text-[var(--muted)]">{text(locale, { de: "Mitgliedschaft", en: "Membership" })}</p>
          <div className="editorial-form-grid editorial-form-group-grid">
            <label className="editorial-form-field editorial-form-field-compact">
              <span className="type-meta text-[var(--muted)]">{text(locale, { de: "Antrag als*", en: "Applying as*" })}</span>
              <select
                value={values.memberType}
                onChange={(event) => updateValue("memberType", event.target.value)}
                className={inputClassName}
                required
              >
                <option value="">{text(locale, { de: "Bitte wählen", en: "Please choose" })}</option>
                <option value={text(locale, { de: "Volljährige natürliche Person", en: "Adult natural person" })}>
                  {text(locale, { de: "Volljährige natürliche Person", en: "Adult natural person" })}
                </option>
                <option value={text(locale, { de: "Juristische Person", en: "Legal entity" })}>
                  {text(locale, { de: "Juristische Person", en: "Legal entity" })}
                </option>
              </select>
            </label>

            <label className="editorial-form-field editorial-form-field-compact">
              <span className="type-meta text-[var(--muted)]">
                {text(locale, { de: "Beitragsrhythmus*", en: "Contribution cycle*" })}
              </span>
              <select
                value={values.contributionCycle}
                onChange={(event) => updateValue("contributionCycle", event.target.value)}
                className={inputClassName}
                required
              >
                <option value="">{text(locale, { de: "Bitte wählen", en: "Please choose" })}</option>
                <option value={text(locale, { de: "Monatlich", en: "Monthly" })}>
                  {text(locale, { de: "Monatlich", en: "Monthly" })}
                </option>
                <option value={text(locale, { de: "Jährlich", en: "Yearly" })}>
                  {text(locale, { de: "Jährlich", en: "Yearly" })}
                </option>
              </select>
            </label>
          </div>
        </div>

        <div className="editorial-form-group">
          <p className="type-meta text-[var(--muted)]">{text(locale, { de: "Motivation / Rückfragen", en: "Motivation / questions" })}</p>
          <label className="editorial-form-field editorial-form-field-compact">
            <span className="type-meta text-[var(--muted)]">{text(locale, { de: "Motivation / Bezug", en: "Motivation / context" })}</span>
            <textarea
              value={values.motivation}
              onChange={(event) => updateValue("motivation", event.target.value)}
              rows={5}
              className={inputClassName}
            />
          </label>

          <label className="editorial-form-field editorial-form-field-compact">
            <span className="type-meta text-[var(--muted)]">{text(locale, { de: "Nachricht / Rückfragen", en: "Message / questions" })}</span>
            <textarea
              value={values.note}
              onChange={(event) => updateValue("note", event.target.value)}
              rows={4}
              className={inputClassName}
            />
          </label>
        </div>

        <div className="editorial-form-group">
          <p className="type-meta text-[var(--muted)]">{text(locale, { de: "Bestätigung", en: "Confirmation" })}</p>
          <fieldset className="editorial-form-fieldset">
            <legend className="type-meta text-[var(--muted)]">{text(locale, { de: "Bestätigung*", en: "Confirmation*" })}</legend>
            <div className="editorial-form-checklist support-membership-checklist">
              <label className="editorial-form-check type-body text-[var(--ink)]">
                <input
                  type="checkbox"
                  checked={values.confirmsApplication}
                  onChange={(event) => updateValue("confirmsApplication", event.target.checked)}
                  required
                />
                <span>
                  {text(locale, {
                    de: "Ich beantrage eine Fördermitgliedschaft bei The Base e.V.",
                    en: "I am applying for a support membership at The Base e.V.",
                  })}
                </span>
              </label>
              <label className="editorial-form-check type-body text-[var(--ink)]">
                <input
                  type="checkbox"
                  checked={values.confirmsStatutes}
                  onChange={(event) => updateValue("confirmsStatutes", event.target.checked)}
                  required
                />
                <span>
                  {text(locale, {
                    de: "Ich erkenne Satzung und Ordnungen in ihrer geltenden Fassung an.",
                    en: "I accept the statutes and regulations in their current version.",
                  })}
                </span>
              </label>
              <label className="editorial-form-check type-body text-[var(--ink)]">
                <input
                  type="checkbox"
                  checked={values.confirmsContribution}
                  onChange={(event) => updateValue("confirmsContribution", event.target.checked)}
                  required
                />
                <span>
                  {text(locale, {
                    de: "Mir ist bekannt, dass die Fördermitgliedschaft mit einem regelmäßigen Beitrag verbunden ist.",
                    en: "I understand that support membership involves a recurring contribution.",
                  })}
                </span>
              </label>
            </div>
          </fieldset>
        </div>

        {error ? (
          <p role="alert" className="type-body text-[var(--accent)]">
            {error}
          </p>
        ) : null}

        <div className="editorial-form-actions editorial-form-actions-refined editorial-form-actions-split">
          <p className="type-body text-[var(--muted)] editorial-form-actions-note">* {text(locale, { de: "Pflichtfelder", en: "Required fields" })}</p>
          <button
            type="submit"
            className="editorial-form-submit type-meta editorial-form-actions-cta"
          >
            {text(locale, {
              de: "Anfrage per E-Mail senden",
              en: "Send request by email",
            })}
          </button>
        </div>
      </form>
    </section>
  );
}
