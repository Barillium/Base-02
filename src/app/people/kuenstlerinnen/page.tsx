import { SimplePage } from "@/components/SimplePage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Künstler:innen bei The Base e.V. Aachen",
  description:
    "Künstler:innen bei The Base e.V. Aachen: Profile, Positionen und Beiträge aus Ausstellung, Installation und Performance.",
  path: "/people/kuenstlerinnen",
});

export default function KuenstlerinnenPage() {
  return (
    <SimplePage
      eyebrow="Talents"
      title={{ de: "Künstler:innen", en: "Artists" }}
      description={{
        de: "Diese Übersicht macht Künstler:innen sichtbar, die mit Ausstellungen, Installationen, Performances oder interdisziplinären Projekten bei The Base präsent sind.",
        en: "This overview makes visible artists who appear at The Base through exhibitions, installations, performances, or interdisciplinary projects.",
      }}
      note={{
        de: "Der Fokus liegt auf regionalen und internationalen Positionen, die den Bunker als Raum, Kontext oder soziale Situation ernst nehmen.",
        en: "The focus is on regional and international positions that take the bunker seriously as space, context, or social situation.",
      }}
    />
  );
}
