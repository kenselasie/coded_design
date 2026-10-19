"use client";

import * as stylex from "@stylexjs/stylex";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { Icon } from "./Icon";
import { dropdown } from "./dropdownStyles";

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
    fontFamily: font.family,
    fontSize: font.s,
    fontWeight: font.semibold,
  },
  control: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    width: "100%",
  },
  input: {
    flexGrow: 1,
    minWidth: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    color: "inherit",
    fontFamily: font.family,
    fontSize: font.m,
    outline: "none",
  },
  list: {
    position: "absolute",
    top: "calc(100% + 4px)",
    left: 0,
    right: 0,
    zIndex: 12,
    listStyle: "none",
  },
  empty: {
    padding: "10px 12px",
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
  const listId = `${id}-list`;
  const rootRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, [open]);

  return (
    <div ref={rootRef} {...stylex.props(styles.field)}>
      <label htmlFor={id} {...stylex.props(styles.label)}>
        {label}
      </label>
      <div {...stylex.props(dropdown.trigger, styles.control, open && dropdown.triggerOpen)}>
        <Icon name="search" />
        <input
          id={id}
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
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
          {...stylex.props(styles.input)}
        />
        <span {...stylex.props(dropdown.chevron, open && dropdown.chevronOpen)}>
          <Icon name="chevron" />
        </span>
      </div>
      {open ? (
        <ul id={listId} role="listbox" {...stylex.props(dropdown.panel, styles.list)}>
          {visible.length === 0 ? (
            <li {...stylex.props(styles.empty)}>No matches for that search.</li>
          ) : (
            visible.map((option) => {
              const isSelected = option.value === value;
              return (
                <li key={option.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => {
                      onChange(option.value);
                      setQuery(option.label);
                      setOpen(false);
                    }}
                    {...stylex.props(dropdown.option, isSelected && dropdown.optionSelected)}
                  >
                    <span>{option.label}</span>
                    {isSelected ? (
                      <span {...stylex.props(dropdown.check)}>
                        <Icon name="check" size={16} />
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })
          )}
        </ul>
      ) : null}
    </div>
  );
}
