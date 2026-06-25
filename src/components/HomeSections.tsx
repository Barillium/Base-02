import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { Card } from "@/components/Card";
import { Eyebrow } from "@/components/Eyebrow";
import { PageIntro } from "@/components/PageIntro";
import { PortableTextContent } from "@/components/PortableTextContent";
import { SectionGrid } from "@/components/SectionGrid";
import { text, type Locale } from "@/lib/i18n";
import {
  resolveLinkFieldHref,
  resolveLinkedDocumentHref,
  splitDisplayTitle,
  type SanitySectionLayout,
} from "@/sanity/lib/content";
import { withInstagramFallbackForEventPreview } from "@/sanity/lib/eventInstagramFallbacks";
import { urlForImage } from "@/sanity/lib/image";
import type {
  SanityCtaBlock,
  SanityEventPreview,
  SanityFeatureListSection,
  SanityGalleryBlockSection,
  SanityHomeHeroSection,
  SanityHomeLinkedItem,
  SanityHomePage,
  SanityHomeQuickLinksSection,
  SanityHomeSection,
  SanityHomeSectionIntro,
  SanityHomeStatementSection,
  SanityHomeTextSection,
  SanityImageBlockSection,
  SanityImageFigure,
  SanityVideoBlockSection,
} from "@/sanity/types";

type HomeSectionsProps = {
  sections: SanityHomePage["sections"];
  locale: Locale;
  currentEvent?: SanityEventPreview | null;
};

const HOME_QUICK_CURRENT_FALLBACK = {
  title: {
    de: "The Roots of All That Exists",
    en: "The Roots of All That Exists",
  },
  href: "https://www.instagram.com/the.base.ev/p/DYcFhaxtS8G/",
} as const;

const HOME_STATEMENT_TITLE = {
  de: "Plattform zwischen Ausstellung, Programm und lokaler Szene",
  en: "Platform between exhibition, programme, and local scene",
} as const;

const HOME_STATEMENT_LINES = {
  de: ["Plattform", "zwischen", "Ausstellung,", "Programm und", "lokaler Szene"],
  en: ["Platform", "between", "exhibition,", "programme and", "local scene"],
} as const;

function getSpacingClass(value: SanitySectionLayout["spacingTop"] | SanitySectionLayout["spacingBottom"], edge: "pt" | "pb") {
  const map = {
    none: `${edge}-0`,
    small: `${edge}-4 md:${edge}-5`,
    medium: `${edge}-7 md:${edge}-9`,
    large: `${edge}-10 md:${edge}-14`,
    xlarge: `${edge}-14 md:${edge}-18`,
  } as const;

  return map[value ?? "medium"];
}

function getOuterSectionClass(layout?: SanitySectionLayout | null) {
  return `${getSpacingClass(layout?.spacingTop, "pt")} ${getSpacingClass(layout?.spacingBottom, "pb")}`;
}

function getSurfaceClass(theme?: SanitySectionLayout["theme"]) {
  if (theme === "ink") {
    return "ink-panel text-zinc-100";
  }

  if (theme === "muted") {
    return "bg-black/[0.045] text-[var(--ink)]";
  }

  return "bg-transparent text-[var(--ink)]";
}

const GRID_START_CLASS: Record<string, string> = {
  "1": "lg:col-start-1",
  "2": "lg:col-start-2",
  "3": "lg:col-start-3",
  "4": "lg:col-start-4",
  "5": "lg:col-start-5",
  "6": "lg:col-start-6",
  "7": "lg:col-start-7",
  "8": "lg:col-start-8",
};

const GRID_SPAN_CLASS: Record<string, string> = {
  "4": "lg:col-span-4",
  "5": "lg:col-span-5",
  "6": "lg:col-span-6",
  "8": "lg:col-span-8",
  "10": "lg:col-span-10",
  "12": "lg:col-span-12",
};

const WIDTH_PRESET_GRID_CLASS: Record<NonNullable<SanitySectionLayout["widthPreset"]>, string> = {
  narrow: "lg:col-start-4 lg:col-span-4",
  main: "lg:col-start-3 lg:col-span-6",
  leftInset: "lg:col-start-2 lg:col-span-5",
  rightInset: "lg:col-start-7 lg:col-span-5",
  wide: "lg:col-start-2 lg:col-span-10",
  full: "lg:col-start-1 lg:col-span-12",
};

