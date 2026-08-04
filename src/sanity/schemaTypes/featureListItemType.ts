import { defineField, defineType } from "sanity";

export const featureListItemType = defineType({
  name: "featureListItem",
  title: "Feature List Item",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "localizedText",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      de: "text.de",
      en: "text.en",
    },
    prepare({ de, en }) {
      return {
        title: de || en || "List item",
      };
    },
  },
});
