"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type CopyState = "idle" | "copied" | "error";

type CopyButtonProps = {
  value: string;
  className?: string;
};

function fallbackCopy(value: string) {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  const success = document.execCommand("copy");
  document.body.removeChild(textarea);
  return success;
}

export function CopyButton({ value, className }: CopyButtonProps) {
  const [state, setState] = useState<CopyState>("idle");

  useEffect(() => {
    if (state === "idle") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setState("idle");
    }, 1600);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [state]);

  const label =
    state === "copied" ? "Copied" : state === "error" ? "Copy failed" : "Copy";

  async function handleCopy() {
    try {
      if (!navigator.clipboard) {
        const copied = fallbackCopy(value);
        setState(copied ? "copied" : "error");
        return;
      }

      await navigator.clipboard.writeText(value);
      setState("copied");
    } catch {
      const copied = fallbackCopy(value);
      setState(copied ? "copied" : "error");
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "inline-flex h-8 items-center justify-center border border-border bg-card px-3 text-xs font-medium text-foreground transition-colors duration-150 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      aria-live="polite"
    >
      {label}
    </button>
  );
}
