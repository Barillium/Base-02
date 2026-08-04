import { defineField, defineType } from "sanity";

export const newsletterFormCopyType = defineType({
  name: "newsletterFormCopy",
  title: "Newsletter-Formular",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "localizedString" }),
    defineField({ name: "description", title: "Beschreibung", type: "localizedText" }),
    defineField({ name: "emailPlaceholder", title: "Platzhalter E-Mail", type: "localizedString" }),
    defineField({ name: "submitLabel", title: "Button-Text", type: "localizedString" }),
  ],
  preview: {
    prepare() {
      return {
        title: "Newsletter-Formular",
      };
    },
  },
});
