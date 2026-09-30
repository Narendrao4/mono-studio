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

export const SIGNAL_BUTTON_USAGE = `import { SignalButton } from "@/components/ui/signal-button";

export function DeployAction() {
  return (
    <SignalButton
      status="processing"
      labels={{
        idle: "Deploy",
        processing: "Deploying",
        success: "Deployed",
        error: "Deploy failed",
      }}
    >
      Deploy
    </SignalButton>
  );
}
`;
