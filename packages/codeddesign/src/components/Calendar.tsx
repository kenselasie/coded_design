"use client";

import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens/colors.stylex";
import { stroke } from "../tokens/stroke.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { Icon } from "./Icon";
import { dropdown } from "./dropdownStyles";

const styles = stylex.create({
  calendar: {
    width: "min(288px, 100%)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "12px",
  },
  month: {
    margin: 0,
    fontFamily: font.family,
    fontSize: font.m,
    fontWeight: font.semibold,
    color: colors.black,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "4px",
  },
  weekday: {
    textAlign: "center",
    color: colors.steel,
    fontFamily: font.mono,
    fontSize: font.xxs,
    fontWeight: font.semibold,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    paddingBlock: "4px",
  },
  day: {
    minHeight: "36px",
    borderWidth: stroke.width,
    borderStyle: "solid",
    borderColor: "transparent",
    borderRadius: radii.control,
    backgroundColor: "transparent",
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.s,
    cursor: "pointer",
    ":hover": {
      backgroundColor: colors.snow,
    },
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blueDark,
    },
  },
  muted: {
    color: colors.concrete,
  },
  selected: {
    backgroundColor: colors.blueDark,
    color: colors.onAccent,
    fontWeight: font.semibold,
    ":hover": {
      backgroundColor: colors.blueDark,
    },
  },
  today: {
    borderWidth: stroke.width,
    borderStyle: "solid",
    borderColor: colors.blueLight,
  },
});

const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function Calendar({
  value,
  onChange,
  month,
  onMonthChange,
}: {
  value?: Date;
  onChange?: (date: Date) => void;
  month?: Date;
  onMonthChange?: (date: Date) => void;
}) {
  const shown = month ?? value ?? new Date();
  const first = startOfMonth(shown);
  const startOffset = first.getDay();
  const daysInMonth = new Date(shown.getFullYear(), shown.getMonth() + 1, 0).getDate();
  const cells: { date: Date; current: boolean }[] = [];
  for (let i = 0; i < startOffset; i += 1) {
    const date = new Date(shown.getFullYear(), shown.getMonth(), i - startOffset + 1);
    cells.push({ date, current: false });
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ date: new Date(shown.getFullYear(), shown.getMonth(), day), current: true });
  }
  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1].date;
    cells.push({
      date: new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1),
      current: false,
    });
  }
  const today = new Date();
  const label = shown.toLocaleString("en-US", { month: "long", year: "numeric" });

  const shift = (delta: number) => {
    const next = new Date(shown.getFullYear(), shown.getMonth() + delta, 1);
    onMonthChange?.(next);
  };

  return (
    <div {...stylex.props(styles.calendar)}>
      <div {...stylex.props(styles.header)}>
        <button
          type="button"
          aria-label="Previous month"
          onClick={() => shift(-1)}
          {...stylex.props(dropdown.trigger, dropdown.navChip)}
        >
          <Icon name="chevronLeft" />
        </button>
        <p {...stylex.props(styles.month)}>{label}</p>
        <button
          type="button"
          aria-label="Next month"
          onClick={() => shift(1)}
          {...stylex.props(dropdown.trigger, dropdown.navChip)}
        >
          <Icon name="chevronRight" />
        </button>
      </div>
      <div {...stylex.props(styles.grid)}>
        {weekdays.map((day) => (
          <span key={day} {...stylex.props(styles.weekday)}>
            {day}
          </span>
        ))}
        {cells.map(({ date, current }) => {
          const selected = value ? sameDay(date, value) : false;
          return (
            <button
              key={date.toISOString()}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange?.(date)}
              {...stylex.props(
                styles.day,
                !current && styles.muted,
                selected && styles.selected,
                sameDay(date, today) && !selected && styles.today,
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
