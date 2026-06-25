import { createClient } from "@sanity/client";
import { documents } from "./sanity-content-documents.mjs";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-05-27";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("Missing Sanity env vars. Required:");
  console.error("- NEXT_PUBLIC_SANITY_PROJECT_ID");
  console.error("- NEXT_PUBLIC_SANITY_DATASET");
  console.error("- SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

for (const document of documents) {
  await client.createOrReplace(document);
  console.log(`Upserted ${document._id}`);
}

console.log("Sanity content upsert completed.");
