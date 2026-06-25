import { defineArrayMember, defineField } from "sanity";

export const singletonSchemaTypes = [
  "homePage",
  "siteSettings",
  "aboutPage",
  "livePage",
  "archivePage",
  "mediaPage",
  "formContent",
] as const;

export const linkedDocumentReferenceTypes = [
  { type: "event" },
  { type: "programmeSeries" },
  { type: "archiveEntry" },
  { type: "mediaProject" },
  { type: "staticPage" },
];

export const staticPageRouteOptions = [
  { title: "About: The Base", value: "about-the-base" },
  { title: "About: Code of Conduct", value: "about-code-of-conduct" },
  { title: "About: Kontakt", value: "about-kontakt" },
  { title: "About: Fördermitgliedschaft", value: "about-foerdermitgliedschaft" },
  { title: "Top-level: Mitmachen", value: "mitmachen" },
  { title: "Media: Buchung", value: "media-buchung" },
  { title: "Media: Produktionen", value: "media-produktionen" },
];

export const homepageSectionMembers = [
  defineArrayMember({ type: "homeHero" }),
  defineArrayMember({ type: "homeQuickLinksSection" }),
  defineArrayMember({ type: "homeStatementSection" }),
  defineArrayMember({ type: "featureListSection" }),
  defineArrayMember({ type: "homeSectionIntro" }),
  defineArrayMember({ type: "textSection" }),
  defineArrayMember({ type: "imageBlock" }),
  defineArrayMember({ type: "galleryBlock" }),
  defineArrayMember({ type: "videoBlock" }),
  defineArrayMember({ type: "ctaBlock" }),
];

export const modularContentSectionMembers = [
  defineArrayMember({ type: "textSection" }),
  defineArrayMember({ type: "statementSection" }),
  defineArrayMember({ type: "splitTextSection" }),
  defineArrayMember({ type: "columnTextSection" }),
  defineArrayMember({ type: "quoteSection" }),
  defineArrayMember({ type: "imageBlock" }),
  defineArrayMember({ type: "galleryBlock" }),
  defineArrayMember({ type: "videoBlock" }),
  defineArrayMember({ type: "principlesPanelBlock" }),
  defineArrayMember({ type: "contactDetailsBlock" }),
  defineArrayMember({ type: "formEmbedBlock" }),
];

export function createSectionLayoutField(group?: string) {
  return defineField({
    name: "layout",
    title: "Platzierung auf der Seite",
    type: "sectionLayoutOptions",
    group,
    options: {
      collapsible: true,
      collapsed: true,
    },
  });
}

export function createVisibilityField(description?: string) {
  return defineField({
    name: "isVisible",
    title: "Auf Website anzeigen",
    type: "boolean",
    initialValue: true,
    description,
  });
}

export function createSeoField(group = "seo") {
  return defineField({
    name: "seo",
    title: "SEO",
    type: "seoFields",
    group,
  });
}

export function createModularSectionsField(group = "sections", title = "Page sections") {
  return defineField({
    name: "contentModules",
    title,
    group,
    type: "array",
    options: {
      sortable: true,
    },
    description:
      "Sortierbare, strukturierte Bereiche für redaktionell geführte Seiten. Keine freien Layoutwerte, keine freie Blockwiese.",
    of: modularContentSectionMembers,
  });
}

export function formatVisibilityLabel(isVisible?: boolean) {
  return isVisible === false ? "Ausgeblendet" : "Sichtbar";
}

export function formatLocalizedPreviewTitle(
  de: string | undefined,
  en: string | undefined,
  fallback: string,
  legacyTitle?: unknown,
) {
  const resolvedLegacyTitle = typeof legacyTitle === "string" ? legacyTitle : undefined;

  return de || en || resolvedLegacyTitle || fallback;
}

export function formatCountSubtitle(
  label: string,
  items: unknown,
  isVisible?: boolean,
  suffix?: string,
) {
  const parts = [`${Array.isArray(items) ? items.length : 0} ${label}`];

  if (suffix) {
    parts.push(suffix);
  }

  parts.push(formatVisibilityLabel(isVisible));

  return parts.join(" • ");
}

export function validateExclusiveLinkTarget(value: unknown) {
  if (!value || typeof value !== "object") {
    return true;
  }

  const item = value as {
    link?: unknown;
    linkedDocument?: unknown;
  };

  if (!item.link && !item.linkedDocument) {
    return "Bitte entweder einen manuellen Link oder einen verknüpften Website-Inhalt angeben.";
  }

  if (item.link && item.linkedDocument) {
    return "Bitte nur einen Zieltyp verwenden: manueller Link oder verknüpfter Website-Inhalt.";
  }

  return true;
}
