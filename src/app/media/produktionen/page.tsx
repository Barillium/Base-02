import { SimplePage } from "@/components/SimplePage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Bisherige Medienproduktionen im BOA Bunker of Art",
  description:
    "Bisherige Medienproduktionen im BOA Bunker of Art: Video, Foto, Sessions, Mitschnitte und Referenzen von The Base e.V.",
  path: "/media/produktionen",
});

export default function MediaProductionsPage() {
  return (
    <SimplePage
      eyebrow="Portfolio"
      title={{
        de: "Bisherige Produktionen",
        en: "Past productions",
      }}
      description={{
        de: "Diese Übersicht zeigt ausgewählte Medienproduktionen, Sessions, Mitschnitte und dokumentarische Formate aus dem BOA Bunker of Art.",
        en: "This overview shows selected media productions, sessions, recordings, and documentary formats from the BOA Bunker of Art.",
      }}
      note={{
        de: "Sie dient als Portfolio für neue Anfragen und macht sichtbar, welche Bildräume, Setups und Atmosphären im Bunker möglich sind.",
        en: "It serves as a portfolio for new enquiries and shows which visual spaces, setups, and atmospheres are possible in the bunker.",
      }}
    />
  );
}
