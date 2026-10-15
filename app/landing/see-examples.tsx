import * as stylex from "@stylexjs/stylex";
import NextLink from "next/link";
import { colors } from "codeddesign/tokens/colors.stylex";
import { radii } from "codeddesign/tokens/space.stylex";
import { shadows } from "codeddesign/tokens/shadows.stylex";
import { font } from "codeddesign/tokens/typography.stylex";

const styles = stylex.create({
  link: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 18px",
    borderRadius: radii.l,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.blue,
    boxShadow: shadows.s2,
    color: colors.onAccent,
    fontFamily: font.display,
    fontSize: font.s,
    fontWeight: font.semibold,
    textDecoration: "none",
    ":hover": {
      backgroundColor: colors.blueDark,
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
    <NextLink href="/examples" {...stylex.props(styles.link)}>
      See examples
    </NextLink>
  );
}
