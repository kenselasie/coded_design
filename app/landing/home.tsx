import * as stylex from "@stylexjs/stylex";
import dynamic from "next/dynamic";
import { Body, Code, CodeBlock, Heading, Logo } from "codeddesign";
import { agentPrompt, recipeIndex } from "codeddesign/agent";
import { colors } from "codeddesign/tokens/colors.stylex";
import { font } from "codeddesign/tokens/typography.stylex";
import { CatalogLink } from "./catalog-link";
import { SeeExamples } from "./see-examples";
import { WorldExploreHeading, WorldExplorer } from "./world-explorer";

const RecipeDeck = dynamic(
  () => import("./recipes").then((mod) => ({ default: mod.RecipeDeck })),
  {
    loading: () => (
      <Body>Loading recipes…</Body>
    ),
  },
);

const UseGuide = dynamic(
  () => import("./guide").then((mod) => ({ default: mod.UseGuide })),
  {
    loading: () => null,
  },
);

const NARROW = "@media (max-width: 980px)";

const styles = stylex.create({
  page: {
    display: "flex",
    flexDirection: "column",
    gap: "48px",
  },
  bench: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
    columnGap: "clamp(16px, 2.5vw, 28px)",
    alignItems: "start",
    width: "100%",
    [NARROW]: {
      gridTemplateColumns: "1fr",
      rowGap: "28px",
    },
  },
  left: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "16px",
    minWidth: 0,
    width: "100%",
  },
  logoSlot: {
    display: "flex",
    alignItems: "center",
    minHeight: "83px",
  },
  right: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    gap: "16px",
    minWidth: 0,
    width: "100%",
  },
  lead: {
    margin: 0,
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.xxxl,
    fontWeight: font.semibold,
    letterSpacing: "-0.025em",
    lineHeight: 1.15,
    maxWidth: "18ch",
  },
  codedGuy: {
    color: colors.blue,
  },
  code: {
    width: "100%",
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
        <div {...stylex.props(styles.left)}>
          <div {...stylex.props(styles.logoSlot)}>
            <Logo wordmark size="lg" decorative />
          </div>
          <p {...stylex.props(styles.lead)}>
            Build your apps with a unique-looking design system from{" "}
            <span {...stylex.props(styles.codedGuy)}>CodedGuy</span>.
          </p>
          <SeeExamples />
          <div {...stylex.props(styles.code)}>
            <CodeBlock code={install} language="bash" />
          </div>
          <div {...stylex.props(styles.code)}>
            <CodeBlock code={usage} language="tsx" />
          </div>
        </div>

        <div {...stylex.props(styles.right)}>
          <WorldExploreHeading />
          <WorldExplorer />
        </div>
      </div>

      <RecipeDeck />
      <UseGuide />

      <section id="agents" {...stylex.props(styles.agents)}>
        <Heading size="xl" withoutMargins>
          For agents
        </Heading>
        <Body>
          Vibe-code against the package, not a screenshot. Paste this into
          Cursor, Claude, Codex, or any other agent. Or open{" "}
          <CatalogLink href="/llms">llms.txt</CatalogLink> and import{" "}
          <Code>@kenselasie/codeddesign/agent</Code>. The same{" "}
          <Code>SKILL.md</Code> works in each agent&apos;s skills folder.
        </Body>
        <div {...stylex.props(styles.code)}>
          <CodeBlock code={agentPrompt} language="text" />
        </div>
        <Body>
          {recipeIndex.length} recipes ship with the index:{" "}
          {recipeIndex.map((recipe) => recipe.title).join(", ")}.
        </Body>
      </section>
    </div>
  );
}
