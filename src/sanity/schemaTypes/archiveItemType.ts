import { defineField, defineType } from "sanity";

export const archiveItemType = defineType({
  name: "archiveItem",
  title: "Archive Item",
  type: "document",
  fieldsets: [
    {
      name: "classification",
      title: "Classification",
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
      description: "Public title of the archive item.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Editorial slug for structured content and future archive routing.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "typeLabel",
      title: "Type Label",
      type: "string",
      fieldset: "classification",
      options: {
        list: [
          { title: "Poster", value: "poster" },
          { title: "Catalogue", value: "catalogue" },
          { title: "Documentation", value: "documentation" },
          { title: "Other", value: "other" },
        ],
        layout: "radio",
      },
      description: "Used to group archive items into catalogue, poster, or documentation views.",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      description: "Short editorial description for overview pages.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      fieldset: "media",
      description: "Optional archive image, poster, or documentation still.",
      options: { hotspot: true },
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      fieldset: "classification",
      description: "Date associated with the archive item.",
    }),
    defineField({
      name: "externalUrl",
      title: "External URL",
      type: "url",
      fieldset: "media",
      description: "Optional source link for the archive item.",
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
      title: "title",
      subtitle: "typeLabel",
      media: "image",
    },
    prepare(selection) {
      const subtitle = typeof selection.subtitle === "string" ? selection.subtitle : "";

      return {
        title: selection.title,
        subtitle: subtitle ? `Type: ${subtitle}` : "",
        media: selection.media,
      };
    },
  },
});
