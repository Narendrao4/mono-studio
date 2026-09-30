import Link from "next/link";

import { ThemeToggle } from "@/components/studio/theme-toggle";

const navLinkClassName =
  "inline-flex h-9 items-center justify-center border border-transparent px-3 text-sm text-neutral-600 transition-colors hover:border-neutral-200 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:border-neutral-800 dark:hover:bg-neutral-900 dark:hover:text-neutral-100";

export function StudioHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-950/95">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-mono text-sm font-semibold uppercase tracking-[0.24em] text-neutral-950 transition-opacity hover:opacity-70 dark:text-neutral-50"
        >
          Mono Studio
        </Link>

        <nav className="flex items-center gap-1" aria-label="Main navigation">
          <Link href="/components" className={navLinkClassName}>
            Components
          </Link>
          <a
            href="https://github.com/narendrao4/mono-studio"
            target="_blank"
            rel="noreferrer"
            className={navLinkClassName}
          >
            GitHub
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
