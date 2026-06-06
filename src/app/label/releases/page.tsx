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
      title={{ de: "Veröffentlichungen", en: "Releases" }}
      description={{
        de: "Hier versammeln sich Tracks, EPs, Pressungen, Videos und die Kontexte, in denen sie im Umfeld der Base hoerbar und sichtbar werden.",
        en: "Tracks, EPs, pressings, videos, and the contexts in which they become audible and visible around The Base gather here.",
      }}
      note={{
        de: "Im Profil erscheint diese Arbeit nie isoliert, sondern verbunden mit Premieren, Auffuehrungen und audiovisuellen Spuren.",
        en: "This work never appears in isolation on the profile, but alongside premieres, performances, and audiovisual traces.",
      }}
    />
  );
}
