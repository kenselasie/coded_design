"use client";

import * as stylex from "@stylexjs/stylex";
import { useRef, useState, type ReactNode } from "react";
import { colors } from "../tokens/colors.stylex";
import { stroke } from "../tokens/stroke.stylex";
import { radii } from "../tokens/space.stylex";
import { Icon } from "./Icon";

const styles = stylex.create({
  root: {
    display: "flex",
    width: "100%",
    minHeight: "180px",
    overflow: "hidden",
    borderRadius: radii.l,
    borderWidth: stroke.width,
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: colors.white,
  },
  pane: {
    minWidth: "80px",
    padding: "16px",
    overflow: "auto",
  },
  handle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "16px",
    flexShrink: 0,
    borderWidth: 0,
    borderLeftWidth: stroke.width,
    borderRightWidth: stroke.width,
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: colors.snowDark,
    color: colors.black,
    cursor: "col-resize",
    padding: 0,
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blue,
      outlineOffset: "-2px",
    },
  },
});

export function Resizable({
  left,
  right,
}: {
  left: ReactNode;
  right: ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [ratio, setRatio] = useState(0.42);

  const drag = (clientX: number) => {
    const box = root.current?.getBoundingClientRect();
    if (!box) return;
    const next = (clientX - box.left) / box.width;
    setRatio(Math.min(0.75, Math.max(0.25, next)));
  };

  return (
    <div ref={root} {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.pane)} style={{ flexBasis: `${ratio * 100}%` }}>
        {left}
      </div>
      <button
        type="button"
        aria-label="Resize panels"
        onPointerDown={(event) => {
          const target = event.currentTarget;
          target.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) drag(event.clientX);
        }}
        {...stylex.props(styles.handle)}
      >
        <Icon name="grip" size={14} />
      </button>
      <div {...stylex.props(styles.pane)} style={{ flexGrow: 1 }}>
        {right}
      </div>
    </div>
  );
}
