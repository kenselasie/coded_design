<p align="center">
  <img src="logo.svg" width="88" height="88" alt="CodedDesign" />
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

```tsx
import * as stylex from "@stylexjs/stylex";
import { darkTheme, palettes } from "@kenselasie/codeddesign/theme";

<div {...stylex.props(darkTheme)}>
  <SaveBar />
</div>

<div {...stylex.props(palettes.nord.light)}>
  <SaveBar />
</div>
```

Palettes: Paper, Nord, Solarized, and Catppuccin — each with a light and dark theme.

## For agents

```ts
import {
  agentPrompt,
  recipes,
  components,
  reference,
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

## Source

[github.com/kenselasie/coded_design](https://github.com/kenselasie/coded_design)
