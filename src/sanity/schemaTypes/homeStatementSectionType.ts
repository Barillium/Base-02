import { defineArrayMember, defineField, defineType } from "sanity";
import {
  createSectionLayoutField,
  createVisibilityField,
  formatLocalizedPreviewTitle,
} from "@/sanity/schemaTypes/schemaHelpers";

export const homeStatementSectionType = defineType({
  name: "homeStatementSection",
  title: "Statement-Bereich",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "localizedString",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "displayTitle",
      title: "Display title with manual line breaks",
      type: "localizedText",
    }),
    defineField({
      name: "text",
      title: "Statement text",
      type: "localizedText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "note",
      title: "Additional note",
      type: "localizedText",
    }),
    defineField({
      name: "items",
      title: "Bullet points",
      type: "array",
      of: [defineArrayMember({ type: "featureListItem" })],
    }),
    createSectionLayoutField(),
    createVisibilityField(),
  ],
  preview: {
    select: {
      de: "title.de",
      en: "title.en",
    },
    prepare({ de, en }) {
      return {
        title: formatLocalizedPreviewTitle(de, en, "Homepage statement block"),
      };
    },
  },
});
