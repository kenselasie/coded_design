"use client";

import * as stylex from "@stylexjs/stylex";
import NextLink from "next/link";
import { Fragment, useMemo, useState } from "react";
import {
  Body,
  Code,
  CodeBlock,
  EmptyState,
  Heading,
  SearchInput,
} from "codeddesign";
import { foundations, reference } from "codeddesign/agent";
import { colors } from "codeddesign/tokens/colors.stylex";
import { radii } from "codeddesign/tokens/space.stylex";
import { shadows } from "codeddesign/tokens/shadows.stylex";
import { font } from "codeddesign/tokens/typography.stylex";

const NARROW = "@media (max-width: 720px)";

const styles = stylex.create({
  page: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  intro: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "16px",
    maxWidth: "62ch",
  },
  search: {
    width: "100%",
    maxWidth: "32ch",
  },
  toc: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  tocLink: {
    display: "inline-flex",
    alignItems: "center",
    paddingBlock: "8px",
    paddingInline: "14px",
    borderRadius: radii.pill,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.s,
    fontWeight: font.semibold,
    textDecoration: "none",
    boxShadow: shadows.s1,
    ":hover": {
      backgroundColor: colors.snowDark,
      transform: "translateY(-2px)",
    },
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blueDark,
      outlineOffset: "3px",
    },
  },
  group: {
    display: "flex",
    flexDirection: "column",
    gap: "28px",
    paddingTop: "4px",
    scrollMarginTop: "96px",
  },
  groupBreak: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    marginTop: "12px",
    marginBottom: "4px",
  },
  breakLine: {
    height: "3px",
    borderRadius: "2px",
    backgroundColor: colors.black,
  },
  breakLineThin: {
    height: "2px",
  },
  headingRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    paddingBottom: "14px",
    borderBottomWidth: "2px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.black,
  },
  groupTitle: {
    margin: 0,
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.xxl,
    fontWeight: font.bold,
    letterSpacing: "-0.03em",
    lineHeight: 1.1,
  },
  count: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "28px",
    height: "28px",
    paddingInline: "8px",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    borderRadius: radii.pill,
    backgroundColor: colors.pinkLight,
    color: colors.onPastel,
    fontFamily: font.display,
    fontSize: font.s,
    fontWeight: font.bold,
    lineHeight: 1,
  },
  item: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    minWidth: 0,
    scrollMarginTop: "96px",
  },
  itemHead: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: "8px 16px",
  },
  itemTitle: {
    margin: 0,
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.xl,
    fontWeight: font.semibold,
    letterSpacing: "-0.02em",
    lineHeight: 1.2,
  },
  live: {
    color: colors.blueDark,
    fontFamily: font.display,
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
  props: {
    display: "grid",
    gridTemplateColumns: "minmax(7rem, 16rem) minmax(0, 1fr)",
    gap: "0 16px",
    [NARROW]: {
      gridTemplateColumns: "1fr",
      gap: "2px 0",
    },
  },
  propName: {
    margin: 0,
    paddingTop: "10px",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.smoke,
    color: colors.black,
    fontFamily: font.display,
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
  chips: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
  },
  chip: {
    display: "inline-flex",
    alignItems: "center",
    paddingBlock: "4px",
    paddingInline: "10px",
    borderRadius: radii.pill,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
    color: colors.black,
    fontFamily: font.mono,
    fontSize: font.xs,
    lineHeight: 1.3,
  },
  measure: {
    margin: 0,
    maxWidth: "72ch",
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.m,
    lineHeight: 1.55,
  },
});

function matches(query: string, haystack: string[]) {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return haystack.join(" ").toLowerCase().includes(needle);
}

