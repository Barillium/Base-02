import { createClient } from "next-sanity";

import { apiVersion, assertSanityConfigured, dataset, isSanityConfigured, projectId, studioUrl } from "@/sanity/lib/env";

const config = isSanityConfigured
  ? {
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published" as const,
      stega: {
        studioUrl,
      },
    }
  : null;

export const sanityClient = config ? createClient(config) : null;

export function getSanityClient() {
  assertSanityConfigured();

  if (!sanityClient) {
    throw new Error("Sanity client could not be created.");
  }

  return sanityClient;
}
