import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import { documents } from "./sanity-content-documents.mjs";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-05-27";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("Missing Sanity env vars. Required:");
  console.error("- NEXT_PUBLIC_SANITY_PROJECT_ID");
  console.error("- NEXT_PUBLIC_SANITY_DATASET");
  console.error("- SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

function localizedString(de, en = de) {
  return { _type: "localizedString", de, en };
}

function localizedText(de, en = de) {
  return { _type: "localizedText", de, en };
}

function createSectionLayout(overrides = {}) {
  return {
    _type: "sectionLayoutOptions",
    widthPreset: "main",
    align: "left",
    spacingTop: "medium",
    spacingBottom: "medium",
    theme: "paper",
    useCustomGrid: false,
    titleSize: "section",
    bodySize: "normal",
    ...overrides,
  };
}

function cloneValue(value) {
  if (value === undefined) {
    return undefined;
  }

  return JSON.parse(JSON.stringify(value));
}

async function uploadImageAsset(relativePath, filename) {
  const existingAsset = await client.fetch(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]{_id}`,
    { filename },
  );

  if (existingAsset?._id) {
    return existingAsset;
  }

  const filePath = path.join(process.cwd(), relativePath);
  const stream = fs.createReadStream(filePath);

  return client.assets.upload("image", stream, {
    filename,
  });
}

function createHomepageSections(homePage, heroAssetId) {
  const quickLinkItems = (homePage.quickLinks ?? [])
    .filter((item) => item?.isActive !== false)
    .map((item) => ({
      _key: item._key,
      _type: "homeLinkedItem",
      meta: cloneValue(item.label),
      title: cloneValue(item.title),
      description: cloneValue(item.description),
      ...(item.link ? { link: cloneValue(item.link) } : {}),
      ...(item.linkedDocument ? { linkedDocument: cloneValue(item.linkedDocument) } : {}),
      isVisible: true,
    }));

  const aboutEntries = [
    {
      _key: "about-the-base",
      _type: "homeLinkedItem",
      meta: localizedString("Profil", "Profile"),
      title: localizedString("The Base"),
      description: localizedText(
        "Entstehung, Selbstverständnis und die Rolle des BOA als Kulturort und Infrastruktur.",
        "Origins, mission, and the role of the BOA as cultural site and infrastructure.",
      ),
      linkedDocument: { _type: "reference", _ref: "page.about-the-base" },
      isVisible: true,
    },
    {
      _key: "about-open-call",
      _type: "homeLinkedItem",
      meta: localizedString("Open Call", "Open call"),
      title: localizedString("Open Call"),
      description: localizedText(
        "Anfragen für Ausstellungen, ortsspezifische Arbeiten und andere Formate im Kontext des BOA.",
        "Inquiries for exhibitions, site-specific works, and other formats in the context of the BOA.",
      ),
      linkedDocument: { _type: "reference", _ref: "page.mitmachen" },
      isVisible: true,
    },
    {
      _key: "about-awareness",
      _type: "homeLinkedItem",
      meta: localizedString("Safe Space", "Safe Space"),
      title: localizedString("Awareness"),
      description: localizedText(
        "Grundsätze für respektvolle Räume, diskriminierungssensible Praxis und gemeinsames Verhalten im BOA.",
        "Principles for respectful spaces, discrimination-sensitive practice, and shared conduct at BOA.",
      ),
      linkedDocument: { _type: "reference", _ref: "page.about-code-of-conduct" },
      isVisible: true,
    },
  ];

  return [
    {
      _key: "home-quick-links",
      _type: "homeQuickLinksSection",
      items: quickLinkItems,
      layout: createSectionLayout({
        widthPreset: "full",
        spacingTop: "none",
        spacingBottom: "none",
      }),
      isVisible: true,
    },
    {
      _key: "home-editorial-image",
      _type: "imageBlock",
      image: {
        _type: "imageFigure",
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: heroAssetId,
          },
        },
        alt: localizedString("Innenraum im BOA Bunker of Art"),
        caption: localizedString("BOA Bunker of Art, Aachen"),
      },
      ratio: "auto",
      layout: createSectionLayout({
        widthPreset: "full",
        spacingTop: "none",
        spacingBottom: "none",
      }),
      isVisible: true,
    },
    {
      _key: "home-statement",
      _type: "homeStatementSection",
      title: localizedString("Plattform zwischen Ausstellung, Programm und lokaler Szene"),
      displayTitle: localizedText("Plattform\nzwischen\nAusstellung,\nProgramm und\nlokaler Szene"),
      text: cloneValue(homePage.statement),
      note: cloneValue(homePage.note),
      items: (homePage.milestones?.de ?? []).map((entry, index) => ({
        _key: entry._key ?? `milestone-${index + 1}`,
        _type: "featureListItem",
        text: {
          _type: "localizedText",
          de: entry.children?.map((child) => child.text).join("") ?? "",
          en: homePage.milestones?.en?.[index]?.children?.map((child) => child.text).join("") ?? "",
        },
      })),
      layout: createSectionLayout({
        widthPreset: "full",
        spacingTop: "none",
        spacingBottom: "medium",
        theme: "ink",
        titleSize: "hero",
        bodySize: "large",
      }),
      isVisible: true,
    },
    {
      _key: "home-about-intro",
      _type: "homeSectionIntro",
      eyebrow: localizedString("About"),
      title: localizedString("Verein, Awareness und Kontakt"),
      displayTitle: localizedText("Verein,\nAwareness\nund Kontakt"),
      description: localizedText(
        "Geschichte, Selbstverständnis, Awareness und konkrete Wege in den Verein und den Kulturort hinein.",
        "History, position, awareness, and direct ways into the association and cultural site.",
      ),
      entries: aboutEntries,
      layout: createSectionLayout({
        widthPreset: "main",
        spacingTop: "large",
        spacingBottom: "large",
      }),
      isVisible: true,
    },
  ];
}

async function main() {
  console.log(`Seeding ${documents.length} Sanity documents...`);

  const heroAsset = await uploadImageAsset("public/home/Firefly.jpg", "home-firefly.jpg");
  const preparedDocuments = documents.map((document) => {
    if (document._id !== "homePage") {
      return document;
    }

    return {
      ...document,
      sections: createHomepageSections(document, heroAsset._id),
    };
  });

  const transaction = client.transaction();

  for (const document of preparedDocuments) {
    transaction.createOrReplace(document);
  }

  await transaction.commit();

  console.log("Sanity seed completed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
