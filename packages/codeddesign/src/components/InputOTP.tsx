"use client";

import * as stylex from "@stylexjs/stylex";
import { useRef } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";

const styles = stylex.create({
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.s,
    fontWeight: font.semibold,
  },
  row: {
    display: "flex",
    gap: "8px",
  },
  box: {
    width: "44px",
    height: "48px",
    textAlign: "center",
    borderRadius: radii.m,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.xl,
    fontWeight: font.semibold,
    caretColor: colors.blueDark,
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blue,
      outlineOffset: "2px",
    },
  },
});

export function InputOTP({
  label,
  length = 6,
  value,
  onChange,
}: {
  label: string;
  length?: number;
  value: string;
  onChange: (value: string) => void;
}) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length }, (_, index) => value[index] ?? "");

  const setDigit = (index: number, next: string) => {
    const clean = next.replace(/\D/g, "");
    if (!clean) {
      const chars = digits.slice();
      chars[index] = "";
      onChange(chars.join(""));
      return;
    }
    const chars = digits.slice();
    const incoming = clean.slice(0, length - index).split("");
    incoming.forEach((digit, offset) => {
      chars[index + offset] = digit;
    });
    onChange(chars.join("").slice(0, length));
    const focusAt = Math.min(index + incoming.length, length - 1);
    refs.current[focusAt]?.focus();
  };

  return (
    <div {...stylex.props(styles.field)}>
      <span {...stylex.props(styles.label)}>{label}</span>
      <div {...stylex.props(styles.row)}>
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(node) => {
              refs.current[index] = node;
            }}
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            aria-label={`${label} digit ${index + 1}`}
            maxLength={length}
            value={digit}
            onChange={(event) => setDigit(index, event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Backspace" && !digits[index] && index > 0) {
                refs.current[index - 1]?.focus();
              }
            }}
            {...stylex.props(styles.box)}
          />
        ))}
      </div>
    </div>
  );
}
