import { SimplePage } from "@/components/SimplePage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "BOA Bunker of Art für Medienproduktion buchen",
  description:
    "BOA Bunker of Art in Aachen für Foto, Video, Livestream, Interviews und Sessions buchen: Infos zu Anfrage, Technik und Produktion.",
  path: "/media/buchung",
});

export default function MediaBookingPage() {
  return (
    <SimplePage
      eyebrow="Booking"
      title={{
        de: "BOA als Medienproduktionsstandort",
        en: "BOA as a media production location",
      }}
      description={{
        de: "Diese Seite richtet sich an Teams, die den BOA Bunker of Art in Aachen als Location für Foto- und Videoproduktion, Live-Session, Interview oder Stream anfragen möchten.",
        en: "This page is for teams that want to request the BOA Bunker of Art in Aachen as a location for photo and video production, live sessions, interviews, or streams.",
      }}
      note={{
        de: "Hilfreich für die Planung sind Format, Zeitraum, Teamgröße, Technikbedarf, Tonanforderungen und ein kurzer Hinweis zur gewünschten Bildsprache.",
        en: "Useful planning details include format, timing, team size, technical needs, sound requirements, and a short note on the intended visual language.",
      }}
    />
  );
}
