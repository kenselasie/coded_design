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
    gap: "12px",
  },
  item: {
    overflow: "hidden",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.line,
    borderRadius: radii.control,
    backgroundColor: colors.white,
    boxShadow: shadows.s1,
  },
  trigger: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    padding: "18px 20px",
    borderWidth: 0,
    backgroundColor: "transparent",
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.m,
    fontWeight: font.semibold,
    lineHeight: 1.35,
    textAlign: "left",
    cursor: "pointer",
    ":hover": {
      backgroundColor: colors.snow,
    },
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blueDark,
      outlineOffset: "-4px",
    },
  },
  chevron: {
    display: "inline-flex",
    flexShrink: 0,
    color: colors.steel,
    transitionProperty: "transform",
    transitionDuration: "160ms",
    transitionTimingFunction: "ease-out",
  },
  open: {
    transform: "rotate(180deg)",
  },
  panel: {
    margin: 0,
    paddingBlock: "0 18px",
    paddingInline: "20px",
    color: colors.steel,
    fontFamily: font.family,
    fontSize: font.s,
    lineHeight: 1.55,
  },
});

export type AccordionItemData = { title: string; content: ReactNode };

export function Accordion({
  items,
  type = "single",
  defaultExpanded = true,
}: {
  items: AccordionItemData[];
  type?: "single" | "multiple";
  /** When type is single, open the first item on mount. */
  defaultExpanded?: boolean;
}) {
  const baseId = useId();
  const [open, setOpen] = useState<string[]>(
    type === "multiple" || !defaultExpanded || !items[0] ? [] : ["0"],
  );

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
          <div key={item.title} {...stylex.props(styles.item)}>
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
