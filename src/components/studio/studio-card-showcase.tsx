"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { SignalButton, type SignalButtonStatus } from "@/components/ui/signal-button";
import { StudioCard, type StudioCardSize, type StudioCardVariant } from "@/components/ui/studio-card";
import { cn } from "@/lib/utils";

type ContentType = "component" | "project" | "editorial";

const entries = {
  component: { title: "Signal Button", description: "A small action with a clear sense of what happens next.", eyebrow: "Component / 01" },
  project: { title: "Atlas workspace", description: "A little structure for your next big idea. All the important details, together.", eyebrow: "Workspace / 02" },
  editorial: { title: "Studies in negative space", description: "On the shapes we keep, the space we leave, and the details that make something feel considered.", eyebrow: "Field notes / 03" },
};

function CardIcon() {
  return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M3 3h6v6H3zM11 11h6v6h-6zM12 3h5v5M3 12v5h5" /></svg>;
}

function ProjectSketch() {
  return (
    <div className="w-full max-w-[230px] py-1">
      <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.12em] opacity-55"><span>Workspace overview</span><span>03 active</span></div>
      <svg aria-hidden="true" viewBox="0 0 240 90" className="my-3 w-full fill-none stroke-current">
        <path d="M1 20h238M1 45h238M1 70h238" opacity=".12" strokeDasharray="2 5" />
        <path d="m2 70 31-12 32 3 30-28 30 8 33-20 31 6 49-23" strokeWidth="1.5" />
        <path d="M2 70 33 58 65 61 95 33l30 8 33-20 31 6 49-23v85H2V70Z" fill="currentColor" fillOpacity=".04" stroke="none" />
        <circle cx="95" cy="33" r="3" fill="currentColor" /><circle cx="189" cy="27" r="3" fill="currentColor" />
      </svg>
      <div className="flex items-baseline gap-2"><span className="text-3xl font-medium tracking-[-0.05em]">98.4</span><span className="font-mono text-[9px] uppercase tracking-[0.12em] opacity-50">Activity score</span></div>
    </div>
  );
}

const choiceClass = "min-h-9 rounded-sm border px-3 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground";

