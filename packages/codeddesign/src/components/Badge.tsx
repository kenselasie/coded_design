import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { colors } from "../tokens/colors.stylex";
import { stroke } from "../tokens/stroke.stylex";
import { font } from "../tokens/typography.stylex";

const styles = stylex.create({
  anchor: {
    position: "relative",
    display: "inline-flex",
  },
  pip: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "22px",
    height: "22px",
    paddingInline: "6px",
    borderRadius: "999px",
    borderWidth: stroke.width,
    borderStyle: "solid",
    borderColor: colors.white,
    fontFamily: font.family,
    fontSize: font.xxs,
    fontWeight: font.bold,
    lineHeight: 1,
  },
  floating: {
    position: "absolute",
    top: "-8px",
    right: "-8px",
  },
  pink: {
    backgroundColor: colors.pink,
    color: colors.onAccent,
  },
  blue: {
    backgroundColor: colors.blue,
    color: colors.onAccent,
  },
  ink: {
    backgroundColor: colors.black,
    color: colors.onAccent,
  },
});

export function Badge({
  count,
  tone = "pink",
  children,
  label,
}: {
  count: number;
  tone?: "pink" | "blue" | "ink";
  children?: ReactNode;
  label?: string;
}) {
  const text = count > 99 ? "99+" : String(Math.max(0, count));
  const pip = (
    <span
      aria-label={label ?? `${count} new`}
      {...stylex.props(styles.pip, styles[tone], children != null && styles.floating)}
    >
      {text}
    </span>
  );

  if (children == null) return pip;

  return (
    <span {...stylex.props(styles.anchor)}>
      {children}
      {pip}
    </span>
  );
}
