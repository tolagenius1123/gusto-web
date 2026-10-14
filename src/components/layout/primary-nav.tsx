import { primaryNav } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { unreadCounts } from "@/mocks/current-user";
import { NavLink } from "./nav-link";

type PrimaryNavVariant = "header" | "tabbar";

interface PrimaryNavProps {
  variant: PrimaryNavVariant;
  className?: string;
}

export function PrimaryNav({ variant, className }: PrimaryNavProps) {
  const isTabBar = variant === "tabbar";
  const items = isTabBar ? primaryNav.filter((item) => item.inMobileTabBar) : primaryNav;

  return (
    <nav aria-label="Primary" className={className}>
      <ul className={cn("flex h-full", isTabBar ? "justify-around" : "gap-1")}>
        {items.map((item) => (
          <li key={item.id} className={cn("flex", isTabBar && "flex-1 justify-center")}>
            <NavLink
              itemId={item.id}
              count={unreadCounts[item.id]}
              labelVisibility={isTabBar ? "always" : "desktop"}
              className={cn(isTabBar ? "w-full px-1 py-2" : "lg:min-w-18")}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
