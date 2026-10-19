"use client";

import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens/colors.stylex";
import { stroke } from "../tokens/stroke.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { shadows } from "../tokens/shadows.stylex";

const styles = stylex.create({
  group: {
    display: "inline-flex",
    padding: "4px",
    gap: "4px",
    borderRadius: radii.control,
    borderWidth: stroke.width,
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: colors.snow,
  },
  button: {
    borderWidth: 0,
    borderRadius: radii.control,
    paddingBlock: "8px",
    paddingInline: "14px",
    backgroundColor: "transparent",
    color: colors.steel,
    fontFamily: font.family,
    fontSize: font.s,
    fontWeight: font.medium,
    cursor: "pointer",
    ":hover": {
      color: colors.black,
      backgroundColor: colors.white,
    },
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blueDark,
      outlineOffset: "2px",
    },
  },
  active: {
    backgroundColor: colors.white,
    color: colors.blueDark,
    boxShadow: shadows.s1,
  },
});

export function ToggleButton({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div role="group" {...stylex.props(styles.group)}>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            {...stylex.props(styles.button, active && styles.active)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
