<p align="center">
  <img src="logo.svg" width="220" alt="CodedDesign" />
</p>

# CodedDesign

Build your apps with a unique-looking design system from CodedGuy.

Cartoon React components, forms, navigation, and patterns with StyleX tokens, Fredoka + Nunito, and light/dark palettes.

## Install

```bash
npm install @kenselasie/codeddesign
```

Peer dependencies: React 19 and `@stylexjs/stylex` `0.19.1`.

## Use

```tsx
import "@kenselasie/codeddesign/styles.css";
import { Button } from "@kenselasie/codeddesign";

export function SaveBar() {
  return <Button variant="primary">Save workspace</Button>;
}
```

Import `styles.css` once at the root of the app so fonts and tokens land. The consuming project does not need the StyleX compiler.

## Theme

Pick one world, then a palette. Worlds remap tokens only — do not mix them.

```tsx
import * as stylex from "@stylexjs/stylex";
import {
  darkTheme,
  palettes,
  markerPalettes,
  markerType,
  markerRadii,
  markerStroke,
  markerShadows,
  edwaPalettes,
  edwaType,
  edwaRadii,
  edwaStroke,
  edwaShadows,
} from "@kenselasie/codeddesign/theme";

<div {...stylex.props(darkTheme)}>
  <SaveBar />
</div>

{/* codedcartoony */}
<div {...stylex.props(palettes.nord.light)}>
  <SaveBar />
</div>

{/* codedmarker */}
<div
  {...stylex.props(
    markerPalettes.highlighter.light,
    markerType,
    markerRadii,
    markerStroke,
    markerShadows,
  )}
>
  <SaveBar />
</div>

{/* codededwadzi */}
<div
  {...stylex.props(
    edwaPalettes.coastal.light,
    edwaType,
    edwaRadii,
    edwaStroke,
    edwaShadows,
  )}
>
  <SaveBar />
</div>
```

- **codedcartoony** — Paper, Nord, Solarized, Catppuccin
- **codedmarker** — Highlighter, Magenta, Cyan, Amber
- **codededwadzi** — Coastal, Coral, Forest, Sand

## System design

Product shells for any app type (split hero, process steps, activity dashboard, feature grid, signup, detail cards, app shell) live in `SYSTEM.md` and `systemDesign` from the agent entry. Customize with props and slots — do not fork component source.

```ts
import { systemDesign, recipes } from "@kenselasie/codeddesign/agent";
```

## For agents

```ts
import {
  agentPrompt,
  recipes,
  components,
  reference,
  systemDesign,
  toLlmsTxt,
} from "@kenselasie/codeddesign/agent";
```

Each export is listed with props and a copy-paste example. `SearchInput` is fluid; pass `hideLabel` and `shape="pill"` for a compact finder.

Plain-text spec: `llms.txt` in this package (also served at `/llms.txt` on the catalog).

The same `SKILL.md` works for Cursor, Claude, Codex, and other agents. Copy it to `codeddesign/SKILL.md` in the agent's skills folder:

- `.agents/skills/codeddesign/`
- `.cursor/skills/codeddesign/`
- `.claude/skills/codeddesign/`
- `.codex/skills/codeddesign/`

## Bugs

Report package or catalog bugs from the catalog at `/report`, or open a GitHub issue with the **Bug report** template:

[github.com/kenselasie/coded_design/issues](https://github.com/kenselasie/coded_design/issues)

## Source

[github.com/kenselasie/coded_design](https://github.com/kenselasie/coded_design)
