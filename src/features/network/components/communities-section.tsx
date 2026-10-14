"use client";

import { CheckIcon, PlusIcon, UsersIcon } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { useIdSet } from "@/hooks/use-id-set";
import { formatCompactNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Community } from "@/types/network";
import { industryConfig } from "@/config/industries";
import { NetworkSection } from "./network-section";
import { ToggleActionButton } from "@/components/shared/toggle-action-button";

export function CommunitiesSection({ communities }: { communities: Community[] }) {
  const joined = useIdSet();

  function toggleJoin(community: Community) {
    const wasJoined = joined.has(community.id);
    joined.toggle(community.id);
    toast(wasJoined ? `You left ${community.name}` : `Welcome to ${community.name}`);
  }

  return (
    <NetworkSection
      id="communities"
      title="HSE communities"
      description="Join groups to swap lessons learned, alerts and opportunities"
      icon={UsersIcon}
      iconClassName="text-success"
    >
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {communities.map((community) => {
          const { icon: Icon, iconClassName, bannerClassName } = industryConfig[community.industry];
          return (
            <li key={community.id}>
              <Card className="h-full gap-3 rounded-2xl px-4 transition-colors hover:ring-primary/30">
                <span className={cn("flex size-12 items-center justify-center rounded-xl bg-linear-to-br", bannerClassName)}>
                  <Icon aria-hidden="true" className={cn("size-6", iconClassName)} />
                </span>
                <div className="flex-1">
                  <h3 className="font-semibold">{community.name}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{community.description}</p>
                </div>
                <p className="text-xs font-medium text-muted-foreground">
                  {formatCompactNumber(community.memberCount)} members
                </p>
                <ToggleActionButton
                  isActive={joined.has(community.id)}
                  idleLabel="Join"
                  activeLabel="Joined"
                  idleIcon={PlusIcon}
                  activeIcon={CheckIcon}
                  accessibleName={community.name}
                  onToggle={() => toggleJoin(community)}
                />
              </Card>
            </li>
          );
        })}
      </ul>
    </NetworkSection>
  );
}
