"use client";

import { useState } from "react";

import {
  SignalButton,
  type SignalButtonSize,
  type SignalButtonStatus,
} from "@/components/ui/signal-button";
import { cn } from "@/lib/utils";

const statuses: SignalButtonStatus[] = ["idle", "processing", "success", "error"];

const previewLabels: Record<SignalButtonStatus, string> = {
  idle: "Deploy",
  processing: "Routing signal",
  success: "Deployed",
  error: "Deploy failed",
};

const statusDescriptions: Record<SignalButtonStatus, string> = {
  idle: "Signal lane is open and ready for action.",
  processing: "Signal scan is active while the action is in-flight.",
  success: "Terminal state confirms the action finished successfully.",
  error: "Failure state keeps visual urgency while preserving contrast.",
};

const sizeLabels: Record<SignalButtonSize, string> = {
  sm: "Small",
  md: "Medium",
  lg: "Large",
};

export function SignalButtonInteractivePreview() {
  const [status, setStatus] = useState<SignalButtonStatus>("idle");

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Signal button state">
        {statuses.map((nextStatus) => {
          const selected = status === nextStatus;

          return (
            <button
              key={nextStatus}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setStatus(nextStatus)}
              className={cn(
                "h-8 border px-3 text-xs font-medium uppercase tracking-[0.08em] transition-colors",
                selected
                  ? "border-neutral-950 bg-neutral-950 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-950"
                  : "border-neutral-300 text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-900",
              )}
            >
              {nextStatus}
            </button>
          );
        })}
      </div>

      <div className="flex min-h-48 items-center justify-center border border-neutral-200 p-6 dark:border-neutral-800">
        <SignalButton
          size="lg"
          status={status}
          labels={previewLabels}
          aria-label="Signal button interactive preview"
        >
          Deploy
        </SignalButton>
      </div>

      <p className="text-sm text-neutral-600 dark:text-neutral-300">
        {statusDescriptions[status]}
      </p>
    </div>
  );
}

export function SignalButtonVariants() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
          Sizes
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          {(Object.keys(sizeLabels) as SignalButtonSize[]).map((size) => (
            <SignalButton key={size} size={size}>
              {sizeLabels[size]}
            </SignalButton>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
          Status variants
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          {statuses.map((status) => (
            <SignalButton
              key={status}
              status={status}
              labels={{
                idle: "Deploy",
                processing: "Syncing",
                success: "Synced",
                error: "Retry",
              }}
            >
              Deploy
            </SignalButton>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
          Disabled
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <SignalButton disabled>Disabled idle</SignalButton>
          <SignalButton status="processing" labels={{ processing: "Blocked" }}>
            Disabled processing
          </SignalButton>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
          Text examples
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <SignalButton>Save</SignalButton>
          <SignalButton>Publish</SignalButton>
          <SignalButton>Run</SignalButton>
          <SignalButton>Sync</SignalButton>
        </div>
      </section>
    </div>
  );
}
