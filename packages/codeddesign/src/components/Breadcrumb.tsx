import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";

const styles = stylex.create({
  list: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "8px",
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  item: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.s,
  },
  link: {
    color: colors.blueDark,
    fontWeight: font.semibold,
    textDecoration: "none",
    textUnderlineOffset: "3px",
    ":hover": {
      textDecoration: "underline",
    },
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blueDark,
      outlineOffset: "3px",
      borderRadius: "6px",
    },
  },
  current: {
    fontFamily: font.display,
    fontWeight: font.semibold,
  },
  mark: {
    display: "block",
    color: colors.pink,
  },
});

function Chevron() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" {...stylex.props(styles.mark)}>
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

export function Breadcrumb({
  items,
  label = "Breadcrumb",
}: {
  items: { label: string; href?: string }[];
  label?: string;
}) {
  return (
    <nav aria-label={label}>
      <ol {...stylex.props(styles.list)}>
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.label} {...stylex.props(styles.item)}>
              {index > 0 ? <Chevron /> : null}
              {item.href && !last ? (
                <a href={item.href} {...stylex.props(styles.link)}>
                  {item.label}
                </a>
              ) : (
                <span aria-current={last ? "page" : undefined} {...stylex.props(styles.current)}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
