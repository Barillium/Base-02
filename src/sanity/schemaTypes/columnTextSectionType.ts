import { defineField, defineType } from "sanity";

export const columnTextSectionType = defineType({
  name: "columnTextSection",
  title: "Two Column Text Block",
  type: "object",
  fields: [
    defineField({
      name: "leftColumn",
      title: "Left column",
      type: "localizedBlocks",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "rightColumn",
      title: "Right column",
      type: "localizedBlocks",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "columnRatio",
      title: "Column ratio",
      type: "string",
      initialValue: "balanced",
      options: {
        list: [
          { title: "Balanced", value: "balanced" },
          { title: "Left wider", value: "left-wide" },
          { title: "Right wider", value: "right-wide" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "layout",
      title: "Placement on page",
      type: "sectionLayoutOptions",
    }),
  ],
  preview: {
    select: {
      ratio: "columnRatio",
    },
    prepare({ ratio }) {
      return {
        title: "Two column text section",
        subtitle: ratio || "",
      };
    },
  },
});
