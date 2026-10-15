"use client";

import * as stylex from "@stylexjs/stylex";
import { useState } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { shadows } from "../tokens/shadows.stylex";
import { Icon } from "./Icon";

const styles = stylex.create({
  root: {
    position: "relative",
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "8px",
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "8px",
  },
  action: {
    borderWidth: 0,
    borderRadius: "999px",
    paddingBlock: "8px",
    paddingInline: "14px",
    backgroundColor: colors.white,
    color: colors.black,
    boxShadow: shadows.s2,
    fontFamily: font.family,
    fontSize: font.s,
    cursor: "pointer",
  },
  fab: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "48px",
    height: "48px",
    borderWidth: 0,
    borderRadius: "50%",
    backgroundColor: colors.blue,
    color: colors.onAccent,
    cursor: "pointer",
    boxShadow: shadows.s3,
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blueDark,
      outlineOffset: "3px",
    },
  },
});

export function SpeedDial({
  actions,
}: {
  actions: { label: string; onClick: () => void }[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <div {...stylex.props(styles.root)}>
      {open ? (
        <div {...stylex.props(styles.actions)}>
          {actions.map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={() => {
                action.onClick();
                setOpen(false);
              }}
              {...stylex.props(styles.action)}
            >
              {action.label}
            </button>
          ))}
        </div>
      ) : null}
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close actions" : "Open actions"}
        onClick={() => setOpen((value) => !value)}
        {...stylex.props(styles.fab)}
      >
        <Icon name={open ? "x" : "plus"} />
      </button>
    </div>
  );
}
