"use client";

import * as stylex from "@stylexjs/stylex";
import { useId, type ReactNode } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";

const styles = stylex.create({
  label: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.s,
    cursor: "pointer",
  },
  disabled: {
    color: colors.concrete,
    cursor: "not-allowed",
  },
  input: {
    position: "absolute",
    opacity: 0,
    width: "1px",
    height: "1px",
  },
  track: {
    width: "40px",
    height: "24px",
    borderRadius: "999px",
    backgroundColor: colors.smokeDarker,
    position: "relative",
    flexShrink: 0,
    transitionProperty: "background-color",
    transitionDuration: "150ms",
  },
  on: {
    backgroundColor: colors.blueDark,
  },
  thumb: {
    position: "absolute",
    top: "3px",
    left: "3px",
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    backgroundColor: colors.white,
    transitionProperty: "transform",
    transitionDuration: "150ms",
  },
  thumbOn: {
    transform: "translateX(16px)",
  },
});

export function Switch({
  checked = false,
  onChange,
  disabled,
  children,
}: {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  children?: ReactNode;
}) {
  const id = useId();
  return (
    <label htmlFor={id} {...stylex.props(styles.label, disabled && styles.disabled)}>
      <input
        id={id}
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.checked)}
        {...stylex.props(styles.input)}
      />
      <span {...stylex.props(styles.track, checked && styles.on)}>
        <span {...stylex.props(styles.thumb, checked && styles.thumbOn)} />
      </span>
      {children}
    </label>
  );
}
