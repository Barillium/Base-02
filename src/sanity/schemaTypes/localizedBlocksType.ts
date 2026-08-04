import { defineArrayMember, defineField, defineType } from "sanity";
import { LocalizedBlocksInput } from "@/sanity/components/LegacyLocalizedInputs";

export const localizedBlocksType = defineType({
  name: "localizedBlocks",
  title: "Localized Rich Text",
  type: "object",
  components: {
    input: LocalizedBlocksInput,
  },
  fields: [
    defineField({
      name: "de",
      title: "German",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Paragraph", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet list", value: "bullet" },
            { title: "Numbered list", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              defineArrayMember({
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (rule) => rule.uri({ allowRelative: false, scheme: ["http", "https", "mailto", "tel"] }),
                  }),
                ],
              }),
            ],
          },
        }),
      ],
    }),
    defineField({
      name: "en",
      title: "English",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Paragraph", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet list", value: "bullet" },
            { title: "Numbered list", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              defineArrayMember({
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (rule) => rule.uri({ allowRelative: false, scheme: ["http", "https", "mailto", "tel"] }),
                  }),
                ],
              }),
            ],
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Localized rich text",
      };
    },
  },
});
