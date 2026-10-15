"use client";

import * as stylex from "@stylexjs/stylex";
import { useRef, useState, type ReactNode } from "react";
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
    color: colors.blueDark,
    fontFamily: font.family,
    fontSize: font.s,
    fontWeight: font.semibold,
    textDecorationLine: "underline",
    textUnderlineOffset: "3px",
    cursor: "pointer",
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blue,
      outlineOffset: "3px",
    },
  },
  card: {
    position: "absolute",
    top: "calc(100% + 8px)",
    left: 0,
    zIndex: 8,
    width: "240px",
    padding: "14px",
    borderRadius: radii.l,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
    boxShadow: shadows.s2,
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.s,
    lineHeight: 1.45,
  },
});

export function HoverCard({
  trigger,
  children,
}: {
  trigger: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const timer = useRef<number | null>(null);
  const show = () => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(true), 120);
  };
  const hide = () => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(false), 120);
  };

  return (
    <span
      {...stylex.props(styles.root)}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      <button
        type="button"
        aria-expanded={open}
        onFocus={show}
        onBlur={hide}
        {...stylex.props(styles.trigger)}
      >
        {trigger}
      </button>
      {open ? <div {...stylex.props(styles.card)}>{children}</div> : null}
    </span>
  );
}
