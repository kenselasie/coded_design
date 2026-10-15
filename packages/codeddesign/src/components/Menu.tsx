"use client";

import * as stylex from "@stylexjs/stylex";
import { useEffect, useState, type ReactNode } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { shadows } from "../tokens/shadows.stylex";
import { Shortcut } from "./Shortcut";

const styles = stylex.create({
  wrap: {
    position: "relative",
    display: "inline-flex",
  },
  trigger: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    minHeight: "40px",
    paddingInline: "14px",
    borderRadius: radii.m,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.s,
    fontWeight: font.semibold,
    cursor: "pointer",
    ":hover": {
      backgroundColor: colors.snowDark,
    },
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blue,
      outlineOffset: "2px",
    },
  },
  panel: {
    position: "absolute",
    top: "calc(100% + 6px)",
    left: 0,
    zIndex: 12,
    minWidth: "200px",
    padding: "8px",
    borderRadius: radii.l,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
    boxShadow: shadows.s2,
  },
  item: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    borderWidth: 0,
    borderRadius: radii.s,
    padding: "8px 10px",
    backgroundColor: "transparent",
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.s,
    textAlign: "left",
    cursor: "pointer",
    ":hover": {
      backgroundColor: colors.snowDark,
    },
    ":disabled": {
      color: colors.concrete,
      cursor: "not-allowed",
    },
  },
  danger: {
    color: colors.dangerDark,
  },
  rule: {
    height: "1px",
    marginBlock: "6px",
    backgroundColor: colors.smoke,
    borderWidth: 0,
  },
  bar: {
    display: "inline-flex",
    gap: "4px",
    padding: "4px",
    borderRadius: radii.l,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
  },
  barTrigger: {
    borderWidth: 0,
    borderRadius: radii.m,
    padding: "8px 12px",
    backgroundColor: "transparent",
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.s,
    fontWeight: font.semibold,
    cursor: "pointer",
    ":hover": {
      backgroundColor: colors.snowDark,
    },
  },
  open: {
    backgroundColor: colors.snowDark,
  },
  context: {
    position: "fixed",
    zIndex: 20,
    minWidth: "200px",
    padding: "8px",
    borderRadius: radii.l,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
    boxShadow: shadows.s3,
  },
});

export type MenuAction = {
  label: string;
  onSelect?: () => void;
  shortcut?: string[];
  destructive?: boolean;
  disabled?: boolean;
  separator?: boolean;
};

function Items({
  items,
  onDone,
}: {
  items: MenuAction[];
  onDone?: () => void;
}) {
  return (
    <>
      {items.map((item, index) =>
        item.separator ? (
          <hr key={`sep-${index}`} {...stylex.props(styles.rule)} />
        ) : (
          <button
            key={item.label}
            type="button"
            disabled={item.disabled}
            onClick={() => {
              item.onSelect?.();
              onDone?.();
            }}
            {...stylex.props(styles.item, item.destructive && styles.danger)}
          >
            {item.label}
            {item.shortcut ? <Shortcut keys={item.shortcut} /> : null}
          </button>
        ),
      )}
    </>
  );
}

export function DropdownMenu({
  label,
  items,
}: {
  label: string;
  items: MenuAction[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <div {...stylex.props(styles.wrap)}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        {...stylex.props(styles.trigger)}
      >
        {label}
      </button>
      {open ? (
        <div role="menu" {...stylex.props(styles.panel)}>
          <Items items={items} onDone={() => setOpen(false)} />
        </div>
      ) : null}
    </div>
  );
}

export function Menubar({
  menus,
}: {
  menus: { label: string; items: MenuAction[] }[];
}) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div role="menubar" {...stylex.props(styles.bar)}>
      {menus.map((menu) => (
        <div key={menu.label} {...stylex.props(styles.wrap)}>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={open === menu.label}
            onClick={() => setOpen(open === menu.label ? null : menu.label)}
            {...stylex.props(styles.barTrigger, open === menu.label && styles.open)}
          >
            {menu.label}
          </button>
          {open === menu.label ? (
            <div role="menu" {...stylex.props(styles.panel)}>
              <Items items={menu.items} onDone={() => setOpen(null)} />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function ContextMenu({
  items,
  children,
}: {
  items: MenuAction[];
  children: ReactNode;
}) {
  const [point, setPoint] = useState<{ x: number; y: number } | null>(null);
  useEffect(() => {
    if (!point) return;
    const close = () => setPoint(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [point]);

  return (
    <div
      onContextMenu={(event) => {
        event.preventDefault();
        setPoint({ x: event.clientX, y: event.clientY });
      }}
    >
      {children}
      {point ? (
        <div
          role="menu"
          {...stylex.props(styles.context)}
          style={{ top: point.y, left: point.x }}
        >
          <Items items={items} onDone={() => setPoint(null)} />
        </div>
      ) : null}
    </div>
  );
}
