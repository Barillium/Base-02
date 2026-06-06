import type { StructureResolver } from "sanity/structure";

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Setup")
        .child(
          S.list()
            .title("Setup")
            .items([
              S.listItem()
                .title("Site Settings")
                .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("Home")
        .child(S.documentTypeList("homeQuickLink").title("Home Quick Links")),
      S.listItem()
        .title("Live")
        .child(
          S.list()
            .title("Live")
            .items([
              S.documentTypeListItem("event").title("Events"),
              S.documentTypeListItem("format").title("Formats"),
            ]),
        ),
      S.listItem()
        .title("Archive")
        .child(S.documentTypeList("archiveItem").title("Archive Items")),
      S.listItem()
        .title("Talents")
        .child(
          S.list()
            .title("Talents")
            .items([
              S.documentTypeListItem("artist").title("Artists"),
              S.documentTypeListItem("dj").title("DJs"),
              S.documentTypeListItem("contributor").title("Contributors"),
            ]),
        ),
    ]);
