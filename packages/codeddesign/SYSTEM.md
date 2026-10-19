# CodedDesign product shells

Compose product UIs — social, dashboards, settings, onboarding — from tokens, atoms, molecules, and recipes. Surfaces below are the customization contract for humans and agents.

## Layers

### Tokens

Color, type, space, radii, shadows. Remap with worlds and palettes from @kenselasie/codeddesign/theme.

### Atoms

Single-purpose controls: Button, TextField, Icon, Tag, Avatar, Checkbox, Toggle, Link.

### Molecules

Small compositions: Card + CardHeader, Item + ItemGroup, SearchInput, ToggleButton, Step, InputGroup.

### Recipes

Copy-paste screens from @kenselasie/codeddesign/agent recipes. Prefer a recipe before inventing a layout.

### Product shells

Full surfaces below. Pass data and callbacks as props. Swap tone with a world/palette, not CSS rewrites.

## Surfaces

### Split hero

Split layout: configure on one side, live preview on the other. Mode chips drive fields and CTA copy.

Compose:

- Heading + Body
- ToggleButton or Button selected for mode chips
- TextField (and DatePicker when needed)
- Button variant="primary" for the dynamic CTA
- Link for secondary action
- Card (or AspectRatio frame) for the preview pane
- Sticker or Tag for a URL or status chip

Customize:

- modes: { label, value }[] for chips
- fields: change with selected mode
- ctaLabel: string built from inputs
- preview: ReactNode — canvas, poster, or empty state
- world/palette on the shell for global look

Recipe id: `split-hero`

### Process steps

Numbered process row of cards with title, description, and footer label.

Compose:

- Heading + Body for the section intro
- Grid of Card with CardTitle + CardContent
- Step for linear progress elsewhere; here prefer Card + large Title for the step number

Customize:

- steps: { number, title, description, footerLabel }[]
- columns via Grid

Recipe id: `process-steps`

### Activity dashboard

Feature or stat cards plus a recent-activity list with avatars and status tags.

Compose:

- Heading + Body + feature Grid of Card
- Button primary for CTA
- Card with stats (Heading + Body — do not nest Card)
- ItemGroup + Item for activity rows
- Avatar + Tag for status

Customize:

- stats: { label, value, delta }[]
- items: { name, meta, status, initials }[]
- status → Tag status or Status component

Recipe id: `activity-dashboard`

### Feature grid

Section of value cards with icon, title, and short body.

Compose:

- Heading + Body
- Grid of Card: Icon + CardTitle + CardContent

Customize:

- items: { title, description, icon }[]
- 2–3 columns on desktop via Grid

Recipe id: `feature-grid`

### Create account

Centered auth form with account-type toggle, SSO, email fields, and primary submit.

Compose:

- Heading + Body with Link
- ToggleButton for Personal / Team
- Button default fullWidth for SSO
- TextField stack + Checkbox
- Button variant="primary" fullWidth

Customize:

- accountTypes via ToggleButton options
- showSso: boolean
- fields and validation stay on TextField

Recipe id: `signup`

### Detail cards

Two-column detail cards: about, key-value basics, checklist, media slot.

Compose:

- Heading
- Grid of Card
- About: CardTitle + Body
- Basics: stacked Inline or Item rows for key/value
- Checklist: Icon checkCircle / empty + Status
- Media: CardTitle + AspectRatio frame for image or map slot

Customize:

- about: string
- basics: { label, value }[]
- checks: { label, detail?, done: boolean }[]
- media: ReactNode slot

Recipe id: `detail-cards`

### App shell

Sidebar rail + top search + main page with tabs and empty state.

Compose:

- AppSidebar with brand, nav groups, create action, and sign out
- SearchInput hideLabel shape="pill" in the header
- Heading + Tabs
- EmptyState when a tab has nothing

Customize:

- nav: AppSidebar items
- tabs: value/label pairs
- empty: title + description per tab

Recipe id: `app-shell`

## Rules

- Customize with props and children first. Do not copy component source into the app.
- Change look globally with a world + palette from @kenselasie/codeddesign/theme, not one-off hex in screens.
- Pick one world: codedcartoony, codedmarker, or codededwadzi. Do not mix.
- Prefer an existing atom or molecule over custom HTML for buttons, fields, chips, tags, tables, and empty states.
- ToggleButton is the segmented control (Personal / Team, modes as a compact group). For pill chips that look like tags, use Button selected or Tag.
- SearchInput is fluid. In a header or rail: hideLabel and shape="pill".
- Card has CardHeader, CardTitle, CardContent, CardActions — compose, do not nest Card inside Card.
- Do not nest Form or MessageScroller inside Card.
- Do not invent props. Read flattenReference() or package types.
- Pass ReactNode slots (preview, media) instead of baking third-party widgets into the design system.
