import * as stylex from "@stylexjs/stylex";
import NextLink from "next/link";
import { Icon } from "codeddesign";
import { colors } from "codeddesign/tokens/colors.stylex";
import { radii } from "codeddesign/tokens/space.stylex";
import { shadows } from "codeddesign/tokens/shadows.stylex";
import { stroke } from "codeddesign/tokens/stroke.stylex";
import { font } from "codeddesign/tokens/typography.stylex";

const styles = stylex.create({
  back: {
    display: "inline-flex",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: "8px",
    minHeight: "40px",
    paddingInline: "16px",
    borderRadius: radii.control,
    borderWidth: stroke.width,
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: "transparent",
    boxShadow: shadows.s1,
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.s,
    fontWeight: font.semibold,
    lineHeight: 1,
    textDecoration: "none",
    ":hover": {
      backgroundColor: colors.black,
      color: colors.onAccent,
      transform: "translateY(-2px)",
      boxShadow: shadows.s2,
    },
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blueDark,
      outlineOffset: "3px",
    },
  },
});

export function BackButton() {
  return (
    <NextLink href="/" {...stylex.props(styles.back)}>
      <Icon name="chevronLeft" size={16} />
      Back
    </NextLink>
  );
}
