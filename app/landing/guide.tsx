import * as stylex from "@stylexjs/stylex";
import { Body, Bullet, Code, CodeBlock, Heading, Stack } from "codeddesign";
import { colors } from "codeddesign/tokens/colors.stylex";
import { font } from "codeddesign/tokens/typography.stylex";

const styles = stylex.create({
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    maxWidth: "72ch",
  },
  measure: {
    margin: 0,
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.m,
    lineHeight: 1.55,
  },
});

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

export function UseGuide() {
  return (
    <section id="use" {...stylex.props(styles.section)}>
      <Stack gap="s">
        <Heading size="xl" withoutMargins>
          Use
        </Heading>
        <Body>
          Install the public package, import the CSS, then render a component.
          The other project does not need the StyleX compiler.
        </Body>
      </Stack>

      <Stack gap="s">
        <Heading size="l" withoutMargins>
          First screen
        </Heading>
        <p {...stylex.props(styles.measure)}>
          Import <Code>styles.css</Code> once at the root of the app so Fredoka,
          Nunito, and the tokens land.
        </p>
        <CodeBlock code={app} language="tsx" />
        <Bullet>
          Peer dependencies: React 19 and <Code>@stylexjs/stylex</Code> 0.19.1.
        </Bullet>
      </Stack>

      <Stack gap="s">
        <Heading size="l" withoutMargins>
          Dark theme
        </Heading>
        <p {...stylex.props(styles.measure)}>
          Wrap a subtree with <Code>darkTheme</Code> from{" "}
          <Code>@kenselasie/codeddesign/theme</Code>. Apply it with{" "}
          <Code>stylex.props</Code>.
        </p>
        <CodeBlock code={theme} language="tsx" />
      </Stack>
    </section>
  );
}
