import * as stylex from "@stylexjs/stylex";

export const space = stylex.defineVars({
  xxs: "4px",
  xs: "8px",
  s: "12px",
  m: "16px",
  l: "24px",
  xl: "32px",
  xxl: "48px",
});

export const radii = stylex.defineVars({
  s: "10px",
  m: "16px",
  l: "22px",
  pill: "999px",
  /** Buttons and form controls — soft editorial remaps to 8px; Marker to 4px. */
  control: "22px",
});
