import { defineField, defineType } from "sanity";

export const textLayoutOptionsType = defineType({
  name: "textLayoutOptions",
  title: "Text Layout",
  type: "object",
  fields: [
    defineField({
      name: "position",
      title: "Position in the layout",
      type: "string",
      initialValue: "default",
      options: {
        list: [
          { title: "Standard width", value: "default" },
          { title: "Centered text block", value: "centered" },
        ],
        layout: "radio",
      },
      description:
        "Keeps the text in the normal layout rhythm or places it as a centered text block.",
    }),
    defineField({
      name: "alignment",
      title: "Text alignment",
      type: "string",
      initialValue: "left",
      options: {
        list: [
          { title: "Left aligned", value: "left" },
          { title: "Centered", value: "center" },
          { title: "Right aligned", value: "right" },
        ],
        layout: "radio",
      },
      description: "Controls how the text is aligned inside its block.",
    }),
  ],
  preview: {
    select: {
      position: "position",
      alignment: "alignment",
    },
    prepare({ position, alignment }) {
      const positionLabel = position === "centered" ? "Centered block" : "Standard width";
      const alignmentLabel =
        alignment === "center" ? "Centered text" : alignment === "right" ? "Right aligned" : "Left aligned";

      return {
        title: positionLabel,
        subtitle: alignmentLabel,
      };
    },
  },
});
