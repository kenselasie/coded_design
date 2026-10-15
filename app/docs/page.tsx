import * as stylex from "@stylexjs/stylex";
import NextLink from "next/link";
import { Body, Bullet, Code, Heading, Stack } from "codeddesign";
import { colors } from "codeddesign/tokens/colors.stylex";
import { radii } from "codeddesign/tokens/space.stylex";
import { shadows } from "codeddesign/tokens/shadows.stylex";
import { font } from "codeddesign/tokens/typography.stylex";

export const metadata = {
  title: "Docs · CodedDesign",
};

const styles = stylex.create({
  lead: {
    maxWidth: "62ch",
  },
  measure: {
    margin: 0,
    maxWidth: "72ch",
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.m,
    lineHeight: 1.55,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "12px",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    padding: "18px 20px",
    borderRadius: radii.l,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
    boxShadow: shadows.s1,
    color: colors.black,
    textDecoration: "none",
    ":hover": {
      backgroundColor: colors.snowDark,
    },
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blueDark,
      outlineOffset: "3px",
    },
  },
  name: {
    margin: 0,
    fontFamily: font.display,
    fontSize: font.l,
    fontWeight: font.bold,
  },
  hint: {
    margin: 0,
    color: colors.steel,
    fontFamily: font.family,
    fontSize: font.s,
    lineHeight: 1.45,
  },
});

const links = [
  { href: "/use", title: "Use", hint: "Install and first render" },
  { href: "/examples", title: "Examples", hint: "Dashboard, chat, recipes" },
  { href: "/components", title: "Components", hint: "Live catalog of controls" },
  { href: "/foundations", title: "Foundations", hint: "Color, type, elevation" },
  { href: "/patterns", title: "Patterns", hint: "Cards, tables, dialogs" },
  { href: "/forms", title: "Forms", hint: "Sign-in, invite, profile" },
];

export default function DocsPage() {
  return (
    <Stack gap="xl">
      <Stack gap="s">
        <Heading size="xxl" withoutMargins>
          Docs
        </Heading>
        <div {...stylex.props(styles.lead)}>
          <Body>
            CodedDesign is the cartoon system in this catalog, published as{" "}
            <Code>@kenselasie/codeddesign</Code>. These pages are the
            documentation.
          </Body>
        </div>
      </Stack>

      <nav aria-label="Documentation" {...stylex.props(styles.grid)}>
        {links.map((item) => (
          <NextLink key={item.href} href={item.href} {...stylex.props(styles.card)}>
            <p {...stylex.props(styles.name)}>{item.title}</p>
            <p {...stylex.props(styles.hint)}>{item.hint}</p>
          </NextLink>
        ))}
      </nav>

      <Stack gap="s">
        <Heading size="xl" withoutMargins>
          Package
        </Heading>
        <p {...stylex.props(styles.measure)}>
          Import components from <Code>@kenselasie/codeddesign</Code>, styles from{" "}
          <Code>@kenselasie/codeddesign/styles.css</Code>, and the dark theme from{" "}
          <Code>@kenselasie/codeddesign/theme</Code>.
        </p>
        <Bullet>Public registry: npmjs, version 0.1.2 and later.</Bullet>
        <Bullet>
          Palettes: Paper, Nord, Solarized, and Catppuccin — each with a light and
          dark theme from <Code>@kenselasie/codeddesign/theme</Code>.
        </Bullet>
        <Bullet>Workspace catalog still imports the local package as <Code>codeddesign</Code>.</Bullet>
        <Bullet>
          Tokens live under <Code>packages/codeddesign/src/tokens</Code> as StyleX
          variables.
        </Bullet>
      </Stack>
    </Stack>
  );
}
