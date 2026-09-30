import Link from "next/link";

import { componentRegistry, type RegistryStatus } from "@/data/components";

const integrationStacks = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "App Router",
  "Registry Driven",
];

const studioFeatures = [
  {
    title: "Preview with confidence",
    description:
      "Live interaction states stay close to source so component behavior is obvious before copy-paste.",
  },
  {
    title: "Own your implementation",
    description:
      "Each entry includes source and usage snippets so your team controls the final component code.",
  },
  {
    title: "Scale with your registry",
    description:
      "Add another component once and the homepage, sidebar, routes, and index views stay in sync.",
  },
];

const buildFlow = [
  {
    label: "01",
    title: "Author",
    description: "Design a component from first principles in your own style.",
  },
  {
    label: "02",
    title: "Document",
    description: "Attach props, source, usage, and interactive showcase metadata.",
  },
  {
    label: "03",
    title: "Ship",
    description: "Registry updates instantly surface across this home experience.",
  },
];

function resolveStatusClassName(status: RegistryStatus) {
  if (status === "ready") {
    return "border-emerald-300/80 bg-emerald-50 text-emerald-700 dark:border-emerald-700/70 dark:bg-emerald-950/40 dark:text-emerald-300";
  }

  return "border-amber-300/80 bg-amber-50 text-amber-700 dark:border-amber-700/70 dark:bg-amber-950/40 dark:text-amber-300";
}

