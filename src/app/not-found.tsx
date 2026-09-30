import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="space-y-4 border border-neutral-200 p-6 sm:p-8 dark:border-neutral-800">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
        404
      </p>
      <h1 className="text-3xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
        Component not found
      </h1>
      <p className="max-w-xl text-sm leading-6 text-neutral-600 dark:text-neutral-300">
        The requested page does not exist in this studio build.
      </p>
      <Link
        href="/components"
        className="inline-flex h-9 items-center justify-center border border-neutral-300 px-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-900"
      >
        Back to components
      </Link>
    </section>
  );
}
