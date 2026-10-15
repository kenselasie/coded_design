import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { colors } from "../tokens/colors.stylex";
import { radii } from "../tokens/space.stylex";

const styles = stylex.create({
  area: {
    overflow: "auto",
    maxHeight: "180px",
    padding: "12px 14px",
    borderRadius: radii.l,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
    color: colors.black,
  },
});

export function ScrollArea({ children }: { children: ReactNode }) {
  return <div {...stylex.props(styles.area)}>{children}</div>;
}
