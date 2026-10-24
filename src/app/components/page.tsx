import type { Metadata } from "next";
import Link from "next/link";
import { ComponentGuideLinks } from "@/components/studio/component-guide-links";
import { StudioCard } from "@/components/ui/studio-card";

import { componentRegistry } from "@/data/components";

export const metadata: Metadata = {
  title: "Components",
  description: "Browse original React UI components in Mono Studio.",
};

export default function ComponentsPage() {
  return (
    <div className="space-y-8 pb-16 pt-2">
      <header className="space-y-3 border-b border-border pb-6">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Library
        </p>
        <h1 className="studio-heading text-4xl">
          Components
        </h1>
        <p className="max-w-2xl text-base leading-7 text-muted-foreground">
          Each component includes a preview, source view, usage example, and props
          reference.
        </p>
      </header>

      <section className="grid gap-4">
        {componentRegistry.map((component, index) => (
          <StudioCard
            key={component.slug}
            title={component.name}
            description={component.description}
            eyebrow={`Component / ${String(index + 1).padStart(2, "0")}`}
            badge={component.status}
            headingLevel={2}
            size="compact"
            actions={<Link
              href={`/components/${component.slug}`}
              className="inline-flex h-9 items-center justify-center border border-border bg-card px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Open Preview
            </Link>}
            footer={<ComponentGuideLinks slug={component.slug} name={component.name} compact />}
          />
        ))}
      </section>
    </div>
  );
}
