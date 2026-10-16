"use client";

import * as stylex from "@stylexjs/stylex";
import { useEffect, useState, type ReactNode } from "react";
import {
  Alert,
  Body,
  Button,
  CodeBlock,
  DataTable,
  EmptyState,
  Heading,
  Message,
  Stack,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  TextField,
} from "codeddesign";
import { recipes } from "codeddesign/agent";
import { colors } from "codeddesign/tokens/colors.stylex";
import { radii } from "codeddesign/tokens/space.stylex";
import { shadows } from "codeddesign/tokens/shadows.stylex";
import { font } from "codeddesign/tokens/typography.stylex";

const NARROW = "@media (max-width: 720px)";
const MID = "@media (max-width: 1100px)";
const REDUCE = "@media (prefers-reduced-motion: reduce)";

const renderIn = stylex.keyframes({
  "0%": {
    clipPath: "inset(0 0 100% 0)",
    filter: "blur(8px)",
    opacity: 0.35,
  },
  "100%": {
    clipPath: "inset(0 0 0 0)",
    filter: "blur(0)",
    opacity: 1,
  },
});

const styles = stylex.create({
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "16px",
    [MID]: {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },
    [NARROW]: {
      gridTemplateColumns: "1fr",
    },
  },
  scene: {
    perspective: "1200px",
    minHeight: "280px",
  },
  rig: {
    position: "relative",
    minHeight: "280px",
    height: "280px",
    transformStyle: "preserve-3d",
    transitionProperty: "transform",
    transitionDuration: "640ms",
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    [REDUCE]: {
      transform: "none",
      height: "auto",
      minHeight: 0,
    },
  },
  flipped: {
    transform: "rotateY(180deg)",
    [REDUCE]: {
      transform: "none",
    },
  },
  face: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    overflow: "hidden",
    backfaceVisibility: "hidden",
    borderRadius: radii.l,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    boxShadow: shadows.s1,
    [REDUCE]: {
      position: "relative",
      inset: "auto",
      transform: "none",
      marginBottom: "12px",
    },
  },
  preview: {
    padding: "16px",
    backgroundColor: colors.snow,
  },
  codeFace: {
    transform: "rotateY(180deg)",
    padding: 0,
    borderWidth: 0,
    boxShadow: "none",
    backgroundColor: "transparent",
    [REDUCE]: {
      transform: "none",
      borderWidth: "2px",
      boxShadow: shadows.s1,
    },
  },
  drawing: {
    animationName: renderIn,
    animationDuration: "560ms",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    animationFillMode: "both",
    [REDUCE]: {
      animationName: "none",
      filter: "none",
      clipPath: "none",
      opacity: 1,
    },
  },
  fill: {
    flex: 1,
    minHeight: 0,
    overflow: "auto",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
    marginBottom: "10px",
  },
  name: {
    margin: 0,
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.l,
    fontWeight: font.semibold,
  },
});

const studios = [
  { name: "North studio", owner: "Ada" },
  { name: "Harbor", owner: "Noor" },
  { name: "Field notes", owner: "Ken" },
];

const previews: Record<string, ReactNode> = {
  "sign-in": (
    <Stack gap="m">
      <TextField label="Work email" type="email" name="email" defaultValue="ada@studio.dev" />
      <Button variant="primary">Sign in</Button>
    </Stack>
  ),
  "data-table": (
    <DataTable
      rows={studios}
      columns={[
        { key: "name", header: "Name" },
        { key: "owner", header: "Owner" },
      ]}
    />
  ),
  chat: (
    <Stack gap="s">
      <Message from="assistant" name="CodedDesign">
        How can I help you today?
      </Message>
      <Message from="user" name="Ada">
        Show me a savings dashboard.
      </Message>
    </Stack>
  ),
  empty: (
    <EmptyState
      title="Nothing matches"
      description="Try another filter."
      action={<Button variant="primary">Clear filters</Button>}
    />
  ),
  alert: (
    <Alert variant="success" title="Workspace saved">
      North studio is up to date.
    </Alert>
  ),
  tabs: (
    <Tabs defaultValue="account">
      <TabList>
        <Tab value="account">Account</Tab>
        <Tab value="billing">Billing</Tab>
      </TabList>
      <TabPanel value="account">
        <Body>Profile, password, and sessions.</Body>
      </TabPanel>
      <TabPanel value="billing">
        <Body>Invoices and payment methods.</Body>
      </TabPanel>
    </Tabs>
  ),
};

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
}

function RecipeCard({
  id,
  title,
  code,
}: {
  id: string;
  title: string;
  code: string;
}) {
  const reduced = useReducedMotion();
  const [codeUp, setCodeUp] = useState(false);
  const [drawKey, setDrawKey] = useState(0);
  const showCode = codeUp && !reduced;

  return (
    <article>
      <div {...stylex.props(styles.header)}>
        <h3 {...stylex.props(styles.name)}>{title}</h3>
        {reduced ? null : (
          <Button
            type="button"
            size="small"
            aria-pressed={showCode}
            aria-label={showCode ? "Show recipe screen" : "Turn recipe over to code"}
            onClick={() => {
              setCodeUp((current) => {
                const next = !current;
                if (!next) setDrawKey((key) => key + 1);
                return next;
              });
            }}
          >
            {showCode ? "Screen" : "Code"}
          </Button>
        )}
      </div>
      <div {...stylex.props(styles.scene)}>
        <div {...stylex.props(styles.rig, showCode && styles.flipped)}>
          <div
            {...stylex.props(styles.face, styles.preview)}
            aria-hidden={showCode || undefined}
            inert={showCode || undefined}
          >
            <div
              key={drawKey}
              {...stylex.props(styles.fill, drawKey > 0 && styles.drawing)}
            >
              {previews[id]}
            </div>
          </div>
          <div
            {...stylex.props(styles.face, styles.codeFace)}
            aria-hidden={!showCode && !reduced ? true : undefined}
            inert={!showCode && !reduced ? true : undefined}
          >
            <CodeBlock code={code} language="tsx" />
          </div>
        </div>
      </div>
    </article>
  );
}

export function RecipeDeck() {
  return (
    <div id="examples" {...stylex.props(styles.section)}>
      <Heading size="xl" withoutMargins>
        Recipes
      </Heading>
      <Body>Each card starts as a live screen. Press Code to turn it over.</Body>
      <div {...stylex.props(styles.grid)}>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            code={recipe.code}
          />
        ))}
      </div>
    </div>
  );
}
