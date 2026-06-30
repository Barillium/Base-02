import { Eyebrow } from "@/components/Eyebrow";
import type { SanityTextLayout } from "@/sanity/lib/content";

type PageIntroProps = {
  title: string;
  titleLines?: string[];
  description: string;
  eyebrow?: string;
  note?: string;
  layout?: SanityTextLayout | null;
  className?: string;
  leftClassName?: string;
  rightClassName?: string;
  titleClassName?: string;
};

export function PageIntro({
  title,
  titleLines,
  description,
  eyebrow,
  note,
  layout,
  className,
  leftClassName,
  rightClassName,
  titleClassName,
}: PageIntroProps) {
  const resolvedTitle = titleLines?.length ? titleLines : null;
  const isCenteredBlock = layout?.position === "centered";
  const alignmentClass =
    layout?.alignment === "center"
      ? "text-center"
      : layout?.alignment === "right"
        ? "text-right"
        : "text-left";

  return (
    <header
      className={`editorial-fade content-grid pb-6 md:pb-8 ${isCenteredBlock ? "intro-layout-centered" : ""} ${className ?? ""}`}
    >
      <div className={`content-stack-tight min-w-0 ${alignmentClass} ${isCenteredBlock ? "mx-auto" : ""} ${leftClassName ?? ""}`}>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h1
          aria-label={resolvedTitle ? title : undefined}
          className={`type-display-hero max-w-[11.4ch] text-[var(--ink)] md:max-w-[12.4ch] lg:max-w-[10.2ch] xl:max-w-[11ch] ${titleClassName ?? ""}`}
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
      <div className={`content-stack min-w-0 pt-1 lg:max-w-[45rem] lg:pt-4 xl:max-w-[48rem] ${alignmentClass} ${isCenteredBlock ? "mx-auto" : "layout-copy-start"} ${rightClassName ?? ""}`}>
        <p className="type-body-lg max-w-3xl text-[var(--ink)]">{description}</p>
        {note ? <p className="type-body max-w-3xl text-[var(--muted)]">{note}</p> : null}
      </div>
    </header>
  );
}
