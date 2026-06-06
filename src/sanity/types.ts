export type SanityHomeQuickLink = {
  _id: string;
  title: string;
  meta: string;
  href: string;
  description?: string;
  order?: number;
};

export type SanityEventPreview = {
  _id: string;
  title: string;
  summary: string;
  status: "upcoming" | "ongoing" | "past";
  kind?: "exhibition" | "concert" | "club-night" | "workshop" | "release-show" | "other";
  location?: string;
  dateStart?: string;
  dateEnd?: string;
  externalUrl?: string;
};

export type SanityFormatPreview = {
  _id: string;
  title: string;
  summary: string;
  status: "active" | "paused" | "archived";
  externalUrl?: string;
};

export type SanityArchiveItemPreview = {
  _id: string;
  title: string;
  summary: string;
  typeLabel?: "poster" | "catalogue" | "documentation" | "other";
  date?: string;
  externalUrl?: string;
};

export type SanityArtistPreview = {
  _id: string;
  name: string;
  summary: string;
};

export type SanityDjPreview = {
  _id: string;
  name: string;
  summary: string;
};

export type SanityContributorPreview = {
  _id: string;
  name: string;
  role: string;
  summary?: string;
};
