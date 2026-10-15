import * as stylex from "@stylexjs/stylex";
import { Body, Heading, Stack, Title } from "codeddesign";
import { colors } from "codeddesign/tokens/colors.stylex";
import { font } from "codeddesign/tokens/typography.stylex";
import { shadows } from "codeddesign/tokens/shadows.stylex";

const colorNames = [
  "black",
  "steel",
  "concrete",
  "blue",
  "blueLight",
  "blueDark",
  "whale",
  "whaleLight",
  "whaleDark",
  "smoke",
  "smokeDark",
  "smokeDarker",
  "snow",
  "snowDark",
  "snowDarker",
  "success",
  "danger",
  "warning",
  "green",
  "turquoise",
  "pink",
  "white",
  "background",
  "onAccent",
  "onPastel",
  "well",
  "onWell",
] as const;

const styles = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
    gap: "12px",
  },
  swatch: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  chip: {
    height: "64px",
    borderRadius: "8px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.smoke,
  },
  name: {
    color: colors.steel,
    fontFamily: font.mono,
    fontSize: font.xs,
  },
  black: { backgroundColor: colors.black },
  steel: { backgroundColor: colors.steel },
  concrete: { backgroundColor: colors.concrete },
  blue: { backgroundColor: colors.blue },
  blueLight: { backgroundColor: colors.blueLight },
  blueDark: { backgroundColor: colors.blueDark },
  whale: { backgroundColor: colors.whale },
  whaleLight: { backgroundColor: colors.whaleLight },
  whaleDark: { backgroundColor: colors.whaleDark },
  smoke: { backgroundColor: colors.smoke },
  smokeDark: { backgroundColor: colors.smokeDark },
  smokeDarker: { backgroundColor: colors.smokeDarker },
  snow: { backgroundColor: colors.snow },
  snowDark: { backgroundColor: colors.snowDark },
  snowDarker: { backgroundColor: colors.snowDarker },
  success: { backgroundColor: colors.success },
  danger: { backgroundColor: colors.danger },
  warning: { backgroundColor: colors.warning },
  green: { backgroundColor: colors.green },
  turquoise: { backgroundColor: colors.turquoise },
  pink: { backgroundColor: colors.pink },
  white: { backgroundColor: colors.white },
  background: { backgroundColor: colors.background },
  onAccent: { backgroundColor: colors.onAccent },
  onPastel: { backgroundColor: colors.onPastel },
  well: { backgroundColor: colors.well },
  onWell: { backgroundColor: colors.onWell },
  type: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  sample: {
    margin: 0,
    color: colors.black,
    fontFamily: font.family,
  },
  xxxxl: { fontSize: font.xxxxl },
  xxxl: { fontSize: font.xxxl },
  xxl: { fontSize: font.xxl },
  xl: { fontSize: font.xl },
  l: { fontSize: font.l },
  m: { fontSize: font.m },
  s: { fontSize: font.s },
  xs: { fontSize: font.xs },
  shadows: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
  },
  shadow: {
    width: "140px",
    height: "88px",
    borderRadius: "12px",
    backgroundColor: colors.white,
  },
  s1: { boxShadow: shadows.s1 },
  s2: { boxShadow: shadows.s2 },
  s3: { boxShadow: shadows.s3 },
  s4: { boxShadow: shadows.s4 },
});

const chips = {
  black: styles.black,
  steel: styles.steel,
  concrete: styles.concrete,
  blue: styles.blue,
  blueLight: styles.blueLight,
  blueDark: styles.blueDark,
  whale: styles.whale,
  whaleLight: styles.whaleLight,
  whaleDark: styles.whaleDark,
  smoke: styles.smoke,
  smokeDark: styles.smokeDark,
  smokeDarker: styles.smokeDarker,
  snow: styles.snow,
  snowDark: styles.snowDark,
  snowDarker: styles.snowDarker,
  success: styles.success,
  danger: styles.danger,
  warning: styles.warning,
  green: styles.green,
  turquoise: styles.turquoise,
  pink: styles.pink,
  white: styles.white,
  background: styles.background,
  onAccent: styles.onAccent,
  onPastel: styles.onPastel,
  well: styles.well,
  onWell: styles.onWell,
} as const;

const typeScale = [
  ["xxxxl", styles.xxxxl],
  ["xxxl", styles.xxxl],
  ["xxl", styles.xxl],
  ["xl", styles.xl],
  ["l", styles.l],
  ["m", styles.m],
  ["s", styles.s],
  ["xs", styles.xs],
] as const;

const elevations = [
  ["shadow 1", styles.s1],
  ["shadow 2", styles.s2],
  ["shadow 3", styles.s3],
  ["shadow 4", styles.s4],
] as const;

export default function FoundationsPage() {
  return (
    <Stack gap="xl">
      <Stack gap="xs">
        <Heading size="xxl" withoutMargins>
          Foundations
        </Heading>
        <Body>
          Color, type, and elevation. Switch palettes and light/dark from the top
          bar — the same tokens remap.
        </Body>
      </Stack>
      <section>
        <Title>Color</Title>
        <div {...stylex.props(styles.grid)}>
          {colorNames.map((name) => (
            <div key={name} {...stylex.props(styles.swatch)}>
              <div {...stylex.props(styles.chip, chips[name])} />
              <span {...stylex.props(styles.name)}>{name}</span>
            </div>
          ))}
        </div>
      </section>
      <section {...stylex.props(styles.type)}>
        <Title>Type</Title>
        {typeScale.map(([name, scale]) => (
          <p key={name} {...stylex.props(styles.sample, scale)}>
            {name} Mulish
          </p>
        ))}
      </section>
      <section>
        <Title>Elevation</Title>
        <div {...stylex.props(styles.shadows)}>
          {elevations.map(([name, shadow]) => (
            <div key={name} {...stylex.props(styles.shadow, shadow)} />
          ))}
        </div>
      </section>
    </Stack>
  );
}
