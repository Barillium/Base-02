import { defineArrayMember, defineField, defineType } from "sanity";
import { LegacyEventDocumentInput } from "@/sanity/components/LegacyEventDocumentInput";

export const eventType = defineType({
  name: "event",
  title: "Veranstaltung",
  type: "document",
  components: {
    input: LegacyEventDocumentInput,
  },
  validation: (rule) =>
    rule.custom((value) => {
      if (!value || typeof value !== "object") {
        return true;
      }

      const event = value as {
        startDate?: string;
        endDate?: string;
      };

      if (event.startDate && event.endDate && event.endDate < event.startDate) {
        return "Das Enddatum darf nicht vor dem Startdatum liegen.";
      }

      return true;
    }),
  groups: [
    { name: "editorial", title: "Inhalt", default: true },
    { name: "layout", title: "Layout" },
    { name: "classification", title: "Website" },
    { name: "schedule", title: "Datum und Ort" },
    { name: "relationships", title: "Verknüpfungen" },
    { name: "media", title: "Medien" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Veranstaltungstitel",
      type: "localizedString",
      group: "editorial",
      description: "Öffentlicher Titel der Veranstaltung auf der Website.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "displayTitle",
      title: "Große Überschrift (optional)",
      type: "localizedText",
      group: "editorial",
      description: "Optionaler Titel mit manuellen Zeilenumbrüchen für große Überschriften.",
    }),
    defineField({
      name: "introLayout",
      title: "Platzierung des Einstiegs",
      type: "textLayoutOptions",
      group: "layout",
      description: "Steuert Position und Ausrichtung des Kopfbereichs.",
    }),
    defineField({
      name: "slug",
      title: "Seitenadresse",
      type: "slug",
      group: "classification",
      description: "Erzeugt die URL der Veranstaltungsseite unter /live/...",
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
      type: "string",
      group: "classification",
      options: {
        list: [
          { title: "Upcoming / current", value: "upcoming" },
          { title: "Past", value: "past" },
          { title: "Archived", value: "archived" },
        ],
        layout: "radio",
      },
      initialValue: "upcoming",
      description:
        "Entwürfe steuerst du über Sanitys Draft/Publish. Dieses Feld bestimmt, wie die veröffentlichte Veranstaltung auf der Website behandelt wird.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "siteVisibility",
      title: "Öffentliche Sichtbarkeit",
      type: "string",
      group: "classification",
      options: {
        list: [
          { title: "Show on website", value: "public" },
          { title: "Hide from website", value: "hidden" },
        ],
        layout: "radio",
      },
      initialValue: "public",
      description:
        "Ausgeblendete Einträge bleiben in Sanity, erscheinen aber weder in Listen noch auf der Detailseite.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Kurzbeschreibung",
      type: "localizedText",
      group: "editorial",
      description: "Kurzer Teasertext für Übersichten, Karten und Vorschauen.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Haupttext",
      group: "editorial",
      type: "localizedBlocks",
      description: "Längerer redaktioneller Text für die Veranstaltungsseite.",
    }),
    defineField({
      name: "bodyLayout",
      title: "Platzierung des Haupttexts",
      type: "textLayoutOptions",
      group: "layout",
      description: "Steuert Position und Ausrichtung des Haupttexts.",
    }),
    defineField({
      name: "eventType",
      title: "Art der Veranstaltung",
      type: "string",
      group: "classification",
      options: {
        list: [
          { title: "Exhibition", value: "exhibition" },
          { title: "Concert", value: "concert" },
          { title: "Workshop", value: "workshop" },
          { title: "Release Show", value: "release-show" },
          { title: "Other", value: "other" },
        ],
      },
      description: "Hilft bei Darstellung und interner Einordnung.",
    }),
    defineField({
      name: "featuredCurrent",
      title: "Als aktuelle Veranstaltung hervorheben",
      type: "boolean",
      group: "classification",
      initialValue: false,
      hidden: ({ document }) => document?.status === "past" || document?.status === "archived",
      description: "Hebt die Veranstaltung auf der Live-Seite als aktuellen Programmpunkt hervor. Nur für kommende Veranstaltungen relevant.",
    }),
    defineField({
      name: "externalUrl",
      title: "Externer Link (optional)",
      type: "url",
      group: "classification",
      description: "Optionaler öffentlicher Link, z. B. zu Instagram oder einer externen Ankündigung.",
    }),
    defineField({
      name: "startDate",
      title: "Startdatum und Uhrzeit",
      type: "datetime",
      group: "schedule",
      description: "Beginn der Veranstaltung.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "Enddatum und Uhrzeit",
      type: "datetime",
      group: "schedule",
      description: "Optionales Ende der Veranstaltung.",
    }),
    defineField({
      name: "venue",
      title: "Ort",
      type: "string",
      group: "schedule",
      description: "Veranstaltungsort, z. B. BOA Bunker of Art oder ein anderer Ort in Aachen.",
    }),
    defineField({
      name: "coverImage",
      title: "Main image",
      type: "imageFigure",
      group: "media",
    }),
    defineField({
      name: "gallery",
      title: "More images",
      type: "array",
      group: "media",
      of: [defineArrayMember({ type: "imageFigure" })],
    }),
    defineField({
      name: "attachments",
      title: "Files",
      type: "array",
      group: "media",
      of: [defineArrayMember({ type: "fileAttachment" })],
    }),
    defineField({
      name: "series",
      title: "Belongs to series (optional)",
      type: "reference",
      group: "relationships",
      to: [{ type: "programmeSeries" }],
    }),
    defineField({
      name: "relatedArchive",
      title: "Related archive entries",
      type: "array",
      group: "relationships",
      of: [defineArrayMember({ type: "reference", to: [{ type: "archiveEntry" }] })],
    }),
    defineField({
      name: "relatedMedia",
      title: "Related media projects",
      type: "array",
      group: "relationships",
      of: [defineArrayMember({ type: "reference", to: [{ type: "mediaProject" }] })],
    }),
    defineField({
      name: "credits",
      title: "Credits (optional)",
      group: "relationships",
      type: "array",
      description: "Optional short credits such as photo, curation, or design.",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoFields",
      group: "seo",
    }),
  ],
  orderings: [
    {
      title: "Start date, newest first",
      name: "startDateDesc",
      by: [{ field: "startDate", direction: "desc" }],
    },
    {
      title: "Start date, oldest first",
      name: "startDateAsc",
      by: [{ field: "startDate", direction: "asc" }],
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
      const statusLabel =
        status === "past"
          ? "Vergangen"
          : status === "archived"
            ? "Archiviert"
            : "Aktuell / kommend";
      const visibilityLabel = siteVisibility === "hidden" ? "Ausgeblendet" : "Sichtbar";
      const resolvedLegacyTitle = typeof legacyTitle === "string" ? legacyTitle : undefined;

      return {
        title: de || en || resolvedLegacyTitle || "Untitled event",
        subtitle: `${statusLabel} • ${visibilityLabel}`,
        media,
      };
    },
  },
});
