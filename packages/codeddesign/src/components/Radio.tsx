"use client";

import * as stylex from "@stylexjs/stylex";
import { useId } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";

const pop = stylex.keyframes({
  "0%": { transform: "scale(0.6)" },
  "70%": { transform: "scale(1.2)" },
  "100%": { transform: "scale(1)" },
});

const styles = stylex.create({
  group: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    borderWidth: 0,
    margin: 0,
    padding: 0,
  },
  legend: {
    marginBottom: "4px",
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.s,
    fontWeight: font.semibold,
  },
  option: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.s,
    cursor: "pointer",
  },
  input: {
    appearance: "none",
    width: "20px",
    height: "20px",
    margin: 0,
    borderRadius: "50%",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.steel,
    backgroundColor: colors.white,
    display: "grid",
    placeItems: "center",
    ":checked": {
      borderColor: colors.blue,
    },
    ":checked::before": {
      content: '""',
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      backgroundColor: colors.blue,
      animationName: pop,
      animationDuration: "220ms",
      animationTimingFunction: "ease-out",
    },
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blue,
      outlineOffset: "2px",
    },
    ":disabled": {
      cursor: "not-allowed",
      borderColor: colors.smoke,
    },
  },
});

export type RadioOption = { label: string; value: string; disabled?: boolean };

export function Radio({
  name,
  legend,
  options,
  value,
  onChange,
}: {
  name?: string;
  legend?: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
}) {
  const generated = useId();
  const group = name ?? generated;
  return (
    <fieldset {...stylex.props(styles.group)}>
      {legend ? <legend {...stylex.props(styles.legend)}>{legend}</legend> : null}
      {options.map((option) => (
        <label key={option.value} {...stylex.props(styles.option)}>
          <input
            type="radio"
            name={group}
            value={option.value}
            checked={value === option.value}
            disabled={option.disabled}
            onChange={() => onChange?.(option.value)}
            {...stylex.props(styles.input)}
          />
          {option.label}
        </label>
      ))}
    </fieldset>
  );
}
