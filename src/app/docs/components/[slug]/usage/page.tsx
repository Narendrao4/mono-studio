import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ComponentReferencePage } from "@/components/studio/component-reference-page";
import { componentRegistry, getComponentDoc } from "@/data/components";

export const dynamicParams = false;

export function generateStaticParams() {
  return componentRegistry.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/docs/components/[slug]/usage">): Promise<Metadata> {
  const { slug } = await params;
  const doc = getComponentDoc(slug);
  return { title: doc ? `How to use ${doc.name}` : "Component not found", description: doc ? `Set up and use ${doc.name} in your application with source code and examples.` : undefined };
}

export default async function ComponentUsage({ params }: PageProps<"/docs/components/[slug]/usage">) {
  const { slug } = await params;
  const doc = getComponentDoc(slug);
  if (!doc) notFound();
  return <ComponentReferencePage doc={doc} usage />;
}
