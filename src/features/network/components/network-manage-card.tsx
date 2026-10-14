import {
  Building2Icon,
  CalendarDaysIcon,
  ChevronRightIcon,
  UserCheckIcon,
  UsersIcon,
  UsersRoundIcon,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { WidgetTitle } from "@/components/shared/widget-title";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatCompactNumber } from "@/lib/format";
import type { NetworkStats } from "@/types/network";

interface ManageLink {
  label: string;
  href: string;
  icon: LucideIcon;
  count: number;
}

export function NetworkManageCard({ stats }: { stats: NetworkStats }) {
  const links: ManageLink[] = [
    { label: "Connections", href: "/network/connections", icon: UsersRoundIcon, count: stats.connections },
    { label: "Following", href: "/network/following", icon: UserCheckIcon, count: stats.following },
    { label: "Communities", href: "/network/communities", icon: UsersIcon, count: stats.communities },
    { label: "Events", href: "/network/events", icon: CalendarDaysIcon, count: stats.events },
    { label: "Companies", href: "/network/companies", icon: Building2Icon, count: stats.companies },
  ];

  return (
    <Card size="sm" className="rounded-2xl">
      <CardHeader>
        <WidgetTitle>Manage my network</WidgetTitle>
      </CardHeader>
      <CardContent>
        <ul className="-mx-2 grid grid-cols-2 gap-1 md:grid-cols-1">
          {links.map(({ label, href, icon: Icon, count }) => (
            <li key={label}>
              <Link
                href={href}
                className="group flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm transition-colors outline-none hover:bg-muted/60 focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <Icon aria-hidden="true" className="size-4 text-muted-foreground group-hover:text-primary" />
                <span className="flex-1">{label}</span>
                <span className="font-heading font-bold text-primary">{formatCompactNumber(count)}</span>
                <ChevronRightIcon aria-hidden="true" className="size-3.5 text-muted-foreground max-md:hidden" />
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
