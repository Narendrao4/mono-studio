import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ComponentDocPage } from "@/components/studio/component-doc-page";
import {
  SignalButtonInteractivePreview,
  SignalButtonVariants,
} from "@/components/studio/signal-button-showcase";
import { componentRegistry, getComponentDoc } from "@/data/components";

export function generateStaticParams() {
  return componentRegistry.map((component) => ({ slug: component.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/components/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const component = getComponentDoc(slug);

  if (!component) {
    return {
      title: "Component not found",
    };
  }

  return {
    title: component.name,
    description: component.description,
  };
}

function resolveComponentShowcase(slug: string) {
  if (slug === "signal-button") {
    return {
      preview: <SignalButtonInteractivePreview />,
      variants: <SignalButtonVariants />,
    };
  }

  return null;
}

export default async function ComponentPage({
  params,
}: PageProps<"/components/[slug]">) {
  const { slug } = await params;
  const componentDoc = getComponentDoc(slug);

  if (!componentDoc) {
    notFound();
  }

  const showcase = resolveComponentShowcase(slug);

  if (!showcase) {
    notFound();
  }

  return (
    <ComponentDocPage
      doc={componentDoc}
      preview={showcase.preview}
      variants={showcase.variants}
    />
  );
}
