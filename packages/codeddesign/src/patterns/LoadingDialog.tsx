"use client";

import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { Spinner } from "../components/Spinner";
import { Dialog } from "./Dialog";

const styles = stylex.create({
  body: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.s,
  },
});

export function LoadingDialog({
  open,
  message = "Working…",
  onClose,
}: {
  open: boolean;
  message?: string;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} title="Please wait" onClose={onClose}>
      <div {...stylex.props(styles.body)}>
        <Spinner />
        <span>{message}</span>
      </div>
    </Dialog>
  );
}
