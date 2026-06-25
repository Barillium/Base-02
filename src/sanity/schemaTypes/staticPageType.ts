import { defineArrayMember, defineField, defineType } from "sanity";
import { LegacyStaticPageDocumentInput } from "@/sanity/components/LegacyStructuredDocumentInputs";
import {
  createModularSectionsField,
  createSeoField,
  formatLocalizedPreviewTitle,
  staticPageRouteOptions,
} from "@/sanity/schemaTypes/schemaHelpers";

export const staticPageType = defineType({
  name: "staticPage",
  title: "Fixed Page",
  type: "document",
  components: {
    input: LegacyStaticPageDocumentInput,
  },
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "sections", title: "Sections" },
    { name: "layout", title: "Layout" },
    { name: "links", title: "Links" },
    { name: "publishing", title: "Page Settings" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "routeKey",
      title: "Page name",
      group: "publishing",
      type: "string",
      options: {
        list: staticPageRouteOptions,
      },
      validation: (rule) => rule.required(),
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
      title: "Body text layout",
      group: "layout",
      type: "textLayoutOptions",
      description: "Controls position and alignment of the body text block.",
    }),
    defineField({
      name: "keyPoints",
      title: "Key Points",
      group: "content",
      type: "array",
      of: [defineArrayMember({ type: "localizedString" })],
    }),
    createModularSectionsField(),
    createSeoField(),
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
