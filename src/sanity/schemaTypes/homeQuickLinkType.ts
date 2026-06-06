import { defineField, defineType } from "sanity";

export const homeQuickLinkType = defineType({
  name: "homeQuickLink",
  title: "Home Quick Link",
  type: "document",
  fieldsets: [
    {
      name: "link",
      title: "Link",
      options: { columns: 2 },
    },
    {
      name: "publishing",
      title: "Publishing",
      options: { columns: 2 },
    },
  ],
  fields: [
    defineField({
      name: "meta",
      title: "Eyebrow / Label",
      type: "string",
      description: "Short label above the quick link title, for example AKTUELL or NÄCHSTER TERMIN.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Visible title of the quick link on the homepage.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Internal Path",
      type: "string",
      fieldset: "link",
      description: "Internal path such as /live/aktuelle-ausstellung.",
      validation: (rule) =>
        rule.required().custom((value) => {
          if (typeof value !== "string") {
            return "Please enter an internal path.";
          }

          return value.startsWith("/") ? true : "Path must start with /";
        }),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Optional supporting copy. Not currently shown on the homepage, but kept for future use.",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      fieldset: "publishing",
      initialValue: 0,
      description: "Controls the order of the quick links on the homepage.",
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      fieldset: "publishing",
      initialValue: true,
      description: "Turn off to hide this quick link without deleting it.",
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "meta",
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.subtitle,
      };
    },
  },
});
