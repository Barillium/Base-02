import { set, setIfMissing, unset, type ObjectInputProps } from "sanity";
import { useEffect } from "react";

type PortableTextChild = {
  _key?: string;
  _type: "span";
  marks?: string[];
  text: string;
};

type PortableTextBlock = {
  _key?: string;
  _type: "block";
  children: PortableTextChild[];
  markDefs?: unknown[];
  style?: string;
};

type LegacyEventValue = Record<string, unknown> & {
  title?: unknown;
  summary?: unknown;
  body?: unknown;
  kind?: unknown;
  dateStart?: unknown;
  dateEnd?: unknown;
  location?: unknown;
  status?: unknown;
  siteVisibility?: unknown;
};

function legacyKey(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function toBlock(text: string): PortableTextBlock {
  return {
    _key: legacyKey("block"),
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [
      {
        _key: legacyKey("span"),
        _type: "span",
        marks: [],
        text,
      },
    ],
  };
}

function asLocalizedString(value: string) {
  return {
    _type: "localizedString" as const,
    de: value,
  };
}

function asLocalizedText(value: string) {
  return {
    _type: "localizedText" as const,
    de: value,
  };
}

function asLocalizedBlocks(value: string | PortableTextBlock[]) {
  return {
    _type: "localizedBlocks" as const,
    de: typeof value === "string" ? [toBlock(value)] : value,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isPortableTextArray(value: unknown): value is PortableTextBlock[] {
  return Array.isArray(value);
}

export function LegacyEventDocumentInput(props: ObjectInputProps<Record<string, unknown>>) {
  const { onChange, renderDefault, value } = props;

  useEffect(() => {
    if (!isRecord(value)) {
      return;
    }

    const legacyValue = value as LegacyEventValue;
    const patches = [];

    if (typeof legacyValue.title === "string") {
      patches.push(set(asLocalizedString(legacyValue.title), ["title"]));
    }

    if (typeof legacyValue.summary === "string") {
      patches.push(set(asLocalizedText(legacyValue.summary), ["summary"]));
    }

    if (typeof legacyValue.body === "string" || isPortableTextArray(legacyValue.body)) {
      patches.push(set(asLocalizedBlocks(legacyValue.body), ["body"]));
    }

    if (typeof legacyValue.kind === "string") {
      patches.push(setIfMissing(legacyValue.kind, ["eventType"]));
      patches.push(unset(["kind"]));
    }

    if (typeof legacyValue.dateStart === "string") {
      patches.push(setIfMissing(legacyValue.dateStart, ["startDate"]));
      patches.push(unset(["dateStart"]));
    }

    if (typeof legacyValue.dateEnd === "string") {
      patches.push(setIfMissing(legacyValue.dateEnd, ["endDate"]));
      patches.push(unset(["dateEnd"]));
    }

    if (typeof legacyValue.location === "string") {
      patches.push(setIfMissing(legacyValue.location, ["venue"]));
      patches.push(unset(["location"]));
    }

    if (patches.length) {
      onChange(patches);
    }
  }, [onChange, value]);

  return renderDefault(props);
}
