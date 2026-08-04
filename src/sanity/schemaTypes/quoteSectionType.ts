import { defineField, defineType } from "sanity";

export const quoteSectionType = defineType({
  name: "quoteSection",
  title: "Quote Block",
  type: "object",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "localizedText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "source",
      title: "Source (optional)",
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
      de: "quote.de",
      en: "quote.en",
    },
    prepare({ de, en }) {
      return {
        title: de || en || "Quote section",
      };
    },
  },
});
