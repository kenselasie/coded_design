# CodedDesign

React design system. Tokens, components, and patterns are styled with [StyleX](https://stylexjs.com) and previewed in a Next.js app.

## Requirements

- Node.js 26 (`nvm use`)

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Next.js dev server |
| `npm run build` | Production build |
| `npm test` | Component tests |
| `npm run typecheck` | TypeScript |

## Layout

- `packages/codeddesign` — workspace package: components, patterns, tokens, and the dark theme
- `src/theme` — docs shell for this catalog
- `app` — pages that render the system

This catalog imports the workspace package as `codeddesign`. StyleX is compiled by the app's Babel plugin during `next dev` and `next build`. TypeScript 7 is the typechecker; `typescript-eslint` does not support it yet, so style checking is the StyleX compiler rather than an ESLint plugin.

## Use it in another project

`npm run build` inside `packages/codeddesign` writes `dist/` with the compiled components, `styles.css`, and the Nunito and Fredoka fonts. That folder publishes as `@kenselasie/codeddesign` on the public npm registry.

Anyone can install it with no token and no extra registry config:

```bash
npm install @kenselasie/codeddesign
```

```tsx
import "@kenselasie/codeddesign/styles.css";
import { Button } from "@kenselasie/codeddesign";
import { darkTheme } from "@kenselasie/codeddesign/theme";
```

To ship a new version, bump `version` in `packages/codeddesign/package.json`, then:

```bash
npm run build --workspace codeddesign
cd packages/codeddesign/dist && npm publish --access public
```

Apply `darkTheme` with `stylex.props` from `@stylexjs/stylex`. The other project does not need the StyleX compiler to use these components.
