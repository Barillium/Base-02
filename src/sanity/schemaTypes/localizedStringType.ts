import { defineField, defineType } from "sanity";
import { LocalizedStringInput } from "@/sanity/components/LegacyLocalizedInputs";

export const localizedStringType = defineType({
  name: "localizedString",
  title: "Localized String",
  type: "object",
  components: {
    input: LocalizedStringInput,
  },
  fields: [
    defineField({
      name: "de",
      title: "German",
      type: "string",
    }),
    defineField({
      name: "en",
      title: "English",
      type: "string",
    }),
  ],
  preview: {
    select: {
      de: "de",
      en: "en",
    },
    prepare({ de, en }) {
      return {
        title: de || en || "Untitled localized string",
        subtitle: de && en ? "DE / EN" : de ? "DE only" : en ? "EN only" : "",
      };
    },
  },
});
