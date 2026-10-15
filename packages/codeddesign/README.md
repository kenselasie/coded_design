# CodedDesign

Cartoon React design system. Buttons, forms, navigation, and patterns with StyleX tokens, Fredoka + Nunito, and light/dark palettes.

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

## Source

[github.com/kenselasie/coded_design](https://github.com/kenselasie/coded_design)
