import { SimplePage } from "@/components/SimplePage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Workshops in Aachen für Kunst, Musik und DJ-Kultur",
  description:
    "Workshops von The Base e.V. in Aachen zu Kunst, Musik, Vermittlung und kollektiver Praxis.",
  path: "/live/workshops",
});

export default function WorkshopsPage() {
  return (
    <SimplePage
      eyebrow="Live"
      title={{ de: "Workshops", en: "Workshops" }}
      introClassName="layout-live-intro"
      description={{
        de: "Die Workshops ergänzen das sichtbare Programm um Praxis, Austausch und offene Zugänge zwischen Kunst, Musik und kollektiver Arbeit.",
        en: "The workshops expand the visible programme through practice, exchange, and open access between art, music, and collective work.",
      }}
      note={{
        de: "Sie richten sich an Menschen, die lernen, ausprobieren und eigene Ideen im kulturellen Zusammenhang weiterentwickeln möchten.",
        en: "They are aimed at people who want to learn, experiment, and develop their own projects within a cultural context.",
      }}
    />
  );
}