function getPlacementColumnClass(layout?: SanitySectionLayout | null) {
  if (layout?.useCustomGrid && layout.startLine && layout.span) {
    return `${GRID_START_CLASS[layout.startLine] ?? WIDTH_PRESET_GRID_CLASS.main} ${
      GRID_SPAN_CLASS[layout.span] ?? "lg:col-span-6"
    }`;
  }

  return WIDTH_PRESET_GRID_CLASS[layout?.widthPreset ?? "main"];
}

function getTextAlignClass(align?: SanitySectionLayout["align"]) {
  switch (align) {
    case "center":
      return "text-center";
    case "right":
      return "text-right";
    default:
      return "text-left";
  }
}

function SectionPlacement({
  layout,
  children,
  bleed = false,
}: {
  layout?: SanitySectionLayout | null;
  children: ReactNode;
  bleed?: boolean;
}) {
  const outerClass = bleed && layout?.widthPreset === "full" ? "-mx-[var(--site-gutter)]" : "";

  return (
    <div className={`${outerClass} grid grid-cols-1 lg:grid-cols-12`}>
      <div className={`min-w-0 ${getPlacementColumnClass(layout)}`}>{children}</div>
    </div>
  );
}

function resolveFigureUrl(figure?: SanityImageFigure | null, width = 1800) {
  return figure?.image ? urlForImage(figure.image)?.width(width).auto("format").url() ?? null : null;
}

function resolveHomeItemHref(item: SanityHomeLinkedItem) {
  return resolveLinkFieldHref(item.link) || resolveLinkedDocumentHref(item.linkedDocument) || "";
}

function isExternalHref(href: string) {
  return /^https?:\/\//.test(href);
}

function renderDisplayLines(displayTitle: string | undefined, fallbackTitle: string) {
  return splitDisplayTitle(displayTitle) ?? [fallbackTitle];
}

function normalizeCopy(value?: string | null) {
  return value?.trim().toLowerCase();
}

function QuickLinksSection({
  section,
  locale,
  currentEvent,
}: {
  section: SanityHomeQuickLinksSection;
  locale: Locale;
  currentEvent?: SanityEventPreview | null;
}) {
  const items = section.items.filter((item) => item.isVisible !== false).filter((item) => Boolean(resolveHomeItemHref(item)));
  const currentMeta = text(locale, { de: "Aktuell", en: "Current" });
  const genericCurrentTitle = text(locale, { de: "Aktuelle Veranstaltung", en: "Current event" });
  const latestProjectMeta = text(locale, { de: "Letztes Projekt", en: "Latest project" });
  const latestProjectsMeta = text(locale, { de: "Letzte Projekte", en: "Latest projects" });
  const resolvedCurrentEvent = currentEvent ? withInstagramFallbackForEventPreview(locale, currentEvent) : null;
  const currentTitle = resolvedCurrentEvent?.title ?? text(locale, HOME_QUICK_CURRENT_FALLBACK.title);
  const currentHref = resolvedCurrentEvent?.externalUrl ?? HOME_QUICK_CURRENT_FALLBACK.href;
  const currentDescription = resolvedCurrentEvent?.summary ?? "";

  if (!items.length) {
    return null;
  }

  return (
    <section className={`-mx-[var(--site-gutter)] -mb-[clamp(1.15rem,3.5vw,1.95rem)] ${getOuterSectionClass(section.layout)}`}>
      <div className="grid grid-cols-1 border-y border-[var(--line)]/70 lg:grid-cols-3">
        {items.map((item, index) => {
          const isCurrentItem =
            normalizeCopy(item.meta) === normalizeCopy(currentMeta)
            || normalizeCopy(item.title) === normalizeCopy(genericCurrentTitle);
          const href = isCurrentItem ? currentHref : resolveHomeItemHref(item);
          const external = isExternalHref(href);
          const dividerClasses = index === 0 ? "" : "border-t border-[var(--line)]/55 lg:border-l lg:border-t-0";
          const title = isCurrentItem ? currentTitle : item.title;
          const meta = normalizeCopy(item.meta) === normalizeCopy(latestProjectMeta) ? latestProjectsMeta : item.meta;

          return (
            <a
              key={item._key}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer noopener" : undefined}
              className={`home-quick-link group grid min-w-0 px-[var(--site-gutter)] transition-colors hover:bg-black/[0.025] focus-visible:bg-black/[0.025] focus-visible:outline-none ${dividerClasses}`}
            >
              {meta ? <p className="type-meta text-[var(--muted)]">{meta}</p> : null}
              <p className="home-quick-link-title font-display text-[var(--ink)] transition-transform group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5">
                {title}
              </p>
              {isCurrentItem && currentDescription ? <p className="sr-only">{currentDescription}</p> : null}
              {external ? (
                <span className="sr-only">
                  {text(locale, { de: "Öffnet in einem neuen Tab", en: "Opens in a new tab" })}
                </span>
              ) : null}
            </a>
          );
        })}
      </div>
    </section>
  );
}

