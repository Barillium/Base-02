import { Card } from "@/components/Card";
import { PageIntro } from "@/components/PageIntro";
import { SectionGrid } from "@/components/SectionGrid";
import { getLocale, Locale, text } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Media: BOA als Medienproduktionsstandort buchen",
  description:
    "BOA Bunker of Art als Medienproduktionsstandort in Aachen buchen: Foto, Video, Livestream, Sessions und Referenzen von The Base.",
  path: "/media",
});

type Entry = {
  title: string;
  href: string;
  description: string;
  meta: string;
};

function getProductionEntries(locale: Locale): Entry[] {
  return [
    {
      title: text(locale, { de: "Medienproduktion buchen", en: "Book media production" }),
      href: "/media/buchung",
      description: text(locale, {
        de: "Informationen für Teams, die im Bunker of Art Foto, Video, Interviews, Live-Sessions oder Streaming-Formate produzieren wollen.",
        en: "Information for teams planning photo, video, interviews, live sessions, or streaming formats at the Bunker of Art.",
      }),
      meta: text(locale, { de: "Booking", en: "Booking" }),
    },
    {
      title: text(locale, { de: "Bisherige Produktionen", en: "Past productions" }),
      href: "/media/produktionen",
      description: text(locale, {
        de: "Referenzen aus bisherigen Drehs, Mitschnitten und Medienarbeiten, die Atmosphäre und Produktionsmöglichkeiten des BOA zeigen.",
        en: "References from previous shoots, recordings, and media works showing the atmosphere and production potential of BOA.",
      }),
      meta: text(locale, { de: "Portfolio", en: "Portfolio" }),
    },
  ];
}

export default async function MediaPage() {
  const locale = await getLocale();
  const productionEntries = getProductionEntries(locale);

  return (
    <div className="editorial-fade page-flow">
      <PageIntro
        eyebrow="Media"
        title={text(locale, { de: "Medienproduktion im Bunker of Art", en: "Media production at the Bunker of Art" })}
        description={text(locale, {
          de: "Media richtet sich an Produktionsfirmen, Künstler:innen, Labels und Kollektive, die den BOA Bunker of Art als markanten Ort für Bild, Sound und Live-Dokumentation nutzen möchten.",
          en: "Media is for production companies, artists, labels, and collectives that want to use the BOA Bunker of Art as a distinctive site for image, sound, and live documentation.",
        })}
        note={text(locale, {
          de: "Die Seite trennt klar zwischen Buchungsinformationen und Referenzen, damit Anfragen schnell einschätzen können, ob Raum, Ästhetik und Infrastruktur passen.",
          en: "The page separates booking information and references so enquiries can quickly judge whether space, aesthetics, and infrastructure fit.",
        })}
      />

      <SectionGrid
        eyebrow="Production"
        title={text(locale, { de: "Raum, Klang und Bild", en: "Space, sound, and image" })}
        description={text(locale, {
          de: "Zwei Wege: Standort anfragen oder bisherige Produktionen ansehen.",
          en: "Two paths: request the location or view previous productions.",
        })}
      >
        {productionEntries.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>
    </div>
  );
}
