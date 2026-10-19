"use client";

import * as stylex from "@stylexjs/stylex";
import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { colors } from "../tokens/colors.stylex";
import { stroke } from "../tokens/stroke.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { shadows } from "../tokens/shadows.stylex";
import { Button } from "./Button";

const styles = stylex.create({
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    backgroundColor: `color-mix(in srgb, ${colors.black} 45%, transparent)`,
  },
  panel: {
    width: "min(420px, 100%)",
    padding: "24px",
    borderRadius: radii.l,
    borderWidth: stroke.width,
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: colors.white,
    boxShadow: shadows.s4,
  },
  title: {
    margin: 0,
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.xl,
    fontWeight: font.bold,
    letterSpacing: "-0.01em",
  },
  body: {
    margin: "8px 0 0",
    color: colors.steel,
    fontFamily: font.family,
    fontSize: font.s,
    lineHeight: 1.5,
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "8px",
    marginTop: "20px",
  },
});

export function AlertDialog({
  open,
  title,
  children,
  actionLabel = "Continue",
  cancelLabel = "Cancel",
  destructive = false,
  onCancel,
  onAction,
}: {
  open: boolean;
  title: string;
  children?: ReactNode;
  actionLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onCancel: () => void;
  onAction: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div {...stylex.props(styles.overlay)} onClick={onCancel}>
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="codeddesign-alert-title"
        {...stylex.props(styles.panel)}
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="codeddesign-alert-title" {...stylex.props(styles.title)}>
          {title}
        </h2>
        {children ? <div {...stylex.props(styles.body)}>{children}</div> : null}
        <div {...stylex.props(styles.actions)}>
          <Button variant="subtle" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant={destructive ? "danger" : "primary"} onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
