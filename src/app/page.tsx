import Link from "next/link";

import { componentRegistry } from "@/data/components";

const stackItems = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "App Router",
  "Registry",
];

const blockFeatures = [
  {
    title: "Interactive previews",
    description:
      "Validate behavior before copy-paste with state controls and intentional defaults.",
  },
  {
    title: "Source and usage together",
    description:
      "Every component entry includes implementation code, usage, and props documentation.",
  },
  {
    title: "Registry-first scaling",
    description:
      "Add one new registry item and the homepage, sidebar, and docs routes update automatically.",
  },
];

const resourceItems = [
  {
    title: "Component docs",
    description: "Detailed preview/code/props pages for each registered component.",
    href: "/components",
    label: "Browse docs",
  },
  {
    title: "Source repository",
    description: "Follow implementation changes and contribute directly in GitHub.",
    href: "https://github.com/narendrao4/mono-studio",
    label: "Open GitHub",
  },
  {
    title: "Design direction",
    description: "Minimal black/white technical UI with reusable theme tokens.",
    href: "/",
    label: "View home",
  },
];

const solidButtonClassName =
  "inline-flex h-10 items-center justify-center border border-foreground bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const ghostButtonClassName =
  "inline-flex h-10 items-center justify-center border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export default function Home() {
  const firstComponent = componentRegistry[0];
  const readyCount = componentRegistry.filter(
    (component) => component.status === "ready",
  ).length;
  const experimentalCount = componentRegistry.length - readyCount;
  const componentCountLabel = String(componentRegistry.length).padStart(2, "0");

  return (
    <div className="space-y-10 pb-16 pt-2 sm:pt-4">
      <section className="studio-card px-6 py-7 sm:px-8 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="space-y-6">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Mono Studio / UI Registry
            </p>
            <h1 className="studio-heading max-w-3xl text-4xl sm:text-5xl lg:text-6xl">
              Build original React components.
              <br />
              Document them in one studio.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              A clean developer-focused landing page for browsing components,
              testing behavior, inspecting source, and copying usage patterns.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/components" className={solidButtonClassName}>
                Explore Components
              </Link>
              {firstComponent ? (
                <Link href={`/components/${firstComponent.slug}`} className={ghostButtonClassName}>
                  Open {firstComponent.name}
                </Link>
              ) : null}
              <a
                href="https://github.com/narendrao4/mono-studio"
                target="_blank"
                rel="noreferrer"
                className={ghostButtonClassName}
              >
                View GitHub
              </a>
            </div>

            <ul className="flex flex-wrap gap-2">
              {stackItems.map((item) => (
                <li
                  key={item}
                  className="border border-border bg-muted px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="studio-card space-y-4 p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Registry Pulse
              </p>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {componentCountLabel} Total
              </p>
            </div>

            {componentRegistry.length > 0 ? (
              <ul className="space-y-2">
                {componentRegistry.slice(0, 5).map((component) => (
                  <li
                    key={component.slug}
                    className="flex items-center justify-between gap-3 border border-border bg-card px-3 py-2"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {component.name}
                      </p>
                      <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                        /components/{component.slug}
                      </p>
                    </div>
                    <span
                      className="border border-border bg-muted px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground"
                    >
                      {component.status}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="border border-dashed border-border p-4 text-sm text-muted-foreground">
                Add your first registry item and it will appear here.
              </p>
            )}

            <p className="text-sm leading-6 text-muted-foreground">
              This panel is data-driven from your registry, so new components are
              listed here without additional homepage edits.
            </p>
          </div>
        </div>
      </section>

      <section id="blocks" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="studio-card p-4">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Components
          </p>
          <p className="studio-heading mt-2 text-3xl">
            {componentCountLabel}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Registry cards update as new entries are added.
          </p>
        </article>

        <article className="studio-card p-4">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Ready
          </p>
          <p className="studio-heading mt-2 text-3xl">
            {String(readyCount).padStart(2, "0")}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Production-oriented components with full docs.
          </p>
        </article>

        <article className="studio-card p-4">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Experimental
          </p>
          <p className="studio-heading mt-2 text-3xl">
            {String(experimentalCount).padStart(2, "0")}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Emerging ideas waiting for wider adoption.
          </p>
        </article>

        <article className="studio-card p-4">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Theme
          </p>
          <p className="studio-heading mt-2 text-3xl">
            02
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Explicit white and black themes in the header switcher.
          </p>
        </article>
      </section>

      <section id="patterns" className="grid gap-4 lg:grid-cols-3">
        {blockFeatures.map((feature) => (
          <article key={feature.title} className="studio-card p-5">
            <h2 className="studio-heading text-xl">
              {feature.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {feature.description}
            </p>
          </article>
        ))}
      </section>

      <section className="space-y-4">
        <header className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Component Catalog
          </p>
          <h2 className="studio-heading text-3xl sm:text-4xl">
            Same homepage pattern for every new component.
          </h2>
          <p className="max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
            Every card below is generated from the same registry used by your
            sidebar and component routes.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          {componentRegistry.map((component) => (
            <article
              key={component.slug}
              className="studio-card group relative overflow-hidden p-5 transition-colors hover:bg-muted/50"
            >
              <div className="mb-4 overflow-hidden border border-border bg-muted p-4">
                <div className="relative flex h-24 items-center justify-center">
                  <div className="absolute inset-x-3 h-px bg-border" />
                  <div className="signal-track-scan absolute left-0 top-1/2 h-px w-28 -translate-y-1/2 bg-foreground/75" />
                  <p className="relative z-10 border border-border bg-card px-3 py-1 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {component.slug}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="studio-heading text-2xl">
                    {component.name}
                  </h3>
                  <span
                    className="border border-border bg-muted px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground"
                  >
                    {component.status}
                  </span>
                </div>

                <p className="text-sm leading-6 text-muted-foreground">
                  {component.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <Link href={`/components/${component.slug}`} className={solidButtonClassName}>
                    Open Docs
                  </Link>
                  <Link href="/components" className={ghostButtonClassName}>
                    Browse Library
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="resources" className="studio-card space-y-4 p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Resources
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {resourceItems.map((item) => (
            <article key={item.title} className="border border-border bg-card p-4">
              <h3 className="studio-heading text-xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
              <div className="pt-3">
                {item.href.startsWith("http") ? (
                  <a href={item.href} target="_blank" rel="noreferrer" className={ghostButtonClassName}>
                    {item.label}
                  </a>
                ) : (
                  <Link href={item.href} className={ghostButtonClassName}>
                    {item.label}
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {componentRegistry.length === 0 ? (
        <section className="studio-card border-dashed p-6 text-sm text-muted-foreground sm:p-8">
          Your registry is empty. Add entries in data/components.ts and the
          homepage catalog will populate automatically.
        </section>
      ) : null}
    </div>
  );
}
