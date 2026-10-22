"use client";

import * as stylex from "@stylexjs/stylex";
import dynamic from "next/dynamic";
import { colors } from "codeddesign/tokens/colors.stylex";
import { font } from "codeddesign/tokens/typography.stylex";
import { useWorld } from "../../src/theme/world-context";

const WorldGlobe = dynamic(
  () => import("./world-globe").then((mod) => ({ default: mod.WorldGlobe })),
  {
    ssr: false,
    loading: () => <div {...stylex.props(styles.globeSlot)} />,
  },
);

const NARROW = "@media (max-width: 980px)";
const PHONE = "@media (max-width: 640px)";

const styles = stylex.create({
  heading: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    minHeight: "83px",
    minWidth: 0,
    width: "100%",
    [NARROW]: {
      justifyContent: "flex-start",
      minHeight: 0,
    },
  },
  title: {
    margin: 0,
    width: "100%",
    maxWidth: "18ch",
    textAlign: "right",
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.xxxl,
    fontWeight: font.semibold,
    letterSpacing: "-0.03em",
    lineHeight: 1.1,
    [NARROW]: {
      textAlign: "left",
      maxWidth: "none",
      fontSize: font.xxl,
    },
    [PHONE]: {
      fontSize: font.xl,
      lineHeight: 1.2,
    },
  },
  worlds: {
    color: colors.blue,
  },
  panel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    minWidth: 0,
    width: "100%",
  },
  stage: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    overflow: "visible",
    backgroundImage: `radial-gradient(ellipse 65% 55% at 50% 45%, color-mix(in srgb, ${colors.blueLight} 48%, transparent), transparent 72%)`,
    [PHONE]: {
      paddingInline: "4px",
    },
  },
  globeWrap: {
    position: "relative",
    width: "100%",
    maxWidth: "min(100%, 34rem)",
    aspectRatio: "1",
    marginInline: "auto",
    [NARROW]: {
      maxWidth: "min(92%, 22rem)",
    },
    [PHONE]: {
      maxWidth: "min(88%, 17rem)",
    },
  },
  globeSlot: {
    width: "100%",
    height: "100%",
    minHeight: 0,
  },
});

export function WorldExploreHeading() {
  return (
    <div {...stylex.props(styles.heading)}>
      <h2 {...stylex.props(styles.title)}>
        Explore the different design{" "}
        <span {...stylex.props(styles.worlds)}>worlds</span>
      </h2>
    </div>
  );
}

export function WorldExplorer() {
  const { world, chooseWorld } = useWorld();

  return (
    <section aria-label="Design worlds" {...stylex.props(styles.panel)}>
      <div {...stylex.props(styles.stage)}>
        <div {...stylex.props(styles.globeWrap)}>
          <WorldGlobe world={world} onChoose={chooseWorld} />
        </div>
      </div>
    </section>
  );
}
