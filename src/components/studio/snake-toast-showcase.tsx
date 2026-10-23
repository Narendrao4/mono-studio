"use client";

import { useState } from "react";

import { SnakeToast, type SnakeToastMessage, type SnakeToastVariant } from "@/components/ui/snake-toast";
import { cn } from "@/lib/utils";

const variants: SnakeToastVariant[] = ["white", "black", "red", "green"];

const examples: Record<SnakeToastVariant, { title: string; description: string }> = {
  white: { title: "Your changes are saved", description: "Everything is right where you left it." },
  black: { title: "Workspace synced", description: "You have the latest version of everything." },
  red: { title: "Upload interrupted", description: "Check your connection and try again." },
  green: { title: "You are all set", description: "Your changes have been saved successfully." },
};

const surfaceClasses: Record<SnakeToastVariant, string> = {
  white: "border-neutral-200 bg-white text-neutral-950",
  black: "border-neutral-700 bg-[#111111] text-white",
  red: "border-red-400 bg-[#b91c1c] text-white",
  green: "border-green-600 bg-[#166534] text-white",
};

function useToastPreview() {
  const [toast, setToast] = useState<SnakeToastMessage | null>(null);

  function show(variant: SnakeToastVariant) {
    setToast({ id: crypto.randomUUID(), variant, ...examples[variant] });
  }

  function dismiss(id: string) {
    setToast((current) => current?.id === id ? null : current);
  }

  return { toast, show, dismiss };
}

function ToastAppearance({ variant }: { variant: SnakeToastVariant }) {
  return (
    <div className={cn("relative w-full max-w-[360px] overflow-hidden rounded-[18px] border p-5 shadow-[0_12px_32px_-16px_rgba(0,0,0,0.25)]", surfaceClasses[variant])}>
      <div className="flex items-start gap-3">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 fill-none stroke-current stroke-[1.7]">
          <path d="M2 15c4 0 3-8 7-8s3 10 7 10 3-8 6-8" strokeLinecap="round" />
        </svg>
        <div>
          <p className="text-sm font-semibold leading-5">{examples[variant].title}</p>
          <p className="mt-1 text-xs leading-5 opacity-75">{examples[variant].description}</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute bottom-0 left-5 h-0.5 w-2/3 bg-current opacity-30" />
    </div>
  );
}

export function SnakeToastInteractivePreview() {
  const [variant, setVariant] = useState<SnakeToastVariant>("white");
  const { toast, show, dismiss } = useToastPreview();

  return (
    <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-2 lg:items-center">
      <div className="space-y-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Small message. A little motion.</p>
          <h3 className="studio-heading mt-3 text-2xl leading-tight sm:text-3xl">Let it slither into view.</h3>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
            A gentle weave from the right, a line that follows the edge, then a quiet exit after three seconds.
          </p>
        </div>

        <div className="space-y-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Choose a color</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Toast color">
            {variants.map((color) => (
              <button
                key={color}
                type="button"
                data-toast-color={color}
                aria-pressed={variant === color}
                onClick={() => setVariant(color)}
                className={cn("flex h-10 items-center gap-2 rounded-lg border px-3 text-xs capitalize transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground", variant === color ? "border-foreground bg-muted text-foreground" : "border-border text-muted-foreground hover:border-foreground")}
              >
                <span aria-hidden="true" className={cn("h-3 w-3 rounded-full border", surfaceClasses[color])} />
                {color}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => show(variant)}
            className="inline-flex h-11 items-center gap-5 rounded-lg bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
          >
            Show notification <span aria-hidden="true">↗</span>
          </button>
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">Bottom right / 3 sec</span>
        </div>
      </div>

      <div className="relative flex min-h-64 flex-col items-center justify-end overflow-hidden rounded-xl border border-dashed border-border bg-muted/50 px-5 pb-8 pt-20 sm:px-8">
        <span className="absolute left-4 top-4 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">Appearance preview</span>
        <svg aria-hidden="true" viewBox="0 0 360 120" className="pointer-events-none absolute right-0 top-7 h-24 w-full fill-none stroke-foreground/15">
          <path d="M370 8c-45 0-40 80-88 80s-36-60-88-60-44 65-90 65" strokeWidth="1.5" strokeDasharray="4 5" />
          <circle cx="104" cy="93" r="3" fill="currentColor" stroke="none" />
        </svg>
        <ToastAppearance variant={variant} />
        <p className="mt-5 text-center text-xs leading-5 text-muted-foreground">Press Show notification to see it move.</p>
      </div>
      <SnakeToast toast={toast} onDismiss={dismiss} />
    </div>
  );
}

export function SnakeToastCatalogPreview() {
  const { toast, show, dismiss } = useToastPreview();

  return (
    <div className="flex w-full max-w-[360px] flex-col items-center gap-5">
      <ToastAppearance variant="white" />
      <button type="button" onClick={() => show("white")} className="text-xs font-medium underline underline-offset-4 hover:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground">
        Play snake animation
      </button>
      <SnakeToast toast={toast} onDismiss={dismiss} />
    </div>
  );
}

export function SnakeToastVariants() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {variants.map((variant) => (
        <div key={variant} className="studio-card space-y-4 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium capitalize">{variant}{variant === "white" ? " / Default" : ""}</h3>
            <code className="text-[10px] text-muted-foreground">variant=&quot;{variant}&quot;</code>
          </div>
          <ToastAppearance variant={variant} />
        </div>
      ))}
    </div>
  );
}
