# Agents in this repo

CodedDesign is a cartoon React design system. The catalog is this Next.js app. The publishable package lives in `packages/codeddesign` and ships as `@kenselasie/codeddesign`.

## Local vs published

- Catalog imports the workspace package as `codeddesign`.
- Other apps install `@kenselasie/codeddesign` from npm.
- Consumers do not need the StyleX compiler. This catalog does, because it compiles the workspace source.

## Visual world

Cream paper, ink `#2a2438`, Fredoka display, Nunito body, radii 10/16/22/pill, 2px cartoon borders, plush offset+blur shadows. Do not restyle toward shadcn/ui. Stickers and speech bubbles are existing components, not decoration dumps.

## Package for other agents

When an agent is building a *different* app with this system, point it at:

- `@kenselasie/codeddesign/agent` (`agentGuide`, `recipes`, `components`, `reference`, `flattenReference`, `toLlmsTxt`, `agentPrompt`)
- Catalog `/llms.txt` (generated from `toLlmsTxt()`; also `packages/codeddesign/llms.txt`)
- `packages/codeddesign/SKILL.md` (same skill for Cursor, Claude, Codex, and others — drop into `.agents/skills/codeddesign/`, `.cursor/skills/codeddesign/`, `.claude/skills/codeddesign/`, or `.codex/skills/codeddesign/` in the other project)

## Do not

- Publish from GitHub Packages.
- Rename the product back to Compass.
- Invent download counts or testimonials.
