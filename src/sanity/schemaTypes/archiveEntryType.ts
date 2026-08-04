import { defineArrayMember, defineField, defineType } from "sanity";
import { LegacyArchiveEntryDocumentInput } from "@/sanity/components/LegacyStructuredDocumentInputs";

export const archiveEntryType = defineType({
  name: "archiveEntry",
  title: "Archiveintrag",
  type: "document",
  components: {
    input: LegacyArchiveEntryDocumentInput,
  },
  groups: [
    { name: "editorial", title: "Inhalt", default: true },
    { name: "layout", title: "Layout" },
    { name: "classification", title: "Website" },
    { name: "relationships", title: "Verknüpfungen" },
    { name: "media", title: "Medien" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      group: "editorial",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "displayTitle",
      title: "Große Überschrift (optional)",
      group: "editorial",
      type: "localizedText",
      description: "Optionaler Titel mit manuellen Zeilenumbrüchen für große Überschriften.",
    }),
    defineField({
      name: "introLayout",
      title: "Platzierung des Einstiegs",
      group: "layout",
      type: "textLayoutOptions",
      description: "Steuert Position und Ausrichtung des Kopfbereichs.",
    }),
    defineField({
      name: "slug",
      title: "Seitenadresse",
      group: "classification",
      type: "slug",
      description: "Erzeugt die URL des Archiveintrags unter /archive/...",
      options: {
        source: (doc) => {
          const title = doc.title as { de?: string; en?: string } | undefined;
          return title?.de || title?.en || "";
        },
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status auf der Website",
      group: "classification",
      type: "string",
      options: {
        list: [
          { title: "Published", value: "published" },
          { title: "Archived", value: "archived" },
        ],
        layout: "radio",
      },
      initialValue: "published",
      description:
        "Entwürfe steuerst du über Sanitys Draft/Publish. Archivierte Einträge bleiben in Sanity, verschwinden aber aus den regulären Website-Listen.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "siteVisibility",
      title: "Öffentliche Sichtbarkeit",
      group: "classification",
      type: "string",
      options: {
        list: [
          { title: "Show on website", value: "public" },
          { title: "Hide from website", value: "hidden" },
        ],
        layout: "radio",
      },
      initialValue: "public",
      description:
        "Ausgeblendete Einträge bleiben in Sanity, erscheinen aber weder in Übersichten noch auf Detailseiten.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Kurzbeschreibung",
      group: "editorial",
      type: "localizedText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Haupttext",
      group: "editorial",
      type: "localizedBlocks",
    }),
    defineField({
      name: "bodyLayout",
      title: "Platzierung des Haupttexts",
      group: "layout",
      type: "textLayoutOptions",
      description: "Steuert Position und Ausrichtung des Haupttexts.",
    }),
    defineField({
      name: "archiveCategory",
      title: "Bereich",
      group: "classification",
      type: "string",
      options: {
        list: [
          { title: "Catalogue", value: "catalogue" },
          { title: "Poster", value: "poster" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "archiveType",
      title: "Typ",
      group: "classification",
      type: "string",
      options: {
        list: [
          { title: "Catalogue", value: "catalogue" },
          { title: "Poster", value: "poster" },
          { title: "Documentation", value: "documentation" },
          { title: "Text", value: "text" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "date",
      title: "Datum",
      group: "classification",
      type: "date",
    }),
    defineField({
      name: "externalUrl",
      title: "Externer Link (optional)",
      group: "classification",
      type: "url",
    }),
    defineField({
      name: "coverImage",
      title: "Main image",
      group: "media",
      type: "imageFigure",
    }),
    defineField({
      name: "gallery",
      title: "More images",
      group: "media",
      type: "array",
      of: [defineArrayMember({ type: "imageFigure" })],
    }),
    defineField({
      name: "attachments",
      title: "Files",
      group: "media",
      type: "array",
      of: [defineArrayMember({ type: "fileAttachment" })],
    }),
    defineField({
      name: "sourceEvent",
      title: "Related event",
      group: "relationships",
      type: "reference",
      to: [{ type: "event" }],
    }),
    defineField({
      name: "sourceSeries",
      title: "Related series",
      group: "relationships",
      type: "reference",
      to: [{ type: "programmeSeries" }],
    }),
    defineField({
      name: "sourceMediaProject",
      title: "Related media project",
      group: "relationships",
      type: "reference",
      to: [{ type: "mediaProject" }],
    }),
    defineField({
      name: "credits",
      title: "Credits (optional)",
      group: "relationships",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      group: "seo",
      type: "seoFields",
    }),
  ],
  orderings: [
    {
      title: "Date, newest first",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      de: "title.de",
      en: "title.en",
      legacyTitle: "title",
      status: "status",
      siteVisibility: "siteVisibility",
      media: "coverImage.image",
    },
    prepare({ de, en, legacyTitle, status, siteVisibility, media }) {
      const statusLabel = status === "archived" ? "Archiviert" : "Veröffentlicht";
      const visibilityLabel = siteVisibility === "hidden" ? "Ausgeblendet" : "Sichtbar";
      const resolvedLegacyTitle = typeof legacyTitle === "string" ? legacyTitle : undefined;

      return {
        title: de || en || resolvedLegacyTitle || "Untitled archive entry",
        subtitle: `${statusLabel} • ${visibilityLabel}`,
        media,
      };
    },
  },
});
