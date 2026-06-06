import { PageIntro } from "@/components/PageIntro";
import { getLocale, text } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import type { ReactNode } from "react";

type Copy = string | Record<Locale, string>;

type SimplePageProps = {
  eyebrow: string;
  title: Copy;
  titleLines?: Copy[];
  description: Copy;
  note?: Copy;
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
        className={`layout-editorial-intro ${introClassName ?? ""}`}
        titleClassName={`lg:max-w-[9.9ch] lg:text-[clamp(2.62rem,3.38vw,3.28rem)] xl:max-w-[10.8ch] xl:text-[clamp(2.86rem,3.56vw,3.56rem)] ${titleClassName ?? ""}`}
        rightClassName="lg:max-w-[44rem] lg:pt-4"
      />
      {children}
    </div>
  );
}
