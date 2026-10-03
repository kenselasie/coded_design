"use client";

import * as stylex from "@stylexjs/stylex";
import { useId, type ReactNode, type SelectHTMLAttributes } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { shadows } from "../tokens/shadows.stylex";
import { Icon } from "./Icon";

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
    borderRadius: radii.m,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
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
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blue,
      outlineOffset: "2px",
      borderColor: colors.blue,
      boxShadow: shadows.s1,
    },
  },
  searchWrap: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  searchIcon: {
    position: "absolute",
    left: "12px",
    color: colors.concrete,
    pointerEvents: "none",
  },
  search: {
    paddingLeft: "36px",
  },
});

export type SelectOption = { label: string; value: string };

export function Select({
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
        {...stylex.props(styles.control)}
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

export function SearchInput({
  label = "Search",
  value,
  onChange,
  placeholder = "Search",
}: {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const id = useId();
  return (
    <label htmlFor={id} {...stylex.props(styles.field)}>
      <span {...stylex.props(styles.label)}>{label}</span>
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
          {...stylex.props(styles.control, styles.search)}
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
    <Select
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
