let keyIndex = 0;

function nextKey() {
  keyIndex += 1;
  return `key-${keyIndex}`;
}

function localizedString(de, en = de) {
  return { _type: "localizedString", de, en };
}

function localizedText(de, en = de) {
  return { _type: "localizedText", de, en };
}

function block(text) {
  return {
    _key: nextKey(),
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [
      {
        _key: nextKey(),
        _type: "span",
        marks: [],
        text,
      },
    ],
  };
}

function localizedBlocks(deParagraphs, enParagraphs = deParagraphs) {
  return {
    _type: "localizedBlocks",
    de: deParagraphs.map((paragraph) => block(paragraph)),
    en: enParagraphs.map((paragraph) => block(paragraph)),
  };
}

function editorialIntro({ eyebrow, title, displayTitle, description, note }) {
  return {
    _type: "editorialIntro",
    eyebrow: localizedString(eyebrow.de, eyebrow.en),
    title: localizedString(title.de, title.en),
    displayTitle: localizedText(displayTitle.de, displayTitle.en),
    description: localizedText(description.de, description.en),
    note: note ? localizedText(note.de, note.en) : undefined,
  };
}

function reference(_ref) {
  return { _key: nextKey(), _type: "reference", _ref };
}

function internalLink(internalPath) {
  return {
    _type: "linkField",
    kind: "internal",
    internalPath,
  };
}

function externalLink(externalUrl) {
  return {
    _type: "linkField",
    kind: "external",
    externalUrl,
  };
}

function teaserCard({ meta, title, description, ctaLabel, link, linkedDocument }) {
  return {
    _key: nextKey(),
    _type: "teaserCard",
    ...(meta ? { meta: localizedString(meta.de, meta.en) } : {}),
    title: localizedString(title.de, title.en),
    description: localizedText(description.de, description.en),
    ctaLabel: localizedString(ctaLabel?.de ?? "Weiter", ctaLabel?.en ?? "More"),
    ...(link ? { link } : {}),
    ...(linkedDocument ? { linkedDocument: { _type: "reference", _ref: linkedDocument } } : {}),
    isVisible: true,
  };
}

function teaserSection({ eyebrow, title, displayTitle, description, cards }) {
  return {
    _type: "teaserSection",
    ...(eyebrow ? { eyebrow: localizedString(eyebrow.de, eyebrow.en) } : {}),
    title: localizedString(title.de, title.en),
    ...(displayTitle ? { displayTitle: localizedText(displayTitle.de, displayTitle.en) } : {}),
    description: localizedText(description.de, description.en),
    cards,
    isVisible: true,
  };
}

function seoFields({ deTitle, deDescription, enTitle = deTitle, enDescription = deDescription, noIndex = false }) {
  return {
    _type: "seoFields",
    metaTitle: localizedString(deTitle, enTitle),
    metaDescription: localizedText(deDescription, enDescription),
    noIndex,
  };
}

function textLayout({ position = "default", alignment = "left" } = {}) {
  return {
    _type: "textLayoutOptions",
    position,
    alignment,
  };
}

