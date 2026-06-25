import { defineField, defineType } from "sanity";
import {
  createSectionLayoutField,
  createVisibilityField,
  formatLocalizedPreviewTitle,
} from "@/sanity/schemaTypes/schemaHelpers";

export const homeHeroType = defineType({
  name: "homeHero",
  title: "Startbereich",
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
      name: "note",
      title: "Note",
      type: "localizedText",
    }),
    defineField({
      name: "image",
      title: "Optional image",
      type: "imageFigure",
    }),
    createSectionLayoutField(),
    createVisibilityField("Schaltet diesen Bereich ein oder aus, ohne ihn zu löschen."),
  ],
  preview: {
    select: {
      de: "title.de",
      en: "title.en",
      media: "image.image",
    },
    prepare({ de, en, media }) {
      return {
        title: formatLocalizedPreviewTitle(de, en, "Homepage hero"),
        media,
      };
    },
  },
});
