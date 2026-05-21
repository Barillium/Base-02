import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";

const routes = [
  "",
  "/live",
  "/live/aktuelle-ausstellung",
  "/live/events",
  "/live/workshops",
  "/archive",
  "/archive/kunstkatalog",
  "/archive/poster",
  "/label",
  "/label/releases",
  "/people",
  "/people/kuenstlerinnen",
  "/people/djs",
  "/media",
  "/media/buchung",
  "/media/produktionen",
  "/shop",
  "/shop/prints",
  "/shop/merch",
  "/shop/vinyl",
  "/shop/diverses",
  "/about",
  "/about/the-base",
  "/about/code-of-conduct",
  "/about/kontakt",
  "/mitmachen",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: absoluteUrl(route || "/"),
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.split("/").length === 2 ? 0.8 : 0.65,
  }));
}
