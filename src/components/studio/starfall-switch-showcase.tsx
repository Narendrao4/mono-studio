"use client";

import { useState } from "react";

import { StarfallSwitch } from "@/components/ui/starfall-switch";

export function StarfallSwitchInteractivePreview() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="w-full space-y-6">
      <div className="studio-card space-y-4 p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            Live preview
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            state: {checked ? "on" : "off"}
          </p>
        </div>

        <div className="flex min-h-44 items-start justify-center border border-border bg-muted p-8">
          <StarfallSwitch
            size="lg"
            checked={checked}
            onCheckedChange={setChecked}
            aria-label="Starfall switch interactive preview"
          />
        </div>
      </div>

      <p className="text-sm leading-6 text-muted-foreground">
        Turn it on to drop stars downward. Turn it off to inhale the dropped stars
        back into the switch lane.
      </p>
    </div>
  );
}

export function StarfallSwitchVariants() {
  const [medium, setMedium] = useState(true);

  return (
    <div className="space-y-8">
      <section className="studio-card space-y-3 p-4">
        <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          Sizes
        </h3>
        <div className="flex flex-wrap items-start gap-6 pb-8">
          <StarfallSwitch size="sm" aria-label="Small starfall switch" />
          <StarfallSwitch
            size="md"
            checked={medium}
            onCheckedChange={setMedium}
            aria-label="Medium controlled starfall switch"
          />
          <StarfallSwitch size="lg" defaultChecked aria-label="Large starfall switch" />
        </div>
      </section>

      <section className="studio-card space-y-3 p-4">
        <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          Disabled
        </h3>
        <div className="flex items-start gap-5 pb-8">
          <StarfallSwitch disabled aria-label="Disabled off starfall switch" />
          <StarfallSwitch disabled defaultChecked aria-label="Disabled on starfall switch" />
        </div>
      </section>
    </div>
  );
}
