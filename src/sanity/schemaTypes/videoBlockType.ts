import { defineField, defineType } from "sanity";
import {
  createSectionLayoutField,
  formatLocalizedPreviewTitle,
  formatVisibilityLabel,
} from "@/sanity/schemaTypes/schemaHelpers";

export const videoBlockType = defineType({
  name: "videoBlock",
  title: "Video",
  type: "object",
  validation: (rule) =>
    rule.custom((value) => {
      if (!value || typeof value !== "object") {
        return true;
      }

      const block = value as {
        sourceType?: "upload" | "youtube" | "vimeo";
        videoFile?: unknown;
        url?: unknown;
      };

      if (block.sourceType === "upload" && !block.videoFile) {
        return "Bitte eine Videodatei hochladen.";
      }

      if (block.sourceType !== "upload" && !block.url) {
        return "Bitte einen Video-Link angeben.";
      }

      return true;
    }),
  fields: [
    defineField({
      name: "sourceType",
      title: "Video source",
      type: "string",
      initialValue: "upload",
      options: {
        list: [
          { title: "Upload", value: "upload" },
          { title: "YouTube", value: "youtube" },
          { title: "Vimeo", value: "vimeo" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "videoFile",
      title: "Uploaded video",
      type: "file",
      hidden: ({ parent }) => parent?.sourceType !== "upload",
    }),
    defineField({
      name: "url",
      title: "Video link",
      type: "url",
      hidden: ({ parent }) => parent?.sourceType === "upload",
    }),
    defineField({
      name: "title",
      title: "Video title",
      type: "localizedString",
    }),
    defineField({
      name: "accessibleDescription",
      title: "Accessible description",
      type: "localizedText",
    }),
    defineField({
      name: "caption",
      title: "Caption (optional)",
      type: "localizedString",
    }),
    defineField({
      name: "posterImage",
      title: "Poster image (optional)",
      type: "imageFigure",
    }),
    defineField({
      name: "ratio",
      title: "Video ratio",
      type: "string",
      initialValue: "16:9",
      options: {
        list: [
          { title: "16:9", value: "16:9" },
          { title: "4:3", value: "4:3" },
          { title: "1:1", value: "1:1" },
          { title: "Portrait", value: "portrait" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "controls",
      title: "Show player controls",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "muted",
      title: "Start muted",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "loop",
      title: "Loop video",
      type: "boolean",
      initialValue: false,
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
      de: "title.de",
      en: "title.en",
      sourceType: "sourceType",
      media: "posterImage.image",
      isVisible: "isVisible",
    },
    prepare({ de, en, sourceType, media, isVisible }) {
      return {
        title: formatLocalizedPreviewTitle(de, en, "Video"),
        subtitle: [sourceType || "upload", formatVisibilityLabel(isVisible)].join(" • "),
        media,
      };
    },
  },
});
