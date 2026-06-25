import { defineField, defineType } from "sanity";

export const supportMembershipFormCopyType = defineType({
  name: "supportMembershipFormCopy",
  title: "SupportMembershipForm",
  type: "object",
  fields: [
    defineField({ name: "sectionLabel", title: "Formular-Label", type: "localizedString" }),
    defineField({ name: "title", title: "Formulartitel", type: "localizedString" }),
    defineField({ name: "intro", title: "Formular-Intro", type: "localizedText" }),
    defineField({ name: "contactHeading", title: "Bereich Kontakt", type: "localizedString" }),
    defineField({ name: "membershipHeading", title: "Bereich Mitgliedschaft", type: "localizedString" }),
    defineField({ name: "motivationHeading", title: "Bereich Motivation / Rueckfragen", type: "localizedString" }),
    defineField({ name: "confirmationHeading", title: "Bereich Bestaetigung", type: "localizedString" }),
    defineField({ name: "nameLabel", title: "Feld: Name / Organisation", type: "localizedString" }),
    defineField({ name: "emailLabel", title: "Feld: E-Mail", type: "localizedString" }),
    defineField({ name: "phoneLabel", title: "Feld: Telefon", type: "localizedString" }),
    defineField({ name: "cityLabel", title: "Feld: Ort", type: "localizedString" }),
    defineField({ name: "memberTypeLabel", title: "Feld: Antrag als", type: "localizedString" }),
    defineField({ name: "contributionCycleLabel", title: "Feld: Beitragsrhythmus", type: "localizedString" }),
    defineField({ name: "motivationLabel", title: "Feld: Motivation / Bezug", type: "localizedString" }),
    defineField({ name: "noteLabel", title: "Feld: Nachricht / Rueckfragen", type: "localizedString" }),
    defineField({ name: "requiredFieldNote", title: "Hinweis Pflichtfelder", type: "localizedText" }),
    defineField({ name: "submitLabel", title: "Button-Text", type: "localizedString" }),
    defineField({ name: "requiredErrorMessage", title: "Fehlermeldung Pflichtfelder", type: "localizedText" }),
    defineField({ name: "membershipErrorMessage", title: "Fehlermeldung Mitgliedschaft", type: "localizedText" }),
    defineField({ name: "confirmationErrorMessage", title: "Fehlermeldung Bestaetigungen", type: "localizedText" }),
  ],
  preview: {
    prepare() {
      return {
        title: "SupportMembershipForm",
      };
    },
  },
});
