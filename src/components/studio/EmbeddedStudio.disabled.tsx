export function EmbeddedStudio() {
  return (
    <main className="min-h-screen bg-[var(--paper)] px-6 py-10 text-[var(--ink)]">
      <div className="mx-auto grid max-w-3xl gap-5">
        <p className="type-meta text-[var(--muted)]">Sanity Studio</p>
        <h1 className="type-display-section max-w-[12ch]">Studio ist in diesem Deploy deaktiviert</h1>
        <p className="type-body-lg max-w-2xl">
          Die öffentliche Website bleibt dadurch deutlich leichter. Das eingebettete Studio steht weiterhin lokal zur
          Verfügung.
        </p>
      </div>
    </main>
  );
}
