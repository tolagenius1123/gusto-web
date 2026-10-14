import { cn } from "@/lib/utils";

interface HazardTapeProps {
  animated?: boolean;
  className?: string;
}

export function HazardTape({ animated = false, className }: HazardTapeProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("hazard-stripes h-1 w-full", animated && "animate-hazard", className)}
    />
  );
}
