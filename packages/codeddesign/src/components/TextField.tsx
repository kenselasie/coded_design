"use client";

import * as stylex from "@stylexjs/stylex";
import { useId, useState, type ReactNode } from "react";
import { colors } from "../tokens/colors.stylex";
import { stroke } from "../tokens/stroke.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { shadows } from "../tokens/shadows.stylex";

const styles = stylex.create({
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    width: "100%",
    minWidth: 0,
  },
  label: {
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.s,
    fontWeight: font.semibold,
  },
  controlWrap: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  control: {
    width: "100%",
    boxSizing: "border-box",
    minHeight: "44px",
    paddingBlock: "10px",
    paddingInline: "14px",
    borderRadius: radii.control,
    borderWidth: stroke.width,
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: colors.white,
    color: colors.black,
    caretColor: colors.blueDark,
    fontFamily: font.family,
    fontSize: font.m,
    lineHeight: 1.4,
    "::placeholder": {
      color: colors.steel,
      opacity: 1,
    },
    ":hover:not(:disabled)": {
      backgroundColor: colors.snow,
    },
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blueDark,
      outlineOffset: "2px",
      borderColor: colors.blueDark,
      boxShadow: shadows.s1,
    },
    ":disabled": {
      backgroundColor: colors.snowDark,
      borderColor: colors.smokeDarker,
      color: colors.steel,
      cursor: "not-allowed",
    },
  },
  withReveal: {
    paddingRight: "72px",
  },
  area: {
    minHeight: "120px",
    resize: "vertical",
  },
  invalid: {
    borderColor: colors.dangerDark,
    ":focus-visible": {
      outlineColor: colors.dangerDark,
      borderColor: colors.dangerDark,
    },
  },
  reveal: {
    position: "absolute",
    right: "8px",
    borderWidth: 0,
    borderRadius: radii.control,
    padding: "6px 10px",
    backgroundColor: "transparent",
    color: colors.blueDark,
    fontFamily: font.family,
    fontSize: font.xs,
    fontWeight: font.semibold,
    cursor: "pointer",
    ":hover": {
      backgroundColor: colors.snowDark,
    },
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blueDark,
      outlineOffset: "2px",
    },
  },
  hint: {
    margin: 0,
    color: colors.steel,
    fontFamily: font.family,
    fontSize: font.s,
    lineHeight: 1.4,
  },
  error: {
    margin: 0,
    color: colors.dangerDark,
    fontFamily: font.family,
    fontSize: font.s,
    fontWeight: font.medium,
    lineHeight: 1.4,
  },
});

type Shared = {
  label: string;
  hint?: string;
  error?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  placeholder?: string;
  autoComplete?: string;
};

function FieldFrame({
  label,
  hint,
  error,
  children,
}: Pick<Shared, "label" | "hint" | "error"> & {
  children: (ids: { inputId: string; describedBy?: string }) => ReactNode;
}) {
  const inputId = useId();
  const hintId = useId();
  const errorId = useId();
  const describedBy = error ? errorId : hint ? hintId : undefined;

  return (
    <div {...stylex.props(styles.field)}>
      <label htmlFor={inputId} {...stylex.props(styles.label)}>
        {label}
      </label>
      {children({ inputId, describedBy })}
      {error ? (
        <p id={errorId} {...stylex.props(styles.error)}>
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} {...stylex.props(styles.hint)}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function TextField({
  label,
  hint,
  error,
  value,
  defaultValue,
  onChange,
  disabled,
  required,
  name,
  placeholder,
  autoComplete,
  type = "text",
  canReveal = false,
}: Shared & {
  type?: "text" | "email" | "password" | "url" | "tel";
  canReveal?: boolean;
}) {
  const [revealed, setRevealed] = useState(false);
  const inputType = canReveal && type === "password" && revealed ? "text" : type;

  return (
    <FieldFrame label={label} hint={hint} error={error}>
      {({ inputId, describedBy }) => (
        <span {...stylex.props(styles.controlWrap)}>
          <input
            id={inputId}
            name={name}
            type={inputType}
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            autoComplete={autoComplete}
            disabled={disabled}
            required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            onChange={(event) => onChange?.(event.target.value)}
            {...stylex.props(
              styles.control,
              canReveal && styles.withReveal,
              Boolean(error) && styles.invalid,
            )}
          />
          {canReveal && type === "password" ? (
            <button
              type="button"
              aria-pressed={revealed}
              onClick={() => setRevealed((current) => !current)}
              {...stylex.props(styles.reveal)}
            >
              {revealed ? "Hide" : "Show"}
            </button>
          ) : null}
        </span>
      )}
    </FieldFrame>
  );
}

export function TextArea({
  label,
  hint,
  error,
  value,
  defaultValue,
  onChange,
  disabled,
  required,
  name,
  placeholder,
  rows = 4,
}: Shared & { rows?: number }) {
  return (
    <FieldFrame label={label} hint={hint} error={error}>
      {({ inputId, describedBy }) => (
        <textarea
          id={inputId}
          name={name}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          rows={rows}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          onChange={(event) => onChange?.(event.target.value)}
          {...stylex.props(styles.control, styles.area, Boolean(error) && styles.invalid)}
        />
      )}
    </FieldFrame>
  );
}
