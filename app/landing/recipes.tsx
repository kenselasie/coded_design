"use client";

import * as stylex from "@stylexjs/stylex";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  Alert,
  AppSidebar,
  Avatar,
  Body,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
  CodeBlock,
  DataTable,
  EmptyState,
  Grid,
  Heading,
  Icon,
  Inline,
  Item,
  ItemGroup,
  Message,
  Stack,
  Status,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Tag,
  TextField,
  Title,
  ToggleButton,
} from "codeddesign";
import { recipes } from "codeddesign/agent";
import { colors } from "codeddesign/tokens/colors.stylex";
import { radii } from "codeddesign/tokens/space.stylex";
import { shadows } from "codeddesign/tokens/shadows.stylex";
import { stroke } from "codeddesign/tokens/stroke.stylex";
import { font } from "codeddesign/tokens/typography.stylex";
import { FormGallery } from "../forms/gallery";

const NARROW = "@media (max-width: 720px)";
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
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "20px",
    alignItems: "stretch",
    [NARROW]: {
      gridTemplateColumns: "1fr",
    },
  },
  spanFull: {
    gridColumn: "1 / -1",
  },
  spanWide: {
    gridColumn: "span 4 / span 4",
    [NARROW]: { gridColumn: "1 / -1" },
  },
  spanHalf: {
    gridColumn: "span 3 / span 3",
    [NARROW]: { gridColumn: "1 / -1" },
  },
  spanNarrow: {
    gridColumn: "span 2 / span 2",
    [NARROW]: { gridColumn: "1 / -1" },
  },
  scene: {
    perspective: "1200px",
    minHeight: 280,
  },
  sceneTall: {
    minHeight: 380,
  },
  sceneXlarge: {
    minHeight: 720,
  },
  sceneShort: {
    minHeight: 220,
  },
  rig: {
    position: "relative",
    minHeight: 280,
    height: 280,
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
  rigTall: {
    minHeight: 380,
    height: 380,
    [REDUCE]: {
      height: "auto",
      minHeight: 0,
    },
  },
  rigXlarge: {
    minHeight: 720,
    height: 720,
    [REDUCE]: {
      height: "auto",
      minHeight: 0,
    },
  },
  rigShort: {
    minHeight: 220,
    height: 220,
    [REDUCE]: {
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
    borderWidth: stroke.width,
    borderStyle: "solid",
    borderColor: colors.line,
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
      borderWidth: stroke.width,
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
    fontFamily: font.family,
    fontSize: font.l,
    fontWeight: font.semibold,
  },
  stub: {
    color: colors.steel,
    fontFamily: font.family,
    fontSize: font.s,
  },
});

const projects = [
  { name: "My project", owner: "Ada" },
  { name: "Harbor", owner: "Noor" },
  { name: "Field notes", owner: "Ken" },
];

const processSteps = [
  { number: "01", title: "Capture", description: "Collect the inputs you need.", footer: "INPUT" },
  { number: "02", title: "Review", description: "Check, edit, and approve.", footer: "CHECK" },
  { number: "03", title: "Share", description: "Invite the people who matter.", footer: "TEAM" },
  { number: "04", title: "Ship", description: "Publish or hand off the result.", footer: "DONE" },
];

const features = [
  { title: "Fast to ship", icon: "spark" as const, body: "Compose screens from recipes, not blank canvases." },
  { title: "Clear by default", icon: "checkCircle" as const, body: "Readable type, honest empty states, obvious CTAs." },
  { title: "One system", icon: "grip" as const, body: "Same controls for social, dashboards, and settings." },
];

function SplitHeroPreview() {
  const [mode, setMode] = useState("project");
  return (
    <Stack gap="s">
      <Heading size="l" withoutMargins>
        Start something new.
      </Heading>
      <ToggleButton
        value={mode}
        onChange={setMode}
        options={[
          { label: "Project", value: "project" },
          { label: "Team", value: "team" },
          { label: "Space", value: "space" },
        ]}
      />
      <TextField label="Name" name="name" defaultValue="My project" />
      <Button variant="primary" size="small">
        Create project
      </Button>
    </Stack>
  );
}

function ProcessStepsPreview() {
  return (
    <Stack gap="s">
      <Heading size="l" withoutMargins>
        From first draft to done
      </Heading>
      <Grid columns={2} gap="xs">
        {processSteps.map((step) => (
          <Stack key={step.number} gap="xxs">
            <Title size="s">{step.number}</Title>
            <Body size="s">
              <strong>{step.title}</strong>. {step.description}
            </Body>
            <Body size="s">{step.footer}</Body>
          </Stack>
        ))}
      </Grid>
    </Stack>
  );
}

