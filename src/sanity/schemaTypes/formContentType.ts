import { defineField, defineType } from "sanity";

export const formContentType = defineType({
  name: "formContent",
  title: "Formulare",
  type: "document",
  validation: (rule) =>
    rule.custom((value) => {
      if (!value || typeof value !== "object") {
        return true;
      }

      const document = value as {
        newsletterForm?: unknown;
        mediaBookingForm?: unknown;
        mitmachenForm?: unknown;
        supportMembershipForm?: unknown;
      };

      if (!document.newsletterForm || !document.mediaBookingForm || !document.mitmachenForm || !document.supportMembershipForm) {
        return "Bitte alle vier Formular-Bereiche pflegen, damit die festen Formulare vollständig im Studio vorliegen.";
      }

      return true;
    }),
  groups: [
    { name: "settings", title: "Settings", default: true },
    { name: "newsletter", title: "Newsletter" },
    { name: "booking", title: "Media Booking" },
    { name: "openCall", title: "Mitmachen / Open Call" },
    { name: "support", title: "Foerdermitgliedschaft" },
  ],
  fields: [
    defineField({
      name: "internalTitle",
      title: "Interner Titel",
      type: "string",
      initialValue: "Formulare",
      validation: (rule) => rule.required(),
      group: "settings",
    }),
    defineField({
      name: "newsletterForm",
      title: "NewsletterForm",
      type: "newsletterFormCopy",
      group: "newsletter",
    }),
    defineField({
      name: "mediaBookingForm",
      title: "MediaBookingForm",
      type: "mediaBookingFormCopy",
      group: "booking",
    }),
    defineField({
      name: "mitmachenForm",
      title: "MitmachenForm",
      type: "mitmachenFormCopy",
      group: "openCall",
    }),
    defineField({
      name: "supportMembershipForm",
      title: "SupportMembershipForm",
      type: "supportMembershipFormCopy",
      group: "support",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Formulare",
      };
    },
  },
});
