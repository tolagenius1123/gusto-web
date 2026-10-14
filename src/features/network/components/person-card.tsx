import { XIcon } from "lucide-react";
import Link from "next/link";
import { UserAvatar } from "@/components/shared/user-avatar";
import { getProfileHref } from "@/components/shared/user-identity";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getFullName } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Industry } from "@/types/network";
import type { UserSummary } from "@/types/user";
import { industryConfig } from "../industries";

interface PersonCardProps {
  user: UserSummary;
  industry: Industry;
  details?: React.ReactNode;
  footer: React.ReactNode;
  onDismiss?: () => void;
}

export function PersonCard({ user, industry, details, footer, onDismiss }: PersonCardProps) {
  const { label, icon: IndustryIcon, bannerClassName, iconClassName } = industryConfig[industry];
  const fullName = getFullName(user);

  return (
    <Card className="group h-full gap-0 rounded-2xl py-0 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-16px_var(--glow)] hover:ring-primary/30">
      <div className={cn("relative h-16 bg-linear-to-br", bannerClassName)}>
        <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-background/70 px-2 py-0.5 text-[10px] font-semibold backdrop-blur">
          <IndustryIcon aria-hidden="true" className={cn("size-3", iconClassName)} />
          {label}
        </span>
        <IndustryIcon
          aria-hidden="true"
          strokeWidth={1.5}
          className={cn("absolute right-3 bottom-1 size-10 opacity-25", iconClassName)}
        />
        {onDismiss && (
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={onDismiss}
            aria-label={`Dismiss suggestion: ${fullName}`}
            className="absolute top-1.5 right-1.5 rounded-full bg-background/60 backdrop-blur"
          >
            <XIcon aria-hidden="true" />
          </Button>
        )}
      </div>
      <div className="flex flex-1 flex-col items-center px-4 pb-4">
        <Link
          href={getProfileHref(user)}
          className="-mt-9 rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <UserAvatar
            user={user}
            className="size-18 ring-4 ring-card transition-transform duration-300 group-hover:scale-105 [&_[data-slot=avatar-fallback]]:font-heading [&_[data-slot=avatar-fallback]]:text-xl"
          />
          <span className="sr-only">{fullName}</span>
        </Link>
        <Link
          href={getProfileHref(user)}
          className="mt-2 rounded-sm font-semibold outline-none hover:text-primary hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {fullName}
        </Link>
        <p className="mt-0.5 line-clamp-2 min-h-8 text-xs text-muted-foreground">{user.headline}</p>
        {details && <div className="mt-3 w-full text-xs">{details}</div>}
        <div className="mt-auto w-full pt-4">{footer}</div>
      </div>
    </Card>
  );
}
