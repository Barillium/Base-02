import { defineArrayMember, defineField, defineType } from "sanity";
import { LegacyMediaProjectDocumentInput } from "@/sanity/components/LegacyStructuredDocumentInputs";

export const mediaProjectType = defineType({
  name: "mediaProject",
  title: "Medienprojekt",
  type: "document",
  components: {
    input: LegacyMediaProjectDocumentInput,
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
      title: "Projekttitel",
      group: "editorial",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "displayTitle",
      title: "Große Überschrift (optional)",
      group: "editorial",
      type: "localizedText",
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
      title: "Seitenadresse (optional)",
      group: "classification",
      type: "slug",
      description:
        "Derzeit erscheinen Medienprojekte als kuratierte Liste unter /media/produktionen. Eine eigene Detailseite ist noch nicht aktiv, daher ist dieses Feld optional.",
      options: {
        source: (doc) => {
          const title = doc.title as { de?: string; en?: string } | undefined;
          return title?.de || title?.en || "";
        },
        maxLength: 96,
      },
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
        "Entwürfe steuerst du über Sanitys Draft/Publish. Archivierte Projekte bleiben in Sanity, verschwinden aber aus den regulären Website-Listen.",
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
        "Ausgeblendete Einträge bleiben in Sanity, erscheinen aber nicht auf der Website.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "mediaType",
      title: "Medientyp",
      group: "classification",
      type: "string",
      options: {
        list: [
          { title: "Photo", value: "photo" },
          { title: "Video", value: "video" },
          { title: "Poster", value: "poster" },
          { title: "Livestream", value: "livestream" },
          { title: "Recording", value: "recording" },
          { title: "Documentation", value: "documentation" },
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
      title: "Gallery",
      group: "media",
      type: "array",
      of: [defineArrayMember({ type: "imageFigure" })],
    }),
    defineField({
      name: "attachments",
      title: "Attachments",
      group: "media",
      type: "array",
      of: [defineArrayMember({ type: "fileAttachment" })],
    }),
    defineField({
      name: "relatedEvent",
      title: "Related Event",
      group: "relationships",
      type: "reference",
      to: [{ type: "event" }],
    }),
    defineField({
      name: "relatedSeries",
      title: "Related Programme Series",
      group: "relationships",
      type: "reference",
      to: [{ type: "programmeSeries" }],
    }),
    defineField({
      name: "relatedArchive",
      title: "Related Archive Entries",
      group: "relationships",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "archiveEntry" }] })],
    }),
    defineField({
      name: "credits",
      title: "Credits",
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
        title: de || en || resolvedLegacyTitle || "Untitled media project",
        subtitle: `${statusLabel} • ${visibilityLabel}`,
        media,
      };
    },
  },
});
