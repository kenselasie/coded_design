import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { colors } from "../tokens/colors.stylex";
import { stroke } from "../tokens/stroke.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { shadows } from "../tokens/shadows.stylex";
import { Icon, type IconName } from "./Icon";

const styles = stylex.create({
  alert: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    padding: "14px 16px",
    borderRadius: radii.l,
    borderWidth: stroke.width,
    borderStyle: "solid",
    backgroundColor: colors.white,
    boxShadow: shadows.s1,
    fontFamily: font.family,
    color: colors.black,
  },
  info: { borderColor: colors.blue },
  success: { borderColor: colors.greenDark },
  warning: { borderColor: colors.warningDark },
  danger: { borderColor: colors.dangerDark },
  mark: {
    marginTop: "2px",
    flexShrink: 0,
  },
  copy: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    minWidth: 0,
  },
  title: {
    margin: 0,
    fontFamily: font.family,
    fontSize: font.s,
    fontWeight: font.semibold,
    lineHeight: 1.3,
  },
  body: {
    margin: 0,
    color: colors.steel,
    fontSize: font.s,
    lineHeight: 1.5,
  },
});

const icons: Record<"info" | "success" | "warning" | "danger", IconName> = {
  info: "info",
  success: "checkCircle",
  warning: "alert",
  danger: "xCircle",
};

export function Alert({
  variant = "info",
  title,
  children,
}: {
  variant?: "info" | "success" | "warning" | "danger";
  title: string;
  children?: ReactNode;
}) {
  return (
    <div
      role={variant === "danger" || variant === "warning" ? "alert" : "status"}
      {...stylex.props(styles.alert, styles[variant])}
    >
      <span {...stylex.props(styles.mark)}>
        <Icon name={icons[variant]} />
      </span>
      <div {...stylex.props(styles.copy)}>
        <p {...stylex.props(styles.title)}>{title}</p>
        {children ? <div {...stylex.props(styles.body)}>{children}</div> : null}
      </div>
    </div>
  );
}
