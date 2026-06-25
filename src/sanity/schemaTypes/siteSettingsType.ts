import { defineArrayMember, defineField, defineType } from "sanity";
import { LegacySiteSettingsDocumentInput } from "@/sanity/components/LegacyStructuredDocumentInputs";
import { formatLocalizedPreviewTitle } from "@/sanity/schemaTypes/schemaHelpers";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "General Website Information",
  type: "document",
  components: {
    input: LegacySiteSettingsDocumentInput,
  },
  groups: [
    { name: "profile", title: "Basic Information", default: true },
    { name: "seo", title: "SEO" },
    { name: "contact", title: "Contact" },
  ],
  fields: [
    defineField({
      name: "siteTitle",
      title: "Website name",
      type: "string",
      group: "profile",
      description: "Main site name used across the project.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "associationStatement",
      title: "Short text about the association",
      type: "localizedText",
      group: "profile",
      description: "Short self-description of the association.",
    }),
    defineField({
      name: "defaultSeo",
      title: "Default SEO settings",
      type: "seoFields",
      group: "seo",
      description: "Fallback metadata when no page-level SEO is set.",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact email address",
      type: "string",
      group: "contact",
      description: "General public contact address.",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "postalAddress",
      title: "Postal address",
      type: "text",
      group: "contact",
      rows: 3,
      description: "Postal address as it should appear on the contact page.",
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      group: "contact",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "url",
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      siteTitle: "siteTitle",
    },
    prepare({ siteTitle }) {
      return {
        title: formatLocalizedPreviewTitle(undefined, undefined, "Site Settings", siteTitle),
      };
    },
  },
});
