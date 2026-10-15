import * as stylex from "@stylexjs/stylex";
import type { HTMLAttributes, ReactNode } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";

type Align = "left" | "center" | "right";
type HeadingSize = "xxxl" | "xxl" | "xl" | "l" | "m";

const styles = stylex.create({
  heading: {
    margin: 0,
    color: colors.black,
    fontFamily: font.display,
    fontWeight: font.bold,
    lineHeight: 1.25,
  },
  title: {
    margin: 0,
    color: colors.black,
    fontFamily: font.display,
    fontWeight: font.semibold,
    lineHeight: 1.3,
  },
  body: {
    margin: 0,
    color: colors.black,
    fontFamily: font.family,
    fontWeight: font.regular,
    lineHeight: 1.5,
  },
  description: {
    margin: 0,
    color: colors.steel,
    fontFamily: font.family,
    fontWeight: font.regular,
    lineHeight: 1.5,
  },
  detail: {
    margin: 0,
    color: colors.steel,
    fontFamily: font.family,
    fontSize: font.xs,
    fontWeight: font.medium,
    letterSpacing: "0.04em",
    lineHeight: 1.4,
    textTransform: "uppercase",
  },
  code: {
    display: "inline",
    paddingBlock: "2px",
    paddingInline: "6px",
    borderRadius: "4px",
    backgroundColor: colors.snowDark,
    color: colors.black,
    fontFamily: font.mono,
    fontSize: "0.92em",
  },
  bullet: {
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
    margin: 0,
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.s,
    lineHeight: 1.5,
  },
  marker: {
    width: "6px",
    height: "6px",
    marginTop: "0.55em",
    borderRadius: "50%",
    backgroundColor: colors.blue,
    flexShrink: 0,
  },
  left: { textAlign: "left" },
  center: { textAlign: "center" },
  right: { textAlign: "right" },
  xxxl: { fontSize: font.xxxl },
  xxl: { fontSize: font.xxl },
  xl: { fontSize: font.xl },
  l: { fontSize: font.l },
  m: { fontSize: font.m },
  s: { fontSize: font.s },
  withMargin: { marginTop: "0.6em", marginBottom: "0.25em" },
});

export function Heading({
  size = "xl",
  align = "left",
  withoutMargins = false,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement> & {
  size?: HeadingSize;
  align?: Align;
  withoutMargins?: boolean;
  children: ReactNode;
}) {
  return (
    <h2
      {...props}
      {...stylex.props(
        styles.heading,
        styles[size],
        styles[align],
        !withoutMargins && styles.withMargin,
      )}
    >
      {children}
    </h2>
  );
}

export function Title({
  size = "l",
  align = "left",
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement> & {
  size?: "xl" | "l" | "m" | "s";
  align?: Align;
  children: ReactNode;
}) {
  return (
    <h3 {...props} {...stylex.props(styles.title, styles[size], styles[align])}>
      {children}
    </h3>
  );
}

export function Body({
  size = "m",
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement> & {
  size?: "l" | "m" | "s";
  children: ReactNode;
}) {
  return (
    <p {...props} {...stylex.props(styles.body, styles[size])}>
      {children}
    </p>
  );
}

export function Description({
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement> & { children: ReactNode }) {
  return (
    <p {...props} {...stylex.props(styles.description, styles.s)}>
      {children}
    </p>
  );
}

export function Detail({
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement> & { children: ReactNode }) {
  return (
    <p {...props} {...stylex.props(styles.detail)}>
      {children}
    </p>
  );
}

export function Code({ children }: { children: ReactNode }) {
  return <code {...stylex.props(styles.code)}>{children}</code>;
}

export function Bullet({ children }: { children: ReactNode }) {
  return (
    <p {...stylex.props(styles.bullet)}>
      <span {...stylex.props(styles.marker)} />
      <span>{children}</span>
    </p>
  );
}
