export const PHASE_WEAVE_TOGGLE_SOURCE = `"use client";

import { useState } from "react";

type PhaseWeaveOption = {
  value: string;
  label: string;
  pulse?: string;
};

export function PhaseWeaveToggle({
  options,
  value,
  onValueChange,
}: {
  options: PhaseWeaveOption[];
  value: string;
  onValueChange: (nextValue: string) => void;
}) {
  const activeIndex = options.findIndex((option) => option.value === value);

  return (
    <div className="relative grid h-16 border bg-card p-1" style={{ gridTemplateColumns: \`repeat(\${options.length}, minmax(0, 1fr))\` }}>
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-1 top-1 rounded-sm bg-foreground text-background transition-[left,width]"
        style={{
          left: \`calc(\${(activeIndex === -1 ? 0 : activeIndex) * (100 / options.length)}% + 4px)\`,
          width: \`calc(\${100 / options.length}% - 8px)\`,
        }}
      />

      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onValueChange(option.value)}
          className="relative z-10 text-xs uppercase"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
`;

export const PHASE_WEAVE_TOGGLE_USAGE = `"use client";

import { useState } from "react";

import { PhaseWeaveToggle } from "@/components/ui/phase-weave-toggle";

const options = [
  { value: "dock", label: "Dock", pulse: "anchor" },
  { value: "scan", label: "Scan", pulse: "inspect" },
  { value: "route", label: "Route", pulse: "vector" },
  { value: "fire", label: "Fire", pulse: "commit" },
];

export function MissionModeField() {
  const [mode, setMode] = useState("dock");

  return (
    <PhaseWeaveToggle
      options={options}
      value={mode}
      onValueChange={setMode}
      size="lg"
      aria-label="Mission mode"
    />
  );
}
`;
