import { defineArrayMember, defineField, defineType } from "sanity";

export const principlesPanelBlockType = defineType({
  name: "principlesPanelBlock",
  title: "Leitlinien-Panel",
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Einleitung (optional)",
      type: "localizedText",
    }),
    defineField({
      name: "items",
      title: "Leitlinien",
      type: "array",
      of: [defineArrayMember({ type: "localizedString" })],
      validation: (rule) => rule.required().min(1),
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
      items: "items",
    },
    prepare({ de, en, items }) {
      return {
        title: de || en || "Leitlinien-Panel",
        subtitle: `${Array.isArray(items) ? items.length : 0} Eintraege`,
      };
    },
  },
});
