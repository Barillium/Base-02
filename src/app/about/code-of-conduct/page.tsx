import { SimplePage } from "@/components/SimplePage";
import { getLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { splitDisplayTitle } from "@/sanity/lib/content";
import { maybeSanityFetch } from "@/sanity/lib/fetch";
import { STATIC_PAGE_QUERY } from "@/sanity/lib/queries";
import type { SanityStaticPage } from "@/sanity/types";

export const metadata = pageMetadata({
  title: "Code of Conduct und Awareness bei The Base e.V.",
  description:
    "Code of Conduct von The Base e.V. Aachen: Awareness, diskriminierungssensible Kulturarbeit und respektvolles Miteinander im BOA.",
  path: "/about/code-of-conduct",
});

export default async function CodeOfConductPage() {
  const locale = await getLocale();
  const page = await maybeSanityFetch<SanityStaticPage>({
    query: STATIC_PAGE_QUERY,
    params: { locale, routeKey: "about-code-of-conduct" },
    tags: ["staticPage", "about"],
    revalidate: 300,
  });

  return (
    <SimplePage
      eyebrow={page?.eyebrow ?? "Awareness"}
      title={
        page?.title ?? {
          de: "Code of Conduct",
          en: "Code of conduct",
        }
      }
      titleLines={splitDisplayTitle(page?.displayTitle)}
      description={
        page?.description ?? {
          de: "Der Code of Conduct beschreibt, wie The Base Veranstaltungen, Workshops und Produktionen diskriminierungssensibel, respektvoll und zugänglich gestalten will.",
          en: "The code of conduct describes how The Base wants to shape events, workshops, and productions in a discrimination-sensitive, respectful, and accessible way.",
        }
      }
      note={
        page?.note ?? {
          de: "Awareness ist keine Zusatzleistung, sondern Teil der Infrastruktur: Sie betrifft Einlass, Kommunikation, Team, Publikum und die Nutzung des Raums.",
          en: "Awareness is not an add-on but part of the infrastructure: it concerns entry, communication, team, audience, and use of the space.",
        }
      }
      introLayout={page?.introLayout}
      bodyBlocks={page?.body}
      bodyLayout={page?.bodyLayout}
    />
  );
}
