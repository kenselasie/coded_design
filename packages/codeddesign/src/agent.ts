import {
  flattenReference,
  foundations,
  reference,
} from "./reference";
import {
  systemDesign,
  toSystemDesignMarkdown,
} from "./systemDesign";

export {
  flattenReference,
  foundations,
  reference,
  type GroupDoc,
  type ItemDoc,
  type PropDoc,
} from "./reference";

export {
  systemDesign,
  systemLayers,
  systemSurfaces,
  systemCustomizeRules,
  toSystemDesignMarkdown,
  type SystemLayer,
  type SystemSurface,
  type SystemRule,
} from "./systemDesign";

export const agentGuide = {
  package: "@kenselasie/codeddesign",
  version: "0.1.5",
  install: "npm install @kenselasie/codeddesign",
  peers: ["react@^19", "react-dom@^19", "@stylexjs/stylex@0.19.1"],
  css: "@kenselasie/codeddesign/styles.css",
  theme: "@kenselasie/codeddesign/theme",
  llms: "/llms.txt",
  catalog: "/components/{id}",
  skill: "SKILL.md",
  skillFolders: [
    ".agents/skills/codeddesign/",
    ".cursor/skills/codeddesign/",
    ".claude/skills/codeddesign/",
    ".codex/skills/codeddesign/",
  ],
  rules: [
    "Import styles.css once at the app root so Fredoka, Nunito, Archivo, Fraunces, Inter, JetBrains Mono, and tokens land.",
    "Import components from @kenselasie/codeddesign. Do not copy source files into the app.",
    "Pick one world. codedcartoony: Fredoka, Nunito, plush shadows. codedmarker: Archivo, hard ink shadows, neon blocks. codededwadzi: Fraunces, Inter, JetBrains Mono, soft teal/coral paper. Do not mix them or restyle toward shadcn/ui or Ant Design.",
    "The consuming app does not need the StyleX compiler to render components.",
    "Theme with stylex.props from @kenselasie/codeddesign/theme. codedcartoony palettes: paper, nord, solarized, catppuccin. codedmarker: highlighter, magenta, cyan, amber (+ markerType/radii/stroke/shadows). codededwadzi: coastal, coral, forest, sand (+ edwaType/radii/stroke/shadows). Worlds remap tokens only — do not hardcode one world’s chrome into shared components.",
    "Prefer an existing component over custom HTML for buttons, fields, dialogs, tables, and chat.",
    "Do not nest interactive controls inside links.",
    "Do not nest Card, Form, or MessageScroller inside another card.",
    "SearchInput is fluid. In a sidebar or toolbar use hideLabel and shape=\"pill\".",
    "Each export has a catalog page at /components/{id} with live display, recipe, and props. Compose from the package, not from scraping that page.",
    "Do not invent APIs. If a prop is unknown, omit it or read flattenReference() / package types.",
    "For product layouts, follow systemDesign surfaces (split hero, process steps, activity dashboard, feature grid, signup, detail cards, app shell). Customize with props and slots.",
  ],
} as const;

