import Link from "next/link";

import { componentRegistry } from "@/data/components";

export default function Home() {
  const firstComponent = componentRegistry[0];

  return (
    <div className="space-y-12 pb-16 pt-6 sm:pt-10">
      <section className="space-y-6 border border-neutral-200 p-6 sm:p-8 dark:border-neutral-800">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
          Mono Studio
        </p>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl dark:text-neutral-50">
          Original React components.
          <br />
          Built from first principles.
        </h1>
        <p className="max-w-2xl text-base leading-7 text-neutral-600 dark:text-neutral-300">
          A production-ready studio for browsing components, previewing behavior,
          reading source, and copying implementation code.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/components"
            className="inline-flex h-10 items-center justify-center border border-neutral-950 bg-neutral-950 px-4 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-neutral-300"
          >
            Browse Components
          </Link>
          <a
            href="https://github.com/narendrao4/mono-studio"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center justify-center border border-neutral-300 px-4 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-900"
          >
            View GitHub
          </a>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
          First component
        </h2>
        <article className="border border-neutral-200 p-6 dark:border-neutral-800">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
                {firstComponent.name}
              </h3>
              <p className="max-w-2xl text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                {firstComponent.description}
              </p>
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
              {firstComponent.status}
            </p>
          </div>

          <Link
            href={`/components/${firstComponent.slug}`}
            className="mt-5 inline-flex h-10 items-center justify-center border border-neutral-300 px-4 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-900"
          >
            Open Signal Button
          </Link>
        </article>
      </section>
    </div>
  );
}
