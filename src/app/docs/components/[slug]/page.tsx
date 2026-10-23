import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ComponentReferencePage } from "@/components/studio/component-reference-page";
import { componentRegistry, getComponentDoc } from "@/data/components";

export const dynamicParams = false;

export function generateStaticParams() {
  return componentRegistry.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/docs/components/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const doc = getComponentDoc(slug);
  return { title: doc ? `${doc.name} documentation` : "Component not found", description: doc?.description };
}

export default async function ComponentDocumentation({ params }: PageProps<"/docs/components/[slug]">) {
  const { slug } = await params;
  const doc = getComponentDoc(slug);
  if (!doc) notFound();
  return <ComponentReferencePage doc={doc} />;
}
