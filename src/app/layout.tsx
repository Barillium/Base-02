import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SiteJsonLd } from "@/components/SiteJsonLd";
import { getLocale } from "@/lib/i18n";
import { defaultSeoDescription, siteName, siteUrl } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: "The Base e.V. | Kulturzentrum in Aachen",
    template: "%s | The Base e.V.",
  },
  description: defaultSeoDescription,
  openGraph: {
    title: "The Base e.V. | Kulturzentrum in Aachen",
    description: defaultSeoDescription,
    url: siteUrl,
    siteName,
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "/the-base-logo.png",
        alt: "The Base e.V. Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "The Base e.V. | Kulturzentrum in Aachen",
    description: defaultSeoDescription,
    images: ["/the-base-logo.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className="min-h-screen antialiased">
        <SiteJsonLd />
        <Header />
        <div className="site-shell">
          <main className="flex-1 pb-10 pt-5 md:pt-7">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
