import { SimplePage } from "@/components/SimplePage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Aktuelle Ausstellung im BOA Bunker of Art Aachen",
  description:
    "Aktuelle Ausstellung von The Base e.V. in Aachen mit Termin, Kontext und Beteiligten im BOA Bunker of Art.",
  path: "/live/aktuelle-ausstellung",
});

export default function AktuelleAusstellungPage() {
  return (
    <SimplePage
      eyebrow="Live"
      title={{
        de: "Aktuelle Ausstellung",
        en: "Current exhibition",
      }}
      description={{
        de: "Hier stehen die laufende oder nächste Ausstellung, die beteiligten Positionen und der räumliche Kontext im BOA Bunker of Art im Mittelpunkt.",
        en: "This page focuses on the current or next exhibition, the participating positions, and the spatial context at the BOA Bunker of Art.",
      }}
      note={{
        de: "Sobald neue Programmpunkte feststehen, werden sie hier zuerst gebündelt, bevor sie ins Archiv übergehen.",
        en: "As soon as new programme items are confirmed, they appear here before moving into the archive.",
      }}
    />
  );
}
