import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ComponentDocPage } from "@/components/studio/component-doc-page";
import {
  FractureStackInteractivePreview,
  FractureStackVariants,
} from "@/components/studio/fracture-stack-switch-showcase";
import {
  PhaseWeaveInteractivePreview,
  PhaseWeaveVariants,
} from "@/components/studio/phase-weave-toggle-showcase";
import {
  RecallDockInteractivePreview,
  RecallDockVariants,
} from "@/components/studio/recall-dock-showcase";
import {
  SignalButtonInteractivePreview,
  SignalButtonVariants,
} from "@/components/studio/signal-button-showcase";
import {
  SnakeToastInteractivePreview,
  SnakeToastVariants,
} from "@/components/studio/snake-toast-showcase";
import {
  SnakeSpinnerInteractivePreview,
  SnakeSpinnerVariants,
} from "@/components/studio/snake-spinner-showcase";
import {
  StarfallSwitchInteractivePreview,
  StarfallSwitchVariants,
} from "@/components/studio/starfall-switch-showcase";
import {
  StudioCardInteractivePreview,
  StudioCardVariants,
} from "@/components/studio/studio-card-showcase";
import { componentRegistry, getComponentDoc } from "@/data/components";
import { FoldoutInteractivePreview, FoldoutVariants } from "@/components/studio/foldout-showcase";
import {
  StudioDataTableInteractivePreview,
  StudioDataTableVariants,
} from "@/components/studio/studio-data-table-showcase";

export const dynamicParams = false;

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
  if (slug === "foldout") {
    return { preview: <FoldoutInteractivePreview />, variants: <FoldoutVariants /> };
  }

  if (slug === "studio-data-table") {
    return {
      preview: <StudioDataTableInteractivePreview />,
      variants: <StudioDataTableVariants />,
    };
  }

  if (slug === "signal-button") {
    return {
      preview: <SignalButtonInteractivePreview />,
      variants: <SignalButtonVariants />,
    };
  }

  if (slug === "phase-weave-toggle") {
    return {
      preview: <PhaseWeaveInteractivePreview />,
      variants: <PhaseWeaveVariants />,
    };
  }

  if (slug === "fracture-stack-switch") {
    return {
      preview: <FractureStackInteractivePreview />,
      variants: <FractureStackVariants />,
    };
  }

  if (slug === "starfall-switch") {
    return {
      preview: <StarfallSwitchInteractivePreview />,
      variants: <StarfallSwitchVariants />,
    };
  }

  if (slug === "recall-dock") {
    return {
      preview: <RecallDockInteractivePreview />,
      variants: <RecallDockVariants />,
    };
  }

  if (slug === "snake-toast") {
    return {
      preview: <SnakeToastInteractivePreview />,
      variants: <SnakeToastVariants />,
    };
  }

  if (slug === "snake-spinner") {
    return {
      preview: <SnakeSpinnerInteractivePreview />,
      variants: <SnakeSpinnerVariants />,
    };
  }

  if (slug === "studio-card") {
    return {
      preview: <StudioCardInteractivePreview />,
      variants: <StudioCardVariants />,
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
