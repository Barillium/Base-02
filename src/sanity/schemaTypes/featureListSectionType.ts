import { defineArrayMember, defineField, defineType } from "sanity";
import {
  createSectionLayoutField,
  createVisibilityField,
  formatCountSubtitle,
  formatLocalizedPreviewTitle,
} from "@/sanity/schemaTypes/schemaHelpers";

export const featureListSectionType = defineType({
  name: "featureListSection",
  title: "Listenbereich",
  type: "object",
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
    }),
    defineField({
      name: "displayTitle",
      title: "Display title",
      type: "localizedText",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedText",
    }),
    defineField({
      name: "items",
      title: "List items",
      type: "array",
      of: [defineArrayMember({ type: "featureListItem" })],
      validation: (rule) => rule.required().min(1),
      options: {
        sortable: true,
      },
    }),
    createSectionLayoutField(),
    createVisibilityField(),
  ],
  preview: {
    select: {
      de: "title.de",
      en: "title.en",
      items: "items",
      isVisible: "isVisible",
    },
    prepare({ de, en, items, isVisible }) {
      return {
        title: formatLocalizedPreviewTitle(de, en, "Feature list"),
        subtitle: formatCountSubtitle("Einträge", items, isVisible),
      };
    },
  },
});
