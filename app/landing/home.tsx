import * as stylex from "@stylexjs/stylex";
import NextLink from "next/link";
import { Body, CodeBlock, Heading, Stack } from "codeddesign";
import { colors } from "codeddesign/tokens/colors.stylex";
import { radii } from "codeddesign/tokens/space.stylex";
import { shadows } from "codeddesign/tokens/shadows.stylex";
import { font } from "codeddesign/tokens/typography.stylex";
import { SeeExamples } from "./see-examples";
import { StudioBoard } from "./studio";

const NARROW = "@media (max-width: 980px)";

const styles = stylex.create({
  page: {
    display: "flex",
    flexDirection: "column",
    gap: "48px",
  },
  bench: {
    display: "grid",
    gridTemplateColumns: "minmax(280px, 0.9fr) minmax(0, 1.6fr)",
    gap: "32px",
    alignItems: "start",
    [NARROW]: {
      gridTemplateColumns: "1fr",
    },
  },
  use: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "16px",
    maxWidth: "42ch",
    [NARROW]: {
      maxWidth: "none",
    },
  },
  code: {
    width: "100%",
  },
  lead: {
    margin: 0,
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.m,
    lineHeight: 1.5,
    maxWidth: "36ch",
  },
  recipes: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "16px",
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
  courses: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "12px",
    [NARROW]: {
      gridTemplateColumns: "1fr",
    },
  },
  course: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    padding: "18px 20px",
    borderRadius: radii.l,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
    boxShadow: shadows.s1,
    color: colors.black,
    textDecoration: "none",
    ":hover": {
      backgroundColor: colors.snowDark,
    },
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blueDark,
      outlineOffset: "3px",
    },
  },
  courseName: {
    margin: 0,
    fontFamily: font.display,
    fontSize: font.xl,
    fontWeight: font.bold,
    letterSpacing: "-0.03em",
  },
  courseHint: {
    margin: 0,
    color: colors.steel,
    fontFamily: font.family,
    fontSize: font.s,
    lineHeight: 1.45,
  },
});

const install = `npm install @kenselasie/codeddesign`;

const usage = `import "@kenselasie/codeddesign/styles.css";
import { Button } from "@kenselasie/codeddesign";`;

const signIn = `import { Form, TextField, Button } from "@kenselasie/codeddesign";

<Form onSubmit={signIn}>
  <TextField label="Work email" type="email" />
  <Button variant="primary">Sign in</Button>
</Form>`;

const table = `import { DataTable } from "@kenselasie/codeddesign";

<DataTable
  rows={studios}
  columns={[
    { key: "name", header: "Name" },
    { key: "owner", header: "Owner" },
  ]}
/>`;

export function HomeLanding() {
  return (
    <div {...stylex.props(styles.page)}>
      <div {...stylex.props(styles.bench)}>
        <div {...stylex.props(styles.use)}>
          <Heading size="xxxl" withoutMargins>
            CodedDesign
          </Heading>
          <p {...stylex.props(styles.lead)}>
            A cartoon React design system you can install. See it running, then
            copy it into another app.
          </p>
          <SeeExamples />
          <div {...stylex.props(styles.code)}>
            <CodeBlock code={install} language="bash" />
          </div>
          <div {...stylex.props(styles.code)}>
            <CodeBlock code={usage} language="tsx" />
          </div>
        </div>
        <StudioBoard />
      </div>

      <Stack gap="s">
        <Heading size="xl" withoutMargins>
          Recipes
        </Heading>
        <Body>Copy a screen, then open the full examples.</Body>
        <div {...stylex.props(styles.recipes)}>
          <article {...stylex.props(styles.recipe)}>
            <h2 {...stylex.props(styles.recipeTitle)}>Sign-in</h2>
            <CodeBlock code={signIn} language="tsx" />
          </article>
          <article {...stylex.props(styles.recipe)}>
            <h2 {...stylex.props(styles.recipeTitle)}>Data table</h2>
            <CodeBlock code={table} language="tsx" />
          </article>
        </div>
      </Stack>

      <nav aria-label="Next courses">
        <div {...stylex.props(styles.courses)}>
          <NextLink href="/use" {...stylex.props(styles.course)}>
            <p {...stylex.props(styles.courseName)}>Use</p>
            <p {...stylex.props(styles.courseHint)}>Install, import CSS, and render a button.</p>
          </NextLink>
          <NextLink href="/components" {...stylex.props(styles.course)}>
            <p {...stylex.props(styles.courseName)}>Components</p>
            <p {...stylex.props(styles.courseHint)}>Every control, live in the catalog.</p>
          </NextLink>
          <NextLink href="/docs" {...stylex.props(styles.course)}>
            <p {...stylex.props(styles.courseName)}>Docs</p>
            <p {...stylex.props(styles.courseHint)}>Theming, tokens, and the rest of the kit.</p>
          </NextLink>
        </div>
      </nav>
    </div>
  );
}
