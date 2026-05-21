import { SimplePage } from "@/components/SimplePage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "DJs, Live-Acts und Sound-Formate in Aachen",
  description:
    "DJs und Live-Acts bei The Base e.V. Aachen: elektronische Sets, Sound-Formate und Kollektive aus dem BOA-Netzwerk.",
  path: "/people/djs",
});

export default function DJsPage() {
  return (
    <SimplePage
      eyebrow="Talents"
      title="DJs"
      description={{
        de: "Diese Seite sammelt DJs, Live-Acts und Kollektive, die elektronische, jazzige oder experimentelle Sound-Formate bei The Base prägen.",
        en: "This page collects DJs, live acts, and collectives shaping electronic, jazz, or experimental sound formats at The Base.",
      }}
      note={{
        de: "Sie dient als Einstieg in Sets, musikalische Handschriften und Netzwerke rund um Aachen und den Bunker of Art.",
        en: "It is an entry point into sets, musical signatures, and networks around Aachen and the Bunker of Art.",
      }}
    />
  );
}
