import { defineField, defineType } from "sanity";
import {
  createSectionLayoutField,
  createVisibilityField,
  formatLocalizedPreviewTitle,
  formatVisibilityLabel,
} from "@/sanity/schemaTypes/schemaHelpers";

export const imageBlockType = defineType({
  name: "imageBlock",
  title: "Einzelbild",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "imageFigure",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ratio",
      title: "Image ratio",
      type: "string",
      initialValue: "auto",
      options: {
        list: [
          { title: "Original", value: "auto" },
          { title: "16:9", value: "16:9" },
          { title: "4:3", value: "4:3" },
          { title: "1:1", value: "1:1" },
          { title: "Portrait", value: "portrait" },
        ],
        layout: "radio",
      },
    }),
    createSectionLayoutField(),
    createVisibilityField(),
  ],
  preview: {
    select: {
      title: "image.caption.de",
      fallback: "image.alt.de",
      ratio: "ratio",
      media: "image.image",
      isVisible: "isVisible",
    },
    prepare({ title, fallback, ratio, media, isVisible }) {
      return {
        title: formatLocalizedPreviewTitle(title, undefined, "Single image", fallback),
        subtitle: [ratio || "Original", formatVisibilityLabel(isVisible)].join(" • "),
        media,
      };
    },
  },
});