export default function Home() {
  const firstComponent = componentRegistry[0];
  const readyCount = componentRegistry.filter(
    (component) => component.status === "ready",
  ).length;
  const experimentalCount = componentRegistry.length - readyCount;
  const componentCountLabel = String(componentRegistry.length).padStart(2, "0");

  return (
    <div className="space-y-10 pb-16 pt-6 sm:pt-10">
      <section className="mono-surface mono-fade-up relative overflow-hidden px-6 py-7 sm:px-8 sm:py-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--mono-glow-rgb),0.24),transparent_46%)]" />

        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--mono-muted)]">
              Mono Studio / UI Registry
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-[var(--mono-fg)] sm:text-5xl lg:text-6xl">
              Build premium React components.
              <br />
              Ship them from one studio.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-[var(--mono-muted)] sm:text-lg">
              Inspired by modern component galleries, this homepage is fully
              registry-driven. Add new entries and the experience expands with
              the same visual language automatically.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/components"
                className="inline-flex h-10 items-center justify-center border border-[var(--mono-fg)] bg-[var(--mono-fg)] px-4 text-sm font-medium text-[var(--mono-bg)] transition-colors hover:opacity-90"
              >
                Explore Components
              </Link>
              {firstComponent ? (
                <Link
                  href={`/components/${firstComponent.slug}`}
                  className="inline-flex h-10 items-center justify-center border border-[var(--mono-border)] bg-[var(--mono-panel)] px-4 text-sm font-medium text-[var(--mono-fg)] transition-colors hover:bg-[var(--mono-soft)]"
                >
                  Open {firstComponent.name}
                </Link>
              ) : null}
              <a
                href="https://github.com/narendrao4/mono-studio"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center justify-center border border-[var(--mono-border)] bg-transparent px-4 text-sm font-medium text-[var(--mono-fg)] transition-colors hover:bg-[var(--mono-soft)]"
              >
                View GitHub
              </a>
            </div>

            <ul className="flex flex-wrap gap-2">
              {integrationStacks.map((item) => (
                <li
                  key={item}
                  className="border border-[var(--mono-border)] bg-[var(--mono-panel)] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--mono-muted)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mono-grid-surface mono-fade-up space-y-4 p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--mono-muted)]">
                Registry Pulse
              </p>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--mono-muted)]">
                {componentCountLabel} Total
              </p>
            </div>

            {componentRegistry.length > 0 ? (
              <ul className="space-y-2">
                {componentRegistry.slice(0, 5).map((component) => (
                  <li
                    key={component.slug}
                    className="flex items-center justify-between gap-3 border border-[var(--mono-border)] bg-[var(--mono-panel)] px-3 py-2"
                  >
                    <div>
                      <p className="text-sm font-medium text-[var(--mono-fg)]">
                        {component.name}
                      </p>
                      <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--mono-muted)]">
                        /components/{component.slug}
                      </p>
                    </div>
                    <span
                      className={`border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] ${resolveStatusClassName(component.status)}`}
                    >
                      {component.status}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="border border-dashed border-[var(--mono-border)] p-4 text-sm text-[var(--mono-muted)]">
                Add your first registry item and it will appear here.
              </p>
            )}

            <p className="text-sm leading-6 text-[var(--mono-muted)]">
              This panel is data-driven from your registry, so new components are
              listed here without additional homepage edits.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="mono-surface p-4">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--mono-muted)]">
            Components
          </p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-[var(--mono-fg)]">
            {componentCountLabel}
          </p>
          <p className="mt-2 text-sm text-[var(--mono-muted)]">
            Registry cards update as new entries are added.
          </p>
        </article>

        <article className="mono-surface p-4">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--mono-muted)]">
            Ready
          </p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-[var(--mono-fg)]">
            {String(readyCount).padStart(2, "0")}
          </p>
          <p className="mt-2 text-sm text-[var(--mono-muted)]">
            Production-oriented components with full docs.
          </p>
        </article>

        <article className="mono-surface p-4">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--mono-muted)]">
            Experimental
          </p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-[var(--mono-fg)]">
            {String(experimentalCount).padStart(2, "0")}
          </p>
          <p className="mt-2 text-sm text-[var(--mono-muted)]">
            Emerging ideas waiting for wider adoption.
          </p>
        </article>

        <article className="mono-surface p-4">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--mono-muted)]">
            Theme
          </p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-[var(--mono-fg)]">
            02
          </p>
          <p className="mt-2 text-sm text-[var(--mono-muted)]">
            Explicit white and black themes in the header switcher.
          </p>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {studioFeatures.map((feature) => (
          <article key={feature.title} className="mono-surface p-5">
            <h2 className="text-xl font-semibold tracking-tight text-[var(--mono-fg)]">
              {feature.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-[var(--mono-muted)]">
              {feature.description}
            </p>
          </article>
        ))}
      </section>

      <section className="space-y-4">
        <header className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--mono-muted)]">
            Component Catalog
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[var(--mono-fg)] sm:text-4xl">
            Same homepage pattern for every new component.
          </h2>
          <p className="max-w-3xl text-sm leading-6 text-[var(--mono-muted)] sm:text-base">
            Every card below is generated from the same registry used by your
            sidebar and component routes.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          {componentRegistry.map((component) => (
            <article
              key={component.slug}
              className="mono-surface group relative overflow-hidden p-5"
            >
              <div className="mb-4 overflow-hidden border border-[var(--mono-border)] bg-[var(--mono-soft)] p-4">
                <div className="relative flex h-24 items-center justify-center">
                  <div className="absolute inset-x-3 h-px bg-[var(--mono-border)]" />
                  <div className="signal-track-scan absolute left-0 top-1/2 h-px w-28 -translate-y-1/2 bg-[var(--mono-fg)]/80" />
                  <p className="relative z-10 border border-[var(--mono-border)] bg-[var(--mono-panel)] px-3 py-1 font-mono text-xs uppercase tracking-[0.14em] text-[var(--mono-muted)]">
                    {component.slug}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-2xl font-semibold tracking-tight text-[var(--mono-fg)]">
                    {component.name}
                  </h3>
                  <span
                    className={`border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] ${resolveStatusClassName(component.status)}`}
                  >
                    {component.status}
                  </span>
                </div>

                <p className="text-sm leading-6 text-[var(--mono-muted)]">
                  {component.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <Link
                    href={`/components/${component.slug}`}
                    className="inline-flex h-9 items-center justify-center border border-[var(--mono-fg)] bg-[var(--mono-fg)] px-3 text-sm font-medium text-[var(--mono-bg)] transition-colors hover:opacity-90"
                  >
                    Open Docs
                  </Link>
                  <Link
                    href="/components"
                    className="inline-flex h-9 items-center justify-center border border-[var(--mono-border)] bg-[var(--mono-panel)] px-3 text-sm font-medium text-[var(--mono-fg)] transition-colors hover:bg-[var(--mono-soft)]"
                  >
                    Browse Library
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mono-surface space-y-4 p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--mono-muted)]">
          Workflow
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {buildFlow.map((step) => (
            <article
              key={step.label}
              className="border border-[var(--mono-border)] bg-[var(--mono-panel)] p-4"
            >
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--mono-muted)]">
                {step.label}
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-[var(--mono-fg)]">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--mono-muted)]">
                {step.description}
              </p>
            </article>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/components"
            className="inline-flex h-10 items-center justify-center border border-[var(--mono-fg)] bg-[var(--mono-fg)] px-4 text-sm font-medium text-[var(--mono-bg)] transition-colors hover:opacity-90"
          >
            Open Full Catalog
          </Link>
          {firstComponent ? (
            <Link
              href={`/components/${firstComponent.slug}`}
              className="inline-flex h-10 items-center justify-center border border-[var(--mono-border)] bg-[var(--mono-panel)] px-4 text-sm font-medium text-[var(--mono-fg)] transition-colors hover:bg-[var(--mono-soft)]"
            >
              Start with {firstComponent.name}
            </Link>
          ) : null}
          <a
            href="https://github.com/narendrao4/mono-studio"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center justify-center border border-[var(--mono-border)] bg-transparent px-4 text-sm font-medium text-[var(--mono-fg)] transition-colors hover:bg-[var(--mono-soft)]"
          >
            Follow Development
          </a>
        </div>
      </section>

      {componentRegistry.length === 0 ? (
        <section className="mono-surface border-dashed p-6 text-sm text-[var(--mono-muted)] sm:p-8">
          Your registry is empty. Add entries in data/components.ts and the
          homepage catalog will populate automatically.
        </section>
      ) : null}
    </div>
  );
}
