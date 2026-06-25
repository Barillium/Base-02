import { defineField, defineType } from "sanity";

export const textSectionType = defineType({
  name: "textSection",
  title: "Text Block",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Small label above the text",
      type: "localizedString",
    }),
    defineField({
      name: "title",
      title: "Section title",
      type: "localizedString",
    }),
    defineField({
      name: "displayTitle",
      title: "Large heading (optional)",
      type: "localizedText",
    }),
    defineField({
      name: "body",
      title: "Body text",
      type: "localizedBlocks",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "layout",
      title: "Placement on page",
      type: "sectionLayoutOptions",
    }),
    defineField({
      name: "isVisible",
      title: "Auf Website anzeigen",
      type: "boolean",
      initialValue: true,
      description: "Schaltet diesen Textblock ein oder aus, ohne die Inhalte zu löschen.",
    }),
  ],
  preview: {
    select: {
      de: "title.de",
      en: "title.en",
      body: "body.de",
      isVisible: "isVisible",
    },
    prepare({ de, en, body, isVisible }) {
      const firstBlock = Array.isArray(body) ? body[0] : undefined;
      const fallback =
        firstBlock?.children?.map((child: { text?: string }) => child.text ?? "").join("").trim() ||
        "Text section";

      return {
        title: de || en || fallback,
        subtitle: isVisible === false ? "Ausgeblendet" : "Sichtbar",
      };
    },
  },
});
