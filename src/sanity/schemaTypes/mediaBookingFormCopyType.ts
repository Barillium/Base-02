import { defineField, defineType } from "sanity";

export const mediaBookingFormCopyType = defineType({
  name: "mediaBookingFormCopy",
  title: "MediaBookingForm",
  type: "object",
  fields: [
    defineField({ name: "sectionLabel", title: "Formular-Label", type: "localizedString" }),
    defineField({ name: "title", title: "Formulartitel", type: "localizedString" }),
    defineField({ name: "intro", title: "Formular-Intro", type: "localizedText" }),
    defineField({ name: "contactHeading", title: "Bereich Kontakt", type: "localizedString" }),
    defineField({ name: "productionHeading", title: "Bereich Produktion", type: "localizedString" }),
    defineField({ name: "parametersHeading", title: "Bereich Rahmen", type: "localizedString" }),
    defineField({ name: "requirementsHeading", title: "Bereich Anforderungen / Hinweise", type: "localizedString" }),
    defineField({ name: "contactNameLabel", title: "Feld: Ansprechperson", type: "localizedString" }),
    defineField({ name: "organisationLabel", title: "Feld: Organisation / Kollektiv", type: "localizedString" }),
    defineField({ name: "emailLabel", title: "Feld: E-Mail", type: "localizedString" }),
    defineField({ name: "phoneLabel", title: "Feld: Telefon", type: "localizedString" }),
    defineField({ name: "plannedProductionLabel", title: "Feld: Geplante Produktion", type: "localizedString" }),
    defineField({ name: "preferredPeriodLabel", title: "Feld: Gewuenschter Zeitraum", type: "localizedString" }),
    defineField({ name: "partnersLabel", title: "Feld: Partner", type: "localizedString" }),
    defineField({ name: "fundingLabel", title: "Feld: Foerderungen / Finanzierung", type: "localizedString" }),
    defineField({ name: "technicalRequirementsLabel", title: "Feld: Technische Anforderungen", type: "localizedString" }),
    defineField({ name: "contextLabel", title: "Feld: Kontext / Vorhaben", type: "localizedString" }),
    defineField({ name: "requiredFieldNote", title: "Hinweis Pflichtfelder", type: "localizedText" }),
    defineField({ name: "submitLabel", title: "Button-Text", type: "localizedString" }),
    defineField({ name: "errorMessage", title: "Fehlermeldung", type: "localizedText" }),
  ],
  preview: {
    prepare() {
      return {
        title: "MediaBookingForm",
      };
    },
  },
});
