import type { Metadata } from "next";
import { metadata as studioMetadata } from "next-sanity/studio";
export { viewport } from "next-sanity/studio";

import { EmbeddedStudio } from "@/components/studio/EmbeddedStudio";
import { isSanityConfigured } from "@/sanity/lib/env";

export const metadata: Metadata = {
  ...studioMetadata,
  title: "The Base Studio",
};

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="min-h-screen bg-[var(--paper)] px-6 py-10 text-[var(--ink)]">
        <div className="mx-auto grid max-w-3xl gap-5">
          <p className="type-meta text-[var(--muted)]">Sanity Studio</p>
          <h1 className="type-display-section max-w-[12ch]">Sanity ist noch nicht konfiguriert</h1>
          <p className="type-body-lg max-w-2xl">
            Um das eingebettete Studio zu nutzen, setze zuerst die Sanity-Umgebungsvariablen in deiner lokalen
            Umgebung, vor allem `NEXT_PUBLIC_SANITY_PROJECT_ID` und `NEXT_PUBLIC_SANITY_DATASET`.
          </p>
          <p className="type-body max-w-2xl text-[var(--muted)]">
            Die technische Integration steht bereits. Sobald die Variablen gesetzt sind, ist das Studio unter
            `/studio` direkt nutzbar.
          </p>
        </div>
      </main>
    );
  }

  return <EmbeddedStudio />;
}
