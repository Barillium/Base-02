import { defineArrayMember, defineField, defineType } from "sanity";

export const djType = defineType({
  name: "dj",
  title: "DJ",
  type: "document",
  fieldsets: [
    {
      name: "editorial",
      title: "Editorial",
    },
    {
      name: "media",
      title: "Media and Links",
    },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Public name of the DJ, act, or collective profile.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Editorial slug for structured content and future profile routing.",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      fieldset: "editorial",
      rows: 3,
      description: "Short profile summary for overview pages.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      fieldset: "editorial",
      type: "array",
      description: "Optional longer profile text.",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      fieldset: "media",
      description: "Optional portrait or documentation image.",
      options: { hotspot: true },
    }),
    defineField({
      name: "links",
      title: "Links",
      fieldset: "media",
      type: "array",
      description: "Optional external links such as SoundCloud, Instagram, or website.",
      of: [defineArrayMember({ type: "url" })],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "summary",
      media: "image",
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: typeof selection.subtitle === "string" ? selection.subtitle : "",
        media: selection.media,
      };
    },
  },
});
