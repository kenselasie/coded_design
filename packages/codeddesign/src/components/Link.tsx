import * as stylex from "@stylexjs/stylex";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";

const styles = stylex.create({
  link: {
    color: colors.blueDark,
    fontFamily: font.family,
    fontWeight: font.medium,
    textDecoration: "underline",
    textUnderlineOffset: "3px",
    ":hover": {
      color: colors.blue,
    },
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blue,
      outlineOffset: "2px",
      borderRadius: "2px",
    },
  },
});

export function Link({
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) {
  return (
    <a {...props} {...stylex.props(styles.link)}>
      {children}
    </a>
  );
}
