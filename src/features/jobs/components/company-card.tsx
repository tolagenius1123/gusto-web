"use client";

import { Building2Icon, CheckIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ToggleActionButton } from "@/components/shared/toggle-action-button";
import { WidgetTitle } from "@/components/shared/widget-title";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { industryConfig } from "@/config/industries";
import type { Company } from "@/types/job";
import { CompanyLogo } from "./company-logo";

export function CompanyCard({ company }: { company: Company }) {
  const [isFollowing, setIsFollowing] = useState(false);

  function toggleFollow() {
    setIsFollowing((following) => !following);
    toast(isFollowing ? `Unfollowed ${company.name}` : `Following ${company.name}`);
  }

  return (
    <Card size="sm" className="rounded-2xl">
      <CardHeader>
        <WidgetTitle icon={Building2Icon}>About the company</WidgetTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3">
          <CompanyLogo company={company} />
          <div>
            <p className="font-semibold">{company.name}</p>
            <p className="text-xs text-muted-foreground">
              {industryConfig[company.industry].label} · {company.size}
            </p>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{company.about}</p>
        <ToggleActionButton
          isActive={isFollowing}
          idleLabel="Follow"
          activeLabel="Following"
          idleIcon={PlusIcon}
          activeIcon={CheckIcon}
          accessibleName={company.name}
          onToggle={toggleFollow}
        />
      </CardContent>
    </Card>
  );
}
