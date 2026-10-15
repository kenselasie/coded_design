import * as stylex from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { shadows } from "../tokens/shadows.stylex";

const styles = stylex.create({
  group: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    borderRadius: radii.l,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundColor: colors.white,
    boxShadow: shadows.s1,
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 14px",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.smoke,
  },
  last: {
    borderBottomWidth: 0,
  },
  media: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    borderRadius: radii.s,
    backgroundColor: colors.snowDark,
    color: colors.black,
    flexShrink: 0,
  },
  copy: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    minWidth: 0,
    flexGrow: 1,
  },
  title: {
    margin: 0,
    color: colors.black,
    fontFamily: font.display,
    fontSize: font.s,
    fontWeight: font.semibold,
  },
  description: {
    margin: 0,
    color: colors.steel,
    fontFamily: font.family,
    fontSize: font.xs,
    lineHeight: 1.4,
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexShrink: 0,
  },
});

export function ItemGroup({ children }: { children: ReactNode }) {
  return <div role="list" {...stylex.props(styles.group)}>{children}</div>;
}

export function Item({
  title,
  description,
  media,
  actions,
  last = false,
}: {
  title: string;
  description?: string;
  media?: ReactNode;
  actions?: ReactNode;
  last?: boolean;
}) {
  return (
    <div role="listitem" {...stylex.props(styles.item, last && styles.last)}>
      {media ? <span {...stylex.props(styles.media)}>{media}</span> : null}
      <div {...stylex.props(styles.copy)}>
        <p {...stylex.props(styles.title)}>{title}</p>
        {description ? <p {...stylex.props(styles.description)}>{description}</p> : null}
      </div>
      {actions ? <div {...stylex.props(styles.actions)}>{actions}</div> : null}
    </div>
  );
}
