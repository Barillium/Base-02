import { absoluteUrl, defaultSeoDescription, siteName, siteUrl } from "@/lib/seo";

const siteJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: siteName,
    url: siteUrl,
    logo: absoluteUrl("/the-base-logo.png"),
    email: "info@thebase-ev.de",
    description: defaultSeoDescription,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Scheibenstraße 34",
      postalCode: "52070",
      addressLocality: "Aachen",
      addressCountry: "DE",
    },
    sameAs: [
      "https://www.instagram.com/the.base.ev/",
      "https://www.facebook.com/thebase.ev/",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteName,
    url: siteUrl,
    inLanguage: ["de", "en"],
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
  },
];

export function SiteJsonLd() {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
    />
  );
}
