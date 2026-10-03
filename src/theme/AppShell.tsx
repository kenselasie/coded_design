"use client";

import * as stylex from "@stylexjs/stylex";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { ToastProvider } from "codeddesign";
import { colors } from "codeddesign/tokens/colors.stylex";
import { radii } from "codeddesign/tokens/space.stylex";
import { font } from "codeddesign/tokens/typography.stylex";
import { darkTheme } from "codeddesign/theme";

const MOBILE = "@media (max-width: 800px)";

const nav = [
  { href: "/", label: "Overview" },
  { href: "/foundations", label: "Foundations" },
  { href: "/components", label: "Components" },
  { href: "/patterns", label: "Patterns" },
  { href: "/forms", label: "Forms" },
];

const styles = stylex.create({
  shell: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: colors.background,
    color: colors.black,
    fontFamily: font.family,
  },
  light: { colorScheme: "light" },
  dark: { colorScheme: "dark" },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    width: "240px",
    flexShrink: 0,
    alignSelf: "flex-start",
    position: "sticky",
    top: 0,
    height: "100vh",
    padding: "28px 16px 20px",
    borderRightWidth: "1px",
    borderRightStyle: "solid",
    borderRightColor: colors.smoke,
    backgroundColor: colors.white,
    [MOBILE]: {
      position: "static",
      width: "100%",
      height: "auto",
      borderRightWidth: 0,
      borderBottomWidth: "1px",
      borderBottomStyle: "solid",
      borderBottomColor: colors.smoke,
    },
  },
  brand: {
    margin: "0 8px 22px",
    fontFamily: font.display,
    fontSize: font.xl,
    fontWeight: font.bold,
    letterSpacing: "-0.03em",
  },
  navList: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  link: {
    display: "block",
    padding: "10px 14px",
    borderRadius: radii.pill,
    color: colors.steel,
    fontFamily: font.display,
    fontSize: font.s,
    fontWeight: font.medium,
    textDecoration: "none",
    ":hover": {
      backgroundColor: colors.snowDark,
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
    backgroundColor: colors.snowDark,
    color: colors.black,
  },
  footer: {
    marginTop: "auto",
    paddingTop: "16px",
  },
  main: {
    flexGrow: 1,
    minWidth: 0,
    padding: "40px 48px 80px",
    [MOBILE]: {
      padding: "24px 20px 64px",
    },
  },
  mobileShell: {
    [MOBILE]: {
      flexDirection: "column",
    },
  },
  toggle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    width: "100%",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    borderRadius: radii.pill,
    padding: "10px 14px",
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
      outlineColor: colors.blueDark,
      outlineOffset: "3px",
    },
  },
  mark: {
    display: "block",
    flexShrink: 0,
  },
});

function Moon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M10.2 2.2a5.6 5.6 0 1 0 3.6 9.2 4.6 4.6 0 0 1-3.6-9.2z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Sun() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M8 1.6v1.6M8 12.8v1.6M1.6 8h1.6M12.8 8h1.6M3.4 3.4l1.1 1.1M11.5 11.5l1.1 1.1M12.6 3.4l-1.1 1.1M4.5 11.5l-1.1 1.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = window.localStorage.getItem("codeddesign-theme");
    if (saved === "dark" || saved === "light") setMode(saved);
  }, []);

  const setTheme = (next: "light" | "dark") => {
    setMode(next);
    window.localStorage.setItem("codeddesign-theme", next);
  };

  return (
    <div
      {...stylex.props(
        styles.shell,
        styles.mobileShell,
        mode === "light" ? styles.light : styles.dark,
        mode === "dark" && darkTheme,
      )}
    >
      <aside {...stylex.props(styles.sidebar)}>
        <p {...stylex.props(styles.brand)}>CodedDesign</p>
        <nav aria-label="Primary" {...stylex.props(styles.navList)}>
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                {...stylex.props(styles.link, active && styles.active)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div {...stylex.props(styles.footer)}>
          <button
            type="button"
            onClick={() => setTheme(mode === "light" ? "dark" : "light")}
            {...stylex.props(styles.toggle)}
          >
            <span {...stylex.props(styles.mark)}>{mode === "light" ? <Moon /> : <Sun />}</span>
            {mode === "light" ? "Dark theme" : "Light theme"}
          </button>
        </div>
      </aside>
      <ToastProvider>
        <main {...stylex.props(styles.main)}>{children}</main>
      </ToastProvider>
    </div>
  );
}
