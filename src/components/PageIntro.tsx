type PageIntroProps = {
  title: string;
  description: string;
  eyebrow?: string;
  note?: string;
};

export function PageIntro({ title, description, eyebrow, note }: PageIntroProps) {
  return (
    <header className="editorial-fade grid gap-5 pb-6 md:gap-7 md:pb-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(20rem,0.9fr)]">
      <div className="space-y-3">
        {eyebrow ? (
          <p className="type-meta text-[var(--muted)]">{eyebrow}</p>
        ) : null}
        <h1 className="type-display-hero max-w-[15ch] text-[var(--ink)] md:max-w-[18ch] xl:max-w-[22ch]">
          {title}
        </h1>
      </div>
      <div className="space-y-4 pt-1">
        <p className="type-body-lg max-w-3xl text-[var(--ink)]">{description}</p>
        {note ? <p className="type-body max-w-3xl text-[var(--muted)]">{note}</p> : null}
      </div>
    </header>
  );
}
