import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { shadows } from "../tokens/shadows.stylex";
import { Avatar } from "./Avatar";

const styles = stylex.create({
  scroller: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    maxHeight: "320px",
    overflowY: "auto",
    padding: "16px",
    borderRadius: radii.l,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.snow,
  },
  row: {
    display: "flex",
    gap: "10px",
    maxWidth: "90%",
  },
  incoming: {
    alignSelf: "flex-start",
  },
  outgoing: {
    alignSelf: "flex-end",
    flexDirection: "row-reverse",
  },
  bubble: {
    padding: "12px 14px",
    borderRadius: radii.l,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    boxShadow: shadows.s1,
    fontFamily: font.family,
    fontSize: font.s,
    lineHeight: 1.45,
    color: colors.black,
  },
  them: {
    backgroundColor: colors.white,
  },
  us: {
    backgroundColor: colors.blueLight,
  },
  name: {
    margin: "0 0 4px",
    fontFamily: font.display,
    fontSize: font.xs,
    fontWeight: font.semibold,
  },
});

export function MessageScroller({ children }: { children: ReactNode }) {
  return <div {...stylex.props(styles.scroller)}>{children}</div>;
}

export function Message({
  from,
  name,
  children,
}: {
  from: "user" | "assistant";
  name: string;
  children: ReactNode;
}) {
  const outgoing = from === "user";
  return (
    <div {...stylex.props(styles.row, outgoing ? styles.outgoing : styles.incoming)}>
      <Avatar name={name} size="sm" />
      <div {...stylex.props(styles.bubble, outgoing ? styles.us : styles.them)}>
        <p {...stylex.props(styles.name)}>{name}</p>
        {children}
      </div>
    </div>
  );
}
