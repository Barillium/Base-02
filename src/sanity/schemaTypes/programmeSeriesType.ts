import { defineArrayMember, defineField, defineType } from "sanity";
import { LegacyProgrammeSeriesDocumentInput } from "@/sanity/components/LegacyStructuredDocumentInputs";

export const programmeSeriesType = defineType({
  name: "programmeSeries",
  title: "Recurring Series",
  type: "document",
  components: {
    input: LegacyProgrammeSeriesDocumentInput,
  },
  groups: [
    { name: "editorial", title: "Content", default: true },
    { name: "layout", title: "Layout" },
    { name: "publishing", title: "Website" },
    { name: "relationships", title: "Related Content" },
    { name: "media", title: "Media" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Series title",
      group: "editorial",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "displayTitle",
      title: "Large heading (optional)",
      group: "editorial",
      type: "localizedText",
      description: "Optional title with manual line breaks for large headings.",
    }),
    defineField({
      name: "introLayout",
      title: "Header layout",
      group: "layout",
      type: "textLayoutOptions",
      description: "Controls position and alignment of the series header.",
    }),
    defineField({
      name: "slug",
      title: "Page link",
      group: "publishing",
      type: "slug",
      options: {
        source: (doc) => {
          const title = doc.title as { de?: string; en?: string } | undefined;
          return title?.de || title?.en || "";
        },
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Short description",
      group: "editorial",
      type: "localizedText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Main text",
      group: "editorial",
      type: "localizedBlocks",
    }),
    defineField({
      name: "bodyLayout",
      title: "Main text layout",
      group: "layout",
      type: "textLayoutOptions",
      description: "Controls position and alignment of the main text block.",
    }),
    defineField({
      name: "status",
      title: "Website status",
      group: "publishing",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Paused", value: "paused" },
          { title: "Archived", value: "archived" },
        ],
        layout: "radio",
      },
      initialValue: "active",
      description:
        "Use Sanity's draft and publish buttons for drafts. Archive a series here when it should stay in Sanity but disappear from normal website listings.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "siteVisibility",
      title: "Public visibility",
      group: "publishing",
      type: "string",
      options: {
        list: [
          { title: "Show on website", value: "public" },
          { title: "Hide from website", value: "hidden" },
        ],
        layout: "radio",
      },
      initialValue: "public",
      description:
        "Hidden entries stay in Sanity but do not appear on the website, including overview lists.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "externalUrl",
      title: "External link (optional)",
      group: "publishing",
      type: "url",
    }),
    defineField({
      name: "coverImage",
      title: "Main image",
      group: "media",
      type: "imageFigure",
    }),
    defineField({
      name: "relatedEvents",
      title: "Related Events",
      group: "relationships",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "event" }] })],
    }),
    defineField({
      name: "relatedMedia",
      title: "Related Media Projects",
      group: "relationships",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "mediaProject" }] })],
    }),
    defineField({
      name: "credits",
      title: "Credits",
      group: "relationships",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      group: "seo",
      type: "seoFields",
    }),
  ],
  orderings: [
    {
      title: "Title A-Z",
      name: "titleAsc",
      by: [{ field: "title.de", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      de: "title.de",
      en: "title.en",
      legacyTitle: "title",
      status: "status",
      siteVisibility: "siteVisibility",
      media: "coverImage.image",
    },
    prepare({ de, en, legacyTitle, status, siteVisibility, media }) {
      const statusLabel =
        status === "paused"
          ? "Paused"
          : status === "archived"
            ? "Archived"
            : "Active";
      const visibilityLabel = siteVisibility === "hidden" ? "Hidden" : "Visible";
      const resolvedLegacyTitle = typeof legacyTitle === "string" ? legacyTitle : undefined;

      return {
        title: de || en || resolvedLegacyTitle || "Untitled series",
        subtitle: `${statusLabel} • ${visibilityLabel}`,
        media,
      };
    },
  },
});
