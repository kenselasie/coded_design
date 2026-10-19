/**
 * Product-shell system design for CodedDesign.
 * Generic surfaces for any product type: social, dashboards, settings,
 * onboarding, and app shells. Customize with props and composition —
 * not by forking component source.
 */

export type SystemLayer = {
  id: string;
  title: string;
  use: string;
};

export type SystemSurface = {
  id: string;
  title: string;
  use: string;
  compose: string[];
  customize: string[];
  recipe?: string;
};

export type SystemRule = string;

export const systemLayers: SystemLayer[] = [
  {
    id: "tokens",
    title: "Tokens",
    use: "Color, type, space, radii, shadows. Remap with worlds and palettes from @kenselasie/codeddesign/theme.",
  },
  {
    id: "atoms",
    title: "Atoms",
    use: "Single-purpose controls: Button, TextField, Icon, Tag, Avatar, Checkbox, Toggle, Link.",
  },
  {
    id: "molecules",
    title: "Molecules",
    use: "Small compositions: Card + CardHeader, Item + ItemGroup, SearchInput, ToggleButton, Step, InputGroup.",
  },
  {
    id: "recipes",
    title: "Recipes",
    use: "Copy-paste screens from @kenselasie/codeddesign/agent recipes. Prefer a recipe before inventing a layout.",
  },
  {
    id: "shells",
    title: "Product shells",
    use: "Full surfaces below. Pass data and callbacks as props. Swap tone with a world/palette, not CSS rewrites.",
  },
];

export const systemSurfaces: SystemSurface[] = [
  {
    id: "split-hero",
    title: "Split hero",
    use: "Split layout: configure on one side, live preview on the other. Mode chips drive fields and CTA copy.",
    compose: [
      "Heading + Body",
      "ToggleButton or Button selected for mode chips",
      "TextField (and DatePicker when needed)",
      "Button variant=\"primary\" for the dynamic CTA",
      "Link for secondary action",
      "Card (or AspectRatio frame) for the preview pane",
      "Sticker or Tag for a URL or status chip",
    ],
    customize: [
      "modes: { label, value }[] for chips",
      "fields: change with selected mode",
      "ctaLabel: string built from inputs",
      "preview: ReactNode — canvas, poster, or empty state",
      "world/palette on the shell for global look",
    ],
    recipe: "split-hero",
  },
  {
    id: "process-steps",
    title: "Process steps",
    use: "Numbered process row of cards with title, description, and footer label.",
    compose: [
      "Heading + Body for the section intro",
      "Grid of Card with CardTitle + CardContent",
      "Step for linear progress elsewhere; here prefer Card + large Title for the step number",
    ],
    customize: [
      "steps: { number, title, description, footerLabel }[]",
      "columns via Grid",
    ],
    recipe: "process-steps",
  },
  {
    id: "activity-dashboard",
    title: "Activity dashboard",
    use: "Feature or stat cards plus a recent-activity list with avatars and status tags.",
    compose: [
      "Heading + Body + feature Grid of Card",
      "Button primary for CTA",
      "Card with stats (Heading + Body — do not nest Card)",
      "ItemGroup + Item for activity rows",
      "Avatar + Tag for status",
    ],
    customize: [
      "stats: { label, value, delta }[]",
      "items: { name, meta, status, initials }[]",
      "status → Tag status or Status component",
    ],
    recipe: "activity-dashboard",
  },
  {
    id: "feature-grid",
    title: "Feature grid",
    use: "Section of value cards with icon, title, and short body.",
    compose: [
      "Heading + Body",
      "Grid of Card: Icon + CardTitle + CardContent",
    ],
    customize: [
      "items: { title, description, icon }[]",
      "2–3 columns on desktop via Grid",
    ],
    recipe: "feature-grid",
  },
  {
    id: "signup",
    title: "Create account",
    use: "Centered auth form with account-type toggle, optional SSO, email fields, and primary submit.",
    compose: [
      "Heading + Body with Link",
      "ToggleButton for Personal / Team",
      "Button default fullWidth for a generic SSO action",
      "TextField stack + Checkbox",
      "Button variant=\"primary\" fullWidth",
    ],
    customize: [
      "accountTypes via ToggleButton options",
      "showSso: boolean",
      "fields and validation stay on TextField",
    ],
    recipe: "signup",
  },
  {
    id: "detail-cards",
    title: "Detail cards",
    use: "Two-column detail cards: about, key-value basics, checklist, media slot.",
    compose: [
      "Heading",
      "Grid of Card",
      "About: CardTitle + Body",
      "Basics: stacked Inline or Item rows for key/value",
      "Checklist: Icon checkCircle / empty + Status",
      "Media: CardTitle + AspectRatio frame for image or map slot",
    ],
    customize: [
      "about: string",
      "basics: { label, value }[]",
      "checks: { label, detail?, done: boolean }[]",
      "media: ReactNode slot",
    ],
    recipe: "detail-cards",
  },
  {
    id: "app-shell",
    title: "App shell",
    use: "Sidebar rail + top search + main page with tabs and empty state.",
    compose: [
      "AppSidebar with brand, nav groups, create action, and sign out",
      "SearchInput hideLabel shape=\"pill\" in the header",
      "Heading + Tabs",
      "EmptyState when a tab has nothing",
    ],
    customize: [
      "nav: AppSidebar items",
      "tabs: value/label pairs",
      "empty: title + description per tab",
    ],
    recipe: "app-shell",
  },
];

