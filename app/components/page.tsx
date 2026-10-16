import type { Metadata } from "next";
import { ComponentOverview } from "./overview";

export const metadata: Metadata = {
  title: "Components · CodedDesign",
};

export default function ComponentsPage() {
  return <ComponentOverview />;
}
