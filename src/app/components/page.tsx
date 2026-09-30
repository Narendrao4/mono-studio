import type { Metadata } from "next";
import Link from "next/link";

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
        {componentRegistry.map((component) => (
          <article key={component.slug} className="studio-card p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-2">
                <h2 className="studio-heading text-xl">
                  {component.name}
                </h2>
                <p className="text-sm leading-6 text-muted-foreground">
                  {component.description}
                </p>
              </div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {component.status}
              </p>
            </div>

            <Link
              href={`/components/${component.slug}`}
              className="mt-4 inline-flex h-9 items-center justify-center border border-border bg-card px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Open Docs
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
