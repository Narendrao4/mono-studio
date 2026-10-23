import Link from "next/link";

import { cn } from "@/lib/utils";

export function ComponentGuideLinks({ slug, name, compact = false }: { slug: string; name: string; compact?: boolean }) {
  return (
    <nav aria-label={`${name} guides`} data-component-guides={slug} className={compact ? "flex flex-wrap gap-2" : "grid gap-3 sm:grid-cols-2"}>
      {[
        { href: `/docs/components/${slug}`, label: "Documentation", detail: "API reference and design guidelines" },
        { href: `/docs/components/${slug}/usage`, label: "How to use", detail: "Application setup and code examples" },
      ].map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-label={`${link.label} for ${name}`}
          className={cn("group flex items-center justify-between gap-4 border border-border bg-card text-foreground transition-colors hover:border-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground", compact ? "min-h-9 px-3 py-2 text-xs font-medium" : "p-5")}
        >
          <span>
            <span className={cn("block font-medium", compact ? "text-xs" : "text-sm")}>{link.label}</span>
            {!compact && <span className="mt-1 block text-xs leading-5 text-muted-foreground">{link.detail}</span>}
          </span>
          <span aria-hidden="true" className="text-muted-foreground transition-transform group-hover:translate-x-1">→</span>
        </Link>
      ))}
    </nav>
  );
}
