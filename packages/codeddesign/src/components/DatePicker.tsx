"use client";

import * as stylex from "@stylexjs/stylex";
import { useEffect, useRef, useState } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { Icon } from "./Icon";
import { Calendar } from "./Calendar";
import { dropdown } from "./dropdownStyles";

const styles = stylex.create({
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    position: "relative",
    minWidth: "220px",
  },
  label: {
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.s,
    fontWeight: font.semibold,
  },
  trigger: {
    width: "100%",
  },
  panel: {
    position: "absolute",
    top: "calc(100% + 4px)",
    left: 0,
    zIndex: 12,
    minWidth: "280px",
  },
});

export function DatePicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: Date;
  onChange: (date: Date) => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(value ?? new Date());

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
    <div ref={rootRef} {...stylex.props(styles.field)}>
      <span {...stylex.props(styles.label)}>{label}</span>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        {...stylex.props(dropdown.trigger, styles.trigger, open && dropdown.triggerOpen)}
      >
        <span>
          {value
            ? value.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "Pick a date"}
        </span>
        <Icon name="calendar" />
      </button>
      {open ? (
        <div {...stylex.props(dropdown.panel, dropdown.panelPad, styles.panel)}>
          <Calendar
            value={value}
            month={month}
            onMonthChange={setMonth}
            onChange={(date) => {
              onChange(date);
              setOpen(false);
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
