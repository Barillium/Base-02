import { defineArrayMember, defineField, defineType } from "sanity";
import { LegacyEventDocumentInput } from "@/sanity/components/LegacyEventDocumentInput";

export const eventType = defineType({
  name: "event",
  title: "Live Event",
  type: "document",
  components: {
    input: LegacyEventDocumentInput,
  },
  groups: [
    { name: "editorial", title: "Content", default: true },
    { name: "sections", title: "Sections" },
    { name: "layout", title: "Layout" },
    { name: "classification", title: "Website" },
    { name: "schedule", title: "Date and Place" },
    { name: "relationships", title: "Related Content" },
    { name: "media", title: "Media" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Event title",
      type: "localizedString",
      group: "editorial",
      description: "Public event title as it should appear on the website.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "displayTitle",
      title: "Large heading (optional)",
      type: "localizedText",
      group: "editorial",
      description: "Optional title with manual line breaks for large headings.",
    }),
    defineField({
      name: "introLayout",
      title: "Header layout",
      type: "textLayoutOptions",
      group: "layout",
      description: "Controls position and alignment of the event header.",
    }),
    defineField({
      name: "slug",
      title: "Page link",
      type: "slug",
      group: "classification",
      description: "This creates the website address for the event page.",
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
      type: "string",
      group: "classification",
      options: {
        list: [
          { title: "Upcoming / current", value: "upcoming" },
          { title: "Past", value: "past" },
          { title: "Archived", value: "archived" },
        ],
        layout: "radio",
      },
      initialValue: "upcoming",
      description:
        "Use Sanity's draft and publish buttons for drafts. This field decides how the published event behaves on the website.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "siteVisibility",
      title: "Public visibility",
      type: "string",
      group: "classification",
      options: {
        list: [
          { title: "Show on website", value: "public" },
          { title: "Hide from website", value: "hidden" },
        ],
        layout: "radio",
      },
      initialValue: "public",
      description:
        "Hidden entries stay in Sanity but do not appear on the website, including overview lists and the event page.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Short description",
      type: "localizedText",
      group: "editorial",
      description: "Short teaser copy for overview pages and cards.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Main text",
      group: "editorial",
      type: "localizedBlocks",
      description: "Optional longer editorial text for future detail pages.",
    }),
    defineField({
      name: "contentModules",
      title: "Page sections",
      group: "sections",
      type: "array",
      description:
        "Optional modular sections for longer event pages with controlled text and media placement.",
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
      type: "textLayoutOptions",
      group: "layout",
      description: "Controls position and alignment of the main text block.",
    }),
    defineField({
      name: "eventType",
      title: "Type of event",
      type: "string",
      group: "classification",
      options: {
        list: [
          { title: "Exhibition", value: "exhibition" },
          { title: "Concert", value: "concert" },
          { title: "Workshop", value: "workshop" },
          { title: "Release Show", value: "release-show" },
          { title: "Other", value: "other" },
        ],
      },
      description: "Used for presentation and filtering.",
    }),
    defineField({
      name: "featuredCurrent",
      title: "Show as current event on the live page",
      type: "boolean",
      group: "classification",
      initialValue: false,
      hidden: ({ document }) => document?.status === "past" || document?.status === "archived",
      description: "Use to pin the current event for /live/aktuelle-ausstellung. Only relevant for upcoming events.",
    }),
    defineField({
      name: "externalUrl",
      title: "External link (optional)",
      type: "url",
      group: "classification",
      description: "Optional public source, for example an Instagram post or external announcement.",
    }),
    defineField({
      name: "startDate",
      title: "Start date and time",
      type: "datetime",
      group: "schedule",
      description: "Start date and time of the event.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End date and time",
      type: "datetime",
      group: "schedule",
      description: "Optional end date and time.",
    }),
    defineField({
      name: "venue",
      title: "Location",
      type: "string",
      group: "schedule",
      description: "Venue or location, for example BOA Bunker of Art or another site in Aachen.",
    }),
    defineField({
      name: "coverImage",
      title: "Main image",
      type: "imageFigure",
      group: "media",
    }),
    defineField({
      name: "gallery",
      title: "More images",
      type: "array",
      group: "media",
      of: [defineArrayMember({ type: "imageFigure" })],
    }),
    defineField({
      name: "attachments",
      title: "Files",
      type: "array",
      group: "media",
      of: [defineArrayMember({ type: "fileAttachment" })],
    }),
    defineField({
      name: "series",
      title: "Belongs to series (optional)",
      type: "reference",
      group: "relationships",
      to: [{ type: "programmeSeries" }],
    }),
    defineField({
      name: "relatedArchive",
      title: "Related archive entries",
      type: "array",
      group: "relationships",
      of: [defineArrayMember({ type: "reference", to: [{ type: "archiveEntry" }] })],
    }),
    defineField({
      name: "relatedMedia",
      title: "Related media projects",
      type: "array",
      group: "relationships",
      of: [defineArrayMember({ type: "reference", to: [{ type: "mediaProject" }] })],
    }),
    defineField({
      name: "credits",
      title: "Credits (optional)",
      group: "relationships",
      type: "array",
      description: "Optional short credits such as photo, curation, or design.",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoFields",
      group: "seo",
    }),
  ],
  orderings: [
    {
      title: "Start date, newest first",
      name: "startDateDesc",
      by: [{ field: "startDate", direction: "desc" }],
    },
    {
      title: "Start date, oldest first",
      name: "startDateAsc",
      by: [{ field: "startDate", direction: "asc" }],
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
        status === "past"
          ? "Past"
          : status === "archived"
            ? "Archived"
            : "Upcoming";
      const visibilityLabel = siteVisibility === "hidden" ? "Hidden" : "Visible";
      const resolvedLegacyTitle = typeof legacyTitle === "string" ? legacyTitle : undefined;

      return {
        title: de || en || resolvedLegacyTitle || "Untitled event",
        subtitle: `${statusLabel} • ${visibilityLabel}`,
        media,
      };
    },
  },
});
