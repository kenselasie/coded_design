import {
  flattenReference,
  foundations,
  reference,
} from "./reference";

export {
  flattenReference,
  foundations,
  reference,
  type GroupDoc,
  type ItemDoc,
  type PropDoc,
} from "./reference";

export const agentGuide = {
  package: "@kenselasie/codeddesign",
  version: "0.1.4",
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
    "Import styles.css once at the app root so Fredoka, Nunito, Archivo, and tokens land.",
    "Import components from @kenselasie/codeddesign. Do not copy source files into the app.",
    "Pick one world. codedcartoony is Fredoka, Nunito, and plush offset+blur shadows. codedmarker is Archivo, hard ink shadows, and lime, magenta, cyan, and yellow blocks. Do not mix them or restyle toward shadcn/ui or Ant Design.",
    "The consuming app does not need the StyleX compiler to render components.",
    "Theme with stylex.props from @kenselasie/codeddesign/theme. codedcartoony palettes are paper, nord, solarized, and catppuccin. codedmarker palettes are highlighter, magenta, cyan, and amber; apply one with markerType, markerRadii, and markerShadows.",
    "Prefer an existing component over custom HTML for buttons, fields, dialogs, tables, and chat.",
    "Do not nest interactive controls inside links.",
    "Do not nest Card, Form, or MessageScroller inside another card.",
    "SearchInput is fluid. In a sidebar or toolbar use hideLabel and shape=\"pill\".",
    "Each export has a catalog page at /components/{id} with live display, recipe, and props. Compose from the package, not from scraping that page.",
    "Do not invent APIs. If a prop is unknown, omit it or read flattenReference() / package types.",
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
] as const;

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
    "import { markerPalettes, markerType, markerRadii, markerShadows } from \"@kenselasie/codeddesign/theme\";",
    "",
    "<div {...stylex.props(markerPalettes.highlighter.light, markerType, markerRadii, markerShadows)}>",
    "  {children}",
    "</div>",
    "```",
    "",
    `Worlds: ${foundations.worlds.join(", ")}.`,
    `CodedCartoony palettes: ${foundations.palettes.join(", ")}.`,
    `CodedMarker palettes: ${foundations.markerPalettes.join(", ")}. Each palette has light and dark.`,
    `Fonts: ${foundations.fonts.display}; ${foundations.fonts.body}.`,
    `Ink ${foundations.ink} on paper ${foundations.paper}. Radii: ${foundations.radii.join(", ")}.`,
    `Space: ${foundations.space.join(", ")}. Shadows: ${foundations.shadows}.`,
    `Color roles: ${foundations.colorRoles.join(", ")}.`,
    `Icon names: ${foundations.iconNames.join(", ")}.`,
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
- keep 2px ink borders, Fredoka display, Nunito body, offset+blur shadows
- do not restyle toward shadcn/ui or Ant Design
- do not copy component source into the app
- do not add a StyleX compiler unless you are applying darkTheme or palettes with stylex.props
- do not invent props. Read flattenReference() or package types
- SearchInput fills its parent; use hideLabel and shape="pill" in rails
- do not nest Card, Form, or MessageScroller inside another card

If you need the full API, recipes, or this prompt, import {
  agentGuide,
  components,
  recipes,
  reference,
  flattenReference,
  toLlmsTxt,
  agentPrompt,
} from "@kenselasie/codeddesign/agent"
or fetch /llms.txt from the CodedDesign catalog.

The package ships SKILL.md for any agent. Copy it to codeddesign/SKILL.md in .agents/skills/, .cursor/skills/, .claude/skills/, or .codex/skills/.`;
