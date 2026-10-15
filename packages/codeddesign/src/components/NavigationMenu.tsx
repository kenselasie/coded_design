"use client";

import * as stylex from "@stylexjs/stylex";
import { useState } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { shadows } from "../tokens/shadows.stylex";

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
    borderRadius: radii.pill,
    padding: "10px 14px",
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
  panel: {
    position: "absolute",
    top: "calc(100% + 8px)",
    left: 0,
    zIndex: 10,
    display: "grid",
    minWidth: "280px",
    gap: "4px",
    padding: "12px",
    borderRadius: radii.l,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
    boxShadow: shadows.s2,
  },
  link: {
    display: "block",
    borderRadius: radii.m,
    padding: "10px 12px",
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.s,
    textDecoration: "none",
    ":hover": {
      backgroundColor: colors.snowDark,
    },
  },
  title: {
    display: "block",
    fontFamily: font.display,
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
                <div {...stylex.props(styles.panel)}>
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
