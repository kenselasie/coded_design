import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { shadows } from "../tokens/shadows.stylex";
import { stroke } from "../tokens/stroke.stylex";

/** Lockup faces: Garet Heavy for "coded", Montserrat Bold for "DESIGN." */
const garetFace = 'var(--font-garet), "Garet", system-ui, sans-serif';
const montserratFace =
  'var(--font-montserrat), "Montserrat", Helvetica Neue, Arial, sans-serif';

/**
 * Brand lockup tokens — measured from the master mark.
 * Pink stays fixed across worlds; ink follows theme via `colors.black`.
 */
const brandPink = "#ED5880";
const brandPinkDark = "#D94472";

const styles = stylex.create({
  mark: {
    display: "inline-flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderWidth: stroke.width,
    borderStyle: "solid",
    borderColor: brandPinkDark,
    borderRadius: radii.m,
    backgroundColor: brandPink,
    boxShadow: "none",
    color: "#FFFFFF",
    fontFamily: font.display,
    fontWeight: font.bold,
    letterSpacing: "-0.01em",
    lineHeight: 1,
    userSelect: "none",
    transitionProperty: "transform, box-shadow",
    transitionDuration: "160ms",
    transitionTimingFunction: "ease-out",
  },
  hoverable: {
    ":hover": {
      transform: "translateY(-1px)",
      boxShadow: shadows.s2,
    },
  },
  sm: { width: "28px", height: "28px", fontSize: "14px" },
  md: { width: "36px", height: "36px", fontSize: "17px" },
  lg: { width: "56px", height: "56px", fontSize: "26px" },
  letters: {
    display: "block",
    transform: "translateY(0.5px)",
    fontFamily: garetFace,
    fontWeight: "800",
    letterSpacing: "-0.04em",
  },
  wordmark: {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "stretch",
    flexShrink: 0,
    width: "max-content",
    userSelect: "none",
    color: colors.black,
  },
  wordmarkHover: {
    transitionProperty: "transform",
    transitionDuration: "160ms",
    transitionTimingFunction: "ease-out",
    ":hover": {
      transform: "translateY(-1px)",
    },
  },
  codedWord: {
    margin: 0,
    padding: 0,
    color: "inherit",
    fontFamily: garetFace,
    fontWeight: "800",
    letterSpacing: "-0.045em",
    lineHeight: 0.86,
    textAlign: "left",
    textTransform: "lowercase",
    whiteSpace: "nowrap",
  },
  designBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    boxSizing: "border-box",
    width: "100%",
    margin: 0,
    backgroundColor: brandPink,
    color: "#FFFFFF",
    fontFamily: montserratFace,
    fontWeight: "700",
    letterSpacing: "0.14em",
    lineHeight: 1,
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  },
  wordSm: {
    gap: "2px",
  },
  wordMd: {
    gap: "3px",
  },
  wordLg: {
    gap: "5px",
  },
  codedSm: { fontSize: "22px" },
  codedMd: { fontSize: "30px" },
  codedLg: { fontSize: "52px" },
  barSm: {
    height: "14px",
    paddingLeft: "10px",
    paddingRight: "5px",
    borderRadius: "4px",
    fontSize: "7.5px",
  },
  barMd: {
    height: "19px",
    paddingLeft: "14px",
    paddingRight: "7px",
    borderRadius: "5px",
    fontSize: "10px",
  },
  barLg: {
    height: "33px",
    paddingLeft: "22px",
    paddingRight: "12px",
    borderRadius: "9px",
    fontSize: "16px",
  },
});

export function Logo({
  size = "md",
  wordmark = false,
  decorative = false,
}: {
  size?: "sm" | "md" | "lg";
  /** Full "coded / DESIGN." lockup. */
  wordmark?: boolean;
  decorative?: boolean;
}) {
  if (wordmark) {
    return (
      <span
        role={decorative ? undefined : "img"}
        aria-label={decorative ? undefined : "CodedDesign"}
        aria-hidden={decorative ? true : undefined}
        {...stylex.props(
          styles.wordmark,
          styles.wordmarkHover,
          size === "sm" && styles.wordSm,
          size === "md" && styles.wordMd,
          size === "lg" && styles.wordLg,
        )}
      >
        <span
          {...stylex.props(
            styles.codedWord,
            size === "sm" && styles.codedSm,
            size === "md" && styles.codedMd,
            size === "lg" && styles.codedLg,
          )}
        >
          coded
        </span>
        <span
          {...stylex.props(
            styles.designBar,
            size === "sm" && styles.barSm,
            size === "md" && styles.barMd,
            size === "lg" && styles.barLg,
          )}
        >
          DESIGN.
        </span>
      </span>
    );
  }

  return (
    <span
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : "CodedDesign"}
      aria-hidden={decorative ? true : undefined}
      {...stylex.props(styles.mark, styles.hoverable, styles[size])}
    >
      <span {...stylex.props(styles.letters)}>c</span>
    </span>
  );
}
