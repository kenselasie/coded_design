import * as stylex from "@stylexjs/stylex";
import type { ComponentProps } from "react";
import {
  Body,
  Heading,
  Icon,
  Inline,
  Item,
  ItemGroup,
  Sticker,
} from "codeddesign";
import { agentGuide } from "codeddesign/agent";
import { CatalogLink } from "./catalog-link";

type IconName = ComponentProps<typeof Icon>["name"];

const styles = stylex.create({
  panel: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    minWidth: 0,
  },
});

const entries: {
  title: string;
  description: string;
  icon: IconName;
  href?: string;
  hrefLabel?: string;
}[] = [
  {
    title: agentGuide.package,
    description: "Public npm. React components, tokens, and fonts.",
    icon: "download",
    href: "https://www.npmjs.com/package/@kenselasie/codeddesign",
    hrefLabel: "npm",
  },
  {
    title: "Peers",
    description: agentGuide.peers.join(" · "),
    icon: "checkCircle",
  },
  {
    title: agentGuide.css,
    description: "Fredoka, Nunito, and tokens. Import once at the app root.",
    icon: "file",
  },
  {
    title: agentGuide.theme,
    description: "CodedCartoony and CodedMarker, each with its own palettes.",
    icon: "spark",
  },
  {
    title: "@kenselasie/codeddesign/agent",
    description: "Recipes, reference, flattenReference, toLlmsTxt, and agentPrompt.",
    icon: "terminal",
    href: "/llms",
    hrefLabel: "llms.txt",
  },
  {
    title: "SKILL.md",
    description: "Same skill for Cursor, Claude, Codex, and other agents.",
    icon: "copy",
  },
  {
    title: "Catalog",
    description: "One page per export: live display, recipe, and props.",
    icon: "globe",
    href: "/components",
    hrefLabel: "Browse",
  },
];

export function PackageItems() {
  return (
    <section aria-label="Package" {...stylex.props(styles.panel)}>
      <Inline>
        <Heading size="xl" withoutMargins>
          The package
        </Heading>
        <Sticker tone="mint">{agentGuide.version}</Sticker>
      </Inline>
      <Body>
        What other apps install. The other project does not need the StyleX
        compiler.
      </Body>
      <ItemGroup>
        {entries.map((entry, index) => (
          <Item
            key={entry.title}
            title={entry.title}
            description={entry.description}
            media={<Icon name={entry.icon} size={18} />}
            actions={
              entry.href ? (
                <CatalogLink href={entry.href}>{entry.hrefLabel}</CatalogLink>
              ) : undefined
            }
            last={index === entries.length - 1}
          />
        ))}
      </ItemGroup>
    </section>
  );
}
