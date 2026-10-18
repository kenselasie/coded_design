"use client";

import * as stylex from "@stylexjs/stylex";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Logo, ToastProvider } from "codeddesign";
import { colors } from "codeddesign/tokens/colors.stylex";
import { radii } from "codeddesign/tokens/space.stylex";
import { shadows } from "codeddesign/tokens/shadows.stylex";
import { font } from "codeddesign/tokens/typography.stylex";
import {
  markerPalettes,
  markerPaletteIds,
  markerRadii,
  markerShadows,
  markerShadowsDark,
  markerType,
  palettes,
  paletteIds,
  worldIds,
  worlds,
  type MarkerPaletteId,
  type PaletteId,
  type WorldId,
} from "codeddesign/theme";

const NARROW = "@media (max-width: 900px)";

const nav = [
  { href: "/", label: "Overview" },
  { href: "/components", label: "Components" },
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
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    margin: 0,
    marginRight: "8px",
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.xl,
    fontWeight: font.bold,
    letterSpacing: "-0.03em",
    textDecoration: "none",
    lineHeight: 1,
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blueDark,
      outlineOffset: "3px",
    },
  },
  brandName: {
    transform: "translateY(-1px)",
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
  menuWrap: {
    position: "relative",
    display: "inline-flex",
  },
  chevronOpen: {
    transform: "rotate(180deg)",
  },
  menu: {
    position: "absolute",
    top: "calc(100% + 8px)",
    right: 0,
    zIndex: 30,
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    minWidth: "280px",
    padding: "6px",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    borderRadius: radii.l,
    backgroundColor: colors.white,
    boxShadow: shadows.s2,
  },
  menuItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "2px",
    width: "100%",
    padding: "8px 12px",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "transparent",
    borderRadius: radii.m,
    backgroundColor: "transparent",
    color: colors.black,
    textAlign: "left",
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
  },
  menuOn: {
    borderColor: colors.black,
    backgroundColor: colors.pinkLight,
    color: colors.onPastel,
  },
  menuLabel: {
    fontFamily: font.display,
    fontSize: font.s,
    fontWeight: font.semibold,
    lineHeight: 1.2,
  },
  menuCredit: {
    fontFamily: font.family,
    fontSize: font.xs,
    fontWeight: font.regular,
    lineHeight: 1.3,
    color: colors.steel,
  },
  menuCreditOn: {
    color: colors.onPastel,
  },
  menuRule: {
    height: "2px",
    margin: "4px 8px",
    borderWidth: 0,
    backgroundColor: colors.smoke,
  },
  menuSection: {
    padding: "6px 12px 2px",
    color: colors.steel,
    fontFamily: font.display,
    fontSize: font.xs,
    fontWeight: font.semibold,
    lineHeight: 1.2,
  },
  menuPalette: {
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
  },
  menuCopy: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "2px",
    minWidth: 0,
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
  docked: {
    height: "100vh",
    overflow: "hidden",
  },
  flush: {
    display: "flex",
    flexDirection: "column",
    padding: 0,
    minHeight: 0,
    overflow: "hidden",
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

function Chevron() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" {...stylex.props(styles.mark)}>
      <path
        d="M3.5 6 8 10.5 12.5 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type PaletteOption = {
  id: string;
  label: string;
  credit: string;
  preview: { canvas: string; accent: string };
};

