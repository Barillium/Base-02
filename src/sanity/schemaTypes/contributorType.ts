import { defineField, defineType } from "sanity";

export const contributorType = defineType({
  name: "contributor",
  title: "Contributor",
  type: "document",
  fieldsets: [
    {
      name: "profile",
      title: "Profile",
    },
    {
      name: "links",
      title: "Links",
    },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Public name of the contributor or team member.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      fieldset: "profile",
      description: "Role within the project, for example production, awareness, curation, or technical support.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      fieldset: "profile",
      type: "text",
      rows: 3,
      description: "Optional short profile text for overview pages.",
    }),
    defineField({
      name: "links",
      title: "Links",
      fieldset: "links",
      type: "array",
      description: "Optional external links.",
      of: [{ type: "url" }],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
    },
  },
});
