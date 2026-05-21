import { PageIntro } from "@/components/PageIntro";
import { getLocale, text } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

type Copy = string | Record<Locale, string>;

type SimplePageProps = {
  eyebrow: string;
  title: Copy;
  description: Copy;
  note?: Copy;
};

function resolveCopy(locale: Locale, copy: Copy): string {
  return typeof copy === "string" ? copy : text(locale, copy);
}

export async function SimplePage({ eyebrow, title, description, note }: SimplePageProps) {
  const locale = await getLocale();

  return (
    <PageIntro
      eyebrow={eyebrow}
      title={resolveCopy(locale, title)}
      description={resolveCopy(locale, description)}
      note={note ? resolveCopy(locale, note) : undefined}
    />
  );
}
