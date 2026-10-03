import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  spacer: {
    display: "block",
    flexShrink: 0,
  },
  xxs: { width: "4px", height: "4px" },
  xs: { width: "8px", height: "8px" },
  s: { width: "12px", height: "12px" },
  m: { width: "16px", height: "16px" },
  l: { width: "24px", height: "24px" },
  xl: { width: "32px", height: "32px" },
});

export function Spacer({
  size = "m",
}: {
  size?: "xxs" | "xs" | "s" | "m" | "l" | "xl";
}) {
  return <div aria-hidden="true" {...stylex.props(styles.spacer, styles[size])} />;
}
