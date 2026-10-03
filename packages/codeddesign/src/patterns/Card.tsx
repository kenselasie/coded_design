import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { shadows } from "../tokens/shadows.stylex";

const styles = stylex.create({
  card: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "20px",
    borderRadius: radii.l,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.smoke,
    backgroundColor: colors.white,
    boxShadow: shadows.s1,
    color: colors.black,
  },
  header: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "12px",
  },
  title: {
    margin: 0,
    fontFamily: font.display,
    fontSize: font.l,
    fontWeight: font.semibold,
    lineHeight: 1.3,
  },
  content: {
    color: colors.steel,
    fontFamily: font.family,
    fontSize: font.s,
    lineHeight: 1.5,
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "8px",
  },
});

export function Card({ children }: { children: ReactNode }) {
  return <article {...stylex.props(styles.card)}>{children}</article>;
}

export function CardHeader({ children }: { children: ReactNode }) {
  return <div {...stylex.props(styles.header)}>{children}</div>;
}

export function CardTitle({ children }: { children: ReactNode }) {
  return <h3 {...stylex.props(styles.title)}>{children}</h3>;
}

export function CardContent({ children }: { children: ReactNode }) {
  return <div {...stylex.props(styles.content)}>{children}</div>;
}

export function CardActions({ children }: { children: ReactNode }) {
  return <div {...stylex.props(styles.actions)}>{children}</div>;
}
