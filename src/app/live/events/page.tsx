import { SimplePage } from "@/components/SimplePage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Eventarchiv in Aachen: Konzerte, Ausstellungen und Shows",
  description:
    "Das Eventarchiv von The Base e.V. in Aachen sammelt vergangene Konzerte, Ausstellungen, Release-Shows und weitere Veranstaltungen im BOA Bunker of Art.",
  path: "/live/events",
});

export default function EventsPage() {
  return (
    <SimplePage
      eyebrow="Live"
      title={{ de: "Vergangene Events", en: "Past events" }}
      description={{
        de: "Das Eventarchiv dokumentiert Konzerte, Ausstellungen, Release-Shows und weitere öffentliche Formate von The Base in Aachen.",
        en: "The event archive documents concerts, exhibitions, release shows, and other public formats by The Base in Aachen.",
      }}
      note={{
        de: "Die Übersicht dient als kuratierte Rückschau für Publikum, Presse, Künstler:innen und Kooperationen.",
        en: "The overview serves as a curated retrospective for audiences, press, artists, and collaborators.",
      }}
    />
  );
}
