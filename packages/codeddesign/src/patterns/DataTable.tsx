"use client";

import * as stylex from "@stylexjs/stylex";
import { useMemo, useState } from "react";
import { colors } from "../tokens/colors.stylex";
import { font } from "../tokens/typography.stylex";
import { SearchInput } from "../components/fields";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "./Table";

const styles = stylex.create({
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  sort: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    borderWidth: 0,
    padding: 0,
    backgroundColor: "transparent",
    color: colors.black,
    fontFamily: font.family,
    fontSize: font.xs,
    fontWeight: font.semibold,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    cursor: "pointer",
  },
});

export type DataTableColumn<Row> = {
  key: keyof Row & string;
  header: string;
  filter?: boolean;
};

export function DataTable<Row extends Record<string, string>>({
  columns,
  rows,
}: {
  columns: DataTableColumn<Row>[];
  rows: Row[];
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<{ key: keyof Row & string; dir: "asc" | "desc" } | null>(
    null,
  );
  const filterKey = columns.find((column) => column.filter)?.key;

  const visible = useMemo(() => {
    const filtered = filterKey
      ? rows.filter((row) => row[filterKey].toLowerCase().includes(query.toLowerCase()))
      : rows;
    if (!sort) return filtered;
    return [...filtered].sort((a, b) => {
      const left = a[sort.key];
      const right = b[sort.key];
      const compared = left.localeCompare(right);
      return sort.dir === "asc" ? compared : -compared;
    });
  }, [filterKey, query, rows, sort]);

  return (
    <div {...stylex.props(styles.stack)}>
      {filterKey ? (
        <SearchInput value={query} onChange={setQuery} placeholder="Filter rows" />
      ) : null}
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key} header>
                <button
                  type="button"
                  onClick={() =>
                    setSort((current) =>
                      current?.key === column.key
                        ? { key: column.key, dir: current.dir === "asc" ? "desc" : "asc" }
                        : { key: column.key, dir: "asc" },
                    )
                  }
                  {...stylex.props(styles.sort)}
                >
                  {column.header}
                  {sort?.key === column.key ? (sort.dir === "asc" ? " asc" : " desc") : ""}
                </button>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {visible.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.key}>{row[column.key]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
