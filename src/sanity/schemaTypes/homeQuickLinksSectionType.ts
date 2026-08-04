import { defineArrayMember, defineField, defineType } from "sanity";
import {
  createSectionLayoutField,
  createVisibilityField,
  formatCountSubtitle,
} from "@/sanity/schemaTypes/schemaHelpers";

export const homeQuickLinksSectionType = defineType({
  name: "homeQuickLinksSection",
  title: "Schnelleinstiege",
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "Einträge",
      type: "array",
      of: [defineArrayMember({ type: "homeLinkedItem" })],
      validation: (rule) => rule.required().min(1).max(3),
      options: {
        sortable: true,
      },
      description: "Kurze Einstiege am oberen Seitenanfang. Ideal für aktuelle Programmpunkte oder feste Zugänge.",
    }),
    createSectionLayoutField(),
    createVisibilityField(),
  ],
  preview: {
    select: {
      items: "items",
      isVisible: "isVisible",
    },
    prepare({ items, isVisible }) {
      return {
        title: "Homepage quick links",
        subtitle: formatCountSubtitle("Einträge", items, isVisible),
      };
    },
  },
});
