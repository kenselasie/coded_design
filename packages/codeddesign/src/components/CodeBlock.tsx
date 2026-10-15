"use client";

import * as stylex from "@stylexjs/stylex";
import { useState } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { shadows } from "../tokens/shadows.stylex";
import { Icon } from "./Icon";

const styles = stylex.create({
  block: {
    position: "relative",
    overflow: "hidden",
    borderRadius: radii.l,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.well,
    boxShadow: shadows.s2,
    color: colors.onWell,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    padding: "10px 14px",
    borderBottomWidth: "2px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.whale,
  },
  label: {
    margin: 0,
    fontFamily: font.display,
    fontSize: font.xs,
    fontWeight: font.semibold,
    letterSpacing: "0.02em",
  },
  copy: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.onWell,
    borderRadius: radii.pill,
    padding: "4px 10px",
    backgroundColor: "transparent",
    color: colors.onWell,
    fontFamily: font.display,
    fontSize: font.xs,
    fontWeight: font.semibold,
    lineHeight: 1,
    cursor: "pointer",
    ":hover": {
      backgroundColor: colors.whale,
    },
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.turquoise,
      outlineOffset: "2px",
    },
  },
  copyLabel: {
    display: "block",
    lineHeight: 1,
    transform: "translateY(-1px)",
  },
  pre: {
    margin: 0,
    padding: "16px",
    overflowX: "auto",
    fontFamily: font.mono,
    fontSize: font.xs,
    lineHeight: 1.55,
    maxWidth: "100%",
    whiteSpace: "pre-wrap",
    overflowWrap: "anywhere",
  },
});

export function CodeBlock({
  code,
  language = "tsx",
}: {
  code: string;
  language?: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <div {...stylex.props(styles.block)}>
      <div {...stylex.props(styles.header)}>
        <p {...stylex.props(styles.label)}>{language}</p>
        <button
          type="button"
          onClick={async () => {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1400);
          }}
          {...stylex.props(styles.copy)}
        >
          <Icon name="copy" size={14} />
          <span {...stylex.props(styles.copyLabel)}>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre {...stylex.props(styles.pre)}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
