import { SimplePage } from "@/components/SimplePage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Workshops in Aachen für Kunst, Musik und DJ-Kultur",
  description:
    "Workshops von The Base e.V. in Aachen zu Kunst, Musik, DJ-Kultur, Fotografie, Publishing und kollektiver Praxis.",
  path: "/live/workshops",
});

export default function WorkshopsPage() {
  return (
    <SimplePage
      eyebrow="Live"
      title={{ de: "Workshops", en: "Workshops" }}
      description={{
        de: "Die Workshops ergänzen das sichtbare Programm um Praxis, Austausch und niedrigschwellige Zugänge zwischen Kunst, Sound und kollektiver Arbeit.",
        en: "The workshops connect practice, exchange, and access to the scene - from photography and DJ culture to publishing and collaborative formats.",
      }}
      note={{
        de: "Nicht jede Workshop-Reihe ist im Profil gleich stark dokumentiert, gehört aber als offene Praxisschiene klar zum Selbstverständnis der Base.",
        en: "They are aimed at people who want to learn, experiment, and develop their own projects within a cultural context.",
      }}
    />
  );
}
