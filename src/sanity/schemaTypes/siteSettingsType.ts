import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fieldsets: [
    {
      name: "profile",
      title: "Profile",
    },
    {
      name: "seo",
      title: "SEO",
    },
    {
      name: "contact",
      title: "Contact",
    },
  ],
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      fieldset: "profile",
      description: "Main site name used across the project.",
    }),
    defineField({
      name: "associationStatement",
      title: "Association Statement",
      type: "text",
      fieldset: "profile",
      rows: 3,
      description: "Short self-description of the association or organisation.",
    }),
    defineField({
      name: "categoryName",
      title: "Category Name",
      type: "string",
      fieldset: "profile",
      description: "Public category label, for example Cultural Center.",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      fieldset: "seo",
      rows: 3,
      description: "Fallback meta description for the website.",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      fieldset: "contact",
      description: "General contact address for editorial or public use.",
      validation: (rule) => rule.email(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
      };
    },
  },
});
