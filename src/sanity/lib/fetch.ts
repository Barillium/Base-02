import type { QueryParams } from "next-sanity";

import { getSanityClient } from "@/sanity/lib/client";
import { isSanityConfigured, previewToken, readToken } from "@/sanity/lib/env";

type SanityFetchOptions = {
  query: string;
  params?: QueryParams;
  tags?: string[];
  revalidate?: number | false;
  preview?: boolean;
};

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = 300,
  preview = false,
}: SanityFetchOptions): Promise<T> {
  const token = preview ? previewToken : readToken;
  const client = getSanityClient().withConfig({
    token,
    useCdn: !preview,
    perspective: preview ? "drafts" : "published",
    stega: preview,
  });

  return client.fetch<T>(query, params, {
    next: {
      revalidate,
      tags,
    },
  });
}

export async function maybeSanityFetch<T>(options: SanityFetchOptions): Promise<T | null> {
  if (!isSanityConfigured) {
    return null;
  }

  try {
    return await sanityFetch<T>(options);
  } catch (error) {
    console.warn("Sanity fetch failed, falling back to local content.", error);
    return null;
  }
}