export const recipes = [
  {
    id: "sign-in",
    title: "Sign-in",
    use: "Email sign-in with a primary submit.",
    code: `import { Form, TextField, Button, FormActions } from "@kenselasie/codeddesign";

<Form title="Sign in" description="Use the workspace email you were invited with.">
  <TextField label="Work email" type="email" name="email" />
  <FormActions>
    <Button variant="primary">Sign in</Button>
  </FormActions>
</Form>`,
  },
  {
    id: "data-table",
    title: "Data table",
    use: "Sortable rows of string records.",
    code: `import { DataTable } from "@kenselasie/codeddesign";

<DataTable
  rows={studios}
  columns={[
    { key: "name", header: "Name" },
    { key: "owner", header: "Owner" },
  ]}
/>`,
  },
  {
    id: "chat",
    title: "Chat",
    use: "Assistant and user messages in a scroller.",
    code: `import { Message, MessageScroller } from "@kenselasie/codeddesign";

<MessageScroller>
  <Message from="assistant" name="CodedDesign">
    How can I help you today?
  </Message>
  <Message from="user" name="Ada">
    Show me a savings dashboard.
  </Message>
</MessageScroller>`,
  },
  {
    id: "empty",
    title: "Empty",
    use: "A screen with nothing to show yet.",
    code: `import { EmptyState, Button } from "@kenselasie/codeddesign";

<EmptyState
  title="Nothing matches"
  description="Try another filter."
  action={<Button variant="primary">Clear filters</Button>}
/>`,
  },
  {
    id: "alert",
    title: "Saved",
    use: "Inline success or warning after an action.",
    code: `import { Alert } from "@kenselasie/codeddesign";

<Alert variant="success" title="Workspace saved">
  North studio is up to date.
</Alert>`,
  },
  {
    id: "tabs",
    title: "Settings tabs",
    use: "Switch panels in a settings or account screen.",
    code: `import { Tabs, TabList, Tab, TabPanel, Body } from "@kenselasie/codeddesign";

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
</Tabs>`,
  },
  {
    id: "split-hero",
    title: "Split hero",
    use: "Configure on one side, live preview on the other. Mode chips, fields, and a primary CTA.",
    code: `import {
  Body,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Heading,
  Link,
  Stack,
  Sticker,
  TextField,
  ToggleButton,
} from "@kenselasie/codeddesign";

const [mode, setMode] = useState("project");

<Stack gap="xl">
  <Heading withoutMargins>Start something new.</Heading>
  <Body>Name it, pick a mode, and see a live preview as you type.</Body>
  <ToggleButton
    value={mode}
    onChange={setMode}
    options={[
      { label: "Project", value: "project" },
      { label: "Team", value: "team" },
      { label: "Space", value: "space" },
    ]}
  />
  <TextField label="Name" name="name" defaultValue="North studio" />
  <Button variant="primary">Create workspace</Button>
  <Link href="/browse">Browse templates</Link>
</Stack>

<Card>
  <CardHeader>
    <Sticker tone="blue">preview.app</Sticker>
  </CardHeader>
  <CardTitle>North studio</CardTitle>
  <CardContent>Live preview slot — pass your canvas as children.</CardContent>
</Card>`,
  },
  {
    id: "process-steps",
    title: "Process steps",
    use: "Numbered process cards with title, description, and a short footer label.",
    code: `import { Body, Card, CardContent, CardTitle, Grid, Heading, Stack, Title } from "@kenselasie/codeddesign";

const steps = [
  { number: "01", title: "Capture", description: "Collect the inputs you need.", footer: "INPUT" },
  { number: "02", title: "Review", description: "Check, edit, and approve.", footer: "CHECK" },
  { number: "03", title: "Share", description: "Invite the people who matter.", footer: "TEAM" },
  { number: "04", title: "Ship", description: "Publish or hand off the result.", footer: "DONE" },
];

<Stack gap="l">
  <Heading withoutMargins>From first draft to done.</Heading>
  <Grid columns={4} gap="m">
    {steps.map((step) => (
      <Card key={step.number}>
        <Title size="l">{step.number}</Title>
        <CardTitle>{step.title}</CardTitle>
        <CardContent>{step.description}</CardContent>
        <Body size="s">{step.footer}</Body>
      </Card>
    ))}
  </Grid>
</Stack>`,
  },
  {
    id: "activity-dashboard",
    title: "Activity dashboard",
    use: "Stat cards plus a recent-activity list with avatars and status tags.",
    code: `import {
  Avatar,
  Body,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Grid,
  Heading,
  Item,
  ItemGroup,
  Stack,
  Tag,
} from "@kenselasie/codeddesign";

<Stack gap="l">
  <Heading withoutMargins>This week at a glance.</Heading>
  <Grid columns={2} gap="m">
    <Card>
      <CardTitle>Active users</CardTitle>
      <CardContent>People who opened the app in the last 7 days.</CardContent>
    </Card>
    <Card>
      <CardTitle>Open tasks</CardTitle>
      <CardContent>Work still waiting on a decision.</CardContent>
    </Card>
  </Grid>
  <Button variant="primary">View reports</Button>
  <Card>
    <CardHeader>
      <CardTitle>Recent activity</CardTitle>
    </CardHeader>
    <Stack gap="s">
      <Heading size="xl" withoutMargins>128 sessions</Heading>
      <Body>↑ 12% vs last week</Body>
      <Heading size="xl" withoutMargins>36 tasks done</Heading>
      <Body>↑ 8%</Body>
    </Stack>
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
</Stack>`,
  },
  {
    id: "feature-grid",
    title: "Feature grid",
    use: "Value cards with icon, title, and short description.",
    code: `import { Card, CardContent, CardTitle, Grid, Heading, Icon, Stack } from "@kenselasie/codeddesign";

const features = [
  { title: "Fast to ship", icon: "spark" as const, body: "Compose screens from recipes, not blank canvases." },
  { title: "Clear by default", icon: "checkCircle" as const, body: "Readable type, honest empty states, obvious CTAs." },
  { title: "One system", icon: "grip" as const, body: "Same controls for social, dashboards, and settings." },
];

<Stack gap="l">
  <Heading withoutMargins>Why teams reach for it</Heading>
  <Grid columns={3} gap="m">
    {features.map((item) => (
      <Card key={item.title}>
        <Icon name={item.icon} />
        <CardTitle>{item.title}</CardTitle>
        <CardContent>{item.body}</CardContent>
      </Card>
    ))}
  </Grid>
</Stack>`,
  },
  {
    id: "signup",
    title: "Create account",
    use: "Account-type toggle, optional SSO, email fields, primary submit.",
    code: `import {
  Body,
  Button,
  Checkbox,
  Heading,
  Link,
  Stack,
  TextField,
  ToggleButton,
} from "@kenselasie/codeddesign";

const [accountType, setAccountType] = useState("personal");

<Stack gap="m">
  <Heading withoutMargins>Create your account</Heading>
  <Body>
    Already have one? <Link href="/signin">Sign in</Link>
  </Body>
  <ToggleButton
    value={accountType}
    onChange={setAccountType}
    options={[
      { label: "Personal", value: "personal" },
      { label: "Team", value: "team" },
    ]}
  />
  <Button fullWidth>Continue with Google</Button>
  <TextField label="Email" type="email" name="email" />
  <TextField label="Password" type="password" name="password" />
  <Checkbox>Email me product updates</Checkbox>
  <Button variant="primary" fullWidth>
    Create account
  </Button>
</Stack>`,
  },
  {
    id: "detail-cards",
    title: "Detail cards",
    use: "About, key-value basics, checklist status, and a media or map slot.",
    code: `import {
  Body,
  Card,
  CardContent,
  CardTitle,
  Grid,
  Heading,
  Icon,
  Inline,
  Stack,
  Status,
} from "@kenselasie/codeddesign";

<Stack gap="l">
  <Heading withoutMargins>Details</Heading>
  <Grid columns={2} gap="m">
    <Card>
      <CardTitle>About</CardTitle>
      <CardContent>Product design for teams that ship weekly.</CardContent>
    </Card>
    <Card>
      <CardTitle>Checklist</CardTitle>
      <Stack gap="s">
        <Inline>
          <Icon name="checkCircle" />
          <Body>Email verified</Body>
          <Status status="success">Done</Status>
        </Inline>
        <Inline>
          <Icon name="xCircle" />
          <Body>Two-factor auth</Body>
          <Status status="neutral">Not yet</Status>
        </Inline>
      </Stack>
    </Card>
    <Card>
      <CardTitle>The basics</CardTitle>
      <Inline>
        <Body>Timezone</Body>
        <Body>UTC</Body>
      </Inline>
    </Card>
    <Card>
      <CardTitle>Media</CardTitle>
      <CardContent>Slot — pass an image, map, or embed as children.</CardContent>
    </Card>
  </Grid>
</Stack>`,
  },
  {
    id: "app-shell",
    title: "App shell",
    use: "Grouped sidebar, primary create action, footer utilities, and a content pane.",
    code: `import { AppSidebar } from "@kenselasie/codeddesign";

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
      ],
    },
    {
      label: "Work",
      items: [
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
  onSignOut={() => {}}
/>`,
  },
  {
    id: "forms",
    title: "Forms",
    use: "Sign-in, profile, and invite forms composed from Form, fields, and actions.",
    code: `import {
  Form,
  FormActions,
  FormRow,
  TextField,
  TextArea,
  Select,
  Switch,
  Checkbox,
  Button,
} from "@kenselasie/codeddesign";

<Form title="Your profile" description="What teammates see on comments.">
  <FormRow>
    <TextField label="First name" name="first" />
    <TextField label="Last name" name="last" />
  </FormRow>
  <TextField label="Display name" name="display" />
  <Select
    label="Role"
    name="role"
    options={[
      { label: "Designer", value: "designer" },
      { label: "Engineer", value: "engineer" },
    ]}
  />
  <TextArea label="Bio" name="bio" />
  <Switch>Show my profile in the directory</Switch>
  <FormActions>
    <Button variant="subtle">Reset</Button>
    <Button type="submit" variant="primary">Save profile</Button>
  </FormActions>
</Form>`,
  },
] as const;

