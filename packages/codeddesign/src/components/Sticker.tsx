import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { shadows } from "../tokens/shadows.stylex";

const styles = stylex.create({
  sticker: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    paddingBlock: "8px",
    paddingInline: "14px",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    borderRadius: radii.m,
    boxShadow: shadows.s1,
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.s,
    fontWeight: font.semibold,
    lineHeight: 1,
    transform: "rotate(-6deg)",
    transitionProperty: "transform",
    transitionDuration: "180ms",
    transitionTimingFunction: "ease-out",
    ":hover": {
      transform: "rotate(0deg) scale(1.04)",
    },
  },
  pink: { backgroundColor: colors.pinkLight },
  blue: { backgroundColor: colors.blueLight },
  yellow: { backgroundColor: colors.warning },
  mint: { backgroundColor: colors.greenLight },
});

export function Sticker({
  tone = "pink",
  children,
}: {
  tone?: "pink" | "blue" | "yellow" | "mint";
  children: ReactNode;
}) {
  return <span {...stylex.props(styles.sticker, styles[tone])}>{children}</span>;
}
