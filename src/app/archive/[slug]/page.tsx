import Image from "next/image";
import { notFound } from "next/navigation";

import { PageJsonLd } from "@/components/PageJsonLd";
import { PageIntro } from "@/components/PageIntro";
import { PortableTextContent } from "@/components/PortableTextContent";
import { getLocale, text } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { splitDisplayTitle } from "@/sanity/lib/content";
import { maybeSanityFetch } from "@/sanity/lib/fetch";
import { urlForImage } from "@/sanity/lib/image";
import { ARCHIVE_ENTRY_BY_SLUG_QUERY, ARCHIVE_ENTRY_SLUGS_QUERY } from "@/sanity/lib/queries";
import { formatArchiveMeta } from "@/sanity/lib/presenters";
import type { SanityArchiveEntryDetail } from "@/sanity/types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getArchiveEntry(slug: string, locale: "de" | "en") {
  return maybeSanityFetch<SanityArchiveEntryDetail>({
    query: ARCHIVE_ENTRY_BY_SLUG_QUERY,
    params: { slug, locale },
    tags: ["archiveEntry", `archiveEntry:${slug}`],
    revalidate: 300,
  });
}

export async function generateStaticParams() {
  const entries = await maybeSanityFetch<Array<{ slug: string }>>({
    query: ARCHIVE_ENTRY_SLUGS_QUERY,
    tags: ["archiveEntry"],
    revalidate: 300,
  });

  return entries?.map((entry) => ({ slug: entry.slug })) ?? [];
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const entry = await getArchiveEntry(slug, "de");

  if (!entry) {
    return pageMetadata({
      title: "Archiv",
      description: "Archivseite von The Base e.V. in Aachen.",
      path: `/archive/${slug}`,
      noIndex: true,
    });
  }

  return pageMetadata({
    title: entry.title,
    description: entry.summary,
    path: `/archive/${slug}`,
  });
}

export default async function ArchiveDetailPage({ params }: PageProps) {
  const locale = await getLocale();
  const { slug } = await params;
  const entry = await getArchiveEntry(slug, locale);

  if (!entry) {
    notFound();
  }

  const imageUrl = urlForImage(entry.image)?.width(1400).height(900).fit("crop").url();

  return (
    <div className="editorial-fade page-flow-compact">
      <PageJsonLd
        title={entry.title}
        description={entry.summary}
        path={`/archive/${slug}`}
        pageType="WebPage"
      />

      <PageIntro
        eyebrow="Archive"
        title={entry.title}
        titleLines={splitDisplayTitle(entry.displayTitle)}
        description={entry.summary}
        note={formatArchiveMeta(locale, entry)}
        layout={entry.introLayout}
        className="layout-editorial-intro"
        titleClassName="lg:max-w-[10.6ch] lg:text-[clamp(2.48rem,3.18vw,3.12rem)] xl:max-w-[11.5ch] xl:text-[clamp(2.72rem,3.38vw,3.38rem)]"
        rightClassName="lg:max-w-[45rem] lg:pt-4"
      />

      {imageUrl ? (
        <section className="relative aspect-[16/10] overflow-hidden rounded-sm border border-[var(--line)] bg-[var(--paper)]">
          <Image
            src={imageUrl}
            alt={entry.imageAlt || entry.title}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </section>
      ) : null}

      <section className="content-grid layout-editorial-section">
        <div className="content-stack-tight min-w-0 lg:pr-4 xl:pr-6">
          <p className="type-meta text-[var(--muted)]">{text(locale, { de: "Archiv", en: "Archive" })}</p>
          <p className="type-display-card text-[var(--ink)]">
            {entry.archiveCategory === "poster"
              ? text(locale, { de: "Poster", en: "Poster" })
              : text(locale, { de: "Kunstkatalog", en: "Art catalogue" })}
          </p>
          {entry.externalUrl ? (
            <a
              href={entry.externalUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="type-body inline-flex text-[var(--accent)] transition-colors hover:text-[var(--ink)]"
            >
              {text(locale, { de: "Externer Link", en: "External link" })}
            </a>
          ) : null}
        </div>
        <div className="min-w-0 lg:pt-3">
          {entry.body?.length ? (
            <PortableTextContent
              blocks={entry.body}
              layout={entry.bodyLayout}
            />
          ) : (
            <p className="type-body-lg text-[var(--ink)]">{entry.summary}</p>
          )}
          {entry.credits?.length ? (
            <div className="mt-8 border-t border-[var(--line)] pt-4">
              <p className="type-meta text-[var(--muted)]">{text(locale, { de: "Credits", en: "Credits" })}</p>
              <ul className="mt-2 space-y-1">
                {entry.credits.map((credit) => (
                  <li key={credit} className="type-body text-[var(--ink)]">
                    {credit}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