/** Lightweight index for catalogs that should not pull every recipe code string. */
export const recipeIndex = recipes.map(({ id, title, use }) => ({ id, title, use }));

export const components = flattenReference().map((item) => ({
  name: item.name,
  import: item.import,
  use: item.use,
  href: item.href,
  props: item.props,
  example: item.example,
  aliases: item.aliases ?? [],
}));

function formatProp(prop: { name: string; type: string; default?: string; required?: boolean; note?: string }) {
  const bits = [
    `- \`${prop.name}\`: ${prop.type}`,
    prop.required ? "required" : "",
    prop.default ? `default ${prop.default}` : "",
    prop.note ?? "",
  ].filter(Boolean);
  return bits.join(" · ");
}

export function toLlmsTxt() {
  const lines = [
    "# CodedDesign for agents",
    "",
    `Cartoon React design system. Package: ${agentGuide.package} ${agentGuide.version}`,
    "Catalog: this repo. Public npm. Do not use GitHub Packages.",
    "",
    "## Install",
    "",
    agentGuide.install,
    "",
    `Peers: ${agentGuide.peers.join(", ")}`,
    "",
    "## Skill",
    "",
    "Same SKILL.md for every coding agent (Cursor, Claude, Codex, and others). Copy it into codeddesign/SKILL.md under the agent's skills folder:",
    "",
    ...agentGuide.skillFolders.map((folder) => `- ${folder}`),
    "",
    "## First render",
    "",
    "```tsx",
    `import "${agentGuide.css}";`,
    'import { Button } from "@kenselasie/codeddesign";',
    "```",
    "",
    "The consuming app does not need the StyleX compiler to render components.",
    "",
    "## Theme",
    "",
    "```tsx",
    'import * as stylex from "@stylexjs/stylex";',
    `import { darkTheme, palettes } from "${agentGuide.theme}";`,
    "",
    "<div {...stylex.props(darkTheme)}>",
    "  {children}",
    "</div>",
    "",
    "<div {...stylex.props(palettes.nord.light)}>",
    "  {children}",
    "</div>",
    "",
    "import { markerPalettes, markerType, markerRadii, markerStroke, markerShadows } from \"@kenselasie/codeddesign/theme\";",
    "",
    "<div {...stylex.props(markerPalettes.highlighter.light, markerType, markerRadii, markerStroke, markerShadows)}>",
    "  {children}",
    "</div>",
    "",
    "import { edwaPalettes, edwaType, edwaRadii, edwaStroke, edwaShadows } from \"@kenselasie/codeddesign/theme\";",
    "",
    "<div {...stylex.props(edwaPalettes.coastal.light, edwaType, edwaRadii, edwaStroke, edwaShadows)}>",
    "  {children}",
    "</div>",
    "```",
    "",
    `Worlds: ${foundations.worlds.join(", ")}.`,
    `CodedCartoony palettes: ${foundations.palettes.join(", ")}.`,
    `CodedMarker palettes: ${foundations.markerPalettes.join(", ")}.`,
    `CodedEdwadzi palettes: ${foundations.edwaPalettes.join(", ")}. Each palette has light and dark.`,
    `Fonts: ${foundations.fonts.display}; ${foundations.fonts.body}.`,
    `Ink ${foundations.ink} on paper ${foundations.paper}. Radii: ${foundations.radii.join(", ")}.`,
    `Space: ${foundations.space.join(", ")}. Shadows: ${foundations.shadows}.`,
    `Color roles: ${foundations.colorRoles.join(", ")}.`,
    `Icon names: ${foundations.iconNames.join(", ")}.`,
    "",
    "## System design",
    "",
    toSystemDesignMarkdown({ heading: false }),
    "",
    "## Rules",
    "",
    ...agentGuide.rules.map((rule) => `- ${rule}`),
    "",
    "## Machine index",
    "",
    "```ts",
    "import {",
    "  agentGuide,",
    "  recipes,",
    "  components,",
    "  reference,",
    "  flattenReference,",
    "  systemDesign,",
    "  toSystemDesignMarkdown,",
    "  toLlmsTxt,",
    "  agentPrompt,",
    '} from "@kenselasie/codeddesign/agent";',
    "```",
    "",
    "## Recipes (copy these)",
    "",
  ];

  for (const recipe of recipes) {
    lines.push(`### ${recipe.title}`, "", recipe.use, "", "```tsx", recipe.code.trim(), "```", "");
  }

  lines.push("## Components", "");

  for (const group of reference) {
    lines.push(`### ${group.title}`, "");
    for (const item of group.items) {
      lines.push(`#### ${item.name}`);
      if (item.aliases?.length) lines.push(`Aliases: ${item.aliases.join(", ")}`);
      lines.push(`Import: \`${item.import}\``);
      lines.push(`Use: ${item.use}`);
      lines.push(`Live: ${item.href}`);
      if (item.props.length) {
        lines.push("Props:");
        for (const prop of item.props) lines.push(formatProp(prop));
      }
      lines.push("Example:", "```tsx", item.example.trim(), "```", "");
    }
  }

  lines.push(
    "## Do not",
    "",
    "- Gradient text, emoji-as-icons, zero-blur hard offset shadows unless already in a component.",
    "- Restyle tokens to a generic SaaS look.",
    "- Add @stylexjs/babel-plugin to the consuming app just to use a Button.",
    "- Nest Card, Form, or MessageScroller inside another card surface.",
    "",
  );

  return lines.join("\n");
}

