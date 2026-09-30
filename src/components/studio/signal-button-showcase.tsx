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
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card text-foreground hover:bg-muted",
              )}
            >
              {nextStatus}
            </button>
          );
        })}
      </div>

      <div className="studio-card space-y-4 p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            Live preview
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            {status}
          </p>
        </div>

        <div className="flex min-h-40 items-center justify-center border border-border bg-muted p-6">
        <SignalButton
          size="lg"
          status={status}
          labels={previewLabels}
          aria-label="Signal button interactive preview"
        >
          Deploy
        </SignalButton>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        {statusDescriptions[status]}
      </p>
    </div>
  );
}

export function SignalButtonVariants() {
  return (
    <div className="space-y-8">
      <section className="studio-card space-y-3 p-4">
        <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
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

      <section className="studio-card space-y-3 p-4">
        <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
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

      <section className="studio-card space-y-3 p-4">
        <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          Disabled
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <SignalButton disabled>Disabled idle</SignalButton>
          <SignalButton status="processing" labels={{ processing: "Blocked" }}>
            Disabled processing
          </SignalButton>
        </div>
      </section>

      <section className="studio-card space-y-3 p-4">
        <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
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
