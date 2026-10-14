"use client";

import { ClockIcon, SparklesIcon, UserPlusIcon, UsersRoundIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useIdSet } from "@/hooks/use-id-set";
import { getFullName, pluralize } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Industry, PersonSuggestion } from "@/types/network";
import { industries, industryConfig } from "@/config/industries";
import { NetworkSection } from "./network-section";
import { PersonCard } from "./person-card";
import { ToggleActionButton } from "@/components/shared/toggle-action-button";

type Filter = Industry | "all";

const chipClassName =
  "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

export function SuggestionsSection({ suggestions }: { suggestions: PersonSuggestion[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const dismissed = useIdSet();
  const pending = useIdSet();

  const available = suggestions.filter((suggestion) => !dismissed.has(suggestion.user.id));
  const visible = available.filter((suggestion) => filter === "all" || suggestion.industry === filter);
  const filters: Filter[] = ["all", ...industries.filter((industry) => available.some((item) => item.industry === industry))];

  function toggleConnect(suggestion: PersonSuggestion) {
    const isPending = pending.has(suggestion.user.id);
    pending.toggle(suggestion.user.id);
    toast(isPending ? "Invitation withdrawn" : `Invitation sent to ${suggestion.user.firstName}`);
  }

  return (
    <NetworkSection
      id="suggestions"
      title="People you may know"
      description="HSE professionals matched on certifications, industry and shared connections"
      icon={SparklesIcon}
    >
      <div role="group" aria-label="Filter by industry" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
        {filters.map((value) => {
          const isSelected = filter === value;
          const config = value === "all" ? null : industryConfig[value];
          const Icon = config?.icon;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setFilter(value)}
              className={cn(
                chipClassName,
                isSelected
                  ? "border-primary bg-primary text-primary-foreground shadow-[0_0_20px_-6px_var(--primary)]"
                  : "bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              {Icon && <Icon aria-hidden="true" className="size-3.5" />}
              {config?.label ?? "All"}
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="rounded-2xl border border-dashed p-8 text-center text-sm text-muted-foreground">
          No more suggestions here for now. Try another industry.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 xl:grid-cols-3">
          {visible.map((suggestion, index) => {
            const isPending = pending.has(suggestion.user.id);
            return (
              <li
                key={suggestion.user.id}
                className="animate-rise"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <PersonCard
                  user={suggestion.user}
                  industry={suggestion.industry}
                  onDismiss={() => dismissed.add(suggestion.user.id)}
                  details={
                    <div className="space-y-1 text-muted-foreground">
                      <p className="flex items-center justify-center gap-1 font-medium text-foreground/90">
                        <SparklesIcon aria-hidden="true" className="size-3 text-caution" />
                        {suggestion.reason}
                      </p>
                      <p className="flex items-center justify-center gap-1">
                        <UsersRoundIcon aria-hidden="true" className="size-3" />
                        {pluralize(suggestion.mutualConnections, "mutual connection")}
                      </p>
                    </div>
                  }
                  footer={
                    <ToggleActionButton
                      isActive={isPending}
                      idleLabel="Connect"
                      activeLabel="Pending"
                      idleIcon={UserPlusIcon}
                      activeIcon={ClockIcon}
                      accessibleName={getFullName(suggestion.user)}
                      onToggle={() => toggleConnect(suggestion)}
                    />
                  }
                />
              </li>
            );
          })}
        </ul>
      )}
    </NetworkSection>
  );
}
