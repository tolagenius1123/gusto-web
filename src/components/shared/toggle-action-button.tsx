"use client";

import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ToggleActionButtonProps {
  isActive: boolean;
  idleLabel: string;
  activeLabel: string;
  idleIcon: LucideIcon;
  activeIcon: LucideIcon;
  accessibleName: string;
  onToggle: () => void;
  className?: string;
}

export function ToggleActionButton({
  isActive,
  idleLabel,
  activeLabel,
  idleIcon: IdleIcon,
  activeIcon: ActiveIcon,
  accessibleName,
  onToggle,
  className,
}: ToggleActionButtonProps) {
  const Icon = isActive ? ActiveIcon : IdleIcon;

  return (
    <Button
      variant={isActive ? "secondary" : "outline"}
      aria-pressed={isActive}
      aria-label={`${isActive ? activeLabel : idleLabel}: ${accessibleName}`}
      onClick={onToggle}
      className={cn(
        "w-full rounded-full",
        !isActive && "border-primary/50 text-primary hover:bg-primary/10 hover:text-primary",
        className,
      )}
    >
      <Icon key={String(isActive)} aria-hidden="true" className={cn(isActive && "animate-pop")} />
      {isActive ? activeLabel : idleLabel}
    </Button>
  );
}
