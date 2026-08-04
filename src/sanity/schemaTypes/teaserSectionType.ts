import { defineArrayMember, defineField, defineType } from "sanity";
import {
  createSectionLayoutField,
  formatCountSubtitle,
  formatLocalizedPreviewTitle,
} from "@/sanity/schemaTypes/schemaHelpers";

export const teaserSectionType = defineType({
  name: "teaserSection",
  title: "Teaser-Bereich",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow / kleine Ueberschrift",
      type: "localizedString",
    }),
    defineField({
      name: "title",
      title: "Bereichstitel",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "displayTitle",
      title: "Grosse Ueberschrift mit manuellen Zeilenumbruechen (optional)",
      type: "localizedText",
    }),
    defineField({
      name: "description",
      title: "Bereichsbeschreibung",
      type: "localizedText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cards",
      title: "Karten",
      type: "array",
      of: [defineArrayMember({ type: "teaserCard" })],
      validation: (rule) => rule.required().min(1),
      options: {
        sortable: true,
      },
    }),
    createSectionLayoutField(),
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
      cards: "cards",
      isVisible: "isVisible",
    },
    prepare({ de, en, cards, isVisible }) {
      return {
        title: formatLocalizedPreviewTitle(de, en, "Teaser-Bereich"),
        subtitle: formatCountSubtitle("Karten", cards, isVisible),
      };
    },
  },
});
