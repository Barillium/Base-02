import type { StructureBuilder, StructureResolver } from "sanity/structure";

const STUDIO_API_VERSION = "2026-05-27";

function singletonItem(
  S: StructureBuilder,
  title: string,
  schemaType: string,
  documentId: string,
) {
  return S.listItem().title(title).child(S.document().schemaType(schemaType).documentId(documentId));
}

function documentListItem(
  S: StructureBuilder,
  title: string,
  schemaType: string,
  filter?: string,
) {
  const child = filter
    ? S.documentList()
        .title(title)
        .schemaType(schemaType)
        .apiVersion(STUDIO_API_VERSION)
        .filter(filter)
    : S.documentTypeList(schemaType).title(title);

  return S.listItem().title(title).child(child);
}

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("The Base Studio")
    .items([
      S.listItem()
        .title("Hauptseiten")
        .child(
          S.list()
            .title("Hauptseiten")
            .items([
              singletonItem(S, "Hauptseite", "homePage", "homePage"),
              singletonItem(S, "Live", "livePage", "livePage"),
              singletonItem(S, "Archive", "archivePage", "archivePage"),
              singletonItem(S, "Media", "mediaPage", "mediaPage"),
              singletonItem(S, "About", "aboutPage", "aboutPage"),
            ]),
        ),
      S.listItem()
        .title("Unterseiten")
        .child(
          S.list()
            .title("Unterseiten")
            .items([
              S.listItem()
                .title("About-Unterseiten")
                .child(
                  S.list()
                    .title("About-Unterseiten")
                    .items([
                      singletonItem(S, "The Base", "staticPage", "page.about-the-base"),
                      singletonItem(S, "Code of Conduct", "staticPage", "page.about-code-of-conduct"),
                      singletonItem(S, "Kontakt", "staticPage", "page.about-kontakt"),
                      singletonItem(
                        S,
                        "Fördermitgliedschaft",
                        "staticPage",
                        "page.about-foerdermitgliedschaft",
                      ),
                      singletonItem(S, "Mitmachen / Open Call", "staticPage", "page.mitmachen"),
                    ]),
                ),
              S.listItem()
                .title("Media-Unterseiten")
                .child(
                  S.list()
                    .title("Media-Unterseiten")
                    .items([
                      singletonItem(S, "Buchung", "staticPage", "page.media-buchung"),
                      singletonItem(S, "Produktionen", "staticPage", "page.media-produktionen"),
                    ]),
                ),
            ]),
        ),
      S.listItem()
        .title("Programm & Inhalte")
        .child(
          S.list()
            .title("Programm & Inhalte")
            .items([
              S.listItem()
                .title("Live")
                .child(
                  S.list()
                    .title("Live")
                    .items([
                      documentListItem(
                        S,
                        "Aktuelle und kommende Events",
                        "event",
                        `_type == "event" && (
                          status == "upcoming"
                          || (
                            !defined(status)
                            && defined(startDate)
                            && (
                              featuredCurrent == true
                              || (defined(endDate) && endDate >= now())
                              || (!defined(endDate) && startDate >= now())
                            )
                          )
                        )`,
                      ),
                      documentListItem(
                        S,
                        "Vergangene Events",
                        "event",
                        `_type == "event" && (
                          status == "past"
                          || (
                            !defined(status)
                            && defined(startDate)
                            && (
                              (defined(endDate) && endDate < now())
                              || (!defined(endDate) && startDate < now())
                            )
                          )
                        )`,
                      ),
                      documentListItem(
                        S,
                        "Archivierte Events",
                        "event",
                        `_type == "event" && status == "archived"`,
                      ),
                      documentListItem(
                        S,
                        "Aktive Formate",
                        "programmeSeries",
                        `_type == "programmeSeries" && coalesce(status, "active") == "active"`,
                      ),
                      documentListItem(
                        S,
                        "Pausierte Formate",
                        "programmeSeries",
                        `_type == "programmeSeries" && status == "paused"`,
                      ),
                      documentListItem(
                        S,
                        "Archivierte Formate",
                        "programmeSeries",
                        `_type == "programmeSeries" && status == "archived"`,
                      ),
                      documentListItem(S, "Alle Events", "event"),
                      documentListItem(S, "Alle Formate", "programmeSeries"),
                    ]),
                ),
              S.listItem()
                .title("Archive")
                .child(
                  S.list()
                    .title("Archive")
                    .items([
                      documentListItem(
                        S,
                        "Veröffentlichte Archiveinträge",
                        "archiveEntry",
                        `_type == "archiveEntry" && coalesce(status, "published") != "archived"`,
                      ),
                      documentListItem(
                        S,
                        "Archivierte Archiveinträge",
                        "archiveEntry",
                        `_type == "archiveEntry" && status == "archived"`,
                      ),
                      documentListItem(
                        S,
                        "Katalog",
                        "archiveEntry",
                        `_type == "archiveEntry" && archiveCategory == "catalogue" && coalesce(status, "published") != "archived"`,
                      ),
                      documentListItem(
                        S,
                        "Poster",
                        "archiveEntry",
                        `_type == "archiveEntry" && archiveCategory == "poster" && coalesce(status, "published") != "archived"`,
                      ),
                      documentListItem(S, "Alle Archiveinträge", "archiveEntry"),
                    ]),
                ),
              S.listItem()
                .title("Media")
                .child(
                  S.list()
                    .title("Media")
                    .items([
                      documentListItem(
                        S,
                        "Veröffentlichte Projekte",
                        "mediaProject",
                        `_type == "mediaProject" && coalesce(status, "published") != "archived"`,
                      ),
                      documentListItem(
                        S,
                        "Archivierte Projekte",
                        "mediaProject",
                        `_type == "mediaProject" && status == "archived"`,
                      ),
                      documentListItem(S, "Alle Projekte", "mediaProject"),
                    ]),
                ),
            ]),
        ),
      S.listItem()
        .title("Formulare")
        .child(
          S.list()
            .title("Formulare")
            .items([singletonItem(S, "Formulartexte", "formContent", "formContent")]),
        ),
      S.listItem()
        .title("Globale Inhalte")
        .child(
          S.list()
            .title("Globale Inhalte")
            .items([singletonItem(S, "Website", "siteSettings", "siteSettings")]),
        ),
    ]);
