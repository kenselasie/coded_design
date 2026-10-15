"use client";

import * as stylex from "@stylexjs/stylex";
import NextLink from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import {
  Avatar,
  Badge,
  Body,
  Heading,
  Icon,
  Inline,
  LinearProgress,
  SearchInput,
  Shortcut,
  Skeleton,
  SpeechBubble,
  Spinner,
  Status,
  Sticker,
  Tag,
} from "codeddesign";
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
    maxWidth: "42ch",
  },
  search: {
    width: "100%",
    maxWidth: "28ch",
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
    gap: "16px",
    paddingTop: "4px",
    scrollMarginTop: "96px",
  },
  groupBreak: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    marginTop: "28px",
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
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(188px, 1fr))",
    gap: "16px",
    [NARROW]: {
      gridTemplateColumns: "repeat(auto-fill, minmax(148px, 1fr))",
      gap: "12px",
    },
  },
  card: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    overflow: "hidden",
    textDecoration: "none",
    color: colors.black,
    backgroundColor: colors.white,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    borderRadius: radii.l,
    boxShadow: shadows.s1,
    transitionProperty: "transform, box-shadow, background-color",
    transitionDuration: "160ms",
    transitionTimingFunction: "ease-out",
    ":hover": {
      transform: "translateY(-3px)",
      boxShadow: shadows.s2,
      backgroundColor: colors.snow,
    },
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blueDark,
      outlineOffset: "3px",
    },
  },
  preview: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "118px",
    padding: "12px",
    overflow: "hidden",
    backgroundColor: colors.snow,
    borderBottomWidth: "2px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.black,
    pointerEvents: "none",
    userSelect: "none",
  },
  previewInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "100%",
    transform: "scale(0.86)",
    transformOrigin: "center",
  },
  name: {
    paddingBlock: "12px",
    paddingInline: "14px",
    fontFamily: font.display,
    fontSize: font.s,
    fontWeight: font.semibold,
    letterSpacing: "-0.02em",
  },
  empty: {
    margin: 0,
    color: colors.steel,
    fontFamily: font.family,
    fontSize: font.m,
  },
  cell: {
    width: "28px",
    height: "28px",
    borderRadius: radii.s,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
  },
  pink: { backgroundColor: colors.pinkLight },
  blue: { backgroundColor: colors.blueLight },
  mint: { backgroundColor: colors.greenLight },
  wide: { width: "72px", height: "40px" },
  stackPreview: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    width: "88px",
  },
  bar: {
    height: "14px",
    borderRadius: radii.pill,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
  },
  split: {
    display: "flex",
    alignItems: "stretch",
    height: "56px",
    width: "110px",
    overflow: "hidden",
    borderRadius: radii.m,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
  },
  pane: {
    flex: 1,
  },
  handle: {
    width: "8px",
    backgroundColor: colors.black,
  },
  day: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "52px",
    height: "52px",
    borderRadius: radii.m,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
    boxShadow: shadows.s1,
    fontFamily: font.display,
    fontWeight: font.bold,
    fontSize: font.l,
    lineHeight: 1,
  },
  muted: {
    fontFamily: font.family,
    fontSize: font.xxs,
    fontWeight: font.medium,
    color: colors.steel,
  },
  dots: {
    display: "flex",
    gap: "6px",
  },
  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: colors.smokeDarker,
  },
  dotOn: {
    backgroundColor: colors.blue,
  },
  fab: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    backgroundColor: colors.blue,
    color: colors.onAccent,
    boxShadow: shadows.s3,
  },
  table: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "6px 12px",
    minWidth: "120px",
    fontFamily: font.family,
    fontSize: font.xs,
  },
  th: {
    fontFamily: font.display,
    fontWeight: font.semibold,
  },
  codeWell: {
    paddingBlock: "8px",
    paddingInline: "12px",
    borderRadius: radii.m,
    backgroundColor: colors.well,
    color: colors.onWell,
    fontFamily: font.mono,
    fontSize: font.xs,
  },
  rtl: {
    fontFamily: font.display,
    fontSize: font.l,
    fontWeight: font.semibold,
  },
  chip: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    minHeight: "32px",
    paddingInline: "12px",
    borderRadius: radii.l,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.s,
    fontWeight: font.semibold,
    lineHeight: 1,
    whiteSpace: "nowrap",
  },
  primary: {
    backgroundColor: colors.blue,
    color: colors.onAccent,
    borderColor: colors.blueDark,
  },
  danger: {
    backgroundColor: colors.danger,
    color: colors.onAccent,
    borderColor: colors.dangerDark,
  },
  subtle: {
    backgroundColor: colors.snowDark,
  },
  check: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "18px",
    height: "18px",
    borderRadius: "6px",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.blue,
    color: colors.onAccent,
  },
  track: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "40px",
    height: "24px",
    paddingInline: "2px",
    borderRadius: radii.pill,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.blue,
  },
  knob: {
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    backgroundColor: colors.white,
  },
  sample: {
    margin: 0,
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.xl,
    fontWeight: font.bold,
    letterSpacing: "-0.03em",
    lineHeight: 1,
  },
  crumb: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.s,
  },
  crumbLink: {
    color: colors.blueDark,
    fontWeight: font.semibold,
  },
  crumbNow: {
    fontFamily: font.display,
    fontWeight: font.semibold,
  },
  crumbSep: {
    display: "block",
    color: colors.pink,
  },
  tabList: {
    display: "flex",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.smoke,
  },
  tab: {
    paddingBlock: "8px",
    paddingInline: "12px",
    color: colors.steel,
    fontFamily: font.family,
    fontSize: font.s,
    fontWeight: font.medium,
    borderBottomWidth: "2px",
    borderBottomStyle: "solid",
    borderBottomColor: "transparent",
  },
  tabOn: {
    color: colors.black,
    borderBottomColor: colors.blue,
  },
  stepRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  stepDot: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.smokeDarker,
    backgroundColor: colors.white,
    color: colors.steel,
    fontFamily: font.family,
    fontSize: font.xxs,
    fontWeight: font.semibold,
  },
  stepDone: {
    backgroundColor: colors.success,
    borderColor: colors.success,
    color: colors.onAccent,
  },
  stepOn: {
    backgroundColor: colors.blue,
    borderColor: colors.blue,
    color: colors.onAccent,
  },
  stepLabel: {
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.xs,
    fontWeight: font.medium,
  },
  stepMute: {
    color: colors.steel,
  },
  menuBar: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    padding: "4px 6px",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    borderRadius: radii.m,
    backgroundColor: colors.white,
  },
  menuItem: {
    paddingBlock: "6px",
    paddingInline: "10px",
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.s,
    fontWeight: font.semibold,
  },
  navItem: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    paddingBlock: "8px",
    paddingInline: "12px",
    borderRadius: radii.pill,
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.s,
    fontWeight: font.semibold,
  },
  navOpen: {
    backgroundColor: colors.snowDark,
  },
  sidebarShell: {
    display: "flex",
    width: "128px",
    height: "84px",
    overflow: "hidden",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    borderRadius: radii.m,
    backgroundColor: colors.white,
  },
  rail: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    width: "40px",
    paddingBlock: "10px",
    backgroundColor: colors.snow,
    borderRightWidth: "2px",
    borderRightStyle: "solid",
    borderRightColor: colors.black,
    color: colors.black,
  },
  railOn: {
    color: colors.blueDark,
  },
  sidebarMain: {
    flex: 1,
    backgroundColor: colors.white,
  },
  rule: {
    width: "92px",
    height: "3px",
    borderRadius: "2px",
    backgroundColor: colors.black,
  },
  dropStack: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "6px",
  },
  stepLine: {
    width: "14px",
    height: "2px",
    backgroundColor: colors.black,
  },
  stackBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    width: "96px",
  },
  stackItem: {
    height: "22px",
    borderRadius: radii.s,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
  },
  gridMini: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 22px)",
    gap: "6px",
  },
  scrollBox: {
    display: "flex",
    width: "110px",
    height: "72px",
    overflow: "hidden",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    borderRadius: radii.m,
    backgroundColor: colors.white,
  },
  scrollCopy: {
    flex: 1,
    padding: "8px",
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.xxs,
    lineHeight: 1.45,
  },
  scrollTrack: {
    width: "8px",
    backgroundColor: colors.snowDark,
  },
  scrollThumb: {
    height: "28px",
    margin: "4px 1px",
    borderRadius: radii.pill,
    backgroundColor: colors.snowDarker,
  },
  ratio: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "88px",
    height: "50px",
    borderRadius: radii.s,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.pinkLight,
    color: colors.onPastel,
    fontFamily: font.display,
    fontSize: font.xs,
    fontWeight: font.semibold,
  },
  radio: {
    display: "inline-flex",
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.steel,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  radioOn: {
    borderColor: colors.blue,
  },
  radioDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: colors.blue,
  },
  sliderTrack: {
    position: "relative",
    width: "108px",
    height: "8px",
    borderRadius: radii.pill,
    backgroundColor: colors.snowDarker,
  },
  sliderFill: {
    width: "40%",
    height: "100%",
    borderRadius: radii.pill,
    backgroundColor: colors.blue,
  },
  sliderThumb: {
    position: "absolute",
    top: "-5px",
    left: "36%",
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    width: "120px",
  },
  fieldLabel: {
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.xs,
    fontWeight: font.semibold,
  },
  fieldBox: {
    height: "32px",
    paddingInline: "10px",
    borderRadius: radii.m,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.xs,
    lineHeight: "28px",
  },
  groupField: {
    display: "flex",
    alignItems: "stretch",
    overflow: "hidden",
    borderRadius: radii.m,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
    fontFamily: font.family,
    fontSize: font.xs,
  },
  affix: {
    paddingInline: "8px",
    backgroundColor: colors.snow,
    color: colors.steel,
    lineHeight: "30px",
  },
  affixMid: {
    paddingInline: "8px",
    color: colors.black,
    lineHeight: "30px",
  },
  otpBox: {
    width: "28px",
    height: "34px",
    borderRadius: radii.s,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.m,
    fontWeight: font.semibold,
    textAlign: "center",
    lineHeight: "30px",
  },
  fileCard: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 10px",
    borderRadius: radii.m,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
  },
  fileMeta: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.xs,
  },
  fileSub: {
    color: colors.steel,
    fontSize: font.xxs,
  },
  pageRow: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    flexWrap: "nowrap",
  },
  pageBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "28px",
    height: "28px",
    paddingInline: "8px",
    borderRadius: radii.pill,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.xxs,
    fontWeight: font.semibold,
    lineHeight: 1,
    whiteSpace: "nowrap",
  },
  pageOn: {
    backgroundColor: colors.blue,
    borderColor: colors.blue,
    color: colors.onAccent,
  },
  week: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 14px)",
    gap: "3px",
  },
  calDay: {
    width: "14px",
    height: "14px",
    borderRadius: "4px",
    backgroundColor: colors.snowDark,
  },
  calOn: {
    backgroundColor: colors.blue,
  },
  tip: {
    paddingBlock: "6px",
    paddingInline: "10px",
    borderRadius: radii.s,
    backgroundColor: colors.black,
    color: colors.onAccent,
    fontFamily: font.family,
    fontSize: font.xxs,
    whiteSpace: "nowrap",
  },
  pop: {
    padding: "8px 10px",
    borderRadius: radii.m,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
    boxShadow: shadows.s1,
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.xxs,
  },
  alertBox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 12px",
    borderRadius: radii.m,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.blue,
    backgroundColor: colors.white,
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.xs,
    fontWeight: font.semibold,
  },
  noteBox: {
    padding: "10px 12px",
    borderRadius: radii.m,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.green,
    backgroundColor: colors.snow,
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.xs,
    fontWeight: font.semibold,
  },
  sheet: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    width: "120px",
    height: "72px",
    overflow: "hidden",
    borderRadius: radii.m,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.snowDark,
  },
  sheetPanel: {
    height: "40px",
    borderTopWidth: "2px",
    borderTopStyle: "solid",
    borderTopColor: colors.black,
    backgroundColor: colors.white,
  },
  dialog: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    width: "110px",
    padding: "10px",
    borderRadius: radii.m,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
    boxShadow: shadows.s2,
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.xs,
    fontWeight: font.semibold,
  },
  toastBar: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    paddingBlock: "8px",
    paddingInline: "12px",
    borderRadius: radii.m,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
    boxShadow: shadows.s2,
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.xs,
  },
  chat: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    width: "120px",
  },
  bubble: {
    maxWidth: "90%",
    padding: "6px 8px",
    borderRadius: radii.m,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    fontFamily: font.family,
    fontSize: font.xxs,
    lineHeight: 1.3,
  },
  them: {
    alignSelf: "flex-start",
    backgroundColor: colors.white,
  },
  us: {
    alignSelf: "flex-end",
    backgroundColor: colors.blueLight,
    color: colors.onPastel,
  },
  menuList: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    minWidth: "108px",
    padding: "8px",
    borderRadius: radii.m,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
    boxShadow: shadows.s1,
    fontFamily: font.family,
    fontSize: font.xs,
  },
  menuDanger: {
    color: colors.dangerDark,
  },
  accordion: {
    display: "flex",
    flexDirection: "column",
    width: "130px",
    overflow: "hidden",
    borderRadius: radii.m,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
  },
  accordionRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
    padding: "8px 10px",
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.xxs,
    fontWeight: font.semibold,
  },
  accordionOpen: {
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.smoke,
  },
  starOn: {
    fill: colors.warning,
    stroke: colors.black,
  },
  starOff: {
    fill: "none",
    stroke: colors.black,
  },
});

