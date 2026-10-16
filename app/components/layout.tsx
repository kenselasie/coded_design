import type { ReactNode } from "react";
import { DocsFrame } from "./frame";

export default function ComponentsLayout({ children }: { children: ReactNode }) {
  return <DocsFrame>{children}</DocsFrame>;
}
