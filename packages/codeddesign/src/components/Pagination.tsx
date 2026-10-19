"use client";

import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens/colors.stylex";
import { stroke } from "../tokens/stroke.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";

const styles = stylex.create({
  nav: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  },
  page: {
    minWidth: "36px",
    height: "36px",
    paddingInline: "10px",
    borderWidth: stroke.width,
    borderStyle: "solid",
    borderColor: colors.line,
    borderRadius: radii.control,
    backgroundColor: colors.white,
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.s,
    fontWeight: font.medium,
    cursor: "pointer",
    ":hover:not(:disabled)": {
      backgroundColor: colors.snow,
    },
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blueDark,
      outlineOffset: "3px",
    },
    ":disabled": {
      color: colors.concrete,
      borderColor: colors.smokeDarker,
      cursor: "not-allowed",
    },
  },
  current: {
    backgroundColor: colors.blueLight,
    borderColor: colors.blueDark,
    color: colors.blueDark,
    ":hover:not(:disabled)": {
      backgroundColor: colors.blueLight,
    },
  },
});

export function Pagination({
  page,
  pageCount,
  onChange,
  label = "Pages",
}: {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
  label?: string;
}) {
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <nav aria-label={label} {...stylex.props(styles.nav)}>
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        {...stylex.props(styles.page)}
      >
        Prev
      </button>
      {pages.map((number) => (
        <button
          key={number}
          type="button"
          aria-current={number === page ? "page" : undefined}
          onClick={() => onChange(number)}
          {...stylex.props(styles.page, number === page && styles.current)}
        >
          {number}
        </button>
      ))}
      <button
        type="button"
        disabled={page >= pageCount}
        onClick={() => onChange(page + 1)}
        {...stylex.props(styles.page)}
      >
        Next
      </button>
    </nav>
  );
}
