import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens/colors.stylex";
import { radii } from "../tokens/space.stylex";

const indeterminate = stylex.keyframes({
  "0%": { transform: "translateX(-100%)" },
  "100%": { transform: "translateX(250%)" },
});

const styles = stylex.create({
  track: {
    width: "100%",
    height: "8px",
    overflow: "hidden",
    borderRadius: radii.pill,
    backgroundColor: colors.snowDarker,
  },
  bar: {
    height: "100%",
    borderRadius: radii.pill,
    backgroundColor: colors.blue,
  },
  indeterminate: {
    width: "40%",
    animationName: indeterminate,
    animationDuration: "1.1s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
  },
  circular: {
    display: "inline-block",
    color: colors.blue,
  },
});

function Bar({ bounded }: { bounded?: number }) {
  const bar = stylex.props(
    styles.bar,
    bounded === undefined && styles.indeterminate,
  );
  return (
    <div
      {...bar}
      style={{
        ...bar.style,
        ...(bounded === undefined ? {} : { width: `${bounded}%` }),
      }}
    />
  );
}

export function LinearProgress({
  value,
  label = "Progress",
}: {
  value?: number;
  label?: string;
}) {
  const bounded = value === undefined ? undefined : Math.min(100, Math.max(0, value));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={bounded}
      {...stylex.props(styles.track)}
    >
      <Bar bounded={bounded} />
    </div>
  );
}

export function CircularProgress({
  value,
  size = 48,
  label = "Progress",
}: {
  value?: number;
  size?: number;
  label?: string;
}) {
  const stroke = 4;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const bounded = value === undefined ? 30 : Math.min(100, Math.max(0, value));
  const offset = circumference - (bounded / 100) * circumference;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      {...stylex.props(styles.circular)}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.15"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}
