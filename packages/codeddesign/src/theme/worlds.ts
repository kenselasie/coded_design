import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens/colors.stylex";
import { radii } from "../tokens/space.stylex";
import { shadows } from "../tokens/shadows.stylex";
import { stroke } from "../tokens/stroke.stylex";
import { font } from "../tokens/typography.stylex";

export type WorldId = "codedcartoony" | "codedmarker" | "codededwadzi";

export const worldIds = ["codedcartoony", "codedmarker", "codededwadzi"] as const;

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
  line: ink,
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
  codeBg: ink,
  codeFg: cream,
  codeRule: ink,
});

export const markerDark = stylex.createTheme(colors, {
  background: "rgba(12,12,12,1)",
  white: "rgba(20,20,20,1)",
  black: cream,
  line: cream,
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
  codeBg: "rgba(8,8,8,1)",
  codeFg: cream,
  codeRule: "rgba(40,40,40,1)",
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
  control: "4px",
});

export const markerStroke = stylex.createTheme(stroke, {
  width: "2px",
  hairline: "1px",
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

/** Soft editorial paper — Fraunces + Inter + JetBrains Mono, teal/coral/forest. */
export const edwaLight = stylex.createTheme(colors, {
  background: "rgba(248,248,247,1)",
  white: "rgba(255,255,255,1)",
  black: "rgba(26,26,26,1)",
  line: "rgba(232,232,230,1)",
  steel: "rgba(74,74,74,1)",
  concrete: "rgba(110,110,110,1)",
  blue: "rgba(0,151,136,1)",
  blueLight: "rgba(204,236,232,1)",
  blueDark: "rgba(0,110,100,1)",
  whale: "rgba(45,62,51,1)",
  whaleLight: "rgba(90,110,98,1)",
  whaleDark: "rgba(28,40,32,1)",
  smoke: "rgba(232,232,230,1)",
  smokeDark: "rgba(220,220,216,1)",
  smokeDarker: "rgba(196,196,190,1)",
  snow: "rgba(255,255,255,1)",
  snowDark: "rgba(242,242,240,1)",
  snowDarker: "rgba(230,230,226,1)",
  success: "rgba(0,151,136,1)",
  danger: "rgba(200,48,48,1)",
  dangerDark: "rgba(160,28,28,1)",
  warning: "rgba(229,95,61,1)",
  warningDark: "rgba(184,64,36,1)",
  green: "rgba(0,151,136,1)",
  greenLight: "rgba(204,236,232,1)",
  greenDark: "rgba(0,110,100,1)",
  turquoise: "rgba(0,151,136,1)",
  turquoiseLight: "rgba(204,236,232,1)",
  turquoiseDark: "rgba(0,110,100,1)",
  pink: "rgba(229,95,61,1)",
  pinkLight: "rgba(204,236,232,1)",
  pinkDark: "rgba(184,64,36,1)",
  onAccent: "rgba(255,252,248,1)",
  onPastel: "rgba(26,26,26,1)",
  well: "rgba(28,40,32,1)",
  onWell: "rgba(255,252,248,1)",
  codeBg: "rgba(242,242,240,1)",
  codeFg: "rgba(26,26,26,1)",
  codeRule: "rgba(220,220,216,1)",
});

export const edwaDark = stylex.createTheme(colors, {
  background: "rgba(18,20,20,1)",
  white: "rgba(28,30,30,1)",
  black: "rgba(244,242,238,1)",
  line: "rgba(42,44,44,1)",
  steel: "rgba(200,198,192,1)",
  concrete: "rgba(160,158,152,1)",
  blue: "rgba(0,151,136,1)",
  blueLight: "rgba(120,210,200,1)",
  blueDark: "rgba(0,110,100,1)",
  whale: "rgba(48,54,50,1)",
  whaleLight: "rgba(72,80,74,1)",
  whaleDark: "rgba(10,12,12,1)",
  smoke: "rgba(42,44,44,1)",
  smokeDark: "rgba(54,56,56,1)",
  smokeDarker: "rgba(72,74,74,1)",
  snow: "rgba(34,36,36,1)",
  snowDark: "rgba(42,44,44,1)",
  snowDarker: "rgba(54,56,56,1)",
  success: "rgba(0,151,136,1)",
  danger: "rgba(255,120,110,1)",
  dangerDark: "rgba(255,150,140,1)",
  warning: "rgba(229,95,61,1)",
  warningDark: "rgba(255,150,120,1)",
  green: "rgba(0,151,136,1)",
  greenLight: "rgba(120,210,200,1)",
  greenDark: "rgba(0,110,100,1)",
  turquoise: "rgba(0,151,136,1)",
  turquoiseLight: "rgba(120,210,200,1)",
  turquoiseDark: "rgba(0,110,100,1)",
  pink: "rgba(229,95,61,1)",
  pinkLight: "rgba(120,210,200,1)",
  pinkDark: "rgba(255,150,120,1)",
  onAccent: "rgba(255,252,248,1)",
  onPastel: "rgba(26,26,26,1)",
  well: "rgba(10,12,12,1)",
  onWell: "rgba(255,252,248,1)",
  codeBg: "rgba(34,36,36,1)",
  codeFg: "rgba(255,252,248,1)",
  codeRule: "rgba(54,56,56,1)",
});

export const edwaType = stylex.createTheme(font, {
  family: "var(--font-inter), Inter, system-ui, sans-serif",
  display: "var(--font-fraunces), Fraunces, \"Times New Roman\", serif",
  mono: "var(--font-jetbrains-mono), \"JetBrains Mono\", ui-monospace, monospace",
  xxxxl: "48px",
  xxxl: "40px",
  xxl: "30px",
  xl: "22px",
  l: "18px",
  m: "16px",
  s: "14px",
  xs: "12px",
  xxs: "10px",
  regular: "400",
  medium: "500",
  semibold: "600",
  /** Display heads sit at regular weight; maps Heading/Title `bold`. */
  bold: "400",
});

export const edwaRadii = stylex.createTheme(radii, {
  s: "8px",
  m: "12px",
  l: "16px",
  pill: "999px",
  /** Buttons stay modestly rounded — not pills. */
  control: "8px",
});

export const edwaStroke = stylex.createTheme(stroke, {
  width: "1.5px",
  hairline: "1px",
});

export const edwaShadows = stylex.createTheme(shadows, {
  s1: "0 4px 16px rgba(26,26,26,0.06)",
  s2: "0 8px 24px rgba(26,26,26,0.08)",
  s3: "0 14px 36px rgba(26,26,26,0.1)",
  s4: "0 22px 48px rgba(26,26,26,0.12)",
});

export const edwaShadowsDark = stylex.createTheme(shadows, {
  s1: "0 4px 16px rgba(0,0,0,0.35)",
  s2: "0 8px 24px rgba(0,0,0,0.4)",
  s3: "0 14px 36px rgba(0,0,0,0.45)",
  s4: "0 22px 48px rgba(0,0,0,0.5)",
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
  codededwadzi: {
    label: "CodedEdwadzi",
    credit: "Fraunces, Inter, JetBrains Mono. Soft teal and coral paper",
  },
};
