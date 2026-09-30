import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="studio-card space-y-4 p-6 sm:p-8">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
        404
      </p>
      <h1 className="studio-heading text-3xl">
        Component not found
      </h1>
      <p className="max-w-xl text-sm leading-6 text-muted-foreground">
        The requested page does not exist in this studio build.
      </p>
      <Link
        href="/components"
        className="inline-flex h-9 items-center justify-center border border-border bg-card px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Back to components
      </Link>
    </section>
  );
}
