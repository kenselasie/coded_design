import * as stylex from "@stylexjs/stylex";
import type { ReactNode, TdHTMLAttributes, ThHTMLAttributes } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";

const styles = stylex.create({
  wrap: {
    width: "100%",
    overflowX: "auto",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.smoke,
    borderRadius: radii.l,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontFamily: font.family,
    fontSize: font.s,
    color: colors.black,
  },
  head: {
    backgroundColor: colors.snow,
    color: colors.steel,
    fontSize: font.xs,
    fontWeight: font.semibold,
    letterSpacing: "0.04em",
    textAlign: "left",
    textTransform: "uppercase",
  },
  cell: {
    paddingBlock: "12px",
    paddingInline: "16px",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.smoke,
    textAlign: "left",
  },
});

export function Table({ children }: { children: ReactNode }) {
  return (
    <div {...stylex.props(styles.wrap)}>
      <table {...stylex.props(styles.table)}>{children}</table>
    </div>
  );
}

export function TableHead({ children }: { children: ReactNode }) {
  return <thead>{children}</thead>;
}

export function TableBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children }: { children: ReactNode }) {
  return <tr>{children}</tr>;
}

export function TableCell({
  header = false,
  children,
  ...props
}: {
  header?: boolean;
  children: ReactNode;
} & TdHTMLAttributes<HTMLTableCellElement> &
  ThHTMLAttributes<HTMLTableCellElement>) {
  const Component = header ? "th" : "td";
  return (
    <Component
      {...props}
      {...stylex.props(styles.cell, header && styles.head)}
    >
      {children}
    </Component>
  );
}
