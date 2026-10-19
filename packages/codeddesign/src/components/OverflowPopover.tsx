"use client";

import * as stylex from "@stylexjs/stylex";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "./Icon";
import { dropdown } from "./dropdownStyles";

const styles = stylex.create({
  root: {
    position: "relative",
    display: "inline-flex",
  },
  panel: {
    position: "absolute",
    top: "calc(100% + 4px)",
    right: 0,
    zIndex: 5,
    minWidth: "180px",
  },
});

export function OverflowPopover({
  label = "More",
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, [open]);

  return (
    <div ref={rootRef} {...stylex.props(styles.root)}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        {...stylex.props(dropdown.trigger, dropdown.triggerInline, open && dropdown.triggerOpen)}
      >
        {label}
        <span {...stylex.props(dropdown.chevron, open && dropdown.chevronOpen)}>
          <Icon name="chevron" />
        </span>
      </button>
      {open ? (
        <div {...stylex.props(dropdown.panel, dropdown.panelPad, styles.panel)}>{children}</div>
      ) : null}
    </div>
  );
}
