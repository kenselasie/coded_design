"use client";

import * as stylex from "@stylexjs/stylex";
import { useRouter } from "next/navigation";
import {
  Body,
  Button,
  CodeBlock,
  Heading,
  Message,
  MessageScroller,
  Stack,
} from "codeddesign";
import { colors } from "codeddesign/tokens/colors.stylex";
import { radii } from "codeddesign/tokens/space.stylex";
import { shadows } from "codeddesign/tokens/shadows.stylex";
import { font } from "codeddesign/tokens/typography.stylex";
import { StudioBoard } from "../landing/studio";

const NARROW = "@media (max-width: 900px)";

const styles = stylex.create({
  lead: {
    maxWidth: "62ch",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.4fr) minmax(280px, 0.8fr)",
    gap: "20px",
    alignItems: "start",
    [NARROW]: {
      gridTemplateColumns: "1fr",
    },
  },
  recipe: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    minWidth: 0,
    padding: "18px",
    borderRadius: radii.l,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
    boxShadow: shadows.s1,
  },
  recipeTitle: {
    margin: 0,
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.l,
    fontWeight: font.semibold,
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
});

const chatRecipe = `import { Message, MessageScroller } from "@kenselasie/codeddesign";

<MessageScroller>
  <Message from="assistant" name="CodedDesign">
    How can I help you today?
  </Message>
  <Message from="user" name="Ada">
    Show me a savings dashboard.
  </Message>
</MessageScroller>`;

const formRecipe = `import { Form, TextField, Button } from "@kenselasie/codeddesign";

<Form onSubmit={save}>
  <TextField label="Display name" name="name" />
  <Button variant="primary">Save profile</Button>
</Form>`;

function OpenForms() {
  const router = useRouter();
  return (
    <Button variant="primary" onClick={() => router.push("/forms")}>
      Open forms
    </Button>
  );
}

function BrowseComponents() {
  const router = useRouter();
  return <Button onClick={() => router.push("/components")}>Browse components</Button>;
}

export function ExampleGallery() {
  return (
    <Stack gap="xl">
      <Stack gap="s">
        <Heading size="xxl" withoutMargins>
          Examples
        </Heading>
        <div {...stylex.props(styles.lead)}>
          <Body>
            Product screens built with CodedDesign, plus the copy you need to
            reconstruct them. The dashboard figures are demonstration data.
          </Body>
        </div>
      </Stack>

      <Stack gap="s">
        <Heading size="xl" withoutMargins>
          North studio
        </Heading>
        <StudioBoard />
      </Stack>

      <div {...stylex.props(styles.grid)}>
        <Stack gap="s">
          <Heading size="xl" withoutMargins>
            Chat
          </Heading>
          <MessageScroller>
            <Message from="assistant" name="CodedDesign">
              How can I help you today?
            </Message>
            <Message from="user" name="Ada">
              Show me a savings dashboard.
            </Message>
            <Message from="assistant" name="CodedDesign">
              North studio is on the left. Sign-in, invite, and profile live on
              the Forms page.
            </Message>
          </MessageScroller>
        </Stack>
        <article {...stylex.props(styles.recipe)}>
          <h2 {...stylex.props(styles.recipeTitle)}>Message scroller</h2>
          <CodeBlock code={chatRecipe} language="tsx" />
        </article>
      </div>

      <article {...stylex.props(styles.recipe)}>
        <h2 {...stylex.props(styles.recipeTitle)}>Profile form</h2>
        <Body>Working sign-in, invite, and profile screens are on Forms.</Body>
        <CodeBlock code={formRecipe} language="tsx" />
        <div {...stylex.props(styles.actions)}>
          <OpenForms />
          <BrowseComponents />
        </div>
      </article>
    </Stack>
  );
}
