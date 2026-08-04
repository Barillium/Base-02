import Image from "next/image";
import { notFound } from "next/navigation";

import { PageJsonLd } from "@/components/PageJsonLd";
import { PageIntro } from "@/components/PageIntro";
import { PortableTextContent } from "@/components/PortableTextContent";
import { getLocale, text } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { splitDisplayTitle } from "@/sanity/lib/content";
import { maybeSanityFetch } from "@/sanity/lib/fetch";
import { withInstagramFallbackForEventDetail } from "@/sanity/lib/eventInstagramFallbacks";
import { urlForImage } from "@/sanity/lib/image";
import { LIVE_EVENT_BY_SLUG_QUERY, LIVE_EVENT_SLUGS_QUERY } from "@/sanity/lib/queries";
import { formatEventMeta } from "@/sanity/lib/presenters";
import type { SanityEventDetail } from "@/sanity/types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getEvent(slug: string, locale: "de" | "en") {
  return maybeSanityFetch<SanityEventDetail>({
    query: LIVE_EVENT_BY_SLUG_QUERY,
    params: { slug, locale },
    tags: ["event", `event:${slug}`],
    revalidate: 300,
  });
}

export async function generateStaticParams() {
  const entries = await maybeSanityFetch<Array<{ slug: string }>>({
    query: LIVE_EVENT_SLUGS_QUERY,
    tags: ["event"],
    revalidate: 300,
  });

  return entries?.map((entry) => ({ slug: entry.slug })) ?? [];
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEvent(slug, "de");

  if (!event) {
    return pageMetadata({
      title: "Veranstaltung",
      description: "Veranstaltungsseite von The Base e.V. in Aachen.",
      path: `/live/${slug}`,
      noIndex: true,
    });
  }

  const resolvedEvent = withInstagramFallbackForEventDetail("de", event);

  return pageMetadata({
    title: resolvedEvent.title,
    description: resolvedEvent.summary,
    path: `/live/${slug}`,
  });
}

export default async function LiveEventDetailPage({ params }: PageProps) {
  const locale = await getLocale();
  const { slug } = await params;
  const event = await getEvent(slug, locale);

  if (!event) {
    notFound();
  }

  const resolvedEvent = withInstagramFallbackForEventDetail(locale, event);

  const imageUrl = urlForImage(resolvedEvent.image)?.width(1400).height(900).fit("crop").url();

  return (
    <div className="editorial-fade page-flow-compact">
      <PageJsonLd
        title={resolvedEvent.title}
        description={resolvedEvent.summary}
        path={`/live/${slug}`}
        pageType="WebPage"
      />

      <PageIntro
        eyebrow="Live"
        title={resolvedEvent.title}
        titleLines={splitDisplayTitle(resolvedEvent.displayTitle)}
        description={resolvedEvent.summary}
        note={formatEventMeta(locale, resolvedEvent)}
        layout={resolvedEvent.introLayout}
        className="layout-live-intro"
        titleClassName="max-w-[13.6ch] md:max-w-[13.8ch] lg:max-w-[13.8ch] lg:text-[clamp(2.36rem,2.86vw,2.92rem)] xl:max-w-[14.6ch] xl:text-[clamp(2.56rem,3.04vw,3.12rem)]"
        rightClassName="lg:max-w-[45rem] lg:pt-4"
      />

      {imageUrl ? (
        <section className="relative aspect-[16/10] overflow-hidden rounded-sm border border-[var(--line)] bg-[var(--paper)]">
          <Image
            src={imageUrl}
            alt={resolvedEvent.imageAlt || resolvedEvent.title}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </section>
      ) : null}

      <section className="content-grid layout-live-section">
        <div className="content-stack-tight min-w-0 lg:pr-4 xl:pr-6">
          <p className="type-meta text-[var(--muted)]">{text(locale, { de: "Veranstaltung", en: "Event" })}</p>
          <p className="type-display-card text-[var(--ink)]">{resolvedEvent.venue ?? "BOA Bunker of Art"}</p>
          {resolvedEvent.externalUrl ? (
            <a
              href={resolvedEvent.externalUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="type-body inline-flex text-[var(--accent)] transition-colors hover:text-[var(--ink)]"
            >
              {text(locale, { de: "Externer Link", en: "External link" })}
            </a>
          ) : null}
        </div>
        <div className="min-w-0 lg:pt-3">
          {resolvedEvent.body?.length ? (
            <PortableTextContent
              blocks={resolvedEvent.body}
              layout={resolvedEvent.bodyLayout}
            />
          ) : (
            <p className="type-body-lg text-[var(--ink)]">{resolvedEvent.summary}</p>
          )}
          {resolvedEvent.credits?.length ? (
            <div className="mt-8 border-t border-[var(--line)] pt-4">
              <p className="type-meta text-[var(--muted)]">{text(locale, { de: "Credits", en: "Credits" })}</p>
              <ul className="mt-2 space-y-1">
                {resolvedEvent.credits.map((credit) => (
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
