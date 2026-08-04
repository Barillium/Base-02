import { defineArrayMember, defineField, defineType } from "sanity";
import { LegacyStaticPageDocumentInput } from "@/sanity/components/LegacyStructuredDocumentInputs";
import {
  createSeoField,
  formatLocalizedPreviewTitle,
  staticPageRouteOptions,
} from "@/sanity/schemaTypes/schemaHelpers";

export const staticPageType = defineType({
  name: "staticPage",
  title: "Feste Unterseite",
  type: "document",
  components: {
    input: LegacyStaticPageDocumentInput,
  },
  groups: [
    { name: "content", title: "Inhalt", default: true },
    { name: "layout", title: "Layout" },
    { name: "links", title: "Links" },
    { name: "publishing", title: "Seitenzuordnung" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "routeKey",
      title: "Welche feste Unterseite ist das?",
      group: "publishing",
      type: "string",
      options: {
        list: staticPageRouteOptions,
      },
      validation: (rule) => rule.required(),
      description:
        "Diese Auswahl ist fest mit einer bestehenden Website-Route verbunden. Neue Unterseiten entstehen derzeit nicht direkt im Studio, sondern werden von Entwickler:innen ergänzt.",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      group: "content",
      type: "editorialIntro",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      group: "content",
      type: "localizedBlocks",
    }),
    defineField({
      name: "bodyLayout",
      title: "Platzierung des Fließtexts",
      group: "layout",
      type: "textLayoutOptions",
      description: "Steuert Position und Ausrichtung des Fließtexts innerhalb der festen Seitentypografie.",
    }),
    defineField({
      name: "keyPoints",
      title: "Stichpunkte",
      group: "content",
      type: "array",
      of: [defineArrayMember({ type: "localizedString" })],
    }),
    createSeoField("seo"),
  ],
  orderings: [
    {
      title: "Route key",
      name: "routeKeyAsc",
      by: [{ field: "routeKey", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      routeKey: "routeKey",
      de: "intro.title.de",
      en: "intro.title.en",
      legacyTitle: "title",
    },
    prepare({ routeKey, de, en, legacyTitle }) {
      return {
        title: formatLocalizedPreviewTitle(de, en, "Untitled static page", legacyTitle),
        subtitle: routeKey || "",
      };
    },
  },
});
