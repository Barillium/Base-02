type SectionGridProps = {
  title: string;
  description: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
};

export function SectionGrid({ title, description, eyebrow, children, className }: SectionGridProps) {
  return (
    <section
      className={`grid gap-5 pt-5 md:gap-6 md:pt-6 lg:grid-cols-[minmax(15rem,0.7fr)_minmax(0,1.8fr)] xl:grid-cols-[minmax(18rem,0.62fr)_minmax(0,1.95fr)] ${className ?? ""}`}
    >
      <div className="space-y-2">
        {eyebrow ? (
          <p className="type-meta text-[var(--muted)]">{eyebrow}</p>
        ) : null}
        <h2 className="type-display-section text-[var(--ink)]">
          {title}
        </h2>
        <p className="type-body max-w-xl text-[var(--muted)]">{description}</p>
      </div>
      <div>{children}</div>
    </section>
  );
}
