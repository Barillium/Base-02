import { defineField, defineType } from "sanity";

export const homeLinkedItemType = defineType({
  name: "homeLinkedItem",
  title: "Homepage-Link",
  type: "object",
  validation: (rule) =>
    rule.custom((value) => {
      if (!value || typeof value !== "object") {
        return true;
      }

      const entry = value as {
        link?: unknown;
        linkedDocument?: unknown;
      };

      if (!entry.link && !entry.linkedDocument) {
        return "Bitte entweder einen manuellen Link oder einen verknuepften Website-Inhalt angeben.";
      }

      return true;
    }),
  fields: [
    defineField({
      name: "meta",
      title: "Small label",
      type: "localizedString",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "link",
      title: "Manueller Link",
      type: "linkField",
      description: "Nutzen, wenn der Eintrag nicht direkt mit einem vorhandenen Dokument der Website verknüpft ist.",
    }),
    defineField({
      name: "linkedDocument",
      title: "Vorhandenen Website-Inhalt verknüpfen",
      type: "reference",
      to: [
        { type: "event" },
        { type: "programmeSeries" },
        { type: "archiveEntry" },
        { type: "mediaProject" },
        { type: "staticPage" },
      ],
    }),
    defineField({
      name: "image",
      title: "Bild (optional)",
      type: "imageFigure",
    }),
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
      meta: "meta.de",
      media: "image.image",
    },
    prepare({ de, en, meta, media }) {
      return {
        title: de || en || "Homepage link item",
        subtitle: meta || "",
        media,
      };
    },
  },
});
