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
        de: "Die Workshops verbinden Praxis, Austausch und Zugang zur Szene - von Fotografie und DJ-Kultur bis zu Publishing und kollaborativen Formaten.",
        en: "The workshops connect practice, exchange, and access to the scene - from photography and DJ culture to publishing and collaborative formats.",
      }}
      note={{
        de: "Sie richten sich an Menschen, die lernen, ausprobieren und eigene Vorhaben im kulturellen Kontext weiterentwickeln möchten.",
        en: "They are aimed at people who want to learn, experiment, and develop their own projects within a cultural context.",
      }}
    />
  );
}
