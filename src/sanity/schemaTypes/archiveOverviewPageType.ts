import { defineField, defineType } from "sanity";
import { createSeoField, formatLocalizedPreviewTitle } from "@/sanity/schemaTypes/schemaHelpers";

export const archivePageType = defineType({
  name: "archivePage",
  title: "Archive",
  type: "document",
  validation: (rule) =>
    rule.custom((value) => {
      if (!value || typeof value !== "object") {
        return true;
      }

      const page = value as {
        intro?: unknown;
        catalogueSection?: unknown;
        posterSection?: unknown;
      };

      if (!page.intro || !page.catalogueSection || !page.posterSection) {
        return "Bitte PageIntro sowie die Bereiche Katalog und Poster ausfuellen.";
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
      initialValue: "Archive",
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
      name: "catalogueSection",
      title: "Bereich: Katalog",
      type: "teaserSection",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "posterSection",
      title: "Bereich: Poster",
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
        title: formatLocalizedPreviewTitle(de, en, "Archive"),
      };
    },
  },
});
