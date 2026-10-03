"use client";

import * as stylex from "@stylexjs/stylex";
import { useState, type ReactNode } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { shadows } from "../tokens/shadows.stylex";

const styles = stylex.create({
  root: {
    position: "relative",
    display: "inline-flex",
  },
  trigger: {
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.smokeDarker,
    borderRadius: radii.m,
    paddingBlock: "8px",
    paddingInline: "12px",
    backgroundColor: colors.white,
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.s,
    cursor: "pointer",
  },
  panel: {
    position: "absolute",
    top: "calc(100% + 6px)",
    right: 0,
    zIndex: 5,
    minWidth: "180px",
    padding: "8px",
    borderRadius: radii.l,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.smoke,
    backgroundColor: colors.white,
    boxShadow: shadows.s2,
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.s,
  },
});

export function OverflowPopover({
  label = "More",
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div {...stylex.props(styles.root)}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        {...stylex.props(styles.trigger)}
      >
        {label}
      </button>
      {open ? <div {...stylex.props(styles.panel)}>{children}</div> : null}
    </div>
  );
}
