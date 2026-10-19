import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { colors } from "../tokens/colors.stylex";
import { stroke } from "../tokens/stroke.stylex";
import { radii } from "../tokens/space.stylex";

const styles = stylex.create({
  area: {
    overflow: "auto",
    maxHeight: "180px",
    padding: "12px 14px",
    borderRadius: radii.l,
    borderWidth: stroke.width,
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: colors.white,
    color: colors.black,
  },
});

export function ScrollArea({ children }: { children: ReactNode }) {
  return <div {...stylex.props(styles.area)}>{children}</div>;
}
