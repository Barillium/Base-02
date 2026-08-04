import { SimplePage } from "@/components/SimplePage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Prints, Poster und Publikationen von The Base",
  description:
    "Limitierte Prints, Poster und Publikationen von The Base e.V. aus Ausstellungen, Events und dem visuellen Archiv in Aachen.",
  path: "/shop/prints",
});

export default function PrintsPage() {
  return (
    <SimplePage
      eyebrow="Shop"
      title="Prints"
      description={{
        de: "Limitierte Drucke, Plakate und Publikationen aus Ausstellungen, Konzertreihen und grafischen Kampagnen von The Base in Aachen.",
        en: "Limited prints, posters, and publications from exhibitions, concert series, and visual campaigns by The Base in Aachen.",
      }}
      note={{
        de: "Die Prints funktionieren als sammelbare Editionen und als sichtbare Spur des Programms im BOA Bunker of Art.",
        en: "The prints work as collectible editions and visible traces of the programme at the BOA Bunker of Art.",
      }}
    />
  );
}