export const systemCustomizeRules: SystemRule[] = [
  "Customize with props and children first. Do not copy component source into the app.",
  "Change look globally with a world + palette from @kenselasie/codeddesign/theme, not one-off hex in screens.",
  "Pick one world: codedcartoony, codedmarker, or codededwadzi. Do not mix.",
  "Prefer an existing atom or molecule over custom HTML for buttons, fields, chips, tags, tables, and empty states.",
  "ToggleButton is the segmented control (Personal / Team, modes as a compact group). For pill chips that look like tags, use Button selected or Tag.",
  "SearchInput is fluid. In a header or rail: hideLabel and shape=\"pill\".",
  "Card has CardHeader, CardTitle, CardContent, CardActions — compose, do not nest Card inside Card.",
  "Do not nest Form or MessageScroller inside Card.",
  "Do not invent props. Read flattenReference() or package types.",
  "Pass ReactNode slots (preview, media) instead of baking third-party widgets into the design system.",
];

export const systemDesign = {
  name: "CodedDesign product shells",
  version: "1",
  summary:
    "Compose product UIs — social, dashboards, settings, onboarding — from tokens, atoms, molecules, and recipes. Surfaces below are the customization contract for humans and agents.",
  layers: systemLayers,
  surfaces: systemSurfaces,
  rules: systemCustomizeRules,
} as const;

export function toSystemDesignMarkdown(
  options: { heading?: boolean } = {},
): string {
  const { heading = true } = options;
  const design = systemDesign;
  const lines: string[] = [];
  if (heading) {
    lines.push(`# ${design.name}`, "", design.summary, "");
  } else {
    lines.push(design.summary, "");
  }
  lines.push("## Layers", "");
  for (const layer of design.layers) {
    lines.push(`### ${layer.title}`, "", layer.use, "");
  }
  lines.push("## Surfaces", "");
  for (const surface of design.surfaces) {
    lines.push(`### ${surface.title}`, "", surface.use, "", "Compose:", "");
    for (const item of surface.compose) {
      lines.push(`- ${item}`);
    }
    lines.push("", "Customize:", "");
    for (const item of surface.customize) {
      lines.push(`- ${item}`);
    }
    if (surface.recipe) {
      lines.push("", `Recipe id: \`${surface.recipe}\``, "");
    } else {
      lines.push("");
    }
  }
  lines.push("## Rules", "");
  for (const rule of design.rules) {
    lines.push(`- ${rule}`);
  }
  return lines.join("\n");
}
