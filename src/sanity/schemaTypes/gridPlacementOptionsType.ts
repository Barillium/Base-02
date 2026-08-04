import { defineField, defineType } from "sanity";

export const gridPlacementOptionsType = defineType({
  name: "gridPlacementOptions",
  title: "Grid Placement",
  type: "object",
  fields: [
    defineField({
      name: "start",
      title: "Start column",
      type: "string",
      initialValue: "1",
      options: {
        list: [
          { title: "1", value: "1" },
          { title: "2", value: "2" },
          { title: "3", value: "3" },
          { title: "4", value: "4" },
          { title: "5", value: "5" },
          { title: "6", value: "6" },
          { title: "7", value: "7" },
          { title: "8", value: "8" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "span",
      title: "Column span",
      type: "string",
      initialValue: "6",
      options: {
        list: [
          { title: "4", value: "4" },
          { title: "5", value: "5" },
          { title: "6", value: "6" },
          { title: "7", value: "7" },
          { title: "8", value: "8" },
          { title: "9", value: "9" },
          { title: "10", value: "10" },
          { title: "12", value: "12" },
        ],
        layout: "dropdown",
      },
    }),
  ],
  preview: {
    select: {
      start: "start",
      span: "span",
    },
    prepare({ start, span }) {
      return {
        title: `Columns ${start || "1"}-${span || "6"}`,
        subtitle: "Desktop grid placement",
      };
    },
  },
});
