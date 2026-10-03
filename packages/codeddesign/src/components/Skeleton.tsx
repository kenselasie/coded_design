import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens/colors.stylex";
import { radii } from "../tokens/space.stylex";

const breathe = stylex.keyframes({
  "0%": { opacity: 0.45 },
  "50%": { opacity: 1 },
  "100%": { opacity: 0.45 },
});

const styles = stylex.create({
  bone: {
    display: "block",
    backgroundColor: colors.snowDarker,
    borderRadius: radii.m,
    animationName: breathe,
    animationDuration: "1.4s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
  },
  text: {
    height: "14px",
    borderRadius: radii.pill,
  },
  block: {
    height: "72px",
  },
  circle: {
    borderRadius: "50%",
  },
});

export function Skeleton({
  width = "100%",
  shape = "text",
}: {
  width?: string | number;
  shape?: "text" | "block" | "circle";
}) {
  const bone = stylex.props(
    styles.bone,
    shape === "text" && styles.text,
    shape === "block" && styles.block,
    shape === "circle" && styles.circle,
  );
  const size =
    shape === "circle"
      ? { width: typeof width === "number" ? width : 40, height: typeof width === "number" ? width : 40 }
      : { width };

  return (
    <span
      aria-hidden="true"
      {...bone}
      style={{ ...bone.style, ...size }}
    />
  );
}
