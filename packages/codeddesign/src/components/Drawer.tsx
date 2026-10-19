"use client";

import * as stylex from "@stylexjs/stylex";
import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { colors } from "../tokens/colors.stylex";
import { stroke } from "../tokens/stroke.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { shadows } from "../tokens/shadows.stylex";
import { Icon } from "./Icon";

const MOBILE = "@media (max-width: 800px)";

const styles = stylex.create({
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 40,
    backgroundColor: "rgba(42, 36, 56, 0.45)",
  },
  drawer: {
    position: "fixed",
    zIndex: 41,
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.white,
    color: colors.black,
    boxShadow: shadows.s4,
    borderStyle: "solid",
    borderColor: colors.line,
  },
  bottom: {
    left: 0,
    right: 0,
    bottom: 0,
    maxHeight: "80vh",
    borderTopWidth: stroke.width,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderTopLeftRadius: radii.l,
    borderTopRightRadius: radii.l,
    padding: "20px",
  },
  right: {
    top: 0,
    right: 0,
    bottom: 0,
    width: "min(380px, 100%)",
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: stroke.width,
    padding: "20px",
    [MOBILE]: {
      width: "100%",
    },
  },
  left: {
    top: 0,
    left: 0,
    bottom: 0,
    width: "min(380px, 100%)",
    borderWidth: "0 2px 0 0",
    padding: "20px",
    [MOBILE]: {
      width: "100%",
    },
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    marginBottom: "12px",
  },
  title: {
    margin: 0,
    fontFamily: font.family,
    fontSize: font.xl,
    fontWeight: font.bold,
    letterSpacing: "-0.01em",
  },
  close: {
    display: "inline-flex",
    borderWidth: 0,
    borderRadius: radii.pill,
    padding: "6px",
    backgroundColor: "transparent",
    color: colors.black,
    cursor: "pointer",
    ":hover": {
      backgroundColor: colors.snowDark,
    },
  },
  body: {
    overflow: "auto",
    fontFamily: font.family,
    fontSize: font.s,
    lineHeight: 1.5,
    color: colors.steel,
  },
});

function Panel({
  open,
  title,
  side,
  children,
  onClose,
}: {
  open: boolean;
  title: string;
  side: "bottom" | "right" | "left";
  children: ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <>
      <div {...stylex.props(styles.overlay)} onClick={onClose} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        {...stylex.props(styles.drawer, styles[side])}
      >
        <div {...stylex.props(styles.header)}>
          <h2 {...stylex.props(styles.title)}>{title}</h2>
          <button type="button" aria-label="Close" onClick={onClose} {...stylex.props(styles.close)}>
            <Icon name="x" />
          </button>
        </div>
        <div {...stylex.props(styles.body)}>{children}</div>
      </aside>
    </>,
    document.body,
  );
}

export function Drawer(props: {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  return <Panel {...props} side="bottom" />;
}

export function Sheet({
  side = "right",
  ...props
}: {
  open: boolean;
  title: string;
  side?: "left" | "right";
  children: ReactNode;
  onClose: () => void;
}) {
  return <Panel {...props} side={side} />;
}
