import type { Metadata } from "next";
import { HomeLanding } from "./landing/home";

export const metadata: Metadata = {
  title: "CodedDesign",
  description: "A cartoon React design system you can install.",
};

export default function HomePage() {
  return <HomeLanding />;
}
