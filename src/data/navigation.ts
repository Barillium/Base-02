import type { Locale } from "@/lib/i18n";

export type NavigationChildItem = {
  title: string;
  href: string;
};

export type NavigationItem = {
  title: string;
  href: string;
  children: NavigationChildItem[];
};

const navigationByLocale: Record<Locale, NavigationItem[]> = {
  de: [
    {
      title: "Live",
      href: "/live",
      children: [
        { title: "Nächstes / aktuelles Event", href: "/live/aktuelle-ausstellung" },
        { title: "Vergangene Events", href: "/live/events" },
        { title: "Workshops", href: "/live/workshops" },
      ],
    },
    {
      title: "Archive",
      href: "/archive",
      children: [
        { title: "Kunstkatalog", href: "/archive/kunstkatalog" },
        { title: "Poster", href: "/archive/poster" },
      ],
    },
    {
      title: "Media",
      href: "/media",
      children: [
        { title: "Medienproduktion", href: "/media/buchung" },
        { title: "Produktionen", href: "/media/produktionen" },
      ],
    },
    {
      title: "About",
      href: "/about",
      children: [
        { title: "The Base", href: "/about/the-base" },
        { title: "Awareness", href: "/about/code-of-conduct" },
        { title: "Mitmachen", href: "/mitmachen" },
        { title: "Kontakt", href: "/about/kontakt" },
      ],
    },
  ],
  en: [
    {
      title: "Live",
      href: "/live",
      children: [
        { title: "Events", href: "/live/aktuelle-ausstellung" },
        { title: "Past events", href: "/live/events" },
        { title: "Workshops", href: "/live/workshops" },
      ],
    },
    {
      title: "Archive",
      href: "/archive",
      children: [
        { title: "Art catalogue", href: "/archive/kunstkatalog" },
        { title: "Posters", href: "/archive/poster" },
      ],
    },
    {
      title: "Media",
      href: "/media",
      children: [
        { title: "Media production", href: "/media/buchung" },
        { title: "Productions", href: "/media/produktionen" },
      ],
    },
    {
      title: "About",
      href: "/about",
      children: [
        { title: "The Base", href: "/about/the-base" },
        { title: "Awareness", href: "/about/code-of-conduct" },
        { title: "Get involved", href: "/mitmachen" },
        { title: "Contact", href: "/about/kontakt" },
      ],
    },
  ],
};

export function getNavigation(locale: Locale): NavigationItem[] {
  return navigationByLocale[locale];
}
