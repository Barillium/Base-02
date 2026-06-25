import type { Metadata } from "next";
import localFont from "next/font/local";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SiteJsonLd } from "@/components/SiteJsonLd";
import { getLocale, text } from "@/lib/i18n";
import { defaultOgImage, defaultSeoDescription, siteLocale, siteName, siteUrl } from "@/lib/seo";
import "./globals.css";

const bahnschrift = localFont({
  src: [{ path: "./fonts/Bahnschrift.ttf", weight: "400", style: "normal" }],
  variable: "--font-bahnschrift",
  display: "swap",
  fallback: ["Segoe UI", "Helvetica", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

const gobold = localFont({
  src: [
    { path: "./fonts/Gobold-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/Gobold-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-gobold",
  display: "swap",
  fallback: ["Arial Narrow", "Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  creator: siteName,
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
    locale: siteLocale,
    type: "website",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary",
    title: "The Base e.V. | Kulturzentrum in Aachen",
    description: defaultSeoDescription,
    images: [defaultOgImage],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={`${bahnschrift.variable} ${gobold.variable}`}>
      <body className={`${bahnschrift.className} min-h-screen antialiased`}>
        <a href="#main-content" className="skip-link">
          {text(locale, {
            de: "Zum Inhalt springen",
            en: "Skip to content",
          })}
        </a>
        <SiteJsonLd />
        <Header />
        <div className="site-shell">
          <main id="main-content" tabIndex={-1} className="pb-10 pt-5 md:pt-7">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
