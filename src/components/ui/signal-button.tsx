import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type SignalButtonStatus = "idle" | "processing" | "success" | "error";
export type SignalButtonSize = "sm" | "md" | "lg";

type SignalLabelMap = Partial<Record<SignalButtonStatus, ReactNode>>;

export type SignalButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "disabled"
> & {
  children: ReactNode;
  status?: SignalButtonStatus;
  size?: SignalButtonSize;
  disabled?: boolean;
  labels?: SignalLabelMap;
  disableWhileProcessing?: boolean;
};

const sizeClasses: Record<
  SignalButtonSize,
  {
    button: string;
    indicator: string;
    glyph: string;
  }
> = {
  sm: {
    button: "h-8 px-3 text-xs gap-2",
    indicator: "h-3.5 w-5",
    glyph: "text-[8px]",
  },
  md: {
    button: "h-10 px-4 text-sm gap-2.5",
    indicator: "h-4 w-6",
    glyph: "text-[9px]",
  },
  lg: {
    button: "h-12 px-5 text-base gap-3",
    indicator: "h-5 w-7",
    glyph: "text-[10px]",
  },
};

const statusButtonClasses: Record<SignalButtonStatus, string> = {
  idle:
    "border-neutral-300 bg-white text-neutral-950 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:bg-neutral-900",
  processing:
    "border-neutral-400 bg-white text-neutral-950 hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:bg-neutral-900",
  success:
    "border-neutral-900 bg-white text-neutral-950 hover:bg-neutral-50 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-950",
  error:
    "border-neutral-500 bg-white text-neutral-950 hover:bg-neutral-50 dark:border-neutral-500 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:bg-neutral-900",
};

const statusCodes: Record<SignalButtonStatus, string> = {
  idle: "00",
  processing: "run",
  success: "ok",
  error: "err",
};

const statusGlyphs: Record<SignalButtonStatus, string> = {
  idle: "--",
  processing: "><",
  success: "ok",
  error: "xx",
};

const statusAnnouncements: Record<SignalButtonStatus, string> = {
  idle: "Action idle",
  processing: "Action processing",
  success: "Action succeeded",
  error: "Action failed",
};

type SignalIndicatorProps = {
  status: SignalButtonStatus;
  size: SignalButtonSize;
};

function SignalIndicator({ status, size }: SignalIndicatorProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-[3px] border border-current/45",
        status === "error" && "bg-neutral-950 text-white dark:bg-neutral-100 dark:text-neutral-950",
        sizeClasses[size].indicator,
      )}
    >
      <span
        className={cn(
          "absolute inset-y-0 left-0 w-1/3 bg-current/15 transition-transform duration-300 motion-reduce:transition-none",
          status === "idle" && "translate-x-0",
          status === "processing" && "signal-track-scan bg-neutral-950 dark:bg-neutral-100",
          status === "success" && "translate-x-[190%] bg-current/70",
          status === "error" && "translate-x-0 bg-transparent",
        )}
      />
      <span
        className={cn(
          "relative z-10 font-mono leading-none tracking-[0.08em]",
          sizeClasses[size].glyph,
        )}
      >
        {statusGlyphs[status]}
      </span>
    </span>
  );
}

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
      className={cn(
        "group inline-flex items-center justify-center rounded-sm border font-medium tracking-[0.01em] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] transition-[background-color,color,border-color,transform] duration-200 motion-reduce:transition-none dark:shadow-none",
        "hover:-translate-y-px",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-neutral-100 dark:focus-visible:ring-offset-neutral-950",
        "active:translate-y-px disabled:cursor-not-allowed disabled:opacity-45",
        sizeClasses[size].button,
        statusButtonClasses[status],
        className,
      )}
      {...buttonProps}
    >
      <span className="inline-flex items-center">
        <SignalIndicator size={size} status={status} />
        <span className="ml-2 whitespace-nowrap">{visibleLabel}</span>
        <span
          aria-hidden
          className={cn(
            "ml-2 font-mono text-[0.62em] uppercase tracking-[0.14em] opacity-70 transition-opacity duration-200 motion-reduce:transition-none",
            status === "processing" && "signal-code-blink",
          )}
        >
          [{statusCodes[status]}]
        </span>
      </span>
      <span className="sr-only">{statusAnnouncements[status]}</span>
    </button>
  );
}
