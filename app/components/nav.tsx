"use client";

import * as stylex from "@stylexjs/stylex";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import {
  AppSidebar,
  Button,
  SearchInput,
  Sheet,
  type AppSidebarGroup,
} from "codeddesign";
import { reference } from "codeddesign/agent";

const extras = [
  { href: "/foundations", label: "Foundations", icon: "spark" as const },
];

const styles = stylex.create({
  fill: {
    height: "100%",
  },
});

function matches(query: string, values: string[]) {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return values.join(" ").toLowerCase().includes(needle);
}

function useCatalogGroups(query: string): AppSidebarGroup[] {
  return useMemo(() => {
    const visible = reference
      .map((group) => ({
        ...group,
        items: group.items.filter((item) =>
          matches(query, [item.name, item.id, item.import, ...(item.aliases ?? [])]),
        ),
      }))
      .filter((group) => group.items.length > 0);

    const groups: AppSidebarGroup[] = [
      {
        items: [{ label: "All components", href: "/components", icon: "grid" }],
      },
      ...visible.map((group) => ({
        label: group.title,
        items: group.items.map((item) => ({
          label: item.name,
          href: `/components/${item.id}`,
        })),
      })),
    ];

    if (!query.trim()) {
      groups.push({
        label: "Also",
        items: extras.map((item) => ({
          label: item.label,
          href: item.href,
          icon: item.icon,
        })),
      });
    }

    return groups;
  }, [query]);
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
  const groups = useCatalogGroups(query);

  return (
    <div {...stylex.props(fill && styles.fill)}>
      <AppSidebar
        rail
        brand="CodedDesign"
        brandHint="Catalog"
        groups={groups}
        current={pathname}
        header={
          <SearchInput
            label="Find a component"
            hideLabel
            placeholder="Find a component"
            value={query}
            onChange={setQuery}
          />
        }
        renderLink={({ href, children, onClick, ...rest }) => (
          <NextLink
            href={href}
            onClick={() => {
              onClick?.();
              onPick?.();
            }}
            {...rest}
          >
            {children}
          </NextLink>
        )}
      />
    </div>
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
