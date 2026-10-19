"use client";

import * as stylex from "@stylexjs/stylex";
import { useId, type ReactNode, type SelectHTMLAttributes } from "react";
import { colors } from "../tokens/colors.stylex";
import { stroke } from "../tokens/stroke.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { shadows } from "../tokens/shadows.stylex";
import { Icon } from "./Icon";
import { Select as DropdownSelect, type SelectOption } from "./Select";

export type { SelectOption };

const styles = stylex.create({
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    minWidth: "220px",
  },
  label: {
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.s,
    fontWeight: font.semibold,
  },
  control: {
    width: "100%",
    boxSizing: "border-box",
    minHeight: "44px",
    paddingBlock: "10px",
    paddingInline: "14px",
    borderRadius: radii.control,
    borderWidth: stroke.width,
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: colors.white,
    color: colors.black,
    caretColor: colors.blueDark,
    fontFamily: font.family,
    fontSize: font.m,
    lineHeight: 1.4,
    "::placeholder": {
      color: colors.steel,
      opacity: 1,
    },
    ":hover:not(:disabled)": {
      backgroundColor: colors.snow,
    },
  },
  controlFocus: {
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blueDark,
      outlineOffset: "2px",
      borderColor: colors.blueDark,
      boxShadow: shadows.s1,
    },
  },
  searchField: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    minWidth: 0,
    width: "100%",
  },
  searchWrap: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    minWidth: 0,
    width: "100%",
  },
  searchIcon: {
    position: "absolute",
    left: "12px",
    color: colors.steel,
    pointerEvents: "none",
  },
  search: {
    minWidth: 0,
    paddingLeft: "36px",
    appearance: "none",
    "::-webkit-search-decoration": {
      display: "none",
    },
    "::-webkit-search-cancel-button": {
      display: "none",
    },
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blueDark,
      outlineOffset: "-2px",
      borderColor: colors.blueDark,
      boxShadow: "none",
    },
  },
  searchPill: {
    height: "40px",
    minHeight: "40px",
    paddingTop: "8px",
    paddingBottom: "8px",
    fontSize: font.s,
    borderRadius: radii.control,
  },
  visuallyHidden: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
  flush: {
    gap: 0,
  },
});

/** Native HTML select. Prefer `Select` for the custom dropdown. */
export function NativeSelect({
  label,
  options,
  value,
  onChange,
  ...props
}: {
  label?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "style">) {
  const id = useId();
  return (
    <label htmlFor={id} {...stylex.props(styles.field)}>
      {label ? <span {...stylex.props(styles.label)}>{label}</span> : null}
      <select
        id={id}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        {...props}
        {...stylex.props(styles.control, styles.controlFocus)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export { DropdownSelect as Select };

export function SearchInput({
  label = "Search",
  value,
  onChange,
  placeholder = "Search",
  hideLabel = false,
  shape = "default",
}: {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hideLabel?: boolean;
  shape?: "default" | "pill";
}) {
  const id = useId();
  return (
    <label htmlFor={id} {...stylex.props(styles.searchField, hideLabel && styles.flush)}>
      <span {...stylex.props(hideLabel ? styles.visuallyHidden : styles.label)}>{label}</span>
      <span {...stylex.props(styles.searchWrap)}>
        <span {...stylex.props(styles.searchIcon)}>
          <Icon name="search" size={16} />
        </span>
        <input
          id={id}
          type="search"
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          {...stylex.props(styles.control, styles.search, shape === "pill" && styles.searchPill)}
        />
      </span>
    </label>
  );
}

const languages = [
  { label: "English", value: "en" },
  { label: "Español", value: "es" },
  { label: "Français", value: "fr" },
  { label: "Deutsch", value: "de" },
  { label: "Português", value: "pt" },
];

export function LanguageSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <DropdownSelect
      label="Language"
      options={languages}
      value={value}
      onChange={onChange}
    />
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label {...stylex.props(styles.field)}>
      <span {...stylex.props(styles.label)}>{label}</span>
      {children}
    </label>
  );
}
