export type PortableTextSpan = {
  _key?: string;
  _type?: "span";
  text?: string;
  marks?: string[];
};

export type PortableTextMarkDef = {
  _key?: string;
  _type?: string;
  href?: string;
};

export type PortableTextBlock = {
  _key?: string;
  _type?: string;
  style?: string;
  listItem?: "bullet" | "number";
  level?: number;
  children?: PortableTextSpan[];
  markDefs?: PortableTextMarkDef[];
};

export type SanityTextLayout = {
  position?: "default" | "centered";
  alignment?: "left" | "center" | "right";
};

export type SanitySectionLayout = {
  widthPreset?: "narrow" | "main" | "leftInset" | "rightInset" | "wide" | "full";
  useCustomGrid?: boolean;
  startLine?: string;
  span?: string;
  align?: "left" | "center" | "right";
  spacingTop?: "none" | "small" | "medium" | "large" | "xlarge";
  spacingBottom?: "none" | "small" | "medium" | "large" | "xlarge";
  theme?: "paper" | "ink" | "muted";
  titleSize?: "hero" | "section" | "card" | "small";
  bodySize?: "large" | "normal" | "small";
};

export type SanityLinkField = {
  kind?: "internal" | "external";
  internalPath?: string;
  externalUrl?: string;
};

export type SanityLinkedDocumentReference = {
  _type: "event" | "programmeSeries" | "archiveEntry" | "mediaProject" | "staticPage";
  routeKey?: string;
  archiveCategory?: "catalogue" | "poster";
  slug?: string;
  status?: string;
  siteVisibility?: "public" | "hidden";
};

export function splitDisplayTitle(displayTitle?: string | null): string[] | undefined {
  if (!displayTitle) {
    return undefined;
  }

  const lines = displayTitle
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.length ? lines : undefined;
}

export function portableTextToTextLines(blocks?: PortableTextBlock[] | null): string[] {
  if (!blocks?.length) {
    return [];
  }

  return blocks
    .map((block) =>
      (block.children ?? [])
        .map((child) => child.text ?? "")
        .join("")
        .trim(),
    )
    .filter(Boolean);
}

export function resolveStaticPageHref(routeKey?: string | null): string | null {
  switch (routeKey) {
    case "about-the-base":
      return "/about/the-base";
    case "about-code-of-conduct":
      return "/about/code-of-conduct";
    case "about-kontakt":
      return "/about/kontakt";
    case "about-foerdermitgliedschaft":
      return "/about/foerdermitgliedschaft";
    case "about-mitmachen":
      return "/mitmachen";
    case "mitmachen":
      return "/mitmachen";
    case "media-buchung":
      return "/media/buchung";
    case "media-produktionen":
      return "/media/produktionen";
    default:
      return null;
  }
}

export function resolveLinkedDocumentHref(document?: SanityLinkedDocumentReference | null): string | null {
  if (!document) {
    return null;
  }

  if (document.siteVisibility === "hidden" || document.status === "archived") {
    return null;
  }

  switch (document._type) {
    case "event":
      return document.slug ? `/live/${document.slug}` : "/live/aktuelle-ausstellung";
    case "programmeSeries":
      return "/live/laufende-formate";
    case "archiveEntry":
      return document.slug
        ? `/archive/${document.slug}`
        : document.archiveCategory === "poster"
          ? "/archive/poster"
          : "/archive/kunstkatalog";
    case "mediaProject":
      return "/media/produktionen";
    case "staticPage":
      return resolveStaticPageHref(document.routeKey);
    default:
      return null;
  }
}

export function resolveLinkFieldHref(link?: SanityLinkField | null): string | null {
  if (!link) {
    return null;
  }

  if (link.kind === "external") {
    return link.externalUrl || null;
  }

  return link.internalPath || link.externalUrl || null;
}
