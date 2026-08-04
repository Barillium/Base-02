import { defineField, defineType } from "sanity";
import { formatLocalizedPreviewTitle } from "@/sanity/schemaTypes/schemaHelpers";

export const linkFieldType = defineType({
  name: "linkField",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "kind",
      title: "Linktyp",
      type: "string",
      options: {
        list: [
          { title: "Internal", value: "internal" },
          { title: "External", value: "external" },
        ],
        layout: "radio",
      },
      initialValue: "internal",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "internalPath",
      title: "Interner Pfad",
      type: "string",
      hidden: ({ parent }) => (parent as { kind?: string } | undefined)?.kind !== "internal",
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { kind?: string } | undefined;

          if (parent?.kind !== "internal") {
            return true;
          }

          if (typeof value !== "string" || value.length === 0) {
            return "Please enter an internal path.";
          }

          return value.startsWith("/") ? true : "Path must start with /";
        }),
    }),
    defineField({
      name: "externalUrl",
      title: "Externe URL",
      type: "url",
      hidden: ({ parent }) => (parent as { kind?: string } | undefined)?.kind !== "external",
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { kind?: string } | undefined;

          if (parent?.kind !== "external") {
            return true;
          }

          return value ? true : "Please enter an external URL.";
        }),
    }),
  ],
  preview: {
    select: {
      kind: "kind",
      internalPath: "internalPath",
      externalUrl: "externalUrl",
    },
    prepare({ kind, internalPath, externalUrl }) {
      return {
        title:
          kind === "external"
            ? formatLocalizedPreviewTitle(undefined, undefined, "Externer Link", externalUrl)
            : formatLocalizedPreviewTitle(undefined, undefined, "Interner Link", internalPath),
        subtitle: kind === "external" ? "Extern" : "Intern",
      };
    },
  },
});
