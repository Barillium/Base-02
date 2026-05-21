import { SimplePage } from "@/components/SimplePage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Kunstkatalog von The Base e.V. Aachen",
  description:
    "Kunstkatalog von The Base e.V. Aachen mit Arbeiten, Künstler:innenprofilen, Ausstellungstexten und Projektdokumentation.",
  path: "/archive/kunstkatalog",
});

export default function KunstkatalogPage() {
  return (
    <SimplePage
      eyebrow="Archive"
      title={{ de: "Kunstkatalog", en: "Art catalogue" }}
      description={{
        de: "Der Kunstkatalog ordnet künstlerische Arbeiten, Texte, Credits und Projektmaterialien aus Ausstellungen im BOA Bunker of Art.",
        en: "The art catalogue organises works, texts, credits, and project material from exhibitions at the BOA Bunker of Art.",
      }}
      note={{
        de: "Er ist als langfristige Recherchefläche gedacht: für Besucher:innen, Künstler:innen, Kurator:innen und die Aachener Kunstszene.",
        en: "It is designed as a long-term research surface for visitors, artists, curators, and the Aachen art scene.",
      }}
    />
  );
}
