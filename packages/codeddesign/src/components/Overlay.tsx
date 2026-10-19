import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { colors } from "../tokens/colors.stylex";

const styles = stylex.create({
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: `color-mix(in srgb, ${colors.black} 45%, transparent)`,
    zIndex: 20,
  },
});

export function Overlay({
  children,
  onClick,
}: {
  children?: ReactNode;
  onClick?: () => void;
}) {
  return (
    <div {...stylex.props(styles.overlay)} onClick={onClick}>
      {children}
    </div>
  );
}
