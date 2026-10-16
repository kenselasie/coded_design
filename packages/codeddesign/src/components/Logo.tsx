import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { shadows } from "../tokens/shadows.stylex";

const styles = stylex.create({
  mark: {
    display: "inline-flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    borderRadius: radii.s,
    backgroundColor: colors.pinkLight,
    boxShadow: shadows.s1,
    color: colors.onPastel,
    fontFamily: font.display,
    fontWeight: font.bold,
    letterSpacing: "-0.08em",
    lineHeight: 1,
    userSelect: "none",
    transform: "rotate(-5deg)",
    transitionProperty: "transform",
    transitionDuration: "180ms",
    transitionTimingFunction: "ease-out",
  },
  hoverable: {
    ":hover": {
      transform: "rotate(0deg) scale(1.04)",
    },
  },
  sm: { width: "28px", height: "28px", fontSize: "13px" },
  md: { width: "36px", height: "36px", fontSize: "17px" },
  lg: { width: "56px", height: "56px", fontSize: "26px" },
  letters: {
    display: "block",
    transform: "translateY(0.5px)",
  },
});

export function Logo({
  size = "md",
  decorative = false,
}: {
  size?: "sm" | "md" | "lg";
  decorative?: boolean;
}) {
  return (
    <span
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : "CodedDesign"}
      aria-hidden={decorative ? true : undefined}
      {...stylex.props(styles.mark, styles.hoverable, styles[size])}
    >
      <span {...stylex.props(styles.letters)}>CD</span>
    </span>
  );
}
