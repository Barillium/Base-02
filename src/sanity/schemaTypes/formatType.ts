import { defineArrayMember, defineField, defineType } from "sanity";

export const formatType = defineType({
  name: "format",
  title: "Format",
  type: "document",
  fieldsets: [
    {
      name: "editorial",
      title: "Editorial",
    },
    {
      name: "publishing",
      title: "Publishing",
      options: { columns: 2 },
    },
    {
      name: "media",
      title: "Media and Links",
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Public title of the recurring format.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Editorial slug for structured content and future dynamic routing.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      fieldset: "editorial",
      rows: 3,
      description: "Short teaser copy for overview pages.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      fieldset: "editorial",
      type: "array",
      description: "Optional longer description of the format.",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      fieldset: "publishing",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Paused", value: "paused" },
          { title: "Archived", value: "archived" },
        ],
        layout: "radio",
      },
      initialValue: "active",
      description: "Active formats can be shown on the live pages.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      fieldset: "media",
      description: "Optional lead image or poster for the format.",
      options: { hotspot: true },
    }),
    defineField({
      name: "externalUrl",
      title: "External URL",
      type: "url",
      fieldset: "media",
      description: "Optional public source, for example an Instagram post or external programme page.",
    }),
    defineField({
      name: "relatedEvents",
      title: "Related Events",
      fieldset: "publishing",
      type: "array",
      description: "Optional links to event documents that belong to this format.",
      of: [defineArrayMember({ type: "reference", to: [{ type: "event" }] })],
    }),
  ],
  orderings: [
    {
      title: "Title A-Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "status",
      media: "heroImage",
    },
    prepare(selection) {
      const subtitle = typeof selection.subtitle === "string" ? selection.subtitle : "";

      return {
        title: selection.title,
        subtitle: subtitle ? `Status: ${subtitle}` : "",
        media: selection.media,
      };
    },
  },
});
