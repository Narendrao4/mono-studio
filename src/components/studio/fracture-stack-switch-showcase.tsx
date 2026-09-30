"use client";

import { useMemo, useState } from "react";

import {
  FractureStackSwitch,
  type FractureStackItem,
} from "@/components/ui/fracture-stack-switch";

const routingItems: FractureStackItem[] = [
  { value: "spark", label: "Spark", meta: "init" },
  { value: "mesh", label: "Mesh", meta: "link" },
  { value: "drift", label: "Drift", meta: "pivot" },
  { value: "forge", label: "Forge", meta: "solid" },
];

const trailItems: FractureStackItem[] = [
  { value: "origin", label: "Origin", meta: "o-1" },
  { value: "relay", label: "Relay", meta: "r-4" },
  { value: "vault", label: "Vault", meta: "v-9" },
  { value: "anchor", label: "Anchor", meta: "a-2" },
  { value: "prism", label: "Prism", meta: "p-6" },
];

const modeDescriptions: Record<string, string> = {
  spark: "Starts a minimal route and leaves room for rapid branching.",
  mesh: "Connects neighboring decisions into a denser execution graph.",
  drift: "Moves to a flexible lane where intent can be reshaped quickly.",
  forge: "Commits to a hardened route for final execution.",
};

export function FractureStackInteractivePreview() {
  const [value, setValue] = useState(routingItems[0].value);

  const description = useMemo(() => {
    return modeDescriptions[value] ?? modeDescriptions.spark;
  }, [value]);

  return (
    <div className="w-full space-y-6">
      <div className="studio-card space-y-4 p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            Live preview
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            stage: {value}
          </p>
        </div>

        <div className="border border-border bg-muted p-4">
          <FractureStackSwitch
            items={routingItems}
            value={value}
            onValueChange={setValue}
            size="lg"
            aria-label="Fracture stack interactive preview"
          />
        </div>
      </div>

      <div className="studio-card p-4">
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export function FractureStackVariants() {
  return (
    <div className="space-y-8">
      <section className="studio-card space-y-3 p-4">
        <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          Size variants
        </h3>
        <div className="space-y-3">
          <FractureStackSwitch items={routingItems} size="sm" defaultValue="spark" />
          <FractureStackSwitch items={routingItems} size="md" defaultValue="mesh" />
          <FractureStackSwitch items={routingItems} size="lg" defaultValue="forge" />
        </div>
      </section>

      <section className="studio-card space-y-3 p-4">
        <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          Extended stack
        </h3>
        <FractureStackSwitch items={trailItems} defaultValue="vault" />
      </section>

      <section className="studio-card space-y-3 p-4">
        <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          Disabled
        </h3>
        <FractureStackSwitch items={routingItems} defaultValue="drift" disabled />
      </section>
    </div>
  );
}
