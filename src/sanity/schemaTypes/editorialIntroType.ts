import { defineField, defineType } from "sanity";

export const editorialIntroType = defineType({
  name: "editorialIntro",
  title: "Editorial Intro",
  type: "object",
  fields: [
    defineField({
      name: "layout",
      title: "Text layout",
      type: "textLayoutOptions",
      description: "Optional layout settings for this intro block.",
    }),
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
      title: "Display Title",
      type: "localizedText",
      description: "Optional title with manual line breaks for major display headings.",
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
  ],
  preview: {
    select: {
      de: "title.de",
      en: "title.en",
    },
    prepare({ de, en }) {
      return {
        title: de || en || "Editorial intro",
      };
    },
  },
});
