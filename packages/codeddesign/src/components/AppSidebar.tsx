"use client";

import * as stylex from "@stylexjs/stylex";
import { useState } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { shadows } from "../tokens/shadows.stylex";
import { Icon } from "./Icon";

const styles = stylex.create({
  shell: {
    display: "flex",
    minHeight: "280px",
    overflow: "hidden",
    borderRadius: radii.l,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
    boxShadow: shadows.s1,
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    width: "200px",
    padding: "16px 12px",
    backgroundColor: colors.snow,
    borderRightWidth: "2px",
    borderRightStyle: "solid",
    borderRightColor: colors.black,
  },
  collapsed: {
    width: "64px",
    alignItems: "center",
  },
  brand: {
    margin: "0 8px 10px",
    fontFamily: font.display,
    fontSize: font.m,
    fontWeight: font.bold,
    color: colors.black,
  },
  link: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    width: "100%",
    borderWidth: 0,
    borderRadius: radii.pill,
    padding: "10px 12px",
    backgroundColor: "transparent",
    color: colors.steel,
    fontFamily: font.display,
    fontSize: font.s,
    fontWeight: font.medium,
    textAlign: "left",
    cursor: "pointer",
    ":hover": {
      backgroundColor: colors.snowDark,
      color: colors.black,
    },
  },
  active: {
    backgroundColor: colors.snowDark,
    color: colors.black,
  },
  main: {
    flexGrow: 1,
    padding: "20px",
    fontFamily: font.family,
    fontSize: font.s,
    color: colors.steel,
  },
  collapse: {
    marginTop: "auto",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    width: "100%",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    borderRadius: radii.pill,
    padding: "8px",
    backgroundColor: colors.white,
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.xs,
    fontWeight: font.semibold,
    cursor: "pointer",
  },
});

export function AppSidebar({
  items,
}: {
  items: { label: string; icon: "home" | "message" | "settings" | "user"; href?: string }[];
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState(items[0]?.label ?? "");
  return (
    <div {...stylex.props(styles.shell)}>
      <aside {...stylex.props(styles.sidebar, collapsed && styles.collapsed)}>
        {collapsed ? null : <p {...stylex.props(styles.brand)}>Studio</p>}
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            aria-current={current === item.label ? "page" : undefined}
            onClick={() => setCurrent(item.label)}
            {...stylex.props(styles.link, current === item.label && styles.active)}
          >
            <Icon name={item.icon} />
            {collapsed ? null : item.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setCollapsed((value) => !value)}
          {...stylex.props(styles.collapse)}
        >
          <Icon name={collapsed ? "chevronRight" : "chevronLeft"} />
          {collapsed ? null : "Collapse"}
        </button>
      </aside>
      <div {...stylex.props(styles.main)}>{current} is open in this preview.</div>
    </div>
  );
}
