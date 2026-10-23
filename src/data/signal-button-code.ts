export const SIGNAL_BUTTON_SOURCE = `import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type SignalButtonStatus = "idle" | "processing" | "success" | "error";
export type SignalButtonSize = "sm" | "md" | "lg";

type SignalLabelMap = Partial<Record<SignalButtonStatus, ReactNode>>;

export type SignalButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> & {
  children: ReactNode;
  status?: SignalButtonStatus;
  size?: SignalButtonSize;
  disabled?: boolean;
  labels?: SignalLabelMap;
  disableWhileProcessing?: boolean;
};

const statusCodes: Record<SignalButtonStatus, string> = {
  idle: "00",
  processing: "run",
  success: "ok",
  error: "err",
};

export function SignalButton({
  children,
  status = "idle",
  size = "md",
  disabled = false,
  labels,
  disableWhileProcessing = true,
  className,
  type = "button",
  ...buttonProps
}: SignalButtonProps) {
  const isDisabled = disabled || (disableWhileProcessing && status === "processing");
  const visibleLabel = labels?.[status] ?? children;

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={status === "processing"}
      className={cn("group inline-flex items-center border", className)}
      {...buttonProps}
    >
      <span>{visibleLabel}</span>
      <span aria-hidden>[{statusCodes[status]}]</span>
    </button>
  );
}
`;

export const SIGNAL_BUTTON_USAGE = `"use client";

import { useState } from "react";
import { SignalButton, type SignalButtonStatus } from "@/components/ui/signal-button";

export function SaveAction() {
  const [status, setStatus] = useState<SignalButtonStatus>("idle");

  async function save() {
    setStatus("processing");
    try {
      // Replace this demo delay with your actual save request.
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <SignalButton
      status={status}
      onClick={save}
      labels={{
        idle: "Save",
        processing: "Saving",
        success: "Saved",
        error: "Try again",
      }}
    >
      Save
    </SignalButton>
  );
}
`;
