import { defineQuery } from "next-sanity";

const PUBLIC_VISIBILITY_FILTER = 'coalesce(siteVisibility, "public") == "public"';
const LIVE_CURRENT_FILTER = `
  (
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
  )
`;
const LIVE_PAST_FILTER = `
  (
    status == "past"
    || (
      !defined(status)
      && defined(startDate)
      && (
        (defined(endDate) && endDate < now())
        || (!defined(endDate) && startDate < now())
      )
    )
  )
`;

const localizedIntroProjection = `
  "eyebrow": coalesce(intro.eyebrow[$locale], intro.eyebrow.de),
  "title": coalesce(intro.title[$locale], intro.title.de),
  "displayTitle": coalesce(intro.displayTitle[$locale], intro.displayTitle.de),
  "description": coalesce(intro.description[$locale], intro.description.de),
  "note": coalesce(intro.note[$locale], intro.note.de),
  "introLayout": intro.layout{
    position,
    alignment
  }
`;

const sectionLayoutProjection = `
  "layout": layout{
    widthPreset,
    useCustomGrid,
    startLine,
    span,
    align,
    spacingTop,
    spacingBottom,
    theme,
    titleSize,
    bodySize
  }
`;

const imageFigureProjection = `
  "image": image,
  "alt": coalesce(alt[$locale], alt.de),
  "caption": coalesce(caption[$locale], caption.de),
  credit
`;

const linkedDocumentProjection = `
  _type,
  routeKey,
  archiveCategory,
  "slug": slug.current,
  status,
  siteVisibility
`;

const linkFieldProjection = `
  kind,
  internalPath,
  externalUrl
`;

const homeLinkedItemProjection = `
  _key,
  "meta": coalesce(meta[$locale], meta.de),
  "title": coalesce(title[$locale], title.de),
  "description": coalesce(description[$locale], description.de),
  link{${linkFieldProjection}},
  "linkedDocument": linkedDocument->{${linkedDocumentProjection}},
  "image": image{${imageFigureProjection}},
  isVisible
`;

const teaserCardProjection = `
  _key,
  "meta": coalesce(meta[$locale], meta.de),
  "title": coalesce(title[$locale], title.de),
  "description": coalesce(description[$locale], description.de),
  "ctaLabel": coalesce(ctaLabel[$locale], ctaLabel.de),
  link{${linkFieldProjection}},
  "linkedDocument": linkedDocument->{${linkedDocumentProjection}},
  "image": image{${imageFigureProjection}},
  isVisible
`;

