"use client";

import Link from "next/link";
import { useState } from "react";

import { Foldout, type FoldoutItem } from "@/components/ui/foldout";
import { cn } from "@/lib/utils";

const choiceClass = "min-h-9 border px-3 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground";

export function FoldoutInteractivePreview() {
  const [type, setType] = useState<"single" | "multiple">("single");
  const [variant, setVariant] = useState<"paper" | "inverse">("paper");
  const [size, setSize] = useState<"default" | "compact">("default");
  const [open, setOpen] = useState<string[]>(["overview"]);
  const [updates, setUpdates] = useState(true);
  const [digest, setDigest] = useState("Weekly");

  const items: FoldoutItem[] = [
    { id: "overview", title: "A little room to unfold.", description: "Keep the surface quiet. Let the details open up.", badge: "Read me", content: <div><p>A place for the details that matter, exactly when they matter. Each sheet has its own index, a folded edge, and room for something useful.</p><div className="mt-5 grid grid-cols-3 border-y border-current/15 py-3 font-mono text-[8px] uppercase tracking-[0.1em]"><span>01 / Discover</span><span>02 / Unfold</span><span>03 / Explore</span></div></div> },
    { id: "preferences", title: "Make it feel like yours.", description: "Real controls, tucked inside a sheet.", badge: "Interactive", content: <div className="space-y-5"><label className="flex cursor-pointer items-center justify-between gap-4"><span><span className="block text-sm text-[var(--fold-ink)]">Studio updates</span><span className="text-xs">Hear about new components.</span></span><input type="checkbox" checked={updates} onChange={(event) => setUpdates(event.target.checked)} className="h-4 w-4 shrink-0 accent-[var(--fold-ink)]" /></label><label className="flex flex-wrap items-center justify-between gap-3"><span className="text-sm text-[var(--fold-ink)]">Your digest</span><select aria-label="Digest frequency" value={digest} onChange={(event) => setDigest(event.target.value)} className="border border-[var(--fold-line)] bg-[var(--fold-paper)] px-3 py-2 text-xs text-[var(--fold-ink)]"><option>Weekly</option><option>Monthly</option></select></label><p role="status" className="border-t border-dashed border-current/20 pt-3 font-mono text-[9px]">{updates ? `${digest} updates enabled.` : "Updates paused."} Your choices stay when you close this sheet.</p></div> },
    { id: "handoff", title: "Yours to build with.", description: "One component. Your content, your application.", badge: "Source", content: <div><p>Use Foldout for FAQs, settings, onboarding notes, or a project&apos;s finer details. Bring text, links, forms, or your own components.</p><Link href="/docs/components/foldout/usage" className="mt-4 inline-flex min-h-9 items-center gap-5 border border-current/25 px-3 text-xs text-[var(--fold-ink)] hover:border-current">Get the component <span aria-hidden="true">↗</span></Link></div> },
    { id: "reserved", title: "Something for later.", description: "A disabled sheet, waiting for its moment.", disabled: true, content: <p>This section is unavailable.</p> },
  ];

  return <div className="grid w-full min-w-0 gap-8 lg:grid-cols-[minmax(0,.7fr)_minmax(0,1.3fr)] lg:items-start" data-foldout-playground="">
    <div className="space-y-6">
      <div><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Mono / Signature 010</p><h3 className="studio-heading mt-3 text-3xl">Details worth unfolding.</h3><p className="mt-3 max-w-xs text-xs leading-6 text-muted-foreground">An indexed spine. A folded corner. Sheets that open with a little ceremony. Try the controls inside, or use the arrow keys to explore.</p></div>
      <fieldset><legend className="mb-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">Behavior</legend><div className="flex flex-wrap gap-2">{(["single", "multiple"] as const).map((entry) => <button key={entry} type="button" data-foldout-type={entry} aria-pressed={type === entry} onClick={() => { setType(entry); if (entry === "single") setOpen((current) => current.slice(0, 1)); }} className={cn(choiceClass, type === entry ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground")}>{entry === "single" ? "One sheet" : "Many sheets"}</button>)}</div></fieldset>
      <fieldset><legend className="mb-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">Surface</legend><div className="flex flex-wrap gap-2">{(["paper", "inverse"] as const).map((entry) => <button key={entry} type="button" data-foldout-variant={entry} aria-pressed={variant === entry} onClick={() => setVariant(entry)} className={cn(choiceClass, "capitalize", variant === entry ? "border-foreground bg-muted" : "border-border hover:border-foreground")}>{entry}</button>)}</div></fieldset>
      <fieldset><legend className="mb-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">Spacing</legend><div className="flex flex-wrap gap-2">{(["default", "compact"] as const).map((entry) => <button key={entry} type="button" data-foldout-size={entry} aria-pressed={size === entry} onClick={() => setSize(entry)} className={cn(choiceClass, size === entry ? "border-foreground bg-muted" : "border-border hover:border-foreground")}>{entry === "default" ? "Roomy" : "Compact"}</button>)}</div></fieldset>
      <p className="max-w-xs text-xs leading-6 text-muted-foreground" role="status">{open.length ? `${open.length} ${open.length === 1 ? "sheet" : "sheets"} unfolded.` : "All sheets closed."} Enter or Space opens a sheet. ↑ / ↓ moves between headings.</p>
    </div>
    <Foldout items={items} label="Workspace handbook" type={type} value={open} onValueChange={setOpen} variant={variant} size={size} />
  </div>;
}

const catalogItems: FoldoutItem[] = [
  { id: "idea", title: "A little room to unfold.", content: <p>Give your details a place of their own.</p> },
  { id: "possibility", title: "More than meets the eye.", content: <p>Your content, revealed with intention.</p> },
];

export function FoldoutCatalogPreview() {
  return <Foldout label="Mono / 010" size="compact" items={catalogItems} className="max-w-[350px]" />;
}

export function FoldoutVariants() {
  const items: FoldoutItem[] = [
    { id: "delivery", title: "How does it arrive?", badge: "01", content: <p>As React source and a companion stylesheet. Copy both into your application and make them your own.</p> },
    { id: "theme", title: "Does it follow my theme?", badge: "02", content: <p>Paper and inverse surfaces both follow your application&apos;s light and dark theme tokens.</p> },
  ];
  return <div className="grid min-w-0 gap-8 lg:grid-cols-2"><Foldout label="01 / Paper, one at a time" items={items} defaultValue={["delivery"]} size="compact" /><Foldout label="02 / Inverse, open together" items={items} type="multiple" defaultValue={["delivery", "theme"]} variant="inverse" size="compact" /></div>;
}
