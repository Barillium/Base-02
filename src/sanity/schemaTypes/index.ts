import { archiveItemType } from "@/sanity/schemaTypes/archiveItemType";
import { artistType } from "@/sanity/schemaTypes/artistType";
import { contributorType } from "@/sanity/schemaTypes/contributorType";
import { djType } from "@/sanity/schemaTypes/djType";
import { eventType } from "@/sanity/schemaTypes/eventType";
import { formatType } from "@/sanity/schemaTypes/formatType";
import { homeQuickLinkType } from "@/sanity/schemaTypes/homeQuickLinkType";
import { siteSettingsType } from "@/sanity/schemaTypes/siteSettingsType";

export const schemaTypes = [
  siteSettingsType,
  homeQuickLinkType,
  eventType,
  formatType,
  archiveItemType,
  artistType,
  djType,
  contributorType,
];
