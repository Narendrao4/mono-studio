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
      <header className="space-y-3 border-b border-border pb-6">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          Component
        </p>
        <h1 className="studio-heading text-4xl">
          {doc.name}
        </h1>
        <p className="max-w-3xl text-base leading-7 text-muted-foreground">
          {doc.description}
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="studio-heading text-xl">
          Interactive preview
        </h2>
        <ComponentPreview
          preview={preview}
          code={doc.sourceCode}
          fileName={doc.sourceFile}
        />
      </section>

      <section className="space-y-4">
        <h2 className="studio-heading text-xl">
          Variants
        </h2>
        {variants}
      </section>

      <section className="space-y-4">
        <h2 className="studio-heading text-xl">
          Usage
        </h2>
        <CodeViewer code={doc.usageCode} fileName={`usage-${doc.slug}.tsx`} />
      </section>

      <section className="space-y-4">
        <h2 className="studio-heading text-xl">
          Props
        </h2>
        <PropsTable propsList={doc.props} />
      </section>
    </article>
  );
}
