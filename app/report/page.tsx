import type { Metadata } from "next";
import * as stylex from "@stylexjs/stylex";
import { Body, Heading, Stack } from "codeddesign";
import { ReportBugForm } from "./form";

export const metadata: Metadata = {
  title: "Report a bug · CodedDesign",
  description: "Report a bug in CodedDesign or the catalog via GitHub Issues.",
};

const styles = stylex.create({
  page: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    maxWidth: "42rem",
  },
});

export default function ReportPage() {
  return (
    <Stack gap="l">
      <div {...stylex.props(styles.page)}>
        <Heading size="xxl" withoutMargins>
          Report a bug
        </Heading>
        <Body>
          Spotted a broken control, a theme glitch, or a catalog issue? Capture
          it here. We open a structured GitHub issue so it stays tracked with
          the rest of the project.
        </Body>
      </div>
      <ReportBugForm />
    </Stack>
  );
}
