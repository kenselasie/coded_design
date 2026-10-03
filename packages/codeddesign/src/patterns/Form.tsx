import * as stylex from "@stylexjs/stylex";
import type { FormEvent, ReactNode } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { shadows } from "../tokens/shadows.stylex";

const styles = stylex.create({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    margin: 0,
    padding: "24px",
    borderRadius: radii.l,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
    boxShadow: shadows.s2,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  title: {
    margin: 0,
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.xl,
    fontWeight: font.bold,
    lineHeight: 1.2,
    letterSpacing: "-0.03em",
  },
  description: {
    margin: 0,
    maxWidth: "42ch",
    color: colors.steel,
    fontFamily: font.family,
    fontSize: font.s,
    lineHeight: 1.5,
  },
  row: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "12px",
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    gap: "8px",
    paddingTop: "4px",
  },
});

export function Form({
  title,
  description,
  onSubmit,
  children,
}: {
  title: string;
  description?: string;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}) {
  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.(event);
      }}
      {...stylex.props(styles.form)}
    >
      <div {...stylex.props(styles.header)}>
        <h3 {...stylex.props(styles.title)}>{title}</h3>
        {description ? <p {...stylex.props(styles.description)}>{description}</p> : null}
      </div>
      {children}
    </form>
  );
}

export function FormRow({ children }: { children: ReactNode }) {
  return <div {...stylex.props(styles.row)}>{children}</div>;
}

export function FormActions({ children }: { children: ReactNode }) {
  return <div {...stylex.props(styles.actions)}>{children}</div>;
}
