import * as stylex from "@stylexjs/stylex";
import { Body, Code, CodeBlock, Heading, Logo } from "codeddesign";
import { recipes as agentRecipes, agentPrompt } from "codeddesign/agent";
import { colors } from "codeddesign/tokens/colors.stylex";
import { font } from "codeddesign/tokens/typography.stylex";
import { UseGuide } from "./guide";
import { RecipeDeck } from "./recipes";
import { CatalogLink } from "./catalog-link";
import { PackageItems } from "./package-items";
import { SeeExamples } from "./see-examples";

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
  lockup: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
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
  agents: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "12px",
    maxWidth: "72ch",
  },
});

const install = `npm install @kenselasie/codeddesign`;

const usage = `import "@kenselasie/codeddesign/styles.css";
import { Button } from "@kenselasie/codeddesign";`;

export function HomeLanding() {
  return (
    <div {...stylex.props(styles.page)}>
      <div {...stylex.props(styles.bench)}>
        <div {...stylex.props(styles.use)}>
          <div {...stylex.props(styles.lockup)}>
            <Logo size="lg" decorative />
            <Heading size="xxxl" withoutMargins>
              CodedDesign
            </Heading>
          </div>
          <p {...stylex.props(styles.lead)}>
            Build your apps with a unique-looking design system from CodedGuy.
          </p>
          <SeeExamples />
          <div {...stylex.props(styles.code)}>
            <CodeBlock code={install} language="bash" />
          </div>
          <div {...stylex.props(styles.code)}>
            <CodeBlock code={usage} language="tsx" />
          </div>
        </div>
        <PackageItems />
      </div>

      <RecipeDeck />
      <UseGuide />

      <section id="agents" {...stylex.props(styles.agents)}>
        <Heading size="xl" withoutMargins>
          For agents
        </Heading>
        <Body>
          Vibe-code against the package, not a screenshot. Paste this into
          Cursor, Claude, Codex, or any other agent — or open{" "}
          <CatalogLink href="/llms">llms.txt</CatalogLink> and import{" "}
          <Code>@kenselasie/codeddesign/agent</Code>. The same{" "}
          <Code>SKILL.md</Code> works in each agent's skills folder.
        </Body>
        <div {...stylex.props(styles.code)}>
          <CodeBlock code={agentPrompt} language="text" />
        </div>
        <Body>
          {agentRecipes.length} recipes ship with the index:{" "}
          {agentRecipes.map((recipe) => recipe.title).join(", ")}.
        </Body>
      </section>
    </div>
  );
}
