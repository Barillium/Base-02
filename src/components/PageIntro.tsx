type PageIntroProps = {
  title: string;
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
  description,
  eyebrow,
  note,
  className,
  leftClassName,
  rightClassName,
  titleClassName,
}: PageIntroProps) {
  return (
    <header className={`editorial-fade content-grid pb-6 md:pb-8 ${className ?? ""}`}>
      <div className={`content-stack-tight ${leftClassName ?? ""}`}>
        {eyebrow ? (
          <p className="type-meta text-[var(--muted)]">{eyebrow}</p>
        ) : null}
        <h1 className={`type-display-hero max-w-[17ch] text-[var(--ink)] md:max-w-[18ch] xl:max-w-[22ch] ${titleClassName ?? ""}`}>
          {title}
        </h1>
      </div>
      <div className={`content-stack pt-0.5 lg:max-w-3xl ${rightClassName ?? ""}`}>
        <p className="type-body-lg max-w-3xl text-[var(--ink)]">{description}</p>
        {note ? <p className="type-body max-w-3xl text-[var(--muted)]">{note}</p> : null}
      </div>
    </header>
  );
}
