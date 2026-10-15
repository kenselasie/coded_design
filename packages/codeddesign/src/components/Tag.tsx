import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";

export type TagStatus =
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "active"
  | "subtle";

const styles = stylex.create({
  tag: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    paddingBlock: "4px",
    paddingInline: "10px",
    borderRadius: radii.pill,
    borderWidth: "1px",
    borderStyle: "solid",
    fontFamily: font.family,
    fontSize: font.xs,
    fontWeight: font.medium,
    lineHeight: 1.2,
  },
  neutral: {
    backgroundColor: colors.steel,
    color: colors.onAccent,
    borderColor: "transparent",
  },
  success: {
    backgroundColor: colors.success,
    color: colors.onAccent,
    borderColor: "transparent",
  },
  warning: {
    backgroundColor: colors.warning,
    color: colors.onPastel,
    borderColor: "transparent",
  },
  danger: {
    backgroundColor: colors.danger,
    color: colors.onAccent,
    borderColor: "transparent",
  },
  active: {
    backgroundColor: colors.blue,
    color: colors.onAccent,
    borderColor: "transparent",
  },
  subtle: {
    backgroundColor: colors.smoke,
    color: colors.steel,
    borderColor: "transparent",
  },
  outlined: {
    backgroundColor: "transparent",
  },
  outlinedNeutral: { color: colors.steel, borderColor: colors.steel },
  outlinedSuccess: { color: colors.success, borderColor: colors.success },
  outlinedWarning: { color: colors.warningDark, borderColor: colors.warningDark },
  outlinedDanger: { color: colors.danger, borderColor: colors.danger },
  outlinedActive: { color: colors.blue, borderColor: colors.blue },
  outlinedSubtle: { color: colors.steel, borderColor: colors.smokeDarker },
});

const filled = {
  neutral: styles.neutral,
  success: styles.success,
  warning: styles.warning,
  danger: styles.danger,
  active: styles.active,
  subtle: styles.subtle,
} as const;

const outlined = {
  neutral: styles.outlinedNeutral,
  success: styles.outlinedSuccess,
  warning: styles.outlinedWarning,
  danger: styles.outlinedDanger,
  active: styles.outlinedActive,
  subtle: styles.outlinedSubtle,
} as const;

export function Tag({
  children,
  status = "neutral",
  variant = "filled",
}: {
  children: ReactNode;
  status?: TagStatus;
  variant?: "filled" | "outlined";
}) {
  return (
    <span
      {...stylex.props(
        styles.tag,
        filled[status],
        variant === "outlined" && styles.outlined,
        variant === "outlined" && outlined[status],
      )}
    >
      {children}
    </span>
  );
}
