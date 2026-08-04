import { createImageUrlBuilder } from "@sanity/image-url";

import { getSanityClient, sanityClient } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/lib/env";

const builder = sanityClient ? createImageUrlBuilder(getSanityClient()) : null;

export function urlForImage(source: unknown) {
  if (!isSanityConfigured || !builder || !source) {
    return null;
  }

  return builder.image(source);
}
