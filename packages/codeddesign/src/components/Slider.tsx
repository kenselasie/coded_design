"use client";

import * as stylex from "@stylexjs/stylex";
import { useId } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";

const styles = stylex.create({
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    minWidth: "220px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.s,
    fontWeight: font.medium,
  },
  value: {
    color: colors.steel,
    fontVariantNumeric: "tabular-nums",
  },
  input: {
    width: "100%",
    accentColor: colors.blueDark,
    cursor: "pointer",
  },
});

export function Slider({
  label,
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
}: {
  label: string;
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
}) {
  const id = useId();
  return (
    <label htmlFor={id} {...stylex.props(styles.field)}>
      <span {...stylex.props(styles.header)}>
        {label}
        <span {...stylex.props(styles.value)}>{value}</span>
      </span>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        {...stylex.props(styles.input)}
      />
    </label>
  );
}
