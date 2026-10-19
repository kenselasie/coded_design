import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { colors } from "../tokens/colors.stylex";
import { stroke } from "../tokens/stroke.stylex";
import { radii } from "../tokens/space.stylex";

const styles = stylex.create({
  frame: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    borderRadius: radii.l,
    borderWidth: stroke.width,
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: colors.snowDark,
  },
  fill: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
});

export function AspectRatio({
  ratio = 16 / 9,
  children,
}: {
  ratio?: number;
  children: ReactNode;
}) {
  const frame = stylex.props(styles.frame);
  return (
    <div
      {...frame}
      style={{
        ...frame.style,
        aspectRatio: String(ratio),
      }}
    >
      <div {...stylex.props(styles.fill)}>{children}</div>
    </div>
  );
}
