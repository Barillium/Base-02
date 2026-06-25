import { defineField, defineType } from "sanity";

export const formEmbedBlockType = defineType({
  name: "formEmbedBlock",
  title: "Formular-Einbettung",
  type: "object",
  fields: [
    defineField({
      name: "formKind",
      title: "Formular",
      type: "string",
      options: {
        list: [
          { title: "MediaBookingForm", value: "mediaBooking" },
          { title: "MitmachenForm", value: "openCall" },
          { title: "SupportMembershipForm", value: "supportMembership" },
          { title: "NewsletterForm", value: "newsletter" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "layout",
      title: "Platzierung auf der Seite",
      type: "sectionLayoutOptions",
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
      formKind: "formKind",
      isVisible: "isVisible",
    },
    prepare({ formKind, isVisible }) {
      return {
        title: formKind || "Formular-Einbettung",
        subtitle: isVisible === false ? "Ausgeblendet" : "Sichtbar",
      };
    },
  },
});
