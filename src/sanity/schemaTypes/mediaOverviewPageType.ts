import { defineField, defineType } from "sanity";
import { createSeoField, formatLocalizedPreviewTitle } from "@/sanity/schemaTypes/schemaHelpers";

export const mediaPageType = defineType({
  name: "mediaPage",
  title: "Media",
  type: "document",
  validation: (rule) =>
    rule.custom((value) => {
      if (!value || typeof value !== "object") {
        return true;
      }

      const page = value as {
        intro?: unknown;
        mainSection?: unknown;
      };

      if (!page.intro || !page.mainSection) {
        return "Bitte PageIntro und den Bereich Raum, Klang und Bild ausfuellen.";
      }

      return true;
    }),
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "layout", title: "Layout" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "internalTitle",
      title: "Interner Titel",
      type: "string",
      initialValue: "Media",
      validation: (rule) => rule.required(),
      group: "content",
    }),
    defineField({
      name: "intro",
      title: "PageIntro",
      type: "editorialIntro",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "mainSection",
      title: "Bereich: Raum, Klang und Bild",
      type: "teaserSection",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    createSeoField(),
  ],
  preview: {
    select: {
      de: "intro.title.de",
      en: "intro.title.en",
    },
    prepare({ de, en }) {
      return {
        title: formatLocalizedPreviewTitle(de, en, "Media"),
      };
    },
  },
});
