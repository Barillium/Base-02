# Sanity Studio Architecture fuer The Base e.V.

## 1. Analyse der aktuellen Strukturprobleme

- Das Projekt hat bereits gute Sanity-Grundlagen, aber die Modellierung ist noch nicht ganz konsistent.
- Seiten, Unterseiten und wiederverwendbare Bereiche sind teilweise sauber strukturiert, teilweise noch durch Legacy-Migrationsfelder und einmalige Spezialfelder getrennt.
- Wiederkehrende Section-Arrays waren mehrfach lokal definiert, was Pflege und Weiterentwicklung unnoetig streut.
- Mehrere Objekt-Typen hatten aehnliche Link-, Sichtbarkeits- und Layoutlogik, aber ohne gemeinsame Hilfsfunktionen.
- Die Desk Structure war technisch korrekt, aber fuer Redaktion noch zu nah an Dokumenttypen statt an Arbeitsbereichen.

## 2. Empfohlene Studio-Architektur

- Feste Hauptseiten bleiben Singletons:
  `homePage`, `livePage`, `archivePage`, `mediaPage`, `aboutPage`, `siteSettings`, `formContent`
- Relevante Unterseiten bleiben klar definierte feste Dokumente ueber feste `documentId`s:
  `page.about-the-base`, `page.about-code-of-conduct`, `page.about-kontakt`, `page.about-foerdermitgliedschaft`, `page.mitmachen`, `page.media-buchung`, `page.media-produktionen`
- Strukturierte Bereiche bleiben Objekte mit kontrollierten Layoutfeldern, nicht freie Feldsammlungen.
- Sortierbare `sections[]` und `contentModules[]` werden fuer kuratierte Reihenfolgen bevorzugt.
- Layout wird ausschliesslich ueber Presets gepflegt:
  `widthPreset`, `startLine`, `span`, `align`, `spacingTop`, `spacingBottom`, `theme`, `titleSize`, `bodySize`, `isVisible`

## 3. Konkrete Schema-Struktur

- Gemeinsame Schema-Helfer liegen in [src/sanity/schemaTypes/schemaHelpers.ts](/Users/stanynyssen/Documents/Base%20002%203/src/sanity/schemaTypes/schemaHelpers.ts:1).
- Wiederverwendbare Section-Member sind zentralisiert:
  `homepageSectionMembers`, `modularContentSectionMembers`
- Gemeinsame Feldbausteine sind zentralisiert:
  `createSectionLayoutField`, `createVisibilityField`, `createSeoField`, `createModularSectionsField`
- Gemeinsame Validierung ist zentralisiert:
  `validateExclusiveLinkTarget`

Aktuell besonders wichtig:

- [homePageType.ts](/Users/stanynyssen/Documents/Base%20002%203/src/sanity/schemaTypes/homePageType.ts:1) nutzt jetzt zentrale Homepage-Sections und klarere Tabs fuer `Content`, `Sections`, `Links`, `Legacy Migration`, `SEO`.
- [aboutPageType.ts](/Users/stanynyssen/Documents/Base%20002%203/src/sanity/schemaTypes/aboutPageType.ts:1) und [staticPageType.ts](/Users/stanynyssen/Documents/Base%20002%203/src/sanity/schemaTypes/staticPageType.ts:1) nutzen jetzt gemeinsame modulare Sections.
- `livePage`, `archivePage` und `mediaPage` bleiben feste Uebersichtsseiten mit klaren redaktionellen Pflichtbereichen.

## 4. Desk-Structure-Empfehlung

Die Studio-Navigation ist jetzt redaktionell gegliedert:

- `Seiten`
- `Unterseiten`
- `Programm & Inhalte`
- `Formulare`
- `Globale Einstellungen`

Die Umsetzung liegt in [src/sanity/deskStructure.ts](/Users/stanynyssen/Documents/Base%20002%203/src/sanity/deskStructure.ts:1).

Wichtig:

- Hauptseiten sind direkt auffindbar.
- Unterseiten sind nach Bereich gruppiert statt in einer flachen Typenliste.
- Listen fuer `event`, `programmeSeries`, `archiveEntry` und `mediaProject` sind nach Redaktionslogik vorsortiert.

## 5. Validation- und Preview-Strategie

- Links muessen eindeutig sein:
  entweder manueller Link oder verknuepfter Inhalt, nicht beides und nicht keins.
- CTA-Bloecke brauchen einen CTA-Text, sobald sie verlinkt werden.
- Bilder behalten Hotspot/Crop und erzwingen Alt-Text.
- Galerie- und Bereichsarrays haben Mindest- und teils Maximalwerte.
- `sectionLayoutOptions` verhindert ungueltige Rasterkombinationen.
- Vorschauen zeigen klare Titel, Mengenangaben und Sichtbarkeitsstatus.

Betroffene Kerndateien:

- [sectionLayoutOptionsType.ts](/Users/stanynyssen/Documents/Base%20002%203/src/sanity/schemaTypes/sectionLayoutOptionsType.ts:1)
- [teaserSectionType.ts](/Users/stanynyssen/Documents/Base%20002%203/src/sanity/schemaTypes/teaserSectionType.ts:1)
- [teaserCardType.ts](/Users/stanynyssen/Documents/Base%20002%203/src/sanity/schemaTypes/teaserCardType.ts:1)
- [ctaBlockType.ts](/Users/stanynyssen/Documents/Base%20002%203/src/sanity/schemaTypes/ctaBlockType.ts:1)
- [videoBlockType.ts](/Users/stanynyssen/Documents/Base%20002%203/src/sanity/schemaTypes/videoBlockType.ts:1)

## 6. Sinnvolle Custom-Input-Kandidaten

Neue Custom Inputs sind noch nicht noetig, aber diese Kandidaten haben echten Redaktionswert:

- Layout-Preset-Chooser fuer `sectionLayoutOptions`
- kompakter Theme-/Surface-Chooser mit visueller Vorschau
- kompakter Card-List-Editor fuer `teaserCard[]` und `homeLinkedItem[]`
- gezielter Migrations-/Audit-Input fuer verbleibende Legacy-Felder

Nicht empfohlen:

- freie CSS-Felder
- freie Hex-Farbwerte
- freie Pixel-/Margin-Eingaben
- generischer Page-Builder

## 7. Frontend-Mapping-Strategie

- Sanity liefert strukturierte Bereiche, React rendert gezielt pro `_type`.
- Layout-Presets werden in feste Tailwind-Mappings uebersetzt, nicht in freie Klassen.
- Bereits vorhanden ist das Mapping in [src/components/HomeSections.tsx](/Users/stanynyssen/Documents/Base%20002%203/src/components/HomeSections.tsx:1):
  `widthPreset`, `startLine`, `span`, `spacingTop`, `spacingBottom`, `theme`, `align`
- Gleiches Prinzip sollte fuer weitere Section-Renderer gelten:
  Preset rein, feste Klassen raus.
- Mobile Stabilitaet bleibt erhalten, weil Presets auf kuratierte Grid-Kombinationen begrenzt sind.

## 8. Zusammenfassung

- Weniger Feldstreuung
- klarere Redaktionsoberflaeche
- staerkere Validation
- bessere Vorschauen
- sauberere Desk Structure
- konsistentere Basis fuer kontrolliertes Frontend-Mapping

Das Studio wird damit staerker als redaktionelles System gefuehrt und zugleich wartbarer fuer weitere Next.js-/Sanity-Integration.
