"use client";

import * as stylex from "@stylexjs/stylex";
import {
  useState,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { radii } from "../tokens/space.stylex";
import { stroke } from "../tokens/stroke.stylex";
import { Button } from "./Button";
import { Icon, type IconName } from "./Icon";

export type AppSidebarItem = {
  label: string;
  icon?: IconName;
  href?: string;
};

export type AppSidebarGroup = {
  /** Uppercase section label. Omit for a lone top item. */
  label?: string;
  items: AppSidebarItem[];
};

export type AppSidebarLinkProps = {
  href: string;
  children: ReactNode;
  "aria-current"?: "page";
  onClick?: () => void;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children" | "aria-current">;

const styles = stylex.create({
  shell: {
    display: "flex",
    minHeight: "420px",
    overflow: "hidden",
    borderRadius: radii.l,
    borderWidth: stroke.width,
    borderStyle: "solid",
    borderColor: colors.line,
    backgroundColor: colors.white,
  },
  shellRail: {
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
    height: "100%",
    overflow: "hidden",
    borderRadius: 0,
    borderWidth: 0,
    backgroundColor: colors.snow,
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    width: "248px",
    flexShrink: 0,
    padding: "20px 16px 16px",
    backgroundColor: colors.snow,
    borderRightWidth: stroke.width,
    borderRightStyle: "solid",
    borderRightColor: colors.line,
  },
  sidebarRail: {
    width: "100%",
    height: "100%",
    minHeight: 0,
    borderRightWidth: 0,
    padding: "16px 12px",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "0 4px 14px",
  },
  brandMark: {
    display: "inline-flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    borderRadius: radii.pill,
    backgroundColor: colors.blue,
    color: colors.onAccent,
    fontFamily: font.family,
    fontSize: font.xs,
    fontWeight: font.semibold,
    letterSpacing: "-0.01em",
    lineHeight: 1,
  },
  brandText: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    minWidth: 0,
  },
  brandName: {
    margin: 0,
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.m,
    fontWeight: font.semibold,
    letterSpacing: "-0.005em",
    lineHeight: 1.2,
  },
  brandHint: {
    margin: 0,
    color: colors.concrete,
    fontFamily: font.family,
    fontSize: font.xxs,
    fontWeight: font.medium,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    lineHeight: 1.2,
  },
  header: {
    flexShrink: 0,
    marginBottom: "10px",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    flexGrow: 1,
    minHeight: 0,
    overflowY: "auto",
    scrollbarWidth: "thin",
    scrollbarColor: `${colors.steel} transparent`,
  },
  group: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    marginTop: "14px",
  },
  groupFirst: {
    marginTop: 0,
  },
  groupLabel: {
    margin: "0 8px 6px",
    color: colors.concrete,
    fontFamily: font.family,
    fontSize: font.xxs,
    fontWeight: font.medium,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  link: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    width: "100%",
    boxSizing: "border-box",
    borderWidth: 0,
    borderRadius: radii.control,
    padding: "9px 10px",
    backgroundColor: "transparent",
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.s,
    fontWeight: font.regular,
    textAlign: "left",
    textDecoration: "none",
    cursor: "pointer",
    ":hover": {
      backgroundColor: colors.snowDark,
    },
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.blueDark,
      outlineOffset: "2px",
    },
  },
  active: {
    backgroundColor: colors.blueLight,
    color: colors.blueDark,
    fontWeight: font.medium,
    ":hover": {
      backgroundColor: colors.blueLight,
    },
  },
  action: {
    marginTop: "16px",
    marginBottom: "8px",
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    paddingTop: "8px",
  },
  footerRow: {
    display: "flex",
    gap: "4px",
  },
  footerLink: {
    flex: 1,
  },
  rule: {
    height: "1px",
    marginBlock: "6px",
    backgroundColor: colors.smoke,
    borderWidth: 0,
  },
  signOut: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    width: "100%",
    borderWidth: 0,
    borderRadius: radii.control,
    padding: "9px 10px",
    backgroundColor: "transparent",
    color: colors.danger,
    fontFamily: font.family,
    fontSize: font.s,
    fontWeight: font.medium,
    textAlign: "left",
    cursor: "pointer",
    ":hover": {
      backgroundColor: colors.snowDark,
    },
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: colors.danger,
      outlineOffset: "2px",
    },
  },
  main: {
    flexGrow: 1,
    minWidth: 0,
    padding: "20px 24px",
    fontFamily: font.family,
    fontSize: font.s,
    color: colors.steel,
    backgroundColor: colors.white,
  },
});

function itemKey(item: AppSidebarItem) {
  return item.href ?? item.label;
}

