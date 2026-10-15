"use client";

import * as stylex from "@stylexjs/stylex";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { shadows } from "../tokens/shadows.stylex";
import { Icon } from "./Icon";
import { Shortcut } from "./Shortcut";

const styles = stylex.create({
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 50,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: "12vh",
    backgroundColor: "rgba(42, 36, 56, 0.45)",
  },
  panel: {
    width: "min(480px, calc(100% - 32px))",
    overflow: "hidden",
    borderRadius: radii.l,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
    boxShadow: shadows.s4,
  },
  search: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "14px 16px",
    borderBottomWidth: "2px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.black,
    color: colors.black,
  },
  input: {
    flexGrow: 1,
    borderWidth: 0,
    backgroundColor: "transparent",
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.m,
    outline: "none",
  },
  list: {
    margin: 0,
    padding: "8px",
    listStyle: "none",
    maxHeight: "280px",
    overflow: "auto",
  },
  item: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    borderWidth: 0,
    borderRadius: radii.m,
    padding: "10px 12px",
    backgroundColor: "transparent",
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.s,
    cursor: "pointer",
    ":hover": {
      backgroundColor: colors.snowDark,
    },
  },
  empty: {
    padding: "16px",
    color: colors.steel,
    fontFamily: font.family,
    fontSize: font.s,
  },
});

export type CommandItem = {
  label: string;
  value: string;
  shortcut?: string[];
};

export function Command({
  open,
  items,
  onClose,
  onSelect,
}: {
  open: boolean;
  items: CommandItem[];
  onClose: () => void;
  onSelect: (value: string) => void;
}) {
  const [query, setQuery] = useState("");
  const visible = useMemo(
    () => items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())),
    [items, query],
  );

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div {...stylex.props(styles.overlay)} onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        {...stylex.props(styles.panel)}
        onClick={(event) => event.stopPropagation()}
      >
        <div {...stylex.props(styles.search)}>
          <Icon name="search" />
          <input
            autoFocus
            value={query}
            placeholder="Jump to a page or action"
            onChange={(event) => setQuery(event.target.value)}
            {...stylex.props(styles.input)}
          />
        </div>
        {visible.length === 0 ? (
          <p {...stylex.props(styles.empty)}>Nothing matches “{query}”.</p>
        ) : (
          <ul {...stylex.props(styles.list)}>
            {visible.map((item) => (
              <li key={item.value}>
                <button
                  type="button"
                  onClick={() => {
                    onSelect(item.value);
                    onClose();
                  }}
                  {...stylex.props(styles.item)}
                >
                  {item.label}
                  {item.shortcut ? <Shortcut keys={item.shortcut} /> : null}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>,
    document.body,
  );
}
