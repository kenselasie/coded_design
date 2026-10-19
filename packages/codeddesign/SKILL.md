---
name: codeddesign
description: Build product UI with the CodedDesign cartoon React system (@kenselasie/codeddesign). Use when composing screens, forms, chat, tables, dialogs, or theming in an app that installs this package, or when the user mentions CodedDesign, CodedGuy, or vibe-coding a unique-looking interface with these components.
---

# CodedDesign

Install `@kenselasie/codeddesign`. Import CSS once. Import components from the package. Keep the cartoon look.

This skill is for any coding agent — Cursor, Claude, Codex, Copilot, and others. Prefer the package and `@kenselasie/codeddesign/agent` over screenshots.

## Setup

```tsx
import "@kenselasie/codeddesign/styles.css";
import { Button } from "@kenselasie/codeddesign";
```

Peers: React 19, `@stylexjs/stylex` 0.19.1. Do not add a StyleX compiler unless you apply `darkTheme` or `palettes` with `stylex.props`.

## Rules

- Pick one world. codedcartoony: Fredoka, Nunito, plush shadows, palettes paper / nord / solarized / catppuccin. codedmarker: Archivo, hard ink shadows, palettes highlighter / magenta / cyan / amber. codededwadzi: Fraunces, Inter, JetBrains Mono, soft editorial shadows, palettes coastal / coral / forest / sand.
- Do not restyle toward shadcn/ui or Ant Design.
- Do not copy component source into the app.
- Do not invent props. Use package types or `flattenReference()` from `@kenselasie/codeddesign/agent`.
- Do not nest interactive controls inside links.
- Do not nest Card, Form, or MessageScroller inside another card.
- `SearchInput` fills its parent. In a rail or toolbar: `hideLabel` and `shape="pill"`.
- Catalog pages are `/components/{id}` (live display, recipe, props). Compose from the package.

## Index

```ts
import {
  agentGuide,
  recipes,
  components,
  reference,
  flattenReference,
  systemDesign,
  toSystemDesignMarkdown,
  toLlmsTxt,
  agentPrompt,
} from "@kenselasie/codeddesign/agent";
```

`reference` is the full API: every export grouped with props, examples, and catalog hrefs. `systemDesign` is the product-shell contract. `toLlmsTxt()` dumps that catalog as markdown. Live site: [codeddesign.codedguy.com](https://codeddesign.codedguy.com/) (`llms.txt` at `/llms.txt`).

## System design

Product shells for any app type live in `systemDesign` and `SYSTEM.md`. Customize with props and slots — do not fork components.

Surfaces: split hero, process steps, activity dashboard, feature grid, signup, detail cards, app shell.

```ts
import { systemDesign, toSystemDesignMarkdown } from "@kenselasie/codeddesign/agent";
```

## Recipes

Reach for `recipes` before writing a custom layout. Shell recipes: `split-hero`, `process-steps`, `activity-dashboard`, `feature-grid`, `signup`, `detail-cards`, `app-shell`.

- Sign-in: `Form` (title required) + `TextField` + `FormActions` + `Button variant="primary"`
- Table: `DataTable` with `rows: Record<string, string>[]`
- Chat: `MessageScroller` + `Message from="assistant" | "user"`
- Empty: `EmptyState` with optional `action`
- Saved: `Alert variant="success"`
- Settings: `Tabs` + `TabList` + `Tab` + `TabPanel`

## Reach for these

General: Button, SpeedDial, Icon, Logo, Heading, Title, Body, Sticker, Link  
Layout: Stack, Inline, Grid, Spacer, Divider, Resizable, ScrollArea, AspectRatio, Overlay  
Navigation: Breadcrumb, DropdownMenu, Menubar, Pagination, Step, Tabs, NavigationMenu, AppSidebar, OverflowPopover  
Data entry: TextField, TextArea, Select, Checkbox, Switch, Radio, Slider, Combobox, DatePicker, InputOTP, InputGroup, Rating, Toggle, Attachment, Form, SearchInput  
Data display: Avatar, Badge, Tag, Status, Calendar, Card, Carousel, Accordion, Popover, Tooltip, HoverCard, DataTable, Table, Item, CodeBlock, SpeechBubble, EmptyState, Marker  
Feedback: Alert, SectionMessage, Drawer, Dialog, AlertDialog, ToastProvider, LinearProgress, Spinner, Skeleton, Message  
Other: Command, ContextMenu, Collapsible, ButtonGroup, DirectionProvider, FaqSection, Questionnaire, Trace, Shortcut, GenericFilter
