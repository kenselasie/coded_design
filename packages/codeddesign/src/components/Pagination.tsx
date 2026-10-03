"use client";

import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens/colors.stylex";
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
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    borderRadius: radii.pill,
    backgroundColor: colors.white,
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.s,
    fontWeight: font.semibold,
    cursor: "pointer",
    ":hover:not(:disabled)": {
      backgroundColor: colors.snowDark,
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
    backgroundColor: colors.blue,
    borderColor: colors.blue,
    color: colors.snow,
    ":hover:not(:disabled)": {
      backgroundColor: colors.blue,
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
