"use client";

import * as stylex from "@stylexjs/stylex";
import { useState, type ReactNode } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { Icon } from "./Icon";
import { dropdown } from "./dropdownStyles";

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
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
        {...stylex.props(dropdown.trigger, dropdown.triggerInline, open && dropdown.triggerOpen)}
      >
        {label}
        <span {...stylex.props(dropdown.chevron, open && dropdown.chevronOpen)}>
          <Icon name="chevron" />
        </span>
      </button>
      {open ? <div {...stylex.props(styles.content)}>{children}</div> : null}
    </div>
  );
}
