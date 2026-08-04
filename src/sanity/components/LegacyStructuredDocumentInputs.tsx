import { set, setIfMissing, unset, type FormPatch, type ObjectInputProps } from "sanity";
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

type LegacyStructuredValue = Record<string, unknown> & {
  eyebrow?: unknown;
  title?: unknown;
  displayTitle?: unknown;
  description?: unknown;
  summary?: unknown;
  body?: unknown;
  keyPoints?: unknown;
  associationStatement?: unknown;
  seoDescription?: unknown;
  statement?: unknown;
  note?: unknown;
  milestones?: unknown;
  typeLabel?: unknown;
  intro?: unknown;
  profileEyebrow?: unknown;
  profileTitle?: unknown;
  profileText?: unknown;
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

function asEditorialIntro(value: {
  eyebrow?: string;
  title?: string;
  displayTitle?: string;
  description?: string;
  note?: string;
}) {
  return {
    _type: "editorialIntro" as const,
    eyebrow: value.eyebrow ? asLocalizedString(value.eyebrow) : undefined,
    title: value.title ? asLocalizedString(value.title) : undefined,
    displayTitle: value.displayTitle ? asLocalizedText(value.displayTitle) : undefined,
    description: value.description ? asLocalizedText(value.description) : undefined,
    note: value.note ? asLocalizedText(value.note) : undefined,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isPortableTextArray(value: unknown): value is PortableTextBlock[] {
  return Array.isArray(value);
}

function migrateLocalizedEditorialFields(legacyValue: LegacyStructuredValue) {
  const patches: FormPatch[] = [];

  if (typeof legacyValue.title === "string") {
    patches.push(set(asLocalizedString(legacyValue.title), ["title"]));
  }

  if (typeof legacyValue.summary === "string") {
    patches.push(set(asLocalizedText(legacyValue.summary), ["summary"]));
  }

  if (typeof legacyValue.body === "string" || isPortableTextArray(legacyValue.body)) {
    patches.push(set(asLocalizedBlocks(legacyValue.body), ["body"]));
  }

  return patches;
}

function migrateLegacyIntroFields(legacyValue: LegacyStructuredValue) {
  const patches: FormPatch[] = [];

  const hasLegacyIntroFields =
    typeof legacyValue.eyebrow === "string" ||
    typeof legacyValue.title === "string" ||
    typeof legacyValue.displayTitle === "string" ||
    typeof legacyValue.description === "string" ||
    typeof legacyValue.note === "string";

  if (!legacyValue.intro && hasLegacyIntroFields) {
    patches.push(
      set(
        asEditorialIntro({
          eyebrow: typeof legacyValue.eyebrow === "string" ? legacyValue.eyebrow : undefined,
          title: typeof legacyValue.title === "string" ? legacyValue.title : undefined,
          displayTitle:
            typeof legacyValue.displayTitle === "string" ? legacyValue.displayTitle : undefined,
          description:
            typeof legacyValue.description === "string" ? legacyValue.description : undefined,
          note: typeof legacyValue.note === "string" ? legacyValue.note : undefined,
        }),
        ["intro"],
      ),
    );

    if (typeof legacyValue.eyebrow === "string") {
      patches.push(unset(["eyebrow"]));
    }

    if (typeof legacyValue.title === "string") {
      patches.push(unset(["title"]));
    }

    if (typeof legacyValue.displayTitle === "string") {
      patches.push(unset(["displayTitle"]));
    }

    if (typeof legacyValue.description === "string") {
      patches.push(unset(["description"]));
    }

    if (typeof legacyValue.note === "string") {
      patches.push(unset(["note"]));
    }
  }

  return patches;
}

function migrateLegacyKeyPoints(legacyValue: LegacyStructuredValue) {
  if (!Array.isArray(legacyValue.keyPoints)) {
    return [];
  }

  const hasLegacyStringEntry = legacyValue.keyPoints.some((entry) => typeof entry === "string");

  if (!hasLegacyStringEntry) {
    return [];
  }

  return [
    set(
      legacyValue.keyPoints.flatMap((entry) => {
        if (typeof entry === "string") {
          return {
            _key: legacyKey("point"),
            ...asLocalizedString(entry),
          };
        }

        return isRecord(entry)
          ? [
              {
                _key:
                  typeof entry._key === "string" ? entry._key : legacyKey("point"),
                ...entry,
              },
            ]
          : [];
      }),
      ["keyPoints"],
    ),
  ] satisfies FormPatch[];
}

export function LegacyProgrammeSeriesDocumentInput(props: ObjectInputProps<Record<string, unknown>>) {
  const { onChange, renderDefault, value } = props;

  useEffect(() => {
    if (!isRecord(value)) {
      return;
    }

    const patches = migrateLocalizedEditorialFields(value as LegacyStructuredValue);

    if (patches.length) {
      onChange(patches);
    }
  }, [onChange, value]);

  return renderDefault(props);
}

export function LegacyArchiveEntryDocumentInput(props: ObjectInputProps<Record<string, unknown>>) {
  const { onChange, renderDefault, value } = props;

  useEffect(() => {
    if (!isRecord(value)) {
      return;
    }

    const legacyValue = value as LegacyStructuredValue;
    const patches: FormPatch[] = migrateLocalizedEditorialFields(legacyValue);

    if (typeof legacyValue.typeLabel === "string") {
      patches.push(setIfMissing(legacyValue.typeLabel, ["archiveType"]));

      if (legacyValue.typeLabel === "poster") {
        patches.push(setIfMissing("poster", ["archiveCategory"]));
      }

      if (legacyValue.typeLabel === "catalogue") {
        patches.push(setIfMissing("catalogue", ["archiveCategory"]));
      }

      patches.push(unset(["typeLabel"]));
    }

    if (patches.length) {
      onChange(patches);
    }
  }, [onChange, value]);

  return renderDefault(props);
}

export function LegacyMediaProjectDocumentInput(props: ObjectInputProps<Record<string, unknown>>) {
  const { onChange, renderDefault, value } = props;

  useEffect(() => {
    if (!isRecord(value)) {
      return;
    }

    const patches = migrateLocalizedEditorialFields(value as LegacyStructuredValue);

    if (patches.length) {
      onChange(patches);
    }
  }, [onChange, value]);

  return renderDefault(props);
}

export function LegacySiteSettingsDocumentInput(props: ObjectInputProps<Record<string, unknown>>) {
  const { onChange, renderDefault, value } = props;

  useEffect(() => {
    if (!isRecord(value)) {
      return;
    }

    const legacyValue = value as LegacyStructuredValue;
    const patches: FormPatch[] = [];

    if (typeof legacyValue.associationStatement === "string") {
      patches.push(set(asLocalizedText(legacyValue.associationStatement), ["associationStatement"]));
    }

    if (typeof legacyValue.seoDescription === "string") {
      patches.push(setIfMissing({}, ["defaultSeo"]));
      patches.push(set(asLocalizedText(legacyValue.seoDescription), ["defaultSeo", "metaDescription"]));
      patches.push(unset(["seoDescription"]));
    }

    if ("categoryName" in legacyValue) {
      patches.push(unset(["categoryName"]));
    }

    if (patches.length) {
      onChange(patches);
    }
  }, [onChange, value]);

  return renderDefault(props);
}

export function LegacyHomePageDocumentInput(props: ObjectInputProps<Record<string, unknown>>) {
  const { onChange, renderDefault, value } = props;

  useEffect(() => {
    if (!isRecord(value)) {
      return;
    }

    const legacyValue = value as LegacyStructuredValue;
    const patches: FormPatch[] = [];

    if (typeof legacyValue.statement === "string") {
      patches.push(set(asLocalizedText(legacyValue.statement), ["statement"]));
    }

    if (typeof legacyValue.note === "string") {
      patches.push(set(asLocalizedText(legacyValue.note), ["note"]));
    }

    if (typeof legacyValue.milestones === "string" || isPortableTextArray(legacyValue.milestones)) {
      patches.push(set(asLocalizedBlocks(legacyValue.milestones), ["milestones"]));
    }

    if (patches.length) {
      onChange(patches);
    }
  }, [onChange, value]);

  return renderDefault(props);
}

export function LegacyAboutPageDocumentInput(props: ObjectInputProps<Record<string, unknown>>) {
  const { onChange, renderDefault, value } = props;

  useEffect(() => {
    if (!isRecord(value)) {
      return;
    }

    const legacyValue = value as LegacyStructuredValue;
    const patches: FormPatch[] = [...migrateLegacyIntroFields(legacyValue)];

    if (typeof legacyValue.profileEyebrow === "string") {
      patches.push(set(asLocalizedString(legacyValue.profileEyebrow), ["profileEyebrow"]));
    }

    if (typeof legacyValue.profileTitle === "string") {
      patches.push(set(asLocalizedText(legacyValue.profileTitle), ["profileTitle"]));
    }

    if (typeof legacyValue.profileText === "string" || isPortableTextArray(legacyValue.profileText)) {
      patches.push(set(asLocalizedBlocks(legacyValue.profileText), ["profileText"]));
    }

    if (patches.length) {
      onChange(patches);
    }
  }, [onChange, value]);

  return renderDefault(props);
}

export function LegacyStaticPageDocumentInput(props: ObjectInputProps<Record<string, unknown>>) {
  const { onChange, renderDefault, value } = props;

  useEffect(() => {
    if (!isRecord(value)) {
      return;
    }

    const legacyValue = value as LegacyStructuredValue;
    const patches: FormPatch[] = [
      ...migrateLegacyIntroFields(legacyValue),
      ...migrateLegacyKeyPoints(legacyValue),
    ];

    if (typeof legacyValue.body === "string" || isPortableTextArray(legacyValue.body)) {
      patches.push(set(asLocalizedBlocks(legacyValue.body), ["body"]));
    }

    if (patches.length) {
      onChange(patches);
    }
  }, [onChange, value]);

  return renderDefault(props);
}
