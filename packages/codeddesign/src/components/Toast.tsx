"use client";

import * as stylex from "@stylexjs/stylex";
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { shadows } from "../tokens/shadows.stylex";
import { Icon } from "./Icon";

export type ToastType = "info" | "success" | "warning" | "error";

type ToastItem = { id: number; type: ToastType; message: string };

type PushToast = (toast: { type: ToastType; message: string }) => void;

const ToastContext = createContext<PushToast | null>(null);

const styles = stylex.create({
  region: {
    position: "fixed",
    right: "16px",
    bottom: "16px",
    zIndex: 40,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    width: "min(360px, calc(100vw - 32px))",
  },
  toast: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    padding: "12px 14px",
    borderRadius: radii.l,
    backgroundColor: colors.white,
    color: colors.black,
    boxShadow: shadows.s3,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.smoke,
    fontFamily: font.family,
    fontSize: font.s,
    lineHeight: 1.4,
  },
  info: { color: colors.blue },
  success: { color: colors.success },
  warning: { color: colors.warningDark },
  error: { color: colors.danger },
  message: {
    flexGrow: 1,
    color: colors.black,
  },
  close: {
    borderWidth: 0,
    backgroundColor: "transparent",
    color: colors.steel,
    cursor: "pointer",
    padding: 0,
  },
});

const icons = {
  info: "info",
  success: "check",
  warning: "alert",
  error: "alert",
} as const;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const push: PushToast = ({ type, message }) => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current, { id, type, message }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 4000);
  };

  const dismiss = (id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={push}>
      {children}
      <div aria-live="polite" {...stylex.props(styles.region)}>
        {toasts.map((toast) => (
          <div key={toast.id} {...stylex.props(styles.toast)}>
            <span {...stylex.props(styles[toast.type])}>
              <Icon name={icons[toast.type]} />
            </span>
            <span {...stylex.props(styles.message)}>{toast.message}</span>
            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={() => dismiss(toast.id)}
              {...stylex.props(styles.close)}
            >
              <Icon name="x" size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const push = useContext(ToastContext);
  if (!push) {
    throw new Error("useToast must be used inside ToastProvider");
  }
  return push;
}
