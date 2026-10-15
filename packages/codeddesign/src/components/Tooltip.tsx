"use client";

import * as stylex from "@stylexjs/stylex";
import { useId, useState, type ReactNode } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";

const styles = stylex.create({
  wrap: {
    position: "relative",
    display: "inline-flex",
  },
  tip: {
    position: "absolute",
    left: "50%",
    bottom: "calc(100% + 8px)",
    transform: "translateX(-50%)",
    zIndex: 5,
    maxWidth: "240px",
    paddingBlock: "6px",
    paddingInline: "10px",
    borderRadius: radii.s,
    backgroundColor: colors.black,
    color: colors.onAccent,
    fontFamily: font.family,
    fontSize: font.xs,
    lineHeight: 1.4,
    whiteSpace: "nowrap",
    pointerEvents: "none",
  },
});

export function Tooltip({
  content,
  children,
}: {
  content: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <span
      {...stylex.props(styles.wrap)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <span aria-describedby={open ? id : undefined}>{children}</span>
      {open ? (
        <span id={id} role="tooltip" {...stylex.props(styles.tip)}>
          {content}
        </span>
      ) : null}
    </span>
  );
}
