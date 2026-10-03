import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";

export type StatusName =
  | "success"
  | "done"
  | "live"
  | "pending"
  | "error"
  | "rejected"
  | "neutral";

const pulse = stylex.keyframes({
  "0%": { opacity: 1 },
  "50%": { opacity: 0.45 },
  "100%": { opacity: 1 },
});

const styles = stylex.create({
  row: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: colors.concrete,
    flexShrink: 0,
  },
  label: {
    color: colors.steel,
    fontFamily: font.family,
    fontSize: font.xs,
    fontWeight: font.semibold,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  },
  success: { backgroundColor: colors.success },
  pending: { backgroundColor: colors.warningDark },
  error: { backgroundColor: colors.danger },
  neutral: { backgroundColor: colors.concrete },
  live: {
    backgroundColor: colors.success,
    animationName: pulse,
    animationDuration: "1.6s",
    animationIterationCount: "infinite",
  },
});

const tones = {
  success: styles.success,
  done: styles.success,
  live: styles.live,
  pending: styles.pending,
  error: styles.error,
  rejected: styles.error,
  neutral: styles.neutral,
} as const;

export function Status({
  status = "neutral",
  children,
}: {
  status?: StatusName;
  children?: ReactNode;
}) {
  return (
    <span {...stylex.props(styles.row)}>
      <span {...stylex.props(styles.dot, tones[status])} />
      <span {...stylex.props(styles.label)}>{children ?? status}</span>
    </span>
  );
}
