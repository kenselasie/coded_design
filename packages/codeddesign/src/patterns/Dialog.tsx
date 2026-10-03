"use client";

import * as stylex from "@stylexjs/stylex";
import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { shadows } from "../tokens/shadows.stylex";
import { Icon } from "../components/Icon";

const styles = stylex.create({
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    backgroundColor: "rgba(33, 33, 33, 0.45)",
  },
  panel: {
    width: "min(480px, 100%)",
    maxHeight: "min(640px, 100%)",
    overflow: "auto",
    padding: "20px",
    borderRadius: radii.l,
    backgroundColor: colors.white,
    color: colors.black,
    boxShadow: shadows.s4,
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
    fontSize: font.l,
    fontWeight: font.semibold,
  },
  close: {
    display: "inline-flex",
    borderWidth: 0,
    backgroundColor: "transparent",
    color: colors.steel,
    cursor: "pointer",
    padding: "4px",
  },
  body: {
    fontFamily: font.family,
    fontSize: font.s,
    lineHeight: 1.5,
    color: colors.steel,
  },
});

export function Dialog({
  open,
  title,
  children,
  onClose,
}: {
  open: boolean;
  title: string;
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
    <div {...stylex.props(styles.overlay)} onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        {...stylex.props(styles.panel)}
        onClick={(event) => event.stopPropagation()}
      >
        <div {...stylex.props(styles.header)}>
          <h2 {...stylex.props(styles.title)}>{title}</h2>
          <button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            {...stylex.props(styles.close)}
          >
            <Icon name="x" />
          </button>
        </div>
        <div {...stylex.props(styles.body)}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}
