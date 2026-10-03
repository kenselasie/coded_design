import type { Metadata } from "next";
import { PatternGallery } from "./gallery";

export const metadata: Metadata = {
  title: "Patterns · CodedDesign",
};

export default function PatternsPage() {
  return <PatternGallery />;
}
