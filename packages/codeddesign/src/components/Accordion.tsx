"use client";

import * as stylex from "@stylexjs/stylex";
import { useId, useState, type ReactNode } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { shadows } from "../tokens/shadows.stylex";
import { Icon } from "./Icon";

const styles = stylex.create({
  list: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    borderRadius: radii.l,
    backgroundColor: colors.white,
    boxShadow: shadows.s1,
  },
  item: {
    borderBottomWidth: "2px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.black,
  },
  last: {
    borderBottomWidth: 0,
  },
  trigger: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    padding: "14px 16px",
    borderWidth: 0,
    backgroundColor: "transparent",
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.s,
    fontWeight: font.semibold,
    textAlign: "left",
    cursor: "pointer",
    ":hover": {
      backgroundColor: colors.snow,
    },
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blue,
      outlineOffset: "-4px",
    },
  },
  chevron: {
    display: "inline-flex",
    transitionProperty: "transform",
    transitionDuration: "160ms",
    transitionTimingFunction: "ease-out",
  },
  open: {
    transform: "rotate(180deg)",
  },
  panel: {
    margin: 0,
    paddingBlock: "0 16px",
    paddingInline: "16px",
    color: colors.steel,
    fontFamily: font.family,
    fontSize: font.s,
    lineHeight: 1.5,
  },
});

export type AccordionItemData = { title: string; content: ReactNode };

export function Accordion({
  items,
  type = "single",
}: {
  items: AccordionItemData[];
  type?: "single" | "multiple";
}) {
  const baseId = useId();
  const [open, setOpen] = useState<string[]>(type === "multiple" ? [] : items[0] ? ["0"] : []);

  const toggle = (key: string) => {
    setOpen((current) => {
      const isOpen = current.includes(key);
      if (type === "multiple") {
        return isOpen ? current.filter((item) => item !== key) : [...current, key];
      }
      return isOpen ? [] : [key];
    });
  };

  return (
    <div {...stylex.props(styles.list)}>
      {items.map((item, index) => {
        const key = String(index);
        const expanded = open.includes(key);
        const panelId = `${baseId}-panel-${key}`;
        return (
          <div
            key={item.title}
            {...stylex.props(styles.item, index === items.length - 1 && styles.last)}
          >
            <h3 style={{ margin: 0 }}>
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => toggle(key)}
                {...stylex.props(styles.trigger)}
              >
                {item.title}
                <span {...stylex.props(styles.chevron, expanded && styles.open)}>
                  <Icon name="chevron" />
                </span>
              </button>
            </h3>
            {expanded ? (
              <div id={panelId} {...stylex.props(styles.panel)}>
                {item.content}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
