import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { colors } from "../tokens/colors.stylex";
import { stroke } from "../tokens/stroke.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { shadows } from "../tokens/shadows.stylex";

const styles = stylex.create({
  bubble: {
    position: "relative",
    alignSelf: "flex-start",
    width: "fit-content",
    maxWidth: "420px",
    marginBottom: "14px",
    paddingBlock: "14px",
    paddingInline: "16px",
    borderWidth: stroke.width,
    borderStyle: "solid",
    borderColor: colors.line,
    borderRadius: radii.l,
    boxShadow: shadows.s2,
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.s,
    lineHeight: 1.45,
    "::before": {
      content: '""',
      position: "absolute",
      left: "28px",
      bottom: "-9px",
      width: "16px",
      height: "16px",
      borderRightWidth: stroke.width,
      borderBottomWidth: stroke.width,
      borderRightStyle: "solid",
      borderBottomStyle: "solid",
      borderRightColor: colors.line,
      borderBottomColor: colors.line,
      transform: "rotate(45deg)",
    },
  },
  cream: {
    backgroundColor: colors.white,
    "::before": { backgroundColor: colors.white },
  },
  pink: {
    backgroundColor: colors.pinkLight,
    color: colors.onPastel,
    "::before": { backgroundColor: colors.pinkLight },
  },
  blue: {
    backgroundColor: colors.blueLight,
    color: colors.onPastel,
    "::before": { backgroundColor: colors.blueLight },
  },
});

export function SpeechBubble({
  tone = "cream",
  children,
}: {
  tone?: "cream" | "pink" | "blue";
  children: ReactNode;
}) {
  return <div {...stylex.props(styles.bubble, styles[tone])}>{children}</div>;
}
