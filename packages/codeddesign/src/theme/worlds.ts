import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens/colors.stylex";
import { radii } from "../tokens/space.stylex";
import { shadows } from "../tokens/shadows.stylex";
import { font } from "../tokens/typography.stylex";

export type WorldId = "codedcartoony" | "codedmarker";

export const worldIds = ["codedcartoony", "codedmarker"] as const;

const ink = "rgba(17,17,17,1)";
const paper = "rgba(244,244,238,1)";
const card = "rgba(255,254,248,1)";
const lime = "rgba(210,255,58,1)";
const magenta = "rgba(255,58,224,1)";
const cyan = "rgba(58,214,255,1)";
const yellow = "rgba(255,225,74,1)";
const cream = "rgba(244,244,238,1)";

/** Highlighter blocks, square corners, hard ink shadow. */
export const markerLight = stylex.createTheme(colors, {
  background: paper,
  white: card,
  black: ink,
  steel: "rgba(46,46,46,1)",
  concrete: "rgba(74,74,74,1)",
  blue: ink,
  blueLight: lime,
  blueDark: "rgba(0,0,0,1)",
  whale: ink,
  whaleLight: "rgba(58,58,58,1)",
  whaleDark: ink,
  smoke: "rgba(230,230,224,1)",
  smokeDark: "rgba(212,212,204,1)",
  smokeDarker: "rgba(189,189,180,1)",
  snow: card,
  snowDark: "rgba(240,240,232,1)",
  snowDarker: "rgba(228,228,218,1)",
  success: lime,
  danger: "rgba(225,6,0,1)",
  dangerDark: "rgba(176,0,32,1)",
  warning: yellow,
  warningDark: "rgba(230,194,0,1)",
  green: lime,
  greenLight: "rgba(232,255,138,1)",
  greenDark: "rgba(158,208,0,1)",
  turquoise: cyan,
  turquoiseLight: "rgba(138,232,255,1)",
  turquoiseDark: "rgba(0,180,224,1)",
  pink: magenta,
  pinkLight: lime,
  pinkDark: "rgba(224,0,192,1)",
  onAccent: cream,
  onPastel: ink,
  well: ink,
  onWell: cream,
});

export const markerDark = stylex.createTheme(colors, {
  background: "rgba(12,12,12,1)",
  white: "rgba(20,20,20,1)",
  black: cream,
  steel: "rgba(228,228,220,1)",
  concrete: "rgba(196,196,188,1)",
  blue: lime,
  blueLight: "rgba(232,255,138,1)",
  blueDark: "rgba(184,230,40,1)",
  whale: "rgba(40,40,40,1)",
  whaleLight: "rgba(70,70,70,1)",
  whaleDark: "rgba(8,8,8,1)",
  smoke: "rgba(42,42,42,1)",
  smokeDark: "rgba(58,58,58,1)",
  smokeDarker: "rgba(78,78,78,1)",
  snow: "rgba(28,28,28,1)",
  snowDark: "rgba(36,36,36,1)",
  snowDarker: "rgba(48,48,48,1)",
  success: lime,
  danger: "rgba(255,90,80,1)",
  dangerDark: "rgba(255,140,130,1)",
  warning: yellow,
  warningDark: "rgba(255,210,70,1)",
  green: lime,
  greenLight: "rgba(232,255,138,1)",
  greenDark: "rgba(184,230,40,1)",
  turquoise: cyan,
  turquoiseLight: "rgba(138,232,255,1)",
  turquoiseDark: "rgba(0,180,224,1)",
  pink: magenta,
  pinkLight: lime,
  pinkDark: "rgba(255,120,230,1)",
  onAccent: ink,
  onPastel: ink,
  well: "rgba(8,8,8,1)",
  onWell: cream,
});

export const markerType = stylex.createTheme(font, {
  family: "var(--font-archivo), Archivo, sans-serif",
  display: "var(--font-archivo), Archivo, sans-serif",
  mono: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
  xxxxl: "46px",
  xxxl: "38px",
  xxl: "28px",
  xl: "20px",
  l: "18px",
  m: "16px",
  s: "14px",
  xs: "12px",
  xxs: "10px",
  regular: "400",
  medium: "500",
  semibold: "800",
  bold: "900",
});

export const markerRadii = stylex.createTheme(radii, {
  s: "2px",
  m: "4px",
  l: "4px",
  pill: "4px",
});

export const markerShadows = stylex.createTheme(shadows, {
  s1: "3px 3px 0 rgba(17,17,17,1)",
  s2: "4px 4px 0 rgba(17,17,17,1)",
  s3: "5px 5px 0 rgba(17,17,17,1)",
  s4: "7px 7px 0 rgba(17,17,17,1)",
});

export const markerShadowsDark = stylex.createTheme(shadows, {
  s1: "3px 3px 0 rgba(244,244,238,1)",
  s2: "4px 4px 0 rgba(244,244,238,1)",
  s3: "5px 5px 0 rgba(244,244,238,1)",
  s4: "7px 7px 0 rgba(244,244,238,1)",
});

export const worlds: Record<
  WorldId,
  { label: string; credit: string }
> = {
  codedcartoony: {
    label: "CodedCartoony",
    credit: "Fredoka, Nunito, plush shadows",
  },
  codedmarker: {
    label: "CodedMarker",
    credit: "Highlighter blocks and a hard ink shadow",
  },
};
