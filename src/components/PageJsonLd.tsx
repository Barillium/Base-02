import { pageJsonLd } from "@/lib/seo";

type PageJsonLdProps = {
  title: string;
  description: string;
  path: string;
  pageType?: "AboutPage" | "CollectionPage" | "WebPage";
};

export function PageJsonLd({ title, description, path, pageType }: PageJsonLdProps) {
  const jsonLd = pageJsonLd({ title, description, path, pageType });

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
