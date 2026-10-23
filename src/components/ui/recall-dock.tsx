"use client";

import { useId, useState } from "react";

import { cn } from "@/lib/utils";

export type RecallItem = {
  id: string;
  label: string;
  detail?: string;
};

export type RecallDockProps = {
  items: RecallItem[];
  onUndo: (id: string) => void;
  onDismiss: (id: string) => void;
  className?: string;
  "aria-label"?: string;
};

/**
 * A controlled receipt trail for reversible actions. The parent owns the
 * actual undo operation and removes a receipt after undo or dismissal.
 */
export function RecallDock({
  items,
  onUndo,
  onDismiss,
  className,
  "aria-label": ariaLabel = "Recent actions",
}: RecallDockProps) {
  const [expanded, setExpanded] = useState(false);
  const trailId = useId();

  if (items.length === 0) return null;

  const newestFirst = [...items].reverse();
  const visibleItems = expanded ? newestFirst : newestFirst.slice(0, 1);

  return (
    <section
      aria-label={ariaLabel}
      className={cn(
        "w-full max-w-[390px] border border-foreground bg-card text-card-foreground shadow-[6px_6px_0_var(--color-border)]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-border bg-muted px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-foreground" />
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em]">
            Recall dock
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
          {String(items.length).padStart(2, "0")} reversible
        </span>
      </div>

      <div id={trailId}>
        {visibleItems.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              "grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3 px-4 py-3.5",
              index > 0 && "border-t border-border",
            )}
          >
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-6 w-6 items-center justify-center border border-border bg-muted font-mono text-[10px] text-muted-foreground"
            >
              {String(items.length - index).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <p className="break-words text-sm font-medium leading-5">{item.label}</p>
              {item.detail && (
                <p className="mt-0.5 break-words text-xs leading-5 text-muted-foreground">
                  {item.detail}
                </p>
              )}
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onUndo(item.id)}
                aria-label={`Undo ${item.label}`}
                className="border border-foreground bg-foreground px-2.5 py-1.5 text-xs font-semibold text-background transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-card"
              >
                Undo
              </button>
              <button
                type="button"
                onClick={() => onDismiss(item.id)}
                aria-label={`Dismiss ${item.label}`}
                className="flex h-[29px] w-[29px] items-center justify-center text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
              >
                <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-none stroke-current stroke-[1.5]">
                  <path d="M3 3l10 10M13 3L3 13" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <button
          type="button"
          aria-controls={trailId}
          aria-expanded={expanded}
          onClick={() => setExpanded((value) => !value)}
          className="flex w-full items-center justify-between border-t border-border px-4 py-2.5 text-left font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground"
        >
          <span>{expanded ? "Fold action trail" : `View ${items.length - 1} earlier action${items.length === 2 ? "" : "s"}`}</span>
          <span aria-hidden="true">{expanded ? "−" : "+"}</span>
        </button>
      )}
    </section>
  );
}
