import { SimplePage } from "@/components/SimplePage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Zines, Sonderobjekte und experimentelle Editionen",
  description:
    "Zines, Sonderobjekte und experimentelle Editionen von The Base e.V. aus Kunst, Musik, Archiv und Vereinsarbeit.",
  path: "/shop/diverses",
});

export default function DiversesPage() {
  return (
    <SimplePage
      eyebrow="Shop"
      title={{ de: "Diverses", en: "Misc" }}
      description={{
        de: "Zines, Kleinobjekte und experimentelle Editionen, die aus Workshops, Archivarbeit oder spontanen Kollaborationen entstehen.",
        en: "Zines, small objects, and experimental editions that emerge from workshops, archive work, or spontaneous collaborations.",
      }}
      note={{
        de: "Hier landen Formate, die bewusst zwischen Kunstedition, Dokument, Objekt und Community-Material stehen.",
        en: "This section holds formats that sit between art edition, document, object, and community material.",
      }}
    />
  );
}
