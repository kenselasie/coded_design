"use client";

import * as stylex from "@stylexjs/stylex";
import { useState } from "react";
import { colors } from "../tokens/colors.stylex";
import { stroke } from "../tokens/stroke.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { shadows } from "../tokens/shadows.stylex";
import { Icon } from "./Icon";

const styles = stylex.create({
  block: {
    position: "relative",
    overflow: "hidden",
    borderRadius: radii.control,
    borderWidth: stroke.width,
    borderStyle: "solid",
    borderColor: colors.codeRule,
    borderLeftWidth: "3px",
    borderLeftColor: colors.blue,
    backgroundColor: colors.codeBg,
    boxShadow: shadows.s1,
    color: colors.codeFg,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    padding: "8px 12px",
    borderBottomWidth: stroke.hairline,
    borderBottomStyle: "solid",
    borderBottomColor: colors.codeRule,
  },
  label: {
    margin: 0,
    fontFamily: font.display,
    fontSize: font.xs,
    fontWeight: font.semibold,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: colors.codeFg,
    opacity: 0.72,
  },
  copy: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    borderWidth: stroke.width,
    borderStyle: "solid",
    borderColor: colors.codeRule,
    borderRadius: radii.control,
    padding: "4px 10px",
    backgroundColor: "transparent",
    color: colors.codeFg,
    fontFamily: font.family,
    fontSize: font.xs,
    fontWeight: font.semibold,
    lineHeight: 1,
    cursor: "pointer",
    ":hover": {
      backgroundColor: colors.codeRule,
    },
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blue,
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
    padding: "14px 16px",
    overflowX: "auto",
    fontFamily: font.mono,
    fontSize: font.xs,
    lineHeight: 1.6,
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
