import type { Metadata } from "next";
import { FormGallery } from "./gallery";

export const metadata: Metadata = {
  title: "Forms · CodedDesign",
};

export default function FormsPage() {
  return <FormGallery />;
}