export const documents = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    siteTitle: "The Base e.V.",
    associationStatement: localizedText(
      "Gemeinnütziger Kulturverein aus Aachen für Ausstellungen, Musik, Archivarbeit und kulturelle Infrastruktur im BOA Bunker of Art.",
      "Non-profit cultural association from Aachen for exhibitions, music, archive practice, and cultural infrastructure at the BOA Bunker of Art.",
    ),
    defaultSeo: seoFields({
      deTitle: "The Base e.V. im BOA Bunker of Art Aachen",
      enTitle: "The Base e.V. at the BOA Bunker of Art Aachen",
      deDescription:
        "The Base e.V. ist ein gemeinnütziger Kulturverein in Aachen mit Live-Programm, Archiv, Media und About-Inhalten aus dem BOA Bunker of Art.",
      enDescription:
        "The Base e.V. is a non-profit cultural association in Aachen with live programme, archive, media, and about content from the BOA Bunker of Art.",
    }),
    contactEmail: "info@thebase-ev.de",
    postalAddress: "The Base e.V.\nScheibenstraße 34\n52070 Aachen\nGermany",
    socialLinks: [
      { _key: nextKey(), label: "Instagram", url: "https://www.instagram.com/the.base.ev/" },
      { _key: nextKey(), label: "Facebook", url: "https://www.facebook.com/thebase.ev/" },
    ],
  },
  {
    _id: "homePage",
    _type: "homePage",
    internalTitle: "Homepage",
    statement: localizedText(
      "The Base e.V. ist ein 2015 in Aachen gegründeter Kulturverein, der den BOA Bunker of Art als sozialen und kulturellen Raum für Ausstellungen, Musik, Open Calls und dokumentierte Praxis entwickelt.",
      "The Base e.V. is a cultural association founded in Aachen in 2015 that develops the BOA Bunker of Art as a social and cultural space for exhibitions, music, open calls, and documented practice.",
    ),
    note: localizedText(
      "Die Startseite bleibt kuratiert: Sie zeigt ausgewählte Einstiege statt eines vollständigen Verzeichnisses.",
      "The homepage stays curated: it shows selected entry points instead of a complete index.",
    ),
    milestones: localizedBlocks(
      [
        "2015 in Aachen gegründet, um unabhängige kulturelle Strukturen vor Ort zu stärken.",
        "Seit 2020 im BOA / Bunker of Art mit Ausstellungen, Musik und kollektiven Formaten aktiv.",
        "Verbindet Kunst, Konzert, Veröffentlichung und Archiv statt enger Spartentrennung.",
      ],
      [
        "Founded in Aachen in 2015 to strengthen independent cultural structures locally.",
        "Active at BOA / Bunker of Art since 2020 with exhibitions, music, and collective formats.",
        "Connects art, concerts, releases, and archive practice rather than rigid categories.",
      ],
    ),
    quickLinks: [
      {
        _key: "current-event",
        label: localizedString("Aktuell", "Current"),
        title: localizedString("Aktuelle Veranstaltung", "Current event"),
        description: localizedText(
          "Zieht den Titel und Kurztext der aktuell markierten Veranstaltung automatisch in die Startseite.",
          "Automatically pulls the title and short text of the event marked as current onto the homepage.",
        ),
        linkedDocument: { _type: "reference", _ref: "event-the-roots-of-all-that-exists-2026" },
        order: 0,
        isActive: true,
      },
      {
        _key: "ongoing-formats",
        label: localizedString("Nächster Termin", "Next date"),
        title: localizedString("Laufende Formate", "Ongoing formats"),
        description: localizedText(
          "Wiederkehrende Reihen und offene Programmlinien von The Base.",
          "Recurring series and open programme lines by The Base.",
        ),
        link: internalLink("/live/laufende-formate"),
        order: 1,
        isActive: true,
      },
      {
        _key: "past-events",
        label: localizedString("Letzte Projekte", "Latest projects"),
        title: localizedString("Vergangene Veranstaltungen", "Past events"),
        description: localizedText(
          "Rückblick auf dokumentierte Veranstaltungen und Ausstellungen.",
          "Retrospective of documented events and exhibitions.",
        ),
        link: internalLink("/live/events"),
        order: 2,
        isActive: true,
      },
    ],
    featuredAbout: [
      reference("page.about-the-base"),
      reference("page.mitmachen"),
      reference("page.about-code-of-conduct"),
    ],
    seo: seoFields({
      deTitle: "The Base e.V. | Kulturverein im BOA Bunker of Art Aachen",
      enTitle: "The Base e.V. | Cultural association at the BOA Bunker of Art Aachen",
      deDescription:
        "Startseite von The Base e.V. mit kuratierten Einstiegen in aktuelle Veranstaltungen, Formate und Hintergründe aus dem BOA Bunker of Art in Aachen.",
      enDescription:
        "Homepage of The Base e.V. with curated entry points into current events, formats, and context from the BOA Bunker of Art in Aachen.",
    }),
  },
  {
    _id: "aboutPage",
    _type: "aboutPage",
    intro: editorialIntro({
      eyebrow: { de: "About", en: "About" },
      title: {
        de: "The Base e.V. im BOA Bunker of Art",
        en: "The Base e.V. at the BOA Bunker of Art",
      },
      displayTitle: {
        de: "The Base e.V.\nim BOA Bunker\nof Art",
        en: "The Base e.V.\nat the BOA Bunker\nof Art",
      },
      description: {
        de: "The Base e.V. ist ein gemeinnütziger Kulturverein und interdisziplinäres Kollektiv in Aachen. Im BOA Bunker of Art organisiert der Verein einen sozialen und kulturellen Raum für Austausch, künstlerische Praxis und öffentliche Formate.",
        en: "The Base e.V. is a non-profit cultural association and interdisciplinary collective in Aachen. At the BOA Bunker of Art, it organises a social and cultural space for exchange, artistic practice, and public formats.",
      },
      note: {
        de: "Ausstellungen, Musik, Workshops und kollaborative Formate verbinden den Ort mit der lokalen Szene und mit überregionalen Zusammenhängen.",
        en: "Exhibitions, music, workshops, and collaborative formats connect the space to the local scene and to wider contexts.",
      },
    }),
    profileEyebrow: localizedString("Kurzprofil", "Profile"),
    profileTitle: localizedText(
      "Kulturort,\nVerein und\nInfrastruktur",
      "Site,\nassociation and\ninfrastructure",
    ),
    profileText: localizedBlocks(
      [
        "The Base e.V. wurde 2015 in Aachen gegründet und arbeitet als Kollektiv junger Kulturarbeiter:innen, Gestalter:innen und Organisator:innen. Ziel ist es, unabhängige kulturelle Strukturen vor Ort zu stärken.",
        "Ein zentrales Projekt ist BOA, ein seit September 2020 entwickelter Kulturraum in einem ehemaligen Hochbunker. Dort begegnen sich regionale, nationale und internationale Positionen sowie junge und etablierte Praktiker:innen.",
        "Im Mittelpunkt stehen offene, niedrigschwellige Formate an der Schnittstelle von Kunst, Musik, Design und sozialer Praxis. Der Bunker wird dabei nicht nur genutzt, sondern als historisch und städtisch geprägter Ort bewusst weitergedacht.",
      ],
      [
        "The Base e.V. was founded in Aachen in 2015 and works as a collective of young cultural practitioners, creatives, and organisers. Its aim is to strengthen independent cultural structures locally.",
        "A key project is BOA, a cultural space developed since September 2020 inside a former bunker. It brings together regional, national, and international positions alongside emerging and established practitioners.",
        "Its work centres on open, low-threshold formats at the intersection of art, music, design, and social practice. The bunker is not simply used as a venue, but deliberately developed further as a historically and urbanistically marked space.",
      ],
    ),
    profileTextLayout: textLayout({ position: "centered", alignment: "left" }),
    baseTeaserSection: teaserSection({
      eyebrow: { de: "Base", en: "Base" },
      title: { de: "The Base", en: "The Base" },
      description: {
        de: "Zur Geschichte des Vereins und zur Rolle des Bunkers als kulturelle und soziale Infrastruktur in Aachen.",
        en: "For everyone who wants to understand why the bunker continues as social and cultural infrastructure.",
      },
      cards: [
        teaserCard({
          meta: { de: "Profil", en: "Profile" },
          title: { de: "Profil und Geschichte", en: "Profile and history" },
          description: {
            de: "Zur Geschichte des Vereins und zur Entwicklung des ehemaligen Bunkers als Kulturort.",
            en: "Context for the association, its history, and the role of the former bunker as a cultural space.",
          },
          linkedDocument: "page.about-the-base",
        }),
      ],
    }),
    inquiryTeaserSection: teaserSection({
      eyebrow: { de: "About", en: "About" },
      title: { de: "Anfragen", en: "Inquiries" },
      description: {
        de: "Für Ausstellungsvorschläge, andere Formate und Menschen, die den Ort ideell oder finanziell unterstützen möchten.",
        en: "For exhibition proposals, artistic formats, open calls, and people who want to support the site ideologically or financially.",
      },
      cards: [
        teaserCard({
          meta: { de: "Open Call", en: "Open call" },
          title: { de: "Open Call", en: "Open call" },
          description: {
            de: "Anfragen für Ausstellungen, ortsspezifische Arbeiten und andere Formate im BOA-Kontext.",
            en: "Inquiry for exhibitions, site-specific works, and other formats that could be developed or presented in the BOA context.",
          },
          linkedDocument: "page.mitmachen",
        }),
        teaserCard({
          meta: { de: "Unterstützen", en: "Support" },
          title: { de: "Fördermitglied werden", en: "Become a supporting member" },
          description: {
            de: "Informationen zur Fördermitgliedschaft für Menschen und Organisationen, die die Arbeit des Vereins in Aachen regelmäßig unterstützen möchten.",
            en: "Information on support membership for people and organisations who want to support the association's work in Aachen on a recurring basis.",
          },
          linkedDocument: "page.about-foerdermitgliedschaft",
        }),
      ],
    }),
    awarenessTeaserSection: teaserSection({
      eyebrow: { de: "Safe Space", en: "Safe Space" },
      title: { de: "Awareness", en: "Awareness" },
      description: {
        de: "Für Grundsätze, die Publikum, Teams und Beteiligten im gemeinsamen Raum Orientierung geben.",
        en: "For principles that orient events, teams, and audience within the shared space.",
      },
      cards: [
        teaserCard({
          meta: { de: "Leitfaden", en: "Guideline" },
          title: { de: "Code of Conduct", en: "Code of conduct" },
          description: {
            de: "Grundsätze für Awareness, respektvolle Räume und diskriminierungssensible Veranstaltungskultur.",
            en: "Principles for awareness, respectful spaces, and discrimination-sensitive event culture.",
          },
          linkedDocument: "page.about-code-of-conduct",
        }),
      ],
    }),
    seo: seoFields({
      deTitle: "About The Base e.V. im BOA Bunker of Art Aachen",
      enTitle: "About The Base e.V. at the BOA Bunker of Art Aachen",
      deDescription:
        "Über The Base e.V. in Aachen: Profil, Geschichte, kulturelle Infrastruktur und die Arbeit im BOA Bunker of Art.",
      enDescription:
        "About The Base e.V. in Aachen: profile, history, cultural infrastructure, and the work at the BOA Bunker of Art.",
    }),
  },
  {
    _id: "livePage",
    _type: "livePage",
    internalTitle: "Live",
    intro: editorialIntro({
      eyebrow: { de: "Live", en: "Live" },
      title: { de: "Live-Programm in Aachen", en: "Live programme in Aachen" },
      displayTitle: { de: "Live-Programm\nin Aachen", en: "Live programme\nin Aachen" },
      description: {
        de: "Der Live-Bereich bündelt Ausstellungen, Veranstaltungen und wiederkehrende Formate im BOA Bunker of Art und macht aktuelle sowie vergangene Programmpunkte lesbar.",
        en: "The live area brings together exhibitions, events, and recurring formats at the BOA Bunker of Art and makes current and past programme points legible.",
      },
    }),
    currentSection: teaserSection({
      eyebrow: { de: "Aktuell", en: "Current" },
      title: { de: "Aktuelle Veranstaltung", en: "Current event" },
      displayTitle: { de: "Aktuelle\nVeranstaltung", en: "Current\nevent" },
      description: {
        de: "Hier landet jeweils die aktuelle Veranstaltung, ob Ausstellung, Konzert oder ein anderes Format im Programm.",
        en: "This section highlights the current event, whether it is an exhibition, concert, or another programme format.",
      },
      cards: [
        teaserCard({
          meta: { de: "Aktuell", en: "Current" },
          title: { de: "Aktuelle Veranstaltung", en: "Current event" },
          description: {
            de: "Hier steht jeweils die aktuelle Veranstaltung, egal ob Ausstellung, Konzert oder ein anderes Format.",
            en: "The current event appears here, whether it is an exhibition, concert, or another format.",
          },
          link: externalLink("https://www.instagram.com/the.base.ev/"),
        }),
      ],
    }),
    archiveSection: teaserSection({
      eyebrow: { de: "Rückblick", en: "Retrospective" },
      title: { de: "Eventarchiv", en: "Event archive" },
      displayTitle: { de: "Eventarchiv", en: "Event archive" },
      description: {
        de: "Das Eventarchiv führt zu einer Übersicht vergangener Veranstaltungen und versammelt Rückblicke auf Ausstellungen, Konzerte und Sonderformate.",
        en: "The event archive leads to an overview of past events and gathers retrospectives on exhibitions, concerts, and special formats.",
      },
      cards: [
        teaserCard({
          meta: { de: "Archiv", en: "Archive" },
          title: { de: "Übersicht vergangener Veranstaltungen", en: "Past events overview" },
          description: {
            de: "Hier liegen Rückblicke auf vergangene Veranstaltungen wie Total Local, 10 Jahre The Base oder Release-Shows im Umfeld des BOA.",
            en: "This section gathers past events such as Total Local, 10 years of The Base, or release shows around the BOA.",
          },
          link: internalLink("/live/events"),
        }),
      ],
    }),
    formatsSection: teaserSection({
      eyebrow: { de: "Laufend", en: "Ongoing" },
      title: { de: "Laufende Formate", en: "Ongoing formats" },
      displayTitle: { de: "Laufende\nFormate", en: "Ongoing\nformats" },
      description: {
        de: "Hier werden wiederkehrende Programmlinien wie Total Local oder die Beteiligung an der Aachener Kunstroute gebündelt.",
        en: "Recurring programme lines such as Total Local or the involvement in the Aachener Kunstroute are gathered here.",
      },
      cards: [
        teaserCard({
          meta: { de: "Übersicht", en: "Overview" },
          title: { de: "Laufende Formate", en: "Ongoing formats" },
          description: {
            de: "Die Übersicht bündelt wiederkehrende Reihen wie Total Local und die Beteiligung an der Aachener Kunstroute.",
            en: "This overview gathers recurring strands such as Total Local and the contribution to the Aachener Kunstroute.",
          },
          link: internalLink("/live/laufende-formate"),
        }),
      ],
    }),
    seo: seoFields({
      deTitle: "Live-Programm in Aachen: Ausstellungen, Konzerte und Workshops",
      enTitle: "Live programme in Aachen: exhibitions, concerts, and workshops",
      deDescription:
        "Das Live-Programm von The Base e.V. in Aachen bündelt Ausstellungen, Konzerte, Workshops und weitere Termine im BOA Bunker of Art.",
      enDescription:
        "The live programme of The Base e.V. in Aachen brings together exhibitions, concerts, workshops, and further dates at the BOA Bunker of Art.",
    }),
  },
  {
    _id: "archivePage",
    _type: "archivePage",
    internalTitle: "Archive",
    intro: editorialIntro({
      eyebrow: { de: "Archive", en: "Archive" },
      title: { de: "Archiv für Kunst, Poster und Projekte", en: "Archive for art, posters, and projects" },
      displayTitle: { de: "Archiv für Kunst,\nPoster und\nProjekte", en: "Archive for art,\nposters and\nprojects" },
      description: {
        de: "Das Archiv versammelt Arbeiten, Spuren, Dokumentation und Rückblicke aus Ausstellungen, Open Calls und anderen öffentlichen Zusammenhängen der Base.",
        en: "The archive gathers works, traces, documentation, and retrospectives from exhibitions, open calls, and other public contexts of The Base.",
      },
    }),
    catalogueSection: teaserSection({
      eyebrow: { de: "Sammlung", en: "Collection" },
      title: { de: "Katalog", en: "Catalogue" },
      description: {
        de: "Arbeiten, Texte, Credits und Kontexte, die den Weg einzelner Projekte lesbar machen.",
        en: "Works, texts, credits, and contexts that make the path of individual projects legible.",
      },
      cards: [
        teaserCard({
          meta: { de: "Katalog", en: "Catalogue" },
          title: { de: "Kunstkatalog", en: "Art catalogue" },
          description: {
            de: "Arbeiten, Texte, Credits und Materialien, die einzelne Projekte in ihrem Zusammenhang lesbar machen.",
            en: "Works, texts, credits, and materials that make individual projects legible in their context.",
          },
          link: internalLink("/archive/kunstkatalog"),
        }),
      ],
    }),
    posterSection: teaserSection({
      eyebrow: { de: "Projekte", en: "Projects" },
      title: { de: "Poster", en: "Posters" },
      description: {
        de: "Grafische Spuren, Ankündigungen und visuelle Arbeiten aus dem Umfeld der Veranstaltungen und Ausstellungen.",
        en: "Graphic traces, announcements, and visual works from the context of events and exhibitions.",
      },
      cards: [
        teaserCard({
          meta: { de: "Poster", en: "Poster" },
          title: { de: "Posterarchiv", en: "Poster archive" },
          description: {
            de: "Grafische Spuren, Ankündigungen und visuelle Arbeiten aus dem Umfeld der Base.",
            en: "Graphic traces, announcements, and visual works from the context of The Base.",
          },
          link: internalLink("/archive/poster"),
        }),
      ],
    }),
    seo: seoFields({
      deTitle: "Archiv für Kunst, Poster und Projekte im BOA Bunker of Art",
      enTitle: "Archive for art, posters, and projects at the BOA Bunker of Art",
      deDescription:
        "Archiv von The Base e.V. Aachen mit Kunstkatalog, Poster-Archiv und Veranstaltungsdokumentation aus dem BOA Bunker of Art.",
      enDescription:
        "Archive of The Base e.V. Aachen with art catalogue, poster archive, and event documentation from the BOA Bunker of Art.",
    }),
  },
  {
    _id: "mediaPage",
    _type: "mediaPage",
    internalTitle: "Media",
    intro: editorialIntro({
      eyebrow: { de: "Media", en: "Media" },
      title: { de: "Medienproduktion im Bunker of Art", en: "Media production at the Bunker of Art" },
      displayTitle: { de: "Medienproduktion\nim Bunker\nof Art", en: "Media production\nat the Bunker\nof Art" },
      description: {
        de: "Klang, Raum, Zusammenarbeit und Dokumentation: Media bündelt die Arbeiten, die im BOA zwischen Fotografie, Grafik, Mitschnitt und Bewegtbild entstehen.",
        en: "Sound, space, collaboration, and documentation: Media gathers the works that emerge at the BOA between photography, graphics, recordings, and moving image.",
      },
      note: {
        de: "Sichtbar werden diese Arbeiten vor allem dort, wo sie das laufende Programm begleiten, dokumentieren oder nach außen lesbar machen.",
        en: "These works become visible above all where they accompany, document, or make the ongoing programme legible outwardly.",
      },
    }),
    mainSection: teaserSection({
      eyebrow: { de: "Media", en: "Media" },
      title: { de: "Raum, Klang und Bild", en: "Space, sound, and image" },
      displayTitle: { de: "Raum, Klang\nund Bild", en: "Space, sound\nand image" },
      description: {
        de: "Ein Einstieg in den Ort als Produktionszusammenhang und in die Arbeiten, die dort bereits sichtbar geworden sind.",
        en: "An entry point into the space as a site of production and into the works that have already become visible there.",
      },
      cards: [
        teaserCard({
          meta: { de: "Anfrage", en: "Enquiry" },
          title: { de: "Medienproduktion buchen", en: "Book media production" },
          description: {
            de: "Informationen für Anfragen rund um Foto, Video, Mitschnitt und dokumentarische Formate im Zusammenhang mit dem Ort und seinem Programm.",
            en: "Information for enquiries around photo, video, recording, and documentary formats connected to the site and its programme.",
          },
          linkedDocument: "page.media-buchung",
        }),
        teaserCard({
          meta: { de: "Projekte", en: "Projects" },
          title: { de: "Externe Medienprojekte", en: "External media projects" },
          description: {
            de: "Filme, Sessions und dokumentarische Beiträge externer Teams, die im BOA gedreht wurden oder den Ort als Produktionskontext nutzen.",
            en: "Films, sessions, and documentary works by external teams that were shot at BOA or use the site as a production context.",
          },
          linkedDocument: "page.media-produktionen",
        }),
      ],
    }),
    seo: seoFields({
      deTitle: "Media bei The Base e.V.: Foto, Video und Mitschnitte",
      enTitle: "Media at The Base e.V.: photo, video, and recordings",
      deDescription:
        "Media bei The Base e.V.: Foto, Video, Mitschnitte und Anfragen rund um dokumentarische Produktionen im BOA Bunker of Art.",
      enDescription:
        "Media at The Base e.V.: photo, video, recordings, and enquiries around documentary productions at the BOA Bunker of Art.",
    }),
  },
  {
    _id: "formContent",
    _type: "formContent",
    internalTitle: "Formulare",
    newsletterForm: {
      _type: "newsletterFormCopy",
      label: localizedString("Newsletter", "Newsletter"),
      description: localizedText(
        "Updates zu Ausstellungen, Konzerten und Workshops.",
        "Updates on exhibitions, concerts, and workshops.",
      ),
      emailPlaceholder: localizedString("E-Mail-Adresse", "Email address"),
      submitLabel: localizedString("Anmelden", "Sign up"),
    },
    mediaBookingForm: {
      _type: "mediaBookingFormCopy",
      sectionLabel: localizedString("Kontaktformular", "Contact form"),
      title: localizedString("Produktionsanfrage", "Production inquiry"),
      intro: localizedText(
        "Trag hier die geplante Produktion, Eckdaten, beteiligte Partner, Förderungen und technische Anforderungen ein. Beim Absenden öffnet sich dein Mailprogramm mit einer vorausgefüllten Anfrage an unser Team.",
        "Enter the planned production, key details, involved partners, funding, and technical requirements. On submit, your email app opens with a prefilled inquiry to our team.",
      ),
      contactHeading: localizedString("Kontakt", "Contact"),
      productionHeading: localizedString("Produktion", "Production"),
      parametersHeading: localizedString("Rahmen", "Parameters"),
      requirementsHeading: localizedString("Anforderungen / Hinweise", "Requirements / notes"),
      contactNameLabel: localizedString("Ansprechperson*", "Contact person*"),
      organisationLabel: localizedString("Organisation / Kollektiv", "Organisation / collective"),
      emailLabel: localizedString("E-Mail*", "Email*"),
      phoneLabel: localizedString("Telefon", "Phone"),
      plannedProductionLabel: localizedString("Geplante Produktion*", "Planned production*"),
      preferredPeriodLabel: localizedString("Gewünschter Zeitraum", "Preferred period"),
      partnersLabel: localizedString("Partner", "Partners"),
      fundingLabel: localizedString("Förderungen / Finanzierung", "Funding / financing"),
      technicalRequirementsLabel: localizedString("Technische Anforderungen", "Technical requirements"),
      contextLabel: localizedString("Kontext / Vorhaben", "Context / proposal"),
      requiredFieldNote: localizedText("Bitte fülle alle Pflichtfelder aus.", "Please fill in all required fields."),
      submitLabel: localizedString("Anfrage per Mail vorbereiten", "Prepare enquiry by email"),
      errorMessage: localizedText("Bitte fülle alle Pflichtfelder aus.", "Please fill in all required fields."),
    },
    mitmachenForm: {
      _type: "mitmachenFormCopy",
      sectionLabel: localizedString("Kontaktformular", "Contact form"),
      title: localizedString("Anfrage", "Inquiry"),
      intro: localizedText(
        "Schick uns deine Kontaktdaten, inhaltlichen Schwerpunkte und ein paar Hinweise zu deinem Vorhaben. Beim Absenden öffnet sich dein Mailprogramm mit einer vorausgefüllten Nachricht an unser Team.",
        "Send us your contact details, areas of interest, and a few notes about your proposal. On submit, your email app opens with a prefilled message to our team.",
      ),
      contactHeading: localizedString("Kontakt", "Contact"),
      focusHeading: localizedString("Schwerpunkte", "Focus"),
      contextHeading: localizedString("Kontext / Anfrage", "Context / inquiry"),
      nameLabel: localizedString("Name*", "Name*"),
      emailLabel: localizedString("E-Mail*", "Email*"),
      phoneLabel: localizedString("Telefon", "Phone"),
      cityLabel: localizedString("Ort", "City"),
      interestsLabel: localizedString("Interessen*", "Interests*"),
      experienceLabel: localizedString("Praxis, Kontext oder Bezug zum Vorhaben", "Practice, context, or connection to the proposal"),
      ideaLabel: localizedString("Vorhaben / Format / Anfrage", "Proposal / format / inquiry"),
      requiredFieldNote: localizedText("Bitte fülle Name und E-Mail aus.", "Please fill in name and email."),
      submitLabel: localizedString("Anfrage per Mail vorbereiten", "Prepare inquiry by email"),
      interestErrorMessage: localizedText("Bitte wähle mindestens ein Interessensfeld aus.", "Please select at least one field of interest."),
      requiredErrorMessage: localizedText("Bitte fülle Name und E-Mail aus.", "Please fill in name and email."),
    },
    supportMembershipForm: {
      _type: "supportMembershipFormCopy",
      sectionLabel: localizedString("Antrag", "Application"),
      title: localizedString("Fördermitgliedschaft", "Support membership"),
      intro: localizedText(
        "Schick uns deine Angaben über das Formular. Wir melden uns anschließend mit den nächsten Schritten zur Aufnahme, zu den Beiträgen und zu den Unterlagen.",
        "Send us your details via the form. We will follow up with the next steps regarding admission, contributions, and documents.",
      ),
      contactHeading: localizedString("Kontakt", "Contact"),
      membershipHeading: localizedString("Mitgliedschaft", "Membership"),
      motivationHeading: localizedString("Motivation / Rückfragen", "Motivation / questions"),
      confirmationHeading: localizedString("Bestätigung", "Confirmation"),
      nameLabel: localizedString("Name / Organisation*", "Name / organisation*"),
      emailLabel: localizedString("E-Mail*", "Email*"),
      phoneLabel: localizedString("Telefon", "Phone"),
      cityLabel: localizedString("Ort", "City"),
      memberTypeLabel: localizedString("Antrag als*", "Applying as*"),
      contributionCycleLabel: localizedString("Beitragsrhythmus*", "Contribution cycle*"),
      motivationLabel: localizedString("Motivation / Bezug", "Motivation / context"),
      noteLabel: localizedString("Nachricht / Rückfragen", "Message / questions"),
      requiredFieldNote: localizedText(
        "Bitte fülle Name beziehungsweise Organisation und E-Mail aus.",
        "Please fill in name or organisation and email.",
      ),
      submitLabel: localizedString("Antrag per Mail vorbereiten", "Prepare request by email"),
      requiredErrorMessage: localizedText(
        "Bitte fülle Name beziehungsweise Organisation und E-Mail aus.",
        "Please fill in name or organisation and email.",
      ),
      membershipErrorMessage: localizedText(
        "Bitte wähle Antragsform und Beitragsrhythmus aus.",
        "Please choose applicant type and contribution cycle.",
      ),
      confirmationErrorMessage: localizedText(
        "Bitte bestätige die Hinweise zur Fördermitgliedschaft.",
        "Please confirm the support membership notes.",
      ),
    },
  },
  {
    _id: "page.about-the-base",
    _type: "staticPage",
    routeKey: "about-the-base",
    intro: editorialIntro({
      eyebrow: { de: "About", en: "About" },
      title: { de: "The Base", en: "The Base" },
      displayTitle: { de: "The Base", en: "The Base" },
      description: {
        de: "The Base e.V. entwickelt den BOA Bunker of Art in Aachen als Kulturplattform für zeitgenössische Kunst, Musik, Design und kollektive Praxis.",
        en: "The Base e.V. develops the BOA Bunker of Art in Aachen as a cultural platform for contemporary art, music, design, and collective practice.",
      },
      note: {
        de: "Die Arbeit reicht von Ausstellungen und Konzerten bis zu Open Calls, Workshops und langfristiger kultureller Infrastruktur.",
        en: "Its work ranges from exhibitions and concerts to open calls, workshops, and long-term cultural infrastructure.",
      },
    }),
    keyPoints: [
      { _key: nextKey(), ...localizedString("Kulturplattform im ehemaligen Bunker an der Scheibenstraße 34 in Aachen.", "Cultural platform in the former bunker at Scheibenstraße 34 in Aachen.") },
      { _key: nextKey(), ...localizedString("Verbindet Kunst, Musik und kulturelle Praxis statt enger Spartentrennung.", "Connects art, music, and cultural practice beyond narrow category boundaries.") },
      { _key: nextKey(), ...localizedString("Arbeitet mit Künstler:innen, Musiker:innen und Initiativen in offenen Formaten.", "Works with artists, musicians, and initiatives in open formats.") },
      { _key: nextKey(), ...localizedString("Denkt den Raum als soziale Infrastruktur, nicht nur als Event-Location.", "Treats the space as social infrastructure, not only as an event venue.") },
      { _key: nextKey(), ...localizedString("Schafft Begegnung zwischen Menschen unterschiedlicher Hintergründe und kultureller Zusammenhänge.", "Creates encounters between people from different backgrounds and cultural contexts.") },
    ],
    body: localizedBlocks(
      [
        "Der geschichtsträchtige Bunker wird nicht überdeckt, sondern bewusst als realer Kontext genutzt. Die Gemeinschaft füllt den Ort mit Ausstellungen, Konzerten, Open Calls, Workshops und kollaborativen Produktionen.",
        "Ziel ist es, unterschiedliche kulturelle Positionen und Interessierte zusammenzubringen, Netzwerke zu stärken und kreative Impulse in eine langfristige kulturelle Infrastruktur zu überführen.",
      ],
      [
        "The historical bunker is not concealed but intentionally used as a real context. The community fills the space with exhibitions, concerts, open calls, workshops, and collaborative productions.",
        "The goal is to bring together different cultural positions and interested people, strengthen networks, and turn creative impulses into long-term cultural infrastructure.",
      ],
    ),
    bodyLayout: textLayout({ position: "centered", alignment: "left" }),
    seo: seoFields({
      deTitle: "The Base | Kulturort und Verein in Aachen",
      enTitle: "The Base | Cultural site and association in Aachen",
      deDescription:
        "Profilseite zu The Base e.V., dem BOA Bunker of Art und der Entwicklung des Ortes als kulturelle und soziale Infrastruktur in Aachen.",
      enDescription:
        "Profile page about The Base e.V., the BOA Bunker of Art, and the development of the site as cultural and social infrastructure in Aachen.",
    }),
  },
  {
    _id: "page.about-code-of-conduct",
    _type: "staticPage",
    routeKey: "about-code-of-conduct",
    intro: editorialIntro({
      eyebrow: { de: "Awareness", en: "Awareness" },
      title: { de: "Code of Conduct", en: "Code of conduct" },
      displayTitle: { de: "Code of Conduct", en: "Code of conduct" },
      description: {
        de: "Der Code of Conduct beschreibt, wie The Base Veranstaltungen, Workshops und Produktionen diskriminierungssensibel, respektvoll und zugänglich gestalten will.",
        en: "The code of conduct describes how The Base wants to shape events, workshops, and productions in a discrimination-sensitive, respectful, and accessible way.",
      },
      note: {
        de: "Awareness ist keine Zusatzleistung, sondern Teil der Infrastruktur: Sie betrifft Einlass, Kommunikation, Team, Publikum und die Nutzung des Raums.",
        en: "Awareness is not an add-on but part of the infrastructure: it concerns entry, communication, team, audience, and use of the space.",
      },
    }),
    keyPoints: [
      { _key: nextKey(), ...localizedString("Awareness ist Teil der Infrastruktur und betrifft Team, Publikum, Einlass und Kommunikation.", "Awareness is part of the infrastructure and concerns team, audience, entry, and communication.") },
      { _key: nextKey(), ...localizedString("Diskriminierendes, übergriffiges oder grenzverletzendes Verhalten wird nicht toleriert.", "Discriminatory, abusive, or boundary-crossing behaviour is not tolerated.") },
      { _key: nextKey(), ...localizedString("Rücksicht, Zustimmung und respektvoller Umgang sind Grundlage aller Formate.", "Consideration, consent, and respectful conduct are the basis of all formats.") },
      { _key: nextKey(), ...localizedString("Probleme sollen früh angesprochen werden, damit das Team unterstützen und reagieren kann.", "Problems should be addressed early so the team can support and respond.") },
    ],
    body: localizedBlocks(
      [
        "The Base versteht Awareness als praktische Voraussetzung für gemeinsame kulturelle Räume. Das betrifft Sprache, Verhalten, Nähe und Distanz, Barrieren, Zugänge und die Art, wie Verantwortung im Team übernommen wird.",
        "Wer Unterstützung braucht oder problematisches Verhalten beobachtet, kann sich direkt an das Team wenden. Ziel ist ein Raum, in dem Konflikte ernst genommen und Menschen nicht allein gelassen werden.",
      ],
      [
        "The Base understands awareness as a practical condition for shared cultural spaces. This concerns language, behaviour, proximity and distance, barriers, access, and how responsibility is taken within the team.",
        "Anyone who needs support or witnesses problematic behaviour can speak directly to the team. The goal is a space in which conflicts are taken seriously and people are not left alone.",
      ],
    ),
    bodyLayout: textLayout({ position: "centered", alignment: "left" }),
    seo: seoFields({
      deTitle: "Code of Conduct und Awareness bei The Base e.V.",
      enTitle: "Code of conduct and awareness at The Base e.V.",
      deDescription:
        "Awareness-Grundsätze von The Base e.V. für respektvolle, diskriminierungssensible und zugängliche Veranstaltungen im BOA Bunker of Art Aachen.",
      enDescription:
        "Awareness principles of The Base e.V. for respectful, discrimination-sensitive, and accessible events at the BOA Bunker of Art Aachen.",
    }),
  },
  {
    _id: "page.about-kontakt",
    _type: "staticPage",
    routeKey: "about-kontakt",
    intro: editorialIntro({
      eyebrow: { de: "About", en: "About" },
      title: { de: "Kontakt", en: "Contact" },
      displayTitle: { de: "Kontakt", en: "Contact" },
      description: {
        de: "Diese Seite sammelt die direkten Kontaktwege für Programmfragen, Presse, Kooperationen, Workshops, Raumanfragen und Besuch im BOA Bunker of Art Aachen.",
        en: "This page brings together direct contact paths for programme questions, press, collaborations, workshops, space requests, and visits to the BOA Bunker of Art Aachen.",
      },
      note: {
        de: "Öffnungszeiten sind programmabhängig und werden laufend über Live, Archive und Social Updates veröffentlicht.",
        en: "Opening hours depend on the programme and are published continuously via Live, Archive, and social updates.",
      },
    }),
    keyPoints: [
      { _key: nextKey(), ...localizedString("Allgemeine Anfragen zu Programm, Ort und Verein", "General inquiries about programme, space, and association") },
      { _key: nextKey(), ...localizedString("Presse, Kooperationen und Produktionsanfragen", "Press, collaborations, and production inquiries") },
      { _key: nextKey(), ...localizedString("Besuch, Raumnutzung und programmspezifische Abstimmungen", "Visits, space use, and programme-specific coordination") },
    ],
    body: localizedBlocks(
      [
        "Für programmbezogene, organisatorische oder redaktionelle Anfragen ist die allgemeine Kontaktadresse der richtige Ausgangspunkt. Von dort aus werden Themen intern an die passenden Personen oder Teams weitergegeben.",
        "Aktuelle Öffnungen und Termine richten sich nach dem jeweiligen Programm und werden auf der Website sowie über die Social-Kanäle veröffentlicht.",
      ],
      [
        "For programme-related, organisational, or editorial inquiries, the general contact address is the right starting point. From there, topics are passed on internally to the appropriate people or teams.",
        "Current openings and dates depend on the programme and are announced on the website as well as through the social channels.",
      ],
    ),
    bodyLayout: textLayout({ position: "centered", alignment: "left" }),
    seo: seoFields({
      deTitle: "Kontakt zu The Base e.V. in Aachen",
      enTitle: "Contact The Base e.V. in Aachen",
      deDescription:
        "Kontaktseite von The Base e.V. mit Adresse, E-Mail und Hinweisen zu Programmfragen, Kooperationen und Besuchen im BOA Bunker of Art.",
      enDescription:
        "Contact page for The Base e.V. with address, email, and notes for programme questions, collaborations, and visits to the BOA Bunker of Art.",
    }),
  },
  {
    _id: "page.about-foerdermitgliedschaft",
    _type: "staticPage",
    routeKey: "about-foerdermitgliedschaft",
    intro: editorialIntro({
      eyebrow: { de: "About", en: "About" },
      title: { de: "Fördermitglied werden", en: "Become a supporting member" },
      displayTitle: { de: "Fördermitglied\nwerden", en: "Become a\nsupporting member" },
      description: {
        de: "Diese Seite richtet sich an Menschen und Organisationen, die die Arbeit von The Base e.V. in Aachen als Fördermitglied dauerhaft mittragen möchten.",
        en: "This page is for people and organisations who want to support the work of The Base e.V. in Aachen as supporting members over time.",
      },
      note: {
        de: "Die Angaben orientieren sich an der Satzung des Vereins und bündeln die grundlegenden Schritte für eine Anfrage zur Fördermitgliedschaft.",
        en: "The information follows the association's statutes and outlines the basic steps for a support membership request.",
      },
    }),
    keyPoints: [
      { _key: nextKey(), ...localizedString("Fördermitglied können volljährige natürliche Personen und juristische Personen werden.", "Support membership is open to adult natural persons and legal entities.") },
      { _key: nextKey(), ...localizedString("Die Unterstützung erfolgt über einen regelmäßigen Beitrag, wahlweise monatlich oder jährlich.", "Support is provided through a recurring contribution, either monthly or yearly.") },
      { _key: nextKey(), ...localizedString("Die Höhe des Förderbeitrags ist frei bestimmbar; für Beiträge an den gemeinnützigen Verein kann eine Zuwendungsbestätigung ausgestellt werden.", "The amount of the support contribution can be chosen freely; a donation receipt can be issued for contributions to the non-profit association.") },
      { _key: nextKey(), ...localizedString("Mit der Aufnahme werden Satzung und Ordnungen in ihrer jeweils gültigen Fassung anerkannt.", "Admission includes acceptance of the statutes and regulations in their current version.") },
      { _key: nextKey(), ...localizedString("Eine Fördermitgliedschaft beinhaltet kein Stimm- und Wahlrecht; dieses ist laut Satzung aktiven Mitgliedern und Vorstandsmitgliedern vorbehalten.", "Support membership does not include voting rights; according to the statutes, these are reserved for active members and board members.") },
    ],
    body: localizedBlocks(
      [
        "Wenn du eine Fördermitgliedschaft anfragen möchtest, nutze das Formular. Wir melden uns anschließend mit den formalen nächsten Schritten und den relevanten Unterlagen.",
      ],
      [
        "If you want to request a support membership, use the form below. We will then get back to you with the formal next steps and relevant documents.",
      ],
    ),
    seo: seoFields({
      deTitle: "Fördermitgliedschaft bei The Base e.V. in Aachen",
      enTitle: "Support membership at The Base e.V. in Aachen",
      deDescription:
        "Informationen zur Fördermitgliedschaft bei The Base e.V. für Menschen und Organisationen, die die Arbeit des Vereins regelmäßig unterstützen möchten.",
      enDescription:
        "Information on support membership at The Base e.V. for people and organisations who want to support the association's work on a recurring basis.",
    }),
  },
  {
    _id: "page.mitmachen",
    _type: "staticPage",
    routeKey: "mitmachen",
    intro: editorialIntro({
      eyebrow: { de: "About", en: "About" },
      title: { de: "Open Call", en: "Open call" },
      displayTitle: { de: "Open Call", en: "Open call" },
      description: {
        de: "Diese Seite bündelt Anfragen von Künstler:innen, Kollektiven und Produzent:innen, die Ausstellungen, ortsspezifische Arbeiten oder andere Formate im BOA-Kontext vorschlagen möchten.",
        en: "This page gathers inquiries from artists, collectives, and producers who want to propose exhibitions, site-specific works, or other formats in the BOA context.",
      },
      note: {
        de: "Gesucht sind klare Vorhaben, nachvollziehbare Kontexte und Formate, die den BOA Bunker of Art als offenen Kulturort ernst nehmen.",
        en: "We are looking for clear proposals, legible contexts, and formats that take the BOA Bunker of Art seriously as an open cultural site.",
      },
    }),
    keyPoints: [
      { _key: nextKey(), ...localizedString("Ausstellungen und ortsspezifische Installationen", "Exhibitions and site-specific installations") },
      { _key: nextKey(), ...localizedString("Konzerte, Live-Sets und Listening-Formate", "Concerts, live sets, and listening formats") },
      { _key: nextKey(), ...localizedString("Workshops, Vermittlung und Community-Praxis", "Workshops, mediation, and community practice") },
      { _key: nextKey(), ...localizedString("Neue und experimentelle Positionen", "New and experimental positions") },
    ],
    body: localizedBlocks(
      [
        "Wenn du eine Ausstellung, eine installative Arbeit, ein musikalisches Format oder einen anderen Vorschlag einreichen möchtest, melde dich mit kurzer Beschreibung, Bezug zum Ort und gewünschtem Zeitraum. Wichtig sind ein nachvollziehbares Vorhaben und Offenheit für Zusammenarbeit im kulturellen Kontext der Base.",
      ],
      [
        "If you want to submit an exhibition, an installation, a musical format, or another proposal, send a short description, its connection to the site, and your preferred time frame. What matters is a legible proposal and openness to collaboration within The Base's cultural context.",
      ],
    ),
    seo: seoFields({
      deTitle: "Open Call bei The Base e.V.",
      enTitle: "Open call at The Base e.V.",
      deDescription:
        "Open-Call-Seite von The Base e.V. für Ausstellungen, ortsspezifische Arbeiten, musikalische Formate und kollaborative Vorschläge im BOA-Kontext.",
      enDescription:
        "Open-call page of The Base e.V. for exhibitions, site-specific works, musical formats, and collaborative proposals in the BOA context.",
    }),
  },
  {
    _id: "page.media-buchung",
    _type: "staticPage",
    routeKey: "media-buchung",
    intro: editorialIntro({
      eyebrow: { de: "Booking", en: "Booking" },
      title: { de: "Anfragen für Produktionen", en: "Production enquiries" },
      displayTitle: { de: "Anfragen\nfür\nProduktionen", en: "Production\nenquiries" },
      description: {
        de: "Diese Seite richtet sich an Teams, die Foto, Video, Mitschnitt oder dokumentarische Formate im Zusammenhang mit dem BOA Bunker of Art anfragen möchten.",
        en: "This page is for teams that want to enquire about photo, video, recording, or documentary formats connected to the BOA Bunker of Art.",
      },
      note: {
        de: "Hilfreich für die Abstimmung sind Format, Zeitraum, Partner, Förderungen, Technikbedarf und ein kurzer Hinweis darauf, wie der Bezug zum Ort oder Programm gedacht ist.",
        en: "Helpful for coordination are the format, timing, partners, funding, technical needs, and a short note on how the connection to the space or programme is intended.",
      },
    }),
    keyPoints: [
      { _key: nextKey(), ...localizedString("Anfragen für Foto, Video, Mitschnitt und dokumentarische Formate", "Enquiries for photo, video, recording, and documentary formats") },
      { _key: nextKey(), ...localizedString("Wichtig sind Zeitraum, Team, technischer Bedarf und Bezug zum Ort", "Important are timing, team, technical needs, and the connection to the site") },
      { _key: nextKey(), ...localizedString("Produktionen werden im Kontext des laufenden Programms und der räumlichen Möglichkeiten abgestimmt", "Productions are coordinated in relation to the ongoing programme and the spatial possibilities") },
    ],
    body: localizedBlocks(
      [
        "Für eine Anfrage hilfreich sind ein kurzer Projektumriss, mögliche Termine, beteiligte Partner:innen, Förderkontext und technischer Bedarf. So lässt sich früh einschätzen, ob und wie das Vorhaben in den Ort und das laufende Programm passt.",
        "Der BOA wird nicht als neutrale Mietfläche behandelt, sondern als kultureller Kontext. Produktionen sollten den Charakter des Ortes und die Zusammenarbeit mit dem Verein mitdenken.",
      ],
      [
        "Helpful for an enquiry are a short project outline, possible dates, involved partners, funding context, and technical requirements. This makes it easier to assess early on whether and how the project fits the site and the ongoing programme.",
        "BOA is not treated as a neutral rental shell but as a cultural context. Productions should take the character of the site and collaboration with the association into account.",
      ],
    ),
    seo: seoFields({
      deTitle: "Anfragen für Medienproduktionen im BOA Bunker of Art",
      enTitle: "Production enquiries at the BOA Bunker of Art",
      deDescription:
        "Anfragen für Foto, Video, Mitschnitt und dokumentarische Produktionen im BOA Bunker of Art Aachen.",
      enDescription:
        "Enquiries for photo, video, recording, and documentary productions at the BOA Bunker of Art Aachen.",
    }),
  },
  {
    _id: "page.media-produktionen",
    _type: "staticPage",
    routeKey: "media-produktionen",
    intro: editorialIntro({
      eyebrow: { de: "Media", en: "Media" },
      title: { de: "Im BOA gedreht", en: "Shot at BOA" },
      displayTitle: { de: "Im BOA\ngedreht", en: "Shot at\nBOA" },
      description: {
        de: "Diese Seite versammelt Medienprojekte externer Teams, die im BOA Bunker of Art entstanden sind oder den Ort als Dreh- und Produktionskontext genutzt haben.",
        en: "This page gathers media projects by external teams that were produced at the BOA Bunker of Art or used the site as a filming and production context.",
      },
    }),
    body: localizedBlocks(
      [
        "Hier erscheinen Filme, Sessions und dokumentarische Arbeiten externer Produzent:innen und Kollektive, die den BOA nicht nur als Kulisse, sondern als räumlichen Zusammenhang sichtbar machen.",
      ],
      [
        "This is where films, sessions, and documentary works by external producers and collectives appear that treat BOA not merely as a backdrop but as a spatial context in its own right.",
      ],
    ),
    seo: seoFields({
      deTitle: "Externe Medienprojekte im BOA Bunker of Art",
      enTitle: "External media projects at the BOA Bunker of Art",
      deDescription:
        "Externe Medienprojekte im BOA Bunker of Art: Filme, Sessions, Dokumentationen und weitere Produktionen, die im BOA entstanden oder dort gedreht wurden.",
      enDescription:
        "External media projects at the BOA Bunker of Art: films, sessions, documentaries, and further productions created or shot at BOA.",
    }),
  },
  {
    _id: "event-the-roots-of-all-that-exists-2026",
    _type: "event",
    title: localizedString("The Roots of All That Exists"),
    displayTitle: localizedText("The Roots\nof All That\nExists"),
    slug: { _type: "slug", current: "the-roots-of-all-that-exists-2026" },
    status: "upcoming",
    siteVisibility: "public",
    summary: localizedText(
      "Dreitägige Ausstellung im Bunker of Art in Aachen mit Vernissage, freiem Eintritt und Positionen aus unterschiedlichen Kontexten.",
      "Three-day exhibition at Bunker of Art in Aachen with an opening, free entry, and positions from different contexts.",
    ),
    body: localizedBlocks(
      [
        "Die Ankündigung beschreibt ein offenes Ausstellungswochenende, das Menschen, Umgebung und innere Wahrnehmung in Beziehung setzt. Die Ausstellung läuft über mehrere Tage und wird als zugänglicher öffentlicher Moment im BOA kommuniziert.",
      ],
      [
        "The announcement describes an open exhibition weekend that relates people, surroundings, and inner perception. The exhibition runs across several days and is framed as an accessible public moment at BOA.",
      ],
    ),
    bodyLayout: textLayout({ position: "centered", alignment: "left" }),
    eventType: "exhibition",
    featuredCurrent: true,
    externalUrl: "https://www.instagram.com/the.base.ev/p/DYcFhaxtS8G/",
    startDate: "2026-05-29T18:00:00.000Z",
    endDate: "2026-05-31T20:00:00.000Z",
    venue: "Bunker of Art, Scheibenstraße 34, 52070 Aachen",
    credits: ["Photography: Neutron Aung"],
    seo: seoFields({
      deTitle: "The Roots of All That Exists | Ausstellung im BOA",
      enTitle: "The Roots of All That Exists | Exhibition at BOA",
      deDescription:
        "Ausstellung The Roots of All That Exists im BOA Bunker of Art Aachen mit Vernissage, freiem Eintritt und mehreren Öffnungstagen.",
      enDescription:
        "Exhibition The Roots of All That Exists at the BOA Bunker of Art Aachen with opening, free entry, and several public days.",
    }),
  },
  {
    _id: "event-total-local-2026",
    _type: "event",
    title: localizedString("Total Local", "Total Local"),
    displayTitle: localizedText("Total\nLocal", "Total\nLocal"),
    slug: { _type: "slug", current: "total-local-2026" },
    status: "past",
    siteVisibility: "public",
    summary: localizedText(
      "Kollaborative Ausstellung im Bunker of Art mit 18 Künstler:innen aus dem direkten Umfeld der Base, geprägt von Austausch, Vertrauen und gemeinsamer Praxis.",
      "Collaborative exhibition at Bunker of Art with 18 artists from The Base's immediate surroundings, shaped by exchange, trust, and shared practice.",
    ),
    body: localizedBlocks(
      [
        "Der Post beschreibt die Ausstellung als Öffnung des BOA für lokale Positionen und als Dialog zwischen Kunst, Raum und dem Netzwerk der Base.",
      ],
      [
        "The post describes the exhibition as an opening of BOA to local positions and as a dialogue between art, space, and The Base's network.",
      ],
    ),
    eventType: "exhibition",
    externalUrl: "https://www.instagram.com/the.base.ev/p/DXe58xqjcgO/",
    startDate: "2026-05-02T18:00:00.000Z",
    endDate: "2026-05-05T21:00:00.000Z",
    venue: "Bunker of Art, Aachen",
    series: { _type: "reference", _ref: "series-total-local" },
    relatedArchive: [reference("archive-total-local-2026")],
    credits: ["Graphic Design: ranigerges"],
    seo: seoFields({
      deTitle: "Total Local | Ausstellung im BOA Bunker of Art",
      enTitle: "Total Local | Exhibition at BOA Bunker of Art",
      deDescription:
        "Total Local versammelt lokale künstlerische Positionen im BOA Bunker of Art Aachen und versteht Ausstellung als kollaborativen Zusammenhang.",
      enDescription:
        "Total Local brings together local artistic positions at the BOA Bunker of Art Aachen and understands exhibition as a collaborative context.",
    }),
  },
  {
    _id: "event-the-base-open-ground-2026",
    _type: "event",
    title: localizedString("The Base @ Open Ground"),
    displayTitle: localizedText("The Base\n@ Open Ground"),
    slug: { _type: "slug", current: "the-base-open-ground-2026" },
    status: "past",
    siteVisibility: "public",
    summary: localizedText(
      "Gastspiel von The Base bei Open Ground als Teil des öffentlichen Programms 2026.",
      "Guest appearance by The Base at Open Ground as part of the 2026 public programme.",
    ),
    body: localizedBlocks(
      [
        "Der Termin markiert The Base als Gast in einem anderen Kontext und macht sichtbar, wie sich das Netzwerk des Vereins über den eigenen Ort hinaus bewegt.",
      ],
      [
        "This date marks The Base as a guest in another context and makes visible how the association's network moves beyond its own site.",
      ],
    ),
    eventType: "other",
    externalUrl: "https://www.instagram.com/the.base.ev/p/DXFJJbajTgY/",
    startDate: "2026-04-23T18:00:00.000Z",
    venue: "Open Ground",
    seo: seoFields({
      deTitle: "The Base @ Open Ground",
      enTitle: "The Base @ Open Ground",
      deDescription:
        "Gastspiel von The Base bei Open Ground als Teil des öffentlichen Programms 2026.",
      enDescription:
        "Guest appearance by The Base at Open Ground as part of the 2026 public programme.",
    }),
  },
  {
    _id: "event-the-base-kreisstrich-az-aachen-2026",
    _type: "event",
    title: localizedString("The Base x Kreisstrich at AZ Aachen"),
    displayTitle: localizedText("The Base x\nKreisstrich\nat AZ Aachen"),
    slug: { _type: "slug", current: "the-base-kreisstrich-az-aachen-2026" },
    status: "past",
    siteVisibility: "public",
    summary: localizedText(
      "Musikalisches Programm im Autonomen Zentrum Aachen mit mehreren in der Ankündigung genannten b2b-Konstellationen.",
      "Music programme at Autonomes Zentrum Aachen with several b2b constellations named in the announcement.",
    ),
    body: localizedBlocks(
      [
        "Im Caption-Text werden 1080 b2b Manu Ceață, berkelium b2b Rapha Ceață sowie vtn b2b DJ Mauken genannt.",
      ],
      [
        "The caption names 1080 b2b Manu Ceață, berkelium b2b Rapha Ceață, and vtn b2b DJ Mauken.",
      ],
    ),
    eventType: "other",
    externalUrl: "https://www.instagram.com/the.base.ev/p/DVxon7TDVeS/",
    startDate: "2026-03-21T20:00:00.000Z",
    venue: "Autonomes Zentrum Aachen",
    seo: seoFields({
      deTitle: "The Base x Kreisstrich at AZ Aachen",
      enTitle: "The Base x Kreisstrich at AZ Aachen",
      deDescription:
        "Musikalisches Programm von The Base und Kreisstrich im AZ Aachen mit mehreren b2b-Konstellationen.",
      enDescription:
        "Music programme by The Base and Kreisstrich at AZ Aachen with several b2b constellations.",
    }),
  },
  {
    _id: "event-10-years-the-base-2025",
    _type: "event",
    title: localizedString("10 Years The Base"),
    displayTitle: localizedText("10 Years\nThe Base"),
    slug: { _type: "slug", current: "10-years-the-base-2025" },
    status: "past",
    siteVisibility: "public",
    summary: localizedText(
      "Zweitägiges Jubiläumsprogramm mit Ausstellung, Live-Konzerten und Klubnacht als markanter Moment in der Geschichte der Base.",
      "Two-day anniversary programme with exhibition, live concerts, and club night as a marked moment in The Base's history.",
    ),
    body: localizedBlocks(
      [
        "Der öffentliche Post kündigt das zehnjährige Bestehen der Base mit Kunstausstellung, Konzerten und weiteren Programmpunkten an.",
      ],
      [
        "The public post announces The Base's tenth anniversary with an exhibition, concerts, and further programme points.",
      ],
    ),
    eventType: "other",
    externalUrl: "https://www.instagram.com/p/DR2wOqtDR8h/",
    startDate: "2025-12-04T18:00:00.000Z",
    venue: "The Base / Bunker of Art, Aachen",
    relatedArchive: [reference("archive-10-years-the-base-poster-2025")],
    credits: ["Poster Design: treesmerx"],
    seo: seoFields({
      deTitle: "10 Years The Base | Jubiläumsprogramm",
      enTitle: "10 Years The Base | Anniversary programme",
      deDescription:
        "Zehn Jahre The Base: Jubiläumsprogramm mit Ausstellung, Live-Konzerten und Clubnacht im BOA Bunker of Art Aachen.",
      enDescription:
        "Ten years of The Base: anniversary programme with exhibition, live concerts, and club night at the BOA Bunker of Art Aachen.",
    }),
  },
  {
    _id: "event-rrade-rhythmic-resonance-2025",
    _type: "event",
    title: localizedString("RRADE x The Base — Rhythmic Resonance"),
    displayTitle: localizedText("RRADE x The Base\nRhythmic Resonance"),
    slug: { _type: "slug", current: "rrade-rhythmic-resonance-2025" },
    status: "past",
    siteVisibility: "public",
    summary: localizedText(
      "Release-Show zur ersten EP von RRADE mit Vinyl- und Musikvideo-Premiere sowie Live-Performance im Programm der Base.",
      "Release show for RRADE's first EP with vinyl and music video premiere plus a live performance in The Base programme.",
    ),
    body: localizedBlocks(
      [
        "Die Ankündigung nennt eine EP-, Vinyl- und Musikvideo-Premiere sowie eine Live-Performance von RRADE und Celine.",
      ],
      [
        "The announcement names an EP, vinyl, and music video premiere as well as a live performance by RRADE and Celine.",
      ],
    ),
    eventType: "release-show",
    externalUrl: "https://www.instagram.com/p/DRZD7eNjcom/",
    startDate: "2025-11-29T19:00:00.000Z",
    venue: "The Base, Aachen",
    seo: seoFields({
      deTitle: "RRADE x The Base — Rhythmic Resonance",
      enTitle: "RRADE x The Base — Rhythmic Resonance",
      deDescription:
        "Release-Show zur ersten EP von RRADE mit Vinyl- und Musikvideo-Premiere sowie Live-Performance bei The Base in Aachen.",
      enDescription:
        "Release show for RRADE's first EP with vinyl and music video premiere plus live performance at The Base in Aachen.",
    }),
  },
  {
    _id: "series-total-local",
    _type: "programmeSeries",
    title: localizedString("Total Local"),
    displayTitle: localizedText("Total\nLocal"),
    slug: { _type: "slug", current: "total-local" },
    summary: localizedText(
      "Wiederkehrende Programmlinie mit lokal verankerten künstlerischen Positionen, kollaborativen Setzungen und offenem Austausch im BOA.",
      "Recurring programme line for locally rooted artistic positions, collaborative settings, and open exchange at BOA.",
    ),
    body: localizedBlocks(
      [
        "Total Local erscheint bei The Base nicht nur als einzelne Ausstellung, sondern als wiederkehrende Arbeitsweise zwischen Ort, Netzwerk und lokaler Produktion.",
      ],
      [
        "At The Base, Total Local appears not only as a single exhibition but as a recurring way of working between site, network, and local production.",
      ],
    ),
    status: "active",
    siteVisibility: "public",
    externalUrl: "https://www.instagram.com/the.base.ev/p/DXe58xqjcgO/",
    relatedEvents: [reference("event-total-local-2026")],
    seo: seoFields({
      deTitle: "Total Local | Laufende Reihe bei The Base",
      enTitle: "Total Local | Recurring series at The Base",
      deDescription:
        "Total Local ist eine wiederkehrende Programmlinie von The Base für lokal verankerte künstlerische Positionen und kollaborative Ausstellungspraxis.",
      enDescription:
        "Total Local is a recurring programme line by The Base for locally rooted artistic positions and collaborative exhibition practice.",
    }),
  },
  {
    _id: "series-aachener-kunstroute",
    _type: "programmeSeries",
    title: localizedString("Aachener Kunstroute"),
    displayTitle: localizedText("Aachener\nKunstroute"),
    slug: { _type: "slug", current: "aachener-kunstroute" },
    summary: localizedText(
      "Wiederkehrende Beteiligung des BOA Bunker of Art an der Aachener Kunstroute mit einem offenen Ausstellungsbeitrag aus dem Umfeld der Base.",
      "Recurring participation of BOA Bunker of Art in Aachener Kunstroute with an open exhibition contribution from The Base context.",
    ),
    body: localizedBlocks(
      [
        "Die Reihe markiert den Bunker als wiederkehrende Station innerhalb der Aachener Kunstroute und verbindet lokale Sichtbarkeit mit dem Programm der Base.",
      ],
      [
        "This series marks the bunker as a recurring station within Aachener Kunstroute and connects local visibility with The Base programme.",
      ],
    ),
    status: "active",
    siteVisibility: "public",
    externalUrl: "https://www.aachenerkunstroute.de/",
    seo: seoFields({
      deTitle: "Aachener Kunstroute | The Base",
      enTitle: "Aachener Kunstroute | The Base",
      deDescription:
        "Wiederkehrende Beteiligung des BOA Bunker of Art an der Aachener Kunstroute.",
      enDescription:
        "Recurring participation of the BOA Bunker of Art in the Aachener Kunstroute.",
    }),
  },
  {
    _id: "media-leo-kaminski-nie-im-club",
    _type: "mediaProject",
    title: localizedString("Leo Kaminski — Nie im Club"),
    displayTitle: localizedText("Leo Kaminski\nNie im Club"),
    slug: { _type: "slug", current: "leo-kaminski-nie-im-club" },
    status: "published",
    siteVisibility: "public",
    summary: localizedText(
      "Musikvideo von Leo Kaminski, das im BOA Bunker of Art gedreht wurde und den Ort als Produktionskontext sichtbar macht.",
      "Music video by Leo Kaminski, shot at the BOA Bunker of Art and making the site visible as a production context.",
    ),
    body: localizedBlocks(
      [
        "Das Projekt steht exemplarisch für externe Produktionen, die den BOA nicht nur als Kulisse nutzen, sondern als prägnanten räumlichen Zusammenhang lesbar machen.",
      ],
      [
        "The project stands for external productions that do not only use BOA as a backdrop, but make it legible as a distinct spatial context.",
      ],
    ),
    mediaType: "video",
    externalUrl: "https://www.youtube.com/watch?v=mruAhsHw8Rg",
    credits: ["Artist: Leo Kaminski"],
    seo: seoFields({
      deTitle: "Leo Kaminski — Nie im Club | BOA Medienprojekt",
      enTitle: "Leo Kaminski — Nie im Club | BOA media project",
      deDescription:
        "Musikvideo von Leo Kaminski, gedreht im BOA Bunker of Art Aachen.",
      enDescription:
        "Music video by Leo Kaminski, shot at the BOA Bunker of Art Aachen.",
    }),
  },
  {
    _id: "archive-total-local-2026",
    _type: "archiveEntry",
    title: localizedString("Total Local"),
    displayTitle: localizedText("Total\nLocal"),
    slug: { _type: "slug", current: "total-local-2026" },
    status: "published",
    siteVisibility: "public",
    summary: localizedText(
      "Dokumentation und Kontextmaterial zur kollaborativen Ausstellung Total Local im BOA.",
      "Documentation and contextual material for the collaborative exhibition Total Local at BOA.",
    ),
    body: localizedBlocks(
      [
        "Der Archiveintrag bündelt die Ausstellung als dokumentierten Zusammenhang aus lokaler Zusammenarbeit, Raumbezug und öffentlicher Kommunikation.",
      ],
      [
        "This archive entry frames the exhibition as a documented context of local collaboration, site specificity, and public communication.",
      ],
    ),
    archiveCategory: "catalogue",
    archiveType: "documentation",
    date: "2026-05-05",
    externalUrl: "https://www.instagram.com/the.base.ev/p/DXe58xqjcgO/",
    sourceEvent: { _type: "reference", _ref: "event-total-local-2026" },
    sourceSeries: { _type: "reference", _ref: "series-total-local" },
    seo: seoFields({
      deTitle: "Total Local | Archivdokumentation",
      enTitle: "Total Local | Archive documentation",
      deDescription:
        "Archivdokumentation zur Ausstellung Total Local im BOA Bunker of Art Aachen.",
      enDescription:
        "Archive documentation for the exhibition Total Local at the BOA Bunker of Art Aachen.",
    }),
  },
  {
    _id: "archive-10-years-the-base-poster-2025",
    _type: "archiveEntry",
    title: localizedString("10 Years The Base — Poster"),
    displayTitle: localizedText("10 Years The Base\nPoster"),
    slug: { _type: "slug", current: "10-years-the-base-poster-2025" },
    status: "published",
    siteVisibility: "public",
    summary: localizedText(
      "Jubiläumsposter zum zweitägigen Zehn-Jahres-Programm der Base mit Ausstellung, Konzerten und weiterer Nachtstruktur.",
      "Anniversary poster for The Base's two-day ten-year programme with exhibition, concerts, and a club-oriented night structure.",
    ),
    body: localizedBlocks(
      [
        "Der Eintrag sichert das visuelle Erscheinungsbild des Jubiläumsprogramms im Archiv und hält das Poster als eigenständige grafische Arbeit fest.",
      ],
      [
        "This entry preserves the visual identity of the anniversary programme in the archive and records the poster as a graphic work in its own right.",
      ],
    ),
    archiveCategory: "poster",
    archiveType: "poster",
    date: "2025-12-04",
    externalUrl: "https://www.instagram.com/p/DR2wOqtDR8h/",
    sourceEvent: { _type: "reference", _ref: "event-10-years-the-base-2025" },
    credits: ["Poster Design: treesmerx"],
    seo: seoFields({
      deTitle: "10 Years The Base — Poster | Archiv",
      enTitle: "10 Years The Base — Poster | Archive",
      deDescription:
        "Archivierter Poster-Eintrag zum Jubiläumsprogramm 10 Years The Base.",
      enDescription:
        "Archived poster entry for the anniversary programme 10 Years The Base.",
    }),
  },
];