function ActivityDashboardPreview() {
  return (
    <Stack gap="s">
      <Heading size="l" withoutMargins>
        This week at a glance
      </Heading>
      <Card>
        <CardHeader>
          <CardTitle>Recent activity</CardTitle>
        </CardHeader>
        <Body size="s">128 sessions · ↑ 12% vs last week</Body>
        <ItemGroup>
          <Item
            title="Ada closed Design review"
            description="2h ago · Product"
            media={<Avatar name="Ada Okonkwo" />}
            actions={<Tag status="success">Done</Tag>}
          />
          <Item
            title="Noor shared Weekly digest"
            description="Yesterday · Team"
            media={<Avatar name="Noor Ali" />}
            actions={<Tag status="active">New</Tag>}
            last
          />
        </ItemGroup>
      </Card>
    </Stack>
  );
}

function FeatureGridPreview() {
  return (
    <Stack gap="s">
      <Heading size="l" withoutMargins>
        Why teams reach for it
      </Heading>
      <Grid columns={1} gap="s">
        {features.map((item) => (
          <Card key={item.title}>
            <Inline>
              <Icon name={item.icon} />
              <CardTitle>{item.title}</CardTitle>
            </Inline>
            <CardContent>{item.body}</CardContent>
          </Card>
        ))}
      </Grid>
    </Stack>
  );
}

function SignupPreview() {
  const [accountType, setAccountType] = useState("personal");
  return (
    <Stack gap="s">
      <Heading size="l" withoutMargins>
        Create your account
      </Heading>
      <ToggleButton
        value={accountType}
        onChange={setAccountType}
        options={[
          { label: "Personal", value: "personal" },
          { label: "Team", value: "team" },
        ]}
      />
      <TextField label="Email" type="email" name="email" defaultValue="alex.com" />
      <Checkbox defaultChecked={false}>Email me product updates</Checkbox>
      <Button variant="primary" fullWidth size="small">
        Create account
      </Button>
    </Stack>
  );
}

function DetailCardsPreview() {
  return (
    <Stack gap="s">
      <Heading size="l" withoutMargins>
        Details
      </Heading>
      <Grid columns={1} gap="s">
        <Card>
          <CardTitle>About</CardTitle>
          <CardContent>Product design for teams that ship weekly.</CardContent>
        </Card>
        <Card>
          <CardTitle>Checklist</CardTitle>
          <Stack gap="xs">
            <Inline>
              <Icon name="checkCircle" />
              <Body size="s">Email verified</Body>
              <Status status="success">Done</Status>
            </Inline>
            <Inline>
              <Icon name="xCircle" />
              <Body size="s">Two-factor auth</Body>
              <Status status="neutral">Not yet</Status>
            </Inline>
          </Stack>
        </Card>
      </Grid>
    </Stack>
  );
}

function AppShellPreview() {
  return (
    <AppSidebar
      brand="Studio"
      brandHint="Workspace"
      groups={[
        { items: [{ label: "Dashboard", icon: "grid" }] },
        {
          label: "Browse",
          items: [
            { label: "Discover", icon: "compass" },
            { label: "Search", icon: "search" },
            { label: "Library", icon: "book" },
          ],
        },
        {
          label: "Work",
          items: [
            { label: "Projects", icon: "calendar" },
            { label: "Messages", icon: "message" },
            { label: "Billing", icon: "wallet" },
          ],
        },
      ]}
      action={{ label: "Create project" }}
      footer={[
        { label: "Settings", icon: "settings" },
        { label: "Help", icon: "help" },
      ]}
      onSignOut={() => undefined}
    />
  );
}

const previews: Record<string, () => ReactNode> = {
  "sign-in": () => (
    <Stack gap="m">
      <TextField label="Email" type="email" name="email" defaultValue="alex@example.com" />
      <Button variant="primary">Sign in</Button>
    </Stack>
  ),
  "data-table": () => (
    <DataTable
      rows={projects}
      columns={[
        { key: "name", header: "Name" },
        { key: "owner", header: "Owner" },
      ]}
    />
  ),
  chat: () => (
    <Stack gap="s">
      <Message from="assistant" name="Assistant">
        How can I help you today?
      </Message>
      <Message from="user" name="Alex">
        Show me the overview.
      </Message>
    </Stack>
  ),
  empty: () => (
    <EmptyState
      title="Nothing matches"
      description="Try another filter."
      action={<Button variant="primary">Clear filters</Button>}
    />
  ),
  alert: () => (
    <Alert variant="success" title="Saved">
      Your changes are up to date.
    </Alert>
  ),
  tabs: () => (
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
  "split-hero": () => <SplitHeroPreview />,
  "process-steps": () => <ProcessStepsPreview />,
  "activity-dashboard": () => <ActivityDashboardPreview />,
  "feature-grid": () => <FeatureGridPreview />,
  signup: () => <SignupPreview />,
  "detail-cards": () => <DetailCardsPreview />,
  "app-shell": () => <AppShellPreview />,
  forms: () => <FormGallery embedded />,
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

function useNearViewport(rootMargin = "200px") {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node || visible) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, visible]);
  return { ref, visible };
}

