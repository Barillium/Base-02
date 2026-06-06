type PageIntroProps = {
  title: string;
  titleLines?: string[];
  description: string;
  eyebrow?: string;
  note?: string;
  className?: string;
  leftClassName?: string;
  rightClassName?: string;
  titleClassName?: string;
};

export function PageIntro({
  title,
  titleLines,
  description,
  eyebrow: _eyebrow,
  note,
  className,
  leftClassName,
  rightClassName,
  titleClassName,
}: PageIntroProps) {
  void _eyebrow;
  const resolvedTitle = titleLines?.length ? titleLines : null;

  return (
    <header
      className={`editorial-fade content-grid pb-6 md:pb-8 ${className ?? ""}`}
    >
      <div className={`content-stack-tight min-w-0 ${leftClassName ?? ""}`}>
        <h1
          aria-label={resolvedTitle ? title : undefined}
          className={`type-display-hero max-w-[11ch] text-[var(--ink)] md:max-w-[12ch] lg:max-w-[9.4ch] xl:max-w-[10.4ch] ${titleClassName ?? ""}`}
        >
          {resolvedTitle
            ? resolvedTitle.map((line) => (
                <span key={line} className="block whitespace-nowrap">
                  {line}
                </span>
              ))
            : title}
        </h1>
      </div>
      <div className={`content-stack min-w-0 pt-1 lg:max-w-[45rem] lg:pt-4 xl:max-w-[48rem] ${rightClassName ?? ""}`}>
        <p className="type-body-lg max-w-3xl text-[var(--ink)]">{description}</p>
        {note ? <p className="type-body max-w-3xl text-[var(--muted)]">{note}</p> : null}
      </div>
    </header>
  );
}
