"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterChipProps {
  label: string;
  icon?: LucideIcon;
  isSelected: boolean;
  onSelect: () => void;
}

export function FilterChip({ label, icon: Icon, isSelected, onSelect }: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={onSelect}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        isSelected
          ? "border-primary bg-primary text-primary-foreground shadow-[0_0_20px_-6px_var(--primary)]"
          : "bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
      )}
    >
      {Icon && <Icon aria-hidden="true" className="size-3.5" />}
      {label}
    </button>
  );
}

export function FilterChipGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      role="group"
      aria-label={label}
      className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
    >
      {children}
    </div>
  );
}
