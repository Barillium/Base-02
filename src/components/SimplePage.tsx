import { PageIntro } from "@/components/PageIntro";
import { PortableTextContent } from "@/components/PortableTextContent";
import { getLocale, text } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import type { PortableTextBlock, SanityTextLayout } from "@/sanity/lib/content";
import type { ReactNode } from "react";

type Copy = string | Record<Locale, string>;

type SimplePageProps = {
  eyebrow: string;
  title: Copy;
  titleLines?: Copy[];
  description: Copy;
  note?: Copy;
  introLayout?: SanityTextLayout | null;
  bodyBlocks?: PortableTextBlock[] | null;
  bodyLayout?: SanityTextLayout | null;
  titleClassName?: string;
  introClassName?: string;
  children?: ReactNode;
};

function resolveCopy(locale: Locale, copy: Copy): string {
  return typeof copy === "string" ? copy : text(locale, copy);
}

export async function SimplePage({
  eyebrow,
  title,
  titleLines,
  description,
  note,
  introLayout,
  bodyBlocks,
  bodyLayout,
  titleClassName,
  introClassName,
  children,
}: SimplePageProps) {
  const locale = await getLocale();

  return (
    <div className="editorial-fade page-flow">
      <PageIntro
        eyebrow={eyebrow}
        title={resolveCopy(locale, title)}
        titleLines={titleLines?.map((line) => resolveCopy(locale, line))}
        description={resolveCopy(locale, description)}
        note={note ? resolveCopy(locale, note) : undefined}
        layout={introLayout}
        className={`layout-editorial-intro ${introClassName ?? ""}`}
        titleClassName={`lg:max-w-[9.9ch] lg:text-[clamp(2.38rem,3.04vw,2.96rem)] xl:max-w-[10.8ch] xl:text-[clamp(2.56rem,3.18vw,3.18rem)] ${titleClassName ?? ""}`}
        rightClassName="lg:max-w-[44rem] lg:pt-4"
      />
      {bodyBlocks?.length ? (
        <section className="content-grid layout-editorial-section">
          <div aria-hidden="true" className="hidden lg:block" />
          <PortableTextContent blocks={bodyBlocks} layout={bodyLayout} className="lg:max-w-[44rem] lg:pt-2" />
        </section>
      ) : null}
      {children}
    </div>
  );
}
