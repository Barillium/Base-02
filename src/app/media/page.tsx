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
        de: "Informationen für Teams, die im Bunker of Art Foto, Video, Interviews, Live-Sessions, Streaming oder Veranstaltungsdokumentation produzieren wollen.",
        en: "Information for teams planning photo, video, interviews, live sessions, streaming, or event documentation at the Bunker of Art.",
      }),
      meta: text(locale, { de: "Booking", en: "Booking" }),
    },
    {
      title: text(locale, { de: "Bisherige Produktionen", en: "Past productions" }),
      href: "/media/produktionen",
      description: text(locale, {
        de: "Referenzen aus bisherigen Drehs, Reels, Posterproduktionen, Fotografien und Mitschnitten, die Atmosphäre und Produktionsmöglichkeiten des BOA zeigen.",
        en: "References from previous shoots, reels, poster productions, photography, and recordings showing the atmosphere and production potential of BOA.",
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
        titleLines={[
          text(locale, { de: "Medien-", en: "Media" }),
          text(locale, { de: "produktion", en: "production" }),
          text(locale, { de: "im Bunker", en: "at the Bunker" }),
          text(locale, { de: "of Art", en: "of Art" }),
        ]}
        description={text(locale, {
          de: "Klang, Raum, Zusammenarbeit und Produktion: Media buendelt die Arbeiten, die im BOA zwischen Fotografie, Grafik, Mitschnitt und Bewegtbild entstehen.",
          en: "Sound, space, collaboration, and production: Media gathers the works that emerge at the BOA between photography, graphics, recordings, and moving image.",
        })}
        note={text(locale, {
          de: "Im Profil wird diese Bandbreite bereits sichtbar: grafische Serien, fotografische Blicke, Reels zu Ausstellungen und knappe Spuren von Konzertabenden.",
          en: "This range is already visible in the profile: graphic series, photographic perspectives, reels for exhibitions, and brief traces of concert nights.",
        })}
        className="layout-media-intro"
        titleClassName="max-w-none text-[clamp(1.86rem,6.2vw,2.44rem)] md:max-w-[13.8ch] md:text-[clamp(2.18rem,5.3vw,2.76rem)] lg:max-w-[14.8ch] lg:text-[clamp(2.22rem,2.64vw,2.76rem)] xl:max-w-[15.4ch] xl:text-[clamp(2.46rem,2.88vw,2.96rem)]"
        rightClassName="lg:max-w-[45rem] lg:pt-4"
      />

      <SectionGrid
        eyebrow="Media"
        title={text(locale, { de: "Raum, Klang und Bild", en: "Space, sound, and image" })}
        titleLines={[
          text(locale, { de: "Raum, Klang", en: "Space, sound" }),
          text(locale, { de: "und Bild", en: "and image" }),
        ]}
        description={text(locale, {
          de: "Ein Einstieg in den Ort als Produktionszusammenhang und in die Arbeiten, die dort bereits sichtbar geworden sind.",
          en: "An entry point into the space as a site of production and into the works that have already become visible there.",
        })}
        className="layout-media-section"
        titleClassName="lg:max-w-[9.3ch] xl:max-w-[9.8ch]"
        contentClassName="lg:pt-3"
      >
        {productionEntries.map((entry) => (
          <Card key={entry.href} locale={locale} {...entry} />
        ))}
      </SectionGrid>
    </div>
  );
}
