import { defineField, defineType } from "sanity";

export const contactDetailsBlockType = defineType({
  name: "contactDetailsBlock",
  title: "Kontakt- / Adressblock",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Kleine Ueberschrift",
      type: "localizedString",
    }),
    defineField({
      name: "title",
      title: "Titel",
      type: "localizedString",
    }),
    defineField({
      name: "address",
      title: "Adresse",
      type: "localizedText",
    }),
    defineField({
      name: "contactInfo",
      title: "Kontaktinformationen",
      type: "localizedText",
    }),
    defineField({
      name: "note",
      title: "Hinweis",
      type: "localizedText",
    }),
    defineField({
      name: "layout",
      title: "Platzierung auf der Seite",
      type: "sectionLayoutOptions",
    }),
    defineField({
      name: "isVisible",
      title: "Auf Website anzeigen",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      de: "title.de",
      en: "title.en",
    },
    prepare({ de, en }) {
      return {
        title: de || en || "Kontakt- / Adressblock",
      };
    },
  },
});
