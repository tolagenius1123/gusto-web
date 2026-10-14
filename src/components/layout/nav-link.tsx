"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { getNavItem, isNavItemActive, type NavItemId } from "@/config/navigation";
import { formatBadgeCount } from "@/lib/format";
import { cn } from "@/lib/utils";

type LabelVisibility = "always" | "desktop" | "never";

const labelClasses: Record<LabelVisibility, string> = {
  always: "",
  desktop: "max-lg:sr-only",
  never: "sr-only",
};

interface NavLinkProps {
  itemId: NavItemId;
  count?: number;
  labelVisibility?: LabelVisibility;
  className?: string;
}

function NavLinkView({
  itemId,
  count,
  labelVisibility = "always",
  className,
  isActive,
}: NavLinkProps & { isActive: boolean }) {
  const item = getNavItem(itemId);
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group flex min-w-12 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-medium text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50",
        isActive && "text-foreground",
        className,
      )}
    >
      <span
        className={cn(
          "relative flex h-8 w-12 items-center justify-center rounded-full transition-all duration-300",
          isActive
            ? "bg-primary/15 text-primary shadow-[0_0_24px_-6px_var(--primary)]"
            : "group-hover:bg-muted",
        )}
      >
        <Icon
          aria-hidden="true"
          className="size-5 transition-transform duration-300 group-hover:-translate-y-px"
          strokeWidth={isActive ? 2.25 : 1.75}
        />
        {count ? (
          <span
            aria-hidden="true"
            className="absolute -top-1 right-1 h-4 min-w-4 rounded-full bg-destructive px-1 text-center text-[10px] leading-4 font-semibold text-white ring-2 ring-background"
          >
            {formatBadgeCount(count)}
          </span>
        ) : null}
      </span>
      <span className={cn("leading-none whitespace-nowrap", labelClasses[labelVisibility])}>
        {item.label}
        {count ? <span className="sr-only">, {count} unread</span> : null}
      </span>
    </Link>
  );
}

function ActiveAwareNavLink(props: NavLinkProps) {
  const pathname = usePathname();
  const isActive = isNavItemActive(pathname, getNavItem(props.itemId).href);
  return <NavLinkView {...props} isActive={isActive} />;
}

export function NavLink(props: NavLinkProps) {
  return (
    <Suspense fallback={<NavLinkView {...props} isActive={false} />}>
      <ActiveAwareNavLink {...props} />
    </Suspense>
  );
}
