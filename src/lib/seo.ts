import type { Metadata } from "next";

export const siteName = "The Base e.V.";
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://thebase-ev.de").replace(/\/$/, "");
export const siteLocale = "de_DE";
export const siteLanguages = ["de", "en"] as const;
export const defaultSeoDescription =
  "The Base e.V. ist ein Kulturzentrum im BOA Bunker of Art in Aachen mit Ausstellungen, Konzerten, Workshops, Archiv und Community-Formaten.";
export const organizationJsonLdId = `${siteUrl}/#organization`;
export const websiteJsonLdId = `${siteUrl}/#website`;

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

type PageJsonLdInput = {
  title: string;
  description: string;
  path: string;
  pageType?: "AboutPage" | "CollectionPage" | "WebPage";
};

export function absoluteUrl(path: string) {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export const defaultOgImage = {
  url: absoluteUrl("/the-base-logo.png"),
  alt: `${siteName} Logo`,
};

export const socialProfiles = [
  "https://www.instagram.com/the.base.ev/",
  "https://www.facebook.com/thebase.ev/",
];

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
      locale: siteLocale,
      type: "website",
      images: [defaultOgImage],
    },
    robots: noIndex
      ? {
          index: false,
          follow: true,
          googleBot: {
            index: false,
            follow: true,
          },
        }
      : {
          index: true,
          follow: true,
          "max-snippet": -1,
          "max-image-preview": "large",
          "max-video-preview": -1,
          googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
          },
        },
    twitter: {
      card: "summary",
      title: fullTitle,
      description,
      images: [defaultOgImage],
    },
  };
}

export function pageJsonLd({ title, description, path, pageType = "WebPage" }: PageJsonLdInput) {
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": pageType,
    "@id": `${url}#webpage`,
    name: title,
    headline: title,
    description,
    url,
    inLanguage: siteLanguages,
    isPartOf: {
      "@id": websiteJsonLdId,
    },
    about: {
      "@id": organizationJsonLdId,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: defaultOgImage.url,
    },
  };
}
