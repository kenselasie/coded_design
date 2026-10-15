import * as stylex from "@stylexjs/stylex";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { shadows } from "../tokens/shadows.stylex";
import { Spinner } from "./Spinner";

export type ButtonVariant =
  | "default"
  | "primary"
  | "subtle"
  | "danger"
  | "dangerSubtle"
  | "ghost"
  | "ghostSubtle";

export type ButtonSize = "small" | "medium" | "large";

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isPending?: boolean;
  selected?: boolean;
  fullWidth?: boolean;
  isIconButton?: boolean;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "style">;

const styles = stylex.create({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    position: "relative",
    boxSizing: "border-box",
    margin: 0,
    borderRadius: radii.l,
    backgroundColor: "transparent",
    fontFamily: font.display,
    fontWeight: font.semibold,
    letterSpacing: "0.01em",
    lineHeight: 1,
    textAlign: "center",
    whiteSpace: "nowrap",
    cursor: "pointer",
    transitionProperty: "background-color, color, border-color, transform, box-shadow",
    transitionDuration: "160ms",
    transitionTimingFunction: "ease-out",
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineOffset: "3px",
    },
    ":hover:not(:disabled)": {
      transform: "translateY(-2px)",
      boxShadow: shadows.s2,
    },
    ":active:not(:disabled)": {
      transform: "translateY(1px) scale(0.96)",
      boxShadow: "none",
    },
    ":disabled": {
      cursor: "not-allowed",
    },
  },
  small: {
    minHeight: "32px",
    paddingBlock: "7px",
    paddingInline: "12px",
    fontSize: font.s,
  },
  medium: {
    minHeight: "40px",
    paddingBlock: "8px",
    paddingInline: "20px",
    fontSize: font.m,
  },
  large: {
    minHeight: "48px",
    paddingBlock: "10px",
    paddingInline: "24px",
    fontSize: font.xl,
  },
  icon: {
    paddingInline: "10px",
  },
  fullWidth: {
    width: "100%",
  },
  default: {
    color: colors.black,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    outlineColor: colors.black,
    ":hover:not(:disabled)": {
      backgroundColor: colors.black,
      color: colors.onAccent,
    },
    ":disabled": {
      color: colors.smokeDarker,
      borderColor: colors.smoke,
      backgroundColor: "transparent",
    },
  },
  defaultSelected: {
    backgroundColor: colors.black,
    color: colors.onAccent,
    ":hover:not(:disabled)": {
      backgroundColor: colors.steel,
      borderColor: colors.steel,
    },
  },
  primary: {
    color: colors.onAccent,
    backgroundColor: colors.blue,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "transparent",
    outlineColor: colors.blueDark,
    ":hover:not(:disabled)": {
      backgroundColor: colors.blueDark,
    },
    ":disabled": {
      color: colors.concrete,
      backgroundColor: colors.smoke,
      borderColor: "transparent",
    },
  },
  primarySelected: {
    backgroundColor: colors.blueDark,
  },
  subtle: {
    color: colors.black,
    backgroundColor: "transparent",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "transparent",
    outlineColor: colors.smokeDark,
    ":hover:not(:disabled)": {
      backgroundColor: colors.snowDark,
    },
    ":disabled": {
      color: colors.smokeDarker,
      backgroundColor: "transparent",
    },
  },
  subtleSelected: {
    backgroundColor: colors.smokeDarker,
    color: colors.black,
  },
  danger: {
    color: colors.danger,
    backgroundColor: "transparent",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.danger,
    outlineColor: colors.danger,
    ":hover:not(:disabled)": {
      backgroundColor: colors.danger,
      color: colors.onAccent,
    },
    ":disabled": {
      color: colors.smokeDarker,
      borderColor: colors.smokeDarker,
      backgroundColor: "transparent",
    },
  },
  dangerSubtle: {
    color: colors.danger,
    backgroundColor: "transparent",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "transparent",
    outlineColor: colors.danger,
    ":hover:not(:disabled)": {
      backgroundColor: colors.danger,
      color: colors.onAccent,
    },
    ":disabled": {
      color: colors.smokeDarker,
      backgroundColor: "transparent",
    },
  },
  ghost: {
    color: colors.black,
    backgroundColor: "transparent",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    outlineColor: colors.black,
    ":hover:not(:disabled)": {
      backgroundColor: colors.black,
      color: colors.onAccent,
    },
    ":disabled": {
      color: colors.steel,
      borderColor: colors.steel,
    },
  },
  ghostSelected: {
    backgroundColor: colors.black,
    color: colors.onAccent,
  },
  ghostSubtle: {
    color: colors.black,
    backgroundColor: "transparent",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "transparent",
    outlineColor: colors.steel,
    ":hover:not(:disabled)": {
      backgroundColor: colors.steel,
    },
    ":disabled": {
      color: colors.steel,
      backgroundColor: "transparent",
    },
  },
});

const variants = {
  default: styles.default,
  primary: styles.primary,
  subtle: styles.subtle,
  danger: styles.danger,
  dangerSubtle: styles.dangerSubtle,
  ghost: styles.ghost,
  ghostSubtle: styles.ghostSubtle,
} as const;

const selected = {
  default: styles.defaultSelected,
  primary: styles.primarySelected,
  subtle: styles.subtleSelected,
  danger: styles.danger,
  dangerSubtle: styles.dangerSubtle,
  ghost: styles.ghostSelected,
  ghostSubtle: styles.ghostSubtle,
} as const;

export function Button({
  variant = "default",
  size = "medium",
  isPending = false,
  selected: isSelected = false,
  fullWidth = false,
  isIconButton = false,
  disabled,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isPending;
  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-pressed={isSelected || undefined}
      aria-busy={isPending || undefined}
      {...props}
      {...stylex.props(
        styles.base,
        styles[size],
        variants[variant],
        isSelected && selected[variant],
        isIconButton && styles.icon,
        fullWidth && styles.fullWidth,
      )}
    >
      {isPending ? <Spinner size="small" /> : null}
      {children}
    </button>
  );
}
