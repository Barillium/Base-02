import { set, type ObjectInputProps } from "sanity";
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isLegacyLocalizedString(value: unknown) {
  return typeof value === "string";
}

function isLegacyLocalizedText(value: unknown) {
  return typeof value === "string";
}

function isLegacyLocalizedBlocks(value: unknown) {
  return typeof value === "string" || Array.isArray(value);
}

function LegacyConversionNotice({ message }: { message: string }) {
  return (
    <div
      style={{
        border: "1px solid var(--card-border-color, #e8a0a0)",
        borderRadius: "6px",
        padding: "12px",
        background: "var(--card-caution-bg-color, #fff6f6)",
      }}
    >
      <p style={{ fontSize: "12px", fontWeight: 600, margin: 0 }}>Legacy content detected</p>
      <p style={{ fontSize: "12px", margin: "6px 0 0" }}>{message}</p>
    </div>
  );
}

export function LocalizedStringInput(props: ObjectInputProps<Record<string, unknown>>) {
  const { onChange, renderDefault, value } = props;

  useEffect(() => {
    if (!isLegacyLocalizedString(value)) {
      return;
    }

    onChange(
      set({
        _type: "localizedString",
        de: value,
      }),
    );
  }, [onChange, value]);

  if (isLegacyLocalizedString(value)) {
    return <LegacyConversionNotice message="A legacy plain-text value is being converted into a localized string." />;
  }

  return renderDefault(props);
}

export function LocalizedTextInput(props: ObjectInputProps<Record<string, unknown>>) {
  const { onChange, renderDefault, value } = props;

  useEffect(() => {
    if (!isLegacyLocalizedText(value)) {
      return;
    }

    onChange(
      set({
        _type: "localizedText",
        de: value,
      }),
    );
  }, [onChange, value]);

  if (isLegacyLocalizedText(value)) {
    return <LegacyConversionNotice message="A legacy plain-text value is being converted into a localized text field." />;
  }

  return renderDefault(props);
}

export function LocalizedBlocksInput(props: ObjectInputProps<Record<string, unknown>>) {
  const { onChange, renderDefault, value } = props;

  useEffect(() => {
    if (!isLegacyLocalizedBlocks(value)) {
      return;
    }

    const germanBlocks =
      typeof value === "string"
        ? [toBlock(value)]
        : value;

    onChange(
      set({
        _type: "localizedBlocks",
        de: germanBlocks,
      }),
    );
  }, [onChange, value]);

  if (isLegacyLocalizedBlocks(value)) {
    return <LegacyConversionNotice message="Legacy rich text is being wrapped into the localized content structure." />;
  }

  if (isRecord(value) && !("de" in value || "en" in value)) {
    return <LegacyConversionNotice message="This value is not yet in the expected localized rich-text format." />;
  }

  return renderDefault(props);
}
