"use client";

import * as stylex from "@stylexjs/stylex";
import { useId } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";

const pop = stylex.keyframes({
  "0%": { transform: "scale(0.7) rotate(-8deg)" },
  "60%": { transform: "scale(1.15) rotate(4deg)" },
  "100%": { transform: "scale(1) rotate(0deg)" },
});

const styles = stylex.create({
  group: {
    display: "inline-flex",
    flexDirection: "column",
    gap: "8px",
    margin: 0,
    padding: 0,
    borderWidth: 0,
  },
  legend: {
    padding: 0,
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.s,
    fontWeight: font.semibold,
  },
  row: {
    display: "inline-flex",
    gap: "4px",
  },
  option: {
    position: "relative",
    display: "inline-flex",
    cursor: "pointer",
    ":focus-within": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blueDark,
      outlineOffset: "3px",
      borderRadius: "8px",
    },
  },
  input: {
    position: "absolute",
    opacity: 0,
    width: "1px",
    height: "1px",
  },
  hidden: {
    position: "absolute",
    width: "1px",
    height: "1px",
    overflow: "hidden",
  },
  star: {
    display: "block",
  },
  path: {
    fill: "none",
    stroke: colors.black,
    strokeWidth: 1.6,
  },
  pathFilled: {
    fill: colors.warning,
  },
  picked: {
    animationName: pop,
    animationDuration: "280ms",
    animationTimingFunction: "ease-out",
  },
});

function Star({ filled }: { filled: boolean }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true" {...stylex.props(styles.star)}>
      <path
        d="M12 2.6l2.5 5.5 6 .7-4.5 4 1.3 5.9L12 15.8 6.7 18.7l1.3-5.9-4.5-4 6-.7L12 2.6z"
        strokeLinejoin="round"
        {...stylex.props(styles.path, filled && styles.pathFilled)}
      />
    </svg>
  );
}

export function Rating({
  value = 0,
  onChange,
  max = 5,
  label = "Rating",
  name,
}: {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  label?: string;
  name?: string;
}) {
  const generated = useId();
  const group = name ?? generated;

  return (
    <fieldset {...stylex.props(styles.group)}>
      <legend {...stylex.props(styles.legend)}>{label}</legend>
      <div {...stylex.props(styles.row)}>
        {Array.from({ length: max }, (_, index) => {
          const score = index + 1;
          const picked = value === score;
          return (
            <label key={score} {...stylex.props(styles.option)}>
              <input
                type="radio"
                name={group}
                value={score}
                checked={picked}
                onChange={() => onChange?.(score)}
                {...stylex.props(styles.input)}
              />
              <span {...stylex.props(picked && styles.picked)}>
                <Star filled={score <= value} />
              </span>
              <span {...stylex.props(styles.hidden)}>
                {score} of {max}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
