import { SimplePage } from "@/components/SimplePage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Poster-Archiv für Events und Ausstellungen",
  description:
    "Poster-Archiv von The Base e.V. mit Plakaten, Typografie und visuellen Kampagnen zu Events und Ausstellungen in Aachen.",
  path: "/archive/poster",
});

export default function PosterPage() {
  return (
    <SimplePage
      eyebrow="Archive"
      title={{ de: "Poster", en: "Posters" }}
      description={{
        de: "Das Poster-Archiv zeigt, wie Veranstaltungen, Ausstellungen und Konzertformate der Base grafisch angekündigt und erinnert wurden.",
        en: "The poster archive shows how The Base events, exhibitions, and concert formats were announced and remembered visually.",
      }}
      note={{
        de: "Es bündelt Plakatserien, typografische Entscheidungen und visuelle Kampagnen als eigenständige Ebene des Kulturarchivs.",
        en: "It brings together poster series, typographic decisions, and visual campaigns as a distinct layer of the cultural archive.",
      }}
    />
  );
}
