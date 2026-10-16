"use client";

import * as stylex from "@stylexjs/stylex";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { Button, SearchInput, Sheet } from "codeddesign";
import { reference } from "codeddesign/agent";
import { colors } from "codeddesign/tokens/colors.stylex";
import { radii } from "codeddesign/tokens/space.stylex";
import { font } from "codeddesign/tokens/typography.stylex";

const extras = [
  { href: "/foundations", label: "Foundations" },
  { href: "/patterns", label: "Patterns" },
  { href: "/forms", label: "Forms" },
];

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
  },
  fill: {
    height: "100%",
  },
  finder: {
    flexShrink: 0,
    padding: "12px 12px 10px",
    borderBottomWidth: "2px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.black,
    backgroundColor: colors.snow,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    padding: "10px 10px 28px",
  },
  listFill: {
    flex: 1,
    minHeight: 0,
    overflowX: "hidden",
    overflowY: "auto",
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
      borderRadius: radii.pill,
    },
  },
  group: {
    margin: "14px 10px 6px",
    color: colors.steel,
    fontFamily: font.display,
    fontSize: font.xs,
    fontWeight: font.bold,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  },
  first: {
    marginTop: "4px",
  },
  link: {
    display: "block",
    padding: "8px 10px",
    borderRadius: radii.m,
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.s,
    fontWeight: font.medium,
    textDecoration: "none",
    ":hover": {
      backgroundColor: colors.snowDark,
    },
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blueDark,
      outlineOffset: "-2px",
    },
  },
  index: {
    fontWeight: font.semibold,
    marginBottom: "4px",
  },
  active: {
    backgroundColor: colors.pinkLight,
    color: colors.onPastel,
    fontWeight: font.semibold,
    ":hover": {
      backgroundColor: colors.pinkLight,
      color: colors.onPastel,
    },
  },
  empty: {
    margin: "12px 10px",
    color: colors.steel,
    fontFamily: font.family,
    fontSize: font.s,
  },
  extras: {
    marginTop: "16px",
    paddingTop: "12px",
    borderTopWidth: "2px",
    borderTopStyle: "solid",
    borderTopColor: colors.black,
  },
});

function matches(query: string, values: string[]) {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return values.join(" ").toLowerCase().includes(needle);
}

export function ComponentList({
  onPick,
  fill = false,
}: {
  onPick?: () => void;
  fill?: boolean;
}) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const visible = useMemo(
    () =>
      reference
        .map((group) => ({
          ...group,
          items: group.items.filter((item) =>
            matches(query, [item.name, item.id, item.import, ...(item.aliases ?? [])]),
          ),
        }))
        .filter((group) => group.items.length > 0),
    [query],
  );

  return (
    <nav aria-label="Components" {...stylex.props(styles.root, fill && styles.fill)}>
      <div {...stylex.props(styles.finder)}>
        <SearchInput
          label="Find a component"
          hideLabel
          shape="pill"
          placeholder="Find a component"
          value={query}
          onChange={setQuery}
        />
      </div>
      <div {...stylex.props(styles.list, fill && styles.listFill)}>
        <NextLink
          href="/components"
          onClick={onPick}
          aria-current={pathname === "/components" ? "page" : undefined}
          {...stylex.props(
            styles.link,
            styles.index,
            pathname === "/components" && styles.active,
          )}
        >
          All components
        </NextLink>
        {visible.length === 0 ? (
          <p {...stylex.props(styles.empty)}>Nothing matches.</p>
        ) : (
          visible.map((group, index) => (
            <div key={group.id}>
              <p {...stylex.props(styles.group, index === 0 && styles.first)}>{group.title}</p>
              {group.items.map((item) => {
                const href = `/components/${item.id}`;
                return (
                  <NextLink
                    key={item.id}
                    href={href}
                    onClick={onPick}
                    aria-current={pathname === href ? "page" : undefined}
                    {...stylex.props(styles.link, pathname === href && styles.active)}
                  >
                    {item.name}
                  </NextLink>
                );
              })}
            </div>
          ))
        )}
        <div {...stylex.props(styles.extras)}>
          <p {...stylex.props(styles.group, styles.first)}>Also</p>
          {extras.map((item) => (
            <NextLink
              key={item.href}
              href={item.href}
              onClick={onPick}
              aria-current={pathname === item.href ? "page" : undefined}
              {...stylex.props(styles.link, pathname === item.href && styles.active)}
            >
              {item.label}
            </NextLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

export function MobileBrowse() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button type="button" size="small" onClick={() => setOpen(true)}>
        Browse
      </Button>
      <Sheet open={open} title="Components" side="left" onClose={() => setOpen(false)}>
        <ComponentList onPick={() => setOpen(false)} />
      </Sheet>
    </>
  );
}
