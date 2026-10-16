import type { Metadata } from "next";
import { HomeLanding } from "./landing/home";

export const metadata: Metadata = {
  title: "CodedDesign",
  description:
    "Build your apps with a unique-looking design system from CodedGuy.",
};

export default function HomePage() {
  return <HomeLanding />;
}
