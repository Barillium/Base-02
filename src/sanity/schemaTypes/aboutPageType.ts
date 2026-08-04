import { defineField, defineType } from "sanity";
import { LegacyAboutPageDocumentInput } from "@/sanity/components/LegacyStructuredDocumentInputs";
import {
  createSeoField,
  formatLocalizedPreviewTitle,
} from "@/sanity/schemaTypes/schemaHelpers";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "About",
  type: "document",
  components: {
    input: LegacyAboutPageDocumentInput,
  },
  groups: [
    { name: "content", title: "Inhalt", default: true },
    { name: "profile", title: "Profil" },
    { name: "teasers", title: "Teaser-Bereiche" },
    { name: "layout", title: "Layout" },
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
      title: "Kleine Überschrift über dem Profiltext",
      group: "profile",
      type: "localizedString",
    }),
    defineField({
      name: "profileTitle",
      title: "Profilüberschrift",
      group: "profile",
      type: "localizedText",
    }),
    defineField({
      name: "profileText",
      title: "Profiltext",
      group: "profile",
      type: "localizedBlocks",
    }),
    defineField({
      name: "profileTextLayout",
      title: "Platzierung des Profiltexts",
      group: "layout",
      type: "textLayoutOptions",
      description: "Steuert Position und Ausrichtung des Profiltexts.",
    }),
    defineField({
      name: "baseTeaserSection",
      title: "Bereich: The Base",
      group: "teasers",
      type: "teaserSection",
    }),
    defineField({
      name: "inquiryTeaserSection",
      title: "Bereich: Anfragen",
      group: "teasers",
      type: "teaserSection",
    }),
    defineField({
      name: "awarenessTeaserSection",
      title: "Bereich: Awareness",
      group: "teasers",
      type: "teaserSection",
    }),
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
