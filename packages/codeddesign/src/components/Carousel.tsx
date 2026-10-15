"use client";

import * as stylex from "@stylexjs/stylex";
import { useState, type ReactNode } from "react";
import { colors } from "../tokens/colors.stylex";
import { radii } from "../tokens/space.stylex";
import { shadows } from "../tokens/shadows.stylex";
import { Icon } from "./Icon";

const styles = stylex.create({
  root: {
    position: "relative",
    width: "100%",
  },
  stage: {
    overflow: "hidden",
    borderRadius: radii.l,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
    boxShadow: shadows.s2,
  },
  slide: {
    minHeight: "180px",
    padding: "24px",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "12px",
  },
  nav: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    borderRadius: radii.pill,
    backgroundColor: colors.white,
    color: colors.black,
    cursor: "pointer",
    ":hover": {
      backgroundColor: colors.snowDark,
    },
    ":disabled": {
      opacity: 0.4,
      cursor: "not-allowed",
    },
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blue,
      outlineOffset: "2px",
    },
  },
  dots: {
    display: "flex",
    gap: "6px",
  },
  dot: {
    width: "10px",
    height: "10px",
    padding: 0,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    borderRadius: "50%",
    backgroundColor: colors.white,
    cursor: "pointer",
  },
  active: {
    backgroundColor: colors.pink,
  },
});

export function Carousel({ slides }: { slides: ReactNode[] }) {
  const [index, setIndex] = useState(0);
  const last = slides.length - 1;
  return (
    <div {...stylex.props(styles.root)}>
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Gallery"
        {...stylex.props(styles.stage)}
      >
        <div
          role="group"
          aria-roledescription="slide"
          aria-label={`${index + 1} of ${slides.length}`}
          {...stylex.props(styles.slide)}
        >
          {slides[index]}
        </div>
      </div>
      <div {...stylex.props(styles.controls)}>
        <button
          type="button"
          aria-label="Previous slide"
          disabled={index === 0}
          onClick={() => setIndex((value) => Math.max(0, value - 1))}
          {...stylex.props(styles.nav)}
        >
          <Icon name="chevronLeft" />
        </button>
        <div {...stylex.props(styles.dots)}>
          {slides.map((_, slide) => (
            <button
              key={slide}
              type="button"
              aria-label={`Go to slide ${slide + 1}`}
              onClick={() => setIndex(slide)}
              {...stylex.props(styles.dot, slide === index && styles.active)}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next slide"
          disabled={index === last}
          onClick={() => setIndex((value) => Math.min(last, value + 1))}
          {...stylex.props(styles.nav)}
        >
          <Icon name="chevronRight" />
        </button>
      </div>
    </div>
  );
}
