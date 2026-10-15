"use client";

import * as stylex from "@stylexjs/stylex";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { ToastProvider } from "codeddesign";
import { colors } from "codeddesign/tokens/colors.stylex";
import { radii } from "codeddesign/tokens/space.stylex";
import { shadows } from "codeddesign/tokens/shadows.stylex";
import { font } from "codeddesign/tokens/typography.stylex";
import { palettes, paletteIds, type PaletteId } from "codeddesign/theme";

const NARROW = "@media (max-width: 900px)";

const nav = [
  { href: "/", label: "Overview" },
  { href: "/examples", label: "Examples" },
  { href: "/use", label: "Use" },
  { href: "/components", label: "Components" },
  { href: "/docs", label: "Docs" },
];

const styles = stylex.create({
  shell: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    overflowX: "clip",
    backgroundColor: colors.background,
    color: colors.black,
    fontFamily: font.family,
    "::selection": {
      backgroundColor: colors.pinkLight,
      color: colors.onPastel,
    },
  },
  light: { colorScheme: "light" },
  dark: { colorScheme: "dark" },
  bar: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "12px 16px",
    position: "sticky",
    top: 0,
    zIndex: 20,
    padding: "12px 20px",
    borderBottomWidth: "2px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.black,
    backgroundColor: colors.white,
    boxShadow: shadows.s1,
    minWidth: 0,
  },
  brand: {
    margin: 0,
    marginRight: "8px",
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.xl,
    fontWeight: font.bold,
    letterSpacing: "-0.03em",
    textDecoration: "none",
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blueDark,
      outlineOffset: "3px",
    },
  },
  navList: {
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "center",
    gap: "4px",
    minWidth: 0,
    flex: "1 1 160px",
    overflowX: "auto",
  },
  link: {
    display: "block",
    flexShrink: 0,
    padding: "8px 14px",
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
  tools: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "8px",
    marginLeft: "auto",
    [NARROW]: {
      width: "100%",
      marginLeft: 0,
      justifyContent: "space-between",
    },
  },
  palettes: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  swatch: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    minHeight: "36px",
    padding: "4px 10px 4px 6px",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "transparent",
    borderRadius: radii.pill,
    backgroundColor: "transparent",
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.xs,
    fontWeight: font.semibold,
    lineHeight: 1,
    cursor: "pointer",
    ":hover": {
      backgroundColor: colors.snowDark,
    },
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blueDark,
      outlineOffset: "2px",
    },
    [NARROW]: {
      paddingInline: "6px",
    },
  },
  swatchOn: {
    borderColor: colors.black,
    backgroundColor: colors.snow,
  },
  dots: {
    display: "flex",
    width: "22px",
    height: "22px",
    overflow: "hidden",
    borderRadius: radii.pill,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
  },
  dotHalf: {
    flex: 1,
    height: "100%",
  },
  swatchName: {
    [NARROW]: {
      display: "none",
    },
  },
  toggle: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    minHeight: "36px",
    padding: "6px 12px",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    borderRadius: radii.pill,
    backgroundColor: colors.white,
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.s,
    fontWeight: font.semibold,
    lineHeight: 1,
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
  label: {
    display: "block",
    lineHeight: 1,
    transform: "translateY(-1px)",
  },
  main: {
    flexGrow: 1,
    minWidth: 0,
    padding: "32px 40px 80px",
    [NARROW]: {
      padding: "24px 16px 64px",
    },
  },
});

function Moon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" {...stylex.props(styles.mark)}>
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
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" {...stylex.props(styles.mark)}>
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

function isPalette(value: string | null): value is PaletteId {
  return paletteIds.includes(value as PaletteId);
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [palette, setPalette] = useState<PaletteId>("paper");

  useEffect(() => {
    const savedMode = window.localStorage.getItem("codeddesign-theme");
    if (savedMode === "dark" || savedMode === "light") setMode(savedMode);
    const savedPalette = window.localStorage.getItem("codeddesign-palette");
    if (isPalette(savedPalette)) setPalette(savedPalette);
  }, []);

  const setTheme = (next: "light" | "dark") => {
    setMode(next);
    window.localStorage.setItem("codeddesign-theme", next);
  };

  const choosePalette = (next: PaletteId) => {
    setPalette(next);
    window.localStorage.setItem("codeddesign-palette", next);
  };

  const activePalette = palettes[palette];

  return (
    <div
      {...stylex.props(
        styles.shell,
        mode === "light" ? styles.light : styles.dark,
        mode === "light" && activePalette.light,
        mode === "dark" && activePalette.dark,
      )}
    >
      <header {...stylex.props(styles.bar)}>
        <Link href="/" {...stylex.props(styles.brand)}>
          CodedDesign
        </Link>
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
        <div {...stylex.props(styles.tools)}>
          <div role="group" aria-label="Color palette" {...stylex.props(styles.palettes)}>
            {paletteIds.map((id) => {
              const item = palettes[id];
              const on = palette === id;
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={on}
                  title={`${item.label}. ${item.credit}`}
                  onClick={() => choosePalette(id)}
                  {...stylex.props(styles.swatch, on && styles.swatchOn)}
                >
                  <span {...stylex.props(styles.dots)}>
                    <span
                      {...stylex.props(styles.dotHalf)}
                      style={{ backgroundColor: item.preview.canvas }}
                    />
                    <span
                      {...stylex.props(styles.dotHalf)}
                      style={{ backgroundColor: item.preview.accent }}
                    />
                  </span>
                  <span {...stylex.props(styles.swatchName, styles.label)}>{item.label}</span>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => setTheme(mode === "light" ? "dark" : "light")}
            {...stylex.props(styles.toggle)}
          >
            {mode === "light" ? <Moon /> : <Sun />}
            <span {...stylex.props(styles.label)}>{mode === "light" ? "Dark" : "Light"}</span>
          </button>
        </div>
      </header>
      <ToastProvider>
        <main {...stylex.props(styles.main)}>{children}</main>
      </ToastProvider>
    </div>
  );
}
