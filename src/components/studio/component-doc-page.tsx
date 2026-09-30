import type { ReactNode } from "react";

import { CodeViewer } from "@/components/studio/code-viewer";
import { ComponentPreview } from "@/components/studio/component-preview";
import { PropsTable } from "@/components/studio/props-table";
import type { ComponentDoc } from "@/data/components";

type ComponentDocPageProps = {
  doc: ComponentDoc;
  preview: ReactNode;
  variants: ReactNode;
};

export function ComponentDocPage({ doc, preview, variants }: ComponentDocPageProps) {
  return (
    <article className="space-y-10 pb-16">
      <header className="space-y-3 border-b border-neutral-200 pb-6 dark:border-neutral-800">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
          Component
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
          {doc.name}
        </h1>
        <p className="max-w-3xl text-base leading-7 text-neutral-600 dark:text-neutral-300">
          {doc.description}
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Interactive preview
        </h2>
        <ComponentPreview
          preview={preview}
          code={doc.sourceCode}
          fileName={doc.sourceFile}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Variants
        </h2>
        {variants}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Usage
        </h2>
        <CodeViewer code={doc.usageCode} fileName={`usage-${doc.slug}.tsx`} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Props
        </h2>
        <PropsTable propsList={doc.props} />
      </section>
    </article>
  );
}
