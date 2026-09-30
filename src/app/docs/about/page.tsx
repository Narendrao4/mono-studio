import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Mono Studio design direction and component principles.",
};

export default function AboutPage() {
  return (
    <article className="space-y-8 pb-16 pt-2">
      <header className="space-y-3 border-b border-border pb-6">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Documentation
        </p>
        <h1 className="studio-heading text-4xl">About Mono Studio</h1>
        <p className="max-w-3xl text-base leading-7 text-muted-foreground">
          Mono Studio is a minimal technical workspace for original React components.
        </p>
      </header>

      <section className="studio-card space-y-4 p-6">
        <h2 className="studio-heading text-xl">Design principles</h2>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li>1. Black and white first, with high readability in both themes.</li>
          <li>2. Component behavior is documented with preview, code, and props.</li>
          <li>3. Registry-driven architecture keeps navigation and docs in sync.</li>
          <li>4. Minimal visual noise, clear borders, and compact technical layout.</li>
        </ul>
      </section>
    </article>
  );
}
