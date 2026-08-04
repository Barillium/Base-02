import {
  defaultOgImage,
  defaultSeoDescription,
  organizationJsonLdId,
  siteLanguages,
  siteName,
  siteUrl,
  socialProfiles,
  websiteJsonLdId,
} from "@/lib/seo";

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationJsonLdId,
      name: siteName,
      url: siteUrl,
      logo: defaultOgImage.url,
      image: defaultOgImage.url,
      email: "info@thebase-ev.de",
      description: defaultSeoDescription,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Scheibenstraße 34",
        postalCode: "52070",
        addressLocality: "Aachen",
        addressCountry: "DE",
      },
      sameAs: socialProfiles,
    },
    {
      "@type": "WebSite",
      "@id": websiteJsonLdId,
      name: siteName,
      url: siteUrl,
      inLanguage: siteLanguages,
      publisher: {
        "@id": organizationJsonLdId,
      },
    },
  ],
};

export function SiteJsonLd() {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
