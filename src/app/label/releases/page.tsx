import { SimplePage } from "@/components/SimplePage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Releases und elektronische Musik von The Base",
  description:
    "Releases von The Base Records: elektronische Musik, Release-Shows und Sound-Dokumentation aus Aachen und dem BOA-Kontext.",
  path: "/label/releases",
});

export default function ReleasesPage() {
  return (
    <SimplePage
      eyebrow="Label"
      title={{ de: "Releases", en: "Releases" }}
      description={{
        de: "Diese Seite sammelt Veröffentlichungen von The Base Records: Tracks, EPs, Mitschnitte und Release-Kontexte aus der elektronischen Musikszene in Aachen.",
        en: "This page collects releases by The Base Records: tracks, EPs, recordings, and release contexts from Aachen's electronic music scene.",
      }}
      note={{
        de: "Jeder Release soll nachvollziehbar bleiben: mit Credits, Bezug zum Live-Programm und Verbindung zu den beteiligten Artists.",
        en: "Each release is meant to remain traceable: with credits, links to the live programme, and connections to the artists involved.",
      }}
    />
  );
}
