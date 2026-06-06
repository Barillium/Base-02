import { defineQuery } from "next-sanity";

export const HOME_QUICK_LINKS_QUERY = defineQuery(`
  *[_type == "homeQuickLink" && coalesce(isActive, true) == true]
  | order(order asc) {
    _id,
    title,
    "meta": meta,
    href,
    description,
    order
  }
`);

export const LIVE_CURRENT_EVENT_QUERY = defineQuery(`
  *[
    _type == "event"
    && status in ["upcoming", "ongoing"]
  ]
  | order(dateStart asc)[0] {
    _id,
    title,
    summary,
    status,
    kind,
    location,
    dateStart,
    dateEnd,
    externalUrl
  }
`);

export const LIVE_PAST_EVENT_QUERY = defineQuery(`
  *[_type == "event" && status == "past"]
  | order(dateStart desc)[0] {
    _id,
    title,
    summary,
    status,
    kind,
    location,
    dateStart,
    dateEnd,
    externalUrl
  }
`);

export const LIVE_PAST_EVENTS_QUERY = defineQuery(`
  *[_type == "event" && status == "past"]
  | order(dateStart desc) {
    _id,
    title,
    summary,
    status,
    kind,
    location,
    dateStart,
    dateEnd,
    externalUrl
  }
`);

export const LIVE_ONGOING_FORMAT_QUERY = defineQuery(`
  *[_type == "format" && status == "active"]
  | order(title asc)[0] {
    _id,
    title,
    summary,
    status,
    externalUrl
  }
`);

export const LIVE_ONGOING_FORMATS_QUERY = defineQuery(`
  *[_type == "format" && status == "active"]
  | order(title asc) {
    _id,
    title,
    summary,
    status,
    externalUrl
  }
`);

export const ARCHIVE_CATALOGUE_QUERY = defineQuery(`
  *[_type == "archiveItem" && typeLabel == "catalogue"]
  | order(date desc)[0] {
    _id,
    title,
    summary,
    typeLabel,
    date,
    externalUrl
  }
`);

export const ARCHIVE_POSTER_QUERY = defineQuery(`
  *[_type == "archiveItem" && typeLabel in ["poster", "documentation"]]
  | order(date desc)[0] {
    _id,
    title,
    summary,
    typeLabel,
    date,
    externalUrl
  }
`);

export const ARCHIVE_CATALOGUE_ITEMS_QUERY = defineQuery(`
  *[_type == "archiveItem" && typeLabel == "catalogue"]
  | order(date desc) {
    _id,
    title,
    summary,
    typeLabel,
    date,
    externalUrl
  }
`);

export const ARCHIVE_POSTER_ITEMS_QUERY = defineQuery(`
  *[_type == "archiveItem" && typeLabel in ["poster", "documentation"]]
  | order(date desc) {
    _id,
    title,
    summary,
    typeLabel,
    date,
    externalUrl
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
