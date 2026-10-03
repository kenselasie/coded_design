"use client";

import * as stylex from "@stylexjs/stylex";
import { SearchInput, Select, type SelectOption } from "../components/fields";

const styles = stylex.create({
  bar: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    alignItems: "flex-end",
  },
});

export function GenericFilter({
  query,
  onQueryChange,
  status,
  onStatusChange,
  statusOptions,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  statusOptions: SelectOption[];
}) {
  return (
    <div {...stylex.props(styles.bar)}>
      <SearchInput label="Filter" value={query} onChange={onQueryChange} />
      <Select
        label="Status"
        options={statusOptions}
        value={status}
        onChange={onStatusChange}
      />
    </div>
  );
}