const teaserSectionProjection = `
  "eyebrow": coalesce(eyebrow[$locale], eyebrow.de),
  "title": coalesce(title[$locale], title.de),
  "displayTitle": coalesce(displayTitle[$locale], displayTitle.de),
  "description": coalesce(description[$locale], description.de),
  "cards": cards[coalesce(isVisible, true) == true][]{${teaserCardProjection}},
  ${sectionLayoutProjection},
  isVisible
`;

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage"][0]{
    internalTitle,
    "sections": sections[]{
      _key,
      _type,
      ...select(
        _type == "homeHero" => {
          ${sectionLayoutProjection},
          "eyebrow": coalesce(eyebrow[$locale], eyebrow.de),
          "title": coalesce(title[$locale], title.de),
          "displayTitle": coalesce(displayTitle[$locale], displayTitle.de),
          "description": coalesce(description[$locale], description.de),
          "note": coalesce(note[$locale], note.de),
          "image": image{${imageFigureProjection}},
          isVisible
        },
        _type == "homeQuickLinksSection" => {
          ${sectionLayoutProjection},
          "items": items[coalesce(isVisible, true) == true][]{${homeLinkedItemProjection}},
          isVisible
        },
        _type == "homeStatementSection" => {
          ${sectionLayoutProjection},
          "eyebrow": coalesce(eyebrow[$locale], eyebrow.de),
          "title": coalesce(title[$locale], title.de),
          "displayTitle": coalesce(displayTitle[$locale], displayTitle.de),
          "text": coalesce(text[$locale], text.de),
          "note": coalesce(note[$locale], note.de),
          "items": items[]{
            "text": coalesce(text[$locale], text.de)
          }[defined(text)].text,
          isVisible
        },
        _type == "featureListSection" => {
          ${sectionLayoutProjection},
          "eyebrow": coalesce(eyebrow[$locale], eyebrow.de),
          "title": coalesce(title[$locale], title.de),
          "displayTitle": coalesce(displayTitle[$locale], displayTitle.de),
          "description": coalesce(description[$locale], description.de),
          "items": items[]{
            "text": coalesce(text[$locale], text.de)
          }[defined(text)].text,
          isVisible
        },
        _type == "homeSectionIntro" => {
          ${sectionLayoutProjection},
          "eyebrow": coalesce(eyebrow[$locale], eyebrow.de),
          "title": coalesce(title[$locale], title.de),
          "displayTitle": coalesce(displayTitle[$locale], displayTitle.de),
          "description": coalesce(description[$locale], description.de),
          "entries": entries[coalesce(isVisible, true) == true][]{${homeLinkedItemProjection}},
          isVisible
        },
        _type == "textSection" => {
          ${sectionLayoutProjection},
          "eyebrow": coalesce(eyebrow[$locale], eyebrow.de),
          "title": coalesce(title[$locale], title.de),
          "displayTitle": coalesce(displayTitle[$locale], displayTitle.de),
          "body": coalesce(body[$locale], body.de),
          isVisible
        },
        _type == "ctaBlock" => {
          ${sectionLayoutProjection},
          "eyebrow": coalesce(eyebrow[$locale], eyebrow.de),
          "title": coalesce(title[$locale], title.de),
          "body": coalesce(body[$locale], body.de),
          "label": coalesce(label[$locale], label.de),
          link{${linkFieldProjection}},
          "linkedDocument": linkedDocument->{${linkedDocumentProjection}},
          isVisible
        },
        _type == "imageBlock" => {
          ${sectionLayoutProjection},
          ratio,
          "image": image{${imageFigureProjection}},
          isVisible
        },
        _type == "galleryBlock" => {
          ${sectionLayoutProjection},
          galleryLayout,
          "caption": coalesce(caption[$locale], caption.de),
          "images": images[]{${imageFigureProjection}},
          isVisible
        },
        _type == "videoBlock" => {
          ${sectionLayoutProjection},
          sourceType,
          "videoFileUrl": videoFile.asset->url,
          url,
          "title": coalesce(title[$locale], title.de),
          "accessibleDescription": coalesce(accessibleDescription[$locale], accessibleDescription.de),
          "caption": coalesce(caption[$locale], caption.de),
          "posterImage": posterImage{${imageFigureProjection}},
          ratio,
          controls,
          muted,
          loop,
          isVisible
        }
      )
    },
    "statement": coalesce(statement[$locale], statement.de),
    "note": coalesce(note[$locale], note.de),
    "milestones": coalesce(milestones[$locale], milestones.de),
    "quickLinks": quickLinks[coalesce(isActive, true) == true] | order(order asc)[]{
      _key,
      "meta": coalesce(label[$locale], label.de),
      "title": coalesce(title[$locale], title.de),
      "description": coalesce(description[$locale], description.de),
      "internalPath": link.internalPath,
      "externalUrl": link.externalUrl,
      "linkedDocument": linkedDocument->{
        _type,
        routeKey,
        archiveCategory,
        "slug": slug.current,
        status,
        siteVisibility
      }
    },
    "featuredAbout": featuredAbout[]->{
      routeKey,
      "title": coalesce(intro.title[$locale], intro.title.de),
      "description": coalesce(intro.description[$locale], intro.description.de)
    }
  }
`);

export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_type == "aboutPage"][0]{
    ${localizedIntroProjection},
    "profileEyebrow": coalesce(profileEyebrow[$locale], profileEyebrow.de),
    "profileTitle": coalesce(profileTitle[$locale], profileTitle.de),
    "profileText": coalesce(profileText[$locale], profileText.de),
    "profileTextLayout": profileTextLayout{
      position,
      alignment
    },
    "baseTeaserSection": baseTeaserSection{${teaserSectionProjection}},
    "inquiryTeaserSection": inquiryTeaserSection{${teaserSectionProjection}},
    "awarenessTeaserSection": awarenessTeaserSection{${teaserSectionProjection}}
  }
`);

export const LIVE_PAGE_QUERY = defineQuery(`
  *[_type == "livePage"][0]{
    internalTitle,
    ${localizedIntroProjection},
    "currentSection": currentSection{${teaserSectionProjection}},
    "archiveSection": archiveSection{${teaserSectionProjection}},
    "formatsSection": formatsSection{${teaserSectionProjection}}
  }
`);

