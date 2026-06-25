import { defineArrayMember, defineField, defineType } from "sanity";
import {
  createSectionLayoutField,
  formatCountSubtitle,
} from "@/sanity/schemaTypes/schemaHelpers";

export const galleryBlockType = defineType({
  name: "galleryBlock",
  title: "Bildergalerie",
  type: "object",
  fields: [
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [defineArrayMember({ type: "imageFigure" })],
      validation: (rule) => rule.required().min(2).max(12),
      options: {
        sortable: true,
      },
    }),
    defineField({
      name: "galleryLayout",
      title: "Gallery arrangement",
      type: "string",
      initialValue: "grid-2",
      options: {
        list: [
          { title: "Two columns", value: "grid-2" },
          { title: "Three columns", value: "grid-3" },
          { title: "Stacked", value: "stacked" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "caption",
      title: "Gallery caption (optional)",
      type: "localizedString",
    }),
    createSectionLayoutField(),
    defineField({
      name: "isVisible",
      title: "Auf Website anzeigen",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      media: "images.0.image",
      count: "images",
      galleryLayout: "galleryLayout",
      isVisible: "isVisible",
    },
    prepare({ media, count, galleryLayout, isVisible }) {
      return {
        title: "Image gallery",
        subtitle: formatCountSubtitle("Bilder", count, isVisible, galleryLayout || "grid-2"),
        media,
      };
    },
  },
});
