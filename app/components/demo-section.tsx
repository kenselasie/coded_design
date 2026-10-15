import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { colors } from "codeddesign/tokens/colors.stylex";
import { radii } from "codeddesign/tokens/space.stylex";
import { shadows } from "codeddesign/tokens/shadows.stylex";
import { font } from "codeddesign/tokens/typography.stylex";

const styles = stylex.create({
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "40px",
    paddingTop: "16px",
  },
  chapter: {
    display: "flex",
    flexDirection: "column",
    scrollMarginTop: "96px",
  },
  chapterTitle: {
    margin: 0,
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.xxl,
    fontWeight: font.bold,
    letterSpacing: "-0.03em",
    lineHeight: 1.1,
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    minWidth: 0,
    scrollMarginTop: "96px",
  },
  title: {
    margin: 0,
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.xl,
    fontWeight: font.semibold,
    letterSpacing: "-0.02em",
    lineHeight: 1.2,
  },
  stage: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    minWidth: 0,
    padding: "20px",
    overflow: "auto",
    backgroundColor: colors.snow,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    borderRadius: radii.l,
    boxShadow: shadows.s1,
  },
});

export function DemoList({ children }: { children: ReactNode }) {
  return <div {...stylex.props(styles.list)}>{children}</div>;
}

export function DemoChapter({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <header {...stylex.props(styles.chapter)}>
      <h2 {...stylex.props(styles.chapterTitle)}>{children}</h2>
    </header>
  );
}

export function DemoSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} {...stylex.props(styles.section)}>
      <h3 {...stylex.props(styles.title)}>{title}</h3>
      <div {...stylex.props(styles.stage)}>{children}</div>
    </section>
  );
}