export const ARCHIVE_PAGE_QUERY = defineQuery(`
  *[_type == "archivePage"][0]{
    internalTitle,
    ${localizedIntroProjection},
    "catalogueSection": catalogueSection{${teaserSectionProjection}},
    "posterSection": posterSection{${teaserSectionProjection}}
  }
`);

export const MEDIA_PAGE_QUERY = defineQuery(`
  *[_type == "mediaPage"][0]{
    internalTitle,
    ${localizedIntroProjection},
    "mainSection": mainSection{${teaserSectionProjection}}
  }
`);

export const LIVE_CURRENT_EVENT_QUERY = defineQuery(`
  *[
    _type == "event"
    && ${PUBLIC_VISIBILITY_FILTER}
    && ${LIVE_CURRENT_FILTER}
  ]
  | order(featuredCurrent desc, startDate asc)[0] {
    _id,
    "slug": slug.current,
    status,
    siteVisibility,
    "title": coalesce(title[$locale], title.de),
    "summary": coalesce(summary[$locale], summary.de),
    eventType,
    venue,
    startDate,
    endDate,
    externalUrl,
    featuredCurrent
  }
`);

export const LIVE_PAST_EVENTS_QUERY = defineQuery(`
  *[
    _type == "event"
    && ${PUBLIC_VISIBILITY_FILTER}
    && ${LIVE_PAST_FILTER}
  ]
  | order(coalesce(endDate, startDate) desc) {
    _id,
    "slug": slug.current,
    status,
    siteVisibility,
    "title": coalesce(title[$locale], title.de),
    "summary": coalesce(summary[$locale], summary.de),
    eventType,
    venue,
    startDate,
    endDate,
    externalUrl
  }
`);

export const LIVE_ONGOING_SERIES_QUERY = defineQuery(`
  *[
    _type == "programmeSeries"
    && ${PUBLIC_VISIBILITY_FILTER}
    && coalesce(status, "active") == "active"
  ]
  | order(coalesce(title.de, title.en) asc) {
    _id,
    "title": coalesce(title[$locale], title.de),
    "summary": coalesce(summary[$locale], summary.de),
    status,
    siteVisibility,
    externalUrl
  }
`);

export const ARCHIVE_CATALOGUE_QUERY = defineQuery(`
  *[
    _type == "archiveEntry"
    && archiveCategory == "catalogue"
    && ${PUBLIC_VISIBILITY_FILTER}
    && coalesce(status, "published") != "archived"
  ]
  | order(date desc)[0] {
    _id,
    "slug": slug.current,
    status,
    siteVisibility,
    "title": coalesce(title[$locale], title.de),
    "summary": coalesce(summary[$locale], summary.de),
    archiveType,
    archiveCategory,
    date,
    externalUrl
  }
`);

export const ARCHIVE_POSTER_QUERY = defineQuery(`
  *[
    _type == "archiveEntry"
    && archiveCategory == "poster"
    && ${PUBLIC_VISIBILITY_FILTER}
    && coalesce(status, "published") != "archived"
  ]
  | order(date desc)[0] {
    _id,
    "slug": slug.current,
    status,
    siteVisibility,
    "title": coalesce(title[$locale], title.de),
    "summary": coalesce(summary[$locale], summary.de),
    archiveType,
    archiveCategory,
    date,
    externalUrl
  }
`);

export const ARCHIVE_CATALOGUE_ITEMS_QUERY = defineQuery(`
  *[
    _type == "archiveEntry"
    && archiveCategory == "catalogue"
    && ${PUBLIC_VISIBILITY_FILTER}
    && coalesce(status, "published") != "archived"
  ]
  | order(date desc) {
    _id,
    "slug": slug.current,
    status,
    siteVisibility,
    "title": coalesce(title[$locale], title.de),
    "summary": coalesce(summary[$locale], summary.de),
    archiveType,
    archiveCategory,
    date,
    externalUrl
  }
`);

export const ARCHIVE_POSTER_ITEMS_QUERY = defineQuery(`
  *[
    _type == "archiveEntry"
    && archiveCategory == "poster"
    && ${PUBLIC_VISIBILITY_FILTER}
    && coalesce(status, "published") != "archived"
  ]
  | order(date desc) {
    _id,
    "slug": slug.current,
    status,
    siteVisibility,
    "title": coalesce(title[$locale], title.de),
    "summary": coalesce(summary[$locale], summary.de),
    archiveType,
    archiveCategory,
    date,
    externalUrl
  }
`);

