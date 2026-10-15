"use client";

import * as stylex from "@stylexjs/stylex";
import { useState } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { Icon } from "./Icon";
import { Calendar } from "./Calendar";
import { Popover } from "./Popover";

const styles = stylex.create({
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.s,
    fontWeight: font.semibold,
  },
  trigger: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    minHeight: "44px",
    minWidth: "220px",
    paddingInline: "14px",
    borderRadius: radii.m,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.m,
    cursor: "pointer",
    ":hover": {
      backgroundColor: colors.snow,
    },
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blue,
      outlineOffset: "2px",
    },
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
  const [month, setMonth] = useState(value ?? new Date());
  return (
    <div {...stylex.props(styles.field)}>
      <span {...stylex.props(styles.label)}>{label}</span>
      <Popover
        trigger={
          <button type="button" {...stylex.props(styles.trigger)}>
            {value
              ? value.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Pick a date"}
            <Icon name="calendar" />
          </button>
        }
      >
        <Calendar value={value} month={month} onMonthChange={setMonth} onChange={onChange} />
      </Popover>
    </div>
  );
}
