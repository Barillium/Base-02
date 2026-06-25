import { defineField, defineType } from "sanity";

export const fileAttachmentType = defineType({
  name: "fileAttachment",
  title: "File Attachment",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "file",
      title: "File",
      type: "file",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      options: {
        list: [
          { title: "PDF", value: "pdf" },
          { title: "Press", value: "press" },
          { title: "Scan", value: "scan" },
          { title: "Other", value: "other" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      de: "title.de",
      en: "title.en",
    },
    prepare({ de, en }) {
      return {
        title: de || en || "Attachment",
      };
    },
  },
});
