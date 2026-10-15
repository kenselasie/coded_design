"use client";

import * as stylex from "@stylexjs/stylex";
import { useId, useMemo, useState } from "react";
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
    position: "relative",
  },
  label: {
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.s,
    fontWeight: font.semibold,
  },
  control: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    minHeight: "44px",
    paddingInline: "14px",
    borderRadius: radii.m,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
    color: colors.black,
  },
  input: {
    flexGrow: 1,
    minWidth: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.m,
    outline: "none",
  },
  list: {
    position: "absolute",
    top: "calc(100% + 6px)",
    left: 0,
    right: 0,
    zIndex: 8,
    margin: 0,
    padding: "8px",
    listStyle: "none",
    borderRadius: radii.l,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
    boxShadow: shadows.s2,
    maxHeight: "220px",
    overflow: "auto",
  },
  option: {
    display: "block",
    width: "100%",
    textAlign: "left",
    borderWidth: 0,
    borderRadius: radii.s,
    padding: "8px 10px",
    backgroundColor: "transparent",
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.s,
    cursor: "pointer",
    ":hover": {
      backgroundColor: colors.snowDark,
    },
  },
  active: {
    backgroundColor: colors.snowDark,
  },
  empty: {
    padding: "8px 10px",
    color: colors.steel,
    fontFamily: font.family,
    fontSize: font.s,
  },
});

export function Combobox({
  label,
  options,
  value,
  onChange,
  placeholder = "Search",
}: {
  label: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const id = useId();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.value === value);
  const visible = useMemo(
    () =>
      options.filter((option) =>
        option.label.toLowerCase().includes(query.toLowerCase()),
      ),
    [options, query],
  );

  return (
    <div {...stylex.props(styles.field)}>
      <label htmlFor={id} {...stylex.props(styles.label)}>
        {label}
      </label>
      <div {...stylex.props(styles.control)}>
        <Icon name="search" />
        <input
          id={id}
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          value={open ? query : selected?.label ?? ""}
          placeholder={placeholder}
          onFocus={() => {
            setOpen(true);
            setQuery(selected?.label ?? "");
          }}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onBlur={() => window.setTimeout(() => setOpen(false), 120)}
          {...stylex.props(styles.input)}
        />
      </div>
      {open ? (
        <ul role="listbox" {...stylex.props(styles.list)}>
          {visible.length === 0 ? (
            <li {...stylex.props(styles.empty)}>No matches for that search.</li>
          ) : (
            visible.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={option.value === value}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => {
                    onChange(option.value);
                    setQuery(option.label);
                    setOpen(false);
                  }}
                  {...stylex.props(styles.option, option.value === value && styles.active)}
                >
                  {option.label}
                </button>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
}
