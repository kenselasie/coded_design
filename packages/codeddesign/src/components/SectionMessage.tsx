import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";

export type MessageVariant = "info" | "success" | "warning" | "danger" | "primary";

const styles = stylex.create({
  message: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    padding: "14px 16px",
    borderRadius: radii.l,
    borderWidth: "1px",
    borderStyle: "solid",
    fontFamily: font.family,
    fontSize: font.s,
    lineHeight: 1.5,
    color: colors.black,
  },
  info: {
    backgroundColor: colors.snow,
    borderColor: colors.smokeDarker,
  },
  primary: {
    backgroundColor: colors.snow,
    borderColor: colors.blueLight,
  },
  success: {
    backgroundColor: colors.snow,
    borderColor: colors.green,
  },
  warning: {
    backgroundColor: colors.snow,
    borderColor: colors.warning,
  },
  danger: {
    backgroundColor: colors.snow,
    borderColor: colors.danger,
  },
  title: {
    margin: 0,
    fontWeight: font.semibold,
  },
  body: {
    margin: 0,
    color: colors.steel,
  },
  full: {
    width: "100%",
  },
});

const variants = {
  info: styles.info,
  primary: styles.primary,
  success: styles.success,
  warning: styles.warning,
  danger: styles.danger,
} as const;

export function SectionMessage({
  variant = "info",
  title,
  children,
  icon,
  fullWidth = false,
}: {
  variant?: MessageVariant;
  title?: string;
  children?: ReactNode;
  icon?: ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <div
      role={variant === "danger" || variant === "warning" ? "alert" : "status"}
      {...stylex.props(styles.message, variants[variant], fullWidth && styles.full)}
    >
      {icon}
      <div>
        {title ? <p {...stylex.props(styles.title)}>{title}</p> : null}
        {children ? <div {...stylex.props(styles.body)}>{children}</div> : null}
      </div>
    </div>
  );
}
