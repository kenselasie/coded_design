import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { flattenReference } from "codeddesign/agent";
import { ComponentDoc } from "../doc-page";

type Params = { id: string };

export function generateStaticParams() {
  return flattenReference().map((item) => ({ id: item.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = flattenReference().find((entry) => entry.id === id);
  return {
    title: item ? `${item.name} · CodedDesign` : "Components · CodedDesign",
  };
}

export default async function ComponentPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const item = flattenReference().find((entry) => entry.id === id);
  if (!item) notFound();
  return <ComponentDoc item={item} />;
}
