"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { componentRegistry } from "@/data/components";

type DocEntry = {
  slug: string;
  title: string;
  description: string;
  href: string;
  tags: string[];
};

const docsIndex: DocEntry[] = [
  {
    slug: "install",
    title: "Install Mono Studio",
    description:
      "Set up the project locally with npm install, npm run dev, and the production build workflow.",
    href: "/docs/getting-started",
    tags: ["install", "setup", "npm", "run", "build", "dev"],
  },
  {
    slug: "about",
    title: "About Mono Studio",
    description:
      "Understand the design direction, component principles, and black/white technical UI approach.",
    href: "/docs/about",
    tags: ["about", "mono studio", "theme", "design", "principles"],
  },
  {
    slug: "add-component",
    title: "How to add a component",
    description:
      "Register a new component and make it automatically visible in sidebar, search, and docs routes.",
    href: "/components",
    tags: ["add", "component", "registry", "docs", "route"],
  },
];

const quickQueries = [
  "signal button",
  "install",
  "about",
  "status",
  "props",
  "theme",
];

function normalize(text: string) {
  return text.toLowerCase().trim();
}

function scoreText(text: string, query: string) {
  if (!query) {
    return 0;
  }

  const normalized = normalize(text);

  if (normalized === query) {
    return 5;
  }

  if (normalized.startsWith(query)) {
    return 4;
  }

  if (normalized.includes(query)) {
    return 2;
  }

  return 0;
}

export function SearchPage() {
  const [query, setQuery] = useState("");
  const normalizedQuery = normalize(query);

  const componentResults = useMemo(() => {
    const rows = componentRegistry
      .map((component) => {
        const score =
          scoreText(component.name, normalizedQuery) * 3 +
          scoreText(component.slug, normalizedQuery) * 3 +
          scoreText(component.description, normalizedQuery) +
          scoreText(component.status, normalizedQuery);

        return { component, score };
      })
      .filter((row) => (normalizedQuery ? row.score > 0 : true))
      .sort((a, b) => b.score - a.score);

    return rows.map((row) => row.component);
  }, [normalizedQuery]);

  const docResults = useMemo(() => {
    const rows = docsIndex
      .map((doc) => {
        const joinedTags = doc.tags.join(" ");
        const score =
          scoreText(doc.title, normalizedQuery) * 3 +
          scoreText(doc.description, normalizedQuery) +
          scoreText(joinedTags, normalizedQuery) * 2;

        return { doc, score };
      })
      .filter((row) => (normalizedQuery ? row.score > 0 : true))
      .sort((a, b) => b.score - a.score);

    return rows.map((row) => row.doc);
  }, [normalizedQuery]);

  const noResults = componentResults.length === 0 && docResults.length === 0;

  return (
    <article className="space-y-8 pb-16 pt-2">
      <header className="space-y-3 border-b border-border pb-6">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Search
        </p>
        <h1 className="studio-heading text-4xl">Find components and docs</h1>
        <p className="max-w-3xl text-base leading-7 text-muted-foreground">
          Search component names, statuses, and documentation topics like install,
          setup, about, props, and usage.
        </p>
      </header>

      <section className="studio-card space-y-4 p-5 sm:p-6">
        <label htmlFor="studio-search" className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          Search Query
        </label>
        <input
          id="studio-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search components, docs, install, about..."
          className="h-11 w-full border border-border bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        />

        <div className="flex flex-wrap gap-2">
          {quickQueries.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setQuery(preset)}
              className="inline-flex h-8 items-center justify-center border border-border bg-muted px-3 text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
            >
              {preset}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="studio-card p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="studio-heading text-xl">Components</h2>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
              {componentResults.length} found
            </p>
          </div>

          <div className="space-y-3">
            {componentResults.map((component) => (
              <article key={component.slug} className="border border-border bg-card p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="studio-heading text-lg">{component.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{component.description}</p>
                  </div>
                  <span className="border border-border bg-muted px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                    {component.status}
                  </span>
                </div>
                <Link
                  href={`/components/${component.slug}`}
                  className="mt-3 inline-flex h-9 items-center justify-center border border-border bg-muted px-3 text-sm font-medium text-foreground transition-colors hover:bg-card"
                >
                  Open Docs
                </Link>
              </article>
            ))}
          </div>
        </div>

        <div className="studio-card p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="studio-heading text-xl">Documentation</h2>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
              {docResults.length} found
            </p>
          </div>

          <div className="space-y-3">
            {docResults.map((doc) => (
              <article key={doc.slug} className="border border-border bg-card p-4">
                <h3 className="studio-heading text-lg">{doc.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{doc.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {doc.tags.slice(0, 4).map((tag) => (
                    <span
                      key={`${doc.slug}-${tag}`}
                      className="border border-border bg-muted px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={doc.href}
                  className="mt-3 inline-flex h-9 items-center justify-center border border-border bg-muted px-3 text-sm font-medium text-foreground transition-colors hover:bg-card"
                >
                  Open
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {noResults ? (
        <section className="studio-card border-dashed p-5 text-sm text-muted-foreground">
          No results found for this query. Try a component name like signal button,
          or docs terms like install, setup, and about.
        </section>
      ) : null}
    </article>
  );
}
