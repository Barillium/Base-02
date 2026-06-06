import { createClient } from "@sanity/client";

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

const documents = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    siteTitle: "The Base e.V.",
    associationStatement: "Verein zur Foerderung von Kultur jenseits von Klasse und Sparte.",
    categoryName: "Kulturzentrum",
    seoDescription:
      "The Base e.V. ist ein Kulturverein in Aachen und arbeitet mit Ausstellungen, Veranstaltungen, Archivformaten und kollaborativer Kulturpraxis im Umfeld des Bunker of Art.",
    contactEmail: "info@thebase-ev.de",
  },
  {
    _id: "homeQuickLink-aktuell",
    _type: "homeQuickLink",
    meta: "AKTUELL",
    title: "The Roots of All That Exists",
    href: "https://www.instagram.com/p/DYcFhaxtS8G/",
    description:
      "Fuehrt direkt zur aktuellen Ausstellung mit Termin, Ort und weiterem Kontext.",
    order: 0,
    isActive: true,
  },
  {
    _id: "homeQuickLink-naechster-termin",
    _type: "homeQuickLink",
    meta: "NÄCHSTER TERMIN",
    title: "Laufende Formate",
    href: "/live/laufende-formate",
    description:
      "Bündelt wiederkehrende Reihen und Formate, die über einzelne Veranstaltungstermine hinausgehen.",
    order: 1,
    isActive: true,
  },
  {
    _id: "homeQuickLink-letztes-projekt",
    _type: "homeQuickLink",
    meta: "LETZTES PROJEKT",
    title: "Vergangene Veranstaltungen",
    href: "/live/events",
    description:
      "Verweist auf vergangene Veranstaltungen, Release-Kontexte und dokumentierte Programmpunkte.",
    order: 2,
    isActive: true,
  },
  {
    _id: "event-the-roots-of-all-that-exists-2026",
    _type: "event",
    title: "The Roots of All That Exists",
    slug: { _type: "slug", current: "the-roots-of-all-that-exists-2026" },
    summary:
      "Dreitägige Ausstellung im Bunker of Art in Aachen mit Vernissage, freiem Eintritt und Positionen aus unterschiedlichen Kontexten.",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Die Ankündigung beschreibt ein offenes Ausstellungswochenende, das Menschen und ihre Umwelt durch einen inneren Blick zusammenführt.",
          },
        ],
      },
    ],
    status: "upcoming",
    kind: "exhibition",
    dateStart: "2026-05-29T18:00:00.000Z",
    dateEnd: "2026-05-31T20:00:00.000Z",
    location: "Bunker of Art, Scheibenstraße 34, 52070 Aachen",
    credits: ["Photography: Neutron Aung"],
    externalUrl: "https://www.instagram.com/p/DYcFhaxtS8G/",
  },
  {
    _id: "event-total-local-2026",
    _type: "event",
    title: "Total Local",
    slug: { _type: "slug", current: "total-local-2026" },
    summary:
      "Kollaborative Ausstellung im Bunker of Art mit 18 Künstler:innen aus dem direkten Umfeld der Base, geprägt von Austausch, Vertrauen und gemeinsamer Praxis.",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Der Post beschreibt die Ausstellung als Öffnung des BOA für lokale Positionen und als Dialog zwischen Kunst und Raum.",
          },
        ],
      },
    ],
    status: "past",
    kind: "exhibition",
    dateStart: "2026-05-02T18:00:00.000Z",
    dateEnd: "2026-05-05T21:00:00.000Z",
    location: "Bunker of Art, Aachen",
    credits: ["Graphic Design: ranigerges"],
    externalUrl: "https://www.instagram.com/p/DXe58xqjcgO/",
  },
  {
    _id: "event-the-base-open-ground-2026",
    _type: "event",
    title: "The Base @ Open Ground",
    slug: { _type: "slug", current: "the-base-open-ground-2026" },
    summary:
      "Gastspiel von The Base bei Open Ground als Teil des oeffentlichen Programms 2026.",
    status: "past",
    kind: "other",
    dateStart: "2026-04-23T18:00:00.000Z",
    location: "Open Ground",
    externalUrl: "https://www.instagram.com/p/DXFJJbajTgY/",
  },
  {
    _id: "event-the-base-kreisstrich-az-aachen-2026",
    _type: "event",
    title: "The Base and Kreisstrich at AZ Aachen",
    slug: { _type: "slug", current: "the-base-kreisstrich-az-aachen-2026" },
    summary:
      "Musikalisches Programm im Autonomen Zentrum Aachen mit mehreren in der Ankuendigung genannten b2b-Konstellationen.",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Im Caption-Text werden 1080 b2b Manu Ceață, berkelium b2b Rapha Ceață sowie vtn b2b DJ Mauken genannt.",
          },
        ],
      },
    ],
    status: "past",
    kind: "other",
    dateStart: "2026-03-21T20:00:00.000Z",
    location: "Autonomes Zentrum Aachen",
    externalUrl: "https://www.instagram.com/p/DVxon7TDVeS/",
  },
  {
    _id: "event-10-years-the-base-2025",
    _type: "event",
    title: "The Base is turning 10",
    slug: { _type: "slug", current: "the-base-is-turning-10-2025" },
    summary:
      "Zweitaegiges Jubilaeumsprogramm mit Kunstausstellung, Live-Konzerten und weiteren Programmpunkten als markanter Moment in der Geschichte der Base.",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Der oeffentliche Post kuendigt das zehnjaehrige Bestehen der Base mit einem zweitaegigen Programm an.",
          },
        ],
      },
    ],
    status: "past",
    kind: "other",
    dateStart: "2025-12-04T18:00:00.000Z",
    location: "The Base / Bunker of Art, Aachen",
    credits: ["Poster Design: treesmerx"],
    externalUrl: "https://www.instagram.com/p/DR2wOqtDR8h/",
  },
  {
    _id: "event-rrade-rhythmic-resonance-2025",
    _type: "event",
    title: "RRADE x THE BASE — Rhythmic Resonance EP Release Show",
    slug: { _type: "slug", current: "rrade-the-base-rhythmic-resonance-2025" },
    summary:
      "Release-Show zur ersten EP von RRADE mit Vinyl- und Musikvideo-Premiere sowie Live-Performance im Programm der Base.",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Die Ankuendigung nennt eine EP-, Vinyl- und Musikvideo-Premiere sowie eine Live-Performance von RRADE und Celine.",
          },
        ],
      },
    ],
    status: "past",
    kind: "release-show",
    dateStart: "2025-11-29T19:00:00.000Z",
    location: "The Base, Aachen",
    externalUrl: "https://www.instagram.com/p/DRZD7eNjcom/",
  },
  {
    _id: "format-total-local",
    _type: "format",
    title: "Total Local",
    slug: { _type: "slug", current: "total-local" },
    summary:
      "Kollaboratives Ausstellungsformat rund um lokale künstlerische Positionen, Austausch und gemeinsame Praxis im Bunker of Art.",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Im öffentlichen Profil erscheint Total Local nicht nur als einzelne Ausstellung, sondern auch über eigene Artist-Announcement-Posts und Gestaltungscredits.",
          },
        ],
      },
    ],
    status: "active",
    externalUrl: "https://www.instagram.com/p/DXe58xqjcgO/",
    relatedEvents: [{ _type: "reference", _ref: "event-total-local-2026" }],
  },
  {
    _id: "format-aachener-kunstroute",
    _type: "format",
    title: "Aachener Kunstroute",
    slug: { _type: "slug", current: "aachener-kunstroute" },
    summary:
      "Wiederkehrende Beteiligung des Bunker of Art an der Aachener Kunstroute mit einem offenen Ausstellungsbeitrag aus dem Netzwerk der Base.",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Der Stationseintrag beschreibt den Bunker of Art und The Base als gemeinschaftlich gewachsenen Ausstellungsort innerhalb der Kunstroute und verweist darauf, dass der Ort seit 2020 Teil des Wochenendes ist.",
          },
        ],
      },
    ],
    status: "active",
    externalUrl: "https://www.aachenerkunstroute.de/?start=13",
  },
  {
    _id: "archive-total-local-artist-announcement-vol1-2026",
    _type: "archiveItem",
    title: "Total Local — Artist Announcement Vol. 1",
    slug: { _type: "slug", current: "total-local-artist-announcement-vol-1-2026" },
    typeLabel: "documentation",
    summary:
      "Erster Artist-Announcement-Post zu Total Local und Teil der öffentlichen Kommunikation rund um die Ausstellung.",
    date: "2026-04-28",
    externalUrl: "https://www.instagram.com/p/DXr4p0ojQNW/",
  },
  {
    _id: "archive-total-local-artist-announcement-vol2-2026",
    _type: "archiveItem",
    title: "Total Local — Artist Announcement Vol. 2",
    slug: { _type: "slug", current: "total-local-artist-announcement-vol-2-2026" },
    typeLabel: "documentation",
    summary:
      "Zweiter Artist-Announcement-Post zu Total Local und Fortsetzung der öffentlichen Dokumentation der beteiligten Positionen.",
    date: "2026-04-30",
    externalUrl: "https://www.instagram.com/p/DXxL0UEDeLM/",
  },
  {
    _id: "archive-open-call-exhibition-boa-2026",
    _type: "archiveItem",
    title: "Open Call for Exhibition at Bunker of Art",
    slug: { _type: "slug", current: "open-call-exhibition-bunker-of-art-2026" },
    typeLabel: "documentation",
    summary:
      "Open-Call-Post, der Künstler:innen zur Teilnahme an einer Ausstellung im Bunker of Art in Aachen einlädt.",
    date: "2026-04-07",
    externalUrl: "https://www.instagram.com/p/DW1kzgWjY_k/",
  },
  {
    _id: "archive-10-years-the-base-poster-2025",
    _type: "archiveItem",
    title: "The Base is turning 10 — Poster",
    slug: { _type: "slug", current: "the-base-is-turning-10-poster-2025" },
    typeLabel: "poster",
    summary:
      "Jubilaeumsposter zum zweitaegigen Zehn-Jahres-Programm mit Ausstellung, Live-Konzerten und weiteren Programmpunkten.",
    date: "2025-12-04",
    externalUrl: "https://www.instagram.com/p/DR2wOqtDR8h/",
  },
  {
    _id: "contributor-neutron-aung",
    _type: "contributor",
    name: "Neutron Aung",
    role: "Photography",
    summary:
      "Im öffentlichen Ausstellungs-Post von The Roots of All That Exists für die Fotografie genannt.",
  },
  {
    _id: "contributor-ranigerges",
    _type: "contributor",
    name: "ranigerges",
    role: "Graphic Design",
    summary:
      "Im Kontext von Total Local und den zugehörigen Artist-Announcements für Graphic Design genannt.",
  },
  {
    _id: "contributor-treesmerx",
    _type: "contributor",
    name: "treesmerx",
    role: "Poster Design",
    summary:
      "Im Jubiläumspost zum zehnjährigen Bestehen der Base für das Posterdesign genannt.",
  },
];

async function main() {
  console.log(`Seeding ${documents.length} Sanity documents...`);

  const transaction = client.transaction();

  for (const document of documents) {
    transaction.createOrReplace(document);
  }

  await transaction.commit();

  console.log("Sanity seed completed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
