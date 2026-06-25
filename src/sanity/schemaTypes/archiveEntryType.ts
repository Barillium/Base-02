import { defineArrayMember, defineField, defineType } from "sanity";
import { LegacyArchiveEntryDocumentInput } from "@/sanity/components/LegacyStructuredDocumentInputs";

export const archiveEntryType = defineType({
  name: "archiveEntry",
  title: "Archive Exhibition",
  type: "document",
  components: {
    input: LegacyArchiveEntryDocumentInput,
  },
  groups: [
    { name: "editorial", title: "Content", default: true },
    { name: "sections", title: "Sections" },
    { name: "layout", title: "Layout" },
    { name: "classification", title: "Website" },
    { name: "relationships", title: "Related Content" },
    { name: "media", title: "Media" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Exhibition title",
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
      description: "Controls position and alignment of the archive header.",
    }),
    defineField({
      name: "slug",
      title: "Page link",
      group: "classification",
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
      name: "status",
      title: "Website status",
      group: "classification",
      type: "string",
      options: {
        list: [
          { title: "Published", value: "published" },
          { title: "Archived", value: "archived" },
        ],
        layout: "radio",
      },
      initialValue: "published",
      description:
        "Use Sanity's draft and publish buttons for drafts. Archive an entry here when it should stay in Sanity but drop out of normal website listings.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "siteVisibility",
      title: "Public visibility",
      group: "classification",
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
        "Hidden entries stay in Sanity but do not appear on the website, including overview lists and detail pages.",
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
      name: "contentModules",
      title: "Page sections",
      group: "sections",
      type: "array",
      description:
        "Optional modular sections for longer archive pages with controlled text placement.",
      of: [
        defineArrayMember({ type: "textSection" }),
        defineArrayMember({ type: "statementSection" }),
        defineArrayMember({ type: "splitTextSection" }),
        defineArrayMember({ type: "columnTextSection" }),
        defineArrayMember({ type: "quoteSection" }),
        defineArrayMember({ type: "imageBlock" }),
        defineArrayMember({ type: "galleryBlock" }),
        defineArrayMember({ type: "videoBlock" }),
      ],
    }),
    defineField({
      name: "bodyLayout",
      title: "Main text layout",
      group: "layout",
      type: "textLayoutOptions",
      description: "Controls position and alignment of the main text block.",
    }),
    defineField({
      name: "archiveCategory",
      title: "Section",
      group: "classification",
      type: "string",
      options: {
        list: [
          { title: "Catalogue", value: "catalogue" },
          { title: "Poster", value: "poster" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "archiveType",
      title: "Type",
      group: "classification",
      type: "string",
      options: {
        list: [
          { title: "Catalogue", value: "catalogue" },
          { title: "Poster", value: "poster" },
          { title: "Documentation", value: "documentation" },
          { title: "Text", value: "text" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "date",
      title: "Date",
      group: "classification",
      type: "date",
    }),
    defineField({
      name: "externalUrl",
      title: "External link (optional)",
      group: "classification",
      type: "url",
    }),
    defineField({
      name: "coverImage",
      title: "Main image",
      group: "media",
      type: "imageFigure",
    }),
    defineField({
      name: "gallery",
      title: "More images",
      group: "media",
      type: "array",
      of: [defineArrayMember({ type: "imageFigure" })],
    }),
    defineField({
      name: "attachments",
      title: "Files",
      group: "media",
      type: "array",
      of: [defineArrayMember({ type: "fileAttachment" })],
    }),
    defineField({
      name: "sourceEvent",
      title: "Related event",
      group: "relationships",
      type: "reference",
      to: [{ type: "event" }],
    }),
    defineField({
      name: "sourceSeries",
      title: "Related series",
      group: "relationships",
      type: "reference",
      to: [{ type: "programmeSeries" }],
    }),
    defineField({
      name: "sourceMediaProject",
      title: "Related media project",
      group: "relationships",
      type: "reference",
      to: [{ type: "mediaProject" }],
    }),
    defineField({
      name: "credits",
      title: "Credits (optional)",
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
      title: "Date, newest first",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
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
      const statusLabel = status === "archived" ? "Archived" : "Published";
      const visibilityLabel = siteVisibility === "hidden" ? "Hidden" : "Visible";
      const resolvedLegacyTitle = typeof legacyTitle === "string" ? legacyTitle : undefined;

      return {
        title: de || en || resolvedLegacyTitle || "Untitled archive entry",
        subtitle: `${statusLabel} • ${visibilityLabel}`,
        media,
      };
    },
  },
});
