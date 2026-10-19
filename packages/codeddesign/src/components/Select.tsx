"use client";

import * as stylex from "@stylexjs/stylex";
import { useEffect, useId, useRef, useState } from "react";
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
  flush: {
    gap: 0,
  },
  label: {
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.s,
    fontWeight: font.semibold,
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
  trigger: {
    width: "100%",
  },
  value: {
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  list: {
    position: "absolute",
    top: "calc(100% + 4px)",
    left: 0,
    right: 0,
    zIndex: 12,
    listStyle: "none",
  },
});

export type SelectOption = { label: string; value: string };

export function Select({
  label,
  options,
  value,
  onChange,
  placeholder = "Select",
  hideLabel = false,
  name,
}: {
  label?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  hideLabel?: boolean;
  name?: string;
}) {
  const id = useId();
  const listId = `${id}-list`;
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} {...stylex.props(styles.field, hideLabel && styles.flush)}>
      {label ? (
        <label htmlFor={id} {...stylex.props(hideLabel ? styles.visuallyHidden : styles.label)}>
          {label}
        </label>
      ) : null}
      {name ? <input type="hidden" name={name} value={value ?? ""} /> : null}
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((current) => !current)}
        {...stylex.props(dropdown.trigger, styles.trigger, open && dropdown.triggerOpen)}
      >
        <span {...stylex.props(styles.value)}>{selected?.label ?? placeholder}</span>
        <span {...stylex.props(dropdown.chevron, open && dropdown.chevronOpen)}>
          <Icon name="chevron" />
        </span>
      </button>
      {open ? (
        <ul id={listId} role="listbox" {...stylex.props(dropdown.panel, styles.list)}>
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange?.(option.value);
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
          })}
        </ul>
      ) : null}
    </div>
  );
}
