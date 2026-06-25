import { defineField, defineType } from "sanity";

export const sectionLayoutOptionsType = defineType({
  name: "sectionLayoutOptions",
  title: "Platzierung auf der Seite",
  type: "object",
  validation: (rule) =>
    rule.custom((value) => {
      if (!value || typeof value !== "object") {
        return true;
      }

      const layout = value as {
        useCustomGrid?: boolean;
        startLine?: string;
        span?: string;
      };

      if (!layout.useCustomGrid) {
        return true;
      }

      if (!layout.startLine || !layout.span) {
        return "Bitte Startlinie und Spaltenbreite setzen, wenn das präzise Desktop-Raster aktiviert ist.";
      }

      const start = Number(layout.startLine);
      const span = Number(layout.span);

      if (Number.isNaN(start) || Number.isNaN(span)) {
        return "Ungültige Desktop-Rasterwerte.";
      }

      if (start + span - 1 > 12) {
        return "Die gewählte Startlinie und Spaltenbreite überschreiten das 12-Spalten-Raster.";
      }

      return true;
    }),
  fields: [
    defineField({
      name: "widthPreset",
      title: "Breite im Satz",
      type: "string",
      initialValue: "main",
      options: {
        list: [
          { title: "Narrow column", value: "narrow" },
          { title: "Main text column", value: "main" },
          { title: "Left inset", value: "leftInset" },
          { title: "Right inset", value: "rightInset" },
          { title: "Wide", value: "wide" },
          { title: "Full width", value: "full" },
        ],
        layout: "radio",
      },
      description: "Empfohlen. Nutzt feste Satzlinien-Presets statt freier Positionierung.",
    }),
    defineField({
      name: "useCustomGrid",
      title: "Präzise Desktop-Satzlinien verwenden",
      type: "boolean",
      initialValue: false,
      description:
        "Nur aktivieren, wenn die Presets nicht ausreichen. Der Block bleibt trotzdem im festen editorischen Raster.",
    }),
    defineField({
      name: "startLine",
      title: "Startlinie",
      type: "string",
      initialValue: "3",
      options: {
        list: [
          { title: "1", value: "1" },
          { title: "2", value: "2" },
          { title: "3", value: "3" },
          { title: "4", value: "4" },
          { title: "5", value: "5" },
          { title: "6", value: "6" },
          { title: "7", value: "7" },
          { title: "8", value: "8" },
        ],
        layout: "dropdown",
      },
      hidden: ({ parent }) => parent?.useCustomGrid !== true,
      description: "Nur auf Desktop relevant. Legt fest, an welcher Satzlinie der Block beginnt.",
    }),
    defineField({
      name: "span",
      title: "Breite in Spalten",
      type: "string",
      initialValue: "6",
      options: {
        list: [
          { title: "4", value: "4" },
          { title: "5", value: "5" },
          { title: "6", value: "6" },
          { title: "8", value: "8" },
          { title: "10", value: "10" },
          { title: "12", value: "12" },
        ],
        layout: "dropdown",
      },
      hidden: ({ parent }) => parent?.useCustomGrid !== true,
      description: "Nur auf Desktop relevant. Begrenzt die Breite auf kuratierte Werte fuer einen ruhigen Seitenrhythmus.",
    }),
    defineField({
      name: "align",
      title: "Ausrichtung im Block",
      type: "string",
      initialValue: "left",
      options: {
        list: [
          { title: "Left aligned", value: "left" },
          { title: "Centered", value: "center" },
          { title: "Right aligned", value: "right" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "spacingTop",
      title: "Abstand oberhalb",
      type: "string",
      initialValue: "medium",
      options: {
        list: [
          { title: "None", value: "none" },
          { title: "Small", value: "small" },
          { title: "Medium", value: "medium" },
          { title: "Large", value: "large" },
          { title: "Extra large", value: "xlarge" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "spacingBottom",
      title: "Abstand unterhalb",
      type: "string",
      initialValue: "medium",
      options: {
        list: [
          { title: "None", value: "none" },
          { title: "Small", value: "small" },
          { title: "Medium", value: "medium" },
          { title: "Large", value: "large" },
          { title: "Extra large", value: "xlarge" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "theme",
      title: "Visuelles Thema",
      type: "string",
      initialValue: "paper",
      options: {
        list: [
          { title: "Paper", value: "paper" },
          { title: "Ink panel", value: "ink" },
          { title: "Muted panel", value: "muted" },
        ],
        layout: "radio",
      },
      description: "Haelt den Block im editorischen Farbsystem, ohne freie Gestaltung zu erlauben.",
    }),
    defineField({
      name: "titleSize",
      title: "Groesse der Ueberschrift",
      type: "string",
      initialValue: "section",
      options: {
        list: [
          { title: "Hero", value: "hero" },
          { title: "Bereich", value: "section" },
          { title: "Karte", value: "card" },
          { title: "Klein", value: "small" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "bodySize",
      title: "Groesse des Fliesstexts",
      type: "string",
      initialValue: "normal",
      options: {
        list: [
          { title: "Gross", value: "large" },
          { title: "Normal", value: "normal" },
          { title: "Klein", value: "small" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "gridPlacement",
      title: "Advanced desktop grid placement",
      type: "gridPlacementOptions",
      description:
        "Legacy field kept for existing content.",
      hidden: true,
    }),
    defineField({
      name: "width",
      title: "Legacy width",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "indent",
      title: "Legacy indent",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "columnPosition",
      title: "Legacy column position",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "alignment",
      title: "Legacy alignment",
      type: "string",
      hidden: true,
    }),
  ],
  preview: {
    select: {
      widthPreset: "widthPreset",
      useCustomGrid: "useCustomGrid",
      startLine: "startLine",
      span: "span",
      align: "align",
      theme: "theme",
      titleSize: "titleSize",
      bodySize: "bodySize",
      legacyWidth: "width",
      legacyAlign: "alignment",
    },
    prepare({ widthPreset, useCustomGrid, startLine, span, align, theme, titleSize, bodySize, legacyWidth, legacyAlign }) {
      const resolvedWidthPreset = widthPreset || legacyWidth;
      const resolvedAlign = align || legacyAlign;
      const title = useCustomGrid
        ? `Grid lines ${startLine || "3"} / span ${span || "6"}`
        : resolvedWidthPreset
          ? `${resolvedWidthPreset} preset`
          : "Platzierung auf der Seite";
      const subtitle = [resolvedAlign, theme, titleSize, bodySize, useCustomGrid ? "custom grid" : "preset width"]
        .filter(Boolean)
        .join(" • ");

      return {
        title,
        subtitle,
      };
    },
  },
});
