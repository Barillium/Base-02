import { defineArrayMember, defineField, defineType } from "sanity";
import { LegacyHomePageDocumentInput } from "@/sanity/components/LegacyStructuredDocumentInputs";
import { createSeoField, formatLocalizedPreviewTitle, homepageSectionMembers } from "@/sanity/schemaTypes/schemaHelpers";

export const homePageType = defineType({
  name: "homePage",
  title: "Hauptseite",
  type: "document",
  components: {
    input: LegacyHomePageDocumentInput,
  },
  groups: [
    { name: "content", title: "Inhalt", default: true },
    { name: "sections", title: "Bereiche" },
    { name: "links", title: "Links" },
    { name: "legacy", title: "Altbestand / Migration" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "internalTitle",
      title: "Interner Titel",
      type: "string",
      initialValue: "Homepage",
      validation: (rule) => rule.required(),
      group: "content",
      description: "Nur für das Studio. Dieser Titel erscheint nicht auf der Website.",
    }),
    defineField({
      name: "sections",
      title: "Bereiche der Hauptseite",
      group: "sections",
      type: "array",
      validation: (rule) => rule.required().min(1),
      options: {
        sortable: true,
      },
      description:
        "Die Reihenfolge hier bestimmt direkt die Reihenfolge auf der Hauptseite. Blöcke bleiben strukturiert und folgen festen Layoutoptionen statt freier Gestaltung.",
      of: homepageSectionMembers,
    }),
    defineField({
      name: "quickLinks",
      title: "Alte Schnelleinstiege",
      group: "links",
      hidden: ({ document }) => Array.isArray(document?.sections) && document.sections.length > 0,
      description: "Alter Fallback aus der Vor-Migrationsphase. Sobald die Hauptseite über Bereiche gepflegt wird, bleibt dieses Feld ausgeblendet.",
      type: "array",
      validation: (rule) => rule.max(3),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Small label",
              type: "localizedString",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "title",
              title: "Link title",
              type: "localizedString",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Short text",
              type: "localizedText",
            }),
            defineField({
              name: "link",
              title: "Manual link (optional)",
              type: "linkField",
            }),
            defineField({
              name: "linkedDocument",
              title: "Choose content from the website",
              type: "reference",
              description:
                "If the chosen content is archived or hidden, it will not appear on the homepage.",
              to: [
                { type: "event" },
                { type: "programmeSeries" },
                { type: "archiveEntry" },
                { type: "mediaProject" },
                { type: "staticPage" },
              ],
            }),
            defineField({
              name: "order",
              title: "Position",
              type: "number",
              initialValue: 0,
              validation: (rule) => rule.required().integer().min(0),
            }),
            defineField({
              name: "isActive",
              title: "Show this item",
              type: "boolean",
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              de: "title.de",
              en: "title.en",
              order: "order",
            },
            prepare({ de, en, order }) {
              return {
                title: de || en || "Quick link",
                subtitle: typeof order === "number" ? `Order: ${order}` : "",
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "statement",
      title: "Alter Introtext",
      group: "legacy",
      hidden: ({ document }) => Array.isArray(document?.sections) && document.sections.length > 0,
      description: "Nur noch für Altbestand. Die aktuelle Hauptseite sollte über Bereiche gepflegt werden.",
      type: "localizedText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "note",
      title: "Alte Zusatznotiz",
      group: "legacy",
      hidden: ({ document }) => Array.isArray(document?.sections) && document.sections.length > 0,
      description: "Nur noch für Altbestand. Die aktuelle Hauptseite sollte über Bereiche gepflegt werden.",
      type: "localizedText",
    }),
    defineField({
      name: "milestones",
      title: "Alte Stichpunkte",
      group: "legacy",
      type: "localizedBlocks",
      hidden: ({ document }) => Array.isArray(document?.sections) && document.sections.length > 0,
      description: "Nur noch für Altbestand. Die aktuelle Hauptseite sollte über Bereiche gepflegt werden.",
    }),
    defineField({
      name: "featuredAbout",
      title: "Alte About-Links",
      group: "links",
      hidden: ({ document }) => Array.isArray(document?.sections) && document.sections.length > 0,
      type: "array",
      description:
        "Alter Fallback aus der Vor-Migrationsphase. Sobald die Hauptseite über Bereiche gepflegt wird, bleibt dieses Feld ausgeblendet.",
      validation: (rule) => rule.max(3),
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "staticPage" }],
          options: {
            filter:
              '_type == "staticPage" && routeKey in $routeKeys',
            filterParams: {
              routeKeys: [
                "about-the-base",
                "about-code-of-conduct",
                "about-kontakt",
                "about-foerdermitgliedschaft",
                "mitmachen",
              ],
            },
          },
        }),
      ],
    }),
    createSeoField(),
  ],
  preview: {
    select: {
      internalTitle: "internalTitle",
    },
    prepare({ internalTitle }) {
      return {
        title: formatLocalizedPreviewTitle(undefined, undefined, "Hauptseite", internalTitle),
      };
    },
  },
});
