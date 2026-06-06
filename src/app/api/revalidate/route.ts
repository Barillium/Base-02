import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type RevalidatePayload = {
  paths?: string[];
  tags?: string[];
};

function cleanStringList(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((entry): entry is string => typeof entry === "string" && entry.length > 0);
}

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json({ ok: false, error: "Missing SANITY_REVALIDATE_SECRET." }, { status: 500 });
  }

  const providedSecret =
    request.headers.get("x-sanity-revalidate-secret") ?? request.nextUrl.searchParams.get("secret");

  if (providedSecret !== secret) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const payload = ((await request.json().catch(() => ({}))) as RevalidatePayload) ?? {};
  const tags = cleanStringList(payload.tags);
  const paths = cleanStringList(payload.paths);

  tags.forEach((tag) => revalidateTag(tag, { expire: 0 }));
  paths.forEach((path) => revalidatePath(path));

  return NextResponse.json({
    ok: true,
    revalidated: {
      tags,
      paths,
    },
  });
}