type RecipeSpan = "full" | "wide" | "half" | "narrow";

/** Mix spans so the deck reads like a real product grid, not a uniform catalog. */
const recipeLayout: Record<string, { span: RecipeSpan; height?: "xlarge" | "tall" | "short" }> = {
  "sign-in": { span: "half" },
  chat: { span: "half" },
  "data-table": { span: "full", height: "tall" },
  empty: { span: "narrow", height: "short" },
  alert: { span: "narrow", height: "short" },
  tabs: { span: "narrow", height: "short" },
  "split-hero": { span: "full", height: "tall" },
  "process-steps": { span: "full", height: "tall" },
  "activity-dashboard": { span: "wide", height: "tall" },
  "feature-grid": { span: "narrow", height: "tall" },
  signup: { span: "half" },
  "detail-cards": { span: "half" },
  "app-shell": { span: "full", height: "tall" },
  forms: { span: "full", height: "xlarge" },
};

/** Pair halves / narrows before fulls so rows fill cleanly. */
const recipeOrder = [
  "sign-in",
  "chat",
  "data-table",
  "empty",
  "alert",
  "tabs",
  "split-hero",
  "process-steps",
  "activity-dashboard",
  "feature-grid",
  "signup",
  "detail-cards",
  "app-shell",
  "forms",
] as const;

function RecipeCard({
  id,
  title,
  code,
  reduced,
}: {
  id: string;
  title: string;
  code: string;
  reduced: boolean;
}) {
  const [codeUp, setCodeUp] = useState(false);
  const [drawKey, setDrawKey] = useState(0);
  const [codeReady, setCodeReady] = useState(false);
  const { ref, visible } = useNearViewport();
  const showCode = codeUp && !reduced;
  const renderPreview = previews[id];
  const layout = recipeLayout[id] ?? { span: "half" as const };
  const xlarge = layout.height === "xlarge";
  const tall = layout.height === "tall";
  const short = layout.height === "short";
  const span = layout.span;

  return (
    <article
      ref={ref}
      {...stylex.props(
        span === "full" && styles.spanFull,
        span === "wide" && styles.spanWide,
        span === "half" && styles.spanHalf,
        span === "narrow" && styles.spanNarrow,
      )}
    >
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
                if (next) setCodeReady(true);
                else setDrawKey((key) => key + 1);
                return next;
              });
            }}
          >
            {showCode ? "Screen" : "Code"}
          </Button>
        )}
      </div>
      <div
        {...stylex.props(
          styles.scene,
          xlarge && styles.sceneXlarge,
          tall && styles.sceneTall,
          short && styles.sceneShort,
        )}
      >
        <div
          {...stylex.props(
            styles.rig,
            xlarge && styles.rigXlarge,
            tall && styles.rigTall,
            short && styles.rigShort,
            showCode && styles.flipped,
          )}
        >
          <div
            {...stylex.props(styles.face, styles.preview)}
            aria-hidden={showCode || undefined}
            inert={showCode || undefined}
          >
            <div
              key={drawKey}
              {...stylex.props(styles.fill, drawKey > 0 && styles.drawing)}
            >
              {visible && renderPreview ? (
                renderPreview()
              ) : (
                <p {...stylex.props(styles.stub)}>Loading preview…</p>
              )}
            </div>
          </div>
          <div
            {...stylex.props(styles.face, styles.codeFace)}
            aria-hidden={!showCode && !reduced ? true : undefined}
            inert={!showCode && !reduced ? true : undefined}
          >
            {(codeReady || reduced) && (
              <CodeBlock code={code} language="tsx" />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export function RecipeDeck() {
  const reduced = useReducedMotion();
  return (
    <div id="examples" {...stylex.props(styles.section)}>
      <Heading size="xl" withoutMargins>
        Recipes
      </Heading>
      <Body>
        Live screens in a mixed grid. Full shells beside compact controls. Press
        Code to turn a card over.
      </Body>
      <div {...stylex.props(styles.grid)}>
        {recipeOrder.map((id) => {
          const recipe = recipes.find((entry) => entry.id === id);
          if (!recipe) return null;
          return (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              code={recipe.code}
              reduced={reduced}
            />
          );
        })}
      </div>
    </div>
  );
}
