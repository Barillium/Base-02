import { defineField, defineType } from "sanity";

export const seoFieldsType = defineType({
  name: "seoFields",
  title: "SEO Fields",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "localizedString",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "localizedText",
    }),
    defineField({
      name: "noIndex",
      title: "No Index",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "SEO fields",
      };
    },
  },
});
