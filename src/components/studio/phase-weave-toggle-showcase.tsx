"use client";

import { useMemo, useState } from "react";

import {
  PhaseWeaveToggle,
  type PhaseWeaveOption,
} from "@/components/ui/phase-weave-toggle";

const previewOptions: PhaseWeaveOption[] = [
  { value: "dock", label: "Dock", pulse: "anchor" },
  { value: "scan", label: "Scan", pulse: "inspect" },
  { value: "route", label: "Route", pulse: "vector" },
  { value: "fire", label: "Fire", pulse: "commit" },
];

const modeDetails: Record<
  string,
  {
    title: string;
    description: string;
  }
> = {
  dock: {
    title: "Dock mode",
    description: "Stabilizes decisions before any action is emitted.",
  },
  scan: {
    title: "Scan mode",
    description: "Expands checks and reveals soft warnings before commit.",
  },
  route: {
    title: "Route mode",
    description: "Builds the intended path and keeps intermediate checkpoints.",
  },
  fire: {
    title: "Fire mode",
    description: "Executes the selected route and hardens the output lane.",
  },
};

const denseOptions: PhaseWeaveOption[] = [
  { value: "seed", label: "Seed", pulse: "prep" },
  { value: "mesh", label: "Mesh", pulse: "link" },
  { value: "forge", label: "Forge", pulse: "shape" },
  { value: "ship", label: "Ship", pulse: "launch" },
  { value: "trace", label: "Trace", pulse: "audit" },
];

export function PhaseWeaveInteractivePreview() {
  const [mode, setMode] = useState(previewOptions[0].value);

  const detail = useMemo(() => {
    return modeDetails[mode] ?? modeDetails.dock;
  }, [mode]);

  return (
    <div className="w-full space-y-6">
      <div className="studio-card space-y-4 p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            Live preview
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            mode: {mode}
          </p>
        </div>

        <div className="border border-border bg-muted p-5">
          <PhaseWeaveToggle
            options={previewOptions}
            value={mode}
            onValueChange={setMode}
            size="lg"
            aria-label="Phase weave interactive preview"
          />
        </div>
      </div>

      <div className="studio-card space-y-2 p-4">
        <h3 className="studio-heading text-lg">{detail.title}</h3>
        <p className="text-sm leading-6 text-muted-foreground">{detail.description}</p>
      </div>
    </div>
  );
}

export function PhaseWeaveVariants() {
  return (
    <div className="space-y-8">
      <section className="studio-card space-y-3 p-4">
        <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          Sizes
        </h3>
        <div className="space-y-3">
          <PhaseWeaveToggle options={previewOptions} size="sm" defaultValue="scan" />
          <PhaseWeaveToggle options={previewOptions} size="md" defaultValue="route" />
          <PhaseWeaveToggle options={previewOptions} size="lg" defaultValue="dock" />
        </div>
      </section>

      <section className="studio-card space-y-3 p-4">
        <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          Dense lane
        </h3>
        <PhaseWeaveToggle options={denseOptions} defaultValue="forge" />
      </section>

      <section className="studio-card space-y-3 p-4">
        <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          Disabled
        </h3>
        <PhaseWeaveToggle options={previewOptions} defaultValue="fire" disabled />
      </section>
    </div>
  );
}
