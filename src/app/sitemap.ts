import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";

const routes = [
  "",
  "/live",
  "/archive",
  "/media",
  "/about",
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
