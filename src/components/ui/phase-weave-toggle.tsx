"use client";

import type { CSSProperties, KeyboardEvent } from "react";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

export type PhaseWeaveSize = "sm" | "md" | "lg";

export type PhaseWeaveOption = {
  value: string;
  label: string;
  pulse?: string;
};

export type PhaseWeaveToggleProps = {
  options: PhaseWeaveOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (nextValue: string) => void;
  size?: PhaseWeaveSize;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
};

const sizeClasses: Record<
  PhaseWeaveSize,
  {
    rail: string;
    label: string;
    value: string;
    carrier: string;
  }
> = {
  sm: {
    rail: "h-14",
    label: "text-[10px]",
    value: "text-[9px]",
    carrier: "text-[9px]",
  },
  md: {
    rail: "h-16",
    label: "text-[11px]",
    value: "text-[10px]",
    carrier: "text-[10px]",
  },
  lg: {
    rail: "h-20",
    label: "text-xs",
    value: "text-[11px]",
    carrier: "text-[11px]",
  },
};

function resolveDefaultValue(options: PhaseWeaveOption[], requested?: string) {
  if (requested && options.some((option) => option.value === requested)) {
    return requested;
  }

  return options[0]?.value ?? "void";
}

function stepCode(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function PhaseWeaveToggle({
  options,
  value,
  defaultValue,
  onValueChange,
  size = "md",
  disabled = false,
  className,
  "aria-label": ariaLabel = "Phase weave mode",
}: PhaseWeaveToggleProps) {
  const safeOptions = useMemo<PhaseWeaveOption[]>(() => {
    if (options.length > 0) {
      return options;
    }

    return [{ value: "void", label: "Void", pulse: "null" }];
  }, [options]);

  const [internalValue, setInternalValue] = useState(() =>
    resolveDefaultValue(safeOptions, defaultValue),
  );

  const resolvedInternalValue =
    safeOptions.some((option) => option.value === internalValue)
      ? internalValue
      : resolveDefaultValue(safeOptions, defaultValue);

  const selectedValue = value ?? resolvedInternalValue;
  const selectedIndex = safeOptions.findIndex((option) => option.value === selectedValue);
  const activeIndex = selectedIndex === -1 ? 0 : selectedIndex;
  const activeOption = safeOptions[activeIndex];
  const laneWidth = 100 / safeOptions.length;

  const carrierStyle: CSSProperties = {
    left: `calc(${activeIndex * laneWidth}% + 4px)`,
    width: `calc(${laneWidth}% - 8px)`,
  };

  const selectValue = (nextValue: string) => {
    if (disabled || nextValue === selectedValue) {
      return;
    }

    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);
  };

  const selectByIndex = (index: number) => {
    const count = safeOptions.length;
    const normalizedIndex = ((index % count) + count) % count;

    selectValue(safeOptions[normalizedIndex].value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, optionIndex: number) => {
    if (disabled) {
      return;
    }

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      selectByIndex(optionIndex + 1);
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      selectByIndex(optionIndex - 1);
    }

    if (event.key === "Home") {
      event.preventDefault();
      selectByIndex(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      selectByIndex(safeOptions.length - 1);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "relative overflow-hidden border border-border bg-card p-1",
          sizeClasses[size].rail,
          disabled && "opacity-55",
        )}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_14%,rgba(0,0,0,0.06),transparent_52%)] dark:bg-[radial-gradient(circle_at_12%_14%,rgba(255,255,255,0.13),transparent_52%)]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-1 top-1/2 h-px -translate-y-1/2 bg-border"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-2 top-1 bottom-1 bg-[repeating-linear-gradient(90deg,transparent_0,transparent_17px,rgba(115,115,115,0.15)_17px,rgba(115,115,115,0.15)_18px)]"
        />

        <span
          aria-hidden
          style={carrierStyle}
          className={cn(
            "pointer-events-none absolute bottom-1 top-1 z-10 overflow-hidden rounded-sm border border-foreground/35 bg-foreground text-background transition-[left,width] duration-300 ease-out",
            sizeClasses[size].carrier,
          )}
        >
          <span className="absolute inset-0 bg-[linear-gradient(108deg,rgba(255,255,255,0.35),rgba(255,255,255,0)_42%,rgba(255,255,255,0.22)_70%,rgba(255,255,255,0.08))] dark:bg-[linear-gradient(108deg,rgba(0,0,0,0.35),rgba(0,0,0,0)_42%,rgba(0,0,0,0.22)_70%,rgba(0,0,0,0.08))]" />
          <span className="relative z-10 flex h-full items-center justify-between px-2 font-mono uppercase tracking-[0.14em]">
            <span className="truncate">{activeOption.pulse ?? activeOption.label}</span>
            <span>{stepCode(activeIndex)}</span>
          </span>
        </span>

        <div
          role="radiogroup"
          aria-label={ariaLabel}
          className="relative z-20 grid h-full"
          style={{
            gridTemplateColumns: `repeat(${safeOptions.length}, minmax(0, 1fr))`,
          }}
        >
          {safeOptions.map((option, optionIndex) => {
            const selected = optionIndex === activeIndex;

            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={selected}
                aria-label={`${option.label} mode`}
                disabled={disabled}
                onClick={() => selectValue(option.value)}
                onKeyDown={(event) => handleKeyDown(event, optionIndex)}
                className={cn(
                  "flex h-full min-w-0 flex-col items-center justify-center px-1 text-center transition-colors",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:ring-inset",
                  sizeClasses[size].label,
                  selected
                    ? "text-background"
                    : "text-muted-foreground hover:text-foreground",
                  disabled && "cursor-not-allowed",
                )}
              >
                <span className="truncate font-medium uppercase tracking-[0.08em]">{option.label}</span>
                <span className={cn("truncate font-mono uppercase tracking-[0.12em]", sizeClasses[size].value)}>
                  [{option.value}]
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