function NavItem({
  item,
  active,
  onSelect,
  renderLink,
  dense,
}: {
  item: AppSidebarItem;
  active: boolean;
  onSelect: () => void;
  renderLink?: (props: AppSidebarLinkProps) => ReactNode;
  dense?: boolean;
}) {
  const body = (
    <>
      {item.icon ? <Icon name={item.icon} size={dense ? 16 : 18} /> : null}
      {item.label}
    </>
  );
  const styleProps = stylex.props(
    styles.link,
    dense && styles.footerLink,
    active && styles.active,
  );

  if (item.href) {
    const linkProps: AppSidebarLinkProps = {
      href: item.href,
      "aria-current": active ? "page" : undefined,
      onClick: onSelect,
      children: body,
      ...styleProps,
    };
    if (renderLink) return <>{renderLink(linkProps)}</>;
    return <a {...linkProps} />;
  }

  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      onClick={onSelect}
      {...styleProps}
    >
      {body}
    </button>
  );
}

export function AppSidebar({
  brand = "App",
  brandHint,
  groups,
  items,
  action,
  footer,
  onSignOut,
  children,
  header,
  current,
  onNavigate,
  renderLink,
  rail = false,
}: {
  brand?: string;
  brandHint?: string;
  groups?: AppSidebarGroup[];
  items?: AppSidebarItem[];
  action?: { label: string; onClick?: () => void };
  footer?: AppSidebarItem[];
  onSignOut?: () => void;
  children?: ReactNode;
  /** Optional slot above the nav (e.g. SearchInput). */
  header?: ReactNode;
  /** Controlled active item — match by href or label. */
  current?: string;
  onNavigate?: (item: AppSidebarItem) => void;
  /** Swap anchors for Next.js Link, etc. */
  renderLink?: (props: AppSidebarLinkProps) => ReactNode;
  /** Sidebar-only layout for embedding in a page rail. */
  rail?: boolean;
}) {
  const sections: AppSidebarGroup[] =
    groups ??
    (items?.length
      ? [{ items }]
      : [{ items: [{ label: "Home", icon: "home" }] }]);

  const first = sections[0]?.items[0];
  const [internal, setInternal] = useState(itemKey(first ?? { label: "" }));
  const activeKey = current ?? internal;

  const select = (item: AppSidebarItem) => {
    if (current == null) setInternal(itemKey(item));
    onNavigate?.(item);
  };

  const aside = (
    <aside {...stylex.props(styles.sidebar, rail && styles.sidebarRail)}>
      <div {...stylex.props(styles.brand)}>
        <span aria-hidden {...stylex.props(styles.brandMark)}>
          {brand.slice(0, 1).toUpperCase()}
        </span>
        <div {...stylex.props(styles.brandText)}>
          <p {...stylex.props(styles.brandName)}>{brand}</p>
          {brandHint ? (
            <p {...stylex.props(styles.brandHint)}>{brandHint}</p>
          ) : null}
        </div>
      </div>

      {header ? <div {...stylex.props(styles.header)}>{header}</div> : null}

      <nav aria-label="Product" {...stylex.props(styles.nav)}>
        {sections.map((section, index) => (
          <div
            key={section.label ?? `section-${index}`}
            {...stylex.props(styles.group, index === 0 && styles.groupFirst)}
          >
            {section.label ? (
              <p {...stylex.props(styles.groupLabel)}>{section.label}</p>
            ) : null}
            {section.items.map((item) => (
              <NavItem
                key={itemKey(item)}
                item={item}
                active={activeKey === itemKey(item)}
                onSelect={() => select(item)}
                renderLink={renderLink}
              />
            ))}
          </div>
        ))}
      </nav>

      {action ? (
        <div {...stylex.props(styles.action)}>
          <Button variant="primary" fullWidth onClick={action.onClick}>
            <Icon name="plus" size={16} />
            {action.label}
          </Button>
        </div>
      ) : null}

      {footer?.length || onSignOut ? (
        <div {...stylex.props(styles.footer)}>
          {footer?.length ? (
            <div {...stylex.props(styles.footerRow)}>
              {footer.map((item) => (
                <NavItem
                  key={itemKey(item)}
                  item={item}
                  active={activeKey === itemKey(item)}
                  onSelect={() => select(item)}
                  renderLink={renderLink}
                  dense
                />
              ))}
            </div>
          ) : null}
          {onSignOut ? (
            <>
              <hr {...stylex.props(styles.rule)} />
              <button
                type="button"
                onClick={onSignOut}
                {...stylex.props(styles.signOut)}
              >
                <Icon name="logout" size={16} />
                Sign out
              </button>
            </>
          ) : null}
        </div>
      ) : null}
    </aside>
  );

  if (rail) {
    return <div {...stylex.props(styles.shellRail)}>{aside}</div>;
  }

  return (
    <div {...stylex.props(styles.shell)}>
      {aside}
      <div {...stylex.props(styles.main)}>
        {children ??
          `${sections.flatMap((s) => s.items).find((i) => itemKey(i) === activeKey)?.label ?? "Home"} is open in this preview.`}
      </div>
    </div>
  );
}
