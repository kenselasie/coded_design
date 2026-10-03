import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";

const styles = stylex.create({
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(33, 33, 33, 0.45)",
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
