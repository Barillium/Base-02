import { NextRequest, NextResponse } from "next/server";

import { localeCookieName, resolveLocale } from "@/lib/i18n";

export async function POST(request: NextRequest) {
  let locale: string | undefined;

  try {
    const body = (await request.json()) as { locale?: unknown };
    locale = typeof body.locale === "string" ? body.locale : undefined;
  } catch {
    locale = undefined;
  }

  const nextLocale = resolveLocale(locale);

  const response = NextResponse.json({ locale: nextLocale });
  response.cookies.set(localeCookieName, nextLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return response;
}
