import { defineField, defineType } from "sanity";

export const mitmachenFormCopyType = defineType({
  name: "mitmachenFormCopy",
  title: "MitmachenForm",
  type: "object",
  fields: [
    defineField({ name: "sectionLabel", title: "Formular-Label", type: "localizedString" }),
    defineField({ name: "title", title: "Formulartitel", type: "localizedString" }),
    defineField({ name: "intro", title: "Formular-Intro", type: "localizedText" }),
    defineField({ name: "contactHeading", title: "Bereich Kontakt", type: "localizedString" }),
    defineField({ name: "focusHeading", title: "Bereich Schwerpunkte", type: "localizedString" }),
    defineField({ name: "contextHeading", title: "Bereich Kontext / Anfrage", type: "localizedString" }),
    defineField({ name: "nameLabel", title: "Feld: Name", type: "localizedString" }),
    defineField({ name: "emailLabel", title: "Feld: E-Mail", type: "localizedString" }),
    defineField({ name: "phoneLabel", title: "Feld: Telefon", type: "localizedString" }),
    defineField({ name: "cityLabel", title: "Feld: Ort", type: "localizedString" }),
    defineField({ name: "interestsLabel", title: "Feld: Interessen", type: "localizedString" }),
    defineField({ name: "experienceLabel", title: "Feld: Praxis / Kontext", type: "localizedString" }),
    defineField({ name: "ideaLabel", title: "Feld: Vorhaben / Format / Anfrage", type: "localizedString" }),
    defineField({ name: "requiredFieldNote", title: "Hinweis Pflichtfelder", type: "localizedText" }),
    defineField({ name: "submitLabel", title: "Button-Text", type: "localizedString" }),
    defineField({ name: "interestErrorMessage", title: "Fehlermeldung Interessen", type: "localizedText" }),
    defineField({ name: "requiredErrorMessage", title: "Fehlermeldung Pflichtfelder", type: "localizedText" }),
  ],
  preview: {
    prepare() {
      return {
        title: "MitmachenForm",
      };
    },
  },
});
