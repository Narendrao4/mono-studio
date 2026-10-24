"use client";

import { useEffect, useRef, useState } from "react";

import {
  SnakeSpinner,
  type SnakeSpinnerColor,
  type SnakeSpinnerSize,
  type SnakeSpinnerVariant,
} from "@/components/ui/snake-spinner";
import { cn } from "@/lib/utils";

const variants: Array<{ value: SnakeSpinnerVariant; label: string; detail: string }> = [
  { value: "orbit", label: "Orbit", detail: "One tapered snake follows a circular path." },
  { value: "coil", label: "Coil", detail: "A longer snake curls inward, then rotates as one." },
  { value: "chase", label: "Chase", detail: "Two snakes follow each other around the same ring." },
];

const colors: Array<{ value: SnakeSpinnerColor; hex: string }> = [
  { value: "black", hex: "#111111" },
  { value: "white", hex: "#ffffff" },
  { value: "red", hex: "#dc2626" },
  { value: "green", hex: "#15803d" },
  { value: "blue", hex: "#2563eb" },
  { value: "violet", hex: "#7c3aed" },
];

const controlClass = "rounded-lg border px-3 py-2 text-xs font-medium capitalize transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground";

export function SnakeSpinnerInteractivePreview() {
  const [variant, setVariant] = useState<SnakeSpinnerVariant>("orbit");
  const [color, setColor] = useState<SnakeSpinnerColor>("black");
  const [size, setSize] = useState<SnakeSpinnerSize>("lg");
  const [buttonBusy, setButtonBusy] = useState(false);
  const [overlayFile, setOverlayFile] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("Try a loading state. The demos finish after four seconds.");
  const buttonTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const overlayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const darkCanvas = color === "white";

  useEffect(() => () => {
    if (buttonTimer.current) clearTimeout(buttonTimer.current);
    if (overlayTimer.current) clearTimeout(overlayTimer.current);
  }, []);

  function previewButton() {
    if (buttonBusy) return;
    setButtonBusy(true);
    setFeedback("Button loading preview is running.");
    buttonTimer.current = setTimeout(() => {
      setButtonBusy(false);
      setFeedback("Button preview complete. Ready for the next action.");
    }, 4000);
  }

  function previewOverlay(name = "Project-brief.pdf") {
    if (overlayTimer.current) clearTimeout(overlayTimer.current);
    setOverlayFile(name);
    overlayTimer.current = setTimeout(() => {
      setOverlayFile(null);
      setFeedback("Document loading preview complete.");
    }, 4000);
  }

  function cancelOverlay() {
    if (overlayTimer.current) clearTimeout(overlayTimer.current);
    setOverlayFile(null);
    setFeedback("Document loading preview cancelled.");
  }

  return (
    <div className="w-full max-w-5xl space-y-7">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">One motion. Every loading state.</p>
            <h3 className="studio-heading mt-3 text-2xl leading-tight sm:text-3xl">A little patience, in motion.</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Choose your snake, then use it beside content, inside a button, or in the middle of the page.</p>
          </div>

          <div className="space-y-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Snake style</p>
            <div role="group" aria-label="Spinner style" className="flex flex-wrap gap-2">
              {variants.map((option) => <button key={option.value} type="button" data-spinner-variant-control={option.value} aria-pressed={variant === option.value} onClick={() => setVariant(option.value)} className={cn(controlClass, variant === option.value ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground")}>{option.label}</button>)}
            </div>
          </div>

          <div className="space-y-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Color</p>
            <div role="group" aria-label="Spinner color" className="flex flex-wrap gap-2">
              {colors.map((option) => (
                <button key={option.value} type="button" data-spinner-color-control={option.value} aria-label={`${option.value} spinner`} aria-pressed={color === option.value} onClick={() => setColor(option.value)} className={cn("flex h-9 w-9 items-center justify-center rounded-lg border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground", color === option.value ? "border-foreground bg-muted" : "border-border hover:border-foreground")}>
                  <span aria-hidden="true" className="h-4 w-4 rounded-full border border-black/15" style={{ backgroundColor: option.hex }} />
                </button>
              ))}
            </div>
          </div>

          <div role="group" aria-label="Spinner size" className="flex flex-wrap items-center gap-2">
            <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Size</span>
            {(["sm", "md", "lg"] as const).map((option) => <button key={option} type="button" data-spinner-size-control={option} aria-pressed={size === option} onClick={() => setSize(option)} className={cn(controlClass, size === option ? "border-foreground bg-muted" : "border-border hover:border-foreground")}>{option}</button>)}
          </div>
        </div>

        <div data-spinner-canvas="" className="relative flex min-h-72 flex-col items-center justify-center overflow-hidden rounded-2xl border" style={{ backgroundColor: darkCanvas ? "#111111" : "#ffffff", color: darkCanvas ? "#ffffff" : "#111111", borderColor: darkCanvas ? "#333333" : "#e5e5e5" }}>
          <span className="absolute left-4 top-4 font-mono text-[9px] uppercase tracking-[0.16em] opacity-45">Inline preview</span>
          <div aria-hidden="true" className="pointer-events-none absolute h-44 w-44 rounded-full border border-current opacity-[0.04]" />
          <div aria-hidden="true" className="pointer-events-none absolute h-60 w-60 rounded-full border border-current opacity-[0.04]" />
          <div className="relative flex h-24 items-center justify-center">
            <SnakeSpinner variant={variant} color={color} size={size} label="Loading document preview" />
          </div>
          <p className="mt-4 text-sm font-medium">Something good is on its way.</p>
          <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] opacity-45">{variant} / {color} / {size}</span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <section className="studio-card flex flex-col items-start gap-4 rounded-xl p-5">
          <div>
            <h4 className="text-sm font-semibold">Inside a button</h4>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">The label changes and repeat clicks are blocked while loading.</p>
          </div>
          <SnakeSpinner mode="button" loading={buttonBusy} variant={variant} color={color} label="Saving changes..." onClick={previewButton} style={{ backgroundColor: darkCanvas ? "#111111" : "#ffffff", color: darkCanvas ? "#ffffff" : "#111111", borderColor: darkCanvas ? "#333333" : "#e5e5e5" }}>Try button loading</SnakeSpinner>
        </section>

        <section className="studio-card flex flex-col items-start gap-4 rounded-xl p-5">
          <div>
            <h4 className="text-sm font-semibold">Across the whole page</h4>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">A darkened background and a centered snake for document loading.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => previewOverlay()} className="min-h-11 rounded-lg bg-foreground px-4 text-xs font-medium text-background hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground">Preview page overlay</button>
            <button type="button" onClick={() => fileInput.current?.click()} className="min-h-11 rounded-lg border border-border px-3 text-xs font-medium hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground">Choose document</button>
          </div>
          <input ref={fileInput} type="file" aria-label="Choose a document for the loading preview" className="hidden" accept=".pdf,.doc,.docx,.txt,.md,.csv,.xlsx,.pptx" onChange={(event) => { const file = event.target.files?.[0]; if (file) previewOverlay(file.name); event.target.value = ""; }} />
          <p className="text-[11px] leading-5 text-muted-foreground">This is a local preview. Selected files are not uploaded.</p>
        </section>
      </div>
      <p role="status" className="text-xs leading-5 text-muted-foreground">{feedback}</p>
      <SnakeSpinner mode="overlay" loading={overlayFile !== null} variant={variant} color={color} size={size} label="Uploading document" description={overlayFile ?? undefined} onCancel={cancelOverlay} />
    </div>
  );
}

export function SnakeSpinnerCatalogPreview() {
  return (
    <div className="flex w-full max-w-sm items-center justify-around gap-3">
      {variants.map((variant, index) => <div key={variant.value} className="flex flex-col items-center gap-3"><SnakeSpinner variant={variant.value} color={index === 0 ? "current" : index === 1 ? "blue" : "green"} size="lg" label={`${variant.label} loading preview`} /><span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{variant.label}</span></div>)}
    </div>
  );
}

export function SnakeSpinnerVariants() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {variants.map((variant) => (
        <section key={variant.value} className="studio-card flex flex-col items-center rounded-xl p-6 text-center">
          <SnakeSpinner variant={variant.value} size="lg" label={`${variant.label} loading preview`} />
          <h3 className="mt-5 text-sm font-semibold">{variant.label}</h3>
          <p className="mt-2 text-xs leading-6 text-muted-foreground">{variant.detail}</p>
        </section>
      ))}
    </div>
  );
}
