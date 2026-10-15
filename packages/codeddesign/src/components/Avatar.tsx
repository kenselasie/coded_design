import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";

const palette = [
  colors.blue,
  colors.turquoise,
  colors.green,
  colors.pink,
  colors.pinkDark,
  colors.warningDark,
] as const;

const styles = stylex.create({
  avatar: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: "50%",
    color: colors.onAccent,
    fontFamily: font.family,
    fontWeight: font.semibold,
    flexShrink: 0,
    backgroundColor: colors.whale,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  sm: { width: "28px", height: "28px", fontSize: font.xxs },
  md: { width: "36px", height: "36px", fontSize: font.xs },
  lg: { width: "48px", height: "48px", fontSize: font.m },
  c0: { backgroundColor: palette[0] },
  c1: { backgroundColor: palette[1] },
  c2: { backgroundColor: palette[2] },
  c3: { backgroundColor: palette[3] },
  c4: { backgroundColor: palette[4] },
  c5: { backgroundColor: palette[5] },
});

const colorStyles = [
  styles.c0,
  styles.c1,
  styles.c2,
  styles.c3,
  styles.c4,
  styles.c5,
] as const;

function initials(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("") || "?";
}

function hash(name: string) {
  return [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

export function Avatar({
  name,
  src,
  size = "md",
}: {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
}) {
  const color = colorStyles[hash(name) % colorStyles.length];
  return (
    <span
      role="img"
      aria-label={name}
      {...stylex.props(styles.avatar, styles[size], !src && color)}
    >
      {src ? (
        <img src={src} alt="" {...stylex.props(styles.image)} />
      ) : (
        initials(name)
      )}
    </span>
  );
}