export const MEDIA_PROJECTS_QUERY = defineQuery(`
  *[
    _type == "mediaProject"
    && ${PUBLIC_VISIBILITY_FILTER}
    && coalesce(status, "published") != "archived"
  ]
  | order(date desc) {
    _id,
    status,
    siteVisibility,
    "title": coalesce(title[$locale], title.de),
    "summary": coalesce(summary[$locale], summary.de),
    mediaType,
    date,
    externalUrl,
    "image": coverImage.image,
    "imageAlt": coalesce(coverImage.alt[$locale], coverImage.alt.de)
  }
`);

export const LIVE_EVENT_SLUGS_QUERY = defineQuery(`
  *[
    _type == "event"
    && defined(slug.current)
    && ${PUBLIC_VISIBILITY_FILTER}
  ][]{
    "slug": slug.current
  }
`);

export const ARCHIVE_ENTRY_SLUGS_QUERY = defineQuery(`
  *[
    _type == "archiveEntry"
    && defined(slug.current)
    && ${PUBLIC_VISIBILITY_FILTER}
  ][]{
    "slug": slug.current
  }
`);

export const LIVE_EVENT_BY_SLUG_QUERY = defineQuery(`
  *[
    _type == "event"
    && slug.current == $slug
    && ${PUBLIC_VISIBILITY_FILTER}
  ][0]{
    _id,
    "slug": slug.current,
    "title": coalesce(title[$locale], title.de),
    "displayTitle": coalesce(displayTitle[$locale], displayTitle.de),
    "summary": coalesce(summary[$locale], summary.de),
    "introLayout": introLayout{
      position,
      alignment
    },
    "body": coalesce(body[$locale], body.de),
    "bodyLayout": bodyLayout{
      position,
      alignment
    },
    eventType,
    venue,
    startDate,
    endDate,
    externalUrl,
    "image": coverImage.image,
    "imageAlt": coalesce(coverImage.alt[$locale], coverImage.alt.de),
    "credits": credits[]
  }
`);

export const ARCHIVE_ENTRY_BY_SLUG_QUERY = defineQuery(`
  *[
    _type == "archiveEntry"
    && slug.current == $slug
    && ${PUBLIC_VISIBILITY_FILTER}
  ][0]{
    _id,
    "slug": slug.current,
    "title": coalesce(title[$locale], title.de),
    "displayTitle": coalesce(displayTitle[$locale], displayTitle.de),
    "summary": coalesce(summary[$locale], summary.de),
    "introLayout": introLayout{
      position,
      alignment
    },
    "body": coalesce(body[$locale], body.de),
    "bodyLayout": bodyLayout{
      position,
      alignment
    },
    archiveType,
    archiveCategory,
    date,
    externalUrl,
    "image": coverImage.image,
    "imageAlt": coalesce(coverImage.alt[$locale], coverImage.alt.de),
    "credits": credits[]
  }
`);

export const STATIC_PAGE_QUERY = defineQuery(`
  *[_type == "staticPage" && routeKey == $routeKey][0]{
    routeKey,
    ${localizedIntroProjection},
    "keyPoints": keyPoints[]{
      "value": coalesce(@[$locale], @.de)
    }[defined(value)].value,
    "body": coalesce(body[$locale], body.de),
    "bodyLayout": bodyLayout{
      position,
      alignment
    }
  }
`);

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0]{
    siteTitle,
    "associationStatement": coalesce(associationStatement[$locale], associationStatement.de),
    contactEmail,
    postalAddress,
    socialLinks[]{
      label,
      url
    }
  }
`);

export const TALENT_ARTIST_QUERY = defineQuery(`
  *[_type == "artist"]
  | order(name asc)[0] {
    _id,
    name,
    summary
  }
`);

export const TALENT_DJ_QUERY = defineQuery(`
  *[_type == "dj"]
  | order(name asc)[0] {
    _id,
    name,
    summary
  }
`);

export const TALENT_CONTRIBUTOR_QUERY = defineQuery(`
  *[_type == "contributor"]
  | order(name asc)[0] {
    _id,
    name,
    role,
    summary
  }
`);
