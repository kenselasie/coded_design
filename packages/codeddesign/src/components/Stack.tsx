import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { space } from "../tokens/space.stylex";

const styles = stylex.create({
  stack: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  xxs: { gap: space.xxs },
  xs: { gap: space.xs },
  s: { gap: space.s },
  m: { gap: space.m },
  l: { gap: space.l },
  xl: { gap: space.xl },
});

type Gap = "xxs" | "xs" | "s" | "m" | "l" | "xl";

export function Stack({
  gap = "m",
  children,
}: {
  gap?: Gap;
  children: ReactNode;
}) {
  return <div {...stylex.props(styles.stack, styles[gap])}>{children}</div>;
}

export function Inline({
  gap = "s",
  children,
}: {
  gap?: Gap;
  children: ReactNode;
}) {
  return <div {...stylex.props(styles.row, styles[gap])}>{children}</div>;
}
