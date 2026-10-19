"use client";

import * as stylex from "@stylexjs/stylex";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { flattenReference } from "codeddesign/agent";
import { colors } from "codeddesign/tokens/colors.stylex";
import { font } from "codeddesign/tokens/typography.stylex";
import { stroke } from "codeddesign/tokens/stroke.stylex";
import { ComponentList, MobileBrowse } from "./nav";

const NARROW = "@media (max-width: 900px)";

const styles = stylex.create({
  frame: {
    display: "grid",
    gridTemplateColumns: "248px minmax(0, 1fr)",
    minHeight: 0,
    flex: 1,
    [NARROW]: {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "auto minmax(0, 1fr)",
    },
  },
  rail: {
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
    overflow: "hidden",
    backgroundColor: colors.snow,
    borderRightWidth: stroke.width,
    borderRightStyle: "solid",
    borderRightColor: colors.line,
    [NARROW]: {
      display: "none",
    },
  },
  mobileBar: {
    display: "none",
    [NARROW]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      padding: "10px 16px",
      borderBottomWidth: stroke.width,
      borderBottomStyle: "solid",
      borderBottomColor: colors.line,
      backgroundColor: colors.snow,
    },
  },
  current: {
    minWidth: 0,
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.s,
    fontWeight: font.semibold,
  },
  content: {
    minWidth: 0,
    minHeight: 0,
    overflow: "auto",
    padding: "28px 36px 72px",
    scrollbarWidth: "thin",
    scrollbarColor: `${colors.steel} transparent`,
    "::-webkit-scrollbar": {
      width: "8px",
    },
    "::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: colors.steel,
      borderRadius: "999px",
    },
    [NARROW]: {
      padding: "20px 16px 56px",
    },
  },
});

export function DocsFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const id = pathname.startsWith("/components/")
    ? pathname.slice("/components/".length)
    : "";
  const current =
    id === ""
      ? "All components"
      : flattenReference().find((item) => item.id === id)?.name ?? "Components";

  return (
    <div {...stylex.props(styles.frame)}>
      <aside {...stylex.props(styles.rail)}>
        <ComponentList fill />
      </aside>
      <div {...stylex.props(styles.mobileBar)}>
        <span {...stylex.props(styles.current)}>{current}</span>
        <MobileBrowse />
      </div>
      <div {...stylex.props(styles.content)}>{children}</div>
    </div>
  );
}
