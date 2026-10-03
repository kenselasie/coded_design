import type { Metadata } from "next";
import { ComponentGallery } from "./gallery";

export const metadata: Metadata = {
  title: "Components · CodedDesign",
};

export default function ComponentsPage() {
  return <ComponentGallery />;
}
