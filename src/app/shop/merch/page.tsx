import { SimplePage } from "@/components/SimplePage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Merch und Objekte aus der The Base Community",
  description:
    "Merch, Textilien und Community-Objekte von The Base e.V. aus Kollaborationen, Ausstellungen und Events in Aachen.",
  path: "/shop/merch",
});

export default function MerchPage() {
  return (
    <SimplePage
      eyebrow="Shop"
      title="Merch"
      description={{
        de: "Textilien, tragbare Objekte und kleine Serien aus Kollaborationen mit Künstler:innen, DJs und Teams der Base.",
        en: "Textiles, wearable objects, and small series from collaborations with artists, DJs, and The Base teams.",
      }}
      note={{
        de: "Im Mittelpunkt stehen Kleinauflagen mit Bezug zu konkreten Projekten, nicht austauschbare Standardware.",
        en: "The focus is on small editions connected to specific projects, not interchangeable standard merchandise.",
      }}
    />
  );
}
