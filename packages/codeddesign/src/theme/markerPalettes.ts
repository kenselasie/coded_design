import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens/colors.stylex";
import { markerDark, markerLight } from "./worlds";

export type MarkerPaletteId = "highlighter" | "magenta" | "cyan" | "amber";

export const markerPaletteIds = ["highlighter", "magenta", "cyan", "amber"] as const;

const ink = "rgba(17,17,17,1)";
const cream = "rgba(244,244,238,1)";
const card = "rgba(255,254,248,1)";
const lime = "rgba(210,255,58,1)";
const limeWash = "rgba(232,255,138,1)";
const limeDeep = "rgba(158,208,0,1)";
const magenta = "rgba(255,58,224,1)";
const magentaWash = "rgba(255,168,240,1)";
const magentaDeep = "rgba(196,0,168,1)";
const cyan = "rgba(58,214,255,1)";
const cyanWash = "rgba(138,232,255,1)";
const cyanDeep = "rgba(0,140,176,1)";
const yellow = "rgba(255,225,74,1)";
const yellowWash = "rgba(255,240,150,1)";
const yellowDeep = "rgba(138,112,0,1)";
const danger = "rgba(255,59,48,1)";
const dangerDeep = "rgba(176,0,16,1)";

const night = "rgba(12,12,12,1)";
const nightCard = "rgba(20,20,20,1)";
const nightSteel = "rgba(228,228,220,1)";
const nightConcrete = "rgba(196,196,188,1)";
const nightWhale = "rgba(40,40,40,1)";
const nightWhaleLight = "rgba(70,70,70,1)";
const nightWhaleDark = "rgba(8,8,8,1)";
const nightSmoke = "rgba(42,42,42,1)";
const nightSmokeDark = "rgba(58,58,58,1)";
const nightSmokeDarker = "rgba(78,78,78,1)";
const nightSnow = "rgba(28,28,28,1)";
const nightSnowDark = "rgba(36,36,36,1)";
const nightSnowDarker = "rgba(48,48,48,1)";
const nightDanger = "rgba(255,90,80,1)";
const nightDangerDark = "rgba(255,140,130,1)";

/** Magenta lead. Lime, cyan, and yellow stay in the block set. */
export const markerMagentaLight = stylex.createTheme(colors, {
  background: "rgba(247,241,244,1)",
  white: card,
  black: ink,
  line: ink,
  steel: "rgba(46,46,46,1)",
  concrete: "rgba(74,74,74,1)",
  blue: magenta,
  blueLight: magentaWash,
  blueDark: magentaDeep,
  whale: ink,
  whaleLight: "rgba(58,58,58,1)",
  whaleDark: ink,
  smoke: "rgba(236,224,230,1)",
  smokeDark: "rgba(220,204,212,1)",
  smokeDarker: "rgba(196,176,186,1)",
  snow: card,
  snowDark: "rgba(246,234,240,1)",
  snowDarker: "rgba(232,214,222,1)",
  success: lime,
  danger,
  dangerDark: dangerDeep,
  warning: yellow,
  warningDark: "rgba(230,194,0,1)",
  green: lime,
  greenLight: limeWash,
  greenDark: limeDeep,
  turquoise: cyan,
  turquoiseLight: cyanWash,
  turquoiseDark: cyanDeep,
  pink: magenta,
  pinkLight: magenta,
  pinkDark: magentaDeep,
  onAccent: ink,
  onPastel: ink,
  well: ink,
  onWell: cream,
  codeBg: ink,
  codeFg: cream,
  codeRule: ink,
});

