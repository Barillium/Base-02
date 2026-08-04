import { defineField, defineType } from "sanity";

export const statementSectionType = defineType({
  name: "statementSection",
  title: "Statement Block",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Small label above the statement",
      type: "localizedString",
    }),
    defineField({
      name: "text",
      title: "Statement",
      type: "localizedText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "attribution",
      title: "Attribution (optional)",
      type: "localizedString",
    }),
    defineField({
      name: "layout",
      title: "Placement on page",
      type: "sectionLayoutOptions",
    }),
  ],
  preview: {
    select: {
      de: "text.de",
      en: "text.en",
    },
    prepare({ de, en }) {
      return {
        title: de || en || "Statement section",
      };
    },
  },
});
