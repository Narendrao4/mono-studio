export const FRACTURE_STACK_SWITCH_SOURCE = `"use client";

import { useState } from "react";

type FractureStackItem = {
  value: string;
  label: string;
  meta?: string;
};

export function FractureStackSwitch({
  items,
  value,
  onValueChange,
}: {
  items: FractureStackItem[];
  value: string;
  onValueChange: (nextValue: string) => void;
}) {
  return (
    <div role="radiogroup" aria-label="Fracture stack" className="space-y-2 border bg-card p-2">
      {items.map((item, index) => {
        const selected = item.value === value;

        return (
          <button
            key={item.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onValueChange(item.value)}
            className={selected ? "border bg-foreground text-background" : "border bg-card"}
          >
            <span>{item.label}</span>
            <span>[{item.meta ?? item.value}]</span>
            <span>{String(index + 1).padStart(2, "0")}</span>
          </button>
        );
      })}
    </div>
  );
}
`;

export const FRACTURE_STACK_SWITCH_USAGE = `"use client";

import { useState } from "react";

import { FractureStackSwitch } from "@/components/ui/fracture-stack-switch";

const items = [
  { value: "spark", label: "Spark", meta: "init" },
  { value: "mesh", label: "Mesh", meta: "link" },
  { value: "drift", label: "Drift", meta: "pivot" },
  { value: "forge", label: "Forge", meta: "solid" },
];

export function RouteModeField() {
  const [value, setValue] = useState("spark");

  return (
    <FractureStackSwitch
      items={items}
      value={value}
      onValueChange={setValue}
      size="lg"
      aria-label="Route mode"
    />
  );
}
`;