function HomeHeroSection({ section }: { section: SanityHomeHeroSection }) {
  const imageUrl = resolveFigureUrl(section.image, 2200);

  return (
    <section className={getOuterSectionClass(section.layout)}>
      <PageIntro
        eyebrow={section.eyebrow}
        title={section.title}
        titleLines={renderDisplayLines(section.displayTitle, section.title)}
        description={section.description}
        note={section.note}
        className="layout-editorial-intro"
        rightClassName="lg:max-w-[45rem] lg:pt-4"
      />
      {imageUrl ? (
        <div className="-mx-[var(--site-gutter)] pt-3 md:pt-4">
          <div className="relative aspect-[16/10] w-full overflow-hidden lg:aspect-[2.7/1]">
            <Image
              src={imageUrl}
              alt={section.image?.alt || section.title}
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}

function HomeStatement({ section, locale }: { section: SanityHomeStatementSection; locale: Locale }) {
  const fallbackTitle = text(locale, HOME_STATEMENT_TITLE);
  const resolvedLines = renderDisplayLines(
    section.displayTitle,
    section.title || HOME_STATEMENT_TITLE.de,
  );
  const usesDefaultGermanHeading =
    locale === "en"
    && resolvedLines.length === HOME_STATEMENT_LINES.de.length
    && resolvedLines.every((line, index) => normalizeCopy(line) === normalizeCopy(HOME_STATEMENT_LINES.de[index]));
  const titleLines = usesDefaultGermanHeading
    ? HOME_STATEMENT_LINES.en
    : renderDisplayLines(section.displayTitle, section.title || fallbackTitle);
  const titleLabel = usesDefaultGermanHeading ? fallbackTitle : section.title || fallbackTitle;
  const theme = section.layout?.theme ?? "ink";
  const listTone = theme === "ink" ? "text-zinc-300" : "text-[var(--muted)]";
  const bodyTone = theme === "ink" ? "text-zinc-200" : "text-[var(--ink)]";
  const noteTone = theme === "ink" ? "text-zinc-300" : "text-[var(--muted)]";

  return (
    <section className={`-mx-[var(--site-gutter)] -mt-[clamp(1.15rem,3.5vw,1.95rem)] ${getOuterSectionClass(section.layout)}`}>
      <div className={`${getSurfaceClass(theme)} px-[var(--site-gutter)] py-8 md:py-10`}>
        <div className="content-grid">
          <div className="content-stack lg:max-w-[24.5rem]">
            <h2
              aria-label={titleLabel}
              className="home-intro-heading font-display text-[2.16rem] tracking-[0.026em] uppercase text-current md:text-[2.68rem] lg:max-w-[24.5rem] lg:text-[clamp(2.78rem,2.9vw,3.72rem)]"
            >
              {titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>

          <div className="content-stack home-intro-copy lg:pt-1">
            <p className={`type-body-lg max-w-[48rem] ${bodyTone}`}>{section.text}</p>
            {section.note ? <p className={`type-body-lg max-w-[48rem] ${noteTone}`}>{section.note}</p> : null}
            {section.items?.length ? (
              <ul className={`type-body max-w-[48rem] space-y-1.5 ${listTone}`}>
                {section.items.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureListSection({ section }: { section: SanityFeatureListSection }) {
  const title = section.title ?? "";

  return (
    <section className={getOuterSectionClass(section.layout)}>
      <SectionGrid
        eyebrow={section.eyebrow}
        title={title || "List"}
        titleLines={title ? renderDisplayLines(section.displayTitle, title) : undefined}
        description={section.description ?? ""}
      >
        <ul className="space-y-3">
          {section.items.map((item) => (
            <li key={item} className="type-body-lg flex gap-3 text-[var(--ink)]">
              <span className="mt-[0.42rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </SectionGrid>
    </section>
  );
}

function HomeIntroCardsSection({ section, locale }: { section: SanityHomeSectionIntro; locale: Locale }) {
  const entries = section.entries
    .filter((entry) => entry.isVisible !== false)
    .map((entry) => ({
      ...entry,
      href: resolveHomeItemHref(entry),
    }))
    .filter((entry) => Boolean(entry.href));

  if (!entries.length) {
    return null;
  }

  return (
    <section className={getOuterSectionClass(section.layout)}>
      <SectionGrid
        eyebrow={section.eyebrow}
        title={section.title}
        titleLines={renderDisplayLines(section.displayTitle, section.title)}
        description={section.description}
      >
        {entries.map((entry) => (
          (() => {
            const imageSrc = resolveFigureUrl(entry.image, 900);

            return (
              <Card
                key={entry._key}
                locale={locale}
                href={entry.href}
                title={entry.title}
                description={entry.description ?? ""}
                meta={entry.meta}
                image={imageSrc ? { src: imageSrc, alt: entry.image?.alt || entry.title } : undefined}
                external={isExternalHref(entry.href)}
              />
            );
          })()
        ))}
      </SectionGrid>
    </section>
  );
}

function EditorialTextSection({ section }: { section: SanityHomeTextSection }) {
  const hasHeading = Boolean(section.displayTitle || section.title);
  const theme = section.layout?.theme ?? "paper";
  const surfacePadding = theme === "paper" ? "" : "p-6 md:p-7";

  return (
    <section className={getOuterSectionClass(section.layout)}>
      <SectionPlacement layout={section.layout}>
        <div className={`${getSurfaceClass(theme)} ${surfacePadding}`}>
          <div className={`content-stack-tight ${getTextAlignClass(section.layout?.align)}`}>
            {section.eyebrow ? <Eyebrow>{section.eyebrow}</Eyebrow> : null}
            {hasHeading ? (
              section.displayTitle ? (
                <h2 className="type-display-section text-current">
                  {renderDisplayLines(section.displayTitle, section.title || "").map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h2>
              ) : section.title ? (
                <h2 className="type-display-section text-current">{section.title}</h2>
              ) : null
            ) : null}
            <PortableTextContent blocks={section.body} className="space-y-5" />
          </div>
        </div>
      </SectionPlacement>
    </section>
  );
}

function ImageBlockSection({
  section,
  suppressCaption = false,
}: {
  section: SanityImageBlockSection;
  suppressCaption?: boolean;
}) {
  const imageUrl = resolveFigureUrl(section.image, 1800);

  if (!imageUrl) {
    return null;
  }

  const ratioClass =
    section.ratio === "16:9"
      ? "aspect-[16/9]"
      : section.ratio === "4:3"
        ? "aspect-[4/3]"
        : section.ratio === "1:1"
          ? "aspect-square"
          : section.ratio === "portrait"
            ? "aspect-[4/5]"
            : section.layout?.widthPreset === "full"
              ? "aspect-[6/5] sm:aspect-[16/11] lg:aspect-[1901/700]"
              : "aspect-[16/10]";

  return (
    <section className={getOuterSectionClass(section.layout)}>
      <SectionPlacement layout={section.layout} bleed>
        <figure className="w-full">
          <div className={`relative overflow-hidden ${ratioClass}`}>
            <Image src={imageUrl} alt={section.image?.alt || ""} fill sizes="100vw" className="object-cover object-center" />
          </div>
          {!suppressCaption && section.image?.caption ? (
            <figcaption className="type-meta mt-2 text-[var(--muted)]">{section.image.caption}</figcaption>
          ) : null}
        </figure>
      </SectionPlacement>
    </section>
  );
}

function GalleryBlockSection({ section }: { section: SanityGalleryBlockSection }) {
  if (!section.images.length) {
    return null;
  }

  const gridClass =
    section.galleryLayout === "stacked"
      ? "grid-cols-1"
      : section.galleryLayout === "grid-3"
        ? "grid-cols-1 md:grid-cols-3"
        : "grid-cols-1 md:grid-cols-2";

  return (
    <section className={getOuterSectionClass(section.layout)}>
      <SectionPlacement layout={section.layout} bleed>
        <div className="w-full">
          <div className={`grid gap-4 ${gridClass}`}>
            {section.images.map((image, index) => {
              const imageUrl = resolveFigureUrl(image, 1400);

              if (!imageUrl) {
                return null;
              }

              return (
                <figure key={`${image.caption || image.alt || "image"}-${index}`} className="relative aspect-[4/3] overflow-hidden">
                  <Image src={imageUrl} alt={image.alt || ""} fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover object-center" />
                </figure>
              );
            })}
          </div>
          {section.caption ? <p className="type-meta mt-2 text-[var(--muted)]">{section.caption}</p> : null}
        </div>
      </SectionPlacement>
    </section>
  );
}

function VideoBlockSection({ section }: { section: SanityVideoBlockSection }) {
  const ratioClass =
    section.ratio === "4:3"
      ? "aspect-[4/3]"
      : section.ratio === "1:1"
        ? "aspect-square"
        : section.ratio === "portrait"
          ? "aspect-[4/5]"
          : "aspect-[16/9]";
  const embedUrl =
    section.sourceType === "youtube" && section.url
      ? section.url.replace("watch?v=", "embed/")
      : section.sourceType === "vimeo" && section.url
        ? section.url.replace("vimeo.com/", "player.vimeo.com/video/")
        : null;
  const posterUrl = resolveFigureUrl(section.posterImage, 1600);

  return (
    <section className={getOuterSectionClass(section.layout)}>
      <SectionPlacement layout={section.layout} bleed>
        <div className="w-full">
          <div className={`relative overflow-hidden ${ratioClass}`}>
            {section.sourceType === "upload" && section.videoFileUrl ? (
              <video
                className="h-full w-full object-cover"
                controls={section.controls !== false}
                muted={section.muted}
                loop={section.loop}
                playsInline
                poster={posterUrl ?? undefined}
              >
                <source src={section.videoFileUrl} />
              </video>
            ) : embedUrl ? (
              <iframe
                src={embedUrl}
                title={section.title || "Video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full border-0"
              />
            ) : null}
          </div>
          {section.caption ? <p className="type-meta mt-2 text-[var(--muted)]">{section.caption}</p> : null}
          {section.accessibleDescription ? (
            <p className="type-body mt-2 text-[var(--muted)]">{section.accessibleDescription}</p>
          ) : null}
        </div>
      </SectionPlacement>
    </section>
  );
}

function CtaBlockSection({ section, locale }: { section: SanityCtaBlock; locale: Locale }) {
  const href = resolveLinkFieldHref(section.link) || resolveLinkedDocumentHref(section.linkedDocument) || "";

  if (!href) {
    return null;
  }

  const external = isExternalHref(href);
  const label = section.label || text(locale, { de: "Weiter", en: "More" });

  return (
    <section className={getOuterSectionClass(section.layout)}>
      <SectionPlacement layout={section.layout}>
        <div className={`${getSurfaceClass(section.layout?.theme)} p-6 md:p-7`}>
          <div className={`content-stack-tight ${getTextAlignClass(section.layout?.align)}`}>
            {section.eyebrow ? <Eyebrow>{section.eyebrow}</Eyebrow> : null}
            <h2 className="type-display-section max-w-[14ch] text-current">{section.title}</h2>
            {section.body ? <p className="type-body-lg max-w-[42rem] text-current">{section.body}</p> : null}
            <Link
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer noopener" : undefined}
              className="type-meta inline-flex w-fit items-center gap-2 text-[var(--accent)] transition-transform hover:translate-x-1 focus-visible:translate-x-1 focus-visible:outline-none"
            >
              {label}
            </Link>
          </div>
        </div>
      </SectionPlacement>
    </section>
  );
}

function renderHomeSection(
  section: SanityHomeSection,
  locale: Locale,
  currentEvent?: SanityEventPreview | null,
  nextSection?: SanityHomeSection | null,
) {
  if ("isVisible" in section && section.isVisible === false) {
    return null;
  }

  switch (section._type) {
    case "homeQuickLinksSection":
      return <QuickLinksSection key={section._key} section={section} locale={locale} currentEvent={currentEvent} />;
    case "homeHero":
      return <HomeHeroSection key={section._key} section={section} />;
    case "homeStatementSection":
      return <HomeStatement key={section._key} section={section} locale={locale} />;
    case "featureListSection":
      return <FeatureListSection key={section._key} section={section} />;
    case "homeSectionIntro":
      return <HomeIntroCardsSection key={section._key} section={section} locale={locale} />;
    case "textSection":
      return <EditorialTextSection key={section._key} section={section} />;
    case "imageBlock":
      return (
        <ImageBlockSection
          key={section._key}
          section={section}
          suppressCaption={nextSection?._type === "homeStatementSection"}
        />
      );
    case "galleryBlock":
      return <GalleryBlockSection key={section._key} section={section} />;
    case "videoBlock":
      return <VideoBlockSection key={section._key} section={section} />;
    case "ctaBlock":
      return <CtaBlockSection key={section._key} section={section} locale={locale} />;
    default:
      return null;
  }
}

export function HomeSections({ sections, locale, currentEvent }: HomeSectionsProps) {
  if (!sections?.length) {
    return null;
  }

  return (
    <>
      {sections.map((section, index) =>
        section ? renderHomeSection(section, locale, currentEvent, sections[index + 1] ?? null) : null,
      )}
    </>
  );
}