function ThemeMenu({
  world,
  paletteId,
  options,
  onChooseWorld,
  onChoosePalette,
}: {
  world: WorldId;
  paletteId: string;
  options: PaletteOption[];
  onChooseWorld: (next: WorldId) => void;
  onChoosePalette: (next: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = worlds[world];
  const activePalette = options.find((item) => item.id === paletteId) ?? options[0];
  const trigger = `${current.label} · ${activePalette.label}`;

  return (
    <div ref={root} {...stylex.props(styles.menuWrap)}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Theme, ${trigger}`}
        onClick={() => setOpen((value) => !value)}
        {...stylex.props(styles.toggle)}
      >
        <span {...stylex.props(styles.dots, styles.mark)}>
          <span {...stylex.props(styles.dotHalf)} style={{ backgroundColor: activePalette.preview.canvas }} />
          <span {...stylex.props(styles.dotHalf)} style={{ backgroundColor: activePalette.preview.accent }} />
        </span>
        <span {...stylex.props(styles.label)}>{trigger}</span>
        <span {...stylex.props(styles.mark, open && styles.chevronOpen)}>
          <Chevron />
        </span>
      </button>
      {open ? (
        <div role="menu" aria-label="Theme" {...stylex.props(styles.menu)}>
          {worldIds.map((id) => {
            const item = worlds[id];
            const on = world === id;
            return (
              <button
                key={id}
                type="button"
                role="menuitemradio"
                aria-checked={on}
                title={item.credit}
                onClick={() => onChooseWorld(id)}
                {...stylex.props(styles.menuItem, on && styles.menuOn)}
              >
                <span {...stylex.props(styles.menuLabel)}>{item.label}</span>
                <span {...stylex.props(styles.menuCredit, on && styles.menuCreditOn)}>{item.credit}</span>
              </button>
            );
          })}
          <hr {...stylex.props(styles.menuRule)} />
          <div {...stylex.props(styles.menuSection)}>Palettes</div>
          {options.map((item) => {
            const on = paletteId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="menuitemradio"
                aria-checked={on}
                title={item.credit}
                onClick={() => onChoosePalette(item.id)}
                {...stylex.props(styles.menuItem, styles.menuPalette, on && styles.menuOn)}
              >
                <span {...stylex.props(styles.dots)}>
                  <span {...stylex.props(styles.dotHalf)} style={{ backgroundColor: item.preview.canvas }} />
                  <span {...stylex.props(styles.dotHalf)} style={{ backgroundColor: item.preview.accent }} />
                </span>
                <span {...stylex.props(styles.menuCopy)}>
                  <span {...stylex.props(styles.menuLabel)}>{item.label}</span>
                  <span {...stylex.props(styles.menuCredit, on && styles.menuCreditOn)}>{item.credit}</span>
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function isPalette(value: string | null): value is PaletteId {
  return paletteIds.includes(value as PaletteId);
}

function isMarkerPalette(value: string | null): value is MarkerPaletteId {
  return markerPaletteIds.includes(value as MarkerPaletteId);
}

function isWorld(value: string | null): value is WorldId {
  return worldIds.includes(value as WorldId);
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [palette, setPalette] = useState<PaletteId>("paper");
  const [markerPalette, setMarkerPalette] = useState<MarkerPaletteId>("highlighter");
  const [world, setWorld] = useState<WorldId>("codedcartoony");

  useEffect(() => {
    const savedMode = window.localStorage.getItem("codeddesign-theme");
    if (savedMode === "dark" || savedMode === "light") setMode(savedMode);
    const savedPalette = window.localStorage.getItem("codeddesign-palette");
    if (isPalette(savedPalette)) setPalette(savedPalette);
    const savedMarker = window.localStorage.getItem("codeddesign-marker-palette");
    if (isMarkerPalette(savedMarker)) setMarkerPalette(savedMarker);
    const savedWorld = window.localStorage.getItem("codeddesign-world");
    if (isWorld(savedWorld)) setWorld(savedWorld);
  }, []);

  const setTheme = (next: "light" | "dark") => {
    setMode(next);
    window.localStorage.setItem("codeddesign-theme", next);
  };

  const choosePalette = (next: string) => {
    if (world === "codedmarker") {
      if (!isMarkerPalette(next)) return;
      setMarkerPalette(next);
      window.localStorage.setItem("codeddesign-marker-palette", next);
      return;
    }
    if (!isPalette(next)) return;
    setPalette(next);
    window.localStorage.setItem("codeddesign-palette", next);
  };

  const chooseWorld = (next: WorldId) => {
    setWorld(next);
    window.localStorage.setItem("codeddesign-world", next);
  };

  const activePalette = palettes[palette];
  const activeMarker = markerPalettes[markerPalette];
  const marker = world === "codedmarker";
  const paletteOptions = marker
    ? markerPaletteIds.map((id) => {
        const item = markerPalettes[id];
        return { id, label: item.label, credit: item.credit, preview: item.preview };
      })
    : paletteIds.map((id) => {
        const item = palettes[id];
        return { id, label: item.label, credit: item.credit, preview: item.preview };
      });
  const flush = pathname.startsWith("/components");

  return (
    <div
      {...stylex.props(
        styles.shell,
        flush && styles.docked,
        mode === "light" ? styles.light : styles.dark,
        !marker && mode === "light" && activePalette.light,
        !marker && mode === "dark" && activePalette.dark,
        marker && markerType,
        marker && markerRadii,
        marker && (mode === "light" ? activeMarker.light : activeMarker.dark),
        marker && (mode === "light" ? markerShadows : markerShadowsDark),
      )}
    >
      <header {...stylex.props(styles.bar)}>
        <Link href="/" {...stylex.props(styles.brand)}>
          <Logo size="md" decorative />
          <span {...stylex.props(styles.brandName)}>CodedDesign</span>
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
          <button
            type="button"
            onClick={() => setTheme(mode === "light" ? "dark" : "light")}
            {...stylex.props(styles.toggle)}
          >
            {mode === "light" ? <Moon /> : <Sun />}
            <span {...stylex.props(styles.label)}>{mode === "light" ? "Dark" : "Light"}</span>
          </button>
          <ThemeMenu
            world={world}
            paletteId={marker ? markerPalette : palette}
            options={paletteOptions}
            onChooseWorld={chooseWorld}
            onChoosePalette={choosePalette}
          />
        </div>
      </header>
      <ToastProvider>
        <main {...stylex.props(styles.main, flush && styles.flush)}>{children}</main>
      </ToastProvider>
    </div>
  );
}