type Entry = {
  id: string;
  name: string;
  aliases?: string[];
  href?: string;
  preview: ReactNode;
};

type Group = {
  id: string;
  title: string;
  items: Entry[];
};

function Mini({ children }: { children: ReactNode }) {
  return <div {...stylex.props(styles.previewInner)}>{children}</div>;
}

function Chip({
  children,
  tone = "white",
}: {
  children: ReactNode;
  tone?: "white" | "primary" | "danger" | "subtle";
}) {
  return (
    <span
      {...stylex.props(
        styles.chip,
        tone === "primary" && styles.primary,
        tone === "danger" && styles.danger,
        tone === "subtle" && styles.subtle,
      )}
    >
      {children}
    </span>
  );
}

function CrumbSep() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" {...stylex.props(styles.crumbSep)}>
      <path
        d="M5 3l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarMark({ filled }: { filled: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2.6l2.5 5.5 6 .7-4.5 4 1.3 5.9L12 15.8 6.7 18.7l1.3-5.9-4.5-4 6-.7L12 2.6z"
        strokeWidth="1.6"
        strokeLinejoin="round"
        {...stylex.props(filled ? styles.starOn : styles.starOff)}
      />
    </svg>
  );
}

function groups(): Group[] {
  return [
    {
      id: "general",
      title: "General",
      items: [
        {
          id: "button",
          name: "Button",
          preview: (
            <Mini>
              <Chip tone="primary">Primary</Chip>
            </Mini>
          ),
        },
        {
          id: "speed-dial",
          name: "Speed Dial",
          preview: (
            <Mini>
              <span {...stylex.props(styles.fab)}>
                <Icon name="plus" size={22} />
              </span>
            </Mini>
          ),
        },
        {
          id: "icon",
          name: "Icon",
          preview: (
            <Mini>
              <Inline>
                <Icon name="spark" size={28} />
                <Icon name="check" size={28} />
                <Icon name="message" size={28} />
              </Inline>
            </Mini>
          ),
        },
        {
          id: "typography",
          name: "Typography",
          preview: (
            <Mini>
              <span {...stylex.props(styles.sample)}>Aa</span>
            </Mini>
          ),
        },
      ],
    },
    {
      id: "layout",
      title: "Layout",
      items: [
        {
          id: "divider",
          name: "Divider",
          preview: (
            <Mini>
              <span {...stylex.props(styles.rule)} />
            </Mini>
          ),
        },
        {
          id: "stack",
          name: "Stack",
          preview: (
            <Mini>
              <div {...stylex.props(styles.stackBlock)}>
                <span {...stylex.props(styles.stackItem, styles.pink)} />
                <span {...stylex.props(styles.stackItem, styles.blue)} />
                <span {...stylex.props(styles.stackItem, styles.mint)} />
              </div>
            </Mini>
          ),
        },
        {
          id: "grid",
          name: "Grid",
          href: "/patterns",
          preview: (
            <Mini>
              <div {...stylex.props(styles.gridMini)}>
                <span {...stylex.props(styles.cell, styles.pink)} />
                <span {...stylex.props(styles.cell, styles.blue)} />
                <span {...stylex.props(styles.cell, styles.mint)} />
                <span {...stylex.props(styles.cell, styles.pink)} />
              </div>
            </Mini>
          ),
        },
        {
          id: "resizable",
          name: "Resizable",
          preview: (
            <Mini>
              <div {...stylex.props(styles.split)}>
                <span {...stylex.props(styles.pane, styles.pink)} />
                <span {...stylex.props(styles.handle)} />
                <span {...stylex.props(styles.pane, styles.blue)} />
              </div>
            </Mini>
          ),
        },
        {
          id: "scroll-area",
          name: "Scroll Area",
          preview: (
            <Mini>
              <div {...stylex.props(styles.scrollBox)}>
                <div {...stylex.props(styles.scrollCopy)}>
                  Nunito
                  <br />
                  Fredoka
                  <br />
                  paper cream
                  <br />
                  ink purple
                </div>
                <div {...stylex.props(styles.scrollTrack)}>
                  <span {...stylex.props(styles.scrollThumb)} />
                </div>
              </div>
            </Mini>
          ),
        },
        {
          id: "aspect-ratio",
          name: "Aspect Ratio",
          preview: (
            <Mini>
              <span {...stylex.props(styles.ratio)}>16:9</span>
            </Mini>
          ),
        },
      ],
    },
    {
      id: "navigation",
      title: "Navigation",
      items: [
        {
          id: "breadcrumb",
          name: "Breadcrumb",
          preview: (
            <Mini>
              <span {...stylex.props(styles.crumb)}>
                <span {...stylex.props(styles.crumbLink)}>Workspace</span>
                <CrumbSep />
                <span {...stylex.props(styles.crumbNow)}>Badge</span>
              </span>
            </Mini>
          ),
        },
        {
          id: "dropdown",
          name: "Dropdown",
          preview: (
            <Mini>
              <div {...stylex.props(styles.dropStack)}>
                <Chip>
                  Actions
                  <Icon name="chevron" />
                </Chip>
                <div {...stylex.props(styles.menuList)}>
                  <span>Duplicate</span>
                  <span {...stylex.props(styles.menuDanger)}>Delete</span>
                </div>
              </div>
            </Mini>
          ),
        },
        {
          id: "menubar",
          name: "Menubar",
          preview: (
            <Mini>
              <div {...stylex.props(styles.menuBar)}>
                <span {...stylex.props(styles.menuItem)}>File</span>
                <span {...stylex.props(styles.menuItem)}>Edit</span>
              </div>
            </Mini>
          ),
        },
        {
          id: "pagination",
          name: "Pagination",
          preview: (
            <Mini>
              <div {...stylex.props(styles.pageRow)}>
                <span {...stylex.props(styles.pageBtn)}>Prev</span>
                <span {...stylex.props(styles.pageBtn)}>1</span>
                <span {...stylex.props(styles.pageBtn, styles.pageOn)}>2</span>
                <span {...stylex.props(styles.pageBtn)}>Next</span>
              </div>
            </Mini>
          ),
        },
        {
          id: "steps",
          name: "Steps",
          preview: (
            <Mini>
              <div {...stylex.props(styles.stepRow)}>
                <span {...stylex.props(styles.stepDot, styles.stepDone)}>1</span>
                <span {...stylex.props(styles.stepLine)} />
                <span {...stylex.props(styles.stepDot, styles.stepOn)}>2</span>
                <span {...stylex.props(styles.stepLine)} />
                <span {...stylex.props(styles.stepDot)}>3</span>
              </div>
            </Mini>
          ),
        },
        {
          id: "tabs",
          name: "Tabs",
          preview: (
            <Mini>
              <div {...stylex.props(styles.tabList)}>
                <span {...stylex.props(styles.tab, styles.tabOn)}>Account</span>
                <span {...stylex.props(styles.tab)}>Billing</span>
              </div>
            </Mini>
          ),
        },
        {
          id: "nav",
          name: "Navigation Menu",
          preview: (
            <Mini>
              <Inline gap="xs">
                <span {...stylex.props(styles.navItem)}>Overview</span>
                <span {...stylex.props(styles.navItem, styles.navOpen)}>
                  Library
                  <Icon name="chevron" />
                </span>
              </Inline>
            </Mini>
          ),
        },
        {
          id: "sidebar",
          name: "Sidebar",
          preview: (
            <Mini>
              <div {...stylex.props(styles.sidebarShell)}>
                <div {...stylex.props(styles.rail)}>
                  <span {...stylex.props(styles.railOn)}>
                    <Icon name="home" size={16} />
                  </span>
                  <Icon name="message" size={16} />
                  <Icon name="settings" size={16} />
                </div>
                <div {...stylex.props(styles.sidebarMain)} />
              </div>
            </Mini>
          ),
        },
        {
          id: "overflow",
          name: "Overflow",
          preview: (
            <Mini>
              <Inline gap="xs">
                <Chip>Edit</Chip>
                <Chip>
                  <Icon name="more" />
                </Chip>
              </Inline>
            </Mini>
          ),
        },
      ],
    },
    {
      id: "data-entry",
      title: "Data Entry",
      items: [
        {
          id: "checkbox",
          name: "Checkbox",
          preview: (
            <Mini>
              <Inline>
                <span {...stylex.props(styles.check)}>
                  <Icon name="check" size={12} />
                </span>
                <Body>Updates</Body>
              </Inline>
            </Mini>
          ),
        },
        {
          id: "switch",
          name: "Switch",
          preview: (
            <Mini>
              <Inline>
                <span {...stylex.props(styles.track)}>
                  <span {...stylex.props(styles.knob)} />
                </span>
                <Body>On</Body>
              </Inline>
            </Mini>
          ),
        },
        {
          id: "radio",
          name: "Radio",
          preview: (
            <Mini>
              <Inline>
                <span {...stylex.props(styles.radio, styles.radioOn)}>
                  <span {...stylex.props(styles.radioDot)} />
                </span>
                <Body>Standard</Body>
              </Inline>
            </Mini>
          ),
        },
        {
          id: "slider",
          name: "Slider",
          preview: (
            <Mini>
              <div {...stylex.props(styles.sliderTrack)}>
                <span {...stylex.props(styles.sliderFill)} />
                <span {...stylex.props(styles.sliderThumb)} />
              </div>
            </Mini>
          ),
        },
        {
          id: "text-field",
          name: "Input",
          preview: (
            <Mini>
              <div {...stylex.props(styles.field)}>
                <span {...stylex.props(styles.fieldLabel)}>Name</span>
                <span {...stylex.props(styles.fieldBox)}>Ada</span>
              </div>
            </Mini>
          ),
        },
        {
          id: "select",
          name: "Select",
          preview: (
            <Mini>
              <Chip>
                Pro
                <Icon name="chevron" />
              </Chip>
            </Mini>
          ),
        },
        {
          id: "combobox",
          name: "Combobox",
          preview: (
            <Mini>
              <Chip>
                Accra
                <Icon name="chevron" />
              </Chip>
            </Mini>
          ),
        },
        {
          id: "date-picker",
          name: "Date Picker",
          preview: (
            <Mini>
              <Chip>
                <Icon name="calendar" />
                Oct 15
              </Chip>
            </Mini>
          ),
        },
        {
          id: "otp",
          name: "Input OTP",
          preview: (
            <Mini>
              <Inline gap="xs">
                <span {...stylex.props(styles.otpBox)}>4</span>
                <span {...stylex.props(styles.otpBox)}>8</span>
                <span {...stylex.props(styles.otpBox)}>1</span>
                <span {...stylex.props(styles.otpBox)}>2</span>
              </Inline>
            </Mini>
          ),
        },
        {
          id: "input-group",
          name: "Input Group",
          preview: (
            <Mini>
              <div {...stylex.props(styles.groupField)}>
                <span {...stylex.props(styles.affix)}>https://</span>
                <span {...stylex.props(styles.affixMid)}>north</span>
                <span {...stylex.props(styles.affix)}>.studio</span>
              </div>
            </Mini>
          ),
        },
        {
          id: "rating",
          name: "Rate",
          preview: (
            <Mini>
              <Inline gap="xs">
                <StarMark filled />
                <StarMark filled />
                <StarMark filled />
                <StarMark filled />
                <StarMark filled={false} />
              </Inline>
            </Mini>
          ),
        },
        {
          id: "toggle",
          name: "Toggle",
          preview: (
            <Mini>
              <Chip tone="primary">Bold</Chip>
            </Mini>
          ),
        },
        {
          id: "attachment",
          name: "Upload",
          preview: (
            <Mini>
              <div {...stylex.props(styles.fileCard)}>
                <Icon name="file" size={20} />
                <span {...stylex.props(styles.fileMeta)}>
                  brief.pdf
                  <span {...stylex.props(styles.fileSub)}>PDF · 1.4 MB</span>
                </span>
              </div>
            </Mini>
          ),
        },
        {
          id: "form",
          name: "Form",
          href: "/forms",
          preview: (
            <Mini>
              <div {...stylex.props(styles.field)}>
                <span {...stylex.props(styles.fieldBox)}>ada@studio.dev</span>
                <Chip tone="primary">Sign in</Chip>
              </div>
            </Mini>
          ),
        },
      ],
    },
    {
      id: "data-display",
      title: "Data Display",
      items: [
        {
          id: "avatar",
          name: "Avatar",
          preview: (
            <Mini>
              <Avatar name="Ada Lovelace" />
            </Mini>
          ),
        },
        {
          id: "badge",
          name: "Badge",
          preview: (
            <Mini>
              <Badge count={3}>
                <Chip tone="primary">Inbox</Chip>
              </Badge>
            </Mini>
          ),
        },
        {
          id: "tag",
          name: "Tag",
          preview: (
            <Mini>
              <Tag status="success">Live</Tag>
            </Mini>
          ),
        },
        {
          id: "status",
          name: "Status",
          preview: (
            <Mini>
              <Status status="live">Live</Status>
            </Mini>
          ),
        },
        {
          id: "calendar",
          name: "Calendar",
          preview: (
            <Mini>
              <div {...stylex.props(styles.week)}>
                {Array.from({ length: 14 }, (_, i) => (
                  <span
                    key={i}
                    {...stylex.props(styles.calDay, i === 10 && styles.calOn)}
                  />
                ))}
              </div>
            </Mini>
          ),
        },
        {
          id: "card",
          name: "Card",
          href: "/patterns",
          preview: (
            <Mini>
              <div {...stylex.props(styles.fileCard)}>
                <span {...stylex.props(styles.fileMeta)}>
                  Workspace
                  <span {...stylex.props(styles.fileSub)}>12 members</span>
                </span>
                <Tag status="active">Pro</Tag>
              </div>
            </Mini>
          ),
        },
        {
          id: "carousel",
          name: "Carousel",
          preview: (
            <Mini>
              <Inline>
                <Icon name="chevronLeft" size={16} />
                <span {...stylex.props(styles.ratio)}>Slide</span>
                <Icon name="chevronRight" size={16} />
              </Inline>
            </Mini>
          ),
        },
        {
          id: "accordion",
          name: "Collapse",
          preview: (
            <Mini>
              <div {...stylex.props(styles.accordion)}>
                <span {...stylex.props(styles.accordionRow, styles.accordionOpen)}>
                  Tokens
                  <Icon name="chevron" size={14} />
                </span>
                <span {...stylex.props(styles.accordionRow)}>
                  Theme
                  <Icon name="chevron" size={14} />
                </span>
              </div>
            </Mini>
          ),
        },
        {
          id: "popover",
          name: "Popover",
          preview: (
            <Mini>
              <div {...stylex.props(styles.field)}>
                <Chip tone="subtle">Dimensions</Chip>
                <span {...stylex.props(styles.pop)}>Width 1440 · Height 900</span>
              </div>
            </Mini>
          ),
        },
        {
          id: "tooltip",
          name: "Tooltip",
          preview: (
            <Mini>
              <div {...stylex.props(styles.field)}>
                <span {...stylex.props(styles.tip)}>Shown on hover</span>
                <Chip tone="subtle">Hover</Chip>
              </div>
            </Mini>
          ),
        },
        {
          id: "hover-card",
          name: "Hover Card",
          preview: (
            <Mini>
              <div {...stylex.props(styles.field)}>
                <Body>Ada Lovelace</Body>
                <span {...stylex.props(styles.pop)}>Designer · North studio</span>
              </div>
            </Mini>
          ),
        },
        {
          id: "data-table",
          name: "Table",
          preview: (
            <Mini>
              <div {...stylex.props(styles.table)}>
                <span {...stylex.props(styles.th)}>Name</span>
                <span {...stylex.props(styles.th)}>Owner</span>
                <span>Billing</span>
                <span>Ada</span>
              </div>
            </Mini>
          ),
        },
        {
          id: "item",
          name: "List",
          preview: (
            <Mini>
              <Inline>
                <Avatar name="Ada Lovelace" size="sm" />
                <Body>Ada Lovelace</Body>
              </Inline>
            </Mini>
          ),
        },
        {
          id: "code-block",
          name: "Code Block",
          preview: (
            <Mini>
              <span {...stylex.props(styles.codeWell)}>&lt;Button /&gt;</span>
            </Mini>
          ),
        },
        {
          id: "sticker",
          name: "Sticker",
          preview: (
            <Mini>
              <Sticker tone="pink">New</Sticker>
            </Mini>
          ),
        },
        {
          id: "speech-bubble",
          name: "Speech",
          preview: (
            <Mini>
              <SpeechBubble>Buttons dip.</SpeechBubble>
            </Mini>
          ),
        },
        {
          id: "empty",
          name: "Empty",
          href: "/patterns",
          preview: (
            <Mini>
              <div {...stylex.props(styles.field)}>
                <Icon name="search" size={22} />
                <span {...stylex.props(styles.fieldLabel)}>Nothing matches</span>
              </div>
            </Mini>
          ),
        },
        {
          id: "marker",
          name: "Timeline",
          preview: (
            <Mini>
              <Inline>
                <Icon name="branch" />
                <Body>release-candidate</Body>
              </Inline>
            </Mini>
          ),
        },
      ],
    },
    {
      id: "feedback",
      title: "Feedback",
      items: [
        {
          id: "alert",
          name: "Alert",
          preview: (
            <Mini>
              <span {...stylex.props(styles.alertBox)}>
                <Icon name="info" size={16} />
                Workspace saved
              </span>
            </Mini>
          ),
        },
        {
          id: "section-message",
          name: "Message bar",
          preview: (
            <Mini>
              <span {...stylex.props(styles.noteBox)}>Published</span>
            </Mini>
          ),
        },
        {
          id: "drawer",
          name: "Drawer",
          preview: (
            <Mini>
              <div {...stylex.props(styles.sheet)}>
                <span {...stylex.props(styles.sheetPanel)} />
              </div>
            </Mini>
          ),
        },
        {
          id: "alert-dialog",
          name: "Modal",
          preview: (
            <Mini>
              <div {...stylex.props(styles.dialog)}>
                Archive workspace?
                <Chip tone="danger">Archive</Chip>
              </div>
            </Mini>
          ),
        },
        {
          id: "toast",
          name: "Toast",
          aliases: ["notification"],
          preview: (
            <Mini>
              <span {...stylex.props(styles.toastBar)}>
                <Icon name="check" size={14} />
                Changes saved
              </span>
            </Mini>
          ),
        },
        {
          id: "progress",
          name: "Progress",
          preview: (
            <Mini>
              <div style={{ width: 120 }}>
                <LinearProgress value={64} />
              </div>
            </Mini>
          ),
        },
        {
          id: "spinner",
          name: "Spin",
          preview: (
            <Mini>
              <Spinner size="large" />
            </Mini>
          ),
        },
        {
          id: "skeleton",
          name: "Skeleton",
          preview: (
            <Mini>
              <Inline>
                <Skeleton shape="circle" width={36} />
                <Skeleton width={88} />
              </Inline>
            </Mini>
          ),
        },
        {
          id: "message",
          name: "Chat",
          preview: (
            <Mini>
              <div {...stylex.props(styles.chat)}>
                <span {...stylex.props(styles.bubble, styles.them)}>Buttons dip.</span>
                <span {...stylex.props(styles.bubble, styles.us)}>Keep that.</span>
              </div>
            </Mini>
          ),
        },
      ],
    },
    {
      id: "other",
      title: "Other",
      items: [
        {
          id: "command",
          name: "Command",
          preview: (
            <Mini>
              <Shortcut keys={["⌘", "K"]} />
            </Mini>
          ),
        },
        {
          id: "context-menu",
          name: "Context Menu",
          preview: (
            <Mini>
              <div {...stylex.props(styles.menuList)}>
                <span>Duplicate</span>
                <span>Rename</span>
                <span {...stylex.props(styles.menuDanger)}>Archive</span>
              </div>
            </Mini>
          ),
        },
        {
          id: "collapsible",
          name: "Collapsible",
          preview: (
            <Mini>
              <div {...stylex.props(styles.accordion)}>
                <span {...stylex.props(styles.accordionRow)}>
                  Show notes
                  <Icon name="chevron" size={14} />
                </span>
              </div>
            </Mini>
          ),
        },
        {
          id: "button-group",
          name: "Button Group",
          preview: (
            <Mini>
              <Inline gap="xs">
                <Chip>Edit</Chip>
                <Chip tone="primary">Share</Chip>
              </Inline>
            </Mini>
          ),
        },
        {
          id: "direction",
          name: "Direction",
          preview: (
            <Mini>
              <span {...stylex.props(styles.rtl)} dir="rtl">
                مرحبا
              </span>
            </Mini>
          ),
        },
        {
          id: "faq",
          name: "FAQ",
          preview: (
            <Mini>
              <div {...stylex.props(styles.accordion)}>
                <span {...stylex.props(styles.accordionRow, styles.accordionOpen)}>
                  Where do tokens live?
                  <Icon name="chevron" size={14} />
                </span>
                <span {...stylex.props(styles.accordionRow)}>How do I theme?</span>
              </div>
            </Mini>
          ),
        },
        {
          id: "questionnaire",
          name: "Questionnaire",
          preview: (
            <Mini>
              <div {...stylex.props(styles.field)}>
                <span {...stylex.props(styles.fieldLabel)}>What next?</span>
                <Inline>
                  <span {...stylex.props(styles.radio, styles.radioOn)}>
                    <span {...stylex.props(styles.radioDot)} />
                  </span>
                  <Body>Delegation</Body>
                </Inline>
              </div>
            </Mini>
          ),
        },
        {
          id: "trace",
          name: "Trace",
          preview: (
            <Mini>
              <div {...stylex.props(styles.field)}>
                <Inline>
                  <Icon name="search" size={14} />
                  <Body>Searched</Body>
                </Inline>
                <Inline>
                  <Icon name="terminal" size={14} />
                  <Body>pnpm build</Body>
                </Inline>
              </div>
            </Mini>
          ),
        },
        {
          id: "shortcut",
          name: "Shortcut",
          preview: (
            <Mini>
              <Shortcut keys={["⌘", "S"]} />
            </Mini>
          ),
        },
      ],
    },
  ];
}

