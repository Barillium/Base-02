import imageUrlBuilder from "@sanity/image-url";

import { getSanityClient, sanityClient } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/lib/env";

const builder = sanityClient ? imageUrlBuilder(getSanityClient()) : null;

export function urlForImage(source: unknown) {
  if (!isSanityConfigured || !builder || !source) {
    return null;
  }

  return builder.image(source);
}
