"use client";

import * as stylex from "@stylexjs/stylex";
import { useState, type ReactNode } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { Icon } from "./Icon";

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  trigger: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    alignSelf: "flex-start",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    borderRadius: radii.pill,
    paddingBlock: "8px",
    paddingInline: "14px",
    backgroundColor: colors.white,
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.s,
    fontWeight: font.semibold,
    cursor: "pointer",
    ":hover": {
      backgroundColor: colors.snowDark,
    },
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blue,
      outlineOffset: "2px",
    },
  },
  chevron: {
    display: "inline-flex",
    transitionProperty: "transform",
    transitionDuration: "160ms",
    transitionTimingFunction: "ease-out",
  },
  open: {
    transform: "rotate(180deg)",
  },
  content: {
    color: colors.steel,
    fontFamily: font.family,
    fontSize: font.s,
    lineHeight: 1.5,
  },
});

export function Collapsible({
  label,
  children,
  defaultOpen = false,
}: {
  label: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div {...stylex.props(styles.root)}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        {...stylex.props(styles.trigger)}
      >
        {label}
        <span {...stylex.props(styles.chevron, open && styles.open)}>
          <Icon name="chevron" />
        </span>
      </button>
      {open ? <div {...stylex.props(styles.content)}>{children}</div> : null}
    </div>
  );
}
