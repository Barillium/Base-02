import { defineArrayMember, defineField, defineType } from "sanity";

export const eventType = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fieldsets: [
    {
      name: "editorial",
      title: "Editorial",
    },
    {
      name: "classification",
      title: "Classification",
      options: { columns: 2 },
    },
    {
      name: "schedule",
      title: "Schedule and Place",
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
      description: "Public event title as it should appear on the website.",
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
      description: "Short teaser copy for overview pages and cards.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      fieldset: "editorial",
      type: "array",
      description: "Optional longer editorial text for detail pages.",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      fieldset: "classification",
      options: {
        list: [
          { title: "Upcoming", value: "upcoming" },
          { title: "Ongoing", value: "ongoing" },
          { title: "Past", value: "past" },
        ],
        layout: "radio",
      },
      initialValue: "upcoming",
      description: "Controls whether the entry belongs to upcoming, ongoing, or past programme views.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      fieldset: "classification",
      options: {
        list: [
          { title: "Exhibition", value: "exhibition" },
          { title: "Concert", value: "concert" },
          { title: "Event", value: "club-night" },
          { title: "Workshop", value: "workshop" },
          { title: "Release Show", value: "release-show" },
          { title: "Other", value: "other" },
        ],
        layout: "radio",
      },
      description: "Used for filtering and clearer editorial organisation.",
    }),
    defineField({
      name: "dateStart",
      title: "Start Date",
      type: "datetime",
      fieldset: "schedule",
      description: "Start date and time of the event.",
    }),
    defineField({
      name: "dateEnd",
      title: "End Date",
      type: "datetime",
      fieldset: "schedule",
      description: "Optional end date and time.",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      fieldset: "schedule",
      description: "Venue or location, for example BOA Bunker of Art or another site in Aachen.",
    }),
    defineField({
      name: "image",
      title: "Main Image",
      type: "image",
      fieldset: "media",
      description: "Optional lead image or poster. Can stay empty while content is still being prepared.",
      options: { hotspot: true },
    }),
    defineField({
      name: "credits",
      title: "Credits",
      fieldset: "media",
      type: "array",
      description: "Optional short credits such as photo, curation, or design.",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "externalUrl",
      title: "External URL",
      type: "url",
      fieldset: "media",
      description: "Optional public source, for example an Instagram post or external announcement.",
    }),
  ],
  orderings: [
    {
      title: "Start date, newest first",
      name: "dateStartDesc",
      by: [{ field: "dateStart", direction: "desc" }],
    },
    {
      title: "Start date, oldest first",
      name: "dateStartAsc",
      by: [{ field: "dateStart", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "status",
      media: "image",
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
