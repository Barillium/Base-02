import { SimplePage } from "@/components/SimplePage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Vinyl und physische Releases von The Base",
  description:
    "Vinyl, Pressungen und physische Releases aus dem Label-Umfeld von The Base Records und der elektronischen Szene Aachen.",
  path: "/shop/vinyl",
});

export default function VinylPage() {
  return (
    <SimplePage
      eyebrow="Shop"
      title="Vinyl"
      description={{
        de: "Physische Tonträger aus dem Umfeld von The Base Records, verbunden mit Release-Shows, Clubnächten und Soundexperimenten.",
        en: "Physical records from The Base Records, connected to release shows, club nights, and sound experiments.",
      }}
      note={{
        de: "Diese Seite bündelt Pressungen und Sondereditionen, die Musik aus dem BOA-Kontext dauerhaft greifbar machen.",
        en: "This page brings together pressings and special editions that make music from the BOA context tangible.",
      }}
    />
  );
}
