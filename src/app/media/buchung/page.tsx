import { MediaBookingForm } from "@/components/MediaBookingForm";
import { SimplePage } from "@/components/SimplePage";
import { getLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { splitDisplayTitle } from "@/sanity/lib/content";
import { maybeSanityFetch } from "@/sanity/lib/fetch";
import { STATIC_PAGE_QUERY } from "@/sanity/lib/queries";
import type { SanityStaticPage } from "@/sanity/types";

export const metadata = pageMetadata({
  title: "Anfragen für Medienproduktionen im BOA Bunker of Art",
  description:
    "Anfragen für Foto, Video, Mitschnitt und dokumentarische Produktionen im BOA Bunker of Art in Aachen.",
  path: "/media/buchung",
});

export default async function MediaBookingPage() {
  const locale = await getLocale();
  const page = await maybeSanityFetch<SanityStaticPage>({
    query: STATIC_PAGE_QUERY,
    params: { locale, routeKey: "media-buchung" },
    tags: ["staticPage", "media"],
    revalidate: 300,
  });

  return (
    <SimplePage
      eyebrow={page?.eyebrow ?? "Booking"}
      introClassName="layout-media-intro"
      title={page?.title ?? (locale === "de" ? "Anfragen für Produktionen" : "Production enquiries")}
      titleLines={splitDisplayTitle(page?.displayTitle) ?? (locale === "de" ? ["Anfragen", "für", "Produktionen"] : ["Production", "enquiries"])}
      description={
        page?.description ?? {
          de: "Diese Seite richtet sich an Teams, die Foto, Video, Mitschnitt oder dokumentarische Formate im Zusammenhang mit dem BOA Bunker of Art anfragen möchten.",
          en: "This page is for teams that want to enquire about photo, video, recording, or documentary formats connected to the BOA Bunker of Art.",
        }
      }
      note={
        page?.note ?? {
          de: "Hilfreich für die Abstimmung sind Format, Zeitraum, Partner, Förderungen, Technikbedarf und ein kurzer Hinweis darauf, wie der Bezug zum Ort oder Programm gedacht ist.",
          en: "Helpful for coordination are the format, timing, partners, funding, technical needs, and a short note on how the connection to the space or programme is intended.",
        }
      }
      introLayout={page?.introLayout}
      bodyBlocks={page?.body}
      bodyLayout={page?.bodyLayout}
    >
      <MediaBookingForm locale={locale} />
    </SimplePage>
  );
}
