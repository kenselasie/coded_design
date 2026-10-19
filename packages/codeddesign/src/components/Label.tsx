import * as stylex from "@stylexjs/stylex";
import type { LabelHTMLAttributes, ReactNode } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";

const styles = stylex.create({
  label: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.s,
    fontWeight: font.semibold,
  },
});

export function Label({
  children,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement> & { children: ReactNode }) {
  return (
    <label {...props} {...stylex.props(styles.label)}>
      {children}
    </label>
  );
}