export const markerMagentaDark = stylex.createTheme(colors, {
  background: night,
  white: nightCard,
  black: cream,
  line: cream,
  steel: nightSteel,
  concrete: nightConcrete,
  blue: magenta,
  blueLight: magentaWash,
  blueDark: "rgba(255,120,230,1)",
  whale: nightWhale,
  whaleLight: nightWhaleLight,
  whaleDark: nightWhaleDark,
  smoke: nightSmoke,
  smokeDark: nightSmokeDark,
  smokeDarker: nightSmokeDarker,
  snow: nightSnow,
  snowDark: nightSnowDark,
  snowDarker: nightSnowDarker,
  success: lime,
  danger: nightDanger,
  dangerDark: nightDangerDark,
  warning: yellow,
  warningDark: "rgba(255,210,70,1)",
  green: lime,
  greenLight: limeWash,
  greenDark: "rgba(184,230,40,1)",
  turquoise: cyan,
  turquoiseLight: cyanWash,
  turquoiseDark: "rgba(0,180,224,1)",
  pink: magenta,
  pinkLight: magenta,
  pinkDark: "rgba(255,120,230,1)",
  onAccent: ink,
  onPastel: ink,
  well: nightWhaleDark,
  onWell: cream,
  codeBg: nightWhaleDark,
  codeFg: cream,
  codeRule: nightWhale,
});

/** Cyan lead. Lime, magenta, and yellow stay in the block set. */
export const markerCyanLight = stylex.createTheme(colors, {
  background: "rgba(240,246,246,1)",
  white: card,
  black: ink,
  line: ink,
  steel: "rgba(46,46,46,1)",
  concrete: "rgba(74,74,74,1)",
  blue: cyan,
  blueLight: cyanWash,
  blueDark: cyanDeep,
  whale: ink,
  whaleLight: "rgba(58,58,58,1)",
  whaleDark: ink,
  smoke: "rgba(220,232,232,1)",
  smokeDark: "rgba(204,220,220,1)",
  smokeDarker: "rgba(176,196,196,1)",
  snow: card,
  snowDark: "rgba(232,244,244,1)",
  snowDarker: "rgba(214,230,230,1)",
  success: lime,
  danger,
  dangerDark: dangerDeep,
  warning: yellow,
  warningDark: "rgba(230,194,0,1)",
  green: lime,
  greenLight: limeWash,
  greenDark: limeDeep,
  turquoise: cyan,
  turquoiseLight: cyanWash,
  turquoiseDark: cyanDeep,
  pink: magenta,
  pinkLight: cyan,
  pinkDark: magentaDeep,
  onAccent: ink,
  onPastel: ink,
  well: ink,
  onWell: cream,
  codeBg: ink,
  codeFg: cream,
  codeRule: ink,
});

export const markerCyanDark = stylex.createTheme(colors, {
  background: night,
  white: nightCard,
  black: cream,
  line: cream,
  steel: nightSteel,
  concrete: nightConcrete,
  blue: cyan,
  blueLight: cyanWash,
  blueDark: "rgba(0,180,224,1)",
  whale: nightWhale,
  whaleLight: nightWhaleLight,
  whaleDark: nightWhaleDark,
  smoke: nightSmoke,
  smokeDark: nightSmokeDark,
  smokeDarker: nightSmokeDarker,
  snow: nightSnow,
  snowDark: nightSnowDark,
  snowDarker: nightSnowDarker,
  success: lime,
  danger: nightDanger,
  dangerDark: nightDangerDark,
  warning: yellow,
  warningDark: "rgba(255,210,70,1)",
  green: lime,
  greenLight: limeWash,
  greenDark: "rgba(184,230,40,1)",
  turquoise: cyan,
  turquoiseLight: cyanWash,
  turquoiseDark: "rgba(0,180,224,1)",
  pink: magenta,
  pinkLight: cyan,
  pinkDark: magentaDeep,
  onAccent: ink,
  onPastel: ink,
  well: nightWhaleDark,
  onWell: cream,
  codeBg: nightWhaleDark,
  codeFg: cream,
  codeRule: nightWhale,
});

