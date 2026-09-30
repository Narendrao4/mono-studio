"use client";

import type { ButtonHTMLAttributes, CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export type StarfallSwitchSize = "sm" | "md" | "lg";

type StarfallParticle = {
  id: number;
  x: number;
  drift: number;
  depth: number;
  delay: number;
  duration: number;
  scale: number;
};

export type StarfallSwitchProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange" | "children"
> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: StarfallSwitchSize;
};

const sizeClasses: Record<
  StarfallSwitchSize,
  {
    root: string;
    knob: string;
    knobPx: number;
    pad: number;
    trackPx: number;
    label: string;
    starCount: number;
  }
> = {
  sm: {
    root: "h-6 w-[3.25rem]",
    knob: "h-4 w-4",
    knobPx: 16,
    pad: 4,
    trackPx: 52,
    label: "text-[7px]",
    starCount: 8,
  },
  md: {
    root: "h-7 w-[3.75rem]",
    knob: "h-5 w-5",
    knobPx: 20,
    pad: 4,
    trackPx: 60,
    label: "text-[8px]",
    starCount: 10,
  },
  lg: {
    root: "h-8 w-[4.25rem]",
    knob: "h-6 w-6",
    knobPx: 24,
    pad: 4,
    trackPx: 68,
    label: "text-[9px]",
    starCount: 12,
  },
};

function createParticleCloud(count: number, anchorX: number) {
  return Array.from({ length: count }, (_, index) => {
    const spread = (Math.random() - 0.5) * 36;

    return {
      id: Date.now() + index,
      x: Math.max(8, Math.min(92, anchorX + spread)),
      drift: (Math.random() - 0.5) * 28,
      depth: 34 + Math.random() * 30,
      delay: Math.random() * 160,
      duration: 680 + Math.random() * 420,
      scale: 0.65 + Math.random() * 0.65,
    } satisfies StarfallParticle;
  });
}

function jitterParticles(particles: StarfallParticle[]) {
  return particles.map((particle) => ({
    ...particle,
    id: particle.id + 1000,
    drift: particle.drift * 0.25,
    depth: particle.depth,
    duration: 540 + Math.random() * 260,
    delay: Math.random() * 120,
  }));
}

export function StarfallSwitch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  size = "md",
  disabled = false,
  className,
  type = "button",
  ...buttonProps
}: StarfallSwitchProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const [particles, setParticles] = useState<StarfallParticle[]>([]);
  const [burstMode, setBurstMode] = useState<"drop" | "inhale" | null>(null);
  const cleanupTimerRef = useRef<number | null>(null);
  const particleBankRef = useRef<StarfallParticle[]>([]);

  const isChecked = checked ?? internalChecked;
  const sizing = sizeClasses[size];

  const knobX =
    ((isChecked
      ? sizing.trackPx - sizing.pad - sizing.knobPx / 2
      : sizing.pad + sizing.knobPx / 2) /
      sizing.trackPx) *
    100;

  useEffect(() => {
    return () => {
      if (cleanupTimerRef.current !== null) {
        window.clearTimeout(cleanupTimerRef.current);
      }
    };
  }, []);

  const clearParticles = (waitMs: number) => {
    if (cleanupTimerRef.current !== null) {
      window.clearTimeout(cleanupTimerRef.current);
    }

    cleanupTimerRef.current = window.setTimeout(() => {
      setParticles([]);
      setBurstMode(null);
      cleanupTimerRef.current = null;
    }, waitMs);
  };

  const emitDrop = () => {
    const cloud = createParticleCloud(sizing.starCount, 72);

    particleBankRef.current = cloud;
    setBurstMode("drop");
    setParticles(cloud);
    clearParticles(1400);
  };

  const emitInhale = () => {
    const source =
      particleBankRef.current.length > 0
        ? particleBankRef.current
        : createParticleCloud(sizing.starCount, 70);

    setBurstMode("inhale");
    setParticles(jitterParticles(source));
    particleBankRef.current = [];
    clearParticles(900);
  };

  const handleToggle = () => {
    if (disabled) {
      return;
    }

    const nextChecked = !isChecked;

    if (checked === undefined) {
      setInternalChecked(nextChecked);
    }

    onCheckedChange?.(nextChecked);

    if (nextChecked) {
      emitDrop();
      return;
    }

    emitInhale();
  };

  return (
    <button
      type={type}
      role="switch"
      aria-checked={isChecked}
      disabled={disabled}
      onClick={handleToggle}
      className={cn(
        "group relative isolate inline-flex cursor-pointer select-none overflow-visible rounded-full transition-colors duration-200 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "motion-reduce:transition-none",
        isChecked ? "bg-foreground text-background" : "bg-foreground/15 text-foreground",
        disabled && "cursor-not-allowed opacity-45",
        sizing.root,
        className,
      )}
      {...buttonProps}
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-1/2 z-10 rounded-full bg-background shadow-sm transition-[left,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "motion-reduce:transition-none",
          sizing.knob,
        )}
        style={{
          left: isChecked
            ? `calc(100% - ${sizing.pad + sizing.knobPx}px)`
            : `${sizing.pad}px`,
          transform: "translateY(-50%)",
        }}
      />
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center font-mono font-semibold uppercase leading-none tracking-[0.08em] transition-[opacity,transform] duration-150",
          "motion-reduce:transition-none",
          isChecked ? "translate-x-0 opacity-100" : "-translate-x-0.5 opacity-0",
          sizing.label,
        )}
        style={{ width: `calc(100% - ${sizing.knobPx + sizing.pad}px)` }}
      >
        on
      </span>
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 flex items-center justify-center font-mono font-semibold uppercase leading-none tracking-[0.08em] transition-[opacity,transform] duration-150",
          "motion-reduce:transition-none",
          isChecked ? "translate-x-0.5 opacity-0" : "translate-x-0 opacity-100",
          sizing.label,
        )}
        style={{
          left: `${sizing.knobPx + sizing.pad}px`,
          width: `calc(100% - ${sizing.knobPx + sizing.pad}px)`,
        }}
      >
        off
      </span>

      <span aria-hidden className="pointer-events-none absolute left-0 right-0 top-full h-20">
        {particles.map((particle) => {
          const isInhale = burstMode === "inhale";
          const toKnob = ((knobX - particle.x) / 100) * sizing.trackPx;

          const style = {
            left: `calc(${particle.x}% - 4px)`,
            top: 0,
            animation: `${isInhale ? "starfall-inhale" : "starfall-drop"} ${particle.duration}ms cubic-bezier(0.18,0.66,0.18,1) ${particle.delay}ms forwards`,
            transform: `scale(${particle.scale})`,
            "--starfall-drift": `${particle.drift}px`,
            "--starfall-depth": `${particle.depth}px`,
            "--starfall-return-x": `${toKnob}px`,
            "--starfall-return-y": "-30px",
          } as CSSProperties;

          return (
            <span key={particle.id} className="absolute inline-flex h-2 w-2 items-center justify-center" style={style}>
              <span className="block h-2 w-2 bg-foreground [clip-path:polygon(50%_0,61%_36%,98%_36%,68%_58%,79%_95%,50%_72%,21%_95%,32%_58%,2%_36%,39%_36%)]" />
            </span>
          );
        })}
      </span>
    </button>
  );
}
