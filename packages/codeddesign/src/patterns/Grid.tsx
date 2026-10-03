import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { space } from "../tokens/space.stylex";

const styles = stylex.create({
  grid: {
    display: "grid",
  },
  xs: { gap: space.xs },
  s: { gap: space.s },
  m: { gap: space.m },
  l: { gap: space.l },
});

export function Grid({
  columns = 3,
  gap = "m",
  children,
}: {
  columns?: number;
  gap?: "xs" | "s" | "m" | "l";
  children: ReactNode;
}) {
  const grid = stylex.props(styles.grid, styles[gap]);
  return (
    <div
      {...grid}
      style={{
        ...grid.style,
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {children}
    </div>
  );
}

export function GridItem({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
