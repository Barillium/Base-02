type SectionGridProps = {
  title: string;
  description: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

export function SectionGrid({
  title,
  description,
  eyebrow,
  children,
  className,
  contentClassName,
}: SectionGridProps) {
  return (
    <section
      className={`content-grid pt-4 md:pt-5 ${className ?? ""}`}
    >
      <div className="content-stack-tight lg:pr-5 xl:pr-7">
        {eyebrow ? (
          <p className="type-meta text-[var(--muted)]">{eyebrow}</p>
        ) : null}
        <h2 className="type-display-section max-w-[16ch] text-[var(--ink)] md:max-w-[16ch] lg:max-w-[13ch] xl:max-w-[14ch]">
          {title}
        </h2>
        <p className="type-body max-w-lg text-[var(--muted)]">{description}</p>
      </div>
      <div className={`min-w-0 lg:pt-1 ${contentClassName ?? ""}`}>{children}</div>
    </section>
  );
}
