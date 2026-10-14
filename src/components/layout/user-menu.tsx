import { ChevronDownIcon, CircleHelpIcon, LogOutIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";
import { getProfileHref } from "@/components/shared/user-identity";
import { UserAvatar } from "@/components/shared/user-avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getFullName } from "@/lib/format";
import { cn } from "@/lib/utils";
import { ThemeToggleItem } from "./theme-toggle-item";
import type { UserSummary } from "@/types/user";

interface UserMenuProps {
  user: UserSummary;
  className?: string;
}

export function UserMenu({ user, className }: UserMenuProps) {
  const fullName = getFullName(user);
  const profileHref = getProfileHref(user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open account menu"
        className={cn(
          "group flex shrink-0 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-medium text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 md:min-w-12 lg:min-w-16",
          className,
        )}
      >
        <span className="flex h-8 items-center justify-center">
          <UserAvatar user={user} className="size-8 ring-2 ring-primary/40 transition-shadow group-hover:ring-primary md:size-7" />
        </span>
        <span className="hidden items-center gap-0.5 leading-none lg:flex">
          Me
          <ChevronDownIcon aria-hidden="true" className="size-3.5" />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 p-2">
        <div className="flex gap-3 p-1.5">
          <UserAvatar user={user} size="lg" className="size-12" />
          <div className="min-w-0">
            <p className="truncate font-semibold">{fullName}</p>
            <p className="line-clamp-2 text-sm text-muted-foreground">{user.headline}</p>
          </div>
        </div>
        <Link
          href={profileHref}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }), "my-2 w-full rounded-full border-primary/60 text-primary hover:bg-primary/10 hover:text-primary")}
        >
          View profile
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem render={<Link href="/settings" />}>
            <SettingsIcon aria-hidden="true" />
            Settings and privacy
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href="/help" />}>
            <CircleHelpIcon aria-hidden="true" />
            Help
          </DropdownMenuItem>
          <ThemeToggleItem />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOutIcon aria-hidden="true" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
