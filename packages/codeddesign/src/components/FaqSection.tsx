"use client";

import * as stylex from "@stylexjs/stylex";
import { useState } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { Icon } from "./Icon";

const styles = stylex.create({
  list: {
    display: "flex",
    flexDirection: "column",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.smoke,
    borderRadius: radii.l,
    overflow: "hidden",
  },
  item: {
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.smoke,
    backgroundColor: colors.white,
  },
  last: {
    borderBottomWidth: 0,
  },
  button: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    padding: "14px 16px",
    borderWidth: 0,
    backgroundColor: "transparent",
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.s,
    fontWeight: font.semibold,
    textAlign: "left",
    cursor: "pointer",
  },
  answer: {
    margin: 0,
    paddingBlock: "0 16px",
    paddingInline: "16px",
    color: colors.steel,
    fontFamily: font.family,
    fontSize: font.s,
    lineHeight: 1.5,
  },
  open: {
    transform: "rotate(180deg)",
  },
});

export type FaqItem = { question: string; answer: string };

export function FaqSection({
  items,
  question,
  answer,
}: {
  items?: FaqItem[];
  question?: string;
  answer?: string;
}) {
  const rows = items ?? (question && answer ? [{ question, answer }] : []);
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div {...stylex.props(styles.list)}>
      {rows.map((item, index) => {
        const expanded = open === index;
        return (
          <div
            key={item.question}
            {...stylex.props(styles.item, index === rows.length - 1 && styles.last)}
          >
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? null : index)}
              {...stylex.props(styles.button)}
            >
              {item.question}
              <span {...stylex.props(expanded && styles.open)}>
                <Icon name="chevron" />
              </span>
            </button>
            {expanded ? <p {...stylex.props(styles.answer)}>{item.answer}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
