import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens/colors.stylex";

const styles = stylex.create({
  rule: {
    width: "100%",
    height: "1px",
    margin: 0,
    borderWidth: 0,
    backgroundColor: colors.smoke,
  },
});

export function Divider() {
  return <hr {...stylex.props(styles.rule)} />;
}
