import { defineField, defineType } from "sanity";

export const splitTextSectionType = defineType({
  name: "splitTextSection",
  title: "Split Text Block",
  type: "object",
  fields: [
    defineField({
      name: "layoutMode",
      title: "Split layout",
      type: "string",
      initialValue: "title-left",
      options: {
        list: [
          { title: "Title left / text right", value: "title-left" },
          { title: "Text left / text right", value: "text-left" },
          { title: "Balanced columns", value: "equal-columns" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "leftEyebrow",
      title: "Left eyebrow",
      type: "localizedString",
    }),
    defineField({
      name: "leftTitle",
      title: "Left title",
      type: "localizedString",
    }),
    defineField({
      name: "leftBody",
      title: "Left text",
      type: "localizedBlocks",
    }),
    defineField({
      name: "rightBody",
      title: "Right text",
      type: "localizedBlocks",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "layout",
      title: "Placement on page",
      type: "sectionLayoutOptions",
    }),
  ],
  preview: {
    select: {
      de: "leftTitle.de",
      en: "leftTitle.en",
      layoutMode: "layoutMode",
    },
    prepare({ de, en, layoutMode }) {
      return {
        title: de || en || "Split text section",
        subtitle: layoutMode || "",
      };
    },
  },
});
