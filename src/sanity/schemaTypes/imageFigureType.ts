import { defineField, defineType } from "sanity";
import { formatLocalizedPreviewTitle } from "@/sanity/schemaTypes/schemaHelpers";

export const imageFigureType = defineType({
  name: "imageFigure",
  title: "Image Figure",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
      description: "Mit Hotspot und Crop für stabile Ausspielung auf mobilen und breiten Layouts.",
    }),
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "localizedString",
    }),
    defineField({
      name: "credit",
      title: "Credit",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "caption.de",
      fallback: "alt.de",
      media: "image",
    },
    prepare({ title, fallback, media }) {
      return {
        title: formatLocalizedPreviewTitle(title, undefined, "Image figure", fallback),
        media,
      };
    },
  },
});
