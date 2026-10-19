"use client";

import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { Accordion } from "./Accordion";

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  },
  group: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  heading: {
    margin: 0,
    color: colors.steel,
    fontFamily: font.mono,
    fontSize: font.xs,
    fontWeight: font.semibold,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
});

export type FaqItem = { question: string; answer: string };

export type FaqGroup = { title: string; items: FaqItem[] };

export function FaqSection({
  items,
  groups,
  question,
  answer,
}: {
  items?: FaqItem[];
  groups?: FaqGroup[];
  question?: string;
  answer?: string;
}) {
  const rows =
    items ?? (question && answer ? [{ question, answer }] : []);

  if (groups?.length) {
    return (
      <div {...stylex.props(styles.root)}>
        {groups.map((group, groupIndex) => (
          <section key={group.title} {...stylex.props(styles.group)}>
            <h2 {...stylex.props(styles.heading)}>{group.title}</h2>
            <Accordion
              type="single"
              defaultExpanded={groupIndex === 0}
              items={group.items.map((item) => ({
                title: item.question,
                content: item.answer,
              }))}
            />
          </section>
        ))}
      </div>
    );
  }

  return (
    <Accordion
      type="single"
      items={rows.map((item) => ({
        title: item.question,
        content: item.answer,
      }))}
    />
  );
}
