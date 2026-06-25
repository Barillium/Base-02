import { Eyebrow } from "@/components/Eyebrow";

type SectionGridProps = {
  title: string;
  titleLines?: string[];
  description: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function SectionGrid({
  title,
  titleLines,
  description,
  eyebrow,
  children,
  className,
  contentClassName,
  titleClassName,
  descriptionClassName,
}: SectionGridProps) {
  const resolvedTitle = titleLines?.length ? titleLines : null;

  return (
    <section
      className={`content-grid pt-4 md:pt-5 ${className ?? ""}`}
    >
      <div className="content-stack-tight min-w-0 lg:pr-4 xl:pr-6">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h2
          aria-label={resolvedTitle ? title : undefined}
          className={`type-display-section max-w-[16.4ch] text-[var(--ink)] md:max-w-[16.6ch] lg:max-w-[14ch] xl:max-w-[15ch] ${titleClassName ?? ""}`}
        >
          {resolvedTitle
            ? resolvedTitle.map((line) => (
                <span key={line} className="block whitespace-nowrap">
                  {line}
                </span>
              ))
            : title}
        </h2>
        <p className={`type-body max-w-lg text-[var(--muted)] ${descriptionClassName ?? ""}`}>{description}</p>
      </div>
      <div className={`min-w-0 lg:pt-1 ${contentClassName ?? ""}`}>{children}</div>
    </section>
  );
}
