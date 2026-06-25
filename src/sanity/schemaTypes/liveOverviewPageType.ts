import { defineField, defineType } from "sanity";
import { createSeoField, formatLocalizedPreviewTitle } from "@/sanity/schemaTypes/schemaHelpers";

export const livePageType = defineType({
  name: "livePage",
  title: "Live",
  type: "document",
  validation: (rule) =>
    rule.custom((value) => {
      if (!value || typeof value !== "object") {
        return true;
      }

      const page = value as {
        intro?: unknown;
        currentSection?: unknown;
        archiveSection?: unknown;
        formatsSection?: unknown;
      };

      if (!page.intro || !page.currentSection || !page.archiveSection || !page.formatsSection) {
        return "Bitte PageIntro sowie die Bereiche Aktuelle Veranstaltung, Eventarchiv und Laufende Formate ausfuellen.";
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
      initialValue: "Live",
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
      name: "currentSection",
      title: "Bereich: Aktuelle Veranstaltung",
      type: "teaserSection",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "archiveSection",
      title: "Bereich: Eventarchiv",
      type: "teaserSection",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "formatsSection",
      title: "Bereich: Laufende Formate",
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
        title: formatLocalizedPreviewTitle(de, en, "Live-Uebersicht"),
      };
    },
  },
});
