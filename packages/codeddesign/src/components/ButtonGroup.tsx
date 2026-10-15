import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";

const styles = stylex.create({
  group: {
    display: "inline-flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "8px",
  },
});

export function ButtonGroup({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div role="group" aria-label={label} {...stylex.props(styles.group)}>
      {children}
    </div>
  );
}