/** Yellow lead. Lime, magenta, and cyan stay in the block set. */
export const markerAmberLight = stylex.createTheme(colors, {
  background: "rgba(246,243,230,1)",
  white: "rgba(255,254,246,1)",
  black: ink,
  line: ink,
  steel: "rgba(46,46,46,1)",
  concrete: "rgba(74,74,74,1)",
  blue: yellow,
  blueLight: yellowWash,
  blueDark: yellowDeep,
  whale: ink,
  whaleLight: "rgba(58,58,58,1)",
  whaleDark: ink,
  smoke: "rgba(232,226,206,1)",
  smokeDark: "rgba(216,208,184,1)",
  smokeDarker: "rgba(190,180,150,1)",
  snow: "rgba(255,254,246,1)",
  snowDark: "rgba(244,238,214,1)",
  snowDarker: "rgba(228,218,186,1)",
  success: lime,
  danger,
  dangerDark: dangerDeep,
  warning: yellow,
  warningDark: yellowDeep,
  green: lime,
  greenLight: limeWash,
  greenDark: limeDeep,
  turquoise: cyan,
  turquoiseLight: cyanWash,
  turquoiseDark: cyanDeep,
  pink: magenta,
  pinkLight: yellow,
  pinkDark: magentaDeep,
  onAccent: ink,
  onPastel: ink,
  well: ink,
  onWell: cream,
  codeBg: ink,
  codeFg: cream,
  codeRule: ink,
});

export const markerAmberDark = stylex.createTheme(colors, {
  background: night,
  white: nightCard,
  black: cream,
  line: cream,
  steel: nightSteel,
  concrete: nightConcrete,
  blue: yellow,
  blueLight: yellowWash,
  blueDark: "rgba(230,194,0,1)",
  whale: nightWhale,
  whaleLight: nightWhaleLight,
  whaleDark: nightWhaleDark,
  smoke: nightSmoke,
  smokeDark: nightSmokeDark,
  smokeDarker: nightSmokeDarker,
  snow: nightSnow,
  snowDark: nightSnowDark,
  snowDarker: nightSnowDarker,
  success: lime,
  danger: nightDanger,
  dangerDark: nightDangerDark,
  warning: yellow,
  warningDark: "rgba(255,210,70,1)",
  green: lime,
  greenLight: limeWash,
  greenDark: "rgba(184,230,40,1)",
  turquoise: cyan,
  turquoiseLight: cyanWash,
  turquoiseDark: "rgba(0,180,224,1)",
  pink: magenta,
  pinkLight: yellow,
  pinkDark: magentaDeep,
  onAccent: ink,
  onPastel: ink,
  well: nightWhaleDark,
  onWell: cream,
  codeBg: nightWhaleDark,
  codeFg: cream,
  codeRule: nightWhale,
});

export const markerPalettes: Record<
  MarkerPaletteId,
  {
    label: string;
    credit: string;
    preview: { canvas: string; accent: string };
    light: typeof markerLight;
    dark: typeof markerDark;
  }
> = {
  highlighter: {
    label: "Highlighter",
    credit: "Lime, magenta, cyan, and yellow on newsprint",
    preview: { canvas: "#F4F4EE", accent: "#D2FF3A" },
    light: markerLight,
    dark: markerDark,
  },
  magenta: {
    label: "Magenta",
    credit: "Magenta lead, with lime, cyan, and yellow",
    preview: { canvas: "#F7F1F4", accent: "#FF3AE0" },
    light: markerMagentaLight,
    dark: markerMagentaDark,
  },
  cyan: {
    label: "Cyan",
    credit: "Cyan lead, with lime, magenta, and yellow",
    preview: { canvas: "#F0F6F6", accent: "#3AD6FF" },
    light: markerCyanLight,
    dark: markerCyanDark,
  },
  amber: {
    label: "Amber",
    credit: "Yellow lead, with lime, magenta, and cyan",
    preview: { canvas: "#F6F3E6", accent: "#FFE14A" },
    light: markerAmberLight,
    dark: markerAmberDark,
  },
};
