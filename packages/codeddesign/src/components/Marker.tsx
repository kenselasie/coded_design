import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { Icon, type IconName } from "./Icon";

const styles = stylex.create({
  marker: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: colors.steel,
    fontFamily: font.family,
    fontSize: font.s,
  },
  border: {
    paddingBottom: "8px",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.smoke,
  },
  separator: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    width: "100%",
    color: colors.steel,
    fontFamily: font.display,
    fontSize: font.xs,
    fontWeight: font.semibold,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    "::before": {
      content: '""',
      flexGrow: 1,
      height: "2px",
      backgroundColor: colors.smokeDarker,
    },
    "::after": {
      content: '""',
      flexGrow: 1,
      height: "2px",
      backgroundColor: colors.smokeDarker,
    },
  },
});

export function Marker({
  variant = "default",
  icon,
  children,
}: {
  variant?: "default" | "border" | "separator";
  icon?: IconName;
  children: ReactNode;
}) {
  if (variant === "separator") {
    return <div {...stylex.props(styles.separator)}>{children}</div>;
  }
  return (
    <div {...stylex.props(styles.marker, variant === "border" && styles.border)}>
      {icon ? <Icon name={icon} size={14} /> : null}
      <span>{children}</span>
    </div>
  );
}
