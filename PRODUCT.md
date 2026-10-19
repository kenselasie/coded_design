# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: engineers installing `@kenselasie/codeddesign` into other React apps and looking for working examples before they commit.

Secondary: designers browsing the catalog to see what the system can look like in product UI.

Also: vibe coders and coding agents composing screens from `@kenselasie/codeddesign`. They should read `/llms.txt` or `@kenselasie/codeddesign/agent` instead of guessing APIs.

## Product Purpose

CodedDesign is a cartoon-styled React design system. Tokens, components, and patterns ship as a public npm package and are previewed in this Next.js catalog. Success is an engineer who can see the system at work, install it, and compose a screen without adopting a compiler they do not already have.

## Positioning

A ready-to-install cartoon product UI — 2px ink borders, plush offset shadows, Fredoka display, Nunito body — not a copy of shadcn/ui. shadcn.com is a documentation structure reference only.

## Operating Context

Engineers install from the public npm registry (`npm install @kenselasie/codeddesign`), import `styles.css`, and use components with `@stylexjs/stylex` for theming. This catalog app (`next dev`) is the public face: landing, examples, usage, components, and docs. Theme switching lives in the catalog sidebar.

## Capabilities and Constraints

- Public package: `@kenselasie/codeddesign` on npmjs. GitHub Packages is not part of the install path.
- Peers: React 19, `@stylexjs/stylex` 0.19.1. Consumers do not need the StyleX compiler to use prebuilt components.
- Catalog stack: Next.js 16 App Router, Node 26, TypeScript 7.
- Existing routes: `/` (home, recipes include Forms), `/foundations`, `/components`. `/forms` redirects to `/#examples`.
- Landing must show live examples first, then invite install. Examples include composed product screens and copy-paste recipes with code.
- Do not invent customers, download counts, or testimonials.

## Brand Commitments

- Name: CodedDesign.
- Tagline: Build your apps with a unique-looking design system from CodedGuy.
- Voice: direct, a little playful, never hype.
- Visual identity is already in the catalog: cream paper, ink `#2a2438`, Fredoka + Nunito, radii 10/16/22/pill, 2px cartoon borders, offset+blur shadows. Landing and docs extend that world; they do not restyle toward shadcn/ui.

## Evidence on Hand

- Live catalog at this repo’s Next.js app.
- Component and pattern source in `packages/codeddesign/src`.
- Public registry listing: https://www.npmjs.com/package/@kenselasie/codeddesign
- No customer quotes, case studies, or usage metrics. Do not fabricate them.

## Product Principles

- Show the system working before asking anyone to install.
- Keep the cartoon world intact across marketing, examples, and docs.
- Teach with real code and real screens, not claims.
- Designers can browse; engineers can copy.

## Accessibility & Inclusion

Catalog pages should remain keyboard-usable and keep body text readable on the cream paper ground. No product-specific WCAG target was set beyond that.
