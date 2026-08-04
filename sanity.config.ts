import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

import { deskStructure } from "@/sanity/deskStructure";
import { schemaTypes } from "@/sanity/schemaTypes";
import { singletonSchemaTypes } from "@/sanity/schemaTypes/schemaHelpers";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const fixedDocumentTypes = new Set<string>([...singletonSchemaTypes, "staticPage"]);

export default defineConfig({
  name: "default",
  title: "The Base Studio",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    deskTool({
      structure: deskStructure,
    }),
  ],
  document: {
    actions: (previousActions, context) =>
      fixedDocumentTypes.has(context.schemaType)
        ? previousActions.filter((action) => action.action !== "duplicate")
        : previousActions,
  },
  schema: {
    types: schemaTypes,
    templates: (previousTemplates) =>
      previousTemplates.filter((template) => !fixedDocumentTypes.has(template.schemaType)),
  },
});
