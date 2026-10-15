import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";

const styles = stylex.create({
  legend: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
  },
  item: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    color: colors.steel,
    fontFamily: font.family,
    fontSize: font.xs,
  },
  swatch: {
    width: "10px",
    height: "10px",
    borderRadius: "2px",
  },
  tooltip: {
    display: "inline-flex",
    flexDirection: "column",
    gap: "2px",
    paddingBlock: "8px",
    paddingInline: "10px",
    borderRadius: "6px",
    backgroundColor: colors.black,
    color: colors.onAccent,
    fontFamily: font.family,
    fontSize: font.xs,
  },
  value: {
    fontWeight: font.semibold,
    fontSize: font.s,
  },
  axis: {
    color: colors.concrete,
    fontFamily: font.family,
    fontSize: font.xxs,
    letterSpacing: "0.04em",
  },
  blue: { backgroundColor: colors.blue },
  green: { backgroundColor: colors.green },
  pink: { backgroundColor: colors.pink },
  turquoise: { backgroundColor: colors.turquoise },
  warning: { backgroundColor: colors.warning },
});

const swatches = {
  blue: styles.blue,
  green: styles.green,
  pink: styles.pink,
  turquoise: styles.turquoise,
  warning: styles.warning,
} as const;

export type ChartColor = keyof typeof swatches;

export function ChartLegend({
  items,
}: {
  items: { label: string; color: ChartColor }[];
}) {
  return (
    <div {...stylex.props(styles.legend)}>
      {items.map((item) => (
        <span key={item.label} {...stylex.props(styles.item)}>
          <span {...stylex.props(styles.swatch, swatches[item.color])} />
          {item.label}
        </span>
      ))}
    </div>
  );
}

export function ChartTooltip({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div {...stylex.props(styles.tooltip)}>
      <span>{label}</span>
      <span {...stylex.props(styles.value)}>{value}</span>
    </div>
  );
}

export function ChartAxisLabel({ children }: { children: string }) {
  return <span {...stylex.props(styles.axis)}>{children}</span>;
}
