import { defineField, defineType } from "sanity";
import { LocalizedTextInput } from "@/sanity/components/LegacyLocalizedInputs";

export const localizedTextType = defineType({
  name: "localizedText",
  title: "Localized Text",
  type: "object",
  components: {
    input: LocalizedTextInput,
  },
  fields: [
    defineField({
      name: "de",
      title: "German",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "en",
      title: "English",
      type: "text",
      rows: 4,
    }),
  ],
  preview: {
    select: {
      de: "de",
      en: "en",
    },
    prepare({ de, en }) {
      return {
        title: de || en || "Untitled localized text",
        subtitle: de && en ? "DE / EN" : de ? "DE only" : en ? "EN only" : "",
      };
    },
  },
});
