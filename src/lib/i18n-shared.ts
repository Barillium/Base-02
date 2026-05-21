export const locales = ["de", "en"] as const;

export type Locale = (typeof locales)[number];

export function text<T>(locale: Locale, content: Record<Locale, T>): T {
  return content[locale];
}
