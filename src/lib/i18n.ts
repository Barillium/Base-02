import { cookies } from "next/headers";

import { locales, Locale, text } from "@/lib/i18n-shared";

const fallbackLocale: Locale = "de";
export const localeCookieName = "tb_locale";

export { locales, text };
export type { Locale };

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function resolveLocale(value?: string | null): Locale {
  if (!value) {
    return fallbackLocale;
  }

  return isLocale(value) ? value : fallbackLocale;
}

export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const savedLocale = store.get(localeCookieName)?.value;
  return resolveLocale(savedLocale);
}
