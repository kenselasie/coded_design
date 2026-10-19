"use client";

import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { colors } from "../tokens/colors.stylex";
import { stroke } from "../tokens/stroke.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { shadows } from "../tokens/shadows.stylex";

const styles = stylex.create({
  toggle: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "36px",
    paddingInline: "12px",
    borderRadius: radii.control,
    borderWidth: stroke.width,
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: colors.white,
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.s,
    fontWeight: font.medium,
    cursor: "pointer",
    ":hover": {
      backgroundColor: colors.snow,
    },
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blueDark,
      outlineOffset: "2px",
    },
  },
  pressed: {
    backgroundColor: colors.blueLight,
    color: colors.blueDark,
    borderColor: colors.blueDark,
    boxShadow: shadows.s1,
  },
});

export function Toggle({
  pressed,
  onPressedChange,
  children,
}: {
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={() => onPressedChange(!pressed)}
      {...stylex.props(styles.toggle, pressed && styles.pressed)}
    >
      {children}
    </button>
  );
}
