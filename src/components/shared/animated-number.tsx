"use client";

import { useEffect, useState } from "react";
import { formatCompactNumber } from "@/lib/format";

interface AnimatedNumberProps {
  value: number;
  durationMs?: number;
  className?: string;
}

export function AnimatedNumber({ value, durationMs = 1200, className }: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frameId = 0;
    const startedAt = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / durationMs);
      const eased = 1 - (1 - progress) ** 3;
      setDisplayValue(Math.round(value * eased));
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [value, durationMs]);

  return (
    <span className={className}>
      <span aria-hidden="true">{formatCompactNumber(displayValue)}</span>
      <span className="sr-only">{formatCompactNumber(value)}</span>
    </span>
  );
}
