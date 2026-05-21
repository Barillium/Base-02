import type { Metadata } from "next";

export const siteName = "The Base e.V.";
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://thebase-ev.de").replace(/\/$/, "");
export const defaultSeoDescription =
  "The Base e.V. ist ein Kulturzentrum im BOA Bunker of Art in Aachen mit Ausstellungen, Konzerten, Workshops, Label, Archiv und Community-Formaten.";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

export function absoluteUrl(path: string) {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageMetadata({ title, description, path, noIndex = false }: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return {
    title: {
      absolute: fullTitle,
    },
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      locale: "de_DE",
      type: "website",
      images: [
        {
          url: absoluteUrl("/the-base-logo.png"),
          alt: `${siteName} Logo`,
        },
      ],
    },
    robots: noIndex
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,
        },
    twitter: {
      card: "summary",
      title: fullTitle,
      description,
      images: [absoluteUrl("/the-base-logo.png")],
    },
  };
}
