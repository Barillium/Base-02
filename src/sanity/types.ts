import type {
  PortableTextBlock,
  SanityLinkField,
  SanityLinkedDocumentReference,
  SanitySectionLayout,
  SanityTextLayout,
} from "@/sanity/lib/content";

export type SanityImageFigure = {
  image?: unknown;
  alt?: string;
  caption?: string;
  credit?: string;
};

export type SanityHomeQuickLink = {
  _key: string;
  meta: string;
  title: string;
  description?: string;
  internalPath?: string;
  externalUrl?: string;
  linkedDocument?: SanityLinkedDocumentReference | null;
};

export type SanityHomeLinkedItem = {
  _key: string;
  meta?: string;
  title: string;
  description?: string;
  link?: SanityLinkField | null;
  linkedDocument?: SanityLinkedDocumentReference | null;
  image?: SanityImageFigure | null;
  isVisible?: boolean;
};

export type SanityTeaserCard = {
  _key: string;
  meta?: string;
  title: string;
  description: string;
  ctaLabel?: string;
  link?: SanityLinkField | null;
  linkedDocument?: SanityLinkedDocumentReference | null;
  image?: SanityImageFigure | null;
  isVisible?: boolean;
};

export type SanityTeaserSection = {
  eyebrow?: string;
  title: string;
  displayTitle?: string;
  description: string;
  cards: SanityTeaserCard[];
  layout?: SanitySectionLayout | null;
  isVisible?: boolean;
};

export type SanityHomeHeroSection = {
  _key: string;
  _type: "homeHero";
  eyebrow?: string;
  title: string;
  displayTitle?: string;
  description: string;
  note?: string;
  image?: SanityImageFigure | null;
  layout?: SanitySectionLayout | null;
  isVisible?: boolean;
};

export type SanityHomeQuickLinksSection = {
  _key: string;
  _type: "homeQuickLinksSection";
  items: SanityHomeLinkedItem[];
  layout?: SanitySectionLayout | null;
  isVisible?: boolean;
};

export type SanityHomeStatementSection = {
  _key: string;
  _type: "homeStatementSection";
  eyebrow?: string;
  title: string;
  displayTitle?: string;
  text: string;
  note?: string;
  items?: string[];
  layout?: SanitySectionLayout | null;
  isVisible?: boolean;
};

export type SanityFeatureListSection = {
  _key: string;
  _type: "featureListSection";
  eyebrow?: string;
  title?: string;
  displayTitle?: string;
  description?: string;
  items: string[];
  layout?: SanitySectionLayout | null;
  isVisible?: boolean;
};

export type SanityHomeSectionIntro = {
  _key: string;
  _type: "homeSectionIntro";
  eyebrow?: string;
  title: string;
  displayTitle?: string;
  description: string;
  entries: SanityHomeLinkedItem[];
  layout?: SanitySectionLayout | null;
  isVisible?: boolean;
};

export type SanityHomeTextSection = {
  _key: string;
  _type: "textSection";
  eyebrow?: string;
  title?: string;
  displayTitle?: string;
  body: PortableTextBlock[];
  layout?: SanitySectionLayout | null;
  isVisible?: boolean;
};

export type SanityCtaBlock = {
  _key: string;
  _type: "ctaBlock";
  eyebrow?: string;
  title: string;
  body?: string;
  label?: string;
  link?: SanityLinkField | null;
  linkedDocument?: SanityLinkedDocumentReference | null;
  layout?: SanitySectionLayout | null;
  isVisible?: boolean;
};

export type SanityImageBlockSection = {
  _key: string;
  _type: "imageBlock";
  ratio?: "auto" | "16:9" | "4:3" | "1:1" | "portrait";
  image?: SanityImageFigure | null;
  layout?: SanitySectionLayout | null;
  isVisible?: boolean;
};

export type SanityGalleryBlockSection = {
  _key: string;
  _type: "galleryBlock";
  images: SanityImageFigure[];
  galleryLayout?: "grid-2" | "grid-3" | "stacked";
  caption?: string;
  layout?: SanitySectionLayout | null;
  isVisible?: boolean;
};

export type SanityVideoBlockSection = {
  _key: string;
  _type: "videoBlock";
  sourceType?: "upload" | "youtube" | "vimeo";
  videoFileUrl?: string;
  url?: string;
  title?: string;
  accessibleDescription?: string;
  caption?: string;
  posterImage?: SanityImageFigure | null;
  ratio?: "16:9" | "4:3" | "1:1" | "portrait";
  controls?: boolean;
  muted?: boolean;
  loop?: boolean;
  layout?: SanitySectionLayout | null;
  isVisible?: boolean;
};

export type SanityHomeSection =
  | SanityHomeHeroSection
  | SanityHomeQuickLinksSection
  | SanityHomeStatementSection
  | SanityFeatureListSection
  | SanityHomeSectionIntro
  | SanityHomeTextSection
  | SanityImageBlockSection
  | SanityGalleryBlockSection
  | SanityVideoBlockSection
  | SanityCtaBlock;

