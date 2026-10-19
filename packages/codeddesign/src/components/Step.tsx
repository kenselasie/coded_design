"use client";

import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";

const styles = stylex.create({
  button: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    cursor: "pointer",
    textAlign: "left",
    ":disabled": {
      cursor: "not-allowed",
    },
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blueDark,
      outlineOffset: "3px",
      borderRadius: "6px",
    },
  },
  marker: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.smokeDarker,
    backgroundColor: colors.white,
    color: colors.steel,
    fontFamily: font.family,
    fontSize: font.xs,
    fontWeight: font.semibold,
  },
  active: {
    backgroundColor: colors.blueDark,
    borderColor: colors.blueDark,
    color: colors.onAccent,
  },
  done: {
    backgroundColor: colors.success,
    borderColor: colors.success,
    color: colors.onAccent,
  },
  label: {
    color: colors.steel,
    fontFamily: font.family,
    fontSize: font.s,
    fontWeight: font.medium,
  },
  labelActive: {
    color: colors.black,
  },
});

export function Step({
  number,
  label,
  active = false,
  complete = false,
  isBlocked = false,
  onClick,
}: {
  number: number;
  label: string;
  active?: boolean;
  complete?: boolean;
  isBlocked?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      disabled={isBlocked}
      onClick={onClick}
      {...stylex.props(styles.button)}
    >
      <span
        {...stylex.props(
          styles.marker,
          complete && styles.done,
          active && styles.active,
        )}
      >
        {number}
      </span>
      <span {...stylex.props(styles.label, (active || complete) && styles.labelActive)}>
        {label}
      </span>
    </button>
  );
}

export function SteppedHeader({
  steps,
  current,
  onChange,
}: {
  steps: { label: string }[];
  current: number;
  onChange?: (index: number) => void;
}) {
  return (
    <div {...stylex.props(header.row)}>
      {steps.map((step, index) => (
        <Step
          key={step.label}
          number={index + 1}
          label={step.label}
          active={index === current}
          complete={index < current}
          onClick={onChange ? () => onChange(index) : undefined}
        />
      ))}
    </div>
  );
}

const header = stylex.create({
  row: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
});
