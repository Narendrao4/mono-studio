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
                "group flex items-center justify-between border px-3 py-2 text-sm transition-colors",
                active
                  ? "border-foreground bg-foreground text-background"
                  : "border-transparent text-foreground hover:border-border hover:bg-muted",
              )}
            >
              <span>{component.name}</span>
              <span
                className={cn(
                  "text-[10px] uppercase tracking-[0.12em]",
                  active
                    ? "text-background/70"
                    : "text-muted-foreground",
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
    <aside className="studio-card sticky top-[calc(var(--studio-header-height)+1rem)] hidden h-fit w-[240px] shrink-0 p-4 xl:block">
      <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
        Components
      </h2>
      <ComponentLinks />
    </aside>
  );
}