export type SanityHomePage = {
  internalTitle?: string;
  statement?: string;
  note?: string;
  milestones?: PortableTextBlock[];
  quickLinks?: SanityHomeQuickLink[];
  sections?: SanityHomeSection[];
  featuredAbout?: Array<{
    routeKey: string;
    title: string;
    description?: string;
  }>;
};

export type SanityAboutPage = {
  eyebrow?: string;
  title: string;
  displayTitle?: string;
  description: string;
  note?: string;
  introLayout?: SanityTextLayout;
  profileEyebrow?: string;
  profileTitle?: string;
  profileText?: PortableTextBlock[];
  profileTextLayout?: SanityTextLayout;
  baseTeaserSection?: SanityTeaserSection | null;
  inquiryTeaserSection?: SanityTeaserSection | null;
  awarenessTeaserSection?: SanityTeaserSection | null;
};

export type SanityLivePage = {
  internalTitle?: string;
  eyebrow?: string;
  title: string;
  displayTitle?: string;
  description: string;
  note?: string;
  introLayout?: SanityTextLayout;
  currentSection?: SanityTeaserSection | null;
  archiveSection?: SanityTeaserSection | null;
  formatsSection?: SanityTeaserSection | null;
};

export type SanityArchivePage = {
  internalTitle?: string;
  eyebrow?: string;
  title: string;
  displayTitle?: string;
  description: string;
  note?: string;
  introLayout?: SanityTextLayout;
  catalogueSection?: SanityTeaserSection | null;
  posterSection?: SanityTeaserSection | null;
};

export type SanityMediaPage = {
  internalTitle?: string;
  eyebrow?: string;
  title: string;
  displayTitle?: string;
  description: string;
  note?: string;
  introLayout?: SanityTextLayout;
  mainSection?: SanityTeaserSection | null;
};

export type SanityEventPreview = {
  _id: string;
  slug?: string;
  status?: "upcoming" | "past" | "archived";
  siteVisibility?: "public" | "hidden";
  title: string;
  summary: string;
  eventType?: "exhibition" | "concert" | "workshop" | "release-show" | "other";
  venue?: string;
  startDate?: string;
  endDate?: string;
  externalUrl?: string;
  featuredCurrent?: boolean;
};

export type SanityProgrammeSeriesPreview = {
  _id: string;
  title: string;
  summary: string;
  status?: "active" | "paused" | "archived";
  siteVisibility?: "public" | "hidden";
  externalUrl?: string;
};

export type SanityArchiveEntryPreview = {
  _id: string;
  slug?: string;
  status?: "published" | "archived";
  siteVisibility?: "public" | "hidden";
  title: string;
  summary: string;
  archiveType?: "poster" | "catalogue" | "documentation" | "text" | "other";
  archiveCategory?: "poster" | "catalogue";
  date?: string;
  externalUrl?: string;
};

export type SanityEventDetail = {
  _id: string;
  slug: string;
  title: string;
  displayTitle?: string;
  summary: string;
  introLayout?: SanityTextLayout;
  body?: PortableTextBlock[];
  bodyLayout?: SanityTextLayout;
  eventType?: SanityEventPreview["eventType"];
  venue?: string;
  startDate?: string;
  endDate?: string;
  externalUrl?: string;
  image?: unknown;
  imageAlt?: string;
  credits?: string[];
};

export type SanityArchiveEntryDetail = {
  _id: string;
  slug: string;
  title: string;
  displayTitle?: string;
  summary: string;
  introLayout?: SanityTextLayout;
  body?: PortableTextBlock[];
  bodyLayout?: SanityTextLayout;
  archiveType?: SanityArchiveEntryPreview["archiveType"];
  archiveCategory?: SanityArchiveEntryPreview["archiveCategory"];
  date?: string;
  externalUrl?: string;
  image?: unknown;
  imageAlt?: string;
  credits?: string[];
};

export type SanityMediaProjectPreview = {
  _id: string;
  title: string;
  summary: string;
  status?: "published" | "archived";
  siteVisibility?: "public" | "hidden";
  mediaType?: "photo" | "video" | "poster" | "livestream" | "recording" | "documentation" | "other";
  date?: string;
  externalUrl?: string;
  image?: unknown;
  imageAlt?: string;
};

export type SanityStaticPage = {
  routeKey: string;
  eyebrow?: string;
  title: string;
  displayTitle?: string;
  description: string;
  note?: string;
  introLayout?: SanityTextLayout;
  keyPoints?: string[];
  body?: PortableTextBlock[];
  bodyLayout?: SanityTextLayout;
};

export type SanitySiteSettings = {
  siteTitle?: string;
  associationStatement?: string;
  contactEmail?: string;
  postalAddress?: string;
  socialLinks?: Array<{
    label: string;
    url: string;
  }>;
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
