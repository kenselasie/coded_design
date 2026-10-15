import type { Metadata } from "next";
import { ExampleGallery } from "./gallery";

export const metadata: Metadata = {
  title: "Examples · CodedDesign",
};

export default function ExamplesPage() {
  return <ExampleGallery />;
}
