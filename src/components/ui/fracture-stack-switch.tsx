"use client";

import type { CSSProperties, KeyboardEvent } from "react";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

export type FractureStackSize = "sm" | "md" | "lg";

export type FractureStackItem = {
  value: string;
  label: string;
  meta?: string;
};

export type FractureStackSwitchProps = {
  items: FractureStackItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (nextValue: string) => void;
  size?: FractureStackSize;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
};

const sizeClasses: Record<
  FractureStackSize,
  {
    row: string;
    label: string;
    meta: string;
  }
> = {
  sm: {
    row: "h-12",
    label: "text-xs",
    meta: "text-[10px]",
  },
  md: {
    row: "h-14",
    label: "text-sm",
    meta: "text-[11px]",
  },
  lg: {
    row: "h-16",
    label: "text-base",
    meta: "text-xs",
  },
};

function resolveStartingValue(items: FractureStackItem[], requested?: string) {
  if (requested && items.some((item) => item.value === requested)) {
    return requested;
  }

  return items[0]?.value ?? "void";
}

function resolveOffset(index: number) {
  const sequence = [-5, 3, -2, 4, -1, 2];
  return sequence[index % sequence.length];
}

export function FractureStackSwitch({
  items,
  value,
  defaultValue,
  onValueChange,
  size = "md",
  disabled = false,
  className,
  "aria-label": ariaLabel = "Fracture stack selection",
}: FractureStackSwitchProps) {
  const safeItems = useMemo<FractureStackItem[]>(() => {
    if (items.length > 0) {
      return items;
    }

    return [{ value: "void", label: "Void", meta: "null" }];
  }, [items]);

  const [internalValue, setInternalValue] = useState(() =>
    resolveStartingValue(safeItems, defaultValue),
  );

  const resolvedInternalValue =
    safeItems.some((item) => item.value === internalValue)
      ? internalValue
      : resolveStartingValue(safeItems, defaultValue);

  const selectedValue = value ?? resolvedInternalValue;
  const selectedIndex = safeItems.findIndex((item) => item.value === selectedValue);
  const activeIndex = selectedIndex === -1 ? 0 : selectedIndex;

  const chooseValue = (nextValue: string) => {
    if (disabled || nextValue === selectedValue) {
      return;
    }

    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);
  };

  const chooseByIndex = (nextIndex: number) => {
    const itemCount = safeItems.length;
    const normalized = ((nextIndex % itemCount) + itemCount) % itemCount;

    chooseValue(safeItems[normalized].value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (disabled) {
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      chooseByIndex(index + 1);
    }

    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      chooseByIndex(index - 1);
    }

    if (event.key === "Home") {
      event.preventDefault();
      chooseByIndex(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      chooseByIndex(safeItems.length - 1);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        role="radiogroup"
        aria-label={ariaLabel}
        className={cn(
          "space-y-2 border border-border bg-card p-2",
          disabled && "opacity-50",
        )}
      >
        {safeItems.map((item, index) => {
          const selected = index === activeIndex;
          const offset = resolveOffset(index);
          const rowStyle: CSSProperties = {
            transform: selected ? "translateX(0px)" : `translateX(${offset}px)`,
          };

          return (
            <button
              key={item.value}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={`${item.label} option`}
              disabled={disabled}
              onClick={() => chooseValue(item.value)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              style={rowStyle}
              className={cn(
                "group relative flex w-full items-center justify-between overflow-hidden border px-3 text-left transition-[transform,background-color,border-color,color] duration-300 ease-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                sizeClasses[size].row,
                selected
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card text-foreground hover:bg-muted",
                disabled && "cursor-not-allowed",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-y-0 left-0 w-10 -skew-x-[20deg] transition-opacity duration-300",
                  selected
                    ? "bg-background/20 opacity-90"
                    : "bg-foreground/10 opacity-40",
                )}
              />
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-y-0 right-0 w-14 bg-[linear-gradient(120deg,transparent,rgba(0,0,0,0.08),transparent)] dark:bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.2),transparent)]",
                  selected ? "opacity-100" : "opacity-60",
                )}
              />

              <span className="relative z-10 min-w-0">
                <span className={cn("block truncate font-medium uppercase tracking-[0.08em]", sizeClasses[size].label)}>
                  {item.label}
                </span>
                <span
                  className={cn(
                    "mt-0.5 block truncate font-mono uppercase tracking-[0.12em]",
                    sizeClasses[size].meta,
                    selected ? "text-background/80" : "text-muted-foreground",
                  )}
                >
                  [{item.meta ?? item.value}]
                </span>
              </span>

              <span
                className={cn(
                  "relative z-10 font-mono text-[11px] uppercase tracking-[0.12em]",
                  selected ? "text-background" : "text-muted-foreground",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
