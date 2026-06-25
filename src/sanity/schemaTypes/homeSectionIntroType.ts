import { defineArrayMember, defineField, defineType } from "sanity";
import {
  createSectionLayoutField,
  createVisibilityField,
  formatCountSubtitle,
  formatLocalizedPreviewTitle,
} from "@/sanity/schemaTypes/schemaHelpers";

export const homeSectionIntroType = defineType({
  name: "homeSectionIntro",
  title: "Kuratiertes Intro mit Karten",
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
      name: "description",
      title: "Description",
      type: "localizedText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "entries",
      title: "Einträge",
      type: "array",
      of: [defineArrayMember({ type: "homeLinkedItem" })],
      validation: (rule) => rule.required().min(1).max(6),
      options: {
        sortable: true,
      },
      description: "Kuratiertes Kartenraster für ausgewählte Inhalte.",
    }),
    createSectionLayoutField(),
    createVisibilityField(),
  ],
  preview: {
    select: {
      de: "title.de",
      en: "title.en",
      items: "entries",
      isVisible: "isVisible",
    },
    prepare({ de, en, items, isVisible }) {
      return {
        title: formatLocalizedPreviewTitle(de, en, "Homepage section intro"),
        subtitle: formatCountSubtitle("Einträge", items, isVisible),
      };
    },
  },
});
