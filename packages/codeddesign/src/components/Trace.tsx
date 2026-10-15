"use client";

import * as stylex from "@stylexjs/stylex";
import { useState, type ReactNode } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { Icon, type IconName } from "./Icon";
import { Spinner } from "./Spinner";

const pulse = stylex.keyframes({
  "0%": { opacity: 1 },
  "50%": { opacity: 0.45 },
  "100%": { opacity: 1 },
});

const styles = stylex.create({
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  line: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    width: "100%",
    borderWidth: 0,
    borderRadius: radii.s,
    padding: "8px 6px",
    backgroundColor: "transparent",
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.s,
    textAlign: "left",
  },
  clickable: {
    cursor: "pointer",
    ":hover": {
      backgroundColor: colors.snow,
    },
  },
  icon: {
    color: colors.steel,
    flexShrink: 0,
  },
  title: {
    flexGrow: 1,
    minWidth: 0,
  },
  running: {
    animationName: pulse,
    animationDuration: "1.1s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
  },
  error: {
    color: colors.dangerDark,
  },
  pending: {
    color: colors.concrete,
  },
  description: {
    color: colors.steel,
    fontSize: font.xs,
    flexShrink: 0,
  },
  detail: {
    margin: "0 0 8px 32px",
    padding: "10px 12px",
    borderRadius: radii.s,
    backgroundColor: colors.snow,
    color: colors.steel,
    fontFamily: font.mono,
    fontSize: font.xs,
    lineHeight: 1.5,
    whiteSpace: "pre-wrap",
  },
  chevron: {
    display: "inline-flex",
    transitionProperty: "transform",
    transitionDuration: "160ms",
  },
  open: {
    transform: "rotate(90deg)",
  },
});

export type TraceStatus = "running" | "error" | "pending";

export function Trace({ children }: { children: ReactNode }) {
  return <div {...stylex.props(styles.list)}>{children}</div>;
}

export function TraceLine({
  icon = "terminal",
  title,
  description,
  status,
  detail,
}: {
  icon?: IconName;
  title: string;
  description?: string;
  status?: TraceStatus;
  detail?: string;
}) {
  const [open, setOpen] = useState(Boolean(status === "running" && detail));
  const clickable = Boolean(detail);

  const body = (
    <>
      <span {...stylex.props(styles.icon)}>
        {status === "running" ? <Spinner size="small" /> : <Icon name={icon} size={14} />}
      </span>
      <span
        {...stylex.props(
          styles.title,
          status === "running" && styles.running,
          status === "error" && styles.error,
          status === "pending" && styles.pending,
        )}
      >
        {title}
      </span>
      {description ? <span {...stylex.props(styles.description)}>{description}</span> : null}
      {detail ? (
        <span {...stylex.props(styles.chevron, open && styles.open)}>
          <Icon name="chevronRight" size={14} />
        </span>
      ) : null}
    </>
  );

  return (
    <div>
      {clickable ? (
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          {...stylex.props(styles.line, styles.clickable)}
        >
          {body}
        </button>
      ) : (
        <div {...stylex.props(styles.line)}>{body}</div>
      )}
      {open && detail ? <pre {...stylex.props(styles.detail)}>{detail}</pre> : null}
    </div>
  );
}