export function StudioCardInteractivePreview() {
  const [content, setContent] = useState<ContentType>("component");
  const [variant, setVariant] = useState<StudioCardVariant>("default");
  const [size, setSize] = useState<StudioCardSize>("default");
  const [saved, setSaved] = useState<ContentType[]>([]);
  const [status, setStatus] = useState<SignalButtonStatus>("idle");
  const [feedback, setFeedback] = useState("Hover the card or tab to its actions to reveal the backing layer.");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  function runPreview() {
    if (status === "processing") return;
    setStatus("processing");
    timer.current = setTimeout(() => {
      setStatus("success");
      setFeedback("The preview action finished. Nested controls work independently of the card.");
    }, 900);
  }

  const isSaved = saved.includes(content);
  const media = content === "editorial"
    ? { image: { src: "/studio-card-cover.svg", alt: "Three monochrome surfaces stacked into an architectural paper study", width: 1200, height: 750 } }
    : { preview: content === "project" ? <ProjectSketch /> : <div className="flex flex-col items-center gap-4 py-3"><SignalButton status={status} labels={{ processing: "Running", success: "Done" }} onClick={runPreview}>Run</SignalButton><span className="font-mono text-[9px] uppercase tracking-[0.12em] opacity-50">A real, interactive preview</span></div> };

  return (
    <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] lg:items-center">
      <div className="space-y-7">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Mono / Signature 008</p>
          <h3 className="studio-heading mt-3 text-3xl leading-tight">An edge of its own.</h3>
          <p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground">An indexed shoulder. A clipped corner. A second surface, revealed with a little movement. One considered frame for many kinds of content.</p>
        </div>

        <fieldset className="space-y-3">
          <legend className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Content</legend>
          <div className="flex flex-wrap gap-2">{(["component", "project", "editorial"] as const).map((value) => <button key={value} type="button" data-card-content-control={value} aria-pressed={content === value} onClick={() => setContent(value)} className={cn(choiceClass, "capitalize", content === value ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground")}>{value}</button>)}</div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Surface</legend>
          <div className="flex flex-wrap gap-2">{(["default", "inverse"] as const).map((value) => <button key={value} type="button" data-card-variant-control={value} aria-pressed={variant === value} onClick={() => setVariant(value)} className={cn(choiceClass, variant === value ? "border-foreground bg-muted" : "border-border hover:border-foreground")}>{value === "default" ? "Paper" : "Inverse"}</button>)}</div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Spacing</legend>
          <div className="flex flex-wrap gap-2">{(["default", "compact"] as const).map((value) => <button key={value} type="button" data-card-size-control={value} aria-pressed={size === value} onClick={() => setSize(value)} className={cn(choiceClass, size === value ? "border-foreground bg-muted" : "border-border hover:border-foreground")}>{value === "default" ? "Roomy" : "Compact"}</button>)}</div>
        </fieldset>
        <p role="status" className="max-w-sm text-xs leading-6 text-muted-foreground">{feedback}</p>
      </div>

      <div data-card-playground="" className="flex min-h-[560px] items-center justify-center border border-border bg-muted/40 p-4 sm:p-6">
        <StudioCard
          {...entries[content]}
          {...media}
          variant={variant}
          size={size}
          icon={content === "editorial" ? undefined : <CardIcon />}
          badge={isSaved ? "Saved" : content === "component" ? "Live" : content === "project" ? "Private" : "6 min read"}
          className="w-full max-w-[420px]"
          actions={<>
            <button type="button" aria-pressed={isSaved} onClick={() => { setSaved((current) => isSaved ? current.filter((entry) => entry !== content) : [...current, content]); setFeedback(isSaved ? "Removed from your collection." : "Saved to your collection."); }} className="inline-flex min-h-9 items-center gap-4 bg-[var(--card-ink)] px-3 text-xs font-medium text-[var(--card-surface)] transition-opacity hover:opacity-75">{isSaved ? "Saved to collection" : "Save to collection"}<span aria-hidden="true">{isSaved ? "✓" : "+"}</span></button>
            <Link href="/docs/components/studio-card" className="text-xs underline underline-offset-4 opacity-70 hover:opacity-100">Read docs</Link>
          </>}
          footer={<div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[9px] uppercase tracking-[0.12em] opacity-60"><span>{content === "component" ? "React / TypeScript" : content === "project" ? "Updated just now" : "Design / Process"}</span><span>Mono Studio ↗</span></div>}
        >
          {content === "project" && <div className="grid grid-cols-2 gap-4 border-t border-current/10 pt-3"><div><span className="block text-lg font-medium">12</span><span className="font-mono text-[9px] uppercase tracking-[0.1em] opacity-55">Resources</span></div><div><span className="block text-lg font-medium">03</span><span className="font-mono text-[9px] uppercase tracking-[0.1em] opacity-55">Collaborators</span></div></div>}
        </StudioCard>
      </div>
    </div>
  );
}

export function StudioCardCatalogPreview() {
  return <StudioCard title="An edge of its own." description="One frame. Many possibilities." eyebrow="Mono / 008" badge="Original" size="compact" headingLevel={4} className="w-full max-w-[290px]" footer={<span className="font-mono text-[9px] uppercase tracking-[0.1em] opacity-55">Hover to reveal the second surface</span>} />;
}

export function StudioCardVariants() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <StudioCard title="Quietly structured." description="A generous paper surface for content that needs room to breathe." eyebrow="Surface / 01" badge="Default" preview={<ProjectSketch />} footer={<span className="font-mono text-[10px] uppercase tracking-[0.12em] opacity-60">Default surface / Roomy spacing</span>} />
      <StudioCard title="A different perspective." description="The same silhouette, with the surface and ink reversed." eyebrow="Surface / 02" badge="Inverse" variant="inverse" preview={<ProjectSketch />} footer={<span className="font-mono text-[10px] uppercase tracking-[0.12em] opacity-60">Inverse surface / Roomy spacing</span>} />
    </div>
  );
}
