import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { colors } from "../tokens/colors.stylex";
import { stroke } from "../tokens/stroke.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { shadows } from "../tokens/shadows.stylex";
import { Icon } from "./Icon";
import { LinearProgress } from "./Progress";

const pulse = stylex.keyframes({
  "0%": { opacity: 1 },
  "50%": { opacity: 0.45 },
  "100%": { opacity: 1 },
});

const styles = stylex.create({
  group: {
    display: "flex",
    gap: "12px",
    overflowX: "auto",
    paddingBottom: "4px",
  },
  card: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    minWidth: "220px",
    padding: "12px",
    borderRadius: radii.control,
    borderWidth: stroke.width,
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: colors.white,
    boxShadow: shadows.s1,
  },
  error: {
    borderColor: colors.dangerDark,
  },
  media: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: radii.s,
    backgroundColor: colors.snowDark,
    color: colors.black,
    overflow: "hidden",
    flexShrink: 0,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  copy: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    minWidth: 0,
    flexGrow: 1,
  },
  title: {
    margin: 0,
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.s,
    fontWeight: font.semibold,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  loading: {
    animationName: pulse,
    animationDuration: "1.1s",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
  },
  meta: {
    margin: 0,
    color: colors.steel,
    fontFamily: font.family,
    fontSize: font.xs,
  },
  fail: {
    color: colors.dangerDark,
  },
  action: {
    display: "inline-flex",
    borderWidth: 0,
    borderRadius: radii.control,
    padding: "6px",
    backgroundColor: "transparent",
    color: colors.black,
    cursor: "pointer",
    ":hover": {
      backgroundColor: colors.snowDark,
    },
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blue,
    },
  },
  progress: {
    marginTop: "6px",
  },
});

export function AttachmentGroup({ children }: { children: ReactNode }) {
  return (
    <div role="list" {...stylex.props(styles.group)}>
      {children}
    </div>
  );
}

export function Attachment({
  name,
  meta,
  state = "done",
  progress,
  preview,
  onRemove,
}: {
  name: string;
  meta: string;
  state?: "idle" | "uploading" | "processing" | "error" | "done";
  progress?: number;
  preview?: string;
  onRemove?: () => void;
}) {
  const busy = state === "uploading" || state === "processing";
  return (
    <div
      role="listitem"
      {...stylex.props(styles.card, state === "error" && styles.error)}
    >
      <span {...stylex.props(styles.media)}>
        {preview ? (
          <img src={preview} alt="" {...stylex.props(styles.image)} />
        ) : (
          <Icon name={name.endsWith(".png") || name.endsWith(".jpg") ? "image" : "file"} />
        )}
      </span>
      <div {...stylex.props(styles.copy)}>
        <p {...stylex.props(styles.title, busy && styles.loading)}>{name}</p>
        <p {...stylex.props(styles.meta, state === "error" && styles.fail)}>{meta}</p>
        {busy && progress != null ? (
          <div {...stylex.props(styles.progress)}>
            <LinearProgress value={progress} />
          </div>
        ) : null}
      </div>
      {onRemove ? (
        <button
          type="button"
          aria-label={`Remove ${name}`}
          onClick={onRemove}
          {...stylex.props(styles.action)}
        >
          <Icon name="x" />
        </button>
      ) : null}
    </div>
  );
}
