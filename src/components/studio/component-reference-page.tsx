import Link from "next/link";

import { CodeViewer } from "@/components/studio/code-viewer";
import { ComponentGuideLinks } from "@/components/studio/component-guide-links";
import { PropsTable } from "@/components/studio/props-table";
import { COMPONENT_ANIMATIONS, COMPONENT_THEME, COMPONENT_UTILS } from "@/data/component-setup";
import type { ComponentDoc } from "@/data/components";

export function ComponentReferencePage({ doc, usage = false }: { doc: ComponentDoc; usage?: boolean }) {
  const bundledAnimation = doc.slug === "snake-toast" || doc.slug === "snake-spinner";
  const styles = doc.slug === "snake-toast" ? '@import "tailwindcss";\n' : COMPONENT_THEME + (COMPONENT_ANIMATIONS[doc.slug] ?? "");

  return (
    <article className="space-y-9 pb-16 pt-2">
      <header className="space-y-4 border-b border-border pb-6">
        <Link href={`/components/${doc.slug}`} className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">Back to {doc.name} preview</Link>
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">{usage ? "Application guide" : "Component documentation"}</p>
        <h1 className="studio-heading text-3xl sm:text-4xl">{usage ? `How to use ${doc.name}` : `${doc.name} documentation`}</h1>
        <p className="max-w-3xl text-base leading-7 text-muted-foreground">{doc.description}</p>
      </header>

      {usage ? (
        <>
          <section className="space-y-4">
            <h2 className="studio-heading text-xl">1. Prepare your application</h2>
            <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
              Use a React and TypeScript application with Tailwind CSS 4. No additional UI library is required. In Mono Studio, the helper and styles below are already installed. In another app, add them once and keep the @/ import alias pointing to your source folder, or adjust the imports.
            </p>
            {doc.slug === "studio-card" && <p className="max-w-3xl text-sm leading-6 text-muted-foreground">StudioCard uses Next.js Image and a companion CSS Module. In another React framework, replace next/image with your application&apos;s image renderer.</p>}
            <details className="studio-card">
              <summary className="cursor-pointer p-4 text-sm font-medium">Shared helper: src/lib/utils.ts</summary>
              <CodeViewer code={COMPONENT_UTILS} fileName="src/lib/utils.ts" />
            </details>
            <details className="studio-card">
              <summary className="cursor-pointer p-4 text-sm font-medium">Required styles: globals.css</summary>
              <p className="px-4 pb-4 text-sm leading-6 text-muted-foreground">Merge these styles into your global stylesheet and import it from your application entry or root layout.{doc.styleFile ? " The component's layout and interactions are in the companion CSS Module in step 2." : bundledAnimation ? " The snake animation and color palettes are included in the component itself." : " Keep the theme tokens, and add the animation rules included below."}</p>
              <CodeViewer code={styles} fileName="globals.css" />
            </details>
          </section>

          <section className="space-y-4">
            <h2 className="studio-heading text-xl">2. Add the component</h2>
            <p className="text-sm leading-6 text-muted-foreground">Copy the complete implementation into src/components/ui/{doc.sourceFile}. This is the same source used by the live preview.</p>
            <details className="studio-card">
              <summary className="cursor-pointer p-4 text-sm font-medium">View and copy {doc.sourceFile}</summary>
              <CodeViewer code={doc.sourceCode} fileName={doc.sourceFile} />
            </details>
            {doc.styleFile && doc.styleCode && <details className="studio-card">
              <summary className="cursor-pointer p-4 text-sm font-medium">View and copy {doc.styleFile}</summary>
              <p className="px-4 pb-4 text-sm leading-6 text-muted-foreground">Save this CSS Module beside {doc.sourceFile}. Its import is already included in the component.</p>
              <CodeViewer code={doc.styleCode} fileName={doc.styleFile} />
            </details>}
          </section>

          <section className="space-y-4">
            <h2 className="studio-heading text-xl">3. Use it in a page or feature</h2>
            <p className="max-w-3xl text-sm leading-6 text-muted-foreground">Import the component into an interactive parent. In the Next.js App Router, keep the &quot;use client&quot; directive when the example uses state or event handlers.</p>
            <CodeViewer code={doc.usageCode} fileName={`use-${doc.slug}.tsx`} />
          </section>

          <section className="studio-card space-y-3 p-5">
            <h2 className="studio-heading text-xl">4. Connect your application state</h2>
            <p className="text-sm leading-6 text-muted-foreground">{doc.stateGuidance}</p>
            <Link href={`/docs/components/${doc.slug}`} className="inline-block text-sm font-medium underline underline-offset-4">Read the props and guidelines</Link>
          </section>
        </>
      ) : (
        <>
          <section className="space-y-4">
            <h2 className="studio-heading text-xl">Where it fits</h2>
            <ul className="grid gap-3 sm:grid-cols-3">
              {doc.useCases.map((useCase) => <li key={useCase} className="studio-card p-4 text-sm leading-6">{useCase}</li>)}
            </ul>
          </section>
          <section className="space-y-4">
            <h2 className="studio-heading text-xl">Guidelines</h2>
            <ul className="list-disc space-y-3 pl-5 text-sm leading-6 text-muted-foreground">
              {doc.guidelines.map((guideline) => <li key={guideline}>{guideline}</li>)}
            </ul>
          </section>
          <section className="studio-card space-y-3 p-5">
            <h2 className="studio-heading text-xl">State and events</h2>
            <p className="text-sm leading-6 text-muted-foreground">{doc.stateGuidance}</p>
          </section>
          <section className="space-y-4">
            <h2 className="studio-heading text-xl">Props reference</h2>
            <PropsTable propsList={doc.props} />
          </section>
        </>
      )}
      <ComponentGuideLinks slug={doc.slug} name={doc.name} />
    </article>
  );
}
