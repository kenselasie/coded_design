import * as stylex from "@stylexjs/stylex";
import {
  Body,
  Button,
  Description,
  Heading,
  Inline,
  SpeechBubble,
  Stack,
  Sticker,
  Tag,
} from "codeddesign";
import { radii } from "codeddesign/tokens/space.stylex";
import { colors } from "codeddesign/tokens/colors.stylex";
import { font } from "codeddesign/tokens/typography.stylex";

const styles = stylex.create({
  lead: {
    maxWidth: "640px",
  },
  panel: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    padding: "20px",
    borderRadius: radii.l,
    backgroundColor: colors.whaleDark,
  },
  note: {
    color: colors.steel,
    fontFamily: font.family,
    fontSize: font.s,
  },
});

export default function HomePage() {
  return (
    <Stack gap="l">
      <Stack gap="s">
        <Heading size="xxl" withoutMargins>
          CodedDesign
        </Heading>
        <div {...stylex.props(styles.lead)}>
          <Body>
            A React design system for product UI. Tokens, components, and
            patterns are styled with StyleX and previewed in this Next.js app.
          </Body>
        </div>
        <Description>
          Node 26, React 19.3, and Next.js 16. Switch themes from the sidebar.
        </Description>
      </Stack>
      <Inline>
        <Sticker tone="pink">Round</Sticker>
        <Sticker tone="blue">Soft</Sticker>
        <Sticker tone="yellow">Squish</Sticker>
      </Inline>
      <SpeechBubble>
        Buttons lift, then squish when you press them. Stickers tilt until you hover.
      </SpeechBubble>
      <Inline>
        <Tag status="active">StyleX</Tag>
        <Tag status="success">React 19.3</Tag>
        <Tag>Next.js 16</Tag>
      </Inline>
      <Inline>
        <Button variant="primary">Primary</Button>
        <Button>Default</Button>
        <Button variant="subtle">Subtle</Button>
        <Button variant="danger">Danger</Button>
      </Inline>
      <div {...stylex.props(styles.panel)}>
        <Button variant="ghost">Ghost</Button>
        <Button variant="ghostSubtle">Ghost subtle</Button>
      </div>
      <p {...stylex.props(styles.note)}>
        Foundations hold color, type, and elevation. Components are the
        controls. Patterns and forms compose them into cards, tables, dialogs,
        and sign-in screens.
      </p>
    </Stack>
  );
}