function PreviewCard({ item }: { item: Entry }) {
  const href = item.href ?? `#${item.id}`;
  const inner = (
    <>
      <div {...stylex.props(styles.preview)} inert>
        {item.preview}
      </div>
      <span {...stylex.props(styles.name)}>{item.name}</span>
    </>
  );

  if (href.startsWith("/")) {
    return (
      <NextLink href={href} {...stylex.props(styles.card)}>
        {inner}
      </NextLink>
    );
  }

  return (
    <a href={href} {...stylex.props(styles.card)}>
      {inner}
    </a>
  );
}

export function ComponentOverview() {
  const [query, setQuery] = useState("");
  const catalog = useMemo(() => groups(), []);
  const needle = query.trim().toLowerCase();
  const visible = useMemo(() => {
    if (!needle) return catalog;
    return catalog
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => {
          const haystack = [item.name, item.id, ...(item.aliases ?? [])]
            .join(" ")
            .toLowerCase();
          return haystack.includes(needle);
        }),
      }))
      .filter((group) => group.items.length > 0);
  }, [catalog, needle]);

  return (
    <div {...stylex.props(styles.page)}>
      <div {...stylex.props(styles.intro)}>
        <Heading size="xxl" withoutMargins>
          Components
        </Heading>
        <Body>
          Cartoon controls grouped the way you reach for them. Open a card to jump
          into the live demo.
        </Body>
        <div {...stylex.props(styles.search)}>
          <SearchInput
            label="Find a component"
            placeholder="Button, tabs, toast…"
            value={query}
            onChange={setQuery}
          />
        </div>
      </div>

      {needle ? null : (
        <nav aria-label="Component groups" {...stylex.props(styles.toc)}>
          {catalog.map((group) => (
            <a key={group.id} href={`#${group.id}`} {...stylex.props(styles.tocLink)}>
              {group.title}
            </a>
          ))}
        </nav>
      )}

      {visible.length === 0 ? (
        <p {...stylex.props(styles.empty)}>
          Nothing named “{query.trim()}”. Try button, table, or toast.
        </p>
      ) : (
        visible.map((group, index) => (
          <section key={group.id} id={group.id} {...stylex.props(styles.group)}>
            {index > 0 ? (
              <div aria-hidden="true" {...stylex.props(styles.groupBreak)}>
                <span {...stylex.props(styles.breakLine)} />
                <span {...stylex.props(styles.breakLine, styles.breakLineThin)} />
              </div>
            ) : null}
            <div {...stylex.props(styles.headingRow)}>
              <h3 {...stylex.props(styles.groupTitle)}>{group.title}</h3>
              <span {...stylex.props(styles.count)}>{group.items.length}</span>
            </div>
            <div {...stylex.props(styles.grid)}>
              {group.items.map((item) => (
                <PreviewCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
