import * as stylex from "@stylexjs/stylex";
import {
  Body,
  Bullet,
  Code,
  CodeBlock,
  Heading,
  Stack,
} from "codeddesign";
import { colors } from "codeddesign/tokens/colors.stylex";
import { font } from "codeddesign/tokens/typography.stylex";

export const metadata = {
  title: "Use · CodedDesign",
};

const styles = stylex.create({
  lead: {
    maxWidth: "62ch",
  },
  measure: {
    maxWidth: "72ch",
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.m,
    lineHeight: 1.55,
  },
});

const install = `npm install @kenselasie/codeddesign`;

const app = `import "@kenselasie/codeddesign/styles.css";
import { Button } from "@kenselasie/codeddesign";

export function SaveBar() {
  return <Button variant="primary">Save workspace</Button>;
}`;

const theme = `import * as stylex from "@stylexjs/stylex";
import { darkTheme, palettes } from "@kenselasie/codeddesign/theme";

<div {...stylex.props(darkTheme)}>
  <SaveBar />
</div>

<div {...stylex.props(palettes.nord.light)}>
  <SaveBar />
</div>`;

export default function UsePage() {
  return (
    <Stack gap="xl">
      <Stack gap="s">
        <Heading size="xxl" withoutMargins>
          Use
        </Heading>
        <div {...stylex.props(styles.lead)}>
          <Body>
            Install the public package, import the CSS, then render a component.
            The other project does not need the StyleX compiler.
          </Body>
        </div>
      </Stack>

      <Stack gap="s">
        <Heading size="xl" withoutMargins>
          Install
        </Heading>
        <p {...stylex.props(styles.measure)}>
          From npm. No GitHub token and no extra registry file.
        </p>
        <CodeBlock code={install} language="bash" />
        <Bullet>Peer dependencies: React 19 and <Code>@stylexjs/stylex</Code> 0.19.1.</Bullet>
      </Stack>

      <Stack gap="s">
        <Heading size="xl" withoutMargins>
          First screen
        </Heading>
        <p {...stylex.props(styles.measure)}>
          Import <Code>styles.css</Code> once at the root of the app so Fredoka,
          Nunito, and the tokens land.
        </p>
        <CodeBlock code={app} language="tsx" />
      </Stack>

      <Stack gap="s">
        <Heading size="xl" withoutMargins>
          Dark theme
        </Heading>
        <p {...stylex.props(styles.measure)}>
          Wrap a subtree with <Code>darkTheme</Code> from{" "}
          <Code>@kenselasie/codeddesign/theme</Code>. Apply it with{" "}
          <Code>stylex.props</Code>.
        </p>
        <CodeBlock code={theme} language="tsx" />
      </Stack>
    </Stack>
  );
}
