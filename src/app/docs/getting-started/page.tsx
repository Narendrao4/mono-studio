import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Getting Started",
  description: "Install and run Mono Studio locally.",
};

export default function GettingStartedPage() {
  return (
    <article className="space-y-8 pb-16 pt-2">
      <header className="space-y-3 border-b border-border pb-6">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Documentation
        </p>
        <h1 className="studio-heading text-4xl">Getting Started</h1>
        <p className="max-w-3xl text-base leading-7 text-muted-foreground">
          Install dependencies, run the app, and verify production build output.
        </p>
      </header>

      <section className="studio-card space-y-4 p-6">
        <h2 className="studio-heading text-xl">Install and run</h2>
        <ol className="space-y-3 text-sm text-muted-foreground">
          <li>1. Install dependencies with npm install.</li>
          <li>2. Start development server with npm run dev.</li>
          <li>3. Open http://localhost:3000 in your browser.</li>
          <li>4. Validate lint and build with npm run lint and npm run build.</li>
        </ol>

        <div className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            Commands
          </p>
          <pre className="overflow-x-auto border border-border bg-[#111111] px-4 py-3 font-mono text-sm leading-6 text-neutral-100">
{`npm install
npm run dev
npm run lint
npm run build`}
          </pre>
        </div>
      </section>
    </article>
  );
}
