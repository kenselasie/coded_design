import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";

const styles = stylex.create({
  row: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
  },
  key: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "22px",
    paddingBlock: "2px",
    paddingInline: "6px",
    borderRadius: radii.s,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.smokeDarker,
    backgroundColor: colors.snow,
    color: colors.black,
    fontFamily: font.mono,
    fontSize: font.xs,
    lineHeight: 1.4,
  },
});

export function Shortcut({ keys }: { keys: string[] }) {
  return (
    <span {...stylex.props(styles.row)}>
      {keys.map((key) => (
        <kbd key={key} {...stylex.props(styles.key)}>
          {key}
        </kbd>
      ))}
    </span>
  );
}
