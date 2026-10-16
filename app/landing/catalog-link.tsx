import * as stylex from "@stylexjs/stylex";
import NextLink from "next/link";
import type { ReactNode } from "react";
import { Link } from "codeddesign";
import { colors } from "codeddesign/tokens/colors.stylex";
import { font } from "codeddesign/tokens/typography.stylex";

const styles = stylex.create({
  link: {
    color: colors.blueDark,
    fontFamily: font.family,
    fontWeight: font.medium,
    textDecoration: "underline",
    textUnderlineOffset: "3px",
    ":hover": {
      color: colors.blue,
    },
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blue,
      outlineOffset: "2px",
      borderRadius: "2px",
    },
  },
});

export function CatalogLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  if (href.startsWith("/")) {
    return (
      <NextLink href={href} {...stylex.props(styles.link)}>
        {children}
      </NextLink>
    );
  }
  return <Link href={href}>{children}</Link>;
}
