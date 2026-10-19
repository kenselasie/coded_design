"use client";

import * as stylex from "@stylexjs/stylex";
import { useState } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { dropdown } from "./dropdownStyles";

const styles = stylex.create({
  nav: {
    display: "inline-flex",
    gap: "4px",
  },
  item: {
    position: "relative",
  },
  trigger: {
    borderWidth: 0,
    borderRadius: radii.control,
    padding: "10px 14px",
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
  open: {
    backgroundColor: colors.blueLight,
    color: colors.blueDark,
  },
  panel: {
    position: "absolute",
    top: "calc(100% + 4px)",
    left: 0,
    zIndex: 10,
    display: "grid",
    minWidth: "280px",
    gap: "2px",
  },
  link: {
    display: "block",
    borderRadius: radii.s,
    padding: "10px 12px",
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.s,
    textDecoration: "none",
    ":hover": {
      backgroundColor: colors.snow,
    },
  },
  title: {
    display: "block",
    fontFamily: font.family,
    fontWeight: font.semibold,
  },
  hint: {
    display: "block",
    color: colors.steel,
    fontSize: font.xs,
    marginTop: "2px",
  },
});

export function NavigationMenu({
  items,
}: {
  items: {
    label: string;
    href?: string;
    links?: { title: string; href: string; hint?: string }[];
  }[];
}) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <nav aria-label="Site" {...stylex.props(styles.nav)}>
      {items.map((item) => (
        <div
          key={item.label}
          {...stylex.props(styles.item)}
          onMouseLeave={() => setOpen(null)}
        >
          {item.links ? (
            <>
              <button
                type="button"
                aria-expanded={open === item.label}
                onMouseEnter={() => setOpen(item.label)}
                onClick={() => setOpen(open === item.label ? null : item.label)}
                {...stylex.props(styles.trigger, open === item.label && styles.open)}
              >
                {item.label}
              </button>
              {open === item.label ? (
                <div {...stylex.props(dropdown.panel, dropdown.panelPad, styles.panel)}>
                  {item.links.map((link) => (
                    <a key={link.href} href={link.href} {...stylex.props(styles.link)}>
                      <span {...stylex.props(styles.title)}>{link.title}</span>
                      {link.hint ? <span {...stylex.props(styles.hint)}>{link.hint}</span> : null}
                    </a>
                  ))}
                </div>
              ) : null}
            </>
          ) : (
            <a href={item.href ?? "#"} {...stylex.props(styles.trigger, styles.link)}>
              {item.label}
            </a>
          )}
        </div>
      ))}
    </nav>
  );
}