export function DocsReference() {
  const [query, setQuery] = useState("");
  const total = reference.reduce((sum, group) => sum + group.items.length, 0);
  const visible = useMemo(() => {
    return reference
      .map((group) => ({
        ...group,
        items: group.items.filter((item) =>
          matches(query, [
            item.name,
            item.id,
            item.import,
            item.use,
            ...(item.aliases ?? []),
            ...item.props.map((prop) => prop.name),
          ]),
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [query]);
  const shown = visible.reduce((sum, group) => sum + group.items.length, 0);
  const searching = query.trim().length > 0;

  return (
    <div id="api" {...stylex.props(styles.page)}>
      <div {...stylex.props(styles.intro)}>
        <Heading size="xl" withoutMargins>
          API reference
        </Heading>
        <Body>
          Every export in the package: what it is for, which props it takes, and
          a copy-paste example. Open Live demo to see it running.
        </Body>
        <div {...stylex.props(styles.search)}>
          <SearchInput
            label="Find a design"
            placeholder="Button, toast, Form…"
            value={query}
            onChange={setQuery}
          />
        </div>
      </div>

      {searching ? null : (
        <>
          <nav aria-label="API groups" {...stylex.props(styles.toc)}>
            <a href="#tokens" {...stylex.props(styles.tocLink)}>
              Tokens
            </a>
            {reference.map((group) => (
              <a key={group.id} href={`#${group.id}`} {...stylex.props(styles.tocLink)}>
                {group.title}
              </a>
            ))}
          </nav>

          <section id="tokens" {...stylex.props(styles.group)}>
            <div {...stylex.props(styles.headingRow)}>
              <h2 {...stylex.props(styles.groupTitle)}>Tokens</h2>
            </div>
            <p {...stylex.props(styles.measure)}>
              Display type is Fredoka. Body type is Nunito. Ink is{" "}
              <Code>{foundations.ink}</Code> on paper{" "}
              <Code>{foundations.paper}</Code>. Shadows are offset plus blur.
              Palettes wrap a subtree with{" "}
              <Code>stylex.props(palettes.nord.light)</Code> from{" "}
              <Code>@kenselasie/codeddesign/theme</Code>.
            </p>
            <p {...stylex.props(styles.measure)}>
              Radii: {foundations.radii.join(", ")}. Space:{" "}
              {foundations.space.join(", ")}.
            </p>
            <div {...stylex.props(styles.chips)}>
              {foundations.palettes.map((palette) => (
                <span key={palette} {...stylex.props(styles.chip)}>
                  {palette}
                </span>
              ))}
            </div>
            <div {...stylex.props(styles.chips)}>
              {foundations.colorRoles.map((role) => (
                <span key={role} {...stylex.props(styles.chip)}>
                  {role}
                </span>
              ))}
            </div>
            <p {...stylex.props(styles.measure)}>
              Icon names: {foundations.iconNames.join(", ")}.
            </p>
          </section>
        </>
      )}

      {shown === 0 ? (
        <EmptyState
          title="Nothing matches"
          description="Try another name, alias, or prop."
        />
      ) : (
        visible.map((group, index) => (
          <section key={group.id} id={group.id} {...stylex.props(styles.group)}>
            {searching && index === 0 ? null : (
              <div {...stylex.props(styles.groupBreak)} aria-hidden="true">
                <span {...stylex.props(styles.breakLine)} />
                <span {...stylex.props(styles.breakLine, styles.breakLineThin)} />
              </div>
            )}
            <div {...stylex.props(styles.headingRow)}>
              <h2 {...stylex.props(styles.groupTitle)}>{group.title}</h2>
              <span {...stylex.props(styles.count)}>{group.items.length}</span>
            </div>
            {group.items.map((item) => (
              <article key={item.id} id={item.id} {...stylex.props(styles.item)}>
                <div {...stylex.props(styles.itemHead)}>
                  <h3 {...stylex.props(styles.itemTitle)}>{item.name}</h3>
                  <NextLink href={item.href} {...stylex.props(styles.live)}>
                    Live demo
                  </NextLink>
                </div>
                <Body>{item.use}</Body>
                {item.aliases?.length ? (
                  <p {...stylex.props(styles.aliases)}>
                    Also exported as {item.aliases.join(", ")}.
                  </p>
                ) : null}
                <p {...stylex.props(styles.importLine)}>
                  Import <Code>{item.import}</Code>
                </p>
                {item.props.length ? (
                  <div {...stylex.props(styles.props)}>
                    {item.props.map((prop, propIndex) => (
                      <Fragment key={`${item.id}-${prop.name}`}>
                        <p
                          {...stylex.props(
                            styles.propName,
                            propIndex === 0 && styles.first,
                          )}
                        >
                          {prop.name}
                          {prop.required ? " *" : ""}
                        </p>
                        <p
                          {...stylex.props(
                            styles.propMeta,
                            propIndex === 0 && styles.first,
                          )}
                        >
                          {prop.type}
                          {prop.default ? ` · default ${prop.default}` : ""}
                          {prop.note ? (
                            <span {...stylex.props(styles.note)}>{prop.note}</span>
                          ) : null}
                        </p>
                      </Fragment>
                    ))}
                  </div>
                ) : null}
                <CodeBlock code={item.example} language="tsx" />
              </article>
            ))}
          </section>
        ))
      )}

      {searching ? (
        <Body>
          {shown} of {total} designs.
        </Body>
      ) : (
        <Body>{total} designs in this kit.</Body>
      )}
    </div>
  );
}
