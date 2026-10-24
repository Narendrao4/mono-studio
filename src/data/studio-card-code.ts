import source from "@/data/component-sources.json";

export const STUDIO_CARD_SOURCE = source["studio-card.tsx"];

export const STUDIO_CARD_USAGE = `"use client";

import Link from "next/link";
import { useState } from "react";
import { StudioCard } from "@/components/ui/studio-card";

// Copy studio-card.module.css beside studio-card.tsx.
export function ComponentCard() {
  const [saved, setSaved] = useState(false);

  return (
    <StudioCard
      title="Signal Button"
      description="A state-aware action for your application."
      eyebrow="Component / 01"
      badge={saved ? "Saved" : "Ready"}
      preview={<div className="px-6 py-10 text-sm">Your custom preview</div>}
      actions={
        <button
          type="button"
          aria-pressed={saved}
          onClick={() => setSaved((value) => !value)}
        >
          {saved ? "Saved to collection" : "Save to collection"}
        </button>
      }
      footer={<Link href="/components/signal-button">View component</Link>}
    />
  );
}

export function ProjectCard() {
  return (
    <StudioCard
      title="Atlas workspace"
      description="Your resources, brought together."
      eyebrow="Workspace / 02"
      variant="inverse"
      size="compact"
      headingLevel={2}
      actions={<Link href="/projects/atlas">Open workspace</Link>}
    >
      <p>12 resources · 3 collaborators</p>
    </StudioCard>
  );
}

export function EditorialCard() {
  return (
    <StudioCard
      title="Studies in negative space"
      description="On shapes, surfaces, and the details we notice."
      badge="6 min read"
      image={{
        src: "/project-cover.jpg", // Use an image from your own public folder.
        alt: "Describe your cover image here",
        width: 1200,
        height: 750,
      }}
      actions={<Link href="/journal/negative-space">Read article</Link>}
    />
  );
}
`;
