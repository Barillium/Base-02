import { defineField, defineType } from "sanity";
import {
  formatLocalizedPreviewTitle,
  formatVisibilityLabel,
  linkedDocumentReferenceTypes,
  validateExclusiveLinkTarget,
} from "@/sanity/schemaTypes/schemaHelpers";

export const teaserCardType = defineType({
  name: "teaserCard",
  title: "Teaser-Karte",
  type: "object",
  validation: (rule) =>
    rule.custom(validateExclusiveLinkTarget),
  fields: [
    defineField({
      name: "meta",
      title: "Meta-Zeile",
      type: "localizedString",
    }),
    defineField({
      name: "title",
      title: "Titel",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Kurzbeschreibung",
      type: "localizedText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA-Text",
      type: "localizedString",
      description: "Kurzer Linktext wie z. B. Weiter, Mehr oder Zum Projekt.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "link",
      title: "Manueller Link",
      type: "linkField",
    }),
    defineField({
      name: "linkedDocument",
      title: "Vorhandenen Website-Inhalt verknüpfen",
      type: "reference",
      to: linkedDocumentReferenceTypes,
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
      isVisible: "isVisible",
    },
    prepare({ de, en, meta, media, isVisible }) {
      return {
        title: formatLocalizedPreviewTitle(de, en, "Teaser-Karte"),
        subtitle: [meta, formatVisibilityLabel(isVisible)].filter(Boolean).join(" • "),
        media,
      };
    },
  },
});
