"use client";

import * as stylex from "@stylexjs/stylex";
import NextLink from "next/link";
import { Fragment } from "react";
import { Body, Breadcrumb, Code, CodeBlock, Heading } from "codeddesign";
import { flattenReference, type ItemDoc } from "codeddesign/agent";
import { colors } from "codeddesign/tokens/colors.stylex";
import { font } from "codeddesign/tokens/typography.stylex";
import { ComponentPreview } from "./previews";

const NARROW = "@media (max-width: 720px)";

const styles = stylex.create({
  page: {
    display: "flex",
    flexDirection: "column",
    gap: "28px",
    maxWidth: "56rem",
  },
  head: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "12px",
  },
  aliases: {
    margin: 0,
    color: colors.steel,
    fontFamily: font.family,
    fontSize: font.s,
    lineHeight: 1.45,
  },
  importLine: {
    margin: 0,
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.s,
    lineHeight: 1.45,
  },
  block: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    minWidth: 0,
  },
  stage: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    minWidth: 0,
  },
  props: {
    display: "grid",
    gridTemplateColumns: "minmax(7rem, 16rem) minmax(0, 1fr)",
    gap: "0 16px",
    [NARROW]: {
      gridTemplateColumns: "1fr",
    },
  },
  propName: {
    margin: 0,
    paddingTop: "10px",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.smoke,
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.s,
    fontWeight: font.semibold,
    lineHeight: 1.4,
  },
  propMeta: {
    margin: 0,
    paddingTop: "10px",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.smoke,
    color: colors.black,
    fontFamily: font.mono,
    fontSize: font.xs,
    lineHeight: 1.5,
    overflowWrap: "anywhere",
    [NARROW]: {
      borderTopWidth: 0,
      paddingTop: 0,
      paddingBottom: "10px",
    },
  },
  first: {
    borderTopWidth: 0,
    paddingTop: 0,
  },
  note: {
    display: "block",
    marginTop: "4px",
    color: colors.steel,
    fontFamily: font.family,
    fontSize: font.xs,
    lineHeight: 1.45,
  },
  pager: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "12px",
    paddingTop: "8px",
  },
  step: {
    color: colors.blueDark,
    fontFamily: font.family,
    fontSize: font.s,
    fontWeight: font.semibold,
    textUnderlineOffset: "3px",
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blueDark,
      outlineOffset: "3px",
    },
  },
  muted: {
    color: colors.steel,
    fontFamily: font.family,
    fontSize: font.s,
  },
});

export function ComponentDoc({ item }: { item: ItemDoc }) {
  const all = flattenReference();
  const index = all.findIndex((entry) => entry.id === item.id);
  const previous = index > 0 ? all[index - 1] : undefined;
  const next = index >= 0 && index < all.length - 1 ? all[index + 1] : undefined;

  return (
    <article {...stylex.props(styles.page)}>
      <div {...stylex.props(styles.head)}>
        <Breadcrumb
          items={[
            { label: "Components", href: "/components" },
            { label: item.name },
          ]}
        />
        <Heading size="xxl" withoutMargins>
          {item.name}
        </Heading>
        <Body>{item.use}</Body>
        {item.aliases?.length ? (
          <p {...stylex.props(styles.aliases)}>Also exported as {item.aliases.join(", ")}.</p>
        ) : null}
        <p {...stylex.props(styles.importLine)}>
          Import <Code>{item.import}</Code>
        </p>
      </div>

      <section {...stylex.props(styles.block)}>
        <Heading size="xl" withoutMargins>
          Display
        </Heading>
        <div {...stylex.props(styles.stage)}>
          <ComponentPreview id={item.id} />
        </div>
      </section>

      <section {...stylex.props(styles.block)}>
        <Heading size="xl" withoutMargins>
          Recipe
        </Heading>
        <CodeBlock code={item.example} language="tsx" />
      </section>

      {item.props.length ? (
        <section {...stylex.props(styles.block)}>
          <Heading size="xl" withoutMargins>
            Props
          </Heading>
          <div {...stylex.props(styles.props)}>
            {item.props.map((prop, propIndex) => (
              <Fragment key={prop.name}>
                <p {...stylex.props(styles.propName, propIndex === 0 && styles.first)}>
                  {prop.name}
                  {prop.required ? " *" : ""}
                </p>
                <p {...stylex.props(styles.propMeta, propIndex === 0 && styles.first)}>
                  {prop.type}
                  {prop.default ? ` · default ${prop.default}` : ""}
                  {prop.note ? <span {...stylex.props(styles.note)}>{prop.note}</span> : null}
                </p>
              </Fragment>
            ))}
          </div>
        </section>
      ) : null}

      <nav aria-label="Adjacent components" {...stylex.props(styles.pager)}>
        {previous ? (
          <NextLink href={`/components/${previous.id}`} {...stylex.props(styles.step)}>
            {previous.name}
          </NextLink>
        ) : (
          <span {...stylex.props(styles.muted)}>First in the kit</span>
        )}
        {next ? (
          <NextLink href={`/components/${next.id}`} {...stylex.props(styles.step)}>
            {next.name}
          </NextLink>
        ) : (
          <span {...stylex.props(styles.muted)}>Last in the kit</span>
        )}
      </nav>
    </article>
  );
}
