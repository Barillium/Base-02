import { SimplePage } from "@/components/SimplePage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Code of Conduct und Awareness bei The Base e.V.",
  description:
    "Code of Conduct von The Base e.V. Aachen: Awareness, diskriminierungssensible Kulturarbeit und respektvolles Miteinander im BOA.",
  path: "/about/code-of-conduct",
});

export default function CodeOfConductPage() {
  return (
    <SimplePage
      eyebrow="Awareness"
      title={{
        de: "Code of Conduct",
        en: "Code of conduct",
      }}
      description={{
        de: "Der Code of Conduct beschreibt, wie The Base Veranstaltungen, Workshops und Produktionen diskriminierungssensibel, respektvoll und zugänglich gestalten will.",
        en: "The code of conduct describes how The Base wants to shape events, workshops, and productions in a discrimination-sensitive, respectful, and accessible way.",
      }}
      note={{
        de: "Awareness ist keine Zusatzleistung, sondern Teil der Infrastruktur: Sie betrifft Einlass, Kommunikation, Team, Publikum und die Nutzung des Raums.",
        en: "Awareness is not an add-on but part of the infrastructure: it concerns entry, communication, team, audience, and use of the space.",
      }}
    />
  );
}
