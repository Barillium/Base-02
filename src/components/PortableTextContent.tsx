import { Fragment, type ReactNode } from "react";

import type {
  PortableTextBlock,
  PortableTextMarkDef,
  PortableTextSpan,
  SanityTextLayout,
} from "@/sanity/lib/content";

type PortableTextContentProps = {
  blocks?: PortableTextBlock[] | null;
  layout?: SanityTextLayout | null;
  className?: string;
};

type PortableTextListSegment = {
  _key: string;
  type: "list";
  listItem: "bullet" | "number";
  level: number;
  items: PortableTextBlock[];
};

type PortableTextBlockSegment = {
  _key: string;
  type: "block";
  block: PortableTextBlock;
};

type PortableTextSegment = PortableTextListSegment | PortableTextBlockSegment;

function blockHasText(block: PortableTextBlock): boolean {
  return (block.children ?? []).some((child) => Boolean(child.text?.trim()));
}

function findMarkDef(block: PortableTextBlock, mark: string): PortableTextMarkDef | undefined {
  return (block.markDefs ?? []).find((definition) => definition._key === mark);
}

function renderSpanContent(span: PortableTextSpan, block: PortableTextBlock, index: number): ReactNode {
  const baseText = span.text ?? "";

  if (!baseText) {
    return null;
  }

  const rendered = (span.marks ?? []).reduce<ReactNode>((content, mark) => {
    const markDef = findMarkDef(block, mark);

    if (markDef?._type === "link" && markDef.href) {
      return (
        <a
          href={markDef.href}
          target={markDef.href.startsWith("http") ? "_blank" : undefined}
          rel={markDef.href.startsWith("http") ? "noreferrer noopener" : undefined}
          className="text-[var(--accent)] underline underline-offset-4 transition-colors hover:text-[var(--ink)]"
        >
          {content}
        </a>
      );
    }

    if (mark === "strong") {
      return <strong className="font-semibold">{content}</strong>;
    }

    if (mark === "em") {
      return <em className="italic">{content}</em>;
    }

    if (mark === "underline") {
      return <span className="underline underline-offset-4">{content}</span>;
    }

    return content;
  }, baseText);

  return <Fragment key={span._key ?? `${baseText}-${index}`}>{rendered}</Fragment>;
}

function renderInlineChildren(block: PortableTextBlock) {
  return (block.children ?? []).map((span, index) => renderSpanContent(span, block, index));
}

function buildSegments(blocks: PortableTextBlock[]): PortableTextSegment[] {
  const segments: PortableTextSegment[] = [];
  let activeList: PortableTextListSegment | null = null;

  const flushActiveList = () => {
    if (activeList) {
      segments.push(activeList);
      activeList = null;
    }
  };

  blocks.forEach((block, index) => {
    if (!blockHasText(block)) {
      return;
    }

    const listItem = block.listItem;
    const level = block.level ?? 1;

    if (listItem === "bullet" || listItem === "number") {
      if (
        activeList &&
        activeList.listItem === listItem &&
        activeList.level === level
      ) {
        activeList.items.push(block);
      } else {
        flushActiveList();
        activeList = {
          _key: block._key ?? `list-${listItem}-${index}`,
          type: "list",
          listItem,
          level,
          items: [block],
        };
      }

      return;
    }

    flushActiveList();
    segments.push({
      _key: block._key ?? `block-${index}`,
      type: "block",
      block,
    });
  });

  flushActiveList();

  return segments;
}

function renderBlock(block: PortableTextBlock) {
  const content = renderInlineChildren(block);

  if (block.style === "h2") {
    return <h2 className="type-display-card text-[var(--ink)]">{content}</h2>;
  }

  if (block.style === "h3") {
    return <h3 className="type-title text-[var(--ink)]">{content}</h3>;
  }

  if (block.style === "blockquote") {
    return (
      <blockquote className="border-l border-[var(--line)] pl-4 italic text-[var(--muted)]">
        {content}
      </blockquote>
    );
  }

  return <p className="type-body-lg text-[var(--ink)]">{content}</p>;
}

function renderList(segment: PortableTextListSegment) {
  const ListTag = segment.listItem === "number" ? "ol" : "ul";
  const paddingClass = segment.level > 1 ? "pl-10" : "pl-6";

  return (
    <ListTag
      className={`space-y-3 ${paddingClass} ${
        segment.listItem === "number" ? "list-decimal" : "list-disc"
      } text-[var(--ink)] marker:text-[var(--accent)]`}
    >
      {segment.items.map((item, index) => (
        <li key={item._key ?? `${segment._key}-${index}`} className="type-body-lg">
          {renderInlineChildren(item)}
        </li>
      ))}
    </ListTag>
  );
}

export function PortableTextContent({ blocks, layout, className }: PortableTextContentProps) {
  if (!blocks?.length) {
    return null;
  }

  const alignmentClass =
    layout?.alignment === "center"
      ? "text-center"
      : layout?.alignment === "right"
        ? "text-right"
        : "text-left";
  const positionClass = layout?.position === "centered" ? "mx-auto max-w-[42rem]" : "";
  const segments = buildSegments(blocks);

  return (
    <div className={`min-w-0 w-full space-y-5 ${alignmentClass} ${positionClass} ${className ?? ""}`}>
      {segments.map((segment) =>
        segment.type === "list" ? (
          <div key={segment._key}>{renderList(segment)}</div>
        ) : (
          <div key={segment._key}>{renderBlock(segment.block)}</div>
        ),
      )}
    </div>
  );
}
