"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { componentRegistry } from "@/data/components";
import { cn } from "@/lib/utils";

function ComponentLinks() {
  const pathname = usePathname();

  return (
    <ul className="space-y-1">
      {componentRegistry.map((component) => {
        const href = `/components/${component.slug}`;
        const active = pathname === href;

        return (
          <li key={component.slug}>
            <Link
              href={href}
              className={cn(
                "group flex items-center justify-between border border-transparent px-3 py-2 text-sm transition-colors",
                active
                  ? "border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-950"
                  : "text-neutral-700 hover:border-neutral-200 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:border-neutral-800 dark:hover:bg-neutral-900",
              )}
            >
              <span>{component.name}</span>
              <span
                className={cn(
                  "text-[10px] uppercase tracking-[0.12em]",
                  active
                    ? "text-white/80 dark:text-neutral-700"
                    : "text-neutral-500 dark:text-neutral-500",
                )}
              >
                {component.status}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function StudioSidebar() {
  return (
    <>
      <section className="mb-6 border border-neutral-200 p-4 md:hidden dark:border-neutral-800">
        <details>
          <summary className="cursor-pointer text-sm font-medium text-neutral-800 marker:text-neutral-400 dark:text-neutral-200">
            Browse components
          </summary>
          <div className="mt-3">
            <ComponentLinks />
          </div>
        </details>
      </section>

      <aside className="sticky top-24 hidden h-fit w-64 shrink-0 border border-neutral-200 p-4 md:block dark:border-neutral-800">
        <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
          Components
        </h2>
        <ComponentLinks />
      </aside>
    </>
  );
}
