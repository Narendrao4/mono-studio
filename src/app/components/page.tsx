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
      <header className="space-y-3 border-b border-neutral-200 pb-6 dark:border-neutral-800">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
          Library
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
          Components
        </h1>
        <p className="max-w-2xl text-base leading-7 text-neutral-600 dark:text-neutral-300">
          Each component includes a preview, source view, usage example, and props
          reference.
        </p>
      </header>

      <section className="grid gap-4">
        {componentRegistry.map((component) => (
          <article
            key={component.slug}
            className="border border-neutral-200 p-5 dark:border-neutral-800"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
                  {component.name}
                </h2>
                <p className="text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                  {component.description}
                </p>
              </div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
                {component.status}
              </p>
            </div>

            <Link
              href={`/components/${component.slug}`}
              className="mt-4 inline-flex h-9 items-center justify-center border border-neutral-300 px-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-900"
            >
              Open Docs
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
