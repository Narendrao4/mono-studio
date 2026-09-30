export const STARFALL_SWITCH_SOURCE = `"use client";

import { useState } from "react";

export function StarfallSwitch({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={checked ? "bg-foreground text-background" : "bg-card text-foreground"}
    >
      {checked ? "on" : "off"}
    </button>
  );
}
`;

export const STARFALL_SWITCH_USAGE = `"use client";

import { useState } from "react";

import { StarfallSwitch } from "@/components/ui/starfall-switch";

export function StarfallField() {
  const [checked, setChecked] = useState(false);

  return (
    <StarfallSwitch
      checked={checked}
      onCheckedChange={setChecked}
      size="lg"
      aria-label="Power mode"
    />
  );
}
`;
