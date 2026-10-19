import * as stylex from "@stylexjs/stylex";
import { colors } from "codeddesign/tokens/colors.stylex";
import { radii } from "codeddesign/tokens/space.stylex";
import { shadows } from "codeddesign/tokens/shadows.stylex";
import { stroke } from "codeddesign/tokens/stroke.stylex";
import { font } from "codeddesign/tokens/typography.stylex";

/** Primary CTA — mirrors `Button variant="primary"` so worlds remap cleanly. */
const styles = stylex.create({
  link: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    minHeight: "40px",
    paddingBlock: "8px",
    paddingInline: "20px",
    borderRadius: radii.control,
    borderWidth: stroke.width,
    borderStyle: "solid",
    borderColor: "transparent",
    backgroundColor: colors.blue,
    boxShadow: "none",
    color: colors.onAccent,
    fontFamily: font.display,
    fontSize: font.m,
    fontWeight: font.semibold,
    letterSpacing: "0.01em",
    lineHeight: 1,
    textDecoration: "none",
    transitionProperty: "background-color, color, border-color, transform, box-shadow",
    transitionDuration: "160ms",
    transitionTimingFunction: "ease-out",
    ":hover": {
      backgroundColor: colors.blueDark,
      transform: "translateY(-2px)",
      boxShadow: shadows.s2,
    },
    ":active": {
      transform: "translateY(1px) scale(0.96)",
      boxShadow: "none",
    },
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blueDark,
      outlineOffset: "3px",
    },
  },
});

export function SeeExamples() {
  return (
    <a href="#examples" {...stylex.props(styles.link)}>
      See examples
    </a>
  );
}
