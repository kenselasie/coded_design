"use client";

import * as stylex from "@stylexjs/stylex";
import { useEffect, useState, type ReactNode } from "react";
import { colors } from "../tokens/colors.stylex";
import { stroke } from "../tokens/stroke.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { Shortcut } from "./Shortcut";
import { Icon } from "./Icon";
import { dropdown } from "./dropdownStyles";

const styles = stylex.create({
  wrap: {
    position: "relative",
    display: "inline-flex",
  },
  panel: {
    position: "absolute",
    top: "calc(100% + 4px)",
    left: 0,
    zIndex: 12,
    minWidth: "200px",
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
    gap: "2px",
    padding: "4px",
    borderRadius: radii.control,
    borderWidth: stroke.width,
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: colors.white,
  },
  barTrigger: {
    borderWidth: 0,
    borderRadius: radii.control,
    padding: "8px 12px",
    backgroundColor: "transparent",
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.s,
    fontWeight: font.medium,
    cursor: "pointer",
    ":hover": {
      backgroundColor: colors.snow,
    },
  },
  barOpen: {
    backgroundColor: colors.blueLight,
    color: colors.blueDark,
  },
  context: {
    position: "fixed",
    zIndex: 20,
    minWidth: "200px",
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
            {...stylex.props(dropdown.option, item.destructive && styles.danger)}
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
        {...stylex.props(dropdown.trigger, dropdown.triggerInline, open && dropdown.triggerOpen)}
      >
        {label}
        <span {...stylex.props(dropdown.chevron, open && dropdown.chevronOpen)}>
          <Icon name="chevron" />
        </span>
      </button>
      {open ? (
        <div role="menu" {...stylex.props(dropdown.panel, styles.panel)}>
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
            {...stylex.props(styles.barTrigger, open === menu.label && styles.barOpen)}
          >
            {menu.label}
          </button>
          {open === menu.label ? (
            <div role="menu" {...stylex.props(dropdown.panel, styles.panel)}>
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
          {...stylex.props(dropdown.panel, styles.context)}
          style={{ top: point.y, left: point.x }}
        >
          <Items items={items} onDone={() => setPoint(null)} />
        </div>
      ) : null}
    </div>
  );
}