export const agentPrompt = `You are building UI with @kenselasie/codeddesign.

Install: npm install @kenselasie/codeddesign
Peers: react 19, react-dom 19, @stylexjs/stylex 0.19.1

Always:
- import "@kenselasie/codeddesign/styles.css" once at the app root
- import components from "@kenselasie/codeddesign"
- pick one world (codedcartoony, codedmarker, or codededwadzi) and keep its borders, type, and shadows
- do not restyle toward shadcn/ui or Ant Design
- do not copy component source into the app
- do not add a StyleX compiler unless you are applying darkTheme or palettes with stylex.props
- do not invent props. Read flattenReference() or package types
- SearchInput fills its parent; use hideLabel and shape="pill" in rails
- do not nest Card, Form, or MessageScroller inside another card
- for product layouts, follow systemDesign surfaces and customize with props/slots

If you need the full API, recipes, system design, or this prompt, import {
  agentGuide,
  components,
  recipes,
  reference,
  flattenReference,
  systemDesign,
  toSystemDesignMarkdown,
  toLlmsTxt,
  agentPrompt,
} from "@kenselasie/codeddesign/agent"
or fetch /llms.txt from the CodedDesign catalog.

The package ships SKILL.md for any agent. Copy it to codeddesign/SKILL.md in .agents/skills/, .cursor/skills/, .claude/skills/, or .codex/skills/.`;
