import { defineArrayMember, defineField, defineType } from "sanity";
import { LegacyAboutPageDocumentInput } from "@/sanity/components/LegacyStructuredDocumentInputs";
import {
  createModularSectionsField,
  createSeoField,
  formatLocalizedPreviewTitle,
} from "@/sanity/schemaTypes/schemaHelpers";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  components: {
    input: LegacyAboutPageDocumentInput,
  },
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "profile", title: "Profile" },
    { name: "teasers", title: "Teaser Sections" },
    { name: "sections", title: "Sections" },
    { name: "layout", title: "Layout" },
    { name: "media", title: "Media" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "intro",
      title: "Header",
      group: "content",
      type: "editorialIntro",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "profileEyebrow",
      title: "Small label above profile text",
      group: "profile",
      type: "localizedString",
    }),
    defineField({
      name: "profileTitle",
      title: "Profile title",
      group: "profile",
      type: "localizedText",
    }),
    defineField({
      name: "profileText",
      title: "Profile text",
      group: "profile",
      type: "localizedBlocks",
    }),
    defineField({
      name: "profileParagraphs",
      title: "Profile paragraphs (optional structured version)",
      group: "profile",
      type: "array",
      of: [defineArrayMember({ type: "localizedText" })],
      description:
        "Optional alternative to the rich text field above when the short profile should be edited paragraph by paragraph.",
    }),
    defineField({
      name: "profileTextLayout",
      title: "Profile text layout",
      group: "layout",
      type: "textLayoutOptions",
      description: "Controls position and alignment of the profile text block.",
    }),
    defineField({
      name: "profileImage",
      title: "Profile image",
      group: "media",
      type: "imageFigure",
      description: "Optional image for future use on the about page.",
    }),
    defineField({
      name: "baseTeaserSection",
      title: "Section: The Base",
      group: "teasers",
      type: "teaserSection",
    }),
    defineField({
      name: "inquiryTeaserSection",
      title: "Section: Anfragen",
      group: "teasers",
      type: "teaserSection",
    }),
    defineField({
      name: "awarenessTeaserSection",
      title: "Section: Awareness",
      group: "teasers",
      type: "teaserSection",
    }),
    createModularSectionsField(
      "sections",
      "Zusätzliche Seitenbereiche",
    ),
    createSeoField(),
  ],
  preview: {
    select: {
      de: "intro.title.de",
      en: "intro.title.en",
      legacyTitle: "title",
    },
    prepare({ de, en, legacyTitle }) {
      return {
        title: formatLocalizedPreviewTitle(de, en, "About Page", legacyTitle),
      };
    },
  },
});
