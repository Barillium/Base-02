import { defineField, defineType } from "sanity";
import {
  createSectionLayoutField,
  formatLocalizedPreviewTitle,
  formatVisibilityLabel,
  linkedDocumentReferenceTypes,
  validateExclusiveLinkTarget,
} from "@/sanity/schemaTypes/schemaHelpers";

export const ctaBlockType = defineType({
  name: "ctaBlock",
  title: "Call to Action",
  type: "object",
  validation: (rule) =>
    rule.custom((value) => {
      const targetValidation = validateExclusiveLinkTarget(value);

      if (targetValidation !== true) {
        return targetValidation;
      }

      if (!value || typeof value !== "object") {
        return true;
      }

      const block = value as {
        label?: unknown;
        link?: unknown;
        linkedDocument?: unknown;
      };

      if ((block.link || block.linkedDocument) && !block.label) {
        return "Bitte einen CTA-Text angeben, wenn der Block verlinkt wird.";
      }

      return true;
    }),
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "localizedString",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "localizedText",
    }),
    defineField({
      name: "label",
      title: "Link label",
      type: "localizedString",
      description: "Kurzer CTA wie Weiter, Mehr oder Zur Seite.",
    }),
    defineField({
      name: "link",
      title: "Manual link",
      type: "linkField",
    }),
    defineField({
      name: "linkedDocument",
      title: "Linked website document",
      type: "reference",
      to: linkedDocumentReferenceTypes,
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
      isVisible: "isVisible",
    },
    prepare({ de, en, isVisible }) {
      return {
        title: formatLocalizedPreviewTitle(de, en, "CTA block"),
        subtitle: formatVisibilityLabel(isVisible),
      };
    },
  },
});
