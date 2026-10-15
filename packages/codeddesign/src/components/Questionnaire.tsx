"use client";

import * as stylex from "@stylexjs/stylex";
import { useState } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { shadows } from "../tokens/shadows.stylex";
import { Button } from "./Button";
import { LinearProgress } from "./Progress";

const styles = stylex.create({
  card: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "24px",
    borderRadius: radii.l,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
    boxShadow: shadows.s2,
  },
  title: {
    margin: 0,
    fontFamily: font.display,
    fontSize: font.xl,
    fontWeight: font.bold,
    letterSpacing: "-0.03em",
    color: colors.black,
  },
  description: {
    margin: 0,
    color: colors.steel,
    fontFamily: font.family,
    fontSize: font.s,
    lineHeight: 1.5,
  },
  choices: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  choice: {
    display: "block",
    width: "100%",
    textAlign: "left",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    borderRadius: radii.m,
    padding: "12px 14px",
    backgroundColor: colors.white,
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.s,
    cursor: "pointer",
    ":hover": {
      backgroundColor: colors.snow,
    },
  },
  selected: {
    backgroundColor: colors.snowDark,
    boxShadow: shadows.s1,
  },
  label: {
    display: "block",
    fontFamily: font.display,
    fontWeight: font.semibold,
  },
  hint: {
    display: "block",
    marginTop: "4px",
    color: colors.steel,
    fontSize: font.xs,
  },
  error: {
    margin: 0,
    color: colors.dangerDark,
    fontFamily: font.family,
    fontSize: font.s,
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    gap: "8px",
  },
  done: {
    margin: 0,
    fontFamily: font.family,
    fontSize: font.s,
    color: colors.black,
  },
});

export type QuestionnaireItem = {
  name: string;
  prompt: string;
  description?: string;
  required?: boolean;
  choices: { value: string; label: string; hint?: string }[];
};

export function Questionnaire({
  items,
  onComplete,
}: {
  items: QuestionnaireItem[];
  onComplete?: (answers: Record<string, string>) => void;
}) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const current = items[index];
  const done = index >= items.length;

  if (done) {
    return (
      <div {...stylex.props(styles.card)}>
        <h3 {...stylex.props(styles.title)}>Answers saved</h3>
        <p {...stylex.props(styles.done)}>
          {items
            .map((item) => `${item.prompt} ${answers[item.name] ?? "skipped"}`)
            .join(" · ")}
        </p>
      </div>
    );
  }

  return (
    <form
      {...stylex.props(styles.card)}
      onSubmit={(event) => {
        event.preventDefault();
        if (current.required && !answers[current.name]) {
          setError("Choose an answer to continue.");
          return;
        }
        setError("");
        if (index === items.length - 1) onComplete?.(answers);
        setIndex((value) => value + 1);
      }}
    >
      <LinearProgress value={((index + 1) / items.length) * 100} />
      <h3 {...stylex.props(styles.title)}>{current.prompt}</h3>
      {current.description ? (
        <p {...stylex.props(styles.description)}>{current.description}</p>
      ) : null}
      <div role="radiogroup" aria-label={current.prompt} {...stylex.props(styles.choices)}>
        {current.choices.map((choice) => (
          <button
            key={choice.value}
            type="button"
            aria-pressed={answers[current.name] === choice.value}
            onClick={() => {
              setAnswers((currentAnswers) => ({
                ...currentAnswers,
                [current.name]: choice.value,
              }));
              setError("");
            }}
            {...stylex.props(
              styles.choice,
              answers[current.name] === choice.value && styles.selected,
            )}
          >
            <span {...stylex.props(styles.label)}>{choice.label}</span>
            {choice.hint ? <span {...stylex.props(styles.hint)}>{choice.hint}</span> : null}
          </button>
        ))}
      </div>
      {error ? <p {...stylex.props(styles.error)}>{error}</p> : null}
      <div {...stylex.props(styles.actions)}>
        <Button
          type="button"
          variant="subtle"
          disabled={index === 0}
          onClick={() => {
            setError("");
            setIndex((value) => Math.max(0, value - 1));
          }}
        >
          Back
        </Button>
        {!current.required ? (
          <Button
            type="button"
            variant="subtle"
            onClick={() => setIndex((value) => value + 1)}
          >
            Skip
          </Button>
        ) : null}
        <Button type="submit" variant="primary">
          {index === items.length - 1 ? "Finish" : "Next"}
        </Button>
      </div>
    </form>
  );
}
