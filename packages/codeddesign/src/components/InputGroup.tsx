import * as stylex from "@stylexjs/stylex";
import type { InputHTMLAttributes, ReactNode } from "react";
import { colors } from "../tokens/colors.stylex";
import { stroke } from "../tokens/stroke.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";

const styles = stylex.create({
  group: {
    display: "flex",
    alignItems: "stretch",
    width: "100%",
    minHeight: "44px",
    overflow: "hidden",
    borderRadius: radii.control,
    borderWidth: stroke.width,
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: colors.white,
  },
  addon: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    paddingInline: "12px",
    color: colors.steel,
    fontFamily: font.family,
    fontSize: font.s,
    backgroundColor: colors.snow,
    flexShrink: 0,
  },
  field: {
    flexGrow: 1,
    minWidth: 0,
    borderWidth: 0,
    paddingInline: "12px",
    backgroundColor: "transparent",
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.m,
    outline: "none",
  },
});

export function InputGroup({
  prefix,
  suffix,
  children,
}: {
  prefix?: ReactNode;
  suffix?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div {...stylex.props(styles.group)}>
      {prefix ? <span {...stylex.props(styles.addon)}>{prefix}</span> : null}
      {children}
      {suffix ? <span {...stylex.props(styles.addon)}>{suffix}</span> : null}
    </div>
  );
}

export function InputGroupField(
  props: InputHTMLAttributes<HTMLInputElement>,
) {
  return <input {...props} {...stylex.props(styles.field)} />;
}
