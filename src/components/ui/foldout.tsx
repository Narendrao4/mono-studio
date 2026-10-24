"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import styles from "./foldout.module.css";

export type FoldoutItem = {
  id: string;
  title: string;
  description?: string;
  badge?: string;
  content: ReactNode;
  disabled?: boolean;
};

export type FoldoutProps = {
  items: readonly FoldoutItem[];
  label?: string;
  type?: "single" | "multiple";
  value?: readonly string[];
  defaultValue?: readonly string[];
  onValueChange?: (ids: string[]) => void;
  variant?: "paper" | "inverse";
  size?: "default" | "compact";
  headingLevel?: 2 | 3 | 4;
  className?: string;
};

const number = (value: number) => String(value).padStart(2, "0");

/** Indexed sheets for progressive disclosure. Each item needs a stable, unique ID. */
export function Foldout({
  items,
  label = "Details",
  type = "single",
  value,
  defaultValue = [],
  onValueChange,
  variant = "paper",
  size = "default",
  headingLevel = 3,
  className,
}: FoldoutProps) {
  const instanceId = useId();
  const [internalValue, setInternalValue] = useState<string[]>([...defaultValue]);
  const triggers = useRef(new Map<string, HTMLButtonElement>());
  const validIds = new Set(items.map((item) => item.id));
  const openIds = [...new Set(value ?? internalValue)].filter((id) => validIds.has(id)).slice(0, type === "single" ? 1 : undefined);
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4";

  function toggle(item: FoldoutItem) {
    if (item.disabled) return;
    const next = openIds.includes(item.id) ? openIds.filter((id) => id !== item.id)
      : type === "single" ? [item.id] : [...openIds, item.id];
    if (value === undefined) setInternalValue(next);
    onValueChange?.(next);
  }

  function navigate(event: KeyboardEvent<HTMLButtonElement>, itemId: string) {
    const enabled = items.filter((item) => !item.disabled);
    const index = enabled.findIndex((item) => item.id === itemId);
    let target: number;
    if (event.key === "ArrowDown") target = (index + 1) % enabled.length;
    else if (event.key === "ArrowUp") target = (index - 1 + enabled.length) % enabled.length;
    else if (event.key === "Home") target = 0;
    else if (event.key === "End") target = enabled.length - 1;
    else return;
    event.preventDefault();
    if (enabled[target]) triggers.current.get(enabled[target].id)?.focus();
  }

  return (
    <section className={cn(styles.root, className)} data-foldout="" data-variant={variant} data-size={size} aria-label={label}>
      <div className={styles.masthead}><span>{label}</span><span>{number(openIds.length)} / {number(items.length)} open</span></div>
      {items.map((item, index) => {
        const open = openIds.includes(item.id);
        const itemId = `${instanceId}-${encodeURIComponent(item.id)}`;
        return (
          <div key={item.id} className={styles.sheet} data-foldout-item={item.id} data-open={open} data-disabled={!!item.disabled}>
            <Heading className={styles.heading}>
              <button
                ref={(node) => { if (node) triggers.current.set(item.id, node); else triggers.current.delete(item.id); }}
                id={`${itemId}-trigger`}
                type="button"
                className={styles.trigger}
                aria-expanded={open}
                aria-controls={`${itemId}-panel`}
                disabled={item.disabled}
                onClick={() => toggle(item)}
                onKeyDown={(event) => navigate(event, item.id)}
              >
                <span className={styles.index} aria-hidden="true"><span>{number(index + 1)}</span><i /></span>
                <span className={styles.identity}><span className={styles.title}>{item.title}</span>{item.description && <span className={styles.description}>{item.description}</span>}</span>
                {item.badge && <span className={styles.badge}>{item.badge}</span>}
                <span className={styles.handle} aria-hidden="true"><span>+</span></span>
              </button>
            </Heading>
            <div id={`${itemId}-panel`} className={styles.panel} data-open={open} role="region" aria-labelledby={`${itemId}-trigger`} aria-hidden={!open} inert={!open}>
              <div className={styles.clip}><div className={styles.content}>{item.content}</div></div>
            </div>
            <span className={styles.fold} aria-hidden="true" />
          </div>
        );
      })}
      {!items.length && <p className={styles.empty}>No sections to unfold.</p>}
    </section>
  );
}
