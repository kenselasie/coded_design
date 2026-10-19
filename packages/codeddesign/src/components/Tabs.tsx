"use client";

import * as stylex from "@stylexjs/stylex";
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { colors } from "../tokens/colors.stylex";
import { stroke } from "../tokens/stroke.stylex";
import { font } from "../tokens/typography.stylex";

type TabsContextValue = {
  value: string;
  setValue: (value: string) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used inside Tabs");
  }
  return context;
}

const styles = stylex.create({
  list: {
    display: "flex",
    gap: "4px",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.smoke,
  },
  tab: {
    margin: 0,
    paddingBlock: "10px",
    paddingInline: "14px",
    borderWidth: 0,
    borderBottomWidth: stroke.width,
    borderBottomStyle: "solid",
    borderBottomColor: "transparent",
    backgroundColor: "transparent",
    color: colors.steel,
    fontFamily: font.family,
    fontSize: font.s,
    fontWeight: font.medium,
    cursor: "pointer",
    ":hover": {
      color: colors.black,
    },
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blueDark,
      outlineOffset: "2px",
    },
  },
  active: {
    color: colors.blueDark,
    borderBottomColor: colors.blueDark,
  },
  panel: {
    paddingTop: "16px",
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.s,
    lineHeight: 1.5,
  },
});

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  children,
}: {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
}) {
  const [internal, setInternal] = useState(defaultValue ?? "");
  const current = value ?? internal;
  const setValue = (next: string) => {
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  };
  return (
    <TabsContext.Provider value={{ value: current, setValue }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabList({ children }: { children: ReactNode }) {
  return (
    <div role="tablist" {...stylex.props(styles.list)}>
      {children}
    </div>
  );
}

export function Tab({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) {
  const tabs = useTabs();
  const selected = tabs.value === value;
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      onClick={() => tabs.setValue(value)}
      {...stylex.props(styles.tab, selected && styles.active)}
    >
      {children}
    </button>
  );
}

export function TabPanel({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) {
  const tabs = useTabs();
  if (tabs.value !== value) return null;
  return (
    <div role="tabpanel" {...stylex.props(styles.panel)}>
      {children}
    </div>
  );
}
