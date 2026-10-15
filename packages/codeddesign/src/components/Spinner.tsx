import * as stylex from "@stylexjs/stylex";

const spin = stylex.keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

const styles = stylex.create({
  spinner: {
    display: "block",
    boxSizing: "border-box",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "transparent",
    borderTopColor: "currentColor",
    borderRadius: "50%",
    animationName: spin,
    animationDuration: "0.7s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  },
  small: { width: "14px", height: "14px" },
  medium: { width: "20px", height: "20px" },
  large: { width: "32px", height: "32px" },
});

export function Spinner({
  size = "medium",
  label = "Loading",
}: {
  size?: "small" | "medium" | "large";
  label?: string;
}) {
  return (
    <span
      role="status"
      aria-label={label}
      {...stylex.props(styles.spinner, styles[size])}
    />
  );
}

export function LoadingSpinner(props: {
  size?: "small" | "medium" | "large";
  label?: string;
}) {
  return <Spinner {...props} />;
}
