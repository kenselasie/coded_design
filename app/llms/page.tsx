import type { Metadata } from "next";
import * as stylex from "@stylexjs/stylex";
import { Body, Code, CodeBlock, Heading, Stack } from "codeddesign";
import { toLlmsTxt } from "codeddesign/agent";
import { BackButton } from "./back";

export const metadata: Metadata = {
  title: "llms.txt · CodedDesign",
  description:
    "Agent dump of @kenselasie/codeddesign. Fetch the same text at /llms.txt.",
};

const styles = stylex.create({
  page: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    maxWidth: "72ch",
  },
});

export default function LlmsPage() {
  return (
    <section aria-label="llms.txt" {...stylex.props(styles.page)}>
      <Stack gap="s">
        <BackButton />
        <Heading size="xl" withoutMargins>
          llms.txt
        </Heading>
        <Body>
          Agent dump of every export. Fetch the same plain text at{" "}
          <Code>/llms.txt</Code>, or import <Code>toLlmsTxt()</Code> from{" "}
          <Code>@kenselasie/codeddesign/agent</Code>.
        </Body>
      </Stack>
      <CodeBlock code={toLlmsTxt()} language="text" />
    </section>
  );
}
