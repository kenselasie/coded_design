import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";

const styles = stylex.create({
  empty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    padding: "48px 24px",
    textAlign: "center",
  },
  title: {
    margin: 0,
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.l,
    fontWeight: font.semibold,
  },
  description: {
    margin: 0,
    maxWidth: "360px",
    color: colors.steel,
    fontFamily: font.family,
    fontSize: font.s,
    lineHeight: 1.5,
  },
});

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div {...stylex.props(styles.empty)}>
      <h3 {...stylex.props(styles.title)}>{title}</h3>
      {description ? (
        <p {...stylex.props(styles.description)}>{description}</p>
      ) : null}
      {action}
    </div>
  );
}
