"use client";

import * as stylex from "@stylexjs/stylex";
import { useId, useState, type ReactNode } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { Icon } from "./Icon";

const pop = stylex.keyframes({
  "0%": { transform: "scale(0.8)" },
  "60%": { transform: "scale(1.12)" },
  "100%": { transform: "scale(1)" },
});

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
  box: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "18px",
    height: "18px",
    borderRadius: radii.s,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.steel,
    backgroundColor: colors.white,
    color: colors.onAccent,
    flexShrink: 0,
  },
  checked: {
    backgroundColor: colors.blue,
    borderColor: colors.blue,
    animationName: pop,
    animationDuration: "220ms",
    animationTimingFunction: "ease-out",
  },
  boxDisabled: {
    backgroundColor: colors.snowDark,
    borderColor: colors.smoke,
    color: colors.concrete,
  },
});

export function Checkbox({
  checked,
  defaultChecked,
  onChange,
  disabled,
  children,
  name,
}: {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  children?: ReactNode;
  name?: string;
}) {
  const id = useId();
  const [uncontrolled, setUncontrolled] = useState(defaultChecked ?? false);
  const isChecked = checked ?? uncontrolled;
  return (
    <label htmlFor={id} {...stylex.props(styles.label, disabled && styles.disabled)}>
      <input
        id={id}
        type="checkbox"
        name={name}
        checked={isChecked}
        disabled={disabled}
        onChange={(event) => {
          if (checked === undefined) setUncontrolled(event.target.checked);
          onChange?.(event.target.checked);
        }}
        {...stylex.props(styles.input)}
      />
      <span
        {...stylex.props(
          styles.box,
          isChecked && styles.checked,
          disabled && styles.boxDisabled,
        )}
      >
        {isChecked ? <Icon name="check" size={14} /> : null}
      </span>
      {children}
    </label>
  );
}
